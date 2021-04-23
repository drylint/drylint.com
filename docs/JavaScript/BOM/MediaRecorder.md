# MediaRecorder 构造函数

`MediaRecorder` 构造函数会创建一个对指定的 `MediaStream` 进行录制的 MediaRecorder 实例对象

## 语法

```js
const mediaRecorder = new MediaRecorder(stream[, options])
```

### 参数

#### stream

MediaStream 将要录制的流. 它可以是来自于使用 navigator.mediaDevices.getUserMedia() 创建的流或者来自于 `<audio>`, `<video>` 以及 `<canvas>` DOM元素.

#### options 可选参数

一个字典对象,它可以包含下列属性:

- `mimeType`: 为新构建的 MediaRecorder 指定录制容器的MIME类型. 在应用中通过调用 `MediaRecorder.isTypeSupported()` 来检查浏览器是否支持此种 mimeType .
- `audioBitsPerSecond`: 指定音频的比特率.
- `videoBitsPerSecond`: 指定视频的比特率.
- `bitsPerSecond`: 指定音频和视频的比特率. 此属性可以用来指定上面两个属性. 如果上面两个属性只有其中之一和此属性被指定, 则此属性可以用于设定另外一个属性.

如果视频或音频的比特率没有指定, 视频默认采用的比特率是2.5Mbps, 但音频的默认比特率并不固定, 音频的默认比特率根据采样率和轨道数自适应

```js
const options = {
  audioBitsPerSecond : 128000,
  videoBitsPerSecond : 2500000,
  mimeType : 'video/mp4'
}

// 获取流
navigator.mediaDevices.getUserMedia({
  audio: true, // track 1
  video: true, // track 0
}).then(stream => {
  const mediaRecorder = new MediaRecorder(stream,options)
  // mediaRecorder.start() // 可以 自动触发 或者 在某时手动触发
  // mediaRecorder.stop() // 当 stop() 触发后，mediaRecorder.ondataavailable 会自动触发
  // 获取 blob
  mediaRecorder.ondataavailable = e => {
    const blob = e.data
    const blobURL = URL.createObjectURL(blob)
    video.src = blobURL
  }
})
```

### MediaRecorder 静态方法

MediaRecorder.isTypeSupported()

### MediaRecorder 实例属性

除 `ignoreMutedMedia` 以外均为只读属性

#### mimeType 只读

返回 MediaRecorder 对象创建时选择器选择的录制容器的 MIME type

#### state 只读

返回录制对象MediaRecorder  的当前状态(闲置中,录制中或者暂停 ) (inactive, recording, or paused.)

#### stream 只读

返回录制器对象 MediaRecorder 创建时构造函数传入的stream对象

#### ignoreMutedMedia

用以指定 MediaRecorder是否录制无声的输入源. 如果这个属性是false. 录制器对象MediaRecorder  会录制无声的音频或者黑屏的视频, 默认值是false

#### videoBitsPerSecond 只读

返回视频采用的编码比率. 它可能和构造函数的设置比率不同.  (if it was provided).

#### audioBitsPerSecond 只读

返回音频采用的编码比率,它可能和构造函数中设置的比率不同. (if it was provided).

### 实例方法

#### isTypeSupported()

返回一个Boolean 值,来表示设置的MIME type 是否被当前用户的设备支持.

#### pause()

暂停媒体录制

#### requestData()

请求一个从开始到当前接收到的,存储为Blob类型的录制内容. (或者是返回从上一次调用requestData() 方法之后到现在的内容).  调用这个方法后,录制将会继续进行,但是会创建一个新的Blob对象

#### resume()

继续录制之前被暂停的录制动作.

#### start()

开始录制媒体,这个方法调用时可以通过给timeslice参数设置一个毫秒值,如果设置这个毫秒值,那么录制的媒体会按照你设置的值进行分割成一个个单独的区块, 而不是以默认的方式录制一个非常大的整块内容.

#### stop()

停止录制. 同时触发 `dataavailable` 事件,返回一个存储Blob内容的录制数据.之后不再记录

### 实例事件

#### ondataavailable

调用它用来处理 dataavailable 事件, 该事件可用于获取录制的媒体资源 (在事件的 e.data 属性中会提供一个可用的 Blob 对象.)

```js
mediaRecorder.ondataavailable = e => {
  const blob = e.data
  const blobURL = URL.createObjectURL(blob)
  video.src = blobURL
}
```

#### onerror

An EventHandler called to handle the recordingerror event, including reporting errors that arise with media recording. These are fatal errors that stop recording.

#### onpause

用来处理 pause 事件, 该事件在媒体暂停录制时触发，`pause()` 触发时

#### onresume

用来处理 resume 事件, 该事件在暂停后回复录制视频时触发，`resume()` 触发时

#### onstart

用来处理 start 事件, 该事件在媒体开始录制时触发，`start()` 触发时.

#### onstop

用来处理 stop 事件, 该事件会在媒体录制结束时、媒体流（MediaStream）结束时、或者调用 `stop()` 方法后触发
