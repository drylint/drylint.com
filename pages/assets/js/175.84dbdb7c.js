(window.webpackJsonp=window.webpackJsonp||[]).push([[175],{378:function(a,t,e){"use strict";e.r(t);var s=e(6),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"开始使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开始使用"}},[a._v("#")]),a._v(" 开始使用")]),a._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#概述"}},[a._v("概述")]),e("ul",[e("li",[e("a",{attrs:{href:"#主流关系数据库"}},[a._v("主流关系数据库")])]),e("li",[e("a",{attrs:{href:"#sql-structured-query-language"}},[a._v("SQL (Structured Query Language)")]),e("ul",[e("li",[e("a",{attrs:{href:"#ddl-data-definition-language"}},[a._v("DDL ：Data Definition Language")])]),e("li",[e("a",{attrs:{href:"#dml-data-manipulation-language"}},[a._v("DML ：Data Manipulation Language")])]),e("li",[e("a",{attrs:{href:"#dql-data-query-language"}},[a._v("DQL ：Data Query Language")])]),e("li",[e("a",{attrs:{href:"#dcl-data-control-language"}},[a._v("DCL ：Data Control Language")])])])])])]),e("li",[e("a",{attrs:{href:"#开始使用-mysql"}},[a._v("开始使用 MySQL")]),e("ul",[e("li",[e("a",{attrs:{href:"#安装-mysql"}},[a._v("安装 MySQL")])]),e("li",[e("a",{attrs:{href:"#连接-mysql-数据库"}},[a._v("连接 MySQL 数据库")])]),e("li",[e("a",{attrs:{href:"#sql-语句两种执行方式"}},[a._v("SQL 语句两种执行方式")]),e("ul",[e("li",[e("a",{attrs:{href:"#交互模式"}},[a._v("交互模式")])]),e("li",[e("a",{attrs:{href:"#脚本模式"}},[a._v("脚本模式")])])])]),e("li",[e("a",{attrs:{href:"#语句编写"}},[a._v("语句编写")])])])])])]),e("p"),a._v(" "),e("h2",{attrs:{id:"概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[a._v("#")]),a._v(" 概述")]),a._v(" "),e("h3",{attrs:{id:"主流关系数据库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#主流关系数据库"}},[a._v("#")]),a._v(" 主流关系数据库")]),a._v(" "),e("p",[a._v("目前，主流的关系数据库主要分为以下几类：")]),a._v(" "),e("p",[a._v("商用数据库，例如：Oracle，SQL Server，DB2等；\n开源数据库，例如：MySQL，PostgreSQL等；\n桌面数据库，以微软Access为代表，适合桌面应用程序使用；\n嵌入式数据库，以Sqlite为代表，适合手机应用和桌面程序。")]),a._v(" "),e("p",[a._v("数据库的构成：server -> Database -> Table -> Row -> Column 。")]),a._v(" "),e("h3",{attrs:{id:"sql-structured-query-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sql-structured-query-language"}},[a._v("#")]),a._v(" SQL (Structured Query Language)")]),a._v(" "),e("p",[a._v("SQL语言定义了这么几种操作数据库的能力：")]),a._v(" "),e("h4",{attrs:{id:"ddl-data-definition-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ddl-data-definition-language"}},[a._v("#")]),a._v(" DDL ：Data Definition Language")]),a._v(" "),e("p",[a._v("DDL 允许用户定义数据，也就是创建表、删除表、修改表结构这些操作。通常，DDL 由数据库管理员执行。如 "),e("code",[a._v("CREATE")]),a._v(", "),e("code",[a._v("ALTER")]),a._v(", "),e("code",[a._v("DROP")]),a._v(" 语句。")]),a._v(" "),e("h4",{attrs:{id:"dml-data-manipulation-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dml-data-manipulation-language"}},[a._v("#")]),a._v(" DML ：Data Manipulation Language")]),a._v(" "),e("p",[a._v("DML 为用户提供添加、删除、更新数据的能力，这些是应用程序对数据库的日常操作。也就是 "),e("code",[a._v("INSERT")]),a._v(", "),e("code",[a._v("UPDATE")]),a._v(", "),e("code",[a._v("DELETE")]),a._v(" 语句。")]),a._v(" "),e("h4",{attrs:{id:"dql-data-query-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dql-data-query-language"}},[a._v("#")]),a._v(" DQL ：Data Query Language")]),a._v(" "),e("p",[a._v("DQL 允许用户查询数据，这也是通常最频繁的数据库日常操作。也就是 "),e("code",[a._v("SELECT")]),a._v(" 语句。")]),a._v(" "),e("h4",{attrs:{id:"dcl-data-control-language"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#dcl-data-control-language"}},[a._v("#")]),a._v(" DCL ：Data Control Language")]),a._v(" "),e("p",[a._v("数据库控制语言，如 "),e("code",[a._v("GRANT")]),a._v(", "),e("code",[a._v("REVOKE")]),a._v(", "),e("code",[a._v("COMMIT")]),a._v(", "),e("code",[a._v("ROLLBACK")]),a._v(" 等。")]),a._v(" "),e("h2",{attrs:{id:"开始使用-mysql"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#开始使用-mysql"}},[a._v("#")]),a._v(" 开始使用 MySQL")]),a._v(" "),e("p",[a._v("以 MySQL 为例。")]),a._v(" "),e("h3",{attrs:{id:"安装-mysql"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-mysql"}},[a._v("#")]),a._v(" 安装 MySQL")]),a._v(" "),e("p",[a._v("首先安装 MySQL ，过程略。")]),a._v(" "),e("p",[a._v("安装完 MySQL 后，实际上，除了 MySQL Server ，即真正的 MySQL 服务器外，还附带了一个 MySQL Client 客户端程序。")]),a._v(" "),e("p",[a._v("可以通过 MySQL Client 登录 MySQL Server ，然后，输入 SQL 语句并执行。")]),a._v(" "),e("h3",{attrs:{id:"连接-mysql-数据库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#连接-mysql-数据库"}},[a._v("#")]),a._v(" 连接 MySQL 数据库")]),a._v(" "),e("p",[a._v("输入 "),e("code",[a._v("mysql -u root -p")]),a._v(" ，按下 Enter 确定后，输入密码，如果正确，将会连接成功。")]),a._v(" "),e("p",[a._v("连接成功后，提示符变为 "),e("code",[a._v("mysql>")]),a._v(" (MariaDB 提示为 "),e("code",[a._v("MariaDB [(none)]>")]),a._v(") 。")]),a._v(" "),e("p",[a._v("输入 "),e("code",[a._v("exit")]),a._v(" 并确定后， 会断开与 MySQL Server 的连接并返回到命令提示符。")]),a._v(" "),e("p",[a._v("其实，MySQL Client 的可执行程序是 "),e("code",[a._v("mysql")]),a._v(" ，MySQL Server 的可执行程序是 "),e("code",[a._v("mysqld")]),a._v(" 。所以上面使用的连接语句以 "),e("code",[a._v("mysql")]),a._v(" 开头，就是在使用客户端的可执行程序。")]),a._v(" "),e("p",[a._v("如果安装完后，没有将 MySQL Client 的可执行程序添加到环境变量中，执行上面的 "),e("code",[a._v("mysql ...")]),a._v(" 语句会报错，可以手动添加：复制 mysql 安装目录下 bin 目录完整路径，添加到系统的环境变量 path 中。")]),a._v(" "),e("p",[a._v("MySQL Client 和 MySQL Server 的关系如下：")]),a._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[a._v("┌──────────────┐  SQL   ┌──────────────┐\n│ MySQL Client │───────"),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("│ MySQL Server │\n└──────────────┘  TCP   └──────────────┘\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])]),e("p",[a._v("在 MySQL Client 中输入的 SQL 语句通过 TCP 连接发送到 MySQL Server。默认端口号是 "),e("code",[a._v("3306")]),a._v(" ，即如果发送到本机 MySQL Server，地址就是 "),e("code",[a._v("127.0.0.1:3306")]),a._v(" 。")]),a._v(" "),e("p",[a._v("也可以只安装 MySQL Client，然后连接到远程 MySQL Server。假设远程 MySQL Server的IP地址是 "),e("code",[a._v("10.0.1.99")]),a._v(" ，那么就使用 "),e("code",[a._v("-h")]),a._v(" 指定 IP 或域名：")]),a._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[a._v("mysql "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("h "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("10.0")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v(".1")]),e("span",{pre:!0,attrs:{class:"token number"}},[a._v(".99")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("u root "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("p",[a._v("完整的连接命令语法：")]),a._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[a._v("mysql "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("h xxx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("xxx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("xxx"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("xxx "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("P "),e("span",{pre:!0,attrs:{class:"token number"}},[a._v("3306")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("u root "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("p",[e("code",[a._v("-h")]),a._v(" : host, IP 地址或域名地址，连接到本地 MySQL 服务器时，默认为 "),e("code",[a._v("localhost")])]),a._v(" "),e("p",[e("code",[a._v("-P")]),a._v(" : 需大写，端口（port），默认为 "),e("code",[a._v("3306")])]),a._v(" "),e("p",[e("code",[a._v("-u")]),a._v(" : user, 用户名")]),a._v(" "),e("p",[e("code",[a._v("-p")]),a._v(" : password, 密码，按下 Enter 确定后，才会再单独要求输入密码")]),a._v(" "),e("h3",{attrs:{id:"sql-语句两种执行方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#sql-语句两种执行方式"}},[a._v("#")]),a._v(" SQL 语句两种执行方式")]),a._v(" "),e("h4",{attrs:{id:"交互模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#交互模式"}},[a._v("#")]),a._v(" 交互模式")]),a._v(" "),e("p",[a._v("在客户端输入一行，按下 Enter 键，服务器执行一行。适用于临时性查看数据。")]),a._v(" "),e("h4",{attrs:{id:"脚本模式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#脚本模式"}},[a._v("#")]),a._v(" 脚本模式")]),a._v(" "),e("p",[a._v("客户端把要执行的命令写在一个扩展名为 "),e("code",[a._v(".sql")]),a._v(" 的文本文件中，一次性提交给服务器执行。适用于批量的增删改查。")]),a._v(" "),e("p",[a._v("登录数据库服务器，并且执行 "),e("code",[a._v("demo.sql")]),a._v(" 文件中的所有语句：")]),a._v(" "),e("div",{staticClass:"language-sql line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-sql"}},[e("code",[a._v("mysql "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("u root "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p "),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),e("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("demo"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),e("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("sql")]),a._v("\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br")])]),e("h3",{attrs:{id:"语句编写"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#语句编写"}},[a._v("#")]),a._v(" 语句编写")]),a._v(" "),e("ul",[e("li",[a._v("不区分大小写，习惯上，关键字用大写，非关键字用小写。")]),a._v(" "),e("li",[a._v("多条 SQL 语句必须以分号（；）分隔。MySQL 如同多数 DBMS 一样，不需要在单条 SQL 语句后加分号。但 mysql 命令行，必须加上\n分号来结束 SQL 语句。所以应该每条语句结束后都加上分号。")]),a._v(" "),e("li",[a._v("一条语句可跨越多行( "),e("code",[a._v("USE")]),a._v(" 命令除外)，见到分号才会视为语句结束。将 SQL 语句分成多行更容易阅读和调试。")]),a._v(" "),e("li",[a._v("某条语句执行发生错误时，执行会被退出，之后的语句不会再执行。")]),a._v(" "),e("li",[a._v("注释，单行注释使用 "),e("code",[a._v("# 注释内容")]),a._v("，多行注释使用 "),e("code",[a._v("/* 注释内容 */")]),a._v(" 包裹。")])])])}),[],!1,null,null,null);t.default=r.exports}}]);