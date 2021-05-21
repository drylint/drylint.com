# npm 镜像

taobao 镜像站

```bash

# 所有镜像列表
https://npm.taobao.org/mirrors/

# node 编译版本镜像
https://npm.taobao.org/dist

# 同上
https://npm.taobao.org/mirrors/node/
```

## 方式一

> 将 windows `C:\Users\XXX` 用户名文件夹下的 `.npmrc` 文件编辑输入以下内容即可

```bash
# .npmrc

registry=https://registry.npm.taobao.org/
disturl=https://npm.taobao.org/dist
sass-binary-site=http://npm.taobao.org/mirrors/node-sass/
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
```

## 方式二（执行结果等同于方式一）

> npm 默认镜像源

```bash
https://registry.npmjs.org
```

> 将 npm 的镜像源替换为 cnpm 镜像源

- 安装时临时替换

```bash
npm i xxName --registry=https://registry.npm.taobao.org
```

- 全局替换

```bash
npm config set registry https://registry.npm.taobao.org
```

> 将 npm 镜像源恢复

- 临时恢复

```bash
npm i xxName --registry=https://registry.npmjs.org
```

- 全局恢复

-

```bash
npm config set registry https://registry.npmjs.org/
```

## 替换 disturl

```
npm config set disturl https://registry.npmjs.org/
```

## 查看当前使用的镜像源

```bash
npm config get registry
npm config get disturl
```
