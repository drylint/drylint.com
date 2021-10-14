(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{376:function(t,s,a){"use strict";a.r(s);var n=a(6),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"狼书卷1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#狼书卷1"}},[t._v("#")]),t._v(" 狼书卷1")]),t._v(" "),a("h2",{attrs:{id:"_1-3-什么是-node-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-什么是-node-js"}},[t._v("#")]),t._v(" 1.3 什么是 Node.js")]),t._v(" "),a("ul",[a("li",[t._v("Node.js 不是 JavaScript 应用，不是编程语言，不是像 Rails，Laravel，Django 一样的框架，也不是像 Nginx 一样的 Web 服务器，它是 JavaScript 的运行时环境。")]),t._v(" "),a("li",[t._v("构建在 Chrome V8 引擎之上，V8 是通过 C/C++ 编写的，要将 JavaScript 转换为底层的 C 或 C++ 代码后再执行。")]),t._v(" "),a("li",[t._v("I/O 操作是异步的，由 libuv(C/C++编写)事件循环库处理。")]),t._v(" "),a("li",[t._v("使用 npm 作为包管理器。")]),t._v(" "),a("li",[t._v("目前，Node.js 同时支持 ChakraCore(Microsoft开源) 和 Chrome V8 两种引擎，但还是以 V8 为主，前者需要单独安装。")])]),t._v(" "),a("h2",{attrs:{id:"node-js-入门"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node-js-入门"}},[t._v("#")]),t._v(" Node.js 入门")]),t._v(" "),a("h3",{attrs:{id:"hello-http"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hello-http"}},[t._v("#")]),t._v(" Hello HTTP")]),t._v(" "),a("p",[t._v("示例：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" http "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeHead")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-type'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'text/plain'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Hello node.js'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Server Running at http://127.0.0.1:3000'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])]),a("h3",{attrs:{id:"调试"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#调试"}},[t._v("#")]),t._v(" 调试")]),t._v(" "),a("p",[t._v("调试三等境界：")]),t._v(" "),a("ul",[a("li",[t._v("打日志：可用 console.log, debug 模块 或 Node.js SDK 内置的 util.log 等方式。")]),t._v(" "),a("li",[t._v("断点调试：可用 Node debugger 或 VSCode 编辑器")]),t._v(" "),a("li",[t._v("测试驱动开发：TDD 和 BDD 测试框架非常多，比如 Mocha, AVA, Jest, Cucumber 等。")])]),t._v(" "),a("h2",{attrs:{id:"更了不起的-node-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更了不起的-node-js"}},[t._v("#")]),t._v(" 更了不起的 Node.js")]),t._v(" "),a("h3",{attrs:{id:"从-lamp-到-mean"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#从-lamp-到-mean"}},[t._v("#")]),t._v(" 从 LAMP 到 MEAN")]),t._v(" "),a("p",[t._v("LAMP: Linux + Apache + MySQL + PHP/Pyhon/Perl")]),t._v(" "),a("p",[t._v("MEAN: MongoDB + Express + Angular + Node.js")]),t._v(" "),a("p",[t._v("MEAN 逐渐退出市场，更多采用阿里巴巴开源的 Egg.js")]),t._v(" "),a("h3",{attrs:{id:"前后端分离"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前后端分离"}},[t._v("#")]),t._v(" 前后端分离")]),t._v(" "),a("p",[t._v("典型的企业应用大多采用 3 层架构模式：")]),t._v(" "),a("ul",[a("li",[t._v("表现层：处理 HTTP 请求，直接返回 HTML 渲染，或者返回 API 结果。")]),t._v(" "),a("li",[t._v("业务逻辑层：完成具体的业务逻辑，是应用的核心组成部分。")]),t._v(" "),a("li",[t._v("数据访问层：访问基础数据，例如数据库，缓存和消息队列等。")])]),t._v(" "),a("p",[t._v("Java 后端的分层非常清晰：")]),t._v(" "),a("ul",[a("li",[t._v("模型层(Model): 数据库操作一般采用 ORM 库来简化操作，模型会和数据库里的表进行关联映射。")]),t._v(" "),a("li",[t._v("DAO(Data Access Object): 就是常说的增删改查，主要对单个模型进行操作。")]),t._v(" "),a("li",[t._v("Service 层就是业务逻辑层，通常组合多个 Dao 对象进行某项业务处理。")]),t._v(" "),a("li",[t._v("Controller 里组装了多个 Sevice 对象，可实现具体的功能。")])]),t._v(" "),a("p",[t._v("传统方式：请求 -> Nginx -> 前端")]),t._v(" "),a("p",[t._v("推荐方式：请求 -> Nginx -> Node.js(前端)")]),t._v(" "),a("p",[t._v("传统方式中，过渡依赖 Nginx，但 Nginx 一般由运维团队统一管理，跨部门/跨团队合作，流程会比较麻烦，在前端引入 node.js 是最简单的解决方案。")]),t._v(" "),a("p",[t._v("这里的 Node.js 可实现：")]),t._v(" "),a("ul",[a("li",[t._v("请求转发，反向代理。")]),t._v(" "),a("li",[t._v("Web 服务，所有后端能做的，node.js 都可以做到。")]),t._v(" "),a("li",[t._v("圈定范围，便于维护")]),t._v(" "),a("li",[t._v("充当 HTTP 客户端，访问后端接口，但一般不直接访问数据库。")])]),t._v(" "),a("p",[t._v("使用 Node 来替代 Nginx 的 HTTP 功能，让前端有更多的灵活性。")]),t._v(" "),a("p",[t._v("即使有了 Node, 但绝大部分场景下还是需要 Nginx 的，Nginx 在实现负载均衡、反向代理、缓存、限流限速方面是比较合适的。Nginx 需要繁杂的配置文件，OpenResty 只编写少量 Lua 代码就能解决。")])])}),[],!1,null,null,null);s.default=e.exports}}]);