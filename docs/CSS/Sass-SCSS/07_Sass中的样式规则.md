
# Sass中的样式规则

[toc]

## 选择器

和 css 一样，使用选择器来选择要应用样式的元素，然后通过 css 属性和属性值来控制元素看起来是什么样的。

但和 css 的子选择器不同的是，sass 中允许规则嵌套，这样在写子选择器时就不用再重复书写父选择器了。

```scss

// 后代选择器， .ancestor 内所有层级的 .descendant 都会被选中
.ancestor {
  .descendant {
    font-size: 16px;
  }
}

// 子选择器， .father 下一级中的 .son 会被选中，超过一级则不会
.father {
  > .son {
    font-size: 16px;
  }
}

// 后一个兄弟选择器， .prev 同级的后面紧邻的 .next 会被选中
.prev {
  + .next {
    font-size: 16px;
  }
}

// 后所有兄弟选择器， div 同级的后面所有的 p 元素都会被选中
div {
  ~ p {
    font-size: 16px;
  }
}
```

编译后的 css ：

```css
.ancestor .descendant {
  font-size: 16px;
}

.father > .son {
  font-size: 16px;
}

.prev + .next {
  font-size: 16px;
}

div ~ p {
  font-size: 16px;
}
```

注意：嵌套规则在书写时非常有帮助，但是它们也会使你很难看到你实际生成了多少 CSS 。嵌入的越深，服务 CSS 需要的带宽就越多，浏览器渲染 CSS 需要的工作也就越多。嵌套应该尽可能浅。

选择器列表：

```scss
.alert,
.warning {
  ul,
  p {
    font-size: 16px;
  }
}
```

编译后的 css ：

```css
.alert ul,
.alert p,
.warning ul,
.warning p {
  font-size: 16px;
}
```

## 父选择器 `&` （Parent Selector）

父选择器&是Sass发明的一个特殊选择器，用于嵌套选择器中引用外部选择器。它使得以更复杂的方式重用外部选择器成为可能，比如添加一个伪类或在父类之前添加一个选择器。

当一个父选择器在一个内部选择器中使用时，它会被相应的外部选择器替换。这代替了正常的嵌套行为。

```scss
.alert {

  // 用父选择器向外部选择器添加伪类。
  &:hover {
    font-weight: bold;
  }

  // 它还可以在特定的上下文中用于样式化外部选择器
  // 例如使用从右到左的语言设置主体。
  [dir=rtl] & {
    margin-left: 0;
    margin-right: 10px;
  }

  // 甚至可以将它用作伪类选择器的参数。
  :not(&) {
    opacity: 0.8;
  }

  // 将父选择器用于拼接生成一个新的选择器
  &-one {
    color: #f00;
  }
  &-two {
    color: #f00;
  }
}
```

编译后的 css ：

```css
.alert:hover {
  font-weight: bold;
}
[dir=rtl] .alert {
  margin-left: 0;
  margin-right: 10px;
}
:not(.alert) {
  opacity: 0.8;
}
.alert-one {
  color: #f00;
}
.alert-two {
  color: #f00;
}

```

注意：因为父选择器 `&` 可能被像 `h1` 这样的元素选择器（type selector）替换，所以当需要使用父选择器拼接一个复合选择器（compound selector）时，`&` 只能出现在复合选择器的开头，例如，`span&`， `.hi&` 是不允许的，只能是 `&span`， `&.hi` 这样的。

本段原文：

Because the parent selector could be replaced by a type selector like `h1`, it’s only allowed at the beginning of compound selectors where a type selector would also be allowed. For example, `span&` is not allowed.

不过，sass 团队正在考虑是否放宽这一限制。详情查看 [GitHub issue](https://github.com/sass/sass/issues/1425)。

### 添加后缀

您还可以使用父选择器向外部选择器添加额外的后缀。当使用像BEM这样使用高度结构化的类名的方法时，这一点特别有用。只要外部选择器以字母数字名称(如class、ID和元素选择器)结束，您就可以使用父选择器来附加额外的文本。

```scss
.container {
  font-size: 16px;

  &__switch {
    color: #f00;

    &--active {
      display: block;
    }
  }
}
```

编译后的 css ：

```css
.container {
  font-size: 16px;
}
.container__switch {
  color: #f00;
}
.container__switch--active {
  display: block;
}

```

### In SassScript

父选择器也可以在 SassScript 中使用。它是一个特殊表达式，以选择器函数使用的相同格式返回当前的父选择器：一个逗号分隔的选择器列表，其中包含未加引号的字符串(复合选择器)。

```scss
/* 因为这是不合法的代码，所以在注释中显示

.main aside:hover,
.sidebar p {
  parent-selector: &;
  // => ((unquote(".main") unquote("aside:hover")),
  //     (unquote(".sidebar") unquote("p")))
}

*/
```

编译后的 css ：

```css
/* 因为这是不合法的代码，所以在注释中显示

.main aside:hover,
.sidebar p {
  content: .main aside:hover, .sidebar p;
}

*/
```

如果 `&` 表达式在任何样式规则之外使用，它返回 `null` 。因为 `null` 是 `falsy` 值，这意味着你可以很容易地使用它来确定一个 mixin 是否在一个样式规则中被调用。

```scss
@mixin app-background($color) {
  // 如果父选择器存在，则拼接为前缀，否则不拼接
  #{if(&, '&.app-background', '.app-background')} {
    background-color: $color;
    color: rgba(#fff, 0.75);
  }
}

// 无父选择器时
@include app-background(#036);

.sidebar {
  // 有父选择时
  @include app-background(#c6538c);
}
```

编译后的 css ：

```css
.app-background {
  background-color: #036;
  color: rgba(255, 255, 255, 0.75);
}

.sidebar.app-background {
  background-color: #c6538c;
  color: rgba(255, 255, 255, 0.75);
}

```

#### 高级嵌套

你可以使用 `&` 作为一个普通的 SassScript 表达式，这意味着你可以将它传递给函数或者在插值中包含它，甚至在其他选择器中!将它与选择器函数和 `@at-root` 规则结合使用，可以以非常强大的方式嵌套选择器。

例如，假设你想写一个匹配外部选择器和元素选择器的选择器。你可以编写一个像这样的 mixin，使用 `selector. unified()` 函数来将 `&` 与用户的选择器结合起来。

```scss
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;
  }
}

.wrapper .field {
  @include unify-parent("input") {
    /* ... */
  }

  @include unify-parent("select") {
    /* ... */
  }
}
```

编译后的 css ：

```css
.wrapper input.field {
  /* ... */
}

.wrapper select.field {
  /* ... */
}
```

注意，当 Sass 在嵌套选择器时，它不知道使用了什么插值来生成它们。这意味着即使你使用 `&` 作为 SassScript 表达式，它也会自动将外部选择器添加到内部选择器中。这就是为什么你需要显式地使用 `@at-root` 规则来告诉 Sass 不要包含外部选择器。

```scss
.a {
  &.b {
    font-size: 16px;
  }
  #{&}.c {
    font-size: 16px;
  }

  @at-root #{&}.d {
    font-size: 16px;
  }
}

```

编译后的 css ：

```css
.a.b {
  font-size: 16px;
}
.a .a.c {
  font-size: 16px;
}
.a.d {
  font-size: 16px;
}

```

## 占位符选择器（Placeholder Selectors）

Sass有一种特殊的选择符，称为“占位符”。它的外观和行为很像一个类选择器，但是它以%开头，并且它不包含在CSS输出中。事实上，任何包含占位符的复杂选择器(逗号之间的)都不会包含在CSS中，任何选择器都包含占位符的样式规则也不会包含在CSS中

```scss
.alert:hover,
%strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: #f00;
}
```

编译后的 css ：

```css
.alert:hover {
  font-weight: bold;
}
```

那这里的占位符选择器有什么用呢？

答案就是，它可以被继承（extend），普通的 class 选择器不管有没有被继承都会被编译到 css 中，但占位符选择器没有被继承时，不会生成任何多余的 css。

```scss
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, 0.12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, 0.5) solid; }
}

.action-buttons {
  @extend %toolbelt;

  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;

  color: #cddc39;
}
```

编译后的 css ：

```css
.action-buttons,
.reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}

.action-buttons:hover,
.reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

```

根据经验，在编写 Sass 库时，占位符选择符会很有用，每个样式规则都可以使用，也可以不使用。

如果您只是为自己的应用程序编写样式表，扩展 class 选择器就行了。

## 样式属性

在 css 中，很多属性名都是以相同的前缀开始的，比如 `font-family`, `font-size` 和 `font-weight` 都是以 `font-` 开头的，sass 中可以这样写：

```scss
.div1 {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
  font: {
    family: serif;
    size: 16px;
    weight: 600;
  }
}
```

编译后的 css ：

```css
.div1 {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 2px;
  font-family: serif;
  font-size: 16px;
  font-weight: 600;
}
```

隐藏属性声明：

可以将属性值设置为 `null` 或无引号字符串，这样 Sass 在编译时就不会将他们编译到 css 中。

```scss
div {
  font-size: 16px;
  border-radius: null;
}
```

编译后的 css ：

```css
div {
  font-size: 16px;
}
```

这在需要根据某个条件判断结果来决定是否需要某属性时非常有用。

### 自定义属性（Custom Properties）

CSS 自定义属性，也称为 CSS 变量，有一种不同寻常的声明语法。它允许在声明值中包含几乎任何文本。也就是说，`--color: $color` 中的 `$color` 在 css 中已经是合法的，sass 不知道用户在这里想要一个叫做 `$color` 的 sass 变量，还是就想要 `$color` 这样一个字符串。

因此，sass 遇到自定义属性统统都会按原样编译成 CSS。除非是显示使用插值表达式 `#{}` 告诉 sass 这里是一个表达式，需要被计算后输出。也就是说，插值表达式是将动态值注入自定义属性的唯一方法。

插值表达式有一点不幸的是，插值表达式中表达式计算后，会删除字符串中的引号，这使得我们没办法使用变量将一个带引号的字符串作为自定义属性的值。

```scss
$primary: #81899b;
$quoted: "hello";
:root {
  // $primary 像一个 Sass 变量，但它是有效的 CSS 代码，所以它不会被编译计算
  --other: $primary;

  // 想要插入一个变量，必须使用插值表达式
  --primary: #{$primary};

  // 插值插入一个有引号的字符串，编译后引号会被去除
  --quoted: #{$quoted};
}
```

编译后的 css ：

```css
:root {
  --other: $primary;
  --primary: #81899b;
  --quoted: hello;
}
```

上例中，变量中的引号在插值表达式计算后被去除了，作为一种解决方案，需要使用 `meta.inspect()` 函数来保留引号。

```scss
@use "sass:meta";

$quoted: "hello";
:root {
  --quoted: #{meta.inspect($quoted)};
}
```

编译后的 css ：

```css
:root {
  --quoted: "hello";
}
```
