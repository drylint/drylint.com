# git SSH 远程仓库连接

[toc]

> 同一个邮箱账户生成的 ssh-keygen 可以在所有平台共用，不需要单独配置。
> 只有在需要使用多邮箱账户的情况下，才需要生成不同的 ssh-keygen 来连接不同的账号。

## 一、使用电子邮箱创建 ssh-key

打开命令行终端，按照如下步骤进行创建：

### 1. 开始创建对应邮箱的 ssh-key

```bash
ssh-keygen -t rsa -C "user1@email.com"
```

### 2. 配置要创建的 ssh-key 的相关信息

上一步按下 enter 后会有三个步骤的命令，依次为：

```bash
Generating public/private rsa key pair.

# 第一步：确认 ssh 存放路径及名称
# 括号中的提示表示默认存储在  C:/Users/xxx/.ssh/ 目录中，名称为 id_rsa。
# 通常只需要修改名称，路径不用更改，但修改名称也需要写完整路径及名称。
Enter file in which to save the key (C:\Users\xxx/.ssh/id_rsa): C:\Users\xxx/.ssh/id_rsa_user1

# 第一步按下 Enter 之后，如果已经存在同路径同名的 ssh-key，会提示已经存在
# 并且会询问是否要进行覆盖，按下 y 则覆盖，按 n 则会退出当前操作。
# 如果不存在同路径同名的 ssh-key，则不会被覆盖


# 第二步：填写 ssh 口令（相当于于密码），默认为不需要口令
# 口令是以后在使用 ssh 推拉代码时的安全验证，如果不需要的话直接按 enter 即可。
# 比如此处设置一个口令，注意：输入时是不会显示已输入字符的。
Enter passphrase (empty for no passphrase):123456

# 第三步：再次输入刚才设置的口令以确认，若第二步未设置，此处直接按 enter 即可。
Enter same passphrase again:123456

# 完成的提示如下：
Your identification has been saved in C:/Users/xxx/.ssh/id_rsa_user1.
Your public key has been saved in C:/Users/xxx/.ssh/id_rsa_user1.pub.
The key fingerprint is:

The key's randomart image is:
```

以上的第一步和第二步也可以使用一条命令设置

```bash
ssh-keygen -t rsa -C "user1@email.com" -f "C:\Users\xxx/.ssh/id_rsa_user1"
```

### 3. 查看已创建的 ssh

在硬盘中打开路径 `C:\Users\xxx/.ssh/` 有以下文件：

```bash
# 文件列表

id_rsa_user1
id_rsa_user1.pub
```

## 二、将创建的 ssh 密钥添加到对应的平台中

将对应的 `.pub` 文件用记事本打开并将全部内容复制到对应的平台中添加 ssh 密钥

## 三、创建（或修改）config 文件解决 ssh 冲突

### 1. 在 `.ssh` 目录中创建 config 文件

命令行创建：

```bash
touch config # 创建config文件
vim config # 编辑此文件
```

windows创建：

新建文本文档 config.txt 后将后缀 `.txt` 去掉即可。

### 2. config 文件中写入配置

```bash
# Host 相当于取一个别名，可以自定义为任意的名字，推荐就以 HostName 的值为别名
Host github # 取别名为 github
HostName github.com # 别名对应的主机名，也就是仓库对应地址中的主机名
PreferredAuthentications publickey # 固定写法
IdentityFile ~/.ssh/id_rsa_github # 读取哪一个 ssh-key 的私钥
```

例如，现有仓库地址：`git@github.com:xxx/mytest.git`（xxx为用户名），要将其 `clone` 到本地

```bash
git clone git@github.com:xxx/mytest.git # 原写法

git clone git@mygithub:xxx/mytest.git # 自定义配置 config 后的写法
```

执行自定义写法时，程序会拿着命令中的 Host：`github` 去 config 中寻找配置好的同名 Host，找到后就会使用其对应的 HostName 将其替换，并使用 `IdentityFile` 指定的 ssh 作为验证密钥。

## 四、应用场景

比如需要使用不同的邮箱在不同的平台推拉代码（`gitee.com` / `coding.com` / `git.dev.tencent.com`），gitee 使用一个邮箱 `user1@email.com`，coding 和 tencent 使用另一个邮箱 `user2@email.com`。

第1步，使用 `user1@email.com` 生成 ssh key 命名为 `id_rsa_gitee`，使用 `user2@email.com` 生成 ssh key 命名为 `id_rsa_coding`。

第2步，将各自生成的 `.pub` 文件内容全部复制并添加到对应平台的 ssh 管理中。

第3步，在 `.ssh` 目录中生成配置文件并配置：

```bash
# 可以将 Host 命名为 HostName 的值，在访问时就不需要有任何地方的手动修改替换命令

# gitee
Host gitee.com
HostName gitee.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitee

# coding
Host coding
HostName coding.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_coding

# git.dev.tencent.com
Host git.dev.tencent.com
HostName git.dev.tencent.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_coding
```

第4步，将 ssh 密钥添加到 SSH agent 中，因为各平台默认只读取 `c/users/xx/.ssh/` 目录下，文件名为 `id_rsa` 的密钥，为了让各平台识别config中指定的密钥，需将其添加到SSH agent中：

- 将每个密钥添加到SSH agent中，依次执行：

```bash
ssh-add ~/.ssh/id_rsa_coding
ssh-add ~/.ssh/id_rsa_gitee
ssh-add ~/.ssh/id_rsa_github
```

- 如果出现 `Could not open a connection to your authentication agent` 的错误，就试着用以下命令后再执行(1)中的所有操作

```bash
ssh-agent bash
```

- 通过 `ssh-add -l` 来确私钥列表

```bash
ssh-add -l
```

- 可以通过 `ssh-add -D` 来清空私钥列表

```bash
ssh-add -D
```

第5步，测试是否与平台连接成功

```bash
ssh -T git@github.com
# Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.

ssh -T git@gitee.com
# Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.

ssh -T git@git.dev.tencent.com
# 你好，你已经通过 SSH 协议认证 Coding.net 服务，这是一个个人公钥
```

第6步，尝试克隆 xxusername 账号下的远程仓库 mytest, 则命令如下：

```bash
git clone git@gitee.com:xxusername/mytest.git

git clone git@coding.com:xxusername/mytest.git

git clone git@git.dev.tencent.com:xxusername/mytest.git
```

至此，即配置完成多邮箱账号使用 ssh 连接各平台的方式。
