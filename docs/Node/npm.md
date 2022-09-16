# npm 文档

[toc]

## 开始使用

### 创建用户

注册地址：[https://www.npmjs.com/signup](https://www.npmjs.com/signup), 注册的用户名和邮箱都将会被公开展示出来。

> npm 用户名注册后不支持修改，要更改用户名只能重新注册账号，要注意，删除账号 30 天后，这个账号的用户名将可供其他人注册。
> npm 建议设置复杂的密码，且不要与其他网站使用相同密码，并开启两步验证，不要将密码告知任何人。

注册后可以在终端中进行登录，执行 `npm login` 命令后，根据提示输入用户名和密码来进行登录，如果输入了一个不存在的用户名，则会直接创建一个新用户。

如果账号开启了两步验证，则还会要求输入一次性密码。

要查看当前登录的是哪个账号，在终端执行 `npm whoami` 即可。

查看更多和账号相关的 npm 命令 [Authorization and writes](https://docs.npmjs.com/about-two-factor-authentication#authorization-and-writes) 。

### 安装 npm

安装 Node.js 时，会自动安装 npm 。但是，npm 的发布频率比 Node.js 高，因此要安装最新的稳定版 npm，可以在命令行上运行：

```bash
# 全局安装最新版 npm
npm install npm@latest -g

# 查看当前安装的 npm 版本
npm -v
```

### 故障排除

#### 生成 `npm-debug.log` 日志文件

当包安装或发布失败时，npm CLI 将生成一个 `npm-debug.log` 文件。此日志文件可以帮助您找出问题所在。

如果需要生成 npm-debug.log 文件，可以运行以下命令之一：

```bash
# 安装包时
npm install --timing

# 发布包时
npm publish --timing
```

您可以在 `.npm` 目录中找到 `npm-debug.log` 文件。要查找您的 `.npm` 目录，请使用 `npm config get cache` 。

如果您使用 CI 环境，您的日志可能位于其他地方。例如，在 Travis CI 中，您可以在 `/home/travis/build` 目录中找到它们。

#### 常见错误

查看 [常见错误](https://docs.npmjs.com/common-errors)

## 包 (Packages) 和模块 (Modules)

### 包和模块的介绍

#### npm 公共服务器 (public npm registry)

公共的 npm 服务器是一个 JavaScript 包的数据库，每个包都由软件和元数据组成。每个人都可以向其中发布 npm 包，也可以从其中下载安装 npm 到项目中使用。

#### 关于包和模块

npm 服务器上有很多的包，其中很多包就是 Node 模块，或者是包含 Node 模块。接下来将介绍它们的不同之处以及它们如何相互作用。

##### 关于包 (Packages)

一个目录下有一个 `package.json` 文件时，这个目录就可以叫做一个包，必须有 `package.json` 文件才能叫做一个包，才能发布到 npm 服务器。

包可以不限定范围，或限定给用户或组织，限定范围的包可以是私有的或公共的。

###### 包的格式

包可以是以下任何一种形式：

1. 包含 `package.json` 文件的文件夹；
2. 形式 `1` 的 gzip 压缩包；
3. 可以解析到形式 `2` 的一个 URL；
4. 一个形式 `3` 的 发布到 npm 服务器的 `<name>@<version>` 形式；
5. 指向形式 `4` 的 `<name>@<tag>` ；
6. 满足形式 `5` 的拥有 `latest` 标签的 `<name>` ；
7. 一个 Git URL，克隆后的目录必须符合形式 `1` 。

Git URL 形式的包可以是以下任意一种形式：

- `git://github.com/user/project.git#commit-ish`
- `git+ssh://user@hostname:project.git#commit-ish`
- `git+http://user@hostname/project/blah.git#commit-ish`
- `git+https://user@hostname/project/blah.git#commit-ish`

其中的 `commit-ish` 可以是任何 Git 标签 (tag), Git 提交校验和 (sha), Git 分支 (branch) ，默认情况下，`commit-ish` 是 `master` 。

##### 关于模块 (Modules)

模块，就是 `node_modules` 目录中可以由 Node.js 的 `require()` 函数加载的任何文件或目录。

要被 Node.js 的 `require()` 函数加载，模块必须满足以下条件之一：

- 一个包含 `package.json` 文件的文件夹，`package.json` 中包含 `main` 字段；
- 一个 JavaScript 文件。

注意，模块并不是必须有 `package.json` 文件，因此并非每个模块都是一个包。只有包含 `package.json` 文件的模块可以叫做一个包。

在 Node 程序的上下文中，模块也可以是从一个文件加载的东西。例如，在以下程序中：

```js
const req = require('request')
```

我们可以说，变量 `req` 指的就是 `request` 模块。

#### 关于包的作用域 (scopes)

当您注册 npm 用户帐户或创建组织时，您将获得与您的用户或组织名称匹配的作用域。您可以将此作用域用作相关包的命名空间。

作用域允许您创建与其他用户或组织创建的包同名的包，而不会发生冲突。

作用域包的格式为 `@<scope>/<package>` ，比如 `@types/node` ，表示在 types 作用域下的 node 包。

##### 作用域和包的可见性

- 非作用域包只能作为公开的；
- 作用域包可以作为私有的或公开的，默认是私有的。如果要将它公开，必须在发布时传递相应的命令行标志。

#### 公开的包

任何人都可以发布公开的包，同样地，任何人都可以使用公开的包。

- 公开的非作用域包存在于全局公共注册表命名空间中，并且可以在 `package.json` 文件中单独使用包名进行引用，比如 `npm` 就是一个全局的公开的非作用域包；
- 公开的作用域包属于一个用户或组织，当作为依赖项包含在 `package.json` 文件中时，必须以用户或组织名称开头，比如 `@types/node` 。

#### 私有的包

只有付费用户或付费组织才能使用私有包。

使用 npm 私有包，您可以使用 npm 注册表来托管仅对您和选定的协作者可见的代码，从而允许您在项目中管理和使用私有代码和公开代码。

私有包必须有一个作用域，作用域包默认情况下就是私有的。

- 用户作用域下的私有包只能由你和你授权的协作者访问；
- 组织作用域下的私有包只能由已授权的团队成员访问。

#### npm 包作用域、访问级别和可见性

npm 包的可见性取决于包所在的作用域（命名空间），以及为包设置的访问级别（私有的或公开的）。

注意，要创建“组织作用域”的包，您必须首先创建一个组织。

- 组织作用域下的私有的包，仅授权的团队成员可进行读或读写。
- 组织作用域下的公开的包，所有人都可读，但仅授权的团队成员可读写。
- 用户作用域下的私有的包，仅包的所有者和授权的用户可进行读或读写。
- 用户作用域下的公开的包，所有人都可读，但仅所有者和授权的用户可进行读或读写。
- 非作用域下的包（只可能是公开的包），所有人都可读，但仅所有者和授权的用户可进行读或读写。

注意，只有用户个人帐户可以创建和管理无作用域的包。组织账户只能管理作用域包。

### 向服务器共享包

#### 创建 `package.json` 文件

一个包中必须包含一个 `package.json` 文件，这个文件会：

- 列出你的项目所依赖的包；
- 通过使用 semantic versioning 规则指定每一个包的版本；
- 使得你的构建可以重现，因此更容易与其他开发者分享；

注意，要使你的包在 npm 网站上更容易被搜索到，建议在 `package.json` 文件中包含一个 `description` 字段，用来描述你的包。

##### `package.json` 文件的字段

###### `name` 字段，必须

`name` 字段是必须的，表示包的名称，只能由小写字母 (`a-z`) 、连字符 (`-`) 、下划线 (`_`) 组成。

###### `version` 字段，必须

`version` 字段是必须的，表示包的版本号，必须是 `x.x.x` 形式的，且遵循 [Semantic Versioning](https://semver.org/) 规范。

版本号推荐以 `1.0.0` 开始。

示例：

```bash
{
  "name": "my-awesome-package",
  "version": "1.0.0"
}
```

###### `author` 字段，非必须

`author` 字段可以用来包含包作者的信息，请使用以下格式（其中电子邮件和网站都不是必须的）：

```bash
Your Name <email@example.com> (http://example.com)
```

##### 新建 `package.json` 文件

在一个目录中新建 `package.json` 文件，有几种方式：

- 通过文件管理器直接新建一个文件，命名为 `package.json` 即可，这时创建的是一个空文件。
- 通过在命令行使用 `npm init` 命令创建，可以是交互式的或者是创建一个默认的文件。

###### 交互式创建

命令行进入到包的根目录，然后执行命令：

```bash
# 非作用域包
npm init

# 作用域包
npm init --scope=@<scope-name>
```

这就是 npm 包的初始化命令，执行命令后，命令行会立即显示一个问题，回答之后，会显示下一个问题，在这样一问一答的交互式问答完成后，即可创建好一份 `package.json` 文件。

npm 还支持自定义交互式问答的问题，如果需要自定义问题或者是想要修改 `package.json` 文件的字段，在系统当前登录用户的个人（家）目录下创建 `.npm-init.js` 文件，这个 js 文件需要导出一个对象，这个对象就是执行 `npm init` 后， `package.json` 文件所拥有的字段。

字段的值如果是需要用户输入，使用 `prompt()` 函数的返回值作为字段的值即可。

`.npm-init.js` 文件示例：

```js
// .npm-init.js

module.exports = {
  name: prompt('请输入包名'),
  version: prompt('请输入版本号'),
}
```

以上示例中，`.npm-init.js` 文件导出了一个对象，这个对象只有 `package.json` 文件所必须的两个字段，分别是 `name` 字段和 `version` 字段，分别用 `prompt()` 函数提示用户输入，提示语则是换成了中文。

注意，自定义 `.npm-init.js` 时，`package.json` 文件所必须的 `name` 字段和 `version` 字段应该始终存在，如果不存在，`name` 字段和 `version` 字段将默认为空字符串 `""` 。

比如：

```js
// .npm-init.js

module.exports = {
  author: prompt('请输入作者信息'),
}
```

上面的 `.npm-init.js` 文件中，只定义了 `author` 字段，在交互式问答中只会要求输入作者信息，当输入作者信息比如 `myname` 后，生成的 `package.json` 文件就是这样的：

```json
{
  "author": "myname",
  "name": "",
  "version": ""
}
```

可以看到，npm 自动加上了必须的 `name` 和 `version` 字段。

###### 快速创建

要快速创建 `package.json` 文件，可以使用 `--yes` (简写： `-y`) 参数，快速创建时，各个字段会自动读取默认值来填入。

```bash
# 快速创建
npm init --yes

# 简写
npm init -y
```

各字段的默认值：

- `name` ，取当前目录名；
- `version` ，始终为 `"1.0.0"` ；
- `description` ，读取 `README` 文件，没有则为空字符串 `""` ；
- `scripts` ，默认创建一个空的 `test` 脚本；
- `keywords` ，空数组 `[]` ；
- `author` ，空字符串 `""` ；
- `license` ，字符串 `"ISC"` ，查看 [ISC](https://opensource.org/licenses/ISC)；
- `bugs` ，来自当前目录的信息，如果存在的话，没有则不生成该字段；
- `homepage` ，来自当前目录的信息，如果存在的话，没有则不生成该字段；

比如，在 `my-project` 目录下，执行 `npm init -y` 后，生成的：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

###### 设置 `init` 命令的默认值

您可以为 `init` 命令设置默认配置选项。例如，要设置默认的作者电子邮件地址 (author email) 、作者称呼 (author name) 和许可 (license) ，可以在命令行上运行以下命令：

```bash
# 设置默认的作者邮件地址
npm set init-author-email "example-user@example.com"

# 设置默认的作者称呼
npm set init-author-name "example_user"

# 设置默认的许可
npm set init-license "MIT"
```

发布包到 npm 服务器上：

```bash
# 非作用域包
npm publish

# 公开发布作用域包
npm publish --access public
```

#### 为包添加说明文件 `README.md`

为了其他人能更好地使用你的包，建议在包的根目录添加 `README.md` 文件，用来说明安装、配置、使用方式、以及任何可以帮助用户的内容等，这个文件的内容将显示到这个 npm 包的页面上。

`README.md` 的扩展名 `.md` 表示的是 Markdown 文件，查看 [Markdown 语法](https://guides.github.com/features/mastering-markdown/#what) 。

#### 创建和发布公开的包

任何人都可以发布非作用域包到 npm 公开服务器上。

非作用域包只能作为公开的包，只能通过包名来引用，包名全网不可重复。

作用域包默认作为私有的包，但也可以将其作为公开的包，同一作用域下的包名不可重复，但不同作用域下的包名可以重复。

关于包的名称，有以下建议：

- 是唯一的；
- 是见名知义的；
- 符合 npm 政策指南。例如，不要给你的包起一个冒犯性的名字，不要使用别人的商标名或违反 npm 商标政策；
- 尚未被其他人拥有；
- 不要与另一个包名的拼写方式相似；
- 不会在作者身份上误导他人。

##### 创建一个包

1. 创建一个目录，目录名就是包名，比如 `my-test-package` ；

    ```bash
    mkdir my-test-package
    ```

2. 进入此目录；

    ```bash
    cd my-test-package
    ```

3. 初始化包；

    ```bash
    # 初始化为一个非作用域包
    npm init

    # 初始化为一个用户作用域包
    npm init --scope=@my-username

    # 初始化为一个组织作用域包
    npm init --scope=@my-org

    ```

4. 完成交互式问答后，生成 `package.json` 文件；
5. 创建一个 `README.md` 文件，用来说明你的包是做什么的，以及怎么使用它；
6. 开始编写包的内容。

##### 检查包中是否有敏感或不必要的信息

如果将敏感信息发布到服务器上，可能会损害您的用户，损害您的开发基础架构，修复成本高昂，并使您面临法律诉讼的风险。

强烈建议在将包发布到服务器上之前，删除敏感信息，例如私钥、密码、个人身份信息 (PII) 和信用卡数据等。

对于不太敏感的信息，例如测试数据，可以使用 `.npmignore` 或 `.gitignore` 文件来防止一些文件被发布到服务器上。

##### 发布之前进行测试

为了降低发布错误的可能性，建议在将包发布到 npm 服务器之前对其进行测试。

要在本地测试一个包，可以使用包目录的完整路径运行 `npm install` 命令：

```bash
npm install /path/to/my-test-package
```

##### 发布包

在测试完成确定包可以发布后，就可以开始进行发布操作了：

在包的根目录下执行：

```bash
# 发布包，默认不改变可见性，非作用域包默认为公开的，作用域包默认为私有的
npm publish

# 如果要将作用域包发布为公开的，可以执行：
npm publish --access public
```

在发布完成之后，就可以在 npm 网站上查看发布的包：

- 非作用域包 URL ： `https://npmjs.com/package/my-test-package` 。
- 用户作用域包 URL ： `https://npmjs.com/package/@my-username/my-test-package` 。
- 组织用域包 URL ： `https://npmjs.com/package/@my-org/my-test-package` 。

#### 指定依赖包

要指定你的项目所依赖的包，需要在 `package.json` 文件中将它们列为 `"dependencies"` 或 `"devDependencies"` 字段，这两个字段都是对象形式的，对象的键 (key) 表示依赖的包名称，对象的值(value) 表示依赖的包的版本。

`"dependencies"` 用来列出项目在生产环境中需要依赖的包，可以称它为生产依赖。

`"devDependencies"` 用来列出仅在本地开发阶段和测试阶段需要依赖的包，可以称它为开发依赖。

当在项目下运行 `npm install` 时，npm 将安装 `"dependencies"` 和 `"devDependencies"` 中列出的所有依赖包。

##### 添加依赖包

可以通过命令行进行添加，也可以直接编辑 `package.json` 文件中的 `"dependencies"` 或`"devDependencies"` 字段来添加。

通过命令行添加生产依赖或开发依赖：

```bash
# 添加生产依赖，默认不带参数就表示安装生产依赖
npm install <package-name>
npm install <package-name> --save-prod
npm install <package-name> -S

# 添加开发依赖
npm install <package-name> --save-dev
npm install <package-name> -D
```

通过手动编辑 `package.json` 文件来添加依赖：

```json
{
  "name": "my_package",
  "version": "1.0.0",
  "dependencies": {
    "my_dep": "^1.0.0",
    "another_dep": "~2.2.0"
  },
  "devDependencies" : {
    "my_test_framework": "^3.1.0",
    "another_dev_dep": "1.0.0 - 1.2.0"
  }
}
```

手动添加依赖包后，本地还没有安装它们，每次编辑依赖包列表后，需要执行一次 `npm install` 来进行安装。

#### 关于语义版本控制

为了保持 JavaScript 生态系统的健康、可靠和安全，每次对 npm 包进行更新时，都必须在 `package.json` 文件中更新版本号 (`version` 字段) ，并遵循[语义版本控制规范](https://semver.org/)。

遵循语义版本控制规范，有助于帮助他人了解每一次内容的变更程度，以便于依赖你的包的开发者们可以在必要时调整自己的代码。

##### 在发布包时变更版本号

推荐每一个包的初始版本始终定位 `"1.0.0"` ，并在每一次更新包时，根据内容变更程度进行语义化版本修改。

每一次发布的版本修改：

- 第一次发布，`version` 值应为 `"1.0.0"` ；
- 发布向下兼容的 bug 修复，称之为修复发布 (Patch Release) ，第三位数字加 `1` ，比如 `"1.0.1"` ；
- 发布向下兼容的新功能，称之为小版本发布 (Minor Release) ，第二位数字加 `1` ，比如 `"1.1.0"` ；
- 发布无法向下兼容的破坏性变更，称之为大版本发布 (Major Release) ，第一位数字加 `1` ，比如 `"2.0.0"` 。

##### 指定依赖包可以接受的更新类型

在你的项目中依赖其他的包时，你就可以指定能接受的更新类型：

- 接受修复发布 (Patch Release) ，依赖包的版本可以指定为 `1.0` 或 `1.0.x` 或 `~1.0.4` ；
- 接受小版本发布 (Minor Release) ，版本指定为 `1` 或 `1.x` 或 `^1.0.4` ；
- 接受大版本发布 (Major Release) ，版本指定为 `*` 或 `x` 。

比如：

```json
"dependencies": {
  "my_dep": "^1.0.0",
  "another_dep": "~2.2.0"
}
```

#### 给包添加 dist-tags

Distribution tags (dist-tags) ，叫做分发标签 ，是人类可读的标签，你可以使用它来组织和标记你发布的不同版本的包。

dist-tags 作为语义版本控制的一种补充，除了比语义版本编号更易于人类阅读之外，标签还允许发布者更有效地分发他们的包。

注意，由于 dist-tags 与语义版本共享一个命名空间，请避免与现有版本号相同的 `dist-tags` ，因此，建议避免使用以数字或字母 "v" 开头的 dist-tags 。

##### 发布带有 dist-tag 的包

默认情况下，运行 `npm publish` 将使用 `latest` 作为 dist-tag 来标记你的包。

如果想要使用另一个 dist-tag ，可以在发布时使用 `--tag` 参数：

```bash
npm publish --tag <tag>

# 比如，想要添加一个 beta 标签
npm publish --tag beta
```

##### 给某个指定版本添加 dist-tag

```bash
npm dist-tag add <package-name>@<version> [<tag>]

# 比如，要给 example-package 这个包的 1.4.0 版本加上一个 stable 标签
npm dist-tag add example-package@1.4.0 stable
```

### 更新和管理已发布的包

#### 修改包的可见性

仅作用域包的可见性支持修改，可以通过 npm 网站或者命令行来进行修改，但只能是拥有包的用户帐户或组织的所有者才能更改包的可见性。

如果你想限制你拥有的公共包的访问和可见性，您可以将包设为私有。当您将包设为私有时，其访问权限将立即更新。

使用 npm 网站修改包的可见性，在包的页面按提示操作即可。

使用命令行修改包的可见性：

```bash
# 将公开的作用域包修改为私有的
npm access restricted <package-name>

# 将私有的作用域包改为公开的
npm access public <package-name>
```

#### 给私有包添加协作者

作为具有付费用户帐户的 npm 用户，您可以添加另一个具有付费帐户的 npm 用户作为您拥有的私有包的协作者。

当你给你的包添加成员时，对方会收到一封邀请加入的电子邮件，对方必须接受邀请才能正式成为包的协作者，才能访问这个包。

邀请成员时可以通过 npm 网站在线操作，也可以使用命令行添加：

```bash
npm owner add <user> <my-package-name>
```

`<user>` 表示你想要添加的成员的 npm 用户名， `<my-package-name>` 表示为哪一个包添加成员。

#### 更新包的版本号

当修改了包的内容需要发布时，必须更新包的版本号，并且应当遵循语义化版本号 (semantic versioning) 。

注意，如果您已将 git 仓库和包连接，更新包的版本号也会将带有更新版本号的标签添加到连接的 git 仓库。

更新 `package.json` 文件的版本号，可以运行以下命令：

```bash
npm version <patch | minor | major>
```

当然，也可以手动编辑 `package.json` 文件中的 `version` 字段。

#### 弃用或取消弃用包或包版本

如果你不再想维护一个包，或者如果你想鼓励用户更新到新的或不同的版本，你可以弃用它。

弃用一个包或一个版本后，将在用户安装它时向终端打印一条已废弃的警告提示消息。

已废弃的警告消息可以写任何内容。比如，鼓励用户更新到特定版本，或替换成其他受支持的软件包。

注意，npm 虽然支持取消一个包的发布，但 npm 强烈建议使用弃用包或包版本，而不是取消发布它们，因为取消发布会从服务器中完全删除一个包，这意味着任何依赖它的人将无法再使用它，也不会收到警告提示。

##### 弃用包

弃用一个包后，这个包将不再出现在 npm 网站的搜索结果中，并且包的页面上也会显示弃用消息。

如果你的包不符合取消发布的条件，则只能使用弃用来代替取消发布，即使符合取消发布的条件，也更推荐使用弃用来代替取消发布。

可以使用 npm 网站来操作弃用，也可以通过命令行来执行弃用操作：

```bash
npm deprecate <package-name> "<message>"
```

如果你启用了两步验证，则需要在命令中添加一次性密码 `--otp=xxx` ， `xxx` 就是你的验证码。

##### 弃用包的某个版本

弃用包的某个版本之后，仅在这个包的该版本页面才会看到已废弃的提示，

可以使用 npm 网站来操作弃用，也可以通过命令行来执行弃用操作：

```bash
npm deprecate <package-name>@<version> "<message>"
```

如果你启用了两步验证，则需要在命令中添加一次性密码 `--otp=xxx` ， `xxx` 就是你的验证码。

##### 撤销弃用操作

如果要撤销对一个包或一个版本的弃用，将弃用命令的 `"<message>"` 改为空字符 `""` 然后执行即可：

```bash
# 撤销对一个包的弃用
npm deprecate <package-name> ""

# 撤销对一个版本的弃用
npm deprecate <package-name>@<version> ""
```

如果你启用了两步验证，则需要在命令中添加一次性密码 `--otp=xxx` ， `xxx` 就是你的验证码。

##### 将弃用的包转移给 npm 归档

如果你不想再维护一个包，但有其他用户依赖它，并且你想从你的用户主页中删除它，你可以将它转移到 `@npm` 官方帐户，该帐户归 npm 服务器所有。

注意，一旦转移，你将永不可再更新这个包。

要将包转移到 npm 官方帐户，请按顺序运行以下两个命令，将 `<user>` 替换为您的 npm 用户名，将 `<package-name>` 替换为您要转移的包：

```bash
# 首先添加 npm 官方账户为所有者
npm owner add npm <package-name>

# 然后将自己的用户名从包的所有者中移除
npm owner rm <user> <package-name>
```

如果你启用了两步验证，则需要在命令中添加一次性密码 `--otp=xxx` ， `xxx` 就是你的验证码。

##### 将包转移给另一个账户

就像可以将包转移给 npm 官方账户归档一样，我们还可以将包转移给另一个用户账户。

仅非作用域包才支持转移给其他用户或组织，作用域包无法转移，只能在新的作用域下重新发布。

可以使用 npm 网站来操作转移，也可以通过命令行来执行转移操作，和转移给 npm 官方账户一样，只需要将 `npm` 替换成对方账户即可：

```bash
# 首先添加对方账户为所有者
npm owner add <their-username> <package-name>

# 然后将自己的用户名从包的所有者中移除
npm owner rm <user> <package-name>
```

如果你启用了两步验证，则需要在命令中添加一次性密码 `--otp=xxx` ， `xxx` 就是你的验证码。

#### 取消发布

如果你的包没有成为其他包的依赖包，你可以使用命令行将其从 npm 服务器中永久删除。

如果是首次发布，可以在 72 小时内取消发布；超过 72 小时，如果符合特定条件，也可以取消发布。

超过 72 小时取消发布的特定条件，须同时满足：

- 在 npm 服务器上没有其他包依赖你的包；
- 上一周下载量少于 300 ；
- 这个包仅有一个拥有者/维护者

如果超过 72 小时，并且不满足条件，那就不可取消发布，以避免破坏 JavaScript 生态系统，因此你只能弃用这个包，官方也更推荐使用弃用来代替取消发布。

注意，即便是删除包的所有成员，也不会取消发布。

可以使用 npm 网站来操作取消发布，也可以通过命令行来执行取消发布操作：

```bash
# 取消发布一个包
npm unpublish <package-name> -f

# 取消发布一个版本，仅支持命令行操作
npm unpublish <package-name>@<version>
```

取消发布一个包会从服务器中永久删除该软件包，因此其他用户无法再安装该软件包。

取消发布包后，24 小时内将被禁止以相同名称重新发布。

如果你不小心取消发布了一个包，我们建议您以不同的名称再次发布，或者对于未发布的版本，增加版本号并再次发布。

常见的想要取消发布一个包的场景：

- 不小心发布了一些不想发布的内容
- 用于测试 npm 包的发布
- 想要重命名包，只能取消发布，然后发布一个新的名称

注意，因为版本号只能是唯一的，撤销了一个版本后，也无法重新发布同一个版本号，必须修改一个新版本号再重新发布，推荐将版本号更新一个小版本发布 (Minor Release) 。

### 从 npm 服务器获取包

#### 搜索 npm 包

在 npm 网站 [https://www.npmjs.com/](https://www.npmjs.com/) 的搜索栏中输入关键词进行搜索，

搜索结果可以通过几种方式进行排名，在搜索结果的左侧侧边栏可以进行选择：

- `Popularity` 按流行度排序，也就是下载量高的排在前面；
- `Quality` 按质量进行排序，质量取决于：是否有 README 文件、稳定性、测试、最新的依赖项、自定义网站（软件包官方网站）和代码复杂性等因素。
- `Maintenance` 按维护程度排序，根据开发人员对软件包的关注程度。例如，维护的频率。
- `Optimal` 按综合评定分数排序，以一定的规则将以上三个标准评定成一个分数来进行排序。

#### 将包安装到本地项目

将包安装到本地项目中，可以通过 Node.js 的 `require()` 函数来加载使用它。

安装包的命令：

```bash
# 安装一个非作用域包
npm install <package_name>

# 安装一个作用域包，如果这个包是私有的，则需要验证是否有读取权限
npm install @<scope>/<package-name>
```

默认情况下，安装包会使用 `latest` 分发标签来进行安装，默认发布时也是使用此标签。

如果要根据发布标签来安装其他版本，可以使用：

```bash
# 根据某个发布标签来进行安装
npm install <package_name>@<dist-tag>

# 在不指定 <dist-tag> 的情况下，默认为 latest
npm install <package_name>@latest
```

npm 安装一个包时：

- 如果存在 `package.json` 文件，
  - 如果依赖列表中存在该包，则会按照该包指定的版本规则，安装符合 semver 规则的最新版本；
  - 如果依赖列表中不存在该包，则会安装该包的最新版本，并将其写入依赖列表。
- 如果不存在 `package.json` 文件，则会自动创建，并安装这个包的最新版，并将其写入依赖列表；
- npm 会将包安装到 `node_modules` 目录中，如果该目录不存在，则会自动创建。

#### 全局安装包

如果你使用的是 npm 5.2 或更高版本，官方建议使用 `npx` 来全局运行包，而不需要全局安装。

全局安装包允许您将包中的代码用作本地计算机上的一组工具。

```bash
npm install -g <package_name>
```

全局安装会将包安装到计算机上，而不是本地项目中，全局安装通常需要计算机管理员权限。

#### 解决全局安装包时的 EACCES 权限错误

如果你在尝试全局安装软件包时看到 EACCES 错误，你可以：

- 使用 node 版本管理器重新安装 npm ，推荐此方式
- 或，手动更改 npm 的默认目录

使用 node 版本管理器重新安装，是避免权限问题的最佳方法。

当然，使用 npx 来代替全局安装也是更推荐的办法。

#### 更新本地安装的包

更新项目本地包和全局包有助于保持代码和工具稳定、可用和安全。

建议定期更新您的项目所依赖的本地包，以便于及时获取你所依赖的包的更新或修复。

在项目根目录执行更新命令：

```bash
# 查看当前项目哪些包有更新
npm outdated

# 更新当前项目所有依赖包
npm update

```

全局包的更新：

```bash
# 查看哪些全局包有更新
npm outdated -g --depth=0

# 更新所有全局包
npm update -g

# 更新某一个全局包
npm update -g <package_name>
```

#### 在项目中使用 npm 包

当你在 `node_modules` 中安装了一个包后，你就可以在你的代码中使用它。

在 Node.js 中使用时，可以使用 `require()` 函数来加载已安装的包，比如：

```js
const lodash = require('lodash')
```

如果项目运行时看到报错 `Cannot find module 'xxx'` ，那说明 `xxx` 包没有被正确解析到，你可以查看是否忘了安装它。

#### 使用已废弃的包

如果使用一个包时看到已废弃的警告提示，那说明作者已经放弃维护这个包，这意味着，这个包不会再有任何更新、修复等，但你也可以继续使用已发布的任意版本。

#### 卸载包

##### 卸载项目本地包

如果在你的项目中，你不再需要某一个包，那建议你卸载已安装的包，并且将它从 `package.json` 文件的依赖列表中移除它。

```bash
# 卸载某个包，并将其从 `package.json` 文件的依赖列表中移除
npm uninstall <package_name>

# 卸载作用域包
npm uninstall <@scope/package_name>
```

此外，如果你还有 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，npm 也会更新这些文件。

实际上，上面的卸载命令在没有加参数时，默认会使用 `--save` (简写 `-S`) 来作为参数，表示卸载时需要同时更新 `package-lock.json` 等文件。

```bash
# npm uninstall <package_name> 相当于
npm uninstall <package_name> --save

# 也相当于
npm uninstall <package_name> --S
```

如果想让 npm 在卸载时不要更新 `package.json` , `npm-shrinkwrap.json` , `package-lock.json` 文件，可以使用 `--no-save` 参数。

```bash
npm uninstall <package_name> --no-save
```

但通常都不会这样操作，当你要从 `node_modules` 中卸载时，通常表示你这个项目已经不再需要这个包，那么也应该将其从 `package-lock.json` 文件的依赖列表中移除。

##### 卸载全局包

在卸载命令上加上 -g 参数，即可卸载全局包

```bash
# 卸载一个全局包
npm uninstall -g <package_name>

# 卸载全局作用域包
npm uninstall -g <@scope/package_name>
```
