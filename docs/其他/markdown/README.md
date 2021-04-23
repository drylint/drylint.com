# Markdown 全部语法手册

[toc]

Markdown 是一种由 HTML 演变出的一种快速写作语法，通过这些特殊的语法，可以生成一篇可读性强，干净利落的文章。

本文全文就是使用富文本编写的。

由于 Markdown 是由 HTML 演变而来，所以对于前端开发者来说尤其快速上手，当然，Markdown 本身也很简单，对于其他所有人来说，也是非常容易上手的。

## 文章段落标题

通过不同等级的标题，区分文章段落，比如，本文所有层级的标题都是由以下写法生成。

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

- 标题总共六级，对应 HTML 中的 `<h1>` 到 `<h6>` 元素。
- 一级标题应该用于文章标题，每篇文章应该且只应该出现一次一级标题。
- `#` 号和标题文本之间必须出现一个空格
- 标题应该逐级使用，不应该跳级使用，比如 `##` 标题下应该使用 `###` ，而不是 `####` 。

## 文章目录（Table Of Contents）

自动根据文章各个段落的标题，生成文章目录及相应锚点，点击目录可跳转到对应位置，你看到的本文的标题下面出现的目录就是自动生成的。

```markdown
[toc]
```

## 段落

划分段落需要使用空行来分隔段落。普通的换行实际上渲染出的效果没有换行。

效果：

这是第一行

这是第二行

```markdown
这是第一行

这是第二行
```

- 所有段落之间都应该留一行空行。

## 无序列表

书写一个无顺序的列表，对应 HTML 中的 `<ul>` 元素，像这样：

- 这是一行文字，随便写些什么
- 这是一行文字，随便写些什么
- 这是一行文字，随便写些什么

上面看到的无序列表是这样书写的：

```markdown
- 这是一行文字，随便写些什么
- 这是一行文字，随便写些什么
- 这是一行文字，随便写些什么
```

## 有序列表

书写一个有先后顺序的列表，对应 HTML 中的 `<ol>` 元素，像这样：

效果：

1. 这是第一步
2. 这是第二步
3. 这是第三步

语法：

```markdown
1. 这是第一步
2. 这是第二步
3. 这是第三步
```

## 超链接

给一段文本加上一个超链接，对应 HTML 中的 `<a>` 元素，像这样：

效果：

给 [百度](https://www.baidu.com/) 加上了超链接，可以点击跳转。

语法：

```markdown
[百度](https://www.baidu.com/)
```

### 直接将地址作为链接文本

效果：

<https://www.baidu.com/>

语法：

```markdown
<https://www.baidu.com/>
```

## 引用

当引用别处的一段文字时使用，对应 HTML 中的 `<blockquote>` 元素。

效果一：

> Markdown 是最适合用于写作的 —— 鲁迅

语法一：

```markdown
> Markdown 是最好的写作语法 —— 鲁迅
```

效果二：

> 这是一个引用
>
> 这是第二个引用

语法二：

```markdown
> 这是一个引用
>
> 这是第二个引用
```

效果三：

> 这是一个引用
>
>> 这是嵌套的引用

语法二：

```markdown
> 这是一个引用
>
>> 这是嵌套的引用
```

## 代码

分为行内代码和代码块。

### 行内代码

使用两个反引号将代码包裹起来

效果：

JavaScript 中声明常量的方式是 `const PI = 3.14` 。

语法：

```markdown
JavaScript 中声明常量的方式是 `const PI = 3.14` 。
```

### 代码块

开始和结尾分别用三个反引号包裹，开头的三个反引号之后紧接着书写代码使用的编程语言，以便于高亮显示代码块中的代码。

对应 HTML 中的 `<code>` 元素。

效果：

```js
const a = 1
const b = 2
const c = a + b
```

语法：

````markdown

```js
const a = 1
const b = 2
const c = a + b
```
````

常用编程语言标识：

语言 | 关键字
-- | --
C | cpp , c
Java | java
Python | py , python
PHP | php
Shell | bash , shell
C# | c# , c-sharp , csharp
CSS | css
JavaScript | js , jscript , javascript
text | text , plain
XML | xml , xhtml , xslt , html
R | r , s , splus
GO | go , golang
AppleScript | applescript
ActionScript | 3.0 actionscript3 , as3
ColdFusion | coldfusion , cf
Delphi | delphi , pascal , pas
diff&patch | diff patch
Erlang | erl , erlang
Groovy | groovy
JavaFX | jfx , javafx
Perl | perl , pl , Perl
Ruby | ruby , rails , ror , rb
SASS&SCSS | sass , scss
Scala | scala
SQL | sql
Visual Basic | vb , vbnet
Objective C | objc , obj-c
F# | f# f-sharp , fsharp
matlab | matlab
swift | swift

## 图片

插入一张图片，对应 HTML 中的 `<img>` 元素。

效果：

![百度 logo](https://www.baidu.com/img/flexible/logo/pc/result.png)

语法：

```markdown
![百度 logo](https://www.baidu.com/img/flexible/logo/pc/result.png)
```

## 表格

对应 HTML 中的 `<table>` 元素。

效果：

左对齐风格 | 居中对齐风格 | 右对齐风格
-- | :--: | --:
张三 | 20 | 北京
李四 | 25 | 上海
王五 | 18 | 四川

语法：

```markdown
左对齐风格 | 居中对齐风格 | 右对齐风格
-- | :--: | --:
张三 | 20 | 北京
李四 | 25 | 上海
王五 | 18 | 四川
```

- 所有单元格以竖线 `|` 分隔，第一行是表头，第二行是固定写法，之后的每一行是数据。
- 默认左对齐，也可以写 `:--` 显示指明左对齐
- 居中对齐写为 `:--:` ，右对齐写为 `--:`

## 脚注

用于标注一个注解，表示该注解将会在文章末尾出现，类似于论文中出现的引用需要在末尾标明作者及出处等信息。

效果：

一切能用 JS 写的都将用 JS 来写。[^1]

[^1]: 出自某网站。

语法：

```markdown

一切能用 JS 写的都将用 JS 来写。[^1]

[^1]: 出自某网站。

```

## 待办任务列表

用于表示待办列表，及已完成，未完成等信息。

效果：

- [x] 看书
- [x] 写文章
- [ ] 锻炼

语法：

```markdown
- [x] 看书
- [x] 写文章
- [ ] 锻炼

```

## 水平线

对应 HTML 中的 `<hr>` 元素

效果：

---

语法：

```markdown
---
```

## 删除线

文字中部的删除线，对应 HTML 中的 `<del>` 元素。

效果：

原价：~~99 元~~，现价：80 元。

语法：

```markdown
原价：~~99 元~~，现价：80 元。
```

## 加粗

对应 HTML 中的 `<b>` 元素。

效果：

这是 **一段加粗文本**

语法：

```markdown
这是 **一段加粗文本**
```

## 斜体

对应 HTML 中的 `<em>` 元素。

效果：

这是 *一段斜体文本*

语法：

```markdown
这是 *一段斜体文本*
```

## 粗体 + 斜体

效果：

这是 ***粗体加斜体***

语法：

```markdown
这是 ***粗体加斜体***
```

## 转义字符

Markdown 中的符号如果不想被当做 Markdown 标记时，使用 `\` 进行转义。

效果：

\# 如果没有使用反斜线，本行文本将会是一个一级标题

语法：

```markdown
\# 如果没有使用反斜线，本行文本将会是一个一级标题
```

## 上标

使用 `^` 表示一个上标，对应 HTML 中的 `<sub>` 元素。

效果：

平方米的表示方法：m^2^

语法：

```markdown
平方米的表示方法：m^2^
```

## 下标

使用 `^` 表示一个上标，对应 HTML 中的 `<sup>` 元素。

效果：

氧气表示方法：O~2~

语法：

```markdown
氧气表示方法：O~2~
```

## 公式

### 行内公式

文本两侧使用一个 `$` 表示。

效果：

$E=mc^2$

语法：

```markdown
$E=mc^2$
```

### 块级公式

文本两侧使用两个 `$` 表示。

效果：

$$E=mc^2$$

语法：

```markdown
$$E=mc^2$$
```
