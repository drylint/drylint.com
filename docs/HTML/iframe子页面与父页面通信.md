# iframe 父页面与子页面之间 `postMessage()` 通信

父页面通过引用子页面窗口对象 `window` ，并且使用这个 `window` 上的 `postmessage()` 方法进行消息传递。

## `postMessage()` 方法

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- `otherWindow`

  对其他窗口的一个引用，比如 `iframe` 的 `contentWindow` 属性、执行 `window.open()` 返回的窗口对象、或者是命名过或数值索引的 `window.frames` 。

- `message`

  要发送到其他 `window` 的数据。它将会被结构化克隆算法序列化。这意味着你可以不受什么限制的将数据对象安全的传送给目标窗口而无需自己序列化。

- `targetOrigin`

  通过窗口的 `origin` 属性来指定哪些窗口能接收到消息事件，其值可以是字符串 `'*'`表示无限制，或者一个 URI 。

  在发送消息的时候，如果目标窗口的**协议**、**主机地址**或**端口**这三者的任意一项不匹配 `targetOrigin` 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送，这个机制用来控制消息可以发送到哪些窗口。

  例如，当用 `postMessage` 传送密码时，这个参数就显得尤为重要，必须保证它的值与这条包含密码的信息的预期接受者的 origin 属性完全一致，来防止密码被恶意的第三方截获。如果你明确的知道消息应该发送到哪个窗口，那么请始终提供一个有确切值的 `targetOrigin` ，而不是 `'*'`。不提供确切的目标将导致数据泄露到任何对数据感兴趣的恶意站点。

- `transfer` 可选

  是一串和 message 同时传递的 `Transferable` 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

## 监听 message 事件

```js
window.addEventListener("message", callbackFn, false)

const callbackFn = event => {
  const
}

```

`event` 事件对象中，和 `message` 相关的属性有 `data`, `origin`, `source`

- `data`

从其他 window 中传递过来的数据，可能是任何类型，比如字符串，数字，对象，数组等。

- `origin`

调用 `postMessage()` 时消息发送方窗口的 `origin` 。 比如 `'https://example.org'` (隐含端口 `443` ) ， `'http://example.net'` (隐含端口 `80` ) ， `'http://example.com:8080'`。请注意，这个 `origin` 不能保证是该窗口的当前或未来 `origin` ，因为 `postMessage` 被调用后可能被导航到不同的位置。

- `source`

对发送消息的窗口对象 `window` 的引用; 您可以使用此来在具有不同 `origin` 的两个窗口之间建立双向通信。

## 示例

父页面写法一：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div>父页面</div>
  <div>
    <!-- 添加 name 属性 -->
    <iframe name="son" src="./son.html" frameborder="0"></iframe>
  </div>

  <script>
    // <iframe> 元素上指定 name="son" 属性后
    // 可以通过 window.frames['son'] 直接引用 iframe 页面的 window 对象
    const sonWindow = window.frames['son']
    sonWindow.addEventListener('load', () => {
      // 通过调用子页面的 window 对象上的 postMessage() 方法进行消息传递
      sonWindow.postMessage('这是来自父页面的消息')
    })
  </script>
</body>
</html>
```

父页面写法二：

```html
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div>父页面</div>
  <div>
    <!-- 通过 iframe 引用子页面 -->
    <iframe id="iframe" src="./son.html" frameborder="0"></iframe>
  </div>

  <script>
    // 获取到 iframe 元素
    const iframe = document.getElementById('iframe')
    // 监听 iframe 元素的 load 事件，因为必须在加载完成后才能进行通信
    iframe.addEventListener('load', () => {
      // 通过 iframe.contentWindow 引用子页面的 window 对象
      iframe.contentWindow.postMessage('这是来自父页面的消息')
    })
  </script>
</body>
</html>
```

子页面：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div>子页面</div>

  <script>
    // 监听 message 事件，并传入回调函数
    // 回调函数会接收事件对象作为参数，e.data 就是接收到的数据
    window.addEventListener('message', e => {
      const { data, origin, source} = e
      console.log(data) // '这是来自父页面的消息'
      console.log(origin) // 'http://127.0.0.1:5500' （当前运行的地址）
      console.log(source) // 父页面窗口对象 window
      console.log(source === window.top) // true
      console.log(source === window.parent) // true
      // 注意，window.top 永远表示最顶层窗口，也就是浏览器窗口
      // window.parent 表示当前窗口的父窗口（上一级）
      // 只有两级的情况下，window.parent 窗口就是 top 窗口
    }, false)
  </script>
</body>
</html>
```

## 安全问题

如果您不希望从其他网站接收消息 ，请不要为 `message` 事件添加任何事件侦听器。 这是一个完全万无一失的方式来避免安全问题。

对于发送方，建议始终明确指定 `targetOrigin`，而不是 `'*'`。 因为恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以拦截发送的数据。

对于接收方，建议始终验证接收到的事件对象中的 `origin` 和 `source` 属性，以此来验证发件人的身份。因为任何窗口都可以向任何其他窗口发送消息，不验证的话，不能保证消息是否来自恶意的发件人。但是，就算验证身份后，仍然还应该验证接收到的消息是否符合自己的预期。
