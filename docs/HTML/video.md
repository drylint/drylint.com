# `<video>`

[toc]

## 移动端

移动端浏览器中的 video 元素是比较特别的，早期无论是在 iOS 还是 Android 的浏览器中，它都位于页面的最顶层，无法被遮挡。后来，这个问题在 iOS 下得到了解决。但是对 Android 的大部分浏览器来说，问题仍然存在。X5 是腾讯基于Webkit开发的浏览器内核，应用于 Android 端的微信、QQ、QQ浏览器等应用。它提供了一种名叫「同层播放器」的特殊video元素以解决遮挡问题。

ios 微信浏览器是 Chrome 的内核，相关的属性都支持，也是为什么 X5 同层播放不支持的原因。安卓微信浏览器是 X5 内核，一些属性标签比如 `playsinline` 就不支持，所以始终全屏。

### webkit 内核：safari/chrome/ios微信浏览器（ios/安卓平台webkit浏览器均有效）

#### `playsinline` / `webkit-playsinline` 视频播放时局域播放，不脱离文档流

`type: boolean`

`default: false`

- `playsinline` 在 iOS 10 Safari 中，video 新增了此属性，可以使视频内联播放。

- `webkit-playsinline` 在 iOS 10 之前的版本可加此属性即可支持内联播放，但是加了这个属性后，在 iOS 9 的上出现只能听到声音不能看到画面的问题。

此属性比较特别，需要嵌入网页的 APP 比如微信的 UIwebview 设置了 `allowsInlineMediaPlayback = YES`  `webview.allowsInlineMediaPlayback = YES`，才能生效。换句话说，如果 APP 不设置，页面中加了这标签也无效。

#### `airplay` / `x-webkit-airplay` 很少用

`type: string`

可选值：`'allow'`、`'deny'`

iOS 平台下 `airplay` 的相关属性，很少使用

### X5内核：（Android微信浏览器/AndroidQQ浏览器等）仅安卓平台生效

X5 是腾讯基于Webkit开发的浏览器内核，应用于 Android 端的微信、QQ、QQ浏览器等应用。它提供了一种名叫「同层播放器」的特殊video元素以解决遮挡问题。

#### `x5-playsinline` X5 内核浏览器页面内播放属性

`type: boolean`

X5内核视频在用户点击后默认会进入全屏播放，前端可以设置video的 `x5-playsinline` 属性来将视频限定于网页内部播放

#### `x5-video-player-type="h5"` 启用同层播放器

`type: string`

取值固定为 `'h5'`

同层页面内播放是标准的视频播放形态。

在视频全屏的时候，div 可以呈现在视频层上，也是安卓版微信浏览器等X5内核浏览器特有的属性。

同层播放别名也叫做沉浸式播放，播放的时候看似全屏，但是已经除去了control和微信的导航栏，只留下"X"和"<"两键。

目前的同层播放器只在Android（包括微信）上生效，暂时不支持iOS。

至于为什么同层播放只对安卓开放，是因为安卓不能像ISO一样局域播放，默认的全屏会使得一些界面操作被阻拦，如果是全屏H5还好，但是做直播的话，诸如弹幕那样的功能就无法实现了，所以这时候同层播放的概念就解决了这个问题。不过在测试的过程中发现，不同版本的ISO和安卓效果略有不同。

#### `x5-video-player-fullscreen` 视频播放时将会进入到全屏模式

`type: boolean`

如果不申明此属性，页面得到视口区域为原始视口大小(视频未播放前)，比如在微信里，会有一个常驻的标题栏，如果不声明此属性，这个标题栏高度不会给页面，播放时会平均分为两块（上下黑块）

注： 声明此属性，需要页面自己重新适配新的视口大小变化。可以通过监听 `resize` 事件来实现

```html
<video id="test_video" src="xxx" x5-video-player-type="h5" x5-video-player-fullscreen="true"/>
```

需要监听窗口大小变化(resize)实现全屏

```js
window.onresize = function(){

  test_video.style.width = window.innerWidth + "px";

  test_video.style.height = window.innerHeight + "px";

}
```

注：1. 为了让视频真正铺满全屏,可以适当让video的显示区域大于视口区域,这样在显示时在视口外的部截掉后,不会出四周黑边的情况

#### `x5-video-orientation` 声明播放器支持的方向

`type: string`

可选值：`'landscape'`、`'portrait'`、`'landscape|portrait'`

可选值分别对应：横屏、竖屏、跟随手机自动旋转

此属性只在声明了 `x5-video-player-type="h5"` 情况下生效。

#### x5videoenterfullscreen 进入全屏事件

```js
myVideo.addEventListener("x5videoenterfullscreen", function () {

  alert("player enterfullscreen");

})
```

#### x5videoexitfullscreen 退出全屏事件

```js
myVideo.addEventListener("x5videoexitfullscreen", function () {

  alert("player leavefullscreen");

})
```

#### `x5mediaextrainfo` 额外扩展事件，每秒触发一次

让前端通过参数分析决定是否换视频源来保证用户的播放体验。

```js
var video = document.getElementById('video')
video.addEventListener("x5mediaextrainfo", function(e){
 alert("receive x5mediaextrainfo event = e.what =" + e.what + ", extra = " + e.extra);
})
```

关于同层播放器的支持情况，官方文档有详细描述，最新的微信、QQ以及QQ浏览器都能支持，但是仅限Android平台。

虽然同层播放器可以解决遮盖video元素的问题，但这毕竟还是 X5 Only 的技术。如果页面要在非腾讯系的产品中打开，那就要注意处理兼容问题。

同层播放器之前的元素，要用绝对定位或固定定位才能展示出来；而其后的元素，只要往下偏移（播放器元素「object-position」指定的偏移）并且提高层级，就与未播放时无异了。

### 使用同层播放器的一些建议

- 1. 监听resize 事件实现自适应视口大小变化，视频播放时会调整视口大小

- 2. 在视频播放期间的交互，弹框，字幕在视频视频区域中，不要在视频区域外

- 3. 对于直播类全屏视频，最好不要在最顶部放交互性元素

### 交互性视频实现建议

允许视频区域(video元素)之上的操作

- 1. 对于需要全屏交互的,可以将video区域设置为视口大小>

### 视频显示位置控制

默认视频在指定区域的居中显示，可以通过css object-position 属性控制视频(左上角) 显示位置

```js
// 视频在顶部显示

myVideo.style["object-position"]= "0px 0px"

```

```js
// 视频在底部显示

var offsetY = myVideo.clientHeight - (myVideo.clientWidth * myVideo.videoHeight / myVideo.videoWidth)

myVideo.style["object-position"]= "0px " + offsetY + "px"

```

### X5 内核实例

#### X5内核视频四种播放形态

##### (1) 全屏播放

X5内核视频默认播放形态，用户点击视频区域后开始进入全屏播放，视频区域内的所有事件行为会由X5内核视频组件全权托管。视频层级最高，会遮挡所在区域所有html元素。（仅使用于安卓微信、手机QQ等非安卓QQ浏览器的X5内核场景）

<https://yongling8808.github.io/test/video_demo/video.html>

##### (2) 页面内播放

X5内核视频在用户点击后默认会进入全屏播放，前端可以设置video的 `x5-playsinline` 属性来将视频限定于网页内部播放

<https://yongling8808.github.io/test/video/video_inpage_playsinline.html>

##### (3) 同层页面内播放

同层页面内播放是标准的视频播放形态，在video标签中添加`x5-video-player-type：h5-page`属性来控制网页内部同层播放，可以在视频上方显示html元素。

<https://tencentx5.github.io/x5/video_page_samelayer.htm>

#### X5内核视频事件

##### (1) 进入、退出全屏通知

可以通过 `x5videoenterfullscreen`、`x5videoexitfullscreen` 来视频进入和退出全屏通知。

<https://yongling8808.github.io/test/video_demo/video_fullscreen_event.html>

##### (2) 扩展通知

X5 内核视频额外参数，每秒触发一次，让前端通过参数分析决定是否换视频源来保证用户的播放体验。

<https://res.imtt.qq.com/qqbrowser_x5/h5/samples/video/video_extrainfo.html>

```html
<video
    controls
    src=""
    poster=""
    preload="auto"
    playsinline
    webkit-playsinline
    x-webkit-airplay
    x5-playsinline
    x5-video-player-type="h5"
    x5-video-orientation="portraint"
    x5videoexitfullscreen
    style="width: 100%; height: 100%; object-fit: fill;"
></video>
```

```css
video {
  object-position: 50% 50%; /* 默认值 */
  object-position: right top;
  object-position: 250px 125px;
  object-fit: fill | contain | cover;
}

```

## 参考文章

- [凹凸：视频H5のVideo标签在微信里的坑和技巧](https://aotu.io/notes/2017/01/11/mobile-video/)

- [腾讯：H5同层播放器接入规范](https://x5.tencent.com/tbs/guide/video.html)
-
- [腾讯：X5内核视频之问答汇总](https://docs.qq.com/doc/DTUxGdWZic0RLR29B)

### 网站视频标签参考

- 优酷 H5 视频

```html
<video
    id="xplayer1585383229713"
    webkit-playsinline=""
    playsinline=""
    x-webkit-airplay="allow"
    x5-playsinline=""
    style="width: 100%; height: 100%; display: block; position: relative;"
    poster=""
    data-paused="play"
    src=""
></video>
```

- 腾讯 H5 视频

```html
<video
 style="background-color: #000; width: 100%; height: 100%;"
 playsinline="isiPhoneShowPlaysinline"
 x5-video-player-type="h5-page"
 t7-video-player-type="inline"
 webkit-playsinline="isiPhoneShowPlaysinline"
 x-webkit-airplay=""
 preload="none"
 data-role="txp_video_tag"
 src=""
></video>
```

- 爱奇艺 H5 视频

```html
<video
 id="video"
 webkit-playsinline=""
 playsinline=""
 rate="1"
 class="m-player hideControls"
 src=""
></video>
```

- 芒果TV H5 视频

```html
<video
 id="player"
 src=""
 poster=""
 preload="auto"
 controls="controls"
 width="100%"
 height="100%"
 playsinline=""
 x-webkit-airplay="deny"
 webkit-playsinline=""
 style="width: 100%;"
></video>
```

- 哔哩哔哩 H5 视频

```html
<video
 preload="metadata"
 width="100%"
 height="100%"
 webkit-playsinline=""
 playsinline=""
 class="show"
 style="display: inline;"
>
 <source src="" type="video/mp4">
</video>
```
