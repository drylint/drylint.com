(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{286:function(s,t,a){"use strict";a.r(t);var n=a(6),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#一、语法"}},[s._v("一、语法")])]),a("li",[a("a",{attrs:{href:"#regexp-属性"}},[s._v("RegExp 属性")]),a("ul",[a("li",[a("a",{attrs:{href:"#_1-静态属性"}},[s._v("1. 静态属性")])]),a("li",[a("a",{attrs:{href:"#_2-实例属性"}},[s._v("2. 实例属性")])])])]),a("li",[a("a",{attrs:{href:"#regexp-方法"}},[s._v("RegExp 方法")]),a("ul",[a("li",[a("a",{attrs:{href:"#_1-静态方法"}},[s._v("1. 静态方法")])]),a("li",[a("a",{attrs:{href:"#_2-实例方法"}},[s._v("2. 实例方法")]),a("ul",[a("li",[a("a",{attrs:{href:"#regexp-prototype-exec-str"}},[s._v("RegExp.prototype.exec(str)")])]),a("li",[a("a",{attrs:{href:"#regexp-prototype-test-str"}},[s._v("RegExp.prototype.test(str)")])]),a("li",[a("a",{attrs:{href:"#全局匹配修饰符-g-的影响"}},[s._v("全局匹配修饰符 g 的影响")])])])])])])])]),a("p"),s._v(" "),a("h1",{attrs:{id:"regexp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regexp"}},[s._v("#")]),s._v(" RegExp")]),s._v(" "),a("h2",{attrs:{id:"一、语法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、语法"}},[s._v("#")]),s._v(" 一、语法")]),s._v(" "),a("p",[s._v("字面量, 构造函数和工厂符号都可以定义一个正则对象：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("pattern"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("flags "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 字面量")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pattern "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" flags"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 构造函数")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("pattern "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" flags"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 工厂符号")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("ul",[a("li",[a("code",[s._v("pattern")]),s._v(" 正则表达式的文本。")]),s._v(" "),a("li",[a("code",[s._v("flags")]),s._v(" 匹配的修饰符，以下值可任意组合。\n"),a("ul",[a("li",[a("code",[s._v("g")]),s._v(" 全局匹配，找到所有匹配，而不是在第一个匹配后停止。")]),s._v(" "),a("li",[a("code",[s._v("i")]),s._v(" 忽略大小写")]),s._v(" "),a("li",[a("code",[s._v("m")]),s._v(" 多行，将开始和结束字符（^和$）视为在多行上工作（也就是，分别匹配每一行的开始和结束（由 \\n 或 \\r 分割），而不只是只匹配整个输入字符串的最开始和最末尾处。")]),s._v(" "),a("li",[a("code",[s._v("u")]),s._v(" Unicode，将模式视为Unicode序列点的序列")]),s._v(" "),a("li",[a("code",[s._v("y")]),s._v(" 粘性匹配，仅匹配目标字符串中此正则表达式的lastIndex属性指示的索引(并且不尝试从任何后续的索引匹配)。")]),s._v(" "),a("li",[a("code",[s._v("s")]),s._v(" dotAll模式，匹配任何字符（包括终止符 '\\n'）。")])])])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("ab+c")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("i")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 等同于")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ab+c'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'i'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 等同于")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("ab+c")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'i'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 "),a("code",[s._v("\\")]),s._v(" ）。比如，以下是等价的：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" re "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"\\\\w+"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 等同于")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" re "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("\\w+")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h2",{attrs:{id:"regexp-属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regexp-属性"}},[s._v("#")]),s._v(" RegExp 属性")]),s._v(" "),a("h3",{attrs:{id:"_1-静态属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-静态属性"}},[s._v("#")]),s._v(" 1. 静态属性")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("RegExp.prototype")]),s._v(" 允许为所有正则对象添加属性。")]),s._v(" "),a("li",[a("code",[s._v("RegExp.length")]),s._v(" RegExp.length 值为 2。")])]),s._v(" "),a("h3",{attrs:{id:"_2-实例属性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-实例属性"}},[s._v("#")]),s._v(" 2. 实例属性")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("dotAll "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// 是否使用 "s" 修饰符，特殊字符"."应另外匹配 \\n \\r 行分隔 段分隔')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("flags "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回一个字符串，表示已经启用的修饰符，比如 'gi'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("global "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否使用 g 修饰符开启全局匹配。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ignoreCase "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否使用 i 修饰符忽略大小写。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 可读可写，整数，获取/设置下一次匹配的起始索引。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("multiline "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  是否使用 m 修饰符表示多行匹配。（影响 ^ 和 $ 的行为）。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("source "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回正则的源文本字符串，不包含两边的斜杠以及修饰符。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("sticky "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// // 是否使用 i 修饰符开启粘滞匹配。从 lastIndex 下标处开始匹配。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("unicode "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否使用了 u 修饰符，使用后任何 Unicode 代码点的转义都会被解释。")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("h2",{attrs:{id:"regexp-方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regexp-方法"}},[s._v("#")]),s._v(" RegExp 方法")]),s._v(" "),a("h3",{attrs:{id:"_1-静态方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-静态方法"}},[s._v("#")]),s._v(" 1. 静态方法")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("无（继承的除外）\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_2-实例方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-实例方法"}},[s._v("#")]),s._v(" 2. 实例方法")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 在字符串参数中执行匹配。返回一个数组或 null。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 判断正则表达式与指定的字符串参数是否匹配。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回一个表示该正则表达式的字符串。")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 已废弃，被用于在脚本执行过程中（重新）编译正则表达式。与RegExp构造函数基本一样。")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("compile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 非标准，不建议使用")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RegExp")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("prototype"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("toSource")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 返回一个字符串,代表当前对象的源代码")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("h4",{attrs:{id:"regexp-prototype-exec-str"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regexp-prototype-exec-str"}},[s._v("#")]),s._v(" RegExp.prototype.exec(str)")]),s._v(" "),a("p",[s._v("在指定的字符串参数中进行匹配，有匹配成功返回数组，否则返回 "),a("code",[s._v("null")]),s._v("。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a1b22c333d444'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("([a-z])(\\d)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// ["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("返回的匹配结果数组中，下标 "),a("code",[s._v("0")]),s._v(" 元素表示匹配到的字符串，若正则中有分组，则每一个分组的匹配字符串会从下标 "),a("code",[s._v("1")]),s._v(" 开始罗列出来。 "),a("code",[s._v("index")]),s._v(" 表示匹配到的起始下标，"),a("code",[s._v("input")]),s._v(" 表示匹配的原始字符串参数。"),a("code",[s._v("groups")]),s._v(" 表示分组命名。")]),s._v(" "),a("h4",{attrs:{id:"regexp-prototype-test-str"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#regexp-prototype-test-str"}},[s._v("#")]),s._v(" RegExp.prototype.test(str)")]),s._v(" "),a("p",[s._v("判断正则表达式与指定的字符串参数是否匹配。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a1b22c333d444'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("([a-z])(\\d)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("test")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h4",{attrs:{id:"全局匹配修饰符-g-的影响"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#全局匹配修饰符-g-的影响"}},[s._v("#")]),s._v(" 全局匹配修饰符 "),a("code",[s._v("g")]),s._v(" 的影响")]),s._v(" "),a("p",[s._v("若正则表达式中使用了修饰符 "),a("code",[s._v("g")]),s._v(" 会对每一次的匹配结果产生影响，每次匹配结束后，正则对象的 "),a("code",[s._v("lastIndex")]),s._v(" 属性会被更改为本次匹配的最后一位字符加 "),a("code",[s._v("1")]),s._v("。所以此正则对象下一次的匹配会从这个 "),a("code",[s._v("lastIndex")]),s._v(" 下标值开始匹配。")]),s._v(" "),a("p",[s._v("未使用修饰符 "),a("code",[s._v("g")]),s._v(" 则没有影响，因为匹配结束后不会修改正则对象中的 "),a("code",[s._v("lastIndex")]),s._v(" 属性值，每次重新匹配时 此值都为 "),a("code",[s._v("0")]),s._v("，所以每次匹配都是从下标 "),a("code",[s._v("0")]),s._v(" 开始匹配。")]),s._v(" "),a("p",[s._v("影响到")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("未使用修饰符 "),a("code",[s._v("g")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a1b22c333d444'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("([a-z])(\\d)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")])]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/*\n\n["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]\n0\n\n["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]\n0\n\n["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]\n0\n\n["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]\n0\n\n*/')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("使用修饰符 "),a("code",[s._v("g")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'a1b22c333d444'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[s._v("([a-z])(\\d)")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[s._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[s._v("g")])]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("exec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("dir")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("lastIndex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/*\n\n["a1", "a", "1", index: 0, input: "a1b22c333d444", groups: undefined]\n2\n\n["b2", "b", "2", index: 2, input: "a1b22c333d444", groups: undefined]\n4\n\n["c3", "c", "3", index: 5, input: "a1b22c333d444", groups: undefined]\n7\n\n["d4", "d", "4", index: 9, input: "a1b22c333d444", groups: undefined]\n11\n\nnull\n0\n\n*/')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br")])])])])])}),[],!1,null,null,null);t.default=e.exports}}]);