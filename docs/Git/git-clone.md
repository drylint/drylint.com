# git clone 指令及所有参数

[toc]

语法：

```git
git clone [<options>] [--] <repository> [<directory>]
```

`<options>` 的取值：

```git
--recursive[=<pathspec>]
                      alias of --recurse-submodules
--dissociate          use --reference only while cloning

-4, --ipv4            use IPv4 addresses only
-6, --ipv6            use IPv6 addresses only
--sparse              initialize sparse-checkout file to include only files at root

```

## OPTIONS

### `-l`, `--local` 从本地存储库克隆

When the repository to clone from is on a local machine,
this flag bypasses the normal "Git aware" transport
mechanism and clones the repository by making a copy of
HEAD and everything under objects and refs directories.
The files under `.git/objects/` directory are hardlinked
to save space when possible.

If the repository is specified as a local path (e.g., `/path/to/repo`),
this is the default, and --local is essentially a no-op.  If the
repository is specified as a URL, then this flag is ignored (and we
never use the local optimizations).  Specifying `--no-local` will
override the default when `/path/to/repo` is given, using the regular
Git transport instead.

**NOTE**: this operation can race with concurrent modification to the
source repository, similar to running `cp -r src dst` while modifying
`src`.

### `--no-hardlinks` 不要使用本地硬链接，总是复制

Force the cloning process from a repository on a local
filesystem to copy the files under the `.git/objects`
directory instead of using hardlinks. This may be desirable
if you are trying to make a back-up of your repository.

### `-s`, `--shared` 设置为共享存储仓库

When the repository to clone is on the local machine,
instead of using hard links, automatically setup
`.git/objects/info/alternates` to share the objects
with the source repository.  The resulting repository
starts out without any object of its own.

**NOTE**: this is a possibly dangerous operation; do **not** use
it unless you understand what it does. If you clone your
repository using this option and then delete branches (or use any
other Git command that makes any existing commit unreferenced) in the
source repository, some objects may become unreferenced (or dangling).
These objects may be removed by normal Git operations (such as `git commit`)
which automatically call `git maintenance run --auto`. (See
[git-maintenance[1]](/docs/git-maintenance).) If these objects are removed and were referenced
by the cloned repository, then the cloned repository will become corrupt.

Note that running `git repack` without the `--local` option in a repository
cloned with `--shared` will copy objects from the source repository into a pack
in the cloned repository, removing the disk space savings of `clone --shared`.
It is safe, however, to run `git gc`, which uses the `--local` option by
default.

If you want to break the dependency of a repository cloned with `--shared` on
its source repository, you can simply run `git repack -a` to copy all
objects from the source repository into a pack in the cloned repository.

### `--reference[-if-able] <repository>` 关联仓库

If the reference repository is on the local machine,
automatically setup `.git/objects/info/alternates` to
obtain objects from the reference repository.  Using
an already existing repository as an alternate will
require fewer objects to be copied from the repository
being cloned, reducing network and local storage costs.
When using the `--reference-if-able`, a non existing
directory is skipped with a warning instead of aborting
the clone.

**NOTE**: see the NOTE for the `--shared` option, and also the
`--dissociate` option.

### `--dissociate`

Borrow the objects from reference repositories specified
with the `--reference` options only to reduce network
transfer, and stop borrowing from them after a clone is made
by making necessary local copies of borrowed objects.  This
option can also be used when cloning locally from a
repository that already borrows objects from another
repository&#8212;&#8203;the new repository will borrow objects from the
same repository, and this option can be used to stop the
borrowing.

### `-q`, `--quiet` 静默模式运行

安静地运作。不将进展过程情况报告给标准错误流。

### `-v`, `--verbose` 更详细的运行

Run verbosely. Does not affect the reporting of progress status
to the standard error stream.

### `--progress` 强制报告进展过程

Progress status is reported on the standard error stream
by default when it is attached to a terminal, unless `--quiet`
is specified. This flag forces progress status even if the
standard error stream is not directed to a terminal.

### `--server-option=<option>` 选择性地传输

Transmit the given string to the server when communicating using
protocol version 2.  The given string must not contain a NUL or LF
character.  The server&#8217;s handling of server options, including
unknown ones, is server-specific.
When multiple `--server-option=<option>` are given, they are all
sent to the other side in the order listed on the command line.

### `-n`, `--no-checkout` 不要创建检查

No checkout of HEAD is performed after the clone is complete.

### `--bare` 创建空存储库

Make a *bare* Git repository.  That is, instead of
creating `<directory>` and placing the administrative
files in `<directory>/.git`, make the `<directory>`
itself the `$GIT_DIR`. This obviously implies the `--no-checkout`
because there is nowhere to check out the working tree.
Also the branch heads at the remote are copied directly
to corresponding local branch heads, without mapping
them to `refs/remotes/origin/`.  When this option is
used, neither remote-tracking branches nor the related
configuration variables are created.

### `--sparse` 初始化稀疏签出文件，使其只包含文件

Initialize the sparse-checkout file so the working
directory starts with only the files in the root
of the repository. The sparse-checkout file can be
modified to grow the working directory as needed.

### `--filter=<filter-spec>` 对象过滤

Use the partial clone feature and request that the server sends
a subset of reachable objects according to a given object filter.
When using `--filter`, the supplied `<filter-spec>` is used for
the partial clone filter. For example, `--filter=blob:none` will
filter out all blobs (file contents) until needed by Git. Also,
`--filter=blob:limit=<size>` will filter out all blobs of size
at least `<size>`. For more details on filter specifications, see
the `--filter` option in [git-rev-list[1]](/docs/git-rev-list).

### `--mirror` 创建一个镜像存储库(即空存储库)

Set up a mirror of the source repository.  This implies `--bare`.
Compared to `--bare`, `--mirror` not only maps local branches of the
source to local branches of the target, it maps all refs (including
remote-tracking branches, notes etc.) and sets up a refspec configuration such
that all these refs are overwritten by a `git remote update` in the
target repository.

### `-o <name>`, `--origin <name>` 使用自定义 `<name>` 代替 `origin`

Instead of using the remote name `origin` to keep track of the upstream
repository, use `<name>`.  Overrides `clone.defaultRemoteName` from the
config.

### `-b <name>`, `--branch <name>` 指定某个分支 `<branch>` 而不是远程的 `HEAD`

Instead of pointing the newly created HEAD to the branch pointed
to by the cloned repository&#8217;s HEAD, point to `<name>` branch
instead. In a non-bare repository, this is the branch that will
be checked out.
`--branch` can also take tags and detaches the HEAD at that commit
in the resulting repository.

### `-u <upload-pack>`, `--upload-pack <upload-pack>` 远程 git-upload-pack 的路径

When given, and the repository to clone from is accessed
via ssh, this specifies a non-default path for the command
run on the other end.

### `--template=<template_directory>` 将被使用的模板的目录

Specify the directory from which templates will be used;
(See the "TEMPLATE DIRECTORY" section of [git-init[1]](/docs/git-init).)

### `-c <key>=<value>`, `--config <key>=<value>` 在新的仓库中设置 config

Set a configuration variable in the newly-created repository;
this takes effect immediately after the repository is
initialized, but before the remote history is fetched or any
files checked out.  The key is in the same format as expected by
[git-config[1]](/docs/git-config) (e.g., `core.eol=true`). If multiple
values are given for the same key, each value will be written to
the config file. This makes it safe, for example, to add
additional fetch refspecs to the origin remote.

Due to limitations of the current implementation, some configuration
variables do not take effect until after the initial fetch and checkout.
Configuration variables known to not take effect are:
`remote.<name>.mirror` and `remote.<name>.tagOpt`.  Use the
corresponding `--mirror` and `--no-tags` options instead.

### `--depth <depth>` 创造一个指定深度 `<depth>` 的浅层克隆

Create a *shallow* clone with a history truncated to the
specified number of commits. Implies `--single-branch` unless
`--no-single-branch` is given to fetch the histories near the
tips of all branches. If you want to clone submodules shallowly,
also pass `--shallow-submodules`.

### `--shallow-since=<date>` 从指定时间进行浅克隆

Create a shallow clone with a history after the specified time.

### `--shallow-exclude=<revision>` 浅克隆的历史中排除 `<revision>`

Create a shallow clone with a history, excluding commits
reachable from a specified remote branch or tag.  This option
can be specified multiple times.

### `--[no-]single-branch` 只克隆一个分支，`HEAD` 或指定 `--branch <分支>`

Clone only the history leading to the tip of a single branch,
either specified by the `--branch` option or the primary
branch remote&#8217;s `HEAD` points at.
Further fetches into the resulting repository will only update the
remote-tracking branch for the branch this option was used for the
initial cloning.  If the HEAD at the remote did not point at any
branch when `--single-branch` clone was made, no remote-tracking
branch is created.

### `--no-tags` 不克隆任何 tag 标签，并使以后的取回不跟随他们

Don&#8217;t clone any tags, and set
`remote.<remote>.tagOpt=--no-tags` in the config, ensuring
that future `git pull` and `git fetch` operations won&#8217;t follow
any tags. Subsequent explicit tag fetches will still work,
(see [git-fetch[1]](/docs/git-fetch)).

Can be used in conjunction with `--single-branch` to clone and
maintain a branch with no references other than a single cloned
branch. This is useful e.g. to maintain minimal clones of the default
branch of some repository for search indexing.

### `--recurse-submodules[=<pathspec>]` 初始化克隆中的子模块

After the clone is created, initialize and clone submodules
within based on the provided pathspec.  If no pathspec is
provided, all submodules are initialized and cloned.
This option can be given multiple times for pathspecs consisting
of multiple entries.  The resulting clone has `submodule.active` set to
the provided pathspec, or "." (meaning all submodules) if no
pathspec is provided.

Submodules are initialized and cloned using their default settings. This is
equivalent to running
`git submodule update --init --recursive <pathspec>` immediately after
the clone is finished. This option is ignored if the cloned repository does
not have a worktree/checkout (i.e. if any of `--no-checkout`/`-n`, `--bare`,
or `--mirror` is given)

### `--[no-]shallow-submodules` 任何克隆的子模块都是（或不是）浅克隆

All submodules which are cloned will be shallow with a depth of 1.

### `--[no-]remote-submodules` 任何克隆的子模块都使用（或不使用）它们的远程跟踪分支

All submodules which are cloned will use the status of the submodule&#8217;s
remote-tracking branch to update the submodule, rather than the
superproject&#8217;s recorded SHA-1. Equivalent to passing `--remote` to
`git submodule update`.

### `--separate-git-dir=<git dir>` 将 git 目录与工作树分开

Instead of placing the cloned repository where it is supposed
to be, place the cloned repository at the specified directory,
then make a filesystem-agnostic Git symbolic link to there.
The result is Git repository can be separated from working
tree.

### `-j <n>`, `--jobs <n>` 并行克隆的子模块数量

The number of submodules fetched at the same time.
Defaults to the `submodule.fetchJobs` option.

### `<repository>`

The (possibly remote) repository to clone from.  See the
[GIT URLS](#URLS) section below for more information on specifying
repositories.

### `<directory>`

The name of a new directory to clone into.  The "humanish"
part of the source repository is used if no directory is
explicitly given (`repo` for `/path/to/repo.git` and `foo`
for `host.xz:foo/.git`).  Cloning into an existing directory
is only allowed if the directory is empty.
