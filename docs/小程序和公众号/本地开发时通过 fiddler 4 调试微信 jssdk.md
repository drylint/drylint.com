# 本地开发时通过 fiddler 4 调试微信 jssdk

微信 jssdk 要求公众号后台配置 「JS接口安全域名」，并且前端调用 `wx.config()` 所在的域名必须与配置的「JS接口安全域名」一致才可以。

但是本地开发时，本地开发服务器的地址通常为 `localhost:xxxx`, `127.0.0.1:xxxx`, `192.168.x.x:xxxx`, `10.10.x.x:xxxx`, 无法与后台配置的「JS接口安全域名」一致，所以调用 jssdk 时无法成功。

最简单的方法就是使用 fiddler 工具：

此处假设：

- 电脑和手机在同一局域网内
- 电脑局域网 ip 为：`192.168.95.1`
- 项目服务器端口为 `8080`，也就是项目运行在 `192.168.95.1:8080` 上
- 手机局域网 ip 为 `192.168.95.100`
- 公众号配置的「JS接口安全域名」为 `my.domamin.com`

在 fiddler 菜单选择 `Tools` 下的 `HOSTS` 选项：

首先勾选 `Enable remapping ...` 表示开启 host 映射，然后在下方的输入框输入以下文本：

```text
192.168.95.1:8080 my.domamin.com
```

以上示例表示：当我访问 `my.domamin.com` 时，fiddler 工具会将请求映射到 `192.168.95.1:8080` 上去。这样实现的效果就是，在浏览器客户端中打开的地址是 `my.domamin.com` ，和发布到线上的访问地址是一样的，但实际上，访问的内容是我们本地开发服务器 `192.168.95.1:8080`。

## 设置微信开发者工具的代理

如果在微信开发者工具上进行网页调试时，访问 `my.domamin.com` 没有被映射到 `192.168.95.1:8080` 去，检查一下设置中的代理设置，设置为使用「系统代理」即可。

## 设置手机网络使用 fiddler 软件的服务器作代理

fiddler 软件启动时，默认会启动一个服务器，监听端口为 `8888`，完整就是 `192.168.95.1:8888`。

找到手机已连接的和电脑属于同一局域网的 WIFI，进入这个 WIFI 设置手动代理，然后 `Hostname`(服务器) 一栏输入 `192.168.95.1`, `Port`(端口) 一栏输入 `8888`, 然后保存即可。

## 项目配置更改

如果访问时，出现 `Invalid Host header`，那是因为开发模式下使用的 webpack-dev-server 校验域名不通过，有多种方式解决：

- 将域名校验禁用即可， `disableHostCheck: true`
- 将自己使用的域名 `my.domamin.com` 添加允许访问本地服务器的域名列表中去，`allowedHosts: ['my.domamin.com']`

webpack 4 中，两者都可以使用，webpack 5 中，废弃了 `disableHostCheck` 配置，只能使用 `allowedHosts` 。

第一种：禁用域名检查

```js
devServer: {
  disableHostCheck: true,
}
```

第二种：配置域名白名单(推荐此方式)

```js
devServer: {
  // 设置为字符串 'all' 将允许所有域名，相当于设置了 disableHostCheck: true
  // allowedHosts: 'all',
  // 设置为 'auto' 将允许 localhost, host 配置项的值，client.webSocketURL.hostname 配置项的值
  // allowedHosts: 'auto',
  allowedHosts: [
    'localhost',
    'my.domamin.com',
  ],
}
```
