# polyfill 解决方案

[toc]

## 一、babel-polyfill

在入口js文件引入执行

```js
import 'babel-polyfill';
```

## 二、babel-preset-env

babel-preset-env 也支持针对指定目标环境选择需要的 polyfill 了，只需引入 babel-polyfill，并在 babelrc 中声明 useBuiltIns，babel 会将引入的 babel-polyfill 自动替换为所需的 polyfill。

```js
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["IE >= 9"]
      },
      "useBuiltIns": true
    }]
  ]
}
```

## 三、polyfill.io 国内访问速度较慢

在 [`https://cdn.polyfill.io/v3/url-builder/`](https://cdn.polyfill.io/v3/url-builder/) 上可以自定义勾选需要支持的 polyfill 。

尝试在不同的浏览器下请求 `https://cdn.polyfill.io/v2/polyfill.js` 这个文件，服务器会判断浏览器 UA 返回不同的 polyfill 文件，你所要做的仅仅是在页面上引入这个文件，polyfill 这件事就自动以最优雅的方式解决了。更加让人喜悦的是，polyfill.io 不旦提供了 cdn 的服务，也开源了自己的实现方案 `polyfill-service`。简单配置一下，便可拥有自己的 polyfill service 了。

polyfill.io 对全球常用浏览器的判断基本问题不大，面对国内纷繁复杂的浏览器不确定是否能准确识别从而返回需要的 polyfill 代码就不得而知。

## 四、阿里云版 polyfill 解决 `polyfill.io` 慢的问题

先在 polufill.io 上勾选自己需要的 polyfill 获取地址

比如勾选 `es2015`， `es2016`， `es2017`， `es2018`，后，获得地址：

```html
<script
    crossorigin="anonymous"
    src="https://polyfill.io/v3/polyfill.min.js?features=es2015%2Ces2016%2Ces2017%2Ces2018"
>
</script>
```

将查询字符串（querystring）的问号之前的地址更换为 `https://polyfill.alicdn.com/polyfill.min.js` 即可：

```html
<script
    crossorigin="anonymous"
    src="https://polyfill.alicdn.com/polyfill.min.js?features=es2015%2Ces2016%2Ces2017%2Ces2018"
>
</script>
```
