(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{244:function(e,t,a){"use strict";a.r(t);var s=a(6),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"git-commit-message-规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-commit-message-规范"}},[e._v("#")]),e._v(" git commit message 规范")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines",target:"_blank",rel:"noopener noreferrer"}},[e._v("angular-Git Commit Guidelines"),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("提交 message 语法：")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("<type>(<scope>): <subject>\n<BLANK LINE>\n<body>\n<BLANK LINE>\n<footer>\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("ul",[a("li",[e._v("包括 header，body 和 footer，每一块之间留一行空行。")]),e._v(" "),a("li",[e._v("header 是必需的，body 和 footer 可以省略。")]),e._v(" "),a("li",[e._v("header 包含 type, scope, subject, 其中 type 和 subject 是必须的。")]),e._v(" "),a("li",[e._v("一行提交信息不应该超过 100 个字符。")])]),e._v(" "),a("h2",{attrs:{id:"header"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#header"}},[e._v("#")]),e._v(" header")]),e._v(" "),a("h3",{attrs:{id:"type-本次提交类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#type-本次提交类型"}},[e._v("#")]),e._v(" type 本次提交类型")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("feat")]),e._v("：新功能（feature）。")]),e._v(" "),a("li",[a("code",[e._v("fix")]),e._v(" / "),a("code",[e._v("to")]),e._v("：修复 bug 。\n"),a("ul",[a("li",[a("code",[e._v("fix")]),e._v("：产生diff并自动修复此问题。适合于一次提交直接修复问题")]),e._v(" "),a("li",[a("code",[e._v("to")]),e._v("：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用 "),a("code",[e._v("fix")])])])]),e._v(" "),a("li",[a("code",[e._v("docs")]),e._v("：文档修改。")]),e._v(" "),a("li",[a("code",[e._v("style")]),e._v("：格式（不影响代码运行的变动，比如增删空格，标点，或格式化代码）。")]),e._v(" "),a("li",[a("code",[e._v("refactor")]),e._v("：重构（即不是新增功能，也不是修改 bug）。")]),e._v(" "),a("li",[a("code",[e._v("perf")]),e._v("：优化相关，比如提升性能、体验。")]),e._v(" "),a("li",[a("code",[e._v("test")]),e._v("：增加测试。")]),e._v(" "),a("li",[a("code",[e._v("chore")]),e._v("：构建过程或辅助工具的变动。")]),e._v(" "),a("li",[a("code",[e._v("revert")]),e._v("：回滚到上一个版本。")]),e._v(" "),a("li",[a("code",[e._v("merge")]),e._v("：代码合并。")]),e._v(" "),a("li",[a("code",[e._v("sync")]),e._v("：同步主线或分支的 bug 。")])]),e._v(" "),a("h3",{attrs:{id:"scope-可选-本次提交变动影响的范围"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scope-可选-本次提交变动影响的范围"}},[e._v("#")]),e._v(" scope 可选，本次提交变动影响的范围")]),e._v(" "),a("p",[e._v("scope 是有修改变动的范围，如果影响的范围不只一个，可以使用 "),a("code",[e._v("*")]),e._v(" 表示。")]),e._v(" "),a("h3",{attrs:{id:"subject-必须-本次提交的简短描述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#subject-必须-本次提交的简短描述"}},[e._v("#")]),e._v(" subject 必须，本次提交的简短描述")]),e._v(" "),a("ul",[a("li",[e._v('使用祈使句，现在时态，"change" 不是 "changed" ， 也不是 "changes"')]),e._v(" "),a("li",[e._v("首字母不要大写")]),e._v(" "),a("li",[e._v("结尾不要使用标点")])]),e._v(" "),a("h2",{attrs:{id:"body"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#body"}},[e._v("#")]),e._v(" body")]),e._v(" "),a("ul",[a("li",[e._v("就像 header 的 subject 一样，使用祈使句，现在时态，“change” 而不是 “changed” 或 “changes” 。")]),e._v(" "),a("li",[e._v("应该包括改变的动机，并与以前的行为进行对比。")])]),e._v(" "),a("h2",{attrs:{id:"footer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#footer"}},[e._v("#")]),e._v(" footer")]),e._v(" "),a("ul",[a("li",[e._v("任何关于 Breaking Changes 的信息都放在 footer 中")]),e._v(" "),a("li",[e._v("关闭一个 github 的 issue 也放在 footer 中")]),e._v(" "),a("li",[e._v("Breaking CHANGE 应该以 "),a("code",[e._v("Breaking CHANGE:")]),e._v(" 开头，一个空格或两个换行符。然后使用提交消息的其余部分。")])]),e._v(" "),a("h2",{attrs:{id:"示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[e._v("#")]),e._v(" 示例")]),e._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("fix(DAO): 用户查询缺少 username 属性\nfeat(Controller): 用户查询接口开发\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])])])}),[],!1,null,null,null);t.default=r.exports}}]);