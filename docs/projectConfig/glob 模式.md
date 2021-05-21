# glob模式

在学习gulp的过程中，gulp使用了被称作为glob的文件匹配模式。

接下来我们认识下什么是glob模式。

在计算机编程中，特别是类Unix环境，glob模式通过通配符来匹配文件名。例如：Unix命令，将所有以扩展名为 `.txt` 的文件从当前目录拷贝到 `textfiles` 目录。

```bash
mv *.txt textfiles/
```

这里 `*` 是一个匹配任意数量字符基本通配符，`*.txt`就表示一个glob模式。另一个通用的通配符是 `?`,它表示任意一个字符。

## 常用的通配符是 `*`, `?`, `[…]`

通配符 | 描述 | 例子 | 匹配 | 不匹配
-- | -- | -- | -- | --
`*` | 匹配任意数量的字符包括空字符 | `Law*` | Law, Laws, or Lawyer
| | | `*Law*` | Law, GrokLaw, or Lawyer.
? | 匹配任意一个字符 | ?at Cat, cat, Bat or bat | at
[abc] | 匹配任意一个包含的字符 | [CB]at | Cat or Bat | cat or bat
[a-z] | 匹配任意一个给定范围的字符 | Letter[0-9] | Letter0, Letter1 etc. | Letters or Letter

注意，在所有以上例子中路径分隔符（unix的 `/` ，windows的 `\` ）都不会被匹配。

## 在Linux和POSIX系统中 `[…]` 有以下两个扩展

通配符 | 描述 | 例子 | 匹配 | 不匹配
-- | -- | -- | -- | --
[!abc] | 不匹配任意一个包含的字符 | [!C]at Bat, bat, or cat | Cat
[!a-z] | 不匹配任意一个给定范围的字符 | Letter[!3-5] | Letter1, Letter2 etc. | Letter3, Letter4 or Letter5

## 与正则的比较

Glob的通配符 | 等价正则的表达式
-- | --
? | .
*| .*

Glob尝试匹配整个字符串，例如：

`S*.DOC` 将匹配 `S.DOC` 和 `SA.DOC` ,但不匹配 `POST.DOC` 或 `SURREY.DOCKS` ）

正则只匹配子串除非使用 `^` 和 `$` 。所以 `S*.DOC` 的等价正则是 `^S.*\.DOC$` 。

## node glob对常用通配符又做了一些扩展

通配符 | 描述 | 例子 | 匹配 | 不匹配
-- | -- | -- | -- | --
`**` | 匹配任意数量的字符包括空字符（包括路径分隔符） | `**/*.js` | /a/b/c.js
`!(pattern|pattern)` | 匹配除了()内以外的pattern | `!(abc|bcd)` | aaa,bbb | abc.bcd
`?(pattern|pattern)` | 匹配至多一个()内的pattern | `?(abc|bcd)` | abc | bbb
`+(pattern|pattern)` | 匹配至少一个()内的pattern | `+(abc|bcd)` | abc | bbb
`*(pattern|pattern)` | 匹配任意个()内的pattern | `*(abc|bcd)` | abc | bbb
`@(pattern|pattern)` | 精确匹配()内的其中一个pattern | `@(abc|bcd)` | abc | abd
