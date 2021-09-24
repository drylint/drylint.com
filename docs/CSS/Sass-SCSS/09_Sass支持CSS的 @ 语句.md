# Sass支持CSS的 @ 语句

[toc]

Sass 支持所有 CSS 中的 @ 语句，为了保持灵活和向前兼容 CSS 的未来版本，Sass 提供了所有的支持，默认情况下涵盖了几乎所有 @ 语句的规则。

- `@charset` 定义样式表使用的字符集
- @import 引入一个外部样式表
- @namespace 告诉CSS引擎，它的所有内容都必须以XML名称空间作为前缀。

- @media 限定媒体查询的样式规则
- @supports 浏览器支持查询
- @document 遗弃
- @page 描述打印文档时布局的变化
- @font-face 描述将下载的外部的字体
- @keyframes 描述 CSS 动画的中间步骤
- @viewport 遗弃
- @counter-style 自定义记数器，用于 `<ol>`, `<li>` 元素的记数
- @font-feature-values 允许作者在 font-variant-alternates 中使用通用名称，用于在OpenType中以不同方式激活功能。
- @property  提案，描述自定义属性和变量。

CSS 的 @ 语句可能是 `@<name> <value>`， `@<name> { ... }`，或是 `@<name> <value>{ ... }`。`<name>` 必须是一个标识符，如果存在 `<value>`，那么它可以是任何东西。`<name>` 和 `<value>`都可以包含插值表达式。

```css
@namespace svg url(http://www.w3.org/2000/svg);

@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}

@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
}
```

如果一个CSS at-rule嵌套在一个样式规则中，两者会自动交换位置，使at-rule位于CSS输出的顶层，而样式规则在其中。这使得添加条件样式变得很容易，而不必重写样式规则的选择器。

```scss
.print-only {
  display: none;

  @media print { display: block; }
}
```

编译后的 css ：

```css
.print-only {
  display: none;
}

@media print {
  .print-only {
    display: block;
  }
}
```

@ 语句支持使用表达式：

```scss
$layout-breakpoint-small: 960px;

@media (min-width: $layout-breakpoint-small) {
  .hide-extra-small {
    display: none;
  }
}
```

编译后的 css ：

```css
@media (min-width: 960px) {
  .hide-extra-small {
    display: none;
  }
}
```

如果可能的话，Sass 还将合并嵌套在一起的媒体查询，以便更容易支持还不支持嵌套@media规则的浏览器。

```scss
@media (hover: hover) {
  .button:hover {
    border: 2px solid #000;

    @media (color) {
      border-color: #036;
    }
  }
}
```

编译后的 css ：

```css
@media (hover: hover) {
  .button:hover {
    border: 2px solid #000;
  }
}

@media (hover: hover) and (color) {
  .button:hover {
    border-color: #036;
  }
}
```
