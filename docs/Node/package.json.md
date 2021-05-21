# package.json

[toc]

创建：

```bash
npm init # 自定义创建

npm init -y # 快速创建当前 npm 配置的默认模版
```

修改快速创建的默认信息：

```bash
npm set init.author.email "example-user@example.com"
npm set init.author.name "example_user"
npm set init.license "MIT"
```

`package.json` 文件的内容是一个 JSON 对象，对象的每一个成员属性就是当前项目的一项配置。

其中 `name` 和 `version` 是必备属性，它们是组成一个 npm 包的唯一标识。

发布（publish）包时必须包含此文件。

`package.json` 文件的作用：

- 列出项目所依赖的包
- 使用语义版本化规则指定项目能够使用的 package 的版本
- 使您的构建具有可重复性，因此更容易与其他开发人员共享

## Options

### ----- 必备属性 -----

### `name` 模块名称（包名称）

`type: string`

`default: -`

- 只能包含小写字母，
- 可以包含 `数字`, `-`, `_`, `@`, `/`, `.` 等符号
- 包名不能包含任何非URL安全字符(因为名称最终是URL的一部分)
- 不能以 `.` 或 `_` 开头
- 不能包含空格
- 不能包含 `~` `)` `(` `'` `!` `*` 中任一字符
- 不能是 Node.js 或 io.js 的核心模块名，不能是保留名字或黑名单列表中的名字，如 `http`, `stream`, `node_modules`, `favicon.ico` 等
- 长度不能超过214
- 若名称中存在一些符号，将符号去除后不得与现有的包名重复，例如：由于 `react-router-dom` 已经存在，`react.router.dom`、`reactrouterdom` 都不可以再创建。

以下为合法名称示范：

```bash
some-package

example.com

under_score

123numeric

@npm/thingy

@jane/foo.js
```

查看包名是否已经存在：

```bash
npm view <packageName>
```

如果此包存在，会显示基本信息，如果不存在，则会抛出 `404` 错误。

也可以直接到 `https://www.npmjs.com/` 上搜索包名是否存在。

### `version`

`type: string`

`default: "1.0.0"`

必须是 `x.y.z` 这样的格式，遵循 [`semantic versioning guidelines`](https://docs.npmjs.com/about-semantic-versioning) 规范

- `x` 是主版本号(major)：修改了不兼容的 API
- `y` 是次版本号(minor)：新增了向下兼容的功能
- `z` 为修订号(patch)：修正了向下兼容的 bug

版本号推荐以 `1.0.0` 开始并遵循以下：

Code status | Stage | Rule | Example version
| -- | -- | -- | -- |
First release  | New product | Start with 1.0.0 | 1.0.0
Backward compatible bug fixes | Patch release | Increment the third digit | 1.0.1
Backward compatible new features | Minor release | Increment the middle digit and reset last digit to zero | 1.1.0
Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0

指定依赖包接受的更新的类型，例如，要指定依赖包可接受的版本更新范围，可以使用以下语法:

- Patch releases (只接受补丁更新): `1.0` or `1.0.x` or `~1.0.4`
- Minor releases (只接受小版本和补丁更新): `1` or `1.x` or `^1.0.4`
- Major releases (接受主要版本、小版本、补丁更新等所有更新): `*` or `x`

当某个版本改动比较大、并非稳定而且可能无法满足预期的兼容性需求时，我们可能要先发布一个先行版本。

先行版本号可以加到 `major.minor.patch` 版本号的后面，通过 `-` 号连接一连串以句点分隔的标识符和版本编译信息：

- `alpha` 内部版本
- `beta` 公测版本
- `Release candiate` 正式版本的候选版本 `rc`

查看一个包的版本：

```bash
npm view vue version # 查看 vue 的当前版本

npm view vue versions # 查看 vue 的历史版本信息，数组显示
```

运行 `npm view vue versions` 可以看到

```bash
# npm view vue version
2.6.11

# npm view vue versions
[
  '0.0.0',          '0.6.0',                '0.7.0',
  '0.7.1',          '0.7.3',                '0.7.4',
  '0.7.5',          '0.7.6',                '0.8.0',
  '0.8.1',          '0.8.2',                '0.8.3',
  '0.8.4',          '0.8.6',                '0.8.7',
  '0.8.8',          '0.9.0',                '0.9.1',
  '0.9.2',          '0.9.3',                '0.10.0',
  '0.10.1',         '0.10.2',               '0.10.3',
  '0.10.4',         '0.10.5',               '0.10.6',
  '0.11.0-rc',      '0.11.0-rc2',           '0.11.0-rc3',
  '0.11.0',         '0.11.1',               '0.11.2',
  '0.11.3',         '0.11.4',               '0.11.5',
  '0.11.6',         '0.11.7',               '0.11.8',
  '0.11.9',         '0.11.10',              '0.12.0-beta1',
  '0.12.0-beta2',   '0.12.0-beta3',         '0.12.0-beta4',
  '0.12.0-beta5',   '0.12.0-csp',           '0.12.0-rc',
  '0.12.0-rc2',     '0.12.0',               '0.12.1-csp',
  '0.12.1-csp.1',   '0.12.1-csp.2',         '0.12.1',
  '0.12.2',         '0.12.3',               '0.12.4',
  '0.12.5-csp',     '0.12.5',               '0.12.6-csp',
  '0.12.6',         '0.12.7-csp',           '0.12.7',
  '0.12.8-csp',     '0.12.8',               '0.12.9-csp',
  '0.12.9',         '0.12.10-csp',          '0.12.10',
  '0.12.11-csp',    '0.12.11',              '0.12.12-csp',
  '0.12.12',        '0.12.13-csp',          '0.12.13',
  '0.12.14-csp',    '0.12.14',              '0.12.15-csp',
  '0.12.15',        '0.12.16-csp',          '0.12.16',
  '1.0.0-alpha.1',  '1.0.0-alpha.2',        '1.0.0-alpha.3',
  '1.0.0-alpha.4',  '1.0.0-alpha.5',        '1.0.0-alpha.6',
  '1.0.0-alpha.7',  '1.0.0-alpha.8',        '1.0.0-beta.1',
  '1.0.0-beta.2',   '1.0.0-beta.3',         '1.0.0-beta.4',
  '1.0.0-csp',      '1.0.0-migration',      '1.0.0-rc.1',
  '1.0.0-rc.2',     '1.0.0-rc.2-migration', '1.0.0',
  '1.0.1',          '1.0.2',                '1.0.3',
  '1.0.4',          '1.0.5',                '1.0.6',
  '1.0.7',          '1.0.8',                '1.0.9',
  '1.0.10-csp',     '1.0.10',               '1.0.11-csp',
  '1.0.11',         '1.0.12-csp',           '1.0.12-csp-1',
  '1.0.12',         '1.0.13-csp',           '1.0.13',
  '1.0.14-csp',     '1.0.14',               '1.0.15-csp',
  '1.0.15',         '1.0.16-csp',           '1.0.16',
  '1.0.17-csp',     '1.0.17',               '1.0.18-csp',
  '1.0.18',         '1.0.19-csp',           '1.0.19',
  '1.0.20-csp',     '1.0.20',               '1.0.21-csp',
  '1.0.21',         '1.0.22-csp',           '1.0.22',
  '1.0.23-csp',     '1.0.23',               '1.0.24-csp',
  '1.0.24',         '1.0.25-csp',           '1.0.25',
  '1.0.26-csp',     '1.0.26',               '1.0.27-csp',
  '1.0.27',         '1.0.28-csp',           '1.0.28',
  '2.0.0-alpha.1',  '2.0.0-alpha.2',        '2.0.0-alpha.3',
  '2.0.0-alpha.4',  '2.0.0-alpha.5',        '2.0.0-alpha.6',
  '2.0.0-alpha.7',  '2.0.0-alpha.8',        '2.0.0-beta.1',
  '2.0.0-beta.2',   '2.0.0-beta.3',         '2.0.0-beta.4',
  '2.0.0-beta.5',   '2.0.0-beta.6',         '2.0.0-beta.7',
  '2.0.0-beta.8',   '2.0.0-rc.1',           '2.0.0-rc.2',
  '2.0.0-rc.3',     '2.0.0-rc.4',           '2.0.0-rc.5',
  '2.0.0-rc.6',     '2.0.0-rc.7',           '2.0.0-rc.8',
  '2.0.0',          '2.0.1',                '2.0.2',
  '2.0.3',          '2.0.4',                '2.0.5',
  '2.0.6',          '2.0.7',                '2.0.8',
  '2.1.0',          '2.1.1',                '2.1.2',
  '2.1.3',          '2.1.4',                '2.1.5',
  '2.1.6',          '2.1.7',                '2.1.8',
  '2.1.9',          '2.1.10',               '2.2.0-beta.1',
  '2.2.0-beta.2',   '2.2.0',                '2.2.1',
  '2.2.2',          '2.2.3',                '2.2.4',
  '2.2.5',          '2.2.6',                '2.3.0-beta.1',
  '2.3.0',          '2.3.1',                '2.3.2',
  '2.3.3',          '2.3.4',                '2.4.0',
  '2.4.1',          '2.4.2',                '2.4.3',
  '2.4.4',          '2.5.0',                '2.5.1',
  '2.5.2',          '2.5.3',                '2.5.4',
  '2.5.5',          '2.5.6',                '2.5.7',
  '2.5.8',          '2.5.9',                '2.5.10',
  '2.5.11',         '2.5.12',               '2.5.13',
  '2.5.14',         '2.5.15',               '2.5.16',
  '2.5.17-beta.0',  '2.5.17',               '2.5.18-beta.0',
  '2.5.18',         '2.5.19',               '2.5.20',
  '2.5.21',         '2.5.22',               '2.6.0-beta.1',
  '2.6.0-beta.2',   '2.6.0-beta.3',         '2.6.0',
  '2.6.1',          '2.6.2',                '2.6.3',
  '2.6.4',          '2.6.5',                '2.6.6',
  '2.6.7',          '2.6.8',                '2.6.9',
  '2.6.10',         '2.6.11',               '3.0.0-alpha.0',
  '3.0.0-alpha.1',  '3.0.0-alpha.2',        '3.0.0-alpha.3',
  '3.0.0-alpha.4',  '3.0.0-alpha.5',        '3.0.0-alpha.6',
  '3.0.0-alpha.7',  '3.0.0-alpha.8',        '3.0.0-alpha.9',
  '3.0.0-alpha.10', '3.0.0-alpha.11',       '3.0.0-alpha.12',
  '3.0.0-alpha.13', '3.0.0-beta.1',         '3.0.0-beta.2',
  '3.0.0-beta.3',   '3.0.0-beta.4',         '3.0.0-beta.5',
  '3.0.0-beta.6',   '3.0.0-beta.7',         '3.0.0-beta.8',
  '3.0.0-beta.9',   '3.0.0-beta.10',        '3.0.0-beta.11',
  '3.0.0-beta.12',  '3.0.0-beta.13',        '3.0.0-beta.14',
  '3.0.0-beta.15',  '3.0.0-beta.16',        '3.0.0-beta.17',
  '3.0.0-beta.18',  '3.0.0-beta.19',        '3.0.0-beta.20',
  '3.0.0-beta.21',  '3.0.0-beta.22',        '3.0.0-beta.23',
  '3.0.0-beta.24',  '3.0.0-rc.1',           '3.0.0-rc.2',
  '3.0.0-rc.3',     '3.0.0-rc.4'
]

```

### ----- 描述信息 -----

### `description` 描述信息

`type: string`

`default: -`

添加包的描述信息，便于用户了解，以及增加搜索时的匹配曝光机会。

### `keywords` 关键字

`type: string`

`default: -`

给包添加关键字，增加搜索时的匹配曝光机会。

### `author` 包的主要作者，一个人

`type: string`

`default: -`

### `contributors` 包的贡献者，多个人

`type: Array<string> | Array<{ "name": "", "email": "", "url": "" }>`

`default: -`

比如：

```json
"contributors": [
  {
    "name": "waantony",
    "email": "wanganantony@gmail.com",
    "url": "https://github.com/waantony"
  },
  {
    "name": "waantony1",
    "email": "wanganantony1@gmail.com",
    "url": "https://github.com/waantony1"
  }
]
```

### `homepage` 该模块的主页

`type: string`

`default: -`

模块官网地址或仓库地址。

比如 `vue` 的：

```json
{
  "homepage": "https://github.com/vuejs/vue#readme",
}
```

### `repository` 代码仓库地址

`type: object`

`default: -`

设置该包的源码仓库地址，会在 npm 包的页面显示。

比如 `vue` 的：

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/vuejs/vue.git"
},
```

### `bugs` 提出 bug 的途径

`type: object`

`default: -`

一个地址或者一个邮箱，对你的模块存在疑问的人可以到这里提出问题。

比如 `vue` 的：

```json
"bugs": {
  "url": "https://github.com/vuejs/vue/issues"
}
```

### ----- 协议 -----

### `license` 指定软件的开源协议

`type: string`

`default: ISC`

开源协议里面详尽表述了其他人获得你代码后拥有的权利，可以对你的的代码进行何种操作，何种操作又是被禁止的。同一款协议有很多变种，协议太宽松会导致作者丧失对作品的很多权利，太严格又不便于使用者使用及作品的传播，所以开源作者要考虑自己对作品想保留哪些权利，放开哪些限制。

软件协议可分为开源和商业两类，对于商业协议，或者叫法律声明、许可协议，每个软件会有自己的一套行文，由软件作者或专门律师撰写，对于大多数人来说不必自己花时间和精力去写繁长的许可协议，选择一份广为流传的开源协议就是个不错的选择。

- `MIT`：只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。

- `Apache`：类似于 MIT，同时还包含了贡献者向用户提供专利授权相关的条款。

- `GPL`：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。

如果你对开源协议有更详细的要求，可以到 `https://choosealicense.com/` 获取更详细的开源协议说明。

### ----- 目录、文件相关 -----

### `main` 入口，默认 `"index.js"`

`type: string`

`default: "index.js"`

一种元数据功能，它可以用来指定加载的入口文件。

在项目中 `require('package')` 时，实际上就会去查找加载这个 `package` 中 `package.json` 的 `main` 字段指定的入口文件。

### `bin` 命令行工具入口

`type: object`

`default: -`

当 package.json 提供了 `bin` 字段后，即相当于做了一个命令名和本地文件名的映射。

当用户安装配置了 `bin` 字段的包时：

- 如果是全局安装，以 windows 为例，npm 会将 bin 字段对应的目录下的可执行文件文件链接到 `C:\Users\xxx\AppData\Roaming\npm`，这个目录已经被添加到用户变量的 `Path` 变量中。
- 如果是项目内安装，会链接到 `./node_modules/.bin/` 目录中，但在运行 `npm run xxx` 时会临时将项目下的 `./node_modules/.bin/` 的所有命令添加到全局，执行后又恢复原样。

通俗点理解就是，如果全局安装， 就可以在任何目录的命令行中执行这个文件，项目本地安装，则仅可以在当前工程目录的命令行中执行该文件。

比如，自己想写一个脚手架工具，包名叫做 `my-app-cli`，希望让用户安装这个包后，使用 `mac` 作为命令。

在开发这个脚手架工具的时候，首先创建 `bin` 目录，在其中创建一个 `cli.js` 编写一系列操作，然后，配置一下 `package.json` 的 `bin` 字段：

```json
"bin": {
  "mac": "bin/cli.js"
}
```

上例表示，运行 `mac` 命令，则会自动运行 `bin/cli.js`。

因此，当用户在项目中安装 `my-app-cli` 包后，就可以在项目终端运行：

```bash
node node_modules/.bin/mac
```

这就相当于运行：

```bash
node node_modules/my-app-cli/.bin/cli.js
```

因为 `my-app-cli` 包的 `package.json` 中配置了 `bin` 字段，用户安装包后，程序自动将这个包中的  `package.json`  中的 `bin` 对象中配置的所有属性当作命令放到了 `project/node_modules/.bin/` 目录中，运行时会自动去执行命令所对应真实路径的文件。

同时，用户还可以将上面的命令写入自己项目的 `package.json` 的 `scripts` 命令中，简化每次执行的输入：

```json
"scripts": {
  "start": "node node_modules/.bin/mac"
}
```

这样，用户在自己的项目终端中执行 `npm run start` 或 `npm start` 即可。

但是，这看起来和 `vue create` / `create-react-app` 之类的命令不太像？ 原因如下：

当需要 node 环境时，就需要加上 node 前缀， 加上 node 前缀后，就需要指定 `mac` 的路径 (`node_modules/.bin`) ，否则如果直接执行 `node mac` 会去查找当前终端同级目录下的 `mac.js`，不会主动去执行 `node_modules/.bin` 中的 `mac` ，这样肯定是不对。

若要实现像 `vue create` / `create-react-app` 之类的命令一样简便的方式，可以在前面提到的开发 `my-app-cli` 包时，在 `bin/cli.js` 文件中的第一行写入以下命令：

```js
#!/usr/bin/env node
```

这行命令的作用是告诉系统用 node 来解析，这样命令就可以简写成 `mac` 了。

#### 实例：@vue/cli-service

- `@vue/cli-service/bin` 目录中编写了 `vue-cli-service.js`

- `@vue/cli-service/package.json` 中配置了

  ```json
  "bin": {
    "vue-cli-service": "bin/vue-cli-service.js"
  }
  ```

- 用户通过 `vue create myproject` 创建项目后，自动将 `@vue/cli-service` 包安装到了项目下。`myproject/package.json` 中 `devDependencies` 字段可以看到：

  ```json
  "devDependencies": {
    "@vue/cli-service": "^4.4.6"
  }
  ```

- 在 `myproject/node_modules/.bin` 目录中可以看到有 `vue-cli-service.cmd` 文件。

- 在 `myproject/package.json` 中可以看到：

  ```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
  ```

- 所以用户可以在项目终端执行 `npm run serve` 或 `npm run build` 或 `npm run lint`，实际上都会去执行 `node myproject/node_modules/@vue/cli-service/bin/vue-cli-service.js`

未完待续，整理

<https://mp.weixin.qq.com/s/ksTl7cnjRIUQU532eq-W8g>
<https://mp.weixin.qq.com/s/OMMJHFXXxWmBO2d5UEV4gw>
<https://mp.weixin.qq.com/s/CrbNmNnu0EiA7RcDgJbPJA>

### `files` 需要发布到 npm 的文件列表

`type: Array<string>`

`default: 项目所有文件`

指定当使用 `npm publish` 命令时，需要推送到 npm 服务器的文件或文件夹列表

比如，查看 `vue` 的 `package.json` 中的 `files` 字段

```json
"files": [
  "src",
  "dist/*.js",
  "types/*.d.ts"
],
```

还可以在项目根目录创建一个 `.npmignore` 文件来指定发布时忽略文件。规则上和 `.gitignore` 是一样的

### `man` 略

### --- 脚本配置 ---

### `scripts` 脚本命令的缩写

`type: object`

`default: { "test": "echo \"Error: no test specified\" && exit 1" }`

`scripts` 是 `package.json` 中的一种元数据功能，`scripts` 是一个对象，对象的 key 是自定义的，用于执行 `npm run key` 的， 对应的 value 则为 `npm run key` 后实际要运行的终端命令，比如：

```json
"scripts": {
  "dev": "node dev.js",
  "build": "node prod.js",
  "start": "node start.js"
},
```

```bash
npm run dev
npm run build
npm run start # start 可以不用 run , 执行 npm start 完全等效
```

这样，当实际运行的命令很长时，就可以不用每次输入太长的命令。

各个脚本可以互相组合使用：

```json
{
  "scripts": {
    "test": "jest --config .jest.js --no-cache",
    "dist": "antd-tools run dist",
    "compile": "antd-tools run compile",
    "build": "npm run compile && npm run dist"
  }
}
```

#### npm 脚本的原理

每当执行 `npm run xxx`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run xxx` 新建的这个 Shell，会将当前项目目录下的 `node_modules/.bin` 子目录临时加入用户 `Path` 变量，执行结束后，再将 `Path` 变量恢复原样。

所以，直接在项目终端运行 `vue-cli-service serve` 会报错 `无法将“vue-cli-service”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。`

但是在 `scripts` 中设置了 `"serve": "vue-cli-service serve"` 后运行 `npm run serve` 虽然同样是执行 `vue-cli-service serve` 命令，但此时 `npm run xxx` 命令已经将项目下的 `node_modules/.bin` 子目录加入用户 `Path` 变量，也就是 `node_modules/.bin` 下的 `vue-cli-service` 被临时加入了用户 `Path` 变量，使用后又恢复原样。

#### 通配符

`*` 表示任意文件名，`**` 表示任意一层子目录。

```json
"scripts": {
  "dev": "node *.js",
  "build": "node **/*.js"
}
```

上例中 `*.js` 表示匹配当前目录下所有的 `.js` 文件， `**/*.js` 表示匹配所有目录下的 `.js` 文件。

如果传入 `*` 号不想用作通配符，需要用反斜线转义，写为 `\*`

#### 脚本执行顺序

- `&` 并行执行，同时开始执行 `&` 前后的命令
- `&&` 顺序执行，前一个任务成功才执行后一个

#### 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```json
"scripts": {
  "start": "node server.js",
  "install": "node-gyp rebuild"
}
```

上面代码中，`npm run start` 的默认值是 `node server.js`，前提是项目根目录下有 `server.js` 这个脚本；`npm run install` 的默认值是 `node-gyp rebuild`， 前提是项目根目录下有 `binding.gyp` 文件。

#### 钩子

npm 脚本有 pre 和 post 两个钩子， 可以在这两个钩子里面，完成一些准备工作和清理工作。

```json
"scripts": {
  "go": "node index.js",
  "prego": "node pre.js",
  "postgo": "node post.js"
}
```

如上例，执行 `npm run go` 时，会先自动执行 `npm run prego`，然后执行 `npm run go`， 然后执行 `npm run postgo`

npm 默认提供下面这些钩子:

```bash
prepublish postpublish
preinstall postinstall
preuninstall postuninstall
preversion postversion
pretest posttest
prestop poststop
prestart poststart
prerestart postrestart
```

可以通过 `process.env.npm_lifecycle_event` 获取运行的脚本名称

```js
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
  console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
  console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
  console.log(`Running the posttest task!`);
}
```

#### 简写形式

四个常用的 npm 脚本有简写形式。

- `npm start` 是 `npm run start` 的简写
- `npm stop` 是 `npm run stop` 的简写
- `npm test` 是 `npm run test` 的简写
- `npm restart` 是 `npm run stop && npm run restart && npm run start` 的简写

`npm start`、`npm stop` 和 `npm restart` 都比较好理解，而 `npm restart` 是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

```bash
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

#### 项目中获取 `package.json` 的变量

通过 `process.env` 可以获取所有 `package.json` 中的配置，所有对象属性都会以 `_` 拼接为变量名，比如：

```js
concols.log(process.env.npm_package_name)
concols.log(process.env.npm_package_version)
concols.log(process.env.npm_package_author_name)
concols.log(process.env.npm_package_scripts_dev)
concols.log(process.env.npm_package_main)
concols.log(process.env.npm_package_devDependencies_eslint)
concols.log(process.env.npm_package_devDependencies_eslint_plugin_standard)
```

#### 跨平台地设置及使用环境变量

通过第三方模块 `cross-env` 可以实现跨平台设置及使用环境变量，

安装：

```bash
npm install --save-dev cross-env
```

使用：

```json
"scripts": {
  "go": "cross-env NODE_ENV=production title=hello msg=\"hello world\" node index.js"
}
```

```js
// index.js

console.log(process.env.NODE_ENV) // 'production'
console.log(process.env.title) // 'hello'
console.log(process.env.msg) // 'hello world'
```

### `config` 暴露一些配置变量

config 字段用于配置脚本中使用的环境变量，例如下面的配置，可以在脚本中使用`process.env.npm_package_config_port` 进行获取。

```json
{
  "config" : {
    "port" : "8080"
  }
}
```

### ----- 依赖包相关属性 -----

在介绍几种依赖配置之前，首先我们来看一下依赖的配置规则，你看到的依赖包配置可能是下面这样的：

```json
"dependencies": {
  "antd": "ant-design/ant-design#4.0.0-alpha.8",
  "axios": "^1.2.0",
  "test-js": "file:../test",
  "test2-js": "http://cdn.com/test2-js.tar.gz",
  "core-js": "^1.1.5",
}
```

依赖配置遵循下面几种配置规则：

- `<packageName>:VERSION`

  `VERSION` 是一个遵循 `SemVer` 规范的版本号配置， `npm install` 时将到 npm 服务器下载符合指定版本范围的包。

- `依赖包名称:DWONLOAD_URL`

  `DWONLOAD_URL` 是一个可下载的 `tarball` 压缩包地址，模块安装时会将这个 `.tar` 下载并安装到本地。

- `依赖包名称:LOCAL_PATH`

  `LOCAL_PATH` 是一个本地的依赖包路径，例如 `file:../pacakges/pkgName`。适用于你在本地测试一个 `npm` 包，不应该将这种方法应用于线上。

- `依赖包名称:GITHUB_URL`

  `GITHUB_URL` 即 github 的 `username/modulename` 的写法，例如：`ant-design/ant-design`，你还可以在后面指定 `tag` 和 `commit id`。

- `依赖包名称:GIT_URL`

  `GIT_URL` 即我们平时 `clone` 代码库的 `git url`，其遵循以下形式：

```http
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

其中 `protocal` 可以是以下几种形式：

- `git://github.com/user/project.git#commit-ish`

- `git+ssh://user@hostname:project.git#commit-ish`

- `git+ssh://user@hostname/project.git#commit-ish`

- `git+http://user@hostname/project/blah.git#commit-ish`

- `git+https://user@hostname/project/blah.git#commit-ish`

### `dependencies` 生产环境依赖包

`type: object`

`default: {}`

项目运行所依赖的模块，也就是编译时需要一起打包的资源。

增加生产环境依赖包：

```bash
npm install --save <package>

# 简写
npm i <package>
```

### `devDependencies` 开发环境依赖包

`type: object`

`default: {}`

项目开发时所依赖的模块，通常仅打包时帮助编译，编译完成后则不需要了，不会一起随项目打包。

增加开发环境依赖包：

```bash
npm install --save-dev <package>

# 简写
npm i -D <package>
```

执行 `npm install` 会自动安装 `dependencies` 和 `devDependencies` 中的所有包。

### `peerDependencies` 指定所依赖的包的最低版本

`type: object`

`default: {}`

用于指定你正在开发的模块所依赖的其他模块的版本以及用户安装的依赖包版本的兼容性。

比如 `antd` 的：

```json
"peerDependencies": {
  "react": ">=16.0.0",
  "react-dom": ">=16.0.0"
}
```

上例中， antd 说明了它所依赖的一些包的最低版本。

### `optionalDependencies` 可选依赖， 同 `dependencies`

`type: object`

`default: {}`

某些场景下，依赖包可能不是强依赖的，这个依赖包的功能可有可无，当这个依赖包无法被获取到时，你希望 `npm install` 继续运行，而不会导致失败，你可以将这个依赖放到 `optionalDependencies` 中。

注意 `optionalDependencies` 中的配置将会覆盖掉 `dependencies` 所以只需在一个地方进行配置。

当然，引用 `optionalDependencies` 中安装的依赖时，一定要做好异常处理，否则在模块获取不到时会导致报错。

### `bundledDependencies`

`type: object`

`default: {}`

和另外几个不同，`bundledDependencies` 的值是一个数组，数组里可以指定一些模块，这些模块将在这个包发布时被一起打包。

```json
"bundledDependencies": ["package1" , "package2"]
```

### ----- 发布配置 -----

### `preferGlobal` 是否建议用户全局安装

如果你的 node.js 模块主要用于安装到全局的命令行工具，那么该值设置为 true ，当用户将该模块安装到本地时，将得到一个警告。这个配置并不会阻止用户安装，而是会提示用户防止错误使用而引发一些问题。

### `private` 是否是私有包

`type: boolean`

`default: false`

非开源项目可以设置 `private` 的值为 `true`，设置为 `true` 后，npm 将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。

### `publishConfig`

发布模块时更详细的配置，例如你可以配置只发布某个 tag、配置发布到的私有 npm 源。更详细的配置可以参考 `npm-config`

```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
},
```

### `os` 指定包可在哪些系统中运行

`type: Array<string>`

`default: -`

该属性可以指定模块适用的系统：

```bash
"os" : ["linux"] # 指定适用的系统
```

也可以指定不适用的系统：

```bash
"os" : ["!linux"] # 指定不适用的系统
```

当在不适用系统中安装则会报错。

### `cpu` 指定模块适用的 cpu 架构

`type: Array<string>`

`default: -`

指定模块适用的 cpu 架构：

```bash
"cpu" : ["x64"] # 指定适用的 cpu 架构
```

指定不适用的 cpu 架构：

```bash
"cpu" : ["!x64"] # 指定不适用的 cpu 架构
```

### `engines` 指定引擎(node/npm)版本

`type: object`

`default: -`

指定一系列引擎的版本，但只是作为提示信息，不会阻止不符合的用户安装。

```json
"engines": {
   "node": ">= 8.16.0",
   "npm": ">= 6.9.0"
},
```

### -----

### `proxy` 解决开发环境跨域问题

`type: string`

`default: -`

开发环境中，可以通过配置 `package.json` 中的 `proxy` 来解决跨域问题：

```json
{
  "proxy": "http://localhost:4000"
}
```

项目中通常使用模块 `http-proxy-middleware` 来解决跨域问题。 `webpack-dev-server` 也是用的它。
