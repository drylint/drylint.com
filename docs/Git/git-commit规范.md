# git commit message 规范

[git commit 规范校验](https://github.com/conventional-changelog/commitlint#what-is-commitlint)

[angular-Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)

提交 message 语法：

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- 包括 header，body 和 footer，每一块之间留一行空行。
- header 是必需的，body 和 footer 可以省略。
- header 包含 type, scope, subject, 其中 type 和 subject 是必须的。
- 一行提交信息不应该超过 100 个字符。

## header

### type 本次提交类型

- `feat` ：新功能（feature）。
- `fix` ：修复 bug 。
- `docs` ：文档修改。
- `style` ：格式（不影响代码运行的变动，比如增删空格，标点，或格式化代码）。
- `refactor` ：重构某些代码，即不是新增功能，也不是修改 bug ，比如重写某个函数。
- `perf` ：优化相关，比如提升性能、体验。
- `test` ：增加修改测试用例。
- `build` ：对项目构建的修改，比如 webpack 的配置。
- `chore` ：构建过程或辅助工具的变动。
- `revert` ：回滚到上一个版本。
- `merge` ：代码合并。
- `sync` ：同步主线或分支的 bug 。

### scope 可选，本次提交变动影响的范围

scope 是有修改变动的范围，如果影响的范围不只一个，可以使用 `*` 表示。

### subject 必须，本次提交的简短描述

- 使用祈使句，现在时态，"change" 不是 "changed" ， 也不是 "changes"
- 首字母不要大写
- 结尾不要使用标点

## body

- 就像 header 的 subject 一样，使用祈使句，现在时态，“change” 而不是 “changed” 或 “changes” 。
- 应该包括改变的动机，并与以前的行为进行对比。

## footer

- 任何关于 Breaking Changes 的信息都放在 footer 中
- 关闭一个 github 的 issue 也放在 footer 中
- Breaking CHANGE 应该以 `Breaking CHANGE:` 开头，一个空格或两个换行符。然后使用提交消息的其余部分。

## 示例

```bash
# 增加用户修改头像的功能
feat(user): 新增用户修改头像的功能

# 修复用户编辑信息失败的问题
fix(user): 修复用户编辑个人信息失败的问题

# 修改了项目中的 markdown 文件
docs: 完善了项目说明文档

# 美化代码，比如增加空格，标点符号，换行等
style(home): 整理首页代码格式问题

# 既不是修复 bug 也不是新增功能的代码修改，比如重写了某个方法
refactor(utils): 重构全局通用请求方法

# 提升性能的优化
perf(BaseTable): 优化基础表格组件渲染速度

# 修改或新增测试用例
test(user): 修改用户编辑信息的测试用例

# 项目构建修改或依赖包的增加、升级等
build: 升级 echarts 依赖包

# 持续继承配置文件或脚本的更改
ci: 修复持续继承失败的问题

# 其他杂事提交，不属于 src 目录或 test 目录
chore: .gitignore 文件中增加 dist 目录

# 版本回退
revert: 退回上一个线上版本
```
