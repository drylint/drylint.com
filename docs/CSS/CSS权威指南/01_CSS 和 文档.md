# CSS 和 文档

## 元素

### 置换元素和非置换元素

#### 置换元素

用来置换元素内容的部分不由文档内容直接表示。

比如 `img` 元素，他的内容由文档之外的图像文件替换，元素本身没有内容。

`input` 元素类似，根据类型不同，会替换成单选按钮、复选框或文本输入框。

#### 非置换元素

HTML 元素大部分是非置换元素，即元素的内容由用户代理（通常是浏览器）在元素自身生成的框中显示。

### 元素的显示方式

两种基本类型：块级、行内。

#### 块级元素

默认生成一个填满父级元素内容区的框，常见的如 `p` 和 `div`。

置换元素可以是块级元素，但往往不是。

列表元素除了多一个记号以外，和其他块级元素没有什么区别。

#### 行内元素

在一行文本内生成元素框，不断行，常见的如 `a`。

在 HTML 中，块级元素不能出现在行内元素中，但是 CSS 并不限制它的显示方式，相互之间可以嵌套。

### link 标签

link 标签必须放在 head 元素中，不能放在其他元素中。

`@import url()` 可以在一个样式表中加载另一个样式表，但必须放在样式表的开头。

#### link 标签的属性

- `rel` relation 的简称
- `type` 属性值始终为 `text/css`
- `href` 要加载的样式表的地址，绝对或相对路径
- `media` 值是一个或多个媒体描述符。如 `media="ecreen, projection"`

### `style` 元素

```html
<style type="text/css">

</style>
```

`style` 元素也有和 `link` 一样的 `media` 属性

元素内可以直接写样式，也可以通过 `@import` 指令引入外部样式表。

### `@import` 指令

与 link 元素一样，加载外部样式表，两者唯一的区别就是语法和书写的位置，功能完全一样。

一个文档中可以有多个 `@import` 指令。

和 link 类似，也可以显示指定导入的样式表应用于何种媒体（media）。

```css
@import url(a.css) all;
@import url(b.css) screen;
@import url(c.css) print;
```

### 行内样式

```html
<p style="color: red">hello world</p>
```

HTML 标签中，除了 body 元素以外，所有标签都可以设定 `style` 属性。

## 媒体查询

媒体查询可以用在以下几处：

- link 元素的 media 属性
- style 元素的 media 属性
- @import 声明的媒体描述符部分
- @media 声明的媒体描述符部分

### 简单的媒体查询

```css
@media projection {
  body{
    background: red;
  }
}
```

```css
@media all {
  h1{
    color: red;
  }
}
```

以上代码表示所有定义所有设备使用的样式，去掉收尾两行的媒体查询效果完全一样，因此没有必要。

以上例子中的 `projection` 和 `all` 就是设定媒体查询的位置。

### 媒体类型

- `all` 用于所有媒体类型
- `print` 用于打印文档、预览打印效果时
- `screen` 用于屏幕媒体，如显示器，手机显示器等
- `projection` 部分浏览器支持，用于以幻灯片形式展示
- `handheld` 部分移动设备支持，但行为不一致。

多个媒体用逗号分隔书写，以下四种方式均可：

```html
<link type="text/css" href="a.css" media="screen, print">

<style type="text/css" media="screen, print"></style>
```

```css
@import url(a.css) screen, print;

@media screen, print{
  
}
```

### 媒体描述符

一个媒体描述符包含 一个媒体类型 和 一个或多个媒体特性列表，特性描述符放在圆括号中。如果不指定媒体类型，则应用到所有媒体类型上。

所以，以下两种方式是等效的：

```css
@media all and (min-resolution: 96dpi){}
```

```css
@media and (min-resolution: 96dpi){}
```

特性描述符格式类似于 CSS 中的一对属性和值。区别是特性描述符可以不指定值。

比如：`(color)` 匹配任何彩色媒体，`(color: 16)` 匹配任何色深为 16 位的彩色媒体。

其实，不指定值时相当于在做判断，`(color)` 的意思是：当前媒体是彩色的即可。

媒体查询中的逻辑关键字有两个：

- `and` 连接两个或以上的媒体特性，必须同时满足才为真值。

  ```css
    @media (color) and (orientation: landscape) and (min-device-width: 800px){
      h1{
        color: red;
      }
    }
  ```

- `not` 对整个查询取反，not 后所有条件为真则不应用样式。`not` 关键字只能写在开头，写在中间则媒体查询将被忽略。

  ```css
    @media not (color) and (orientation: landscape) and (min-device-width: 800px){
      h1{
        color: red;
      }
    }
  ```

- `only` 在不支持媒体查询的浏览器中，隐藏样式表。只能用在开头，否则无效。

  ```css
  @import url(a.css) only all;
  ```

  以上写法在支持媒体查询的浏览器中 `only` 会被忽略，在不支持媒体查询的浏览器中，将会视为无效。

媒体设备不支持 `or` 关键字，但分隔媒体查询的都好相当于 `or`的作用。

```css
/* 无效写法 */
@media screen and (max-color) or (monochrome){}
```

```css
/* 有效写法 */
@media screen and (max-color), screen and (monochrome){}
```

### 媒体特性描述符和值的类型

- `min-width`
- `max-width`
- `device-width`
- `min-device-width`
- `max-device-width`
- `height`
- `min-height`
- `max-height`
- `device-height`
- `min-device-height`
- `max-device-height`
- `aspect-ratio`
- `min-aspect-ratio`
- `max-aspect-ratio`
- `device-aspect-ratio`
- `min-device-aspect-ratio`
- `max-device-aspect-ratio`
- `color`
- `min-color`
- `max-color`
- `color-index`
- `min-color-index`
- `max-color-index`
- `monochrome`
- `min-monochrome`
- `max-monochrome`
- `resolution`
- `min-resolution`
- `max-resolution`
- `orientation`
- `scan`
- `grid`

另外还加入了两个新的值类型

- `<ratio>`
- `<resolution>`

## 特性查询

如果浏览器支持某 CSS 属性，则应用以下一段样式。

```css
/* 如果支持 display: grid 则使用一段样式 */
@supports (display: grid ) {

}
```

通常永在渐进增强样式中，已经有不错的样式了，但想在支持的情况下写更好的样式时。

不支持的会直接忽略此段。不支持 `@supports` 也会直接忽略。

特性查询和媒体查询可以互相嵌套：

```css
@supports (display: flex) {
    @media screen {
        /* screen flexbox styles go here */
    }
    @media print {
        /* print flexbox styles go here */
    }
}
```

```css
@media screen and (max-width: 30em){
    @supports (display: flex) {
        /* small-screen flexbox styles go here */
    }
}
@media screen and (min-width: 30em) {
    @supports (display: flex) {
        /* large-screen flexbox styles go here */
    }
}
```

特性查询和媒体查询一样支持逻辑运算符

```css
@supports (display: grid) and (shape-outside: circle()) {
  /* grid-and-shape styles go here */
}
```

以上等效于

```css
@supports (display: grid) {
  @supports (shape-outside: circle()) {
    /* grid-and-shape styles go here */
  }
}
```

取反：

```css
@supports not (display: grid) {
  /* grid-not-supported styles go here */
}
```

连着用：

```css
@supports (color: black) and ((display: flex) or (display: grid)) {
  /* styles go here */
}
```

特性查询需要写属性和值，不能只写属性：

```css
@supports (display) {
  /* grid styles go here */
}
```
