# node 模块加载

[toc]

## `require()` 模块加载规则

### 有相对路径或绝对路径时

1. 根据路径查找模块，带扩展名（比如 `a.js`）的直接引入
2. 不带扩展名，先找同名的 js 文件，找不到则找同名目录，找到同名目录自动加载其中的 `index.js`
3. 如果同名目录也没有，则去查找 package.json 中 `main` 属性指定的入口文件
4. 再找不到则报错

### 没有路径且没有扩展名时

1. 先找是否是系统模块
2. 找不到再去 node_modules 中查找，先查找同名js，没有再查找同名目录，找到目录加载 `index.js`
3. 找不到再去查找 package.json 中 `main` 属性指定的入口文件
4. 再找不到则报错

## 系统模块

### `fs` 文件系统模块（File System）

```js
const fs = require('fs')

// 文件读取
fs.readFile(path[, options], callback)
fs.readFileSync(path[, options])


// 文件写入
fs.writeFile(file, data[, options], callback)
fs.writeFileSync(file, data[, options])

```

### `path` 路径模块

```js
const path = require('path')

path.join([...paths])
path.resolve([...paths])
```

## 第三方模块

### `nodemon` 开发时热重载工具

```bash
npm install -g nodemon
```

运行文件时，替换掉原有的 `node app.js`

```bash
nodemon app.js
```

### `nrm` npm 镜像地址管理器

```bash
npm install -g nrm
```

```bash
# 列出可用的镜像地址，其中标星号的为目前使用的镜像
nrm ls

# 选择一个镜像地址名称并使用
# nrm use taobao

# 然后再使用 npm 安装即可
```
