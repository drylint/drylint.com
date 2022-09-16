(window.webpackJsonp=window.webpackJsonp||[]).push([[166],{369:function(t,v,_){"use strict";_.r(v);var d=_(6),e=Object(d.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"glob模式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#glob模式"}},[t._v("#")]),t._v(" glob模式")]),t._v(" "),v("p",[t._v("在学习gulp的过程中，gulp使用了被称作为glob的文件匹配模式。")]),t._v(" "),v("p",[t._v("接下来我们认识下什么是glob模式。")]),t._v(" "),v("p",[t._v("在计算机编程中，特别是类Unix环境，glob模式通过通配符来匹配文件名。例如：Unix命令，将所有以扩展名为 "),v("code",[t._v(".txt")]),t._v(" 的文件从当前目录拷贝到 "),v("code",[t._v("textfiles")]),t._v(" 目录。")]),t._v(" "),v("div",{staticClass:"language-bash line-numbers-mode"},[v("pre",{pre:!0,attrs:{class:"language-bash"}},[v("code",[v("span",{pre:!0,attrs:{class:"token function"}},[t._v("mv")]),t._v(" *.txt textfiles/\n")])]),t._v(" "),v("div",{staticClass:"line-numbers-wrapper"},[v("span",{staticClass:"line-number"},[t._v("1")]),v("br")])]),v("p",[t._v("这里 "),v("code",[t._v("*")]),t._v(" 是一个匹配任意数量字符基本通配符，"),v("code",[t._v("*.txt")]),t._v("就表示一个glob模式。另一个通用的通配符是 "),v("code",[t._v("?")]),t._v(",它表示任意一个字符。")]),t._v(" "),v("h2",{attrs:{id:"常用的通配符是"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用的通配符是"}},[t._v("#")]),t._v(" 常用的通配符是 "),v("code",[t._v("*")]),t._v(", "),v("code",[t._v("?")]),t._v(", "),v("code",[t._v("[…]")])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("通配符")]),t._v(" "),v("th",[t._v("描述")]),t._v(" "),v("th",[t._v("例子")]),t._v(" "),v("th",[t._v("匹配")]),t._v(" "),v("th",[t._v("不匹配")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[v("code",[t._v("*")])]),t._v(" "),v("td",[t._v("匹配任意数量的字符包括空字符")]),t._v(" "),v("td",[v("code",[t._v("Law*")])]),t._v(" "),v("td",[t._v("Law, Laws, or Lawyer")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td"),t._v(" "),v("td"),t._v(" "),v("td",[v("code",[t._v("*Law*")])]),t._v(" "),v("td",[t._v("Law, GrokLaw, or Lawyer.")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("?")]),t._v(" "),v("td",[t._v("匹配任意一个字符")]),t._v(" "),v("td",[t._v("?at Cat, cat, Bat or bat")]),t._v(" "),v("td",[t._v("at")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("[abc]")]),t._v(" "),v("td",[t._v("匹配任意一个包含的字符")]),t._v(" "),v("td",[t._v("[CB]at")]),t._v(" "),v("td",[t._v("Cat or Bat")]),t._v(" "),v("td",[t._v("cat or bat")])]),t._v(" "),v("tr",[v("td",[t._v("[a-z]")]),t._v(" "),v("td",[t._v("匹配任意一个给定范围的字符")]),t._v(" "),v("td",[t._v("Letter[0-9]")]),t._v(" "),v("td",[t._v("Letter0, Letter1 etc.")]),t._v(" "),v("td",[t._v("Letters or Letter")])])])]),t._v(" "),v("p",[t._v("注意，在所有以上例子中路径分隔符（unix的 "),v("code",[t._v("/")]),t._v(" ，windows的 "),v("code",[t._v("\\")]),t._v(" ）都不会被匹配。")]),t._v(" "),v("h2",{attrs:{id:"在linux和posix系统中-有以下两个扩展"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#在linux和posix系统中-有以下两个扩展"}},[t._v("#")]),t._v(" 在Linux和POSIX系统中 "),v("code",[t._v("[…]")]),t._v(" 有以下两个扩展")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("通配符")]),t._v(" "),v("th",[t._v("描述")]),t._v(" "),v("th",[t._v("例子")]),t._v(" "),v("th",[t._v("匹配")]),t._v(" "),v("th",[t._v("不匹配")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("[!abc]")]),t._v(" "),v("td",[t._v("不匹配任意一个包含的字符")]),t._v(" "),v("td",[t._v("[!C]at Bat, bat, or cat")]),t._v(" "),v("td",[t._v("Cat")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[t._v("[!a-z]")]),t._v(" "),v("td",[t._v("不匹配任意一个给定范围的字符")]),t._v(" "),v("td",[t._v("Letter[!3-5]")]),t._v(" "),v("td",[t._v("Letter1, Letter2 etc.")]),t._v(" "),v("td",[t._v("Letter3, Letter4 or Letter5")])])])]),t._v(" "),v("h2",{attrs:{id:"与正则的比较"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#与正则的比较"}},[t._v("#")]),t._v(" 与正则的比较")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("Glob的通配符")]),t._v(" "),v("th",[t._v("等价正则的表达式")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[t._v("?")]),t._v(" "),v("td",[t._v(".")])]),t._v(" "),v("tr",[v("td",[t._v("*")]),t._v(" "),v("td",[t._v(".*")])])])]),t._v(" "),v("p",[t._v("Glob尝试匹配整个字符串，例如：")]),t._v(" "),v("p",[v("code",[t._v("S*.DOC")]),t._v(" 将匹配 "),v("code",[t._v("S.DOC")]),t._v(" 和 "),v("code",[t._v("SA.DOC")]),t._v(" ,但不匹配 "),v("code",[t._v("POST.DOC")]),t._v(" 或 "),v("code",[t._v("SURREY.DOCKS")]),t._v(" ）")]),t._v(" "),v("p",[t._v("正则只匹配子串除非使用 "),v("code",[t._v("^")]),t._v(" 和 "),v("code",[t._v("$")]),t._v(" 。所以 "),v("code",[t._v("S*.DOC")]),t._v(" 的等价正则是 "),v("code",[t._v("^S.*\\.DOC$")]),t._v(" 。")]),t._v(" "),v("h2",{attrs:{id:"node-glob对常用通配符又做了一些扩展"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#node-glob对常用通配符又做了一些扩展"}},[t._v("#")]),t._v(" node glob对常用通配符又做了一些扩展")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",[t._v("通配符")]),t._v(" "),v("th",[t._v("描述")]),t._v(" "),v("th",[t._v("例子")]),t._v(" "),v("th",[t._v("匹配")]),t._v(" "),v("th",[t._v("不匹配")])])]),t._v(" "),v("tbody",[v("tr",[v("td",[v("code",[t._v("**")])]),t._v(" "),v("td",[t._v("匹配任意数量的字符包括空字符（包括路径分隔符）")]),t._v(" "),v("td",[v("code",[t._v("**/*.js")])]),t._v(" "),v("td",[t._v("/a/b/c.js")]),t._v(" "),v("td")]),t._v(" "),v("tr",[v("td",[v("code",[t._v("!(pattern|pattern)")])]),t._v(" "),v("td",[t._v("匹配除了()内以外的pattern")]),t._v(" "),v("td",[v("code",[t._v("!(abc|bcd)")])]),t._v(" "),v("td",[t._v("aaa,bbb")]),t._v(" "),v("td",[t._v("abc.bcd")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("?(pattern|pattern)")])]),t._v(" "),v("td",[t._v("匹配至多一个()内的pattern")]),t._v(" "),v("td",[v("code",[t._v("?(abc|bcd)")])]),t._v(" "),v("td",[t._v("abc")]),t._v(" "),v("td",[t._v("bbb")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("+(pattern|pattern)")])]),t._v(" "),v("td",[t._v("匹配至少一个()内的pattern")]),t._v(" "),v("td",[v("code",[t._v("+(abc|bcd)")])]),t._v(" "),v("td",[t._v("abc")]),t._v(" "),v("td",[t._v("bbb")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("*(pattern|pattern)")])]),t._v(" "),v("td",[t._v("匹配任意个()内的pattern")]),t._v(" "),v("td",[v("code",[t._v("*(abc|bcd)")])]),t._v(" "),v("td",[t._v("abc")]),t._v(" "),v("td",[t._v("bbb")])]),t._v(" "),v("tr",[v("td",[v("code",[t._v("@(pattern|pattern)")])]),t._v(" "),v("td",[t._v("精确匹配()内的其中一个pattern")]),t._v(" "),v("td",[v("code",[t._v("@(abc|bcd)")])]),t._v(" "),v("td",[t._v("abc")]),t._v(" "),v("td",[t._v("abd")])])])])])}),[],!1,null,null,null);v.default=e.exports}}]);