# git 概念

## 文件状态

- Untracked 表示此文件为未追踪状态，还未加入版本管理，通常是新增的文件，可以通过 `git add <file-path>` 加入暂存区，commit 之后，此文件就加入了版本管理。
- Modified 表示文件被修改，还在工作区，可以通过 `git add <file-path>` 加入暂存区，或 `git checkout <file-path>` 丢弃变更。
- Staged 表示文件加入了暂存区，处于暂存状态，可以通过 `git commit` 进行提交，也可以通过 `git reset HEAD <file-path>` 将其放回工作区。
- Unmodify 表示文件未修改，该文件和当前所处的提交中的文件版本一致，可以通过 `git rm <file-path>` 将其删除并暂存操作，commit 后将会被正式删除。

## index

索引指的就是 `.git/index` 文件，用来存储暂存区 (Stage) 的状态，对于暂存区的操作都会更新这个文件，比如将工作区的某个修改后的文件加入暂存区 (`git add`) ，或者从暂存区中将某个文件撤回到工作区，都会更新 `.git/index` 文件。

`.git/index` 文件建立了文件和 `.git/objects` 目录下的对应实体之间的映射关系，`.git/objects` 目录存储着当前项目所有文件的所有版本的内容，所以占用空间比较大。

## HEAD

HEAD 指的是 `.git/HEAD` 文件，文件中就只有一行文本，存储的可能是当前工作区处于哪个分支，比如 `ref: refs/heads/git-test` ，或是某一次提交的 commit hash , 比如 `fbea9dc164d1efc15fc604044cc13595194f48d7` , 表示当前工作区是处于这次提交。

执行 `git checkout` ，或 `git reset` ，或切换分支，以及其他某些操作都会更改 HEAD 值，甚至手动打开这个文件修改都会影响工作区，但不建议手动修改文件，而是通过需求选择对应的命令，交给 git 自动处理。

## `^` 和 `~`

`^[<n>]` 表示的是当前提交的第 n 个父提交(上一次提交)，n 默认值为 1 。如果上一次提交在不同分支，那么当前分支就有多个父提交。如果当前提交是一次合并提交，通常就会有不止 1 个父提交。

表示时，`<ref>^` 相当于 `<ref>^1` ，多个 `^` 连用时，比如 `<ref>^^` ，实际上相当于 `<ref>^1^1` ，而不是 `<ref>^2` 。

实际上，`<ref>^^` 或 `<ref>^1^1` 表示的是父提交的父提交，也就是上一次提交的上一次提交。

而 `<ref>^2` 表示的是第 2 个父提交，也就是在另一个分支上的父提交。

`~[<n>]` 则比较简单，就是指当前提交在当前分支的倒数第 n 次提交，n 默认值为 1 。

表示时，`~` 相当于 `~1` ，`~~` 相当于 `~2` ，`~~~` 相当于 `~3` ，以此类推。

> 为了简化描述，后文使用 A, B, C, D... 来表示每一次提交的引用。

比如，在 main 分支先后有 A, B, C, D 四次提交，从 B 提交创建了一个 dev 分支，先后进行了 E, F 两次提交，切换到 main 分支后，把 dev 分支合并到 main 分支，生成了 G 提交，在 main 分支继续完成了一次 H 提交。

执行 `git log --graph --oneline` 结果如下：

```bash
* 2673ccb (HEAD -> main) H
*   432ee77 G
|\
| * 171e957 (dev) F
| * 9d31de5 E
* | c071974 D
* | 99070f4 C
|/
* 34c28bf B
* fab4cc8 A
```

在上例当前的状态下，每次提交都有多种表示方式：

- 以下表示中，任意位置的数字 `1` 均可省略，甚至可以仅在某些位置省略 1， 比如 `<ref>^1^^^1^^1` 或 `<ref>~1~~1` ；
- 用 H 提交来表示 G 提交：`H^`, `H^1`, `H~`, `H~1`
- 用 H 提交来表示 D 提交：`H^^`, `H^1^1`, `H~~`, `H~1~1`, `H~2`
- 用 H 提交来表示 C 提交：`H^^^`, `H^1^1^1`, `H~~~`, `H~1~1~1`, `H~3`
- 用 G 提交来表示 D 提交：`G^`, `G^1`, `G~`, `G~1`
- 用 G 提交来表示 F 提交：`G^2`
- 用 G 提交来表示 E 提交：`G^2^`, `G^2^1`, `G^2~`, `G^2~1`
- 用 G 提交来表示 B 提交：`G^^^`, `G^1^1^1`, `G~~~`, `G~1~1~1`, `G~3`, `G~2~1`, `G~1~2`, `G^2^^`, `G^2~~`
- 用 F 提交来表示 E 提交：`F^`, `F^1`, `F~`, `F~1`
- 用 F 提交来表示 B 提交：`F^^`, `F^1^1`, `F~~`, `F~1~1`, `F~2`

## refs 目录

refs 目录存储当前仓库的所有引用，比如某个本地分支或远程分支对应哪一次提交，某个 tag 对应哪一次提交。

- `heads` 目录存储该仓库的本地分支引用，比如本地有 `dev` 和 `fix` 分支，则 `heads` 目录中就会有 `dev` 和 `fix` 文件，分别保存各自对应的某次 commit hash ，表示该分支当前处于某次提交。
- `tags` 目录存储该仓库的所有 tag 引用，比如有 `v1.0.0` 和 `v1.0.1` tag ，则 tags 目录中就会有 `v1.0.0` 和 `v1.0.1` 文件，分别保存各自对应的某次 commit hash ，表示该 tag 是处于某次提交。
- `remotes` 目录存储该仓库的远程引用，一个远程为一个目录，比如仓库关联了 `origin` 和 `temp` 远程，则 remotes 目录中就会有 `origin` 和 `temp` 目录，每个远程目录下就是每个分支文件，比如 远程 `origin` 下有 `dev` 和 `fix` 分支，则 `heads` 目录中就会有 `dev` 和 `fix` 文件，分别保存各自对应的某次 commit hash ，表示该分支当前处于某次提交。

### git reset

- `--hard` 重置 HEAD, index 和 working tree, 将目标提交之后所有提交变更丢弃，并且当前暂存区和工作区的所有更改也会被丢弃
- `--soft` 仅重置 HEAD, 将目标提交之后的所有提交变更放置到 stage (如果本身 stage 就有文件变更，则会合并展示), 保留工作区不做任何变动
- `--mixed` 默认值，重置 HEAD 和 index , 保留当前工作区的所有更改(暂存区会被取消，统一放置到工作区，冲突的变更以工作区为准)，HEAD 指针移动的目标提交，将目标提交之后所有提交过的更改恢复到工作区，也就是工作区混合了当前更改和回退的更改

```bash
# 恢复到某次提交
# <ref> 可以是 `<分支名>` 、 `<远程>/<分支名>` 、 `<Tag名>` 、 `<commit hash>`
# 当出现 tag 和 分支 同名时，以 tag 优先
git reset <ref>

# 恢复到某次提交之前的多少次提交(可以称之为祖先提交)
# 1 个 `^` 符号表示 `<ref>` 的前一次提交，n 个 `^` 就表示 `<ref>` 的前 n 次提交
# 当终端无法匹配 `^` 时, 可以使用 `\` 将每个 `^` 进行转义，比如 `<ref>\^\^\^` ，或使用引号包裹 `'<ref>^^^'`
# `<ref>^` 等同于 `<ref>~` 或 `<ref>~1` , `<ref>^^^` 等同于 `<ref>~~~` 或 `<ref>~3`
# <ref> 后跟 n 个 `^` 时，相当于跟 n 个 `~` ，也相当于跟 `~n` 。
# 但是，<ref>后跟 `^<n>` 时，比如 `<ref>^2` 表示的并不是 `<ref>^^` 的意思，而是表示第二个父提交，`<n>` 表示第几个父提交，不指定时默认为 1 。
# 父提交，通常来说就是上一次提交，但如果是多个分支合并了代码到当前，就会有多个父提交，每个分支的上一次提交都是当前的父提交。
git reset <ref>^
git reset <ref>~
git reset <ref>~<n>

# 将某些暂存区的文件撤回到工作区， . 或 * 可表示所有文件
# 实际上，这里是有默认参数 --mixed 所以才会撤回到工作区
git reset [--] <file-path-a> <file-path-b> <file-path-n>

# 等同于
git reset --mixed [--] <file-path-a> <file-path-b> <file-path-n>

# 恢复到某次提交 `<ref>` 之前的 `<n>` 次提交
git reset <ref>~<n>
```

## git diff

```bash
# 查看工作区相对于暂存区和上一次提交有哪些不同
git  diff

# 查看暂存区相对于上一次提交有哪些不同，`--staged` 和 `--cached` 作用相同
git diff --staged
git diff --cached

# 对比暂存区和工作区相对于某个 <ref> 的不同
# 指定的提交 <ref> 可以使用「分支引用」、「tag 引用」、「HEAD 引用」或直接使用「commit-hash」
git diff <ref>

# <ref> 使用 HEAD
# 对比暂存区和工作区相对于「HEAD(HEAD未移动时表示最新的一次提交)」的不同
git diff HEAD

# <ref> 使用 commit-hash
# 对比暂存区和工作区相对于某次「提交」的不同
git diff <commit-hash>

# <ref> 使用 tag
# 对比暂存区和工作区相对于某个「tag」的不同
git diff <tag-name>

# <ref> 使用 branch
# 对比暂存区和工作区相对于某个「分支」或「远程/分支」的不同
git diff <branch-name>
git diff <remote>/<branch-name>

# 对比 <ref-b> 相对于 <ref-a> 之间的不同，也就是 <ref-b> 相对于 <ref-a> 做了什么变更
# 指定的提交 <ref> 可以使用「分支引用」、「tag 引用」、「HEAD 引用」或直接使用「commit-hash」
git diff <ref-a> <ref-b>
# 等同于
git diff <ref-a>..<ref-b>

# 比如：
# 比较两个分支上的最新提交有哪些不同
git diff <branch-a> <branch-b>

# 对比两次提交之间的差异
git diff <commit-hash-a> <commit-hash-b>

# 对比 <ref-b> 相对于 「<ref-a> 与 <ref-b> 最新的交点」的那一次提交有什么不同
# 比如 dev 分支有 A, B, C, D 提交，在 B 提交基础上创建 fix 分支，在 fix 有 E, F 提交
# 执行 git diff dev...fix 展示的是 F 提交相对于 B 提交有什么不同，
# 而 git diff dev..fix 展示的是 F 相对于 D 的不同
git diff <ref-a>...<ref-b>
```

## git log

在 git log 记录中，在某个 commit hash 后出现的 `(HEAD -> dev)` 提示，表示当前处在 `dev` 分支， `HEAD` 指向这一次提交。

```bash
# 查看当前所在分支的提交记录，包括 commit hash, Author, Date, commit message
git log

# 查看当前分支的单行形式的简化版提交记录，包括 简化版 8 位 commit hash 和 commit message
git log --oneline

# 查看单行版提交记录，包括 完整 commit hash 和 commit message
git log --pretty=oneline

# 根据日期来查看提交记录，时分秒不写默认为当前时刻
git log <--after | --before | --since | --until>=2020-01-01

# 查看提交记录并输出变更的文件列表以及每个文件增加多少行，删除多少行
git log --stat

# 查看某个用户的提交记录
git log --author=<user.name>

# 仅查看合并操作的提交记录，或排除合并操作的提交记录
git log --merges | --no-merges

# 查看提交记录并展示每一次提交的每一行的具体变更内容
git log -p

# 查看提交记录的可视化图形分支
git log --graph

# 指定提交消息的关键字来查找提交记录
git log --grep=<keyword>

# 查看某个指定分支的提交记录
git log <branch-name>

# 查看某个文件的提交记录，其中 -- 表示之后是文件路径，-- 可省略
git log [--] <file-path>

# 查看某个文件的变更记录，包括详细的行记录
git log -p <file-path>
# 仅查看某个文件最后一次的详细变更，-n 中 n 为数字，表示最近 n 次提交
git log -p -1 <file-path>

# 查看某一次提交，并展示这次提交的每一行的具体变更内容，不指定 <ref> 时默认为最新一次提交
git show [<ref>]

# 按提交用户分组来展示每个用户的「提交次数」以及「提交消息列表」
git shortlog

# 统计所有提交用户分别提交了多少次
git shortlog -s | --summary

# 按提交次数进行排序，来分组来展示每个用户的「提交次数」以及「提交消息列表」
git shortlog -n | --numbered
```

## git checkout

`git checkout <ref>` 可以叫做检出，将工作区恢复到 `<ref>` 代表的这一次提交的状态。

`git checkout` 会移动 `HEAD` 的指针，让 `HEAD` 指向 `<ref>` 。如果 `<ref>` 是一个分支名，则会切换到这个分支。

如果 `<ref>` 不是一个分支，而是一个 `<tag>` ，或是一个 `<commit hash>` ，此时会进入到 `detached HEAD` (分离的 HEAD) 状态，也就是说 `HEAD` 现在和分支分离了，在 `detached HEAD` 状态下，做出任何更改并进行提交都是分离状态，此时使用 checkout 检出到其他提交后，`detached HEAD` 状态做出的更改和提交均会被丢弃，可以使用此特性来检出到某次提交，去做一些测试性的且不需要保存修改。

```bash
# 检出某次提交
git checkout <ref>

# 如果 <ref> 是一个分支，也就是切换到该分支
git checkout <branch-name>

# 检出到一个分支，如果指定分支名不存在，则基于当前分支创建这个分支，并切换到该分支
git checkout -b <branch-name>

# 放弃工作区的全部变更
git checkout .

# 放弃工作区的某个文件的变更
git checkout [--] <file-path>

# 放弃工作区和暂存区的全部变更
git checkout -f
```

## git rm

`git rm` 用来删除文件，删除后会自动加入暂存区，但不会进行提交，需要自行确认是否需要提交。

```bash
# 删除某个文件，并暂存此操作，如果该文件有变更未提交，则不会删除，并抛出错误提示
git rm <file-path>

# 强制删除某个文件，即使这个文件有变更未提交
git rm --force <file-path>
git rm -f <file-path>

# 删除某个文件，如果该文件有变更未提交，则将所有变更放置到工作区并改编为 Untracked 状态，并将删除操作放置到暂存区
git rm --cached <file-path>
```
