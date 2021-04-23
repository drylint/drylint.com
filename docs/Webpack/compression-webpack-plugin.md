# compression-webpack-plugin 打包时启用 gzip 压缩

打包时使用插件后，会在打包出的资源处额外增加同一文件的 `*.gz` 格式。

将资源放到服务器，并且服务器配置支持 gzip 后，客户端请求资源的 Request Headers 中若有 `Accept-Encoding: gzip, deflate` 则会请求 gzip 文件，服务端的 Response Headers 中则会有 `Content-Encoding: gzip` 。

如果客户端和服务端任意一方不支持 gzip，则会请求正常的 html/css/js 文件。

## 安装

```bash
npm install compression-webpack-plugin --save-dev
```

## 配置中使用插件

```js
// webpack.config.js

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin(),
  ],
};
```

## 在 vue-cli 项目中使用

```js
// vue.config.js

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  configureWebpack: config => {
    if (isProd) {
      // 启用 gzip 压缩插件
      config.plugins.push(new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css$/u,
        threshold: 4096, // 超过 4kb 压缩
      }))
    }
  }
}
```
