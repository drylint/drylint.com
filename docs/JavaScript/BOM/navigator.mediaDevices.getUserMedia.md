# navigator.mediaDevices.getUserMedia

[toc]

## 注意事项

### 1. 安全性

通过 `MediaDevices.getUserMedia()` 获取用户多媒体权限时，需要注意其只工作于以下三种环境：

- localhost 域
- 开启了 HTTPS 的域
- 使用 file:/// 协议打开的本地文件

其他情况下，比如在一个 HTTP 站点上，`navigator.mediaDevices` 的值为 `undefined`。

如果想要 HTTP 环境下也能使用和调试 `MediaDevices.getUserMedia()`，可通过开启 Chrome 的相应参数。

#### 通过相应参数启动 Chrome

传递相应参数来启动 Chrome，以 `http://example.com` 为例，

```bash
 --unsafely-treat-insecure-origin-as-secure="http://example.com"
```

#### 开启相应 flag

通过传递相应参数来启动 Chrome Insecure origins treated as secure flag 并填入相应白名单。

1. 打开 `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
2. 将该 `flag` 切换成 `enable` 状态
3. 输入框中填写需要开启的域名，譬如 `http://example.com`，多个以逗号分隔。
4. 重启后生效。

### 2. 兼容性

`getUserMedia` API最初是通过 `navigator.getUserMedia` 访问，目前已被最新Web标准废除，变更为 `navigator.mediaDevices.getUserMedia()` ，但浏览器支持情况不如旧版API普及。

`getUserMedia()` 方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。

如果用户给予许可，就返回一个Promise对象，`MediaStream`对象作为此Promise对象的 `resolved` 参数，相应的，如果用户拒绝了许可，或者没有媒体可用的情况下，`PermissionDeniedError` 或者 `NotFoundError` 作为此Promise的 Rejected 参数。

注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的Promise对象可能既不会触发resolve也不会触发 reject。

## 基本语法

```js
navigator.mediaDevices.getUserMedia(constraints)
.then(function (mediaStream) { ... })
.catch(function (error) { ... })
```

### 参数 `containers` 对象

指定请求的媒体类型，主要包含 `video` 和 `audio`，必须至少一个类型或者两个同时可以被指定。

如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的 Promise 对象就会处于 rejected 状态，`NotFoundError` 作为 rejected 参数。

同时请求不带任何参数的音频和视频：

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
})
```

使用1280x720的摄像头分辨率：

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: { width: 1280, height: 720 },
})
```

要求获取最低为1280x720的分辨率：

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
})
```

上例中，当请求包含一个 `ideal` 值时，表示告诉浏览器这个值是最理想的值，这个值有着更高的权重，要求浏览器优先尝试找到最接近指定的理想值的设定或者摄像头（如果设备拥有不止一个摄像头）。

优先使用前置摄像头（如果有的话）：

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: { facingMode: "user" },
})
```

强制使用后置摄像头：

```js
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: {
    facingMode: { exact: "environment" }
  }
})
```

设置最大帧率：

```js
navigator.mediaDevices.getUserMedia({
  video: {
    frameRate: {
      ideal: 10, // 理想值
      max: 15，// 最大值
    }
  }
})
```

### resolve 参数（成功回调参数）

成功回调参数是一个 `MediaStream` 对象，表示媒体内容的数据流。

可以通过 `URL.createObjectURL(mediaStream)` 转换后，设置为 `<video>` 或 `<audio>` 元素的 src 属性来使用，新的浏览器也可以直接设置为 `srcObject` 属性来使用。

```js
navigator.mediaDevices.getUserMedia(constraints)
.then(function (mediaStream) {
  const video = document.querySelector('video')
  video.srcObject = mediaStream
  // video.src = URL.createObjectURL(mediaStream) //
})
```

目前，谷歌浏览器已经不能直接将 `MediaStream` 的实例对象直接作为 `URL.createObjectURL()` 的参数使用，会报 `TypeError Failed to execute 'createObjectURL' on 'URL': No function was found that matched the signature provided` 的错误。

### reject 参数（失败回调参数）

失败回调函数errorCallback的参数，可能的异常有：

- `AbortError`：硬件问题
- `NotAllowedError`：用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。
- `NotFoundError`：找不到满足请求参数的媒体类型。
- `NotReadableError`：操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。
- `OverConstrainedError`：指定的要求无法被设备满足。
- `SecurityError`：安全错误，在getUserMedia() 被调用的 Document
上面，使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。
- `TypeError`：类型错误，constraints对象未设置［空］，或者都被设置为false。

## 示例

```html
<video style="width: 480px; height: 320px;"></video>

<script>
  // 访问用户媒体设备的兼容方法
  const getUserMedia = (constrains, success, error) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // 最新标准 API
      navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error)
    } else if (navigator.webkitGetUserMedia) {
      // webkit 内核浏览器
      navigator.webkitGetUserMedia(constrains).then(success).catch(error)
    } else if (navigator.mozGetUserMedia) {
      // Firefox 浏览器
      navigator.mozGetUserMedia(constrains).then(success).catch(error)
    } else if (navigator.getUserMedia) {
      // 旧版 API
      navigator.getUserMedia(constrains).then(success).catch(error)
    } else {
      console.log('你的浏览器不支持访问用户媒体设备')
    }
  }

  // 成功的回调
  const successFn = mediaStream => {
    const video = document.querySelector('video')
    try {
      // 兼容webkit内核浏览器
      const CompatibleURL = window.URL || window.webkitURL
      // 将视频流设置为 video 元素的源
      // 此处的代码新 Chrome 会报错，所以用 try...catch 来捕获
      video.src = CompatibleURL.createObjectURL(mediaStream)
    } catch {
      // 新的用法
      video.srcObject = mediaStream
    }
    video.onloadedmetadata = () => {
      video.play()
    }
  }

  // 失败的回调
  const errorFn = error => {
    console.log('访问用户媒体设备失败：', error.name, error.message)
  }

  // 调用
  getUserMedia({
    video: true,
    audio: true,
  }, successFn, errorFn)
</script>
```

## 关闭摄像头或者麦克风

通过访问 `MediaStream.getTracks()` 可以得到一个 Tracks 数组，该数组是按照 `constrains` 参数最后一个倒序往第一个排列的。

```js
navigator.mediaDevices.getUserMedia({
  audio: true, // track 1
  video: true, // track 0
})
```

```js
// 关闭摄像头
MediaStream.getTracks()[1].stop()

// 关闭麦克风
MediaStream.getTracks()[0].stop()
```
