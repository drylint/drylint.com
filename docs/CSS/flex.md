# flex 语法部分

[toc]

## 一、Flex

将元素设置为 Flex 布局

```css
.flex {
  display: flex;
  display: flexbox;
  display: inline-flex; /* 行内元素也可以使用 Flex 布局。 */
  display: inline-flexbox;
}
```

设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
![Flex布局](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

## 二、容器的属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### 1. `flex-direction` 主轴的方向

```css
flex-direction: row(默认) | row-reverse | column | column-reverse;
```

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

### 2. `flex-wrap` 换行

```css
flex-wrap: nowrap(默认) | wrap | wrap-reverse;
```

- nowrap（默认）：不换行。
- wrap：换行，第一行在上方。
- wrap-reverse：换行，第一行在下方。

### 3. `flex-flow` 主轴 + 换行 简写

`flex-flow` 是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`

```css
flex-flow: <flex-direction> | <flex-wrap>;
```

```css
.div1 {
  flex-flow: row nowrap;
}
```

### 4. `justify-content` 项目在主轴上的对齐方式

```css
.box {
  display: flex;
  justify-content: flex-start(默认) | flex-end | center | space-between | space-around;
}
```

具体对齐方式与轴的方向有关，假设主轴为从左到右:

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### 5. `align-items` 项目在交叉轴上如何对齐

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch(默认);
}
```

假设交叉轴从上到下:

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

### 6. `align-content` 有多根主轴时，各主轴在交叉轴的对齐方式

> 如果项目只有一根轴线，该属性不起作用。

```css
.box {
  display: flex;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch (默认);
}
```

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

## 三、项目的属性

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### 1. `order` 项目的排列顺序

数值越小，排列越靠前，默认为 `0` 。

```css
.item {
  order: <integer>; /* default 0 */
}
```

```css
.item1 {
  order: 3;
}
.item2 {
  order: 2;
}
.item3 {
  order: 1;
}
```

### 2. `flex-grow` 项目的放大比例

默认为 `0` ，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的 `flex-grow` 属性都为 `1` ，则它们将等分剩余空间（如果有的话）。

如果一个项目的 `flex-grow` 属性为 `2` ，其他项目都为 `1` ，则前者占据的剩余空间将比其他项多一倍。

### 3. `flex-shrink` 项目的缩小比例

默认为 `1` ，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

如果所有项目的 `flex-shrink` 属性都为 `1` ，当空间不足时，都将等比例缩小。

如果一个项目的 `flex-shrink` 属性为 `0` ，其他项目都为 `1` ，则空间不足时，前者不缩小。

负值对该属性无效。

### 4. `flex-basis` 在分配多余空间之前，项目占据的主轴空间

浏览器根据这个属性，计算主轴是否有多余空间。

默认值为 `auto` ，即项目的本来大小。手动指定后：` 剩余空间 = 总长度 - 此属性值 `

```css
.item {
  flex-basis: <length> | auto(默认);
}
```

设为跟 `width` 或 `height` 属性一样的值（比如 `350px` ），则项目将占据固定空间。

### 5. `flex`： `flex-grow`, `flex-shrink` 和 `flex-basis`的简写

默认值为 `0 1 auto`。后两个属性可以不写。

该属性有两个快捷值：`auto (1 1 auto)` 和 `none (0 0 auto)`。

```css
.item {
  flex: <flex-grow> <flex-shrink> <flex-basis>; /* 默认：0 1 auto */
}
```

```css
.item1 {
  flex: auto; /* 相当于 1 1 auto */
}
.item2 {
  flex: none; /* 相当于 0 0 auto */
}

/* 当 flex 值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0% */
.item3 {
  flex: 1; /* 相当于 1 1 0% */
}

/* 当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1 */
.item4 {
  flex: 0%; /* 相当于 1 1 0% */
}
.item5 {
  flex: 24px; /* 相当于 1 1 24px */
}

/* 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0% */
.item6 {
  flex: 2 3; /* 相当于 2 3 0% */
}

/* 当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1 */
.item7 {
  flex: 2 24px; /* 相当于 2 1 24px */
}
```

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 6. `align-self` 单个项目在交叉轴的对齐方式

会覆盖容器设置的 `align-items` 属性。默认值为 `auto` ，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。

```css
.item {
  align-self: auto(默认) | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了 `auto`，其他都与 `align-items` 属性完全一致。

# `flex` 实战部分

## 一、骰子的布局

骰子一面从 1 个点到 9 个点的布局。

![骰子的布局](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071328.png)

以下为基础模板，项目数量动态增加：

```html
  <style>
    .boxStyle {
      width: 350px;
      height: 350px;
      background: #e0e0e0;
    }
    .itemStyle {
      width: 100px;
      height: 100px;
      background: #666;
      border-radius: 50%;
    }
  </style>

  <div class="boxStyle box">
    <span class="itemStyle item"></span>
  </div>
```

### 1. 一个项目

#### 左上 left-top

```css
.box {
  display: flex;
}
```

#### 中上 center-top

```css
.box {
  display: flex;
  justify-content: center;
}
```

#### 右上 right-top

```css
.box {
  display: flex;
  justify-content: flex-end;
}
```

#### 左中 left-middle

```css
.box {
  display: flex;
  align-items: center;
}
```

#### 中中 center-middle

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### 右中 center-middle

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
```

#### 左下 center-middle

```css
.box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
```

#### 中下 center-middle

```css
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
```

#### 右下 center-middle

```css
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
```

### 2. 两个项目

#### 水平顶部两端对齐

```css
.box {
  display: flex;
  justify-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071308.png)

#### 垂直左部两端对齐

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071309.png)

#### 垂直居中两端对齐

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071310.png)

#### 垂直右部两端对齐

```css
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071311.png)

#### 上左，中中

```css
.box {
  display: flex;
}
.item:nth-child(2) {
  align-self: center;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071312.png)

#### 上左，下右

```css
.box {
  display: flex;
  justify-content: space-between;
}
.item:nth-child(2) {
  align-self: flex-end;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071313.png)

### 3. 三个项目

#### 左上，中中，右下

```css
.box {
  display: flex;
  justify-content: space-between;
}
.item:nth-child(2) {
  align-self: center;
}
.item:nth-child(3) {
  align-self: flex-end;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071314.png)

### 4. 四个项目

#### 上部三个两端对齐，底部一个左对齐

```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
```

#### 上部三个两端对齐，底部一个右对齐

```html
  <div class="boxStyle box">
    <div class="row">
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
    </div>
    <div class="row">
      <span class="itemStyle item"></span>
    </div>
  </div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.row {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
.row:nth-child(2) {
  justify-content: flex-end;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071315.png)

#### 顶部两个两端对齐，底部两个两端对齐

```html
  <div class="boxStyle box">
    <div class="row">
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
    </div>
    <div class="row">
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
    </div>
  </div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.row {
  flex-basis: 100%; /* 项目 row 占据主轴空间，占满设为 100% */
  display: flex;
  justify-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071316.png)

### 5. 六个项目

#### 顶部三个两端对齐，底部三个两端对齐

```html
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071317.png)

#### 左边三个垂直两端对齐，右边三个垂直两端对齐

```css
.box {
  display: flex;
  flex-flow: wrap column;
  justify-content: space-between;
  align-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071318.png)

#### 顶部三个两端对齐，中部一个居中对齐，底部两个两端对齐

```html
  <div class="boxStyle box">
    <div class="row">
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
    </div>
    <div class="row">
      <span class="itemStyle item"></span>
    </div>
    <div class="row">
      <span class="itemStyle item"></span>
      <span class="itemStyle item"></span>
    </div>
  </div>
```

```css
.box {
  display: flex;
  flex-flow: wrap;
  align-content: space-between;
}
.row {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
.row:nth-child(2) {
  justify-content: center;
}
.row:nth-child(3) {
  justify-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071319.png)

### 6. 九个项目

#### 三行均为三个项目两端对齐

```html
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
```

```css
.box {
  display: flex;
  flex-flow: wrap;
  align-content: space-between;
  justify-content: space-between;
}
```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071320.png)

## 二、网格布局

### 1. 基本网格布局

```html
  <style>
    .gridStyle {
      border: 1px solid #f00;
      height: 100px;
    }
    .gridCellStyle {
      background: #aaa;
      height: 100%;
    }
    .gridCellStyle:nth-child(2) {
      background: #bbb;
    }
    .gridCellStyle:nth-child(3) {
      background: #ccc;
    }
    .gridCellStyle:nth-child(4) {
      background: #ddd;
    }
  </style>

  <!-- 一行两列均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
  <!-- 一行三列均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
  <!-- 一行四列均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
```

```css
.grid {
  display: flex;
}
.gridCell {
  flex: 1; /* 相当于 flex: 1 1 0%; */
}
```

### 2. 百分比布局

某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。等比缩放保持不变。

```html
  <!-- 第一格固定宽度 50%，其余均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
  <!-- 第二格固定宽度 50%，其余均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
  <!-- 第一格固定宽度 40%，第三格固定宽度 20%，其余均分 -->
  <div class="gridStyle grid">
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
    <div class="gridCellStyle gridCell"></div>
  </div>
```

```css
.grid {
  display: flex;
}
.gridCell {
  flex: 1;
}

.grid:nth-child(1) .gridCell:nth-child(1) {
  flex: 0 0 50%;
}
.grid:nth-child(2) .gridCell:nth-child(2) {
  flex: 0 0 50%;
}
.grid:nth-child(3) .gridCell:nth-child(1) {
  flex: 0 0 40%;
}
.grid:nth-child(3) .gridCell:nth-child(3) {
  flex: 0 0 20%;
}
```

### 3. 圣杯布局

圣杯布局（Holy Grail Layout）指的是一种最常见的网站布局。页面从上到下，分成三个部分：头部（header），躯干（body），尾部（footer）。其中躯干又水平分成三栏，从左到右为：导航、主栏、副栏。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071323.png)

```html
<body>
  <header></header>
  <main>
    <nav></nav>
    <section>
    </section>
    <aside></aside>
  </main>
  <footer></footer>
</body>
```

```css
* {
  margin: 0;
  padding: 0;
}
body {
  background: #e5e5e5;
  min-height: 100vh;
  display: flex;
  flex-flow: nowrap column;
}
header,
footer {
  background: #aaa;
  flex: 0 0 8em;
}

nav,
aside {
  flex: 0 0 10em;
}

section {
  flex: 1;
}
main nav {
  background: #bbb;
}
main section {
  background: #ddd;
}
main aside {
  background: #ccc;
}

main {
  flex: 1; /* 在main元素中内容不够撑满时也会撑满，保持 footer 一直在最底部，避免footer因内容不够而移到中间 */
  display: flex;
}
```

### 4. 流式布局

每行固定拥有若干个项目数，超过会自动分行。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071330.png)

#### 情况一 `flex-start` ：每一行项目均分主轴空间，项目之间没有外边距

```html
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .boxStyle {
      width: 350px;
      height: 350px;
      border: 1px solid #f00;
      margin: 50px auto;
    }
    .itemStyle {
      height: 100px;
    }
    .itemStyle:nth-child(n) {
      background: #aaa;
    }
    .itemStyle:nth-child(2n) {
      background: #bbb;
    }
    .itemStyle:nth-child(3n) {
      background: #ccc;
    }
    .itemStyle:nth-child(5n) {
      background: #ddd;
    }
  </style>

  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
  </div>
```

```css
.boxStyle {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.item {
  flex: 1 1 25%; /* 25% 表示均分主轴空间，项目之间不需要外边距的情况 */
}
```

#### 情况二 `flex-between`：项目两端对齐，项目之间需要相等外边距的情况

flex 流式布局中，多行两端对齐，最后一行元素不够时，也会两端对齐，所以需要在容器最后添加 `n - 2` （n 为每一行的项目数）个空标签，宽度与其他项目一样即可。

```html
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="boxStyle box">
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="itemStyle item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
```

```css
.box {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  align-content: flex-start;
}
.item {
  flex: 0 0 21%;
}

/* 由于需要在最后加上两个空标签， ::after 只能添加一个 */

/* 所以还需要在 html 中加一个，也可以直接加两个而不用 ::after */

/*
.box::after {
  content: '';
  width: 21%;
  display: block;
}
*/
```

### 5. 其他布局

悬挂式布局、输入框布局等，容器中除了固定尺寸的项目，另外一个项目充满剩余空间。

在需要充满的项目上设置：

```css
.div1 {
  flex: 1;
}
```
