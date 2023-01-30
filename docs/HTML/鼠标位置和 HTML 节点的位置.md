# 鼠标位置和 HTML 节点的位置

## 鼠标位置

```ts
const handleClickElement = (e: MouseEvent) => {
  console.clear()

  // 鼠标指针距离电脑主屏幕左上角的水平距离，当在副屏点击时，如果副屏在主屏左边，则会出现负值
  console.log('e.screenX', e.screenX)

  // 鼠标指针距离浏览器可视窗口左上角的水平距离，会随着滚动发生变化
  console.log('e.clientX', e.clientX)

  // clientX 的别名，实际就是 clientX
  console.log('e.x', e.x)

  // 鼠标指针距离 html 元素左上角的水平距离，不会随着滚动发生变化
  console.log('e.pageX', e.pageX)

  // 鼠标指针距离点击的元素的左上角(不包括边框)的水平距离，点击在边框上时，可能为负值
  console.log('e.offsetX', e.offsetX)

  // 鼠标指针距离最近的祖先定位元素的左上角的水平距离，如果祖先都不是定位元素，则基于 html 元素的左上角的水平距离，此时等同于 offsetX
  // layerX 非标准，但大多数浏览器都可用
  console.log('e.layerX', e.layerX)

  // 鼠标指针相对于最后 mousemove 事件位置的水平距离
  console.log('e.movementX', e.movementX)

}
```

## 节点位置

```ts
// 元素 padding 及以内的水平尺寸，相当于 「padding-left 外边界」 到 「padding-right 外边界」 的水平距离
console.log('item.clientWidth', item.clientWidth)

// 元素 border 及以内的水平尺寸，相当于 「border-left 外边界」 到 「border-right 外边界」 的水平距离，包括滚动条的尺寸
// 也相当于 clientWidth + 滚动条 + border 的水平尺寸
console.log('item.offsetWidth', item.offsetWidth)

// 元素包括可滚动部分的尺寸，包括 content + padding 的尺寸，当没有滚动时，就等于 clientWidth
console.log('item.scrollWidth', item.scrollWidth)

// 元素 「padding-left 外边界」 到元素自身 「border-left 外边界」的水平距离
// 若左侧出现滚动条(当文本方向为 RTL 且内容溢出时)，该属性则包括了滚动条的尺寸，否则，相当于元素 border-left 的尺寸
console.log('item.clientLeft', item.clientLeft)

// 元素 「border-left 外边界」 距离最近的祖先定位元素的 「border-left 内边界」 的水平距离
console.log('item.offsetLeft', item.offsetLeft)

// content 左侧边界 距离 父元素左侧边界 的水平距离，不可滚动时为 0
console.log('item.scrollLeft', item.scrollLeft)
```
