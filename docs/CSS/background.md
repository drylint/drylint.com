# background

在CSS2.1里，background属性的简写方式包含五种属性值，从CSS3开始，又增加了3个新的属性值，加起来一共8个。

CSS2.1

- background-color 使用的背景颜色。
- background-image 使用的背景图像。
- background-repeat 如何重复背景图像。
- background-attachment 背景图像是否固定或者随着页面的其余部分滚动。`background-repeat: no-repeat` 时才看得出效果。
- background-position 背景图像的位置。

CSS3

- background-size 背景图片的尺寸。
- background-origin 图片开始描绘的起点位置。当 `background-attachment: fixed` 时，`background-origin` 将被忽略不起作用。 除了规定起点之外没有什么别的限制，所以如果图片足够大，在其他方向还是会画到边框中
- background-clip 背景图片绘制在盒子模型哪一个范围内。

简写事，CSS2.1 和 CSS3 属性之间添加一个 `/` 符号即可。

```js
background: [color] [image] [repeat] [attachment] [position] / [size] [origin] [clip];
```

属性 | 默认值 | 有效值 | 备注
| -- | -- | -- | -- |
background-color | `transparent` | CSS 合法的 `<color>` 值
background-image | `none` | `none | <image>`
background-repeat | `repeat` | `repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}`
background-attachment | `scroll` | `scroll | fixed | local`
background-position | `0% 0%` | `[ left | center | right | top | bottom | <length-percentage> ]` <br><br> `[ left | center | right | <length-percentage> ]` <br> `[ top | center | bottom | <length-percentage> ]` <br><br> `[ center | [ left | right ] <length-percentage>? ] &&` <br> `[ center | [ top | bottom ] <length-percentage>? ]`
background-size | `auto auto` | `cover | contain | [ <length-percentage> | auto ]{1,2}`
background-origin | `padding-box` | `border-box | padding-box | content-box`
background-clip | `border-box` | `border-box | padding-box | content-box`
