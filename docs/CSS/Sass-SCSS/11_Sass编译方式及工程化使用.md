# Sass编译方式及工程化使用

Sass 编译有两种工具，一种是 `Dart Sass` ，一种是 `LibSass` ，而这两种编译工具又分别对应两个 JavaScript 版本的 npm 包。

`Dart Sass` 发布成了纯 javascript 的 npm 包 `sass`，而 `LibSass` 是作为 npm 包 `node-sass` 的本地扩展发布的。

他们对应的 npm 包安装：

```bash
npm install -D sass
npm install -D node-sass
```

虽然实现方式不一样，但是他们暴露出的 javascript API 是完全一致的。也就是说，无论使用哪一种，我们都可以完成一个将 Sass 编译成 css 代码的 javascript 模块，在这个模块中，不管引用 `sass` 还是 `node-sass`，都可以使用完全一样的 API 来编写。

比如，在现在使用广泛的通过 webpack 构建的项目中，通常会安装一个名叫 `sass-loader` 的 npm 包来编译 Sass 代码，这个 `sass-loader` 就是使用了 Sass 暴露的 javascript API 来完成编译的，它可以依赖 `sass` 包，也可以依赖 `node-sass` 包。

在 `sass-loader` 模块源码中有如下代码：

```js
function getDefaultSassImplementation() {
  let sassImplPkg = "sass";

  try {
    require.resolve("sass");
  } catch (error) {
    try {
      require.resolve("node-sass");

      sassImplPkg = "node-sass";
    } catch (ignoreError) {
      sassImplPkg = "sass";
    }
  }
  return require(sassImplPkg);
}
```

从上面的代码中可以看出，`sass-loader` 默认引用的 Sass 实现包是 `sass` 这个包，如果 检测到 `sass` 包不存在，再尝试引用 `node-sass` 包，如果也没有的话，则还是依赖 `sass` ，这时候就会抛出错误 `Cannot find module 'sass'` 告诉用户没有找到这个包，用户就需要安装这个依赖包。

注意，目前，官方已经准备废弃 `LibSass` 及 `node-sass` ，所以，应该使用 `sass` 包来编译 Sass 代码。

如果需要自己编写一个 javascript 模块来处理 sass 代码，在这里可以看到怎么使用暴露出的 API [https://sass-lang.com/documentation/js-api](https://sass-lang.com/documentation/js-api)

## Sass 命令行编译

可以通过命令行编译 Sass 代码，但是系统是没有这个功能的，那就需要我们自己安装。

其实，上文提到的 `sass` 包是可以全局安装的，安装之后就可以在命令行使用 `sass` 命令了。

```bash
npm install -g sass
```

### 基本编译命令

```bash
# 基本语法，输入文件和输出文件都表示文件相对或绝对路径
sass 输入文件 输出文件
sass 输入文件:输出文件
sass 输入文件1:输出文件1 输入文件2:输出文件2 输入文件3:输出文件3

# 将当前目录的 index.scss 文件编译成 index.css 并放到当前目录
sass index.scss index.css

# 也可以写成：
sass index.scss:index.css

# 同时处理多个文件，使用空格分隔
sass index.scss:index.css index1.scss:index1.css

# 处理目录，将 styles 目录全部 sass/scss 编译到 public/css 目录中
sass styles:public/css
```

### 命令行选项

```bash
# 查看当前 sass 版本
sass --version


# 查看帮助
sass --help


# 从标准输入读取输入文件，此时不能手动指定输入文件，只能指定输出文件
# 处理多文件时不能使用此选项
sass --stdin index.css


# 强制使用缩进语法去解析输入文件，不管是 sass 还是 scss
# 在输入文件来自标准输入时非常有用，因此它的语法无法自动确定是 sass 还是 scss。
sass -–indented
# 强制不使用缩进语法去解析输入文件，，不管是 sass 还是 scss
sass -–no-indented


# 指定文件加载路径，避免输入文件携带太长的路径
# 可以多次传递该选项，前面的路径优先于后面的路径
# 简写 -I
sass --load-path=src/styles index.scss:public/index.css
sass -I=src/styles index.scss:public/index.css


# 控制输出文件的风格， expanded （默认）展开代码， compressed 压缩代码为一行
sass --style=compressed index.scss:index.css
# --style 简写为 -s
sass -s=compressed index.scss:index.css


# 使用 --charset 后，强制在开头加上 @charset 标记
# 默认情况下，如果出现了非 ASCII 字符，Sass 自动在开头加上 @charset 标记
sass --charset index.scss:index.css
# --no-charset 无论如何都不添加 @charset 标记
sass --no-charset index.scss:index.css


# 强制在编译错误时，生成错误信息到 css 注释 和 body::before 的 content 中
sass --error-css index.scss:index.css
# 禁用生成错误信息
sass --no-error-css index.scss:index.css


# 每次执行命令，都会去检查输入文件和输出文件的状态：
# 当输入文件的最后修改时间晚于输出文件的时间时，才会去重新编译
# 如果执行了编译，会在终端打印消息，否则没有任何操作。
# 和 --watch 的区别，--update 执行后便退出，--watch 持续监测输入文件变化
sass --update themes:public/css

# Dart Sass 默认为它发出的每个CSS文件生成源码映射文件（source map）。
# 不允许生成 source map 文件
sass --no-source-map index.scss:index.css


# 指定生成的 source map 文件和 sass 源文件的位置关系
# relative 默认，生成相对路径，absolute 生成绝对路径
sass --source-map-urls=relative index.scss:index.css


# 将 source map 文件嵌入到生成的 css 代码中，css 文件体积会很大
sass --embed-sources index.scss:index.css


# 开启监听模式，运行后终端保持运行，监听到文件变更立即重新编译
sass --watch index.scss:index.css


# --poll 只能和 --watch 一起使用
# 让 Sass 时不时地手动检查源文件更改，而不是依赖于操作系统在更改时通知它。
# 如果在操作系统通知系统无法工作的远程驱动器上编辑 Sass，这可能是必要的。
sass --watch --poll index.scss:index.css


# 遇到错误时立即停止编译
sass --stop-on-error index.scss:index.css


# sass 交互对话，执行后可以在命令行输入 sass 代码然后编译
sass --interactive
# 简写 -i
sass -i


# 简写 -c ，终端使用有颜色的信息
sass --color index.scss:index.css


# 默认，为这些消息发出非 ASCII 字符。这个标志不会影响CSS输出。
sass --unicode index.scss:index.css
# 只将 ASCII 字符作为错误消息的一部分发送到终端。
sass --no-unicode index.scss:index.css


# 静默终端，不显示 @warn 及 @debug 的信息，默认情况下，使用了废弃的功能会有警告信息
sass –quiet index.scss:index.css


# 遇到错误时打印完整的Dart或JavaScript堆栈跟踪。Sass团队使用它来调试错误。
sass --trace index.scss:index.css
```
