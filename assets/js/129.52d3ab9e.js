(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{336:function(s,n,a){"use strict";a.r(n);var t=a(6),e=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"markdownlint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#markdownlint"}},[s._v("#")]),s._v(" markdownlint")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/DavidAnson/markdownlint",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/DavidAnson/markdownlint"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置文件"}},[s._v("#")]),s._v(" 配置文件")]),s._v(" "),a("p",[s._v("配置文件优先级从高到低依次为：")]),s._v(" "),a("ul",[a("li",[s._v(".markdownlint{.json,.yaml,.yml,rc} file in the same directory")]),s._v(" "),a("li",[s._v(".markdownlint{.json,.yaml,.yml,rc} file in a parent directory")]),s._v(" "),a("li",[s._v(".markdownlint{.json,.yaml,.yml,rc} file in the root of the project")]),s._v(" "),a("li",[s._v("Visual Studio Code user/workspace settings")]),s._v(" "),a("li",[s._v("Default configuration (see above)")])]),s._v(" "),a("h2",{attrs:{id:"rules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rules"}},[s._v("#")]),s._v(" rules")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md"),a("OutboundLink")],1)]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("MD001 - Heading levels should only increment by one level at a "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("time")]),s._v("\n标题级数每次只能扩大1, 也就是不能隔级创建标题（从1级到6级的顺序）\n\nMD002 - First heading should be a "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("top")]),s._v(" level heading\n文档的第一个标题必须是最高级的标题（标题等级1级到6级逐渐降低）\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"level"')]),s._v("：指定最高级标题的级数，默认是1\n\nMD003 - Heading style\n整篇文档要采用一致的标题格式\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"style"')]),s._v("：字符串，指定文档标题的格式，有"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx_closed"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext_with_atx"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext_with_atx_closed"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("五种，默认是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v("，也就是整篇文档一致\n\n标题格式必须统一，一般不能混用，但"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext_with_atx"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext_with_atx_closed"')]),s._v("格式可以在"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"setext"')]),s._v("格式二级标题后接着使用"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx"')]),s._v("或"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx_closed"')]),s._v("格式的标题\n\nMD004 - Unordered list style\n整篇文档定义无序列表的格式要一致\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"style"')]),s._v("：字符串，指定无序列表的定义格式，有"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"asterisk"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"plus"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"dash"')]),s._v(", "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"sublist"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("五种，分别表示“定义时符号前后一致”，“用星号定义”，“用加号定义”，“用减号定义”，“定义多重列表时用不同的符号定义”，默认是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v("\n\nMD005 - Inconsistent indentation "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" list items at the same level\n同一级的列表缩进必须一致\n在有序列表中，前面的数字序号可以左对齐，也可以右对齐\n\nMD006 - Consider starting bulleted lists at the beginning of the line\n"),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("级列表不能缩进\n\nMD007 - Unordered list indentation\n无序列表嵌套缩进时默认采用两个空格\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ident"')]),s._v("：指定无序列表嵌套时缩进的空格数，默认是2\n\nMD009 - Trailing spaces\n行尾最多可以添加两个空格，超过会给出警告，两个空格正好可以用于换行\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"br_spaces"')]),s._v("：指定在行尾可以添加的空格数目，空格数目建议大于等于2，如果小于2，会默认为0，也就是不允许任何行尾的空格\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"list_item_empty_lines"')]),s._v("：字符串，指定在列表中是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("用默认的空格数缩进空行，有的解释器会要求列表中的空行要缩进\n\nMD010 - Hard tabs\n不能使用tab键缩进，要使用空格\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"code_blocks"')]),s._v("：指定本条规则在代码块里是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("生效\n\nMD011 - Reversed "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" syntax\n检查内联形式的链接的创建方式是否错误，中括号和圆括号是否用对\n\nMD012 - Multiple consecutive blank lines\n文档中不能有连续的空行，在代码块中此规则不会生效\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"maximum"')]),s._v("：指定文档中可以连续的最多空行数，默认值是1\n\nMD013 - Line length\n默认行的最大长度是80，此规则对代码块、表格、标题也生效\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"line_length"')]),s._v("：指定行的最大长度，默认是80\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"heading_line_length"')]),s._v("：指定标题行的最大长度，默认是80\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"code_blocks"')]),s._v("：指定规则是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("对代码块生效，默认true\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"tables"')]),s._v("：指定规则是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("对表格生效，默认true\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"hesdings"')]),s._v("：指定规则是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("对标题生效，默认true\n\nMD014 - Dollar signs used before commands without showing output\n在代码块中，终端命令前不需要有美元符号"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n如果代码块中既有终端命令，也有命令的输出，则终端命令前可以有美元符号"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，如：\n\n在"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx"')]),s._v("格式的标题中，"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#号和文字间需用一个空格隔开")]),s._v("\n\nMD019 - Multiple spaces after "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("hash")]),s._v(" on atx style heading\n在"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"atx"')]),s._v("格式的标题中，"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#号和文字间只能用一个空格隔开，不能有多余的空格")]),s._v("\n\nMD020 - No space inside hashes on closed atx style heading\n在"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"closed_atx"')]),s._v("格式的标题中，文字和前后的"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#号之间需用一个空格隔开")]),s._v("\n\nMD021 - Multiple spaces inside hashes on closed atx style heading\n在"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"closed_atx"')]),s._v("格式的标题中，文字和前后的"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#号之间只能用一个空格隔开，不能有多余的空格")]),s._v("\n\nMD022 - Headings should be surrounded by blank lines\n标题行的上下行必须都是空行\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"lines_above"')]),s._v("：指定标题行上方的空行数，默认为1，可以设为更大或0\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"lines_below"')]),s._v("：指定标题行下方的空行数，默认为1，可以设为更大或0\n\n注意当此处的空行设为比1大的数时，规则MD012的设置也要改\n\nMD023 - Headings must start at the beginning of the line\n标题行不能缩进\n\nMD024 - Multiple headings with the same content\n文档不能有内容重复的标题\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"siblings_only"')]),s._v("：默认为false，设为true时，不同标题下的子标题内容可以重复\n\nMD025 - Multiple "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("top")]),s._v(" level headings "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" the same document\n同一文档只能有一个最高级的标题，默认是只能有一个1级标题\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"level"')]),s._v("：指定文档最高级的标题，默认是1\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"front_matter_title"')]),s._v("：字符串，指定在文档开头处的front matter中的标题，这个标题将作为整篇文档的最高级标题，如果文档中再次出现最高级标题，将会给出警告，另外，如果不想在front matter中指定标题，就把本参数的值设置为"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v("\n\nMD026 - Trailing punctuation "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" heading\n标题行末尾不能有以下标点符号："),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('".,;:!?"')]),s._v("\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"punctuation"')]),s._v("：字符串，指定标题行尾不能有的标点符号，默认是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('".,;:!?"')]),s._v("\n\n此规则默认的是英文的标点符号，中文标点符号不在规则之内\n\nMD027 - Multiple spaces after blockquote symbol\n创建引用区块时，右尖括号 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 和文字之间有且只能有一个空格\n\nMD028 - Blank line inside blockquote\n两个引用区块间不能仅用一个空行隔开或者同一引用区块中不能有空行，如果一行中没有内容，则这一行要用"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("开头\n\nMD029 - Ordered list item prefix\n有序列表的前缀序号格式必须只用1或者从1开始的加1递增数字"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"one_or_ordered"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"style"')]),s._v("：字符串，指定前缀序号的格式，"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"one"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ordered"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"one_or_ordered"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"zero"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，分别表示只用1做前缀，用从1开始的加1递增数字做前缀，只用1或者从1开始的加1递增数字做前缀，只用0做前缀，默认值是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"one_or_ordered"')]),s._v("\n\n本条规则支持在前缀序号中补0，以实现对齐，如：\n\nMD030 - Spaces after list markers\n列表（有序、无序）的前缀符号和文字之间用1个空格隔开\n在列表嵌套或者同一列表项中有多个段落时，无序列表缩进两个空格，有序列表缩进3个空格\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ul_single"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ol_single"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ul_multi"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"ol_multi"')]),s._v("：分别规定无序列表单个段落，有序列表单个段落，无序列表多个段落，有序列表多个段落的前缀符号和文字之间的空格数，默认是1\n\nMD031 - Fenced code blocks should be surrounded by blank lines\n单独的代码块前后需要用空行隔开（除非是在文档开头或末尾），否则有些解释器不会解释为代码块\n\nMD032 - Lists should be surrounded by blank lines\n列表（有序、无序）前后需要用空行隔开，否则有些解释器不会解释为列表\n列表的缩进必须一致，否则会警告\n\nMD033 - Inline HTML\n文档中不允许使用HTML语句\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"allowed_elements"')]),s._v("：自定义允许的元素，是一个字符串数组，默认是空"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("empty"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nMD034 - Bare URL used\n单纯的链接地址需要用尖括号 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<>")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 包裹，否则有些解释器不会解释为链接\n\nMD035 - Horizontal rule style\n创建水平线时整篇文档要统一"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("consistent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，要和文档中第一次创建水平线使用的符号一致\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"style"')]),s._v("：字符串，指定创建水平线的方式，值有："),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"***"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"---"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"___"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，默认是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v("\n\nMD036 - Emphasis used instead of a heading\n不能用强调代替标题\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"punctuation"')]),s._v("：字符串，指定用于结尾的标点符号，以此符号结尾的强调不会被视为以强调代替标题，默认值是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('".,;:!?"')]),s._v("\n\n此规则会检查只包含强调的单行段落，如果这种段落不是以指定的标点符号结尾，则会被视为以强调代替标题，会给出警告\n\nMD037 - Spaces inside emphasis markers\n用于创建强调的符号和强调的的文字之间不能有空格\n\nMD038 - Spaces inside code span elements\n当用单反引号创建代码段的时候，单反引号和它们之间的代码不能有空格\n如果要把单反引号嵌入到代码段的首尾，创建代码段的单反引号和嵌入的单反引号间要有一个空格隔开\n\nMD039 - Spaces inside "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" text\n链接名和包围它的中括号之间不能有空格，但链接名中间可以有空格，如：\n\n　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("百 度"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("http://www.baidu.com "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"百 度"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\nMD040 - Fenced code blocks should have a language specified\n单独的代码块（此处是指上下用三个反引号包围的代码块）应该指定代码块的编程语言，这一点有助于解释器对代码进行代码高亮\n\nMD041 - First line "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("in")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" should be a "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("top")]),s._v(" level heading\n文档的第一个非空行应该是文档最高级的标题，默认是1级标题\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"level"')]),s._v("：指定文档最高级的标题，默认是1\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"front_matter_title"')]),s._v("：字符串，指定在文档开头处的front matter中的标题，这个标题将作为整篇文档的最高级标题，另外，如果不想在front matter中指定标题，就把本参数的值设置为"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('""')]),s._v("\n\nMD042 - No empty links\n链接的地址不能为空\n\nMD043 - Required heading structure\n要求标题遵循一定的结构，默认是没有规定的结构"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"null"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"headings"')]),s._v("：字符串数组，指定标题需要遵循的结构，默认是"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"null"')]),s._v("，可以自行指定结构，如；\n\n星号"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("*"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("表示对应的标题是可选的，没有强制要求，本条具体可以参照MD043\n\nMD044 - Proper names should have the correct capitalization\n指定一些名称，会检查它是否有正确的大写\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"names"')]),s._v("：字符串数组，指定要检查需要大写的名称，默认是空"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"null"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"code_blocks"')]),s._v("：指定本规则是否"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("true or "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("对代码块生效，默认是true\n一些经常使用的名称可以使用本规则防止其拼写错误，比如JavaScript中字母J和S需要大写，就可以写到参数"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"names"')]),s._v("中，防止写错\n\nMD045 - Images should have alternate text "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("alt text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n图片链接必须包含描述文本（alt text）\n\nMD046 - Code block style\n整篇文档采用一致的代码格式\n\n参数：\n"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"style"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" 字符串，指定代码块定义格式，有（"),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"consistent"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"fenced"')]),s._v(","),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"indented"')]),s._v("）三种，分别代表：文档上下文一致，使用三个反引号隔开，使用缩进，默认是上下文一致\n\nMD047 - Files should end with a single newline character\n文档需用一个空行结尾\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br"),a("span",{staticClass:"line-number"},[s._v("52")]),a("br"),a("span",{staticClass:"line-number"},[s._v("53")]),a("br"),a("span",{staticClass:"line-number"},[s._v("54")]),a("br"),a("span",{staticClass:"line-number"},[s._v("55")]),a("br"),a("span",{staticClass:"line-number"},[s._v("56")]),a("br"),a("span",{staticClass:"line-number"},[s._v("57")]),a("br"),a("span",{staticClass:"line-number"},[s._v("58")]),a("br"),a("span",{staticClass:"line-number"},[s._v("59")]),a("br"),a("span",{staticClass:"line-number"},[s._v("60")]),a("br"),a("span",{staticClass:"line-number"},[s._v("61")]),a("br"),a("span",{staticClass:"line-number"},[s._v("62")]),a("br"),a("span",{staticClass:"line-number"},[s._v("63")]),a("br"),a("span",{staticClass:"line-number"},[s._v("64")]),a("br"),a("span",{staticClass:"line-number"},[s._v("65")]),a("br"),a("span",{staticClass:"line-number"},[s._v("66")]),a("br"),a("span",{staticClass:"line-number"},[s._v("67")]),a("br"),a("span",{staticClass:"line-number"},[s._v("68")]),a("br"),a("span",{staticClass:"line-number"},[s._v("69")]),a("br"),a("span",{staticClass:"line-number"},[s._v("70")]),a("br"),a("span",{staticClass:"line-number"},[s._v("71")]),a("br"),a("span",{staticClass:"line-number"},[s._v("72")]),a("br"),a("span",{staticClass:"line-number"},[s._v("73")]),a("br"),a("span",{staticClass:"line-number"},[s._v("74")]),a("br"),a("span",{staticClass:"line-number"},[s._v("75")]),a("br"),a("span",{staticClass:"line-number"},[s._v("76")]),a("br"),a("span",{staticClass:"line-number"},[s._v("77")]),a("br"),a("span",{staticClass:"line-number"},[s._v("78")]),a("br"),a("span",{staticClass:"line-number"},[s._v("79")]),a("br"),a("span",{staticClass:"line-number"},[s._v("80")]),a("br"),a("span",{staticClass:"line-number"},[s._v("81")]),a("br"),a("span",{staticClass:"line-number"},[s._v("82")]),a("br"),a("span",{staticClass:"line-number"},[s._v("83")]),a("br"),a("span",{staticClass:"line-number"},[s._v("84")]),a("br"),a("span",{staticClass:"line-number"},[s._v("85")]),a("br"),a("span",{staticClass:"line-number"},[s._v("86")]),a("br"),a("span",{staticClass:"line-number"},[s._v("87")]),a("br"),a("span",{staticClass:"line-number"},[s._v("88")]),a("br"),a("span",{staticClass:"line-number"},[s._v("89")]),a("br"),a("span",{staticClass:"line-number"},[s._v("90")]),a("br"),a("span",{staticClass:"line-number"},[s._v("91")]),a("br"),a("span",{staticClass:"line-number"},[s._v("92")]),a("br"),a("span",{staticClass:"line-number"},[s._v("93")]),a("br"),a("span",{staticClass:"line-number"},[s._v("94")]),a("br"),a("span",{staticClass:"line-number"},[s._v("95")]),a("br"),a("span",{staticClass:"line-number"},[s._v("96")]),a("br"),a("span",{staticClass:"line-number"},[s._v("97")]),a("br"),a("span",{staticClass:"line-number"},[s._v("98")]),a("br"),a("span",{staticClass:"line-number"},[s._v("99")]),a("br"),a("span",{staticClass:"line-number"},[s._v("100")]),a("br"),a("span",{staticClass:"line-number"},[s._v("101")]),a("br"),a("span",{staticClass:"line-number"},[s._v("102")]),a("br"),a("span",{staticClass:"line-number"},[s._v("103")]),a("br"),a("span",{staticClass:"line-number"},[s._v("104")]),a("br"),a("span",{staticClass:"line-number"},[s._v("105")]),a("br"),a("span",{staticClass:"line-number"},[s._v("106")]),a("br"),a("span",{staticClass:"line-number"},[s._v("107")]),a("br"),a("span",{staticClass:"line-number"},[s._v("108")]),a("br"),a("span",{staticClass:"line-number"},[s._v("109")]),a("br"),a("span",{staticClass:"line-number"},[s._v("110")]),a("br"),a("span",{staticClass:"line-number"},[s._v("111")]),a("br"),a("span",{staticClass:"line-number"},[s._v("112")]),a("br"),a("span",{staticClass:"line-number"},[s._v("113")]),a("br"),a("span",{staticClass:"line-number"},[s._v("114")]),a("br"),a("span",{staticClass:"line-number"},[s._v("115")]),a("br"),a("span",{staticClass:"line-number"},[s._v("116")]),a("br"),a("span",{staticClass:"line-number"},[s._v("117")]),a("br"),a("span",{staticClass:"line-number"},[s._v("118")]),a("br"),a("span",{staticClass:"line-number"},[s._v("119")]),a("br"),a("span",{staticClass:"line-number"},[s._v("120")]),a("br"),a("span",{staticClass:"line-number"},[s._v("121")]),a("br"),a("span",{staticClass:"line-number"},[s._v("122")]),a("br"),a("span",{staticClass:"line-number"},[s._v("123")]),a("br"),a("span",{staticClass:"line-number"},[s._v("124")]),a("br"),a("span",{staticClass:"line-number"},[s._v("125")]),a("br"),a("span",{staticClass:"line-number"},[s._v("126")]),a("br"),a("span",{staticClass:"line-number"},[s._v("127")]),a("br"),a("span",{staticClass:"line-number"},[s._v("128")]),a("br"),a("span",{staticClass:"line-number"},[s._v("129")]),a("br"),a("span",{staticClass:"line-number"},[s._v("130")]),a("br"),a("span",{staticClass:"line-number"},[s._v("131")]),a("br"),a("span",{staticClass:"line-number"},[s._v("132")]),a("br"),a("span",{staticClass:"line-number"},[s._v("133")]),a("br"),a("span",{staticClass:"line-number"},[s._v("134")]),a("br"),a("span",{staticClass:"line-number"},[s._v("135")]),a("br"),a("span",{staticClass:"line-number"},[s._v("136")]),a("br"),a("span",{staticClass:"line-number"},[s._v("137")]),a("br"),a("span",{staticClass:"line-number"},[s._v("138")]),a("br"),a("span",{staticClass:"line-number"},[s._v("139")]),a("br"),a("span",{staticClass:"line-number"},[s._v("140")]),a("br"),a("span",{staticClass:"line-number"},[s._v("141")]),a("br"),a("span",{staticClass:"line-number"},[s._v("142")]),a("br"),a("span",{staticClass:"line-number"},[s._v("143")]),a("br"),a("span",{staticClass:"line-number"},[s._v("144")]),a("br"),a("span",{staticClass:"line-number"},[s._v("145")]),a("br"),a("span",{staticClass:"line-number"},[s._v("146")]),a("br"),a("span",{staticClass:"line-number"},[s._v("147")]),a("br"),a("span",{staticClass:"line-number"},[s._v("148")]),a("br"),a("span",{staticClass:"line-number"},[s._v("149")]),a("br"),a("span",{staticClass:"line-number"},[s._v("150")]),a("br"),a("span",{staticClass:"line-number"},[s._v("151")]),a("br"),a("span",{staticClass:"line-number"},[s._v("152")]),a("br"),a("span",{staticClass:"line-number"},[s._v("153")]),a("br"),a("span",{staticClass:"line-number"},[s._v("154")]),a("br"),a("span",{staticClass:"line-number"},[s._v("155")]),a("br"),a("span",{staticClass:"line-number"},[s._v("156")]),a("br"),a("span",{staticClass:"line-number"},[s._v("157")]),a("br"),a("span",{staticClass:"line-number"},[s._v("158")]),a("br"),a("span",{staticClass:"line-number"},[s._v("159")]),a("br"),a("span",{staticClass:"line-number"},[s._v("160")]),a("br"),a("span",{staticClass:"line-number"},[s._v("161")]),a("br"),a("span",{staticClass:"line-number"},[s._v("162")]),a("br"),a("span",{staticClass:"line-number"},[s._v("163")]),a("br"),a("span",{staticClass:"line-number"},[s._v("164")]),a("br"),a("span",{staticClass:"line-number"},[s._v("165")]),a("br"),a("span",{staticClass:"line-number"},[s._v("166")]),a("br"),a("span",{staticClass:"line-number"},[s._v("167")]),a("br"),a("span",{staticClass:"line-number"},[s._v("168")]),a("br"),a("span",{staticClass:"line-number"},[s._v("169")]),a("br"),a("span",{staticClass:"line-number"},[s._v("170")]),a("br"),a("span",{staticClass:"line-number"},[s._v("171")]),a("br"),a("span",{staticClass:"line-number"},[s._v("172")]),a("br"),a("span",{staticClass:"line-number"},[s._v("173")]),a("br"),a("span",{staticClass:"line-number"},[s._v("174")]),a("br"),a("span",{staticClass:"line-number"},[s._v("175")]),a("br"),a("span",{staticClass:"line-number"},[s._v("176")]),a("br"),a("span",{staticClass:"line-number"},[s._v("177")]),a("br"),a("span",{staticClass:"line-number"},[s._v("178")]),a("br"),a("span",{staticClass:"line-number"},[s._v("179")]),a("br"),a("span",{staticClass:"line-number"},[s._v("180")]),a("br"),a("span",{staticClass:"line-number"},[s._v("181")]),a("br"),a("span",{staticClass:"line-number"},[s._v("182")]),a("br"),a("span",{staticClass:"line-number"},[s._v("183")]),a("br"),a("span",{staticClass:"line-number"},[s._v("184")]),a("br"),a("span",{staticClass:"line-number"},[s._v("185")]),a("br"),a("span",{staticClass:"line-number"},[s._v("186")]),a("br"),a("span",{staticClass:"line-number"},[s._v("187")]),a("br"),a("span",{staticClass:"line-number"},[s._v("188")]),a("br"),a("span",{staticClass:"line-number"},[s._v("189")]),a("br"),a("span",{staticClass:"line-number"},[s._v("190")]),a("br"),a("span",{staticClass:"line-number"},[s._v("191")]),a("br"),a("span",{staticClass:"line-number"},[s._v("192")]),a("br"),a("span",{staticClass:"line-number"},[s._v("193")]),a("br"),a("span",{staticClass:"line-number"},[s._v("194")]),a("br"),a("span",{staticClass:"line-number"},[s._v("195")]),a("br"),a("span",{staticClass:"line-number"},[s._v("196")]),a("br"),a("span",{staticClass:"line-number"},[s._v("197")]),a("br"),a("span",{staticClass:"line-number"},[s._v("198")]),a("br"),a("span",{staticClass:"line-number"},[s._v("199")]),a("br"),a("span",{staticClass:"line-number"},[s._v("200")]),a("br"),a("span",{staticClass:"line-number"},[s._v("201")]),a("br"),a("span",{staticClass:"line-number"},[s._v("202")]),a("br"),a("span",{staticClass:"line-number"},[s._v("203")]),a("br"),a("span",{staticClass:"line-number"},[s._v("204")]),a("br"),a("span",{staticClass:"line-number"},[s._v("205")]),a("br"),a("span",{staticClass:"line-number"},[s._v("206")]),a("br"),a("span",{staticClass:"line-number"},[s._v("207")]),a("br"),a("span",{staticClass:"line-number"},[s._v("208")]),a("br"),a("span",{staticClass:"line-number"},[s._v("209")]),a("br"),a("span",{staticClass:"line-number"},[s._v("210")]),a("br"),a("span",{staticClass:"line-number"},[s._v("211")]),a("br"),a("span",{staticClass:"line-number"},[s._v("212")]),a("br"),a("span",{staticClass:"line-number"},[s._v("213")]),a("br"),a("span",{staticClass:"line-number"},[s._v("214")]),a("br"),a("span",{staticClass:"line-number"},[s._v("215")]),a("br"),a("span",{staticClass:"line-number"},[s._v("216")]),a("br"),a("span",{staticClass:"line-number"},[s._v("217")]),a("br"),a("span",{staticClass:"line-number"},[s._v("218")]),a("br"),a("span",{staticClass:"line-number"},[s._v("219")]),a("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);