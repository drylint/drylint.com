# webpack.IgnorePlugin

阻止打包那些与传入的正则相匹配的 `import` 或 `require` 包含的文件

## 使用正则

参数

- `resourceRegExp`: 匹配资源文件的正则
- `contextRegExp`: 可选，匹配资源文件目录的正则

```js
new webpack.IgnorePlugin({resourceRegExp, contextRegExp});

// Supported in webpack 4 and earlier, unsupported in webpack 5:
new webpack.IgnorePlugin(resourceRegExp, [contextRegExp]);
```

## 使用过滤函数

- `checkResource(resource, context)` A Filter function that receives resource and context as arguments, must return boolean.
- `checkContext(context)` 在 webpack 5 中被移除，因为 `checkResource()` 已经获得了上下文。

```js
new webpack.IgnorePlugin({
  checkResource (resource) {
    // do something with resource
    return true | false;
  }
});
```

## 实例

从 `moment@2.18` 起，所有地区语言包都会与核心库一起打包，使用插件忽略一些地区语言包。

注意：传递给 `IgnorePlugin` 的 `resourceRegExp` 参数不是针对正在导入或必需导入的解析文件名或绝对模块名称进行测试，而是针对正在进行导入的源代码中传递给 `require` 或 `import` 的字符串进行测试。

如下所示，如果您试图排除 `node_modules/moment/locale/*.js`，这样写是不行的:

```js
new webpack.IgnorePlugin({
    requestRegExp: /moment\/locale\//,
})
```

因为 moment 是这样导入的：

```js
require('./locale/' + name)
```

第一个参数正则 `requestRegExp` 必须匹配 `'./locale/'` 字符，第二个参数正则 `contextRegExp` 来指定发生导入的特定目录。

以下操作将导致这些 locale 文件被忽略：

```js
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/,
})
```

这意味着，所有导入语句只要目录是以 `'moment'` 结尾，且资源匹配 `'./locale'` 的，都会被忽略。

按照上面的方法忽略了所有包含 `'./locale/'` 该字段路径的文件目录，但也导致使用的时候一门语言都没有了，想用某一门语言的话，需要在使用时额外导入：

```js
import moment from 'moment'

//手动引入所需要的语言包
import 'moment/locale/zh-cn'

// 指定使用的语言
moment.locale('zh-cn')
```

### 在 vue-cli 项目中使用

```js
const webpack = require('webpack')

module.exports = {
  chainWebpack: config => {
    // 优化 moment 去掉所有国际化语言包
    config
    .plugin('ignore')
    // 忽略 /moment/locale 下的所有文件
    .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  }
}
```
