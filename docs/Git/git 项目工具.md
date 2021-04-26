# git 项目工具

[toc]

- `husky` git 钩子(git hooks) 工具，常用于提交前做一些验证操作
- `commitlint` 用于校验提交的消息是否符合规范
- `commtizen` 进行规范提交的一个的交互式工具
- `cz-conventional-changelog` 默认的 `commtizen` 的适配器，可选用适用于自己项目的适配器，或是选择自己发布的适配器
- `Conventional Changelog` (不建议使用)从项目的提交消息和元数据中生成变更日志和发布说明。建议使用高级的 `standard-version` 库，它是 npm 版本命令的替代，可以自动处理版本碰撞、标记和 CHANGELOG 生成。
- `standard-version` 使用 `semver.org` 和 `conventionalcommits.org` 自动化版本控制和变更日志生成。

## husky

[husky 官方文档](https://typicode.github.io/husky/#/)

```bash
# 安装
npm install husky --save-dev

# 初始化，启用 git hooks
npx husky install

# 添加 hook 之 pre-commit, 提交之前的钩子
# 添加后，执行 git commit 时，则会先执行 npm run lint
npx husky add .husky/pre-commit "npm run lint"

# 添加 git hooks 之 commit-msg，提交消息验证钩子
# 添加后，执行 git commit 时会验证提交消息是否符合规范
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

注意，旧版本的 husky 配置信息放在 `package.json` 的 `husky` 字段中，比如：

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "npx --no-install commitlint --edit '$1'"
  }
}
```

v6 版本遗弃了这样的配置方式，而是在项目根目录生成了 `.husky` 目录（和 `.git` 目录相邻），每一个钩子会对应一个没有扩展名的文件，比如：

```bash
├── .husky
│   ├── .gitignore
│   ├── commit-msg
│   ├── pre-commit
│   └─_
│     └─ husky.sh
├── .git
```

上面提到的文件结构中，在 `npx husky install` 初始化后，`commit-msg` 和 `pre-commit` 文件是不存在的，在执行对应的添加钩子的命令后，才会生成对应文件。

## commitlint

[commitlint 官方文档](https://github.com/conventional-changelog/commitlint)

安装：

```bash
# 安装必要的两个包
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

使用：

项目根目录新建 commitlint 的配置文件 `commitlint.config.js` ，并写入：

```js
module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
}
```

commitlint 的配置文件可以是：`commitlint.config.js`, `.commitlintrc.js`, `.commitlintrc.json`, `.commitlintrc.yml` 或是 `package.json` 中的 `commitlint` 字段，优先级依次降低，只会使用找到的优先级最高的配置文件。

## commtizen

[commtizen 官方文档](https://github.com/commitizen/cz-cli#readme)

当您使用 commtizen 进行提交时，将提示您在提交时填写任何必需的提交字段。不再等待git提交钩子运行并拒绝你的提交(尽管这仍然是有帮助的)。不再通过贡献挖掘。Md找到首选格式是什么。获得关于提交消息格式的即时反馈，并提示您输入必需字段。

### 全局安装使用(不推荐)

如果是自己用，全局安装是没问题的，但通常情况来说都是团队协作，或者是开源的，会有更多贡献者参与，全局安装方式就不适用了，因为其他人不一定全局安装了。

```bash
# 使用 git cz 代替 git commit , 实际上会运行全局安装的 commtizen
# C:\Users\xxx\AppData\Roaming\npm\node_modules\commitizen\bin\git-cz
git cz
```

### 项目内安装使用(推荐)

安装：

```bash
# 项目内安装 commitizen
npm install --save-dev commitizen

# 项目内初始化 commitizen 适配器(conventional changelog adapter)
# 此处使用 cz-conventional-changelog ，可自选喜欢的适配器
# 此命令会安装 cz-conventional-changelog，然后在 package.json 添加 `config.commitizen` 配置
# 失败时可以在末尾添加 --force 参数
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

使用：

```bash
# 运行 commtizen 进行交互式的 git commit, 实际会运行项目内安装的 commtizen
npx cz

# 等同于此命令， git-cz 是 cz 的别名
npx git-cz
```

如果在 `package.json` 中的 `scripts` 字段加入：

```json
  "scripts": {
    "cz": "cz"
  }
```

则可以使用 `npm run cz` 来进行 `git commit` 。因为写在 `scripts` 中的命令不需要通过 npx 来访问项目内 `node_modules/.bin` 目录

## standard-version
