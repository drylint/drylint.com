
# Sass的样式继承 `@extend`

[toc]

在写样式时，经常会出现这样的情况：一个 class 会拥有另一个 class 的所有样式，以及它自己的特定样式。

例如，BEM 方法鼓励修饰符类使用与块类或元素类相同的元素。但是这可能会创建混乱的 HTML，很容易因为忘记包含这两个类而出错，并且它会给您的标记带来非语义样式的问题。

```html
<div class="error error--serious">
  Oh no! You've been hacked!
</div>
```

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```

Sass 的 `@extend` 语句解决了这个问题。它写的是 `@extend <selector>`，它告诉 Sass 一个选择器应该继承另一个选择器的样式。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;

    border-width: 3px;
  }
}
```

编译后的 css ：

```css
.error,
.error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

可以看到，Sass 中继承并不是将继承的样式代码复制一份过来，而是将当前使用了继承的选择器添加到目标样式块上去。

这样，在元素上就可以写 `class="error--serious"` 而不需要写成 `class="error error--serious"` 了。

Sass 在继承时，不仅是继承一个选择器本身的样式，它会继承这个选择器使用的所有样式，比如伪类。

```scss
.error {
  color: #f00;
}

.error:hover {
  border: 1px solid #f00;
}

.error--serious {
  @extend .error;

  font-size: 20px;
}
```

编译后的 css ：

```css
.error,
.error--serious {
  color: #f00;
}

.error--serious {
  font-size: 20px;
}

.error:hover,
.error--serious:hover {
  border: 1px solid #f00;
}
```

注意，继承其实是在样式表其余的所有部分编译完成之后才发生的。尤其是在Sass 中的父选择器 `&` 已经被解析之后才会开始继承。这意味着，使用 `@extend .error` 不会影响到 `.error { &__icon { ...} }` 内的选择器，同样也意味着，父选择器 `&` 无法看到继承的结果。

## 仅用于被继承的占位选择器

如果一个选择器只想被继承使用，如果没有被继承就仿佛不存在一样，也不会输出的 css 中。

使用 `%` 表示一个占位选择器。

```scss
.alert:hover,
%strong-alert {
  font-weight: 500;
}

%strong-alert:hover {
  color: #f00;
}
```

编译后的 css ：

```css
.alert:hover {
  font-weight: 500;
}

```

如果想表示一个模块私有的占位选择器，在前面加上 `_` 或 `-` 即可。比如 `_%strong-alert` 。

扩展是有作用域的，如果要继承其他模块中的样式，需要使用 `@use` 或 `@forward` 加载模块。

如果使用的是 `@import` 规则，那么扩展根本就没有作用域，而是全局的。它们不仅会影响您导入的每个样式表，还会影响导入您的样式表的每个样式表，以及这些样式表导入的所有其他内容，等等。所以尽量不使用 `@import` 。

## 可选继承

默认情况下，`@extend` 是强制继承，也就是说要继承的选择器必须存在，如果不存在则会抛出错误，这有助于检查拼写错误，或是要继承的选择器重命名后影响到其他继承了它的地方。

如果想要一个继承是可选的，也就是如果要继承的选择器不存在的话，就什么也不做，那就在 `@extend` 语句后加一个 `!optional` 表示是可选的。比如： `@extend .error !optional;`

## `@extend` 和 `@mixin`

Sass 中复用样式可以使用 `@extend` 和 `@mixin` 。那么二者通常在什么情况下使用呢？

如果复用的样式在使用时需要传递参数，那么毫无疑问是使用 `@mixin` 了。但是如果仅仅是复用一段固定的样式代码呢？

根据经验，当您表示语义类(或其他语义选择器)之间的关系时，扩展是最佳选择。因为带有 `.error--serious` 这个 class 的元素表示的是一个错误，所以通过继承来复用 `.error` 是有意义的。但对于非语义的样式集合，编写 mixin 可以避免层叠问题，并使其更容易进行后续配置。

## `@extend` 的限制

只有简单的选择器（独立的选择器）可以被继承，比如 `.info` ，像 `.message.info` 这样的选择器就不可以被继承，`@extend .message.info` 应该写成 `@extend .message, .info` ，同样地，`@extend .main .info` 应该写成 `@extend .info` 。

当 `@extend` 交叉使用复杂的选择器时，它不会生成所有可能的祖先选择器组合。因为它可能生成的许多选择器实际上不太可能与真正的 HTML 匹配，而且生成所有这些选择器会使样式表太大，实际价值很小。相反，它使用一种启发式方法（heuristic）：它假设每个选择器的祖先都是自包含的，不与任何其他选择器的祖先交叉。

```scss
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  @extend li;
}
```

编译过后的 css ：

```css
header .warning li,
header .warning aside .notice dd,
aside .notice header .warning dd {
  font-weight: bold;
}
```

虽然 `@extend` 可以在 `@media` 和其他 CSS 的 @ 语句中使用，但不允许在 @ 语句中继承 @ 语句之外的选择器。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}

@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error; // 抛出错误，不能继承 @media 外的选择器
  }
}
```

这是因为使用了 `@extend` 的选择器（这里是 `.error--serious`）只适用于给定的媒体上下文，但使用 `@extend` 不会复制样式代码到当前位置，这样会导致会在 `@media` 语句外生成 `.error, .error--serious { ... }`，进而导致 `.error--serious` 没有被限制在 `@media` 上下文中。
