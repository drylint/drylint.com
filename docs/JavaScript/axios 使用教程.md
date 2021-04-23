# 使用

[toc]

npm

```cmd
npm install axios
```

CDN

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

# axios API

- axios(configObj)
- axios(url[, configObj])
  - axios.request(config)
  - axios.get(url[, config])
  - axios.delete(url[, config])
  - axios.head(url[, config])
  - axios.options(url[, config])
  - axios.post(url[, data[, config]])
  - axios.put(url[, data[, config]])
  - axios.patch(url[, data[, config]])

## axios(configObj) 所有请求信息都在 `configObj` 中

向 `axios()` 方法传递相关配置来创建请求

只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```js
let config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: 'https://some-domain.com/api/',

   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // get(默认) | delete | head | options | post | put | patch

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 存放 `get/delete/head/options` 请求的查询字符串对象
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `data` 是仅适用于 `post/put/patch` 请求的主体被发送的数据
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费时间超过 `timeout` 的时间，请求将被中断
  timeout: 1000 * 5,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认为 false

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是：
   // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认值为 'json'

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 指定对于响应的状态码是作 resolve() 还是 reject() 处理。
  // `validateStatus` 返回 true (或者设置为 null 或 undefined )，promise 将被 resolve();
  // 否则，promise 将被 reject()
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认：状态码为 2xx 才会被 resolve()
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。
  // `keepAlive` 默认为 false
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉 `header` 中设置的 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'tom',
      password: '123456'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}

// 发送请求
axios(config).then(res => {})
```

## 响应结构

请求的响应包含以下信息

```js
axios(config).then(res => {
    console.log(res)
}).catch(error => {}) // 响应的请求失败信息可以通过 error 对象使用

// res 是一个对象，由以下组成。
{
    // `data` 由服务器提供的响应
    data: {},

    // `status` 来自服务器响应的 HTTP 状态码
    status: 200,

    // `statusText` 来自服务器响应的 HTTP 状态信息
    statusText: 'OK',

    // `headers` 服务器响应头，响应头名称都是小写
    headers: {},

    // `config` 是发送请求的配置
    config: {},

    // `request`是生成此响应的请求。
    // 它是node.js（在重定向中）或 浏览器XMLHttpRequest实例 的最后一个ClientRequest请求实例
    request: {}
}

```

## 配置请求的默认值

### 全局的默认值

```js
import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com';

axios({url: '/user/12345'}).then(res => {})
```

### 自定义实例的默认值

<a href="#create">查看创建实例一节</a>

```js
const Axios = axios.create({
  baseURL: 'https://api.example.com'
});

// Alter defaults after instance has been created
Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

Axios({url: '/user/12345'}).then(res => {})
```

### 配置的优先顺序

配置会以一个优先顺序进行合并。优先级从低到高依次是：

- 在 `lib/defaults.js` 找到的库的默认值；
- 然后是实例的 `defaults` 属性；
- 最后是请求的 `config` 参数。后者将优先于前者。

也就是：默认配置 < 全局/实例的 `defaults` 配置 < 请求参数配置

```js

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var Axios = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
Axios.defaults.timeout = 2500;

// 单独的某个请求配置，使用单独配置
Axios.get('/longRequest', {
  timeout: 5000
});

```

## axios(url[, configObj]) 请求地址作为第一个参数单独传入

```js
// 最简单的 get 请求只需传入一个 url
axios('/getUserList?gender=1').then(res => {})
```

### 所有支持的请求方法的别名

在使用别名方法时， url、method、data 这些属性都不必在配置中指定。

- `axios.request(config)`  等同于 `axios(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

> 1. `axios.request(config)` 是 `axios(config)` 的别名，但很少使用此别名。
> 2. `get/delete/head/options` 第一个参数必须是 `url地址`，查询字符串可写为对象放入`config`中的`params`属性。
> 3. `post/put/patch` 的请求主体对象须作为第二个参数，第三个参数才是配置项。

```js
axios.defaults.baseURL = 'http: //xxx.com'

axios('/getUserList?gender=1').then(res => {})

// 等同于
axios.request('/getUserList?gender=1').then(res => {})

// 等同于
let config1 = {
    url: '/getUserList',
    method: 'get'
    params: {
        gender: 1
    }
}
axios(config1).then(res => {})

// 等同于
axios.request(config1).then(res => {})


// 等同于
let config2 = {
    params: {
        gender: 1
    }
}
axios.get('/getUserList', config2).then(res => {})

```

## 并发请求

- `axios.all(iterable)`
- `axios.spread(callback)`

```js
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
.then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
}));

```

## `axios.create([config])` 创建 `axios` 实例（推荐使用）

<a name="create"></a>

可以创建一个拥有通用自定义配置的`axios`实例

```js
const Axios = axios.create({
    // 所有请求通用配置项写在这里
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

// 使用创建的实例发送请求
let config = {
    url: '/user/12345',
    method: 'get'
}
Axios(config).then(res => {}) // 使用时指定的配置将与创建实例的配置合并。
```

## 拦截器

在请求或响应被 `then` 或 `catch` 处理之前拦截它们。

可以为引入的 `axios` 添加拦截器，也可以为创建的 `axios` 实例添加拦截器

### 请求拦截器

```js
const Axios = axios.create();
Axios.interceptors.request.use(function (config) {
    // 回调函数默认接收请求配置项
    // 可以对 config 配置项做出部分修改
    // 最后返回修改后的最终配置项即可
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

```

### 响应拦截器

```js
const Axios = axios.create();
Axios.interceptors.response.use(function (response) {
    // 回调函数接收 响应数据
    // 可以对相应数据做出需要的处理
    // 最后返回处理过后的响应数据
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
```

### 移除拦截器

```js
const Axios = axios.create();
const myInterceptor = Axios.interceptors.request.use(function () {/*...*/});
Axios.interceptors.request.eject(myInterceptor);

```

## 错误处理

```js
axios.get('/user/12345')
    .catch(function (error) {
        if (error.response) {
            // 发送请求后，响应状态码不是请求配置中 validateStatus 指定的范围（默认为 2xx）
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // 请求已发出，但未收到响应
            // `error.request` 是浏览器中的 XMLHttpRequest 实例
            // node.js中的实例为：http.ClientRequest
            console.log(error.request);
        } else {
            // 其他错误，比如请求配置错误等
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

```

在发送请求的配置中，指定不抛出错误的状态码范围，范围之外则抛错。

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 只在状态码小于 500 时才不抛出错误，否则，大于 500 则抛错。
  }
})

```

## 取消请求

可以通过 `cancel token` 来取消一个请求。

Axios 的 `cancel token` API 基于 `cancelable promises proposal`，它还处于ES提案的第一阶段。

可以使用 `CancelToken.source` 工厂方法创建 `cancel token`，像这样：

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');
```

还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

注意: 可以使用同一个 cancel token 取消多个请求

## 使用 application/x-www-form-urlencoded format

默认情况下，axios会将JavaScript对象序列化为JSON。 要以 `application / x-www-form-urlencoded` 格式发送数据，您可以使用以下选项之一。

### 浏览器中

在浏览器中，您可以使用 `URLSearchParams` API，如下所示：

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

请注意，所有浏览器都不支持 `URLSearchParams` （请参阅caniuse.com），但可以使用polyfill（确保填充全局环境）。

或者，您可以使用 `qs库` 编码数据：

```js
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

或者以另一种方式（ES6）:

```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  url: '/user/add'
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
};
axios(options);
```

### Node.js 中

在node.js中，您可以使用 `querystring`模块 或  `qs库` ，如下所示：

```js
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```
