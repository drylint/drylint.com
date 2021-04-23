# canvas

[toc]

## canvas 元素 `HTMLCanvasElement`

### 属性

#### `width`

type: number

元素宽度，单位为 `px`，默认为 `300` 。

#### `height`

type: number

元素宽度，单位为 `px`，默认为 `150`。

```html
<canvas width="400" height="400">若不支持canvas，则会显示这段文字</canvas>
```

### 方法

#### `getContext('2d' | 'experimental-webgl')`

返回 canvas 的绘制上下文对象，目前可接受参数 `'2d' | 'experimental-webgl'` ，传入其他值不支持，会返回 `null` 。
前者返回 `CanvasRenderingContext2D` 对象，后者返回 `WebGLRenderingContext` 对象.

> `'experimental-webgl'` 只在那些实现了WebGL的浏览器上可用。

#### `toDataURL(in optional DOMString type, in any ...args)`

#### `toBlob(in Function callback, in optional DOMString type, in any ...args)`

#### `mozGetAsFile(in DOMString name, in optional DOMString type)`

非标准，不建议使用

#### `void mozFetchAsStream(in nsIInputStreamCallback callback, [optional] in DOMString type)`

非标准，不建议使用

## `CanvasRenderingContext2D`：`HTMLCanvasElement.getContext('2d')`

在 canvas 元素对象上调用 `getContext('2d')` 方法，即可获得这个绘画上下文对象。

```html
<canvas width="400" height="400">若不支持则会显示这段文字</canvas>

<script>
    let canvasElement = document.querySelector('canvas')
    let ctx = canvasElement.getContext('2d')
</script>
```

### 属性

- `canvas`
- `fillStyle`
- `strokeStyle`
- `font`
- `globalAlpha`
- `globalCompositeOperation`
- `imageSmoothingEnabled`
- `lineCap`
- `lineDashOffset`
- `lineJoin`
- `lineWidth`
- `miterLimit`
- `shadowBlur`
- `shadowColor`
- `shadowOffsetX`
- `shadowOffsetY`
- `textAlign`
- `textBaseline`
- 以下几个为实验性API，不建议使用
- `currentTransform`
- `direction`
- `filter`
- `imageSmoothingQuality`

#### canvas

通过调用内部的 `canvas` 属性，可以反向获取到此 canvas 元素。只读属性，赋值给该属性会被忽视。

```js
let canvasElement = document.querySelector('canvas')
let ctx = canvasElement.getContext('2d')
console.log(ctx.canvas) // 获取到的其实就是 canvasElement 元素
```

#### font

绘制文字的大小及字体。 使用和 CSS font 属性规范相同的字符串值。

符合 CSS font 语法的 DOMString 字符串。默认字体是 `'10px sans-serif'`。

```js
ctx.font = '40px Microsoft Yahei'
```

#### textAlign

绘制文本的水平对齐方式。

注意，该对齐是基于 `fillText()/strokeText()` 中提供的绘制点的 x 值，也就是说文本一半在 x 的左边，一半在 x 的右边。可以理解为：计算 x 的位置时本来是默认从文字的左端算起，改为从文字的中心算起。

所以 `textAlign = 'center'` 表示文本从 `x - 50% * width` 位置开始绘制。

```js
ctx.textAlign = 'start'(默认值) | 'end' | 'left' | 'right' | 'center'
```

- `left` 文本左对齐。（文本左端对齐绘制点 x 的位置）
- `right` 文本右对齐。（文本右端对齐绘制点 x 的位置）
- `center` 文本居中对齐。（文本平均分布在绘制点 x 位置两侧）
- `start` 默认值，文本开始的位置对齐 绘制点 x（文本方向从左向右时相当于 `left` 值，文本从右向左时相当于 `end` 值）。
- `end` 文本结束的位置对齐绘制点 x（与 start 恰好相反）。

`direction` 属性会对此属性产生影响。如果 `ctx.direction = 'ltr'` （从左向右） ，则 left 和 start 的效果相同，right 和 end 的效果相同；如果 `ctx.direction = 'rtl'`（从右向左） ，则 left 和 end 的效果相同，right 和 start 的效果相同。

#### textBaseline

文本基线的对齐方式，决定文本垂直方向的对齐方式。

```js
ctx.textBaseline = 'alphabetic'（默认值） | 'top' | 'hanging' | 'middle' | 'ideographic' | 'bottom';
```

- `alphabetic` 默认值，文本的字母的基线与 y 坐标对齐。
- `ideographic` 文本的底端与 y 坐标对齐。
- `top` 文本的顶端的上部对齐 y 坐标。（文本的顶端在 y 坐标之下。）
- `hanging` 文本的顶端对齐 y 坐标。
- `middle` 文本的正中间穿过 y 坐标。
- `bottom` 文本的底端与 y 坐标对齐。 与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母。

#### fillStyle

使用内部填充方式的颜色和样式。默认值是 `'#000'` （黑色）。

```js
ctx.fillStyle = color // css 颜色值
ctx.fillStyle = gradient // CanvasGradient 对象 （线性渐变或者放射性渐变）
ctx.fillStyle = pattern // CanvasPattern 对象 （可重复图像）
```

```js
ctx.fillStyle = '#ff00ff'
```

#### strokeStyle

使用外部描边方式的颜色和样式。默认值是 `'#000'` （黑色）。

```js
ctx.strokeStyle = color;
ctx.strokeStyle = gradient;
ctx.strokeStyle = pattern;
```

```js
ctx.strokeStyle = '#ff00ff'
```

#### globalAlpha

在canvas上绘图之前，设置图形和图片透明度的属性。 数值的范围从 `0.0` （完全透明）到 `1.0` （默认，完全不透明）。

```js
ctx.globalAlpha = 0.5
```

#### globalCompositeOperation

设置要在绘制新形状时应用的合成操作的类型，其中 type 是用于标识要使用的合成或混合模式操作的字符串。

```js
ctx.globalCompositeOperation = 'xor'
```

可能的取值为：

- `source-over` 默认。在目标图像上显示源图像。
- `source-atop` 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。
- `source-in` 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。
- `source-out` 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。
- `destination-over` 在源图像上方显示目标图像。
- `destination-atop` 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。
- `destination-in` 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。
- `destination-out` 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
- `lighter` 显示源图像 + 目标图像。
- `copy` 显示源图像。忽略目标图像。
- `xor` 使用异或操作对源图像与目标图像进行组合。

#### lineWidth

设置线段厚度（宽度），默认为 1。单位为 `px`。

```js
ctx.lineWidth = 10 //  0、 负数、 Infinity 和 NaN 会被忽略。
```

#### lineCap

一条线段末端的样式。

```js
ctx.lineCap = 'butt'（默认值） | 'round' | 'square'
```

- `butt` 默认值，线段末端普通平直边缘。
- `round` 线段末端加圆形帽子（增加了一个半径为线段宽度一半的半圆）
- `square` 线段末端加正方形帽子（增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。）

帽子不包含在线条长度内。有帽子（`round / square`）会比线条长度长一点点。

下图分别为：`butt, round, square`

![lineCap](https://mdn.mozillademos.org/files/236/Canvas_linecap.png)

#### lineDashOffset

设置虚线偏移量的属性，例如可以实现 “蚂蚁线“ 的效果。

```js
ctx.lineDashOffset = 0.0 // float精度的数字。 初始值为 0.0。
```

#### lineJoin

设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起，通俗说就是线条拐点的样式

```js
ctx.lineJoin = 'miter'（默认值） | 'bevel' | 'round'
```

- `miter` 默认值，通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域（尖角）。这个设置可以通过 miterLimit 属性看到效果。
- `round` 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状（圆角）。 圆角的半径是线段的宽度。
- `bevel` 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。

下图从上到下分别为：`round, bevel, miter`：

![lineJoin](https://mdn.mozillademos.org/files/237/Canvas_linejoin.png)

#### miterLimit

只有当 `lineJoin` 属性为 `'miter'` 时，`miterLimit` 属性才有效。

设置斜接面的限制比例，此属性是为了避免斜接长度过长。如果斜接长度超过 `miterLimit` 的值，边角会以 `lineJoin` 的 `bevel` 类型来显示。

```js
ctx.miterLimit = 10 // 整数，0、负数、Infinity 和 NaN 都会被忽略。
```

下图从左到右 `miterLimit` 值越来越小：

![miterLimit](https://mdn.mozillademos.org/files/240/Canvas_miterlimit.png)

#### shadowColor

设置/获取绘制图像的阴影颜色。值为 CSS 中合法 color 值。需设置 `shadowBlur` 值不为默认的 `0` 才有效果。

```js
ctx.shadowColor = 'fully-transparent black' // 默认值
ctx.shadowColor = '#f00'
```

```js
ctx.shadowColor = 'rgba(255, 255, 0, 0.8)'
ctx.shadowBlur = '50'
```

#### shadowBlur

控制绘制图像的模糊程度，它既不对应像素值也不受当前转换矩阵的影响。需设置 `shadowColor` 值不为全透明才有效果。

```js
ctx.shadowBlur = 0 // 默认值
ctx.shadowBlur = 10
```

```js
ctx.shadowColor = 'rgba(255, 255, 0, 0.8)'
ctx.shadowBlur = '50'
```

#### shadowOffsetX

设置/获取阴影部分的水平偏移距离。值为 `float` 类型。默认值是 `0` 。`Infinity` 或者 `NaN` 都会被忽略。

需设置 `shadowColor` 值不为全透明才有效果。

```js
ctx.shadowOffsetX = 0 // 默认值
ctx.shadowOffsetX = 10
```

#### shadowOffsetY

设置/获取阴影部分的垂直偏移距离。值为 `float` 类型。默认值是 `0` 。`Infinity` 或者 `NaN` 都会被忽略。

```js
ctx.shadowOffsetY = 0 // 默认值
ctx.shadowOffsetY = 10
```

#### currentTransform （实验属性）

设置/获取当前变换的矩阵。可以通过Canvas2D API 返回或者赋值为SVGMatrix对象。

```js
ctx.currentTransform = value
```

#### direction （实验属性）

控制绘制的文本方向。

```js
ctx.direction = 'inherit' （默认值） | 'ltr' | 'rtl'
```

#### filter （实验属性）

模糊、灰度等过滤效果的属性 。它类似于 CSS filter 属性，并且接受相同的函数。

```js
ctx.filter = '<filter-function1> [<filter-function2] [<filter-functionN]'
ctx.filter = 'none'
```

#### imageSmoothingEnabled （实验属性）

设置/获取是否开启图片是否平滑的属性。

```js
ctx.imageSmoothingEnabled = true | false （默认值）
```

#### imageSmoothingQuality （实验属性）

设置图像平滑度的属性。

```js
ctx.imageSmoothingQuality = 'low' | 'medium' | 'high'
```

### 方法

- `addHitRegion()`
- `arc()`
- `arcTo()`
- `beginPath()`
- `bezierCurveTo()`
- `clearHitRegions()`
- `clearRect()`
- `clip()`
- `closePath()`
- `createImageData()`
- `createLinearGradient()`
- `createPattern()`
- `createRadialGradient()`
- `drawFocusIfNeeded()`
- `drawImage()`
- `drawWidgetAsOnScreen()`
- `drawWindow()`
- `ellipse()`
- `fill()`
- `fillRect()`
- `fillText()`
- `getImageData()`
- `getLineDash()`
- `isPointInPath()`
- `isPointInStroke()`
- `lineTo()`
- `measureText()`
- `moveTo()`
- `putImageData()`
- `quadraticCurveTo()`
- `rect()`
- `removeHitRegion()`
- `resetTransform()`
- `restore()`
- `rotate()`
- `save()`
- `scale()`
- `scrollPathIntoView()`
- `setLineDash()`
- `setTransform()`
- `stroke()`
- `strokeRect()`
- `strokeText()`
- `transform()`
- `translate()`

#### ---- 创建路径（未绘制） ----

#### beginPath()

参数：无

返回值：无

开始新路径。

#### moveTo(x, y)

参数：起点横坐标 `x`，起点纵坐标 `y`

移动新路径的起始点到指定的坐标 `x`，`y`处。

```js
ctx.moveTo(50, 50)
```

#### lineTo(x, y)

参数：终点横坐标 `x`，终点纵坐标 `y`

创建一条直线路径。

从当前坐标点绘制一条直线到指定的终点坐标 `x`，`y`处。（此时不会真正绘制，使用`ctx.stroke()` 才会真正绘制。）

```js
ctx.moveTo(100, 50)
```

#### closePath()

参数：无

返回值：无

闭合路径，将笔点返回到当前子路径起始点。

它尝试从当前点到起始点绘制一条直线将路径闭合。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。

#### rect(x, y, width, height)

参数：矩形起点的横坐标 `x`，纵坐标 `y`，矩形宽度 `width`，高度 `height`。

创建矩形路径。需使用 `ctx.fill()` 或者 `ctx.stroke()` 才会真正绘制。

> 可使用 `ctx.fillRect()` 或 `ctx.strokeRect()` 方法，一步即可创建路径并绘制。

#### arc(x, y, radius, startAngle, endAngle, anticlockwise?)

参数：圆心横坐标 `x`，纵坐标 `y`，圆弧半径 `radius`，圆弧的起始点 `startAngle`（x 轴方向开始计算，单位为弧度），圆弧的终点 `endAngle`，是否逆时针绘制 `anticlockwise` （ `true | false`）。

创建圆弧路径。

```js
ctx.arc(75, 75, 50, 0, 2 * Math.PI)
```

#### arcTo(cpx1, cpy1, cpx2, cpy2, radius)

参数：控制点1的横坐标 `cp1x`，纵坐标 `cp1y`，控制点2的横坐标 `cp2x`，纵坐标 `cp2y`，圆弧的半径 `radius`。

根据控制点切线和半径创建圆弧路径。

使用当前路径坐标为基准点，当前坐标与控制点1连接一条直线，控制点1与控制点2连接另一条直线，将两条直线作为指定半径的圆的切线，画出两条切线之间的弧线路径。

```js
ctx.arcTo(150, 100, 50, 20, 30)
```

#### ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)

参数：椭圆圆心横坐标 `x`，纵坐标 `y`，长轴的半径 `radiusX`, 短轴的半径`radiusY`, 旋转弧度 `rotation`（单位：弧度，非角度），起始点弧度 `startAngle`（x 轴方向开始计算，单位：弧度），终点的弧度 `endAngle`，是否逆时针绘制 `anticlockwise` （ `true | false`）。

创建椭圆路径。

```js
ctx.ellipse(100, 100, 50, 75, 45 * Math.PI/180, 0, 2 * Math.PI) //倾斜45°角
```

#### quadraticCurveTo(cpx, cpy, x, y)

参数：控制点的横坐标 `cpx`，纵坐标 `cpy`，结束点的横坐标 `x`，纵坐标 `y`。

创建二次贝塞尔曲线路径。

#### bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)

参数：控制点1的横坐标 `cp1x`，纵坐标 `cp1y`，控制点2的横坐标 `cp2x`，纵坐标 `cp2y`，结束点的横坐标 `x`，纵坐标 `y`。

创建三次贝赛尔曲线路径。该方法需要三个坐标点。

第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。

#### ---- 绘制路径 ----

#### fill(path?, fillRule?)

参数：

- `fillRule` 一种算法，决定点是在路径内还是在路径外。

    允许的值：
    `'nonzero'` : 默认值，非零环绕规则。
    `'evenodd'`: 奇偶环绕规则。

- `path` 需要填充的 `Path2D` 路径。

    `Path2D` 构造函数。创建一个新的 `Path2D` 对象。拥有 `addPath() / closePath() / moveTo() / lineTo() / arc() / arcTo() / bezierCurveTo() / quadraticCurveTo()` 等实例方法。

填充绘制已创建的路径。采取非零环绕或者奇偶环绕规则。

```js
ctx.fill()
ctx.fill(fillRule)
ctx.fill(path, fillRule)
```

#### stroke(path?)

参数：`path` 表示绘制的路径 Path2D 。

使用非零环绕规则，绘制已创建的路径。

```js
ctx.stroke()
```

#### clip(path?, fillRule?)

参数，同 `fill()`

从原始画布中剪切当前已绘制区域。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）。

可以在使用 `clip()` 方法前通过使用 `save()` 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 `restore()` 方法）。

```js
let canvasElement = document.querySelector('canvas')
let ctx = canvasElement.getContext("2d")

// 矩形区域
ctx.rect(0, 0, 200, 150)
ctx.stroke()
ctx.clip() // 使用 clip() 方法后，之后绘制的图像只有在这个矩形区域内才会显示，超出部分不显示。

// 在 clip() 之后绘制绿色矩形
ctx.fillStyle="#f00"
ctx.fillRect(50,50,200,200) // 绘制的图形有一部分超出了 clip 的矩形区域，超出部分被隐藏。

```

#### drawFocusIfNeeded(path?, element?)

```html
<body>
    <canvas id="canvas">
        <input id="input1">
    </canvas>
    <script>
        let canvas = document.querySelector('canvas')
        let ctx = canvas.getContext('2d')
        let input1 = document.querySelector('input')
        input1.focus()

        ctx.beginPath()
        ctx.rect(10, 10, 30, 30)
        ctx.drawFocusIfNeeded(input1)
    </script>
</body>
```

#### scrollPathIntoView() 实验方法

将当前或给定的路径滚动到窗口。类似于 `Element.scrollIntoView()`。

#### isPointInPath(path?, x, y, fillRule?)

参数：需要检测的坐标点 `x`, `y` 坐标。`path` 为 `path2D` 路径，`fillRule` 默认非零环绕规则。

判断在当前路径中是否包含某个坐标点。只要在路径非零环绕规则包围范围内即可返回 `true` 。

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.rect(0, 0, 100, 100)
ctx.stroke()
// ctx.strokeRect(0, 0, 100, 100)

console.log(
    ctx.isPointInPath(0, 0), // true
    ctx.isPointInPath(10, 10), // true
    ctx.isPointInPath(100, 100), // true
    ctx.isPointInPath(101, 101), // false

    ctx.isPointInStroke(0, 0), // true
    ctx.isPointInStroke(10, 10), // false
    ctx.isPointInStroke(100, 100), // true
    ctx.isPointInStroke(101, 101) // false
)
```

#### isPointInStroke(path?, x, y)

判断在当前路径的描边线上是否包含某个坐标点。必须在路径线之上才会返回 `true` 。

```js
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.rect(0, 0, 100, 100)
ctx.stroke()
// ctx.strokeRect(0, 0, 100, 100)

console.log(
    ctx.isPointInPath(0, 0), // true
    ctx.isPointInPath(10, 10), // true
    ctx.isPointInPath(100, 100), // true
    ctx.isPointInPath(101, 101), // false

    ctx.isPointInStroke(0, 0), // true
    ctx.isPointInStroke(10, 10), // false
    ctx.isPointInStroke(100, 100), // true
    ctx.isPointInStroke(101, 101) // false
)
```

#### ---- 矩形 ----

#### fillRect(x, y, width, height)

参数：填充绘制矩形的起始坐标点 `x`, `y`，以及填充的宽高 `width`, `height`。

填充一个矩形。

```js
ctx.fillRect(0, 0, 100, 100)
```

#### strokeRect(x, y, width, height)

参数：描边绘制矩形的起始坐标点 `x`, `y`，以及描边的宽高 `width`, `height`。

> 此方法直接绘制到画布而不修改当前路径，因此任何后续 `fill()` 或 `stroke()` 调用对它没有影响。

```js
ctx.strokeRect(0, 0, 100, 100)
```

#### clearRect(x, y, width, height)

参数：要擦除的矩形的起始坐标点 `x`, `y`，以及擦除的宽高 `width`, `height`。

擦除一片矩形区域。

#### ---- 文本 ----

#### fillText()

#### strokeText()

#### measureText()

#### ---- 线形 ----

#### getLineDash()

#### setLineDash()

#### ---- 渐变和图案 ----

#### createLinearGradient()

#### createPattern()

#### createRadialGradient()

#### ---- 绘制图像 ----

#### drawImage()

#### ---- 像素控制 ----

#### createImageData()

#### getImageData()

#### putImageData()

#### ---- 点击区域 ----

#### addHitRegion() 实验方法

#### removeHitRegion() 实验方法

#### clearHitRegions() 实验方法

#### ---- canvas 状态 ----

#### save()

#### restore()

#### ---- 变换 ----

#### rotate()

#### scale()

#### translate()

#### transform()

#### setTransform()

#### resetTransform() 实验方法

#### ---- 非标准方法 ----

#### drawWidgetAsOnScreen() 非标准

#### drawWindow() 非标准

#### 非零环绕规则

- 看一块区域是否会被填充
- 从这个区域拉一条直线到最外面
- 所有和这条直线相交的轨迹，方向为顺时针加1，逆时针减1，所有相交点加起来，如果不是0则会被填充，如果是0则不会被填充。

```
  (2)ctx方法
      setLineDash() // 设置虚线
      getLineDash() // 获取虚线宽度集合
      lineDashOffset() // 设置虚线偏移量（负值向右偏移）
   A. 渐变
    var mygrd = ctx.createLinearGradient(x0,y0,x1,y1) //创建线性的渐变对象,作为 strokeStyle 或 fillStyle 属性的值使用。
    //x0 渐变开始点的 x 坐标, y0 渐变开始点的 y 坐标, x1 渐变结束点的 x 坐标, y1 渐变结束点的 y 坐标
    mygrd.addColorStop(0,"black");
    mygrd.addColorStop(0.5,"red");
    mygrd.addColorStop(1,"white");
   B. 重复,在指定的方向内重复指定的元素,
    元素可以是图片、视频，或者其他 <canvas> 元素,被重复的元素可用于绘制/填充矩形、圆形或线条等等。
    //创建重复对象,作为 strokeStyle 或 fillStyle 属性的值使用。
    var pat = ctx.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat");
     image  规定要使用的模式的图片、画布或视频元素。
     repeat 默认。该模式在水平和垂直方向重复。
     repeat-x 该模式只在水平方向重复。
     repeat-y 该模式只在垂直方向重复。
     no-repeat 该模式只显示一次（不重复）。
   C. 创建放射状/圆形渐变对象。作为 strokeStyle 或 fillStyle 属性的值。
    context.createRadialGradient(x0,y0,r0,x1,y1,r1);
     x0 渐变的开始圆的 x 坐标, y0 渐变的开始圆的 y 坐标, r0 开始圆的半径
     x1 渐变的结束圆的 x 坐标, y1 渐变的结束圆的 y 坐标, r1 结束圆的半径
    var grd=ctx.createRadialGradient(75,50,5,90,60,100);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"white");
    ctx.fillStyle=grd;
    ctx.fillRect(10,10,150,100);
 4. 绘制图形
  (1)绘制矩形(矩形定位点x,y将会作为矩形的左上角)
    ctx.rect(x,y,width,height); //创建了矩形,但未绘制,使用 ctx.stroke() 或 ctx.fill() 方法在画布上实际地绘制。
    ctx.fillRect(x,y,width,height); //创建并绘制填充式的矩形, 默认黑色
    ctx.strokeRect(x,y,width,height) //创建并绘制线条矩形, 无填充, 默认黑色
    ctx.clearRect(x,y,width,height); //从x,y位置擦除指定宽高的矩形范围内的一切
   练习: 在画布左上角右上角左下角右下角居中绘制五个 100*80 描边矩形
   练习: 在画布上绘制可以左右移动100*80 矩形
   提示: 使用定时器, 先清除画布己有内容, 再重新绘制矩形 (x不停增加)
  (2)绘制文本
   font 属性设置或返回画布上文本内容的当前字体属性。使用的语法与 CSS font 属性 相同。
   ctx.font = "10px sans-serif";  //默认值, 设置文本字体大小和字体样式
   ctx.font = "style variant weight font-size(line-height) family"
   ctx.textBaseline = "alphabetic|top|hanging|middle|ideographic|bottom";      设置文本绘制基线
   context.textAlign="center|end|left|right|start(默认)";  从指定位置开始start/结束end/往两边绘制center
   var str ="abcxyz"
   ctx.fillText(str,x,y);          绘制实线文本
   ctx.strokeText(str,x,y);        绘制空心文本
   ctx.measureText(str).width;     测量文本宽度为多少像素,必须先绘制出文本才能测量
    练习: 在画布左上角右上角左下角右下角居中绘制文本,
    练习: 在画布绘制左右移动文本对象
  (3)路径
   Path: 由多个坐标点组件任意图形路径不可见,可用于"描边","填充"
   ctx.beginPath();      开始一条新路径, 不再接着前一个路径继续绘制
   ctx.moveTo(x,y);      移动到指定点
   ctx.lineTo(x,y);       从当前点到指定点绘直线
   ctx.closePath();       从当前点回到起始点的路径

   ctx.beginPath();
   ctx.moveTo(20,20);
   ctx.lineTo(20,100);
   ctx.lineTo(70,100);
   ctx.closePath();
   ctx.stroke();

   ctx.clip(); //从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会
        //被限制在被剪切的区域内（不能访问画布上的其他区域）您也可以在使用 clip() 方法前通过
        //使用 save() 方法对当前画布区域进行保存，并在以后的任意时间对其进行恢复（通过 restore() 方法）
    //剪切一个矩形区域
    ctx.rect(50,20,200,120);
    ctx.stroke();
    ctx.clip();
    //剪切之后画一个矩形
    ctx.fillStyle="red";
    ctx.fillRect(0,0,150,100); //虽然从0,0位置开始绘制, 但剪切区域外绘制的图形不可见
   ctx.arc(cx,cy,r,start,end, false/true); //cx,cy圆点位置，r半径, start起始弧度角, end结束弧度角,false顺时针(默认), true逆时针
   //起始角0 表示从 3点钟方向开始顺时针绘制, 经历6点钟(0.5π) 9点钟(1π) 12点钟(1.5π) 回到3点钟(2π)为一个圆
   //ctx.arc()绘制圆形:起始角设置为 0，结束角设置为 2*Math.PI。
   使用角度绘制需用公式计算:
    ctx.arc(250, 200, 100, 30*Math.PI/180,120*Math.PI/180);  //30度到120度绘制弧度
   ctx.arcTo(x1,y1,x2,y2,r);两个交叉切线之间的弧/曲线。
   //x1 两切线交点的横坐标。y1 两切线交点的纵坐标。x2 第二条切线上一点的横坐标。y2 第二条切线上一点的纵坐标。r 弧的半径。
   ctx.stroke();    对当前路径描边
   ctx.fill();      对当前路径填充
  练习:绘制验证码

  (4)图像
   canvas属于客户端技术, 图片保存服务器中,所以浏览器必须先下载要绘制图片, 且等待下载完成再绘制图片.
    var pic = new Image(); //创建图片对象
    pic.src = "url";    //下载图片
    pic.onload = function(){//绑定事件(下载完成事件)
     ctx.drawImage(pic,x,y);    //在画布上定位图像,原始大小图片
     ctx.drawImage(pic,x,y,w,h); //在画布上定位图像，并规定图像的宽度和高度,伸缩图片
     ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height); //剪切图像，并在画布上定位被剪切的部分
    }
   img 规定要使用的图像、画布或视频。
   sx 可选。开始剪切的 x 坐标位置。(基于图片左上角)
   sy 可选。开始剪切的 y 坐标位置。(基于图片左上角)
   swidth 可选。被剪切图像的宽度。
   sheight 可选。被剪切图像的高度。
   x 在画布上放置图像的 x 坐标位置。
   y 在画布上放置图像的 y 坐标位置。
   width 可选。要使用的图像的宽度（伸展或缩小图像）。
   height 可选。要使用的图像的高度（伸展或缩小图像）。

   练习: 在画布正中央画一个图片,可以随鼠标移动而移动小飞机
  (5)变形(重点)
   Canvas绘图有变形技术, 可以针对一个图像在绘制过程中进行变形操作
   ctx.scale(scalewidth,scaleheight) 缩放当前绘图至更大或更小。对绘图进行缩放，所有之后的
    绘图也会被缩放。定位也会被缩放。如果您 scale(2,2)，那么绘图将定位于距离画布左上角两倍远的位置。
    scalewidth 缩放当前绘图的宽度（1=100%，0.5=50%，2=200%，依次类推）。
    scaleheight 缩放当前绘图的高度（1=100%，0.5=50%，2=200%，依次类推）。
   ctx.rotate(弧度) 旋转当前绘图。旋转画笔对象, 旋转轴心是画布圆点 30度用公式(30*Math.PI/180)
   ctx.translate(x,y) 改变画布的原点 (0,0) 位置。之后的绘制坐标全都相对于新的原点来计算
   ctx.transform(a,b,c,d,e,f) 替换绘图的当前转换矩阵。a 水平缩放绘图。b 水平倾斜绘图。
    c 垂直倾斜绘图。d 垂直缩放绘图。e 水平移动绘图。f 垂直移动绘图。
   ctx.setTransform(a,b,c,d,e,f) 将当前转换重置为单位矩阵。然后运行 transform()。
   练习: 在画布绘制二架飞机,飞机1和飞机2,要求飞机2的旋转速度是飞机1的2倍
  (6)画笔状态保存和恢复
   ctx.save();      保存画笔状态
   ctx.restore();    恢复画笔状态
  (7)过渡效果(渐变对象)
  创建渐变对象
   var g = tx.createLinearGradient(x1,y1,x2,y2);
  添加颜色点
   g.addColorStop(offset,color);
  将渐变对象赋值样式
   ctx.fillStyle = g;
```
