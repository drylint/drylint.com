# css 之动画 animation

## 默认值

```css
div {
  animation-name: none;
  animation-duration: 0s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
}
```

简写为：

```css
div {
  animation: none 0s ease 0s 1 normal none running;
}
```

## 可选值

### `animation-name: none`

- `none` 移除动画
- `<keyframes-name>` 自定义的 `@keyframes` 名称

### `animation-duration: 0s`

- `<time>` 一个动画周期的时长，单位为秒(s)或者毫秒(ms)，无单位值无效

### `animation-timing-function: ease;`

- `<timingfunction>`，包括:

```text
where
<easing-function> = linear | <cubic-bezier-timing-function> | <step-timing-function>

where
<cubic-bezier-timing-function> = ease | ease-in | ease-out | ease-in-out | cubic-bezier([0,1]>, <number>, [0,1]>, <number>)
<step-timing-function> = step-start | step-end | steps(<integer>[, <step-position>]?)

where
<step-position> = jump-start | jump-end | jump-none | jump-both | start | end
```

### `animation-delay: 0s;` 动画延迟多久执行

- `<time>` 该值可用单位为秒(s)和毫秒(ms)。如果未设置单位，定义无效。

### `animation-iteration-count: 1;` 执行动画的次数

- `infinite` 无限次循环执行
- `<number>` 执行多少次

### `animation-direction: normal;` 动画执行方向

- `normal` 每个动画循环结束，动画重置到起点重新开始，这是默认属性。
- `reverse` 反向运行动画，每周期结束动画由尾到头运行。
- `alternate` 动画交替反向运行，反向运行时，动画按步后退，同时，带时间功能的函数也反向，比如，`ease-in` 在反向时成为 `ease-out`。计数取决于开始时是奇数迭代还是偶数迭代
- `alternate-reverse` 反向交替， 反向开始交替

### `animation-fill-mode: none;`

- `none` 当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。
- `forwards` 目标将保留由执行期间遇到的最后一个关键帧计算值。
- `backwards` 动画将在应用于目标时立即应用第一个关键帧中定义的值，并在animation-delay期间保留此值。
- `both` 动画将遵循forwards和backwards的规则，从而在两个方向上扩展动画属性。

### `animation-play-state: running;`

- `running` 运行动画
- `paused` 暂停动画
