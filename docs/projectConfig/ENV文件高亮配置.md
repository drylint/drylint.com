# VS Code 中任意名称的 ENV 文件语法高亮配置

## 安装 DotENV 插件

在 VS Code 插件中心搜索 `DotENV` 插件安装。

安装后，插件会默认支持一些 ENV 文件的高亮：

```json
"extensions": [
    ".flaskenv",
    ".env",
    ".env-sample",
    ".env.example",
    ".env.local",
    ".env.dev",
    ".env.dev.local",
    ".env.build",
    ".env.build.local",
    ".env.development",
    ".env.development.local",
    ".env.test",
    ".env.test.local",
    ".env.testing",
    ".env.qa",
    ".env.qa.local",
    ".env.uat",
    ".env.uat.local",
    ".env.stag",
    ".env.stag.local",
    ".env.stage",
    ".env.stage.local",
    ".env.staging",
    ".env.staging.local",
    ".env.live",
    ".env.live.local",
    ".env.production",
    ".env.production.local",
    ".env.prod",
    ".env.prod.local"
]
```

如果定义的 ENV 文件属于上述列表其中一个，则会有语法高亮显示，比如 `.env.development`, `.env.production` 等等。

但是，如果想要自定义一些其他 ENV 文件名称，比如 `.env.library` ，默认情况下，这个文件内的语法是没有高亮显示的。

这就需要更改一些配置来让插件将这样的自定义文件进行语法高亮显示。

## 支持自定义 ENV 文件语法高亮

例如，在项目根目录创建 `.env.library` 文件，并写入：

```dotenv
NODE_ENV = 'production'
```

默认情况下是没有语法高亮显示的。因为，VS Code 将这个文件当做了纯文本文件（Plain Text），打开此文件后，可以看到 VS Code 底部状态栏中，有 `Plain Text` 的文字显示。

要让这些被识别为纯文本文件的 ENV 文件语法高亮，有以下几种方式：

### 临时支持

打开 ENV 文件， 比如 `.env.library`，点击 VS Code 底部状态栏中显示的 `Plain Text` ，会弹出选择语言模式(Select Language Mode)的下拉框，在下拉框中找到 `Environment Variables(dotenv)` 选项，点击选中即可看到状态栏文字由 `Plain Text` 变成了 `Environment Variables` ，再看到 ENV 文件中的语法已经有了高亮显示。

我们选择的 `Environment Variables(dotenv)` 选项，其实就是安装的 DotENV 插件在 VS Code 中扩展增加了一种语言，选中这个选项就是告诉 VS Code 这个文件是用这种语言编写的。

### 长久支持

长久支持就是要修改 VS Code 的配置，其中又分为两种：

- 将配置写入到电脑用户的 VS Code 配置 `settings.json` 中，这样和项目没有关系，此种模式可以加上 `Settings Sync` 同步之后，在多台电脑上同步生效。
- 将配置写入到项目下，也就是 `project/.vscode/settings.json` 中，注意，此种模式仅支持在**单项目工作区**下生效，如果一个工作区内添加了多个项目，则这些项目下的此项配置是不生效的。

接下来看看以上两种配置都是在 `settings.json` 中写入了什么内容：

```json
  "files.associations": {
    "*.env.*": "dotenv",
    // ... 其他配置
  },
```

先解释下配置的意思，首先，`files.associations` 是 VS Code 的配置项，用来配置文件名和编程语言的关联，`key` 是要匹配的文件名，`value` 是要关联的编程语言，`"*.env.*": "dotenv",` 就是告诉 VS Code ，所有匹配 `*.env.*` 的文件，都是使用的 `dotenv` 语言编写的，而这个 `dotenv` 语言就是安装的 VS Code 插件 DotENV 插件添加的。所以，我们的示例文件 `.env.library` 就可以被识别，从而添加语法高亮。

（完）
