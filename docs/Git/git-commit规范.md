# git commit message 规范

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

- `feat`：新功能（feature）。
- `fix` / `to`：修复 bug 。
  - `fix`：产生diff并自动修复此问题。适合于一次提交直接修复问题
  - `to`：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用 `fix`
- `docs`：文档修改。
- `style`：格式（不影响代码运行的变动，比如增删空格，标点，或格式化代码）。
- `refactor`：重构（即不是新增功能，也不是修改 bug）。
- `perf`：优化相关，比如提升性能、体验。
- `test`：增加测试。
- `chore`：构建过程或辅助工具的变动。
- `revert`：回滚到上一个版本。
- `merge`：代码合并。
- `sync`：同步主线或分支的 bug 。

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

```text
fix(DAO): 用户查询缺少 username 属性
feat(Controller): 用户查询接口开发
```
