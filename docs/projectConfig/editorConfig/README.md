
```
# EditorConfig is awesome: https://EditorConfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

```

- windows 无法创建 `.editorconfig`，需要在末尾加个点 `.editorconfig.` 系统会自动去掉

```
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
# 告诉 EditorConfig 插件，这是根目录，不用继续往上查找
root = true

# Unix-style newlines with a newline ending every file
#  Unix | DOS | Mac风格的换行，并在每个文件末尾插入新的空行
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# 使用大括号表示法匹配多种文件。
# Set default charset
# 设置默认的编码格式
[*.{html,css,js,jsx,ts,tsx,vue}]
charset = utf-8

# 设置缩进风格为 tab 或 space 以及缩进大小
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
# 覆盖 lib 目录下所有JS的缩进设置
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
# 设置 Package.json 或 .travis.yml 文件
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2

```

#### Wildcard Patterns 通配符模式

| 符号          | 含义 |
| ------------- | ---- |
| *             | 匹配任何字符串，但路径分隔符除外(/) |
| **         |  匹配任何字符串的字符 |
| ?             |  匹配任何单个字符 |
| [name]     |  匹配 `[]` 中的 name |
| [!name]     |  不匹配 `[]` 中的 name |
| {s1,s2,s3} | 匹配任意一个以逗号隔开的字符串(有效版本 EditorConfig Core 0.11.0+) |
| {num1..num2} | 匹配num1 到 num2 之间的整数，两者可以为正负数 |

以上特殊字符可以用反斜杠（`\`）转义，这样它们就不会被解释为通配符模式。

#### 支持的属性

- indent_style: tab | space
- indent_size: interger(2 | 4) | tab (tab_width属性会生效)
- tab_width: interger
- end_of_line: lf | cr | | crlf
- charset: latin1 | utf-8 | utf-8-bom | utf-16be | utf-16le
- trim_trailing_whitespace: true | false
- insert_final_newline: true | false
- root: true | false
