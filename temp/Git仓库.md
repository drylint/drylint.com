# Git 仓库

[github](https://github.com/drylint/drylint.com.git)
[coding](https://e.coding.net/drylint/vuepress-template/vuepress-template.git)
[gitee](https://gitee.com/drylint/vuepress-template.git)

添加到远程 origin 地址

```bash
git remote set-url --add origin https://e.coding.net/drylint/vuepress-template/vuepress-template.git
git remote set-url --add origin https://gitee.com/drylint/vuepress-template.git
```

subtree 和 gh-pages

```bash
git subtree add --prefix=pages origin gh-pages --squash
git subtree push --prefix=pages origin gh-pages --squash
```
