#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm build

# 进入生成的文件夹
cd dist
git init
git config user.name drylint
git config user.email drylint@qq.com
git remote add origin https://github.com/drylint/drylint.com.git
git remote set-url --add origin https://gitee.com/drylint/drylint.com.git
git add -A
git commit -m 'deploy'

# 推送到远程仓库的 gh-pages 分支
git push -f origin master:gh-pages

cd -
