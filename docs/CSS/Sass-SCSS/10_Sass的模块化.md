# Sass的模块化

[toc]

- `@use` 从其他 sass 样式表中加载 mixins, functions, variables, 并将来自多个样式表的 CSS 组合在一起

- `@forward` 当本样式表被其他样式表使用 `@use` 加载之前，先加载一个 Sass 样式表，并且使其 mixins, functions, variables 可用

- `@import` 扩展自 css 的 `@import`，用来加载其他样式表的 styles, mixins, functions, variables

## `@use`

由 `@use` 加载的样式表被称为模块（modules）。Sass 一些内置模块，其中有很多实用的函数。

通过 `@use` 加载的模块不管被引用了多少次，都只会在编译后输出一次到 css 中。但是使用 `@import` 多次引入同一模块，会反复输出到 css 中。

```scss
// module.scss

.module {
  color: #f00;
}
```

```scss
// a.scss

@use './module.scss'
```

```scss
// b.scss

@use './module.scss'
```

```scss
// index.scss
@use './a.scss';
@use './b.scss';
```

编译后的 css ：

```css
.module {
  color: #f00;
}
```

注意：`@use` 的前面只能出现 `@forward` 或 变量声明，其他的所有代码只能出现在 `@use` 之后。

### 使用成员

`@use` 引入一个模块，默认会形成一个以模块文件名命名的命名空间，模块中的所有成员都通过这个命名空间来访问。

可以使用 `<namespace>.<variable>`, `<namespace>.<function>()`, `@include <namespace>.<mixin>()` 来加载模块中的成员。

用 `@use` 加载的模块成员只能在当前文件中访问。如果希望多文件共同访问，可以使用 `@forward` 规则通过一个共享文件转发所有成员。

因为 `@use` 将命名空间添加到成员名中，所以在编写样式表时选择非常简单的名称，如 `$radius` 或 `$width` 是安全的。这与旧的 `@import` 规则不同，旧的 `@import` 规则鼓励用户编写像 `$mat-corner-radius`这样的长名称，以避免与其他库发生冲突，`@use` 有助于保持样式表的清晰和可读性!

```scss
// a.scss

@mixin flex {
  display: flex;
}
```

```scss
// index.scss

@use './a.scss';

.flex {
  @include a.flex;
}
```

编译后的 css ：

```css
.flex {
  display: flex;
}
```

### 自定义命名空间名称

使用 `@use ... as ...` 语法来自定义命名空间名称：

```scss
@use './a.scss' as moduleA;

.flex {
  @include moduleA.flex;
}
```

### 去除命名空间

使用 `@use ... as *` 语法来自定义命名空间名称：

```scss
@use './a.scss' as *;

.flex {
  @include flex;
}
```

但不建议去除命名空间，因为这样容易导致命名冲突。

### 私有成员

如果不想将模块中的成员暴露给其他文件访问，将模块成员以 `-` 或 `_` 开头即可。

```scss
// a.scss

@mixin _flex {
  display: flex;
}
```

```scss
// index.scss

@use './a';

.flex {
  // Error: Private members can't be accessed from outside their modules.
  // 报错：模块的私有成员无法在模块外部使用
  @include a._flex;
}
```

### 引入时的配置

如果模块中的变量使用了 `!default` 标志使用了默认值，那么在使用 `@use` 引入时，可以去配置自己的值来覆盖默认值：

```scss
// a.scss

$red: #f00 !default;
$size: 16px !default;
$bg: #fff;

@mixin base {
  color: $red;
  font-size: $size;
  background: $bg;
}
```

```scss
// index.scss

@use './a.scss' with(
  $red: #a55,
  $size: 14px
);

.button {
  @include a.base;
}

```

编译后的 css ：

```css
.button {
  color: #a55;
  font-size: 14px;
  background: #fff;
}
```

### 使用 mixin

用 `@use ... with ...` 配置模块非常方便，特别是在使用最初为使用 `@import` 规则而编写的库时。但是它不是特别灵活，而且我们不推荐它用于更高级的用例。

如果你发现自己想一次配置很多变量，传递一个 `map` 作为配置，或者在模块加载后更新配置，那么考虑写一个 mixin 来设置变量，再写另一个 mixin 来注入你的样式。

```scss
// _library.scss

$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }

  @if $border-radius {
    $-border-radius: $border-radius !global;
  }

  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}
```

```scss
// index.scss

@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);
@include library.styles;
```

### 查找模块

通过 `@use "module"` 使用模块时，不需要写扩展名，程序会自动查找：

- 1. 查找 `./module.scss`，没有则进行下一步
- 2. 查找 `./module.sass`，没有则进行下一步
- 3. 查找 `./module.css`，没有则进行下一步
- 4. 查找 `node_modules/module/sass/module.scss`

在所有系统上，路径分隔符统一使用 `/` 而不是反斜线 `\`。当前目录模块不需要写 `./` 。

如果 Sass文件只打算作为模块加载，而不是自己编译，文件名以 `_` 开头即可，这些被称为部分（partials），它们告诉 Sass 工具不要尝试自己编译这些文件。但是在导入这些模块时可以不用书写 `_` 符号。

使用 `@use "directory"` 导入一个目录时，编译器会尝试自动查找 `_index.scss` 或 `_index.sass` 文件。

加载一个**纯CSS文件**作为模块时，不允许任何特殊的 Sass 特性（如 variables, functions, mixins），为了避免作者一不小心把 Sass 写进 CSS 中，所有 Sass 的特性如果不是合法的 CSS 代码将会报错。否则，CSS将按原样呈现。它甚至可以被继承（extend）!

## `@forward`

当使用 `@use` 加载一个文件时， 这个文件中可以使用 `@forward` 来使另一个文件中的 mixin、函数和变量可以暴露出去。通常用于跨多个文件组织 Sass 库。

`@forward` 和 `@use` 使用方式相同，但作用却完全不一样。

`@forward` 的作用是转发模块成员，而不是引入成员到当前文件使用，也就是说，通过 `@forward` 加载一个模块的成员，这些成员并不能在当前文件内访问，而仅仅是将这些成员当作自己的成员对外暴露出去。

举个例子，`a.scss` 中定义了一个变量 `$red`，在 `b.scss` 中使用 `@forward "a.scss"`，但是在 `b` 中无法访问 `a.$red`，但是在另一个文件 `c.scss` 中使用 `@use "b.scss"` 后，可以通过 `b.$red` 访问到 `a` 中定义的变量。

在上例中，如果想要在 `b.scss` 中使用变量，那么依然需要使用 `@use "a.scss"` 来引入变量，然后就可以访问 `a.$red` 了。

当需要在上例的 `b.scss` 文件中同时使用 `@forward` 和 `@use` 时，建议先写 `@forward` 再写 `@use` ，因为这样，在 `c.scss` 中使用 `@use ... with()` 配置的变量值会先生效，这样 `b.scss` 中引用的变量也是配置后的变量。

`@forward` 虽然对变量，mixin，函数等只能起转发作用，但对其他样式代码和 `@use` 一样，也会引入并编译，所以在使用了 `@forward "module"` 的文件中，就算没有使用 `@use` ，也可以去继承 `module.scss` 的样式。

```scss
// a.scss

$red: #f00 !default;

.a {
  color: $red;
  font-size: 16px;
}
```

```scss
// b.scss

@forward 'a.scss'; // 转发 a 中的变量，并引入普通样式代码

.b {
  // 虽然没有使用 @use 不能访问模块 a.scss 的变量，但可以继承它的样式
  @extend .a;
  // 如果写 color: a.$red 会报错，因为没有使用 @use "a.scss"
}
```

```scss
// index.scss

@use 'b.scss' ;

.index {
  @extend .a;

  background-color: b.$red;
}
```

编译后的 css ：

```css
.a,
.b,
.index {
  color: #f00;
  font-size: 16px;
}

.index {
  background-color: #f00;
}

```

### 转发时添加前缀

如果一个文件转发多个文件中的成员，在使用时可能会存在多个文件中的成员同名，这样会导致编译出现错误，就算没有同名，也有可能在使用时不清楚到底是哪个模块的成员。

通过 `@forward "module" as xxx-*` 可以给同一个模块中的成员统一添加前缀。

假设有 `a.scss`， `b.scss`， `c.scss` 三个模块中都有一个名叫 `$red` 的变量：

```scss
// bus.scss

@forward 'a.scss' as a-*;
@forward 'b.scss' as b-*;
@forward 'c.scss' as c-*;
```

```scss
// index.scss
@use 'bus.scss';

.index {
  background-color: bus.$a-red;
  color: bus.$b-red;
  border: 1px solid bus.$c-red;
}
```

### 控制成员可见性

默认情况下，`@forward` 会将一个模块中所有成员都转发，如果只想转发某些成员，或不想转发某些成员，可以这样书写：

- `@forward "module" hide $var, mixinName, fnName` 禁止转发某些成员
- `@forward "module" show $var, mixinName, fnName` 只转发某些成员

各个成员通过逗号 `,` 分隔开，如果成员是变量，不能省略 `$` 符号。

### 转发时配置模块的成员

在转发其他模块的成员时，可以对成员进行配置，修改默认值，或者指定一个确定的值均可。

```scss
// a.scss

$red: #f00 !default;
$black: #000 !default;
$green: #0f0 !default;
```

```scss
// b.scss

// 转发成员时进行配置，修改默认值，或修改为固定的值
@forward 'a.scss' with (
  $red: #f55 !default,
  $black: #333,
);
```

```scss
// index.scss

@use 'b.scss' with (
  $red: #f11,
);

.div {
  color: b.$red;
  background-color: b.$black;
  border-color: b.$green;
}
```

编译后的 css ：

```css
.div {
  color: #f11;
  background-color: #333;
  border-color: #0f0;
}
```

## `@import`

css 中本身就有 `@import`，sass 在其基础上进行扩展，可以用来导入模块中的变量，mixin，函数等，以及模块的样式。

和 css 中的 `@import` 不同之处在于，css 中的 `@import` 可以是一个线上 url 地址，浏览器会在运行时下载这个文件，而 sass 中的 `@import` 只能在编译打包阶段运行，所以在 sass 中只能导入一个本地存在的 sass/scss/css 文件。

```scss
@import "a.scss", "b.scss", "c.scss";
```

`@import` 在 sass 中的用法和在 css 中一样，只不过在 sass 中允许写一个 `@import` 导入多个文件，文件以逗号 `,` 分隔开即可，css 中必须每个文件写一个 `@import` 。

Sass 团队不推荐继续使用 `@import`。Sass 将在未来几年内逐步淘汰它，并最终将其完全从语言中移除。建议使用 `@use` 来代替。

使用 `@import` 存在的问题：

- `@import` 使所有变量、 mixins 和函数都可以全局访问。导致很难判断是在哪里定义的。

- 因为所有东西都变成全局的，所以 sass 库必须在所有成员前加上前缀，以避免命名冲突。

- `@extend` 也是全局的，这使得很难预测哪些样式将被继承。

- 每个样式表都会被执行编译，每一个 `@import` 都会生成它的 CSS，这会增加编译时间并产生臃肿的代码输出。

- 没有办法定义不想暴露出去的私有成员和占位符选择器。

使用 `@use` 则不会有以上的问题。

当 `@import` 一个文件时，该文件的编译过程就像它的所有代码直接出现在 `@import` 的位置一样。导入的文件中的所有 mixin、函数和变量都是可用的，并且在写入 `@import` 的确切位置包含了导入的文件中的所有样式代码。并且，在 `@import` 之前定义的 mixin、函数或变量(包括来自其他 `@import` 的)甚至都可以在被导入的那个文件中去使用。

```scss
// a.scss

@import "c";

$red: #f00;
```

```scss
// b.scss

@import "c";

.b {
  color: $red;
  border-color: $black;
}

```

```scss
// c.scss

.c {
  font-size: 16px;
}

```

```scss
// index.scss

@import 'a';

$black: #000;

@import 'b'; // 问题：在 b.scss 中能够访问到 a.scss 的变量和之前声明的变量
```

编译后的 css ：

```css
.c {
  font-size: 16px;
}
/* stylelint-disable-next-line no-duplicate-selectors */
.c {
  font-size: 16px;
}

.b {
  color: #f00;
  border-color: #000;
}
```

上例编译结果可以看到，，同一文件多次被 `@import` 时，会重复编译多次。

### 嵌套的 `@import`

`@import` 通常是写在样式表的顶层，但其实它们也可以嵌套在样式块中或纯 CSS at-rules中。

导入的 CSS 代码块将嵌套在该上下文中，这使得嵌套的 `@import` 对于将 CSS 块定位到特定元素或媒体查询非常有用。

注意，在嵌套 `@import` 引入的文件中定义的顶级 mixins，函数，变量依然会被导入为全局的变量。

```scss
// a.scss

.a {
  color: $red;
}
```

```scss
// index.scss

$red: #a55;

.index {
  @import "a";
}
```

编译后的 css ：

```css
.index .a {
  color: #a55;
}
```

嵌套 `@import` 对于确定第三方样式表的作用域非常有用，但是如果您是要导入自己写的样式表，那么最好在 `@mixin` 中编写您的样式，然后使用 `@include` 来将 `@mixin` 包含在嵌套的上下文中。`@mixin` 可以以更灵活的方式使用，当查看导入的样式表时，它的用途会更清晰。

### 在 sass 中导入 css 并编译

在 sass 中导入 css 文件时，不要显示地写出扩展名 `.css` ，只写文件名即可。因为如果显示地写出扩展名 `.css` ，这用来表示是在导入纯 css 文件，编译器则不会去编译 `@import` 语句，而是原封不动地输出这条语句。

```css
/* a.css */

.a {
  color: #f00;
}
```

```scss
// index.scss

@import "a";

.index {
  @extend .a;

  font-size: 16px;
}
```

编译后的 css ：

```css
.a,
.index {
  color: #f00;
}

.index {
  font-size: 16px;
}
```

如果将 `@import "a";` 改为 `@import "a.css";` ：

```scss
@import "a.css";

.index {
  // 报错：The target selector was not found.
  // 目标选择器未找到
  @extend .a;

  font-size: 16px;
}
```

上面代码编译时会报错：目标选择器未找到，因为编译器遇到 `@import "a.css";` 语句，它就会认为这是一条导入纯 css 文件的语句，不需要在编译阶段处理它，而是用于运行时的导入。所以要去继承这个文件中的选择器是无法找到目标选择器的。

### 纯 css 导入语句（不编译）

如果要让编译器原封不动地输出 `@import` 语句，而不是去编译后替换掉它，那么这里就有几种形式，满足其中任意一种即可。

在 `@import` 语句中：

- 以 `.css` 结尾
- 以 `http://` 或 `https://` 开头
- 路径包含在 `url()` 之中。
- 语句中有媒体查询

```scss
@import "xxx.css";
@import "http://xxx.css";
@import url(xxx);
@import "landscape" screen and (orientation: landscape);
```

### `@import` 中使用插值

sass 中的 `@import` 语句是不支持使用插值的，因为这可能会让人不知道变量，函数，mixin 是从哪里来的。

但是，对于纯css `@import` 语句却是可以的，可以用来动态生成纯 css 的 `@import` 语句。

```scss
@mixin get-font($family) {
  @import url("http://xxx.com/#{$family}.css");
}

@include get-font("font-name");
```

编译后的 css ：

```css
@import url("http://xxx.com/font-name.css");
```

### `@import` 与模块

假设在 `index.scss` 中 `@import "b.scss"` ，而 `b.scss` 中使用了 `@use "a.scss"`，在 `index.scss` 中可以访问 `b.scss` 中的所有成员（包括私有成员），但无法直接访问 `a.scss` 中的成员，除非 `b.scss` 中使用了 `@forward "a.scss"`。

```scss
// a.scss

$red: #f00;

.a {
  color: $red;
}
```

```scss
// b.scss

@use "a.scss";

$black: #000;

.b {
  color: a.$red;
  background-color: $black;
}
```

```scss
@import "b.scss";

.index {
  // color: $red; // 无法直接访问没有被转发的成员
  background-color: $black;
}
```

编译后的 css ：

```css
.a {
  color: #f00;
}

.b {
  color: #f00;
  background-color: #000;
}

.index {
  background-color: #000;
}
```

上面例子可以看到，虽然 `index.scss` 无法访问到 `a.scss` 中没有被转发的成员，但是 `a.scss` 中的所有样式代码依然会被全部导入。

### 只供 `@import` 使用的文件（Import-Only Files）

一个模块暴露的成员有可能对 `@use` 方式的导入有效，但对 `@import` 方式的导入无效。

比如，使用 `@use` 默认会为所有成员生成一个以文件名命名的命名空间，但 `@import` 不会，而是直接暴露到全局，这就需要为模块成员取更长的名字以免命名冲突。

假设我们在维护一个 sass 库，如果我们改成新的模块系统（`@use`），我们会担心那些之前使用 `@import` 的用户会无法正常运行。

为了解决这个问题，sass 支持一种文件叫做 “`@import` 专用文件” ，也就是这个文件只能通过 `@import` 导入，而无法通过 `@use` 来导入。

给一个文件命名为 `<name>.import.scss` 即可，这样就能保持对 `@import` 的兼容，又能使用新的 `@use` 模块系统。

创建两个文件模块，`a.scss` 用于 `@use` 导入，`a.import.scss` 用于 `@import` 导入：

```scss
// a.scss

$red: #f00;

.a {
  font-size: 16px;
  color: $red;
}
```

```scss
// a.import.scss

@forward 'a' as a-*;
```

用户在使用这个模块时，如果写 `@use "a"` 则会加载 `a.scss` 文件，如果写 `@import "a"` 则会加载 `a.import.scss` 文件。

使用 `@use` 导入：

```scss
@use "a";

.user {
  color: a.$red;
}
```

使用 `@import` 导入：

```scss
@import "a";

.user {
  color: $a-red;
}
```

两种方式编译结果完全一样，编译后的 css ：

```css
.a {
  font-size: 16px;
  color: #f00;
}

.user {
  color: #f00;
}
```

### 使用 `@import` 导入时配置模块成员

在模块被第一次 `@import` 的语句前面，定义一个全局变量即可配置变量值而不使用默认值。

```scss
// a.scss

$red: #f00 !default;

.a {
  color: $red;
}
```

```scss
// a.import.scss

@forward 'a' as a-*;
```

```scss
// a.scss

$a-red: #f55; // 在 @import 前定义全局变量，可配置模块成员

@import "a";

.user {
  color: $a-red;
}
```

编译后的 css ：

```css
.a {
  color: #f55;
}

.user {
  color: #f55;
}
```

模块只会被加载一次，所以就算在第一次 `@import` 模块后更改了配置(即使是间接的)，再次 `@import` 模块也不会使用修改的配置。

如果通过 `@use` 或 `@forward` 去加载一个使用了 `@import` 的文件，将会加载到这个文件的所有公共成员及样式，以及它 `@import` 导入的所有成员和代码。相当于就是 `@import` 导入的文件的内容就像是直接写在 `@import` 语句的位置一样。
