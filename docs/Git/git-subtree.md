# git subtree 子仓库

git subtree 可以将一个仓库作为仓库的子仓库，各个仓库之前的版本管理是相对独立的，对于使用者来说，是透明的，可能使用者根本都不知道有子仓库的存在，主子仓库的分支同步，即你切换主项目分支的时候，关联的子仓库也会同步切换。

## git subtree 常用命令

运行 `git subtree -h` 可以看到：

```bash
git subtree add   --prefix=<prefix> <commit>
git subtree add   --prefix=<prefix> <repository> <ref>
git subtree merge --prefix=<prefix> <commit>
git subtree pull  --prefix=<prefix> <repository> <ref>
git subtree push  --prefix=<prefix> <repository> <ref>
git subtree split --prefix=<prefix> <commit>
```

通用参数：

```bash
-h, --help            show the help
-q                    quiet
-d                    show debug messages
-P, --prefix ...      the name of the subdir to split out
-m, --message ...     use the given message as the commit message for the merge commit
```

git `add`, `merge`, `pull` 可用的参数：

```bash
--squash              merge subtree changes as a single commit
```

`git split` 可用的参数：

```bash
--annotate ...        add a prefix to commit message of new commits
-b, --branch ...      create a new branch from the split subtree
--ignore-joins        ignore prior --rejoin commits
--onto ...            try connecting new tree to an existing one
--rejoin              merge the new branch back into HEAD
```

## 将多个独立仓库关联为父子仓库

在代码托管平台创建两个仓库，分别叫做 `main-project`, `utils`, 并全部克隆到本地，现在是空的仓库，先任意创建一些内容，然后推送到远程。

现在，每个仓库都有自己的内容了。 `main-project` 保存主项目的代码， `utils` 保存公用工具代码。只不过现在这些仓库各自独立，还没有任何联系。

开始将它们关联起来，以下操作都是在主仓库 `main-project` 下进行：

```bash
# 添加 utils 作为远程仓库 git@github.com:drylint/utils.git 的别名
# -f 表示添加远程仓库 utils 之后，立即执行 fetch 操作
git remote add -f utils git@github.com:drylint/utils.git

# 将 utils 仓库添加为当前主仓库的子仓库，并指定主仓库的某个目录作为子仓库的存放目录
# git subtree add --prefix=<子仓库目录路径> <子仓库地址/别名> <子仓库分支> --squash
# --prefix=utils 中的 utils 表示子仓库在主仓库的存放路径，此处表示根目录下的 utils 目录
# utils master 表示关联的仓库为 utils 远程下的 master 分支
# --squash 表示将子仓库中所有 commit 记录作为一次提交记录合并到主仓库中，以免在主仓库产生多条提交记录
git subtree add --prefix=utils utils master --squash
```

当远程仓库 `utils` 做出了一些修改时，将其更新到主仓库的 `utils` 目录中：

```bash
# 拉取远程仓库 utils 的 master 分支到当前项目下的 utils 目录
# git subtree pull --prefix=<子仓库目录路径> <子仓库地址/别名> <子仓库分支> --squash
git subtree pull  --prefix=utils utils master --squash
```

当在主项目中，对 `utils` 目录做出了一些修改，想要推送到子仓库 `utils` 中：

注意，先将主仓库的修改进行 commit 。

```bash
# 将主仓库中对子仓库的修改内容推送到子仓库 utils 中
# git subtree push --prefix=<子仓库目录路径> <子仓库地址/别名> <子仓库分支> --squash
git subtree push  --prefix=utils utils master --squash
```

至此，将两个毫不相关的仓库作为父子仓库的操作已经完成。

还有一种情况，一开始只有一个仓库，做到一定程度时，想要将某些公共模块抽离出来作为一个独立的子仓库。这样就可以在多个主仓库项目中关联并使用。

## 将一个仓库的目录分离为独立子仓库

现在的情况是，只有一个代码仓库，叫做 `main-project` ，其中有一个目录路径为 `src/styles` ，其中存放了很多公用样式代码，现在想将它分离出来作为一个独立的子仓库，以便于在多个项目中关联使用。

```bash
# 分离当前主仓库的某个目录，将其作为一个临时分支
# git subtree split --prefix=<子仓库目录路径> -b <临时分支名>
git subtree split --prefix=src/styles -b temp-styles
```

这一步将主仓库下 `src/styles` 目录分离出来作为一个临时分支叫做 `temp-styles`。

接下来在主仓库之外的任何地方创建一个子仓库，比如，在 `main-project` 同级目录下创建一个 `styles` 目录作为子仓库。

在子仓库 `styles` 下执行命令：

```bash
# 将 styles 目录初始化为一个 git 仓库
git init

# 拉取主仓库下创建的临时分支到子仓库来
git pull ../main-project temp-styles

# 添加远程仓库地址
git remote add origin git@github.com:drylint/styles.git

# 将内容推送到远程
git push -u origin master
```

到这一步，将主仓库下的 `src/styles` 目录独立分离出来作为一个仓库就完成了。

但是，目前还没有将主仓库 `main-project` 和独立出来的仓库 `styles` 关联为父子仓库。

接下来，回到主仓库 `main-project` 中，删除 `src/styles` 目录，删除创建的临时分支 `temp-styles` 。

到这一步，有了主仓库（但主仓库中没有 `styles` 目录了），有了 `styles` 仓库，又回到了第一种情况，将两个独立的仓库关联为父子仓库。

按照 [将多个独立仓库关联为父子仓库](#将多个独立仓库关联为父子仓库) 的步骤，就能完成关联操作了。

到这里，就已经完成了将一个主仓库的目录分离为独立子仓库，并将独立仓库关联为主仓库的子仓库。
