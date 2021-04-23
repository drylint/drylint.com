# IntersectionObserver

[toc]

[IntersectionObserver API 使用教程  (阮一峰/2016年11月3日)](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

用于观察某个元素是否进入了"视口"（viewport），即用户能不能看到它。

传统的实现方法是，监听到 `scroll` 事件后，调用目标元素的`getBoundingClientRect()` 方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 `scroll` 事件密集发生，计算量很大，容易造成性能问题。

目前有一个新的 IntersectionObserver API，可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区（重合部分），所以这个 API 叫做“交叉观察器”。

`IntersectionObserver` 是浏览器原生提供的构造函数，构造出的实例可以用来观察一个 DOM 元素是否与视口有交叉区域，也就是是否在视口范围内可见。

`IntersectionObserver` API 是异步的，不随着目标元素的滚动同步触发。

规格写明，`IntersectionObserver` 的实现，应该采用 `requestIdleCallback()`，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。

用法比较简单，构造函数接受两个参数，并返回一个观察器实例对象：

```js
const observer = new IntersectionObserver(callback[, options])
```

- `callback` 是可见性变化时的回调函数
- `options` 可选参数，是配置对象

## 参数：`callback` 回调

回调会被传入两个参数：

- `entries` 一个由 `IntersectionObserverEntry` 对象组成的数组，当观察多个目标元素时则会有多个对象。
- `observer` 被调用的 `IntersectionObserver` 实例。

```js
const callback = (entries, ob) => {
  console.log(entries, ob)
}

const observer = new IntersectionObserver(callback)
```

### 回调参数 `IntersectionObserverEntry` 对象

对象结构是这样的：

```js
{
  rootBounds: DOMRectReadOnly {
    width: 300, // DOMRect 的宽度。
    height: 300, // DOMRect 的高度。
    x: 0, // DOMRect 原点的 x 坐标。
    y: 299, // DOMRect 原点的 y 坐标。
    top: 299, // 返回 DOMRect 的顶部坐标值（通常与 y 相同）。
    right: 300, // 返回 DOMRect 的右坐标值（通常与 x + width 相同）。
    bottom: 599, // 返回 DOMRect 的底部坐标值（通常与 y + height 相同）。
    left: 0, // 返回 DOMRect 的左坐标值（通常与 x​​​​​​​ 相同）。
  },
  boundingClientRect: DOMRectReadOnly {},
  intersectionRect: DOMRectReadOnly {},
  intersectionRatio: 0,
  isIntersecting: false,
  isVisible: false,
  target: HTMLElement,
  time: 791.2299998570234,
}
```

#### `time` 可见性发生变化的时间，是一个高精度时间戳，单位为毫秒

#### `target` 被观察的目标元素，是一个 DOM 节点对象

#### `rootBounds` 根元素的视口范围矩形区域的 `DOMRectReadOnly` 对象数据

相当于对元素直接调用 `getBoundingClientRect()` 方法返回的 `DOMRectReadOnly` 对象数据，如果没有指定根元素（即直接相对于视口滚动），则返回 `null`

`DOMRectReadOnly` 对象结构是这样的：

```js
{
  width: 300, // DOMRect 的宽度。
  height: 300, // DOMRect 的高度。
  x: 0, // DOMRect 原点的 x 坐标。
  y: 299, // DOMRect 原点的 y 坐标。
  top: 299, // 返回 DOMRect 的顶部坐标值（通常与 y 相同）。
  right: 300, // 返回 DOMRect 的右坐标值（通常与 x + width 相同）。
  bottom: 599, // 返回 DOMRect 的底部坐标值（通常与 y + height 相同）。
  left: 0, // 返回 DOMRect 的左坐标值（通常与 x​​​​​​​ 相同）。
}
```

#### `boundingClientRect` 目标元素自身的矩形区域的 `DOMRectReadOnly` 对象数据

#### `intersectionRect` 目标元素与视口的交叉重合区域的 `DOMRectReadOnly` 对象数据

#### `intersectionRatio` 目标元素的可见比例

表明目标元素自身有百分之多少进入了视口范围，也就是 `intersectionRect` 占 `boundingClientRect` 的比例，完全可见时为 `1` ，完全不可见时为 `0`

#### `isIntersecting` 目标元素是否与视口范围有相交部分

如果目标元素与视口范围有相交，则返回 `true`，同时也表示 `IntersectionObserverEntry` 描述了从没有交叉到交叉的过程，如果返回 false, 那么可以由此判断，变换是从交叉状态到非交叉状态。

#### `isVisible` 是否可见

### 回调参数：`observer` 观察器实例对象

详见后文：返回值：`observer` 观察器实例对象

## 参数：`options` 配置对象

一个可以用来配置 `observer` 实例的对象。如果 `options` 未指定，observer实例默认使用文档视口作为root，并且没有 `margin`，阈值为 `0%`（意味着即使一像素的改变都会触发回调函数）。你可以指定以下配置：

### `root` 指定要观察的目标元素以哪个元素为视口根元素

`type: HTMLElement`

`default: 屏幕视口`

指定一个 DOM 元素作为根元素（视口元素），也就是将这个元素当作视口，元素的边界作为视口的边界。

目标元素在 `root` 元素的可见区域的的任何不可见部分都会被视为不可见。

```js
const observer = new IntersectionObserver(callback, {
  root: document.querySelector('.container'),
})
```

### `rootMargin` 控制根元素（视口元素）视口矩形范围大小

`type: string`

`default: '0px 0px 0px 0px'`

注意：字符串值分别指定上右下左 margin，只能为像素值或百分比，`0` 也必须带上单位 `0px`，正负值均可。

`rootMargin` 设置根元素（视口元素）的四个方向外边距，它会扩展（正值）或缩小（负值） `rootBounds` 这个视口矩形范围的大小，从而影响 `intersectionRect` 交叉区域的大小。

假如指定一个 class 为 `.container` 的元素为视口元素，他的宽高均为 `600px`，在未指定 `rootMargin` 属性值时，观察器判断它里面的一个子元素是否在可视范围内时，依据的范围就是 `600px * 600px` 这个范围。

但如果指定一个 `rootMargin` 范围如下：

```js
const observer = new IntersectionObserver(callback, {
  root: document.querySelector('.container'),
  rootMargin: '300px 0px -200px 0px',
})
```

上例指定了 `rootMargin` 值为 `'300px 0px -200px 0px'`，则观察器的判定范围就发生了变化。

上边距设置了 `300px` 则上方的判定范围就扩大了，也就是被观察的子元素从上方进入时，会比之前早 `300px` 触发进入事件，从上方离开时则会晚 `300px` 的距离触发离开事件。

而下边距设置了 `-200px` 则下方的判定范围被缩小了，被观察的子元素从下方进入时，会比之前晚 `200px` 的距离触发进入事件，从下方离开时则会早 `200px` 的距离触发离开事件。

### `threshold` 设置 `entry.intersectionRatio` 值经过哪些阈值时触发回调

`type: Array<number>`

`default: [0]`

指定的每一个数表示 **被观察元素有百分之多少在视口范围内时** 触发回调的阈值，元素滚动时，自身在视口范围内的占比变化过程中，高于或低于这个值时则会触发回调函数。用 `0 ~ 1` 之间的数表示元素自身有 `0% ~ 100%` 在视口范围内。

- `[0]` 只要进入一点点即触发一次，完全离开再触发一次
- `[1]` 完全进入才触发一次，只要离开一点点即会触发一次
- `[0.5]` 进入了一半触发一次，离开了一半触发一次
- `[0, 0.5, 1]` 刚进入/进入一半/完全进入时均会触发一次，刚离开/离开一半/完全离开时也会触发一次。

## 返回值：`observer` 观察器实例对象

`type: IntersectionObserver`

当一个 `IntersectionObserver` 对象被创建时，其被配置为监听视口元素中一段给定比例的可见区域。

一旦 `IntersectionObserver` 被创建，则无法更改其配置，所以一个给定的观察者对象只能用来监听可见区域的特定变化值，可以在同一个观察者对象中配置监听多个目标元素。

### 属性

#### `root` 指定的视口元素，未指定返回 `null`

#### `rootMargin` 创建实例时设置的视口范围边距

此属性返回的值可能与调用构造函数时指定的值不同，因此可能需要更改该值，以匹配内部要求。默认值为`'0px 0px 0px 0px'`。

#### `thresholds` 一个包含交叉阈值的列表, 按升序排列，默认 `[0]`

### 方法

#### `disconnect()` 关闭观察器

#### `observe(ele: HTMLElement)` 监听一个 DOM 元素，监听多个需多次调用

#### `takeRecords()` 返回所有观察目标的 `IntersectionObserverEntry` 对象数组

每个对象的目标元素都包含每次相交的信息, 可以显式通过调用此方法或隐式地通过观察者的回调自动调用。

#### `unobserve(ele: HTMLElement)` 停止监听指定的 DOM 元素

## 使用实例

### 图片懒加载

```html
  <style>
    img {
      width: 400px;
      height: 400px;
    }
  </style>

  <div style="height: 800px;"></div>
  <img class="img" src="" data-src="1.jpg">
  <img class="img" src="" data-src="2.jpg">
  <img class="img" src="" data-src="3.jpg">
  <div style="height: 800px;"></div>

  <script>
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.src = entry.target.dataset.src
          // 用完之后务必取消观察，否则来回进出视口会反复触发
          observer.unobserve(entry.target)
        }
      })
    })
    // 查找所有需要被观察的元素，并运用观察器
    const imgs = [...document.getElementsByTagName('img')]
    imgs.forEach(imgEle => observer.observe(imgEle))
  </script>

```

### 页面触底加载（无限滚动）

监听页面底部元素，如果进入视口则触发加载事件，如果没有底部元素，就需要每一次页面加入新内容时，都调用 `observe()` 方法，对新增内容的底部元素建立观察。

```js
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // 如果不可见，就返回
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
    console.log('Loaded new items');
  }
);

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```

### 视频自动播放

```js
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
}, {threshold: 1});

observer.observe(video);
```
