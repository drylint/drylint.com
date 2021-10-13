(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{249:function(s,n,a){"use strict";a.r(n);var t=a(6),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"sass编译方式及工程化使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sass编译方式及工程化使用"}},[s._v("#")]),s._v(" Sass编译方式及工程化使用")]),s._v(" "),a("p",[s._v("Sass 编译有两种工具，一种是 "),a("code",[s._v("Dart Sass")]),s._v(" ，一种是 "),a("code",[s._v("LibSass")]),s._v(" ，而这两种编译工具又分别对应两个 JavaScript 版本的 npm 包。")]),s._v(" "),a("p",[a("code",[s._v("Dart Sass")]),s._v(" 发布成了纯 javascript 的 npm 包 "),a("code",[s._v("sass")]),s._v("，而 "),a("code",[s._v("LibSass")]),s._v(" 是作为 npm 包 "),a("code",[s._v("node-sass")]),s._v(" 的本地扩展发布的。")]),s._v(" "),a("p",[s._v("他们对应的 npm 包安装：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -D sass\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -D node-sass\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("虽然实现方式不一样，但是他们暴露出的 javascript API 是完全一致的。也就是说，无论使用哪一种，我们都可以完成一个将 Sass 编译成 css 代码的 javascript 模块，在这个模块中，不管引用 "),a("code",[s._v("sass")]),s._v(" 还是 "),a("code",[s._v("node-sass")]),s._v("，都可以使用完全一样的 API 来编写。")]),s._v(" "),a("p",[s._v("比如，在现在使用广泛的通过 webpack 构建的项目中，通常会安装一个名叫 "),a("code",[s._v("sass-loader")]),s._v(" 的 npm 包来编译 Sass 代码，这个 "),a("code",[s._v("sass-loader")]),s._v(" 就是使用了 Sass 暴露的 javascript API 来完成编译的，它可以依赖 "),a("code",[s._v("sass")]),s._v(" 包，也可以依赖 "),a("code",[s._v("node-sass")]),s._v(" 包。")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("sass-loader")]),s._v(" 模块源码中有如下代码：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("getDefaultSassImplementation")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" sassImplPkg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sass"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    require"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sass"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("catch")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("error"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("try")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      require"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node-sass"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n      sassImplPkg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"node-sass"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("catch")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ignoreError"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      sassImplPkg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sass"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("sassImplPkg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("p",[s._v("从上面的代码中可以看出，"),a("code",[s._v("sass-loader")]),s._v(" 默认引用的 Sass 实现包是 "),a("code",[s._v("sass")]),s._v(" 这个包，如果 检测到 "),a("code",[s._v("sass")]),s._v(" 包不存在，再尝试引用 "),a("code",[s._v("node-sass")]),s._v(" 包，如果也没有的话，则还是依赖 "),a("code",[s._v("sass")]),s._v(" ，这时候就会抛出错误 "),a("code",[s._v("Cannot find module 'sass'")]),s._v(" 告诉用户没有找到这个包，用户就需要安装这个依赖包。")]),s._v(" "),a("p",[s._v("注意，目前，官方已经准备废弃 "),a("code",[s._v("LibSass")]),s._v(" 及 "),a("code",[s._v("node-sass")]),s._v(" ，所以，应该使用 "),a("code",[s._v("sass")]),s._v(" 包来编译 Sass 代码。")]),s._v(" "),a("p",[s._v("如果需要自己编写一个 javascript 模块来处理 sass 代码，在这里可以看到怎么使用暴露出的 API "),a("a",{attrs:{href:"https://sass-lang.com/documentation/js-api",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://sass-lang.com/documentation/js-api"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"sass-命令行编译"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sass-命令行编译"}},[s._v("#")]),s._v(" Sass 命令行编译")]),s._v(" "),a("p",[s._v("可以通过命令行编译 Sass 代码，但是系统是没有这个功能的，那就需要我们自己安装。")]),s._v(" "),a("p",[s._v("其实，上文提到的 "),a("code",[s._v("sass")]),s._v(" 包是可以全局安装的，安装之后就可以在命令行使用 "),a("code",[s._v("sass")]),s._v(" 命令了。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -g sass\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"基本编译命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基本编译命令"}},[s._v("#")]),s._v(" 基本编译命令")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 基本语法，输入文件和输出文件都表示文件相对或绝对路径")]),s._v("\nsass 输入文件 输出文件\nsass 输入文件:输出文件\nsass 输入文件1:输出文件1 输入文件2:输出文件2 输入文件3:输出文件3\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将当前目录的 index.scss 文件编译成 index.css 并放到当前目录")]),s._v("\nsass index.scss index.css\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 也可以写成：")]),s._v("\nsass index.scss:index.css\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 同时处理多个文件，使用空格分隔")]),s._v("\nsass index.scss:index.css index1.scss:index1.css\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 处理目录，将 styles 目录全部 sass/scss 编译到 public/css 目录中")]),s._v("\nsass styles:public/css\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br")])]),a("h3",{attrs:{id:"命令行选项"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#命令行选项"}},[s._v("#")]),s._v(" 命令行选项")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看当前 sass 版本")]),s._v("\nsass --version\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看帮助")]),s._v("\nsass --help\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从标准输入读取输入文件，此时不能手动指定输入文件，只能指定输出文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 处理多文件时不能使用此选项")]),s._v("\nsass --stdin index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 强制使用缩进语法去解析输入文件，不管是 sass 还是 scss")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 在输入文件来自标准输入时非常有用，因此它的语法无法自动确定是 sass 还是 scss。")]),s._v("\nsass -–indented\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 强制不使用缩进语法去解析输入文件，，不管是 sass 还是 scss")]),s._v("\nsass -–no-indented\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定文件加载路径，避免输入文件携带太长的路径")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可以多次传递该选项，前面的路径优先于后面的路径")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 简写 -I")]),s._v("\nsass --load-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("src/styles index.scss:public/index.css\nsass -I"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("src/styles index.scss:public/index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 控制输出文件的风格， expanded （默认）展开代码， compressed 压缩代码为一行")]),s._v("\nsass --style"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("compressed index.scss:index.css\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# --style 简写为 -s")]),s._v("\nsass -s"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("compressed index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 使用 --charset 后，强制在开头加上 @charset 标记")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认情况下，如果出现了非 ASCII 字符，Sass 自动在开头加上 @charset 标记")]),s._v("\nsass --charset index.scss:index.css\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# --no-charset 无论如何都不添加 @charset 标记")]),s._v("\nsass --no-charset index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 强制在编译错误时，生成错误信息到 css 注释 和 body::before 的 content 中")]),s._v("\nsass --error-css index.scss:index.css\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 禁用生成错误信息")]),s._v("\nsass --no-error-css index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 每次执行命令，都会去检查输入文件和输出文件的状态：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 当输入文件的最后修改时间晚于输出文件的时间时，才会去重新编译")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果执行了编译，会在终端打印消息，否则没有任何操作。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 和 --watch 的区别，--update 执行后便退出，--watch 持续监测输入文件变化")]),s._v("\nsass --update themes:public/css\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Dart Sass 默认为它发出的每个CSS文件生成源码映射文件（source map）。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 不允许生成 source map 文件")]),s._v("\nsass --no-source-map index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 指定生成的 source map 文件和 sass 源文件的位置关系")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# relative 默认，生成相对路径，absolute 生成绝对路径")]),s._v("\nsass --source-map-urls"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("relative index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将 source map 文件嵌入到生成的 css 代码中，css 文件体积会很大")]),s._v("\nsass --embed-sources index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 开启监听模式，运行后终端保持运行，监听到文件变更立即重新编译")]),s._v("\nsass --watch index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# --poll 只能和 --watch 一起使用")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 让 Sass 时不时地手动检查源文件更改，而不是依赖于操作系统在更改时通知它。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果在操作系统通知系统无法工作的远程驱动器上编辑 Sass，这可能是必要的。")]),s._v("\nsass --watch --poll index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 遇到错误时立即停止编译")]),s._v("\nsass --stop-on-error index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# sass 交互对话，执行后可以在命令行输入 sass 代码然后编译")]),s._v("\nsass --interactive\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 简写 -i")]),s._v("\nsass -i\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 简写 -c ，终端使用有颜色的信息")]),s._v("\nsass --color index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认，为这些消息发出非 ASCII 字符。这个标志不会影响CSS输出。")]),s._v("\nsass --unicode index.scss:index.css\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 只将 ASCII 字符作为错误消息的一部分发送到终端。")]),s._v("\nsass --no-unicode index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 静默终端，不显示 @warn 及 @debug 的信息，默认情况下，使用了废弃的功能会有警告信息")]),s._v("\nsass –quiet index.scss:index.css\n\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 遇到错误时打印完整的Dart或JavaScript堆栈跟踪。Sass团队使用它来调试错误。")]),s._v("\nsass --trace index.scss:index.css\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br"),a("span",{staticClass:"line-number"},[s._v("78")]),a("br"),a("span",{staticClass:"line-number"},[s._v("79")]),a("br"),a("span",{staticClass:"line-number"},[s._v("80")]),a("br"),a("span",{staticClass:"line-number"},[s._v("81")]),a("br"),a("span",{staticClass:"line-number"},[s._v("82")]),a("br"),a("span",{staticClass:"line-number"},[s._v("83")]),a("br"),a("span",{staticClass:"line-number"},[s._v("84")]),a("br"),a("span",{staticClass:"line-number"},[s._v("85")]),a("br"),a("span",{staticClass:"line-number"},[s._v("86")]),a("br"),a("span",{staticClass:"line-number"},[s._v("87")]),a("br"),a("span",{staticClass:"line-number"},[s._v("88")]),a("br"),a("span",{staticClass:"line-number"},[s._v("89")]),a("br"),a("span",{staticClass:"line-number"},[s._v("90")]),a("br"),a("span",{staticClass:"line-number"},[s._v("91")]),a("br"),a("span",{staticClass:"line-number"},[s._v("92")]),a("br"),a("span",{staticClass:"line-number"},[s._v("93")]),a("br"),a("span",{staticClass:"line-number"},[s._v("94")]),a("br"),a("span",{staticClass:"line-number"},[s._v("95")]),a("br"),a("span",{staticClass:"line-number"},[s._v("96")]),a("br"),a("span",{staticClass:"line-number"},[s._v("97")]),a("br"),a("span",{staticClass:"line-number"},[s._v("98")]),a("br"),a("span",{staticClass:"line-number"},[s._v("99")]),a("br"),a("span",{staticClass:"line-number"},[s._v("100")]),a("br"),a("span",{staticClass:"line-number"},[s._v("101")]),a("br"),a("span",{staticClass:"line-number"},[s._v("102")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);