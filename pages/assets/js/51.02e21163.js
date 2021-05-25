(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{257:function(a,t,s){"use strict";s.r(t);var e=s(6),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"缓存实践"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存实践"}},[a._v("#")]),a._v(" 缓存实践")]),a._v(" "),s("p",[a._v("原文："),s("a",{attrs:{href:"https://jakearchibald.com/2016/caching-best-practices/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Caching best practices & max-age gotchas"),s("OutboundLink")],1)]),a._v(" "),s("p",[a._v("缓存大多分为两种模式：")]),a._v(" "),s("ul",[s("li",[a._v("不可变内容 + 很长的 "),s("code",[a._v("max-age")]),a._v(" 值")]),a._v(" "),s("li",[a._v("可变内容，总是需要经过服务器重新验证")])]),a._v(" "),s("h2",{attrs:{id:"不可变内容-很长的-max-age-值"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#不可变内容-很长的-max-age-值"}},[a._v("#")]),a._v(" 不可变内容 + 很长的 "),s("code",[a._v("max-age")]),a._v(" 值")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("Cache-Control: max-age"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("31536000")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("此种模式：")]),a._v(" "),s("ul",[s("li",[a._v("一个固定的 URL 指向的内容永远不会变，要变就是直接变 URL 。")]),a._v(" "),s("li",[a._v("浏览器或CDN将这个资源缓存一年不会有任何问题")]),a._v(" "),s("li",[a._v("缓存内容的时间小于 "),s("code",[a._v("max-age")]),a._v(" 时（也就是缓存未失效），可以直接使用，不需要询问服务器来验证它。")])]),a._v(" "),s("p",[a._v("适用情况：")]),a._v(" "),s("div",{staticClass:"language-html line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("script")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("/script-f93bca2c.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("link")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("stylesheet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("/styles-a837cb1e.css"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("/>")])]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("img")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("/cats-0e9a2ef4.jpg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("alt")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("…"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("/>")])]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("p",[a._v("每一个资源文件经过打包后，会根据内容生成一个唯一的 hash 值，如果文件内容有变化，则这个 hash 值会变化，也就是访问的 URL 就会变化，一个固定的 URL 指向的内容是肯定不会有变化的。")]),a._v(" "),s("p",[a._v("然而，这种模式不适用于文章和博客文章。它们的 URL 不能变，也就是不能使用文件 hash 值作为 URL，但内容是需要改变更新的。比如基本拼写和语法错误，修改之后，必须保持原来的 URL。")]),a._v(" "),s("h2",{attrs:{id:"可变内容-总是需要经过服务器重新验证"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#可变内容-总是需要经过服务器重新验证"}},[a._v("#")]),a._v(" 可变内容，总是需要经过服务器重新验证")]),a._v(" "),s("div",{staticClass:"language-bash line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("Cache-Control: no-cache\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("此种模式：")]),a._v(" "),s("ul",[s("li",[a._v("一个固定 URL 的内容可能会改变")]),a._v(" "),s("li",[a._v("所有缓存文件在使用时，都需要经过服务器校验是否有更新")])]),a._v(" "),s("p",[a._v("注意: "),s("code",[a._v("no-cache")]),a._v(" 并不意味着“不缓存”，它意味着在使用缓存资源之前必须由服务器来检查 (revalidate)。"),s("code",[a._v("no-store")]),a._v(" 才是告诉浏览器不要缓存它。此外，"),s("code",[a._v("must-revalidate")]),a._v(" 并不意味着“必须重新验证”，它的意思是，如果本地资源缓存时间小于提供的 "),s("code",[a._v("max-age")]),a._v("，则可以使用它，否则必须重新验证。")]),a._v(" "),s("p",[a._v("在这种模式中，可以在响应头种，添加 "),s("code",[a._v("ETag")]),a._v(" (你选择的版本ID) 或 "),s("code",[a._v("Last-Modified")]),a._v(" 。下次客户端获取资源时，会在请求头中，通过 "),s("code",[a._v("If-None-Match")]),a._v(" 带上上一次获取的 "),s("code",[a._v("ETag")]),a._v(" ，或通过 "),s("code",[a._v("If-Modified-Since")]),a._v(" 带上上一次获取的 "),s("code",[a._v("Last-Modified")]),a._v(" 来询问服务器。如果服务器校验没有发现更新，则会告诉客户端：“你的资源已经是最新的了，直接使用就行了”。")]),a._v(" "),s("p",[a._v("如果服务端无法发送 "),s("code",[a._v("ETag")]),a._v(" 或 "),s("code",[a._v("Last-Modified")]),a._v("，那么服务端总是会返回完整的文件资源。")]),a._v(" "),s("p",[a._v("这种模式，总是涉及到网络连接，所以它不如前一种模式好，因为前一种模式在缓存未失效时，可以完全不使用网络。")])])}),[],!1,null,null,null);t.default=n.exports}}]);