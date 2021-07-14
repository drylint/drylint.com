# webpack-dev-server

[toc]

webpack-dev-server 是编译在内存中，不实际编译到硬盘上的 dist 目录，所以速度非常快

```bash
npm i webpack-dev-server -D // 安装
```

webpack-dev-server 通常与 webpack内置插件 `webpack.HotModuleReplacementPlugin` 搭配使用

```js
// webpack.config.js

const webpack = require('webpack')

plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```

## `devServer` 配置

```js
// webpack.dev.js

const devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',

  devServer: {
    clientLogLevel: 'info', // 可选值: 'none' | 'info' | 'error' | 'warning'，生成日志级别。
    // contentBase 只用作指定使用的静态文件的路径，打包文件的路径在 publicPath 中配置
    publicPath: '/dist', // 默认为 '/'， 指定插件的打包文件的存放路径(实际打包在内存中)，访问时需访问此路径
    quiet: true, // 启用后，除了初始启动信息之外的任何内容都不会再控制台打印。
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
    // 不设置默认为项目根目录 '/'，或指定完整路径 'http://localhost:8080/dist/'

    lazy: true, // 设置为 lazy 模式
    filename: 'bundle.js', // 在lazy模式每个请求都会导致一次编译，设置filename后只在请求某个文件时才编译。
    compress: true, // 为所有的服务是否使用 gzip 压缩
    // https: true, // 默认，dev-server将通过HTTP提供服务。它可以选择通过HTTPS在HTTP / 2上提供，将使用自签名证书，也可以提供自己的证书
    https: { // 使用自己的 https 证书
      key: fs.readFileSync('/path/to/server.key'),
      cert: fs.readFileSync('/path/to/server.crt'),
      ca: fs.readFileSync('/path/to/ca.pem'),
    },
    http2: true, // 如果http2未显式设置为false，则在https: true 时此选项将默认为true。 启用http2但服务器无法通过HTTP / 2提供服务时，服务器默认为HTTPS。
    host: '0.0.0.0', // 设置主机名，默认为 localhost
    port: 9000, // 默认为8080
    proxy: { // 设置代理
      '/api': 'http://localhost:3000'
    },
    index: 'index.html', // 可以指定 某个HTML文件 作为索引文件
    hot: true, // 启用插件的热重载功能
    hotOnly: true, // 在没有页面刷新的情况下, 启用热重载作为构建失败时的回退。
    open: true, // 是否自动打开默认浏览器进行预览， 指定浏览器 open: 'Google Chrome'
    overlay: true, // 当有错误消息时，是否在整个页面显示。
    /* 单独设置警告/错误消息是否在整个页面显示
    overlay: {
      warnings: true,
      errors: true
    }
    */
    watchOptions: { // 监视文件修改
      poll: true, // webpack使用的文件系统更改通知有时会失效，设置后主动拉去更改通知
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在更新构建前增加延迟
    },
    bonjour: true,
    disableHostCheck: false, // 是否禁用主机检查。不推荐设为 true，因为禁用后容易受到 DNS 攻击
    headers: { // 为所有响应设置头信息
      'X-Custom-Foo': 'bar'
    },
    // 模拟后端接口，可以写在这里：app 就是 express 实例
    before: function(app, server) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    },
    after: function(app, server) {
      // do fancy stuff
    },
    allowedHosts: [
      '.host.com', // 同时允许 'host.com', 'www.host.com' 'subdomain.host.com', ...等
      'host2.com'
    ],
  },
}
```

## `devServer.proxy` 选项详细配置

`webpack-dev-server` 的 proxy 功能使用了第三方 `http-proxy-middleware` 中间件，支持的详细配置查看[http-proxy options 官方文档](https://github.com/chimurai/http-proxy-middleware#http-proxy-options) 。

> 注意：当使用 axios 发送请求时，若要被代理，只能是相对路径(不包含 baseURL)，不能是绝对路径。
> 比如：若要访问 `'http://www.xxx.com/api/users'`
> 若要被代理，则访问路径不能包含 baseURL `'http://www.xxx.com'`

```js
import axios from 'axios'

// 请求相对路径，可以被代理
axios({
    baseURL: ''
    url: '/api/users',
    method: 'GET',
    ...
})

// 请求绝对路径，无法被代理
axios({
    baseURL: 'http://www.xxx.com'
    url: '/api/users',
    method: 'GET',
    ...
})

```

proxy 中设置 `changeOrigin: true` 解决跨域请求

proxy 会在当前域下创建一个本地代理服务器，比如开发项目地址为 `'http://localhost:8080'`，则本地代理服务器地址也为 `'http://localhost:8080'`

当请求相对路径 `'/api/users'`时，相当于就请求的是 `'http://localhost:8080/api/users'`。

然后本地代理服务器接收到此请求后，会自动将请求代理转发到请求 `'http://www.xxx.com/api/users'` 以实现最终访问地址

```js
// proxy 选项详细配置

    // 请求 '/api/users' 会被代理为请求 'http://www.xxx.com/api/users'
    proxy: { // 设置代理
      '/api': 'http://www.xxx.com'
    },

    // 若 '/api' 只是用作匹配的通用路径，可将匹配到的 '/api' 路径改写为真实路径
    // 请求 '/api/users' 会被代理为请求 'http://www.xxx.com/realApi/users'
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : '/realApi'} // 代理重写路径
      }
    }

    // 默认情况下，不接受在HTTPS上运行具有无效证书的后端服务器。
    // 如果需要接受，可以像这样修改配置：将 secure 设置为 false 取消安全证书验证
    proxy: {
      '/api': {
        target: 'https://www.xxx.com',
        secure: false, // 将 secure 设置为 false 取消安全证书验证
      }
    }

    // 若不想代理所有的请求。可以基于一个函数的返回值绕过代理。
    // 在该函数中，您可以访问请求体，响应体以及代理选项。
    // 此函数必须返回 false 或 路径 来跳过代理请求，以防止继续代理请求。
    // 例如：对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理：
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        bypass: function(req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return '/index.html';
          }
        }
      }
    }

    // 代理多个路径，使用 context 接收一个数组
    proxy: [{
      context: ['/auth', '/api'],
      target: 'http://localhost:3000',
    }]

    // 请注意，默认情况下不会代理对root的请求。
    // 要启用根代理，应将devServer.index选项指定为falsy值：
    devServer: {
      index: '', // 设置为falsy值，才可启用根代理
      host: '...',
      contentBase: '...',
      proxy: {
        context: () => true,
        target: 'http://localhost:1234'
      }
    }

    // 默认情况下代理时保留主机头信息的origin，您可以将changeOrigin设置为true以覆盖此行为。
    proxy: {
      '/api': 'http://localhost:3000',
      changeOrigin: true
    }

```
