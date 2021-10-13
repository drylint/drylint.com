(window.webpackJsonp=window.webpackJsonp||[]).push([[135],{340:function(s,t,e){"use strict";e.r(t);var n=e(6),a=Object(n.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"webpack-之-require-context-函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webpack-之-require-context-函数"}},[s._v("#")]),s._v(" Webpack 之 "),e("code",[s._v("require.context()")]),s._v(" 函数")]),s._v(" "),e("h2",{attrs:{id:"require-context-函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#require-context-函数"}},[s._v("#")]),s._v(" "),e("code",[s._v("require.context()")]),s._v(" 函数")]),s._v(" "),e("p",[s._v("可以使用 "),e("code",[s._v("require.context()")]),s._v(" 函数创建自己的上下文，Webpack 在构建时会解析代码中的 "),e("code",[s._v("require.context()")]),s._v(" 。")]),s._v(" "),e("p",[s._v("用于加载一个目录中的所有文件或过滤部分文件。")]),s._v(" "),e("p",[s._v("语法：")]),s._v(" "),e("div",{staticClass:"language-ts line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 方法执行后，返回一个 context 函数，同时它也是一个对象")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" context "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("context")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  directory"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 必填，一个目录路径，用于创建上下文环境")]),s._v("\n  includeSubdirs"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("boolean")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可选，是否包含子目录，默认值为 true")]),s._v("\n  filter"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" RegExp "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^\\.\\/.*$")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可选，过滤结果的正则表达式，默认值为 /^\\.\\/.*$/ 表示所有文件")]),s._v("\n  mode"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("?")]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("string")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sync'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可选, 加载模式，可选值为 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', 默认值为 'sync'")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])]),e("p",[s._v("其中， "),e("code",[s._v("mode")]),s._v(" 参数的可选值：")]),s._v(" "),e("ul",[e("li",[e("code",[s._v("'sync'")]),s._v(" 直接打包到当前文件，同步加载并执行")]),s._v(" "),e("li",[e("code",[s._v("'lazy'")]),s._v(" ，为每个导入的模块生成一个单独的可延迟加载（lazy-loadable）的 chunk ，模块将被异步加载。")]),s._v(" "),e("li",[e("code",[s._v("'lazy-once'")]),s._v(" 为所有的 "),e("code",[s._v("import()")]),s._v(" 只生成一个满足所有的延迟加载模块，第一个 "),e("code",[s._v("import()")]),s._v(" 语句加载这个模块后，之后的 "),e("code",[s._v("import()")]),s._v(" 语句就只需在内存中读取了。")]),s._v(" "),e("li",[e("code",[s._v("'eager'")]),s._v(" 不会分离出单独的 chunk ，有的模块都被当前的 chunk 引入，并且没有额外的网络请求。但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，只有访问了这个 Promise 才会执行代码，相当于先加载代码，但暂不执行这部分代码。")]),s._v(" "),e("li",[e("code",[s._v("'weak'")]),s._v("，尝试加载模块，如果该模块函数已经以其他方式加载，（即另一个 chunk 导入过此模块，或包含模块的脚本被加载）。仍会返回 Promise， 但是只有在客户端上已经有该 chunk 时才会成功解析。如果该模块不可用，则返回 rejected 状态的 Promise，且网络请求永远都不会执行。当需要的 chunks 始终在（嵌入在页面中的）初始请求中手动提供，而不是在应用程序导航在最初没有提供的模块导入的情况下触发，这对于通用渲染（SSR）是非常有用的。")])]),s._v(" "),e("p",[s._v("webpack 的 "),e("code",[s._v("import()")]),s._v(" 文档中描述了所有可用模式及其行为的完整列表。")]),s._v(" "),e("p",[s._v("注意，传递给 "),e("code",[s._v("require.context()")]),s._v(" 的参数必须是字面量形式的。")]),s._v(" "),e("p",[s._v("示例：")]),s._v(" "),e("div",{staticClass:"language-ts line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在 test 目录中加载模块，不包含子目录，只加载所有文件名以 .test.js 结尾的模块")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("context")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./test'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\.test\\.js$")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在父目录中加载模块，包含子目录，只加载所有文件名以 .stories.js 结尾的模块")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("context")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'../'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\.stories\\.js$")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("h2",{attrs:{id:"require-context-返回的-context-函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#require-context-返回的-context-函数"}},[s._v("#")]),s._v(" "),e("code",[s._v("require.context()")]),s._v(" 返回的 "),e("code",[s._v("context")]),s._v(" 函数")]),s._v(" "),e("p",[e("code",[s._v("require.context()")]),s._v(" 返回的 "),e("code",[s._v("context")]),s._v(" 是一个函数，同时也是一个对象，它有三个属性，分别是 "),e("code",[s._v("resolve")]),s._v(", "),e("code",[s._v("keys")]),s._v(", "),e("code",[s._v("id")]),s._v(" 。")]),s._v(" "),e("ul",[e("li",[e("code",[s._v("context.keys")]),s._v(" 是一个函数，返回匹配到的所有模块路径字符串组成的数组，如 "),e("code",[s._v("['./a.js', './b.js']")]),s._v(" ，将返回数组的任一元素传回给 "),e("code",[s._v("context()")]),s._v(" 则可以得到这个文件的 ES Module ，访问这个 ES Module 的 "),e("code",[s._v("default")]),s._v(" 就可以访问模块的默认导出。其他命名导出也按对应方法访问。")]),s._v(" "),e("li",[e("code",[s._v("context.resolve")]),s._v(" 也是一个函数，返回解析后得到的模块 id 。传入 "),e("code",[s._v("context.keys()")]),s._v(" 返回的某个文件的 key ，可以得到这个文件相对于项目启动目录的一个相对路径。")]),s._v(" "),e("li",[e("code",[s._v("context.id")]),s._v(" 是上下文模块的模块 id 。这可能对 "),e("code",[s._v("module.hot.accept")]),s._v(" 有用。")])]),s._v(" "),e("p",[s._v("在浏览器查看一下 context 函数及属性是什么样的：")]),s._v(" "),e("div",{staticClass:"language-ts line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 调用 require.context()")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" context "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("require")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("context")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token regex"}},[e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("^\\.\\/Base[A-Z][^/]*$")]),e("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),e("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("u")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n\nƒ webpackContext(req) {\n  var id = webpackContextResolve(req);\n  return __webpack_require__(id);\n}\n\n*/")]),s._v("\n\n\n"),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("id"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n\n./src/components sync recursive ^\\.\\/Base[A-Z](?:(?!\\/)[\\s\\S])*$\n\n*/")]),s._v("\n\n\n"),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("keys"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n\nƒ webpackContextKeys() {\n  return Object.keys(map);\n}\n*/")]),s._v("\n\n"),e("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("console")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("context"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("resolve"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n\nƒ webpackContextResolve(req) {\n  if(!__webpack_require__.o(map, req)) {\n    var e = new Error(\"Cannot find module '\" + req + \"'\");\n    e.code = 'MODULE_NOT_FOUND';\n    throw e;\n  }\n  return map[req];\n}\n\n*/")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br"),e("span",{staticClass:"line-number"},[s._v("29")]),e("br"),e("span",{staticClass:"line-number"},[s._v("30")]),e("br"),e("span",{staticClass:"line-number"},[s._v("31")]),e("br"),e("span",{staticClass:"line-number"},[s._v("32")]),e("br"),e("span",{staticClass:"line-number"},[s._v("33")]),e("br"),e("span",{staticClass:"line-number"},[s._v("34")]),e("br"),e("span",{staticClass:"line-number"},[s._v("35")]),e("br"),e("span",{staticClass:"line-number"},[s._v("36")]),e("br"),e("span",{staticClass:"line-number"},[s._v("37")]),e("br"),e("span",{staticClass:"line-number"},[s._v("38")]),e("br"),e("span",{staticClass:"line-number"},[s._v("39")]),e("br"),e("span",{staticClass:"line-number"},[s._v("40")]),e("br"),e("span",{staticClass:"line-number"},[s._v("41")]),e("br"),e("span",{staticClass:"line-number"},[s._v("42")]),e("br"),e("span",{staticClass:"line-number"},[s._v("43")]),e("br")])]),e("p",[s._v("相关文章：")]),s._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://juejin.cn/post/6844903895999709198",target:"_blank",rel:"noopener noreferrer"}},[s._v("深入理解webpack的require.context"),e("OutboundLink")],1),s._v(" ，require.context 源码解析。")])])])}),[],!1,null,null,null);t.default=a.exports}}]);