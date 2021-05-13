# git 常用命令

## 远程 `git remote`

```bash
# 查看关联的远程仓库的名称
git remote

# 查看当前远程信息
git remote [-v | --verbose]

# 为本地仓库添加远程仓库
git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>

# 重命名远程仓库
git remote rename <old> <new>

# 移除本地仓库的远程仓库（取消与某个远程仓库的关联）
git remote remove <name>

git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
git remote [-v | --verbose] show [-n] <name>
git remote prune [-n | --dry-run] <name>
git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
git remote set-branches [--add] <name> <branch>...
git remote get-url [--push] [--all] <name>
git remote set-url [--push] <name> <newurl> [<oldurl>]
git remote set-url --add <name> <newurl>
git remote set-url --delete <name> <url>
```
