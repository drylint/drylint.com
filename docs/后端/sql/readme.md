# 1

[toc]

## 概述

### 主流关系数据库

目前，主流的关系数据库主要分为以下几类：

商用数据库，例如：Oracle，SQL Server，DB2等；
开源数据库，例如：MySQL，PostgreSQL等；
桌面数据库，以微软Access为代表，适合桌面应用程序使用；
嵌入式数据库，以Sqlite为代表，适合手机应用和桌面程序。

数据库的构成：server -> Database -> Table -> Row -> Column 。

### SQL (Structured Query Language)

SQL语言定义了这么几种操作数据库的能力：

#### DDL ：Data Definition Language

DDL 允许用户定义数据，也就是创建表、删除表、修改表结构这些操作。通常，DDL 由数据库管理员执行。

#### DML ：Data Manipulation Language

DML 为用户提供添加、删除、更新数据的能力，这些是应用程序对数据库的日常操作。

#### DQL ：Data Query Language

DQL 允许用户查询数据，这也是通常最频繁的数据库日常操作。

## 开始使用

以 MySQL 为例。

### 安装 MySQL

首先安装 MySQL ，过程略。

安装完 MySQL 后，实际上，除了 MySQL Server ，即真正的 MySQL 服务器外，还附带了一个 MySQL Client 客户端程序。

可以通过 MySQL Client 登录 MySQL Server ，然后，输入 SQL 语句并执行。

### 连接数据库

输入 `mysql -u root -p` ，按下 Enter 确定后，输入密码，如果正确，将会连接成功。

连接成功后，提示符变为 `mysql>` (MariaDB 提示为 `MariaDB [(none)]>`) 。

输入 `exit` 并确定后， 会断开与 MySQL Server 的连接并返回到命令提示符。

其实，MySQL Client 的可执行程序是 `mysql` ，MySQL Server 的可执行程序是 `mysqld` 。所以上面使用的连接语句以 `mysql` 开头，就是在使用客户端的可执行程序。

如果安装完后，没有将 MySQL Client 的可执行程序添加到环境变量中，执行上面的 `mysql ...` 语句会报错，可以手动添加：复制 mysql 安装目录下 bin 目录完整路径，添加到系统的环境变量 path 中。

MySQL Client 和 MySQL Server 的关系如下：

```bash
┌──────────────┐  SQL   ┌──────────────┐
│ MySQL Client │───────>│ MySQL Server │
└──────────────┘  TCP   └──────────────┘
```

在 MySQL Client 中输入的 SQL 语句通过 TCP 连接发送到 MySQL Server。默认端口号是 `3306` ，即如果发送到本机 MySQL Server，地址就是 `127.0.0.1:3306` 。

也可以只安装 MySQL Client，然后连接到远程 MySQL Server。假设远程 MySQL Server的IP地址是 `10.0.1.99` ，那么就使用 `-h` 指定 IP 或域名：

```sql
mysql -h 10.0.1.99 -u root -p
```

完整的连接命令语法：

```sql
mysql -h xxx.xxx.xxx.xxx -P 3306 -u root -p
```

`-h` : host, IP 地址 或域名地址

`-P` : 需大写，port, 端口

`-u` : user, 用户名

`-p` : password, 密码，确定后再单独输入密码

### SQL 语句两种执行方式

#### 交互模式

在客户端输入一行，按下 Enter 键，服务器执行一行。适用于临时性查看数据。

#### 脚本模式

客户端把要执行的命令写在一个扩展名为 `.sql` 的文本文件中，一次性提交给服务器执行。适用于批量的增删改查。

登录数据库服务器，并且执行 `demo.sql` 文件中的所有语句：

```sql
mysql -u root -p < ./demo.sql
```

### 语句编写

- 不区分大小写，习惯上，关键字用大写，非关键字用小写。
- 每条 SQL 语句都必须以英文分号 `;` 结尾，
- 一条语句可跨越多行( `USE` 命令除外)，见到分号才会视为语句结束。
- 某条语句执行发生错误时，执行会被退出，之后的语句不会再执行。
- 注释，单行注释使用 `# 注释内容`，多行注释使用 `/* 注释内容 */` 包裹。

### 操作库

#### 退出数据库连接 `exit;`

`quit;` 同样可以退出连接。

注意，这个操作仅仅是断开了客户端和服务器的连接，MySQL 服务器仍然继续运行。

#### 查看所有数据库 `show databases;`

其中，`information_schema` 、 `mysql` 、 `performance_schema` 和 `sys` 是系统库，不要去改动它们。

其他的数据库是用户创建的数据库。

#### 创建一个新数据库 `CREATE DATABASE <databaseName>;`

```sql
CREATE DATABASE <databaseName>;
```

#### 删除一个数据库 `DROP DATABASE <databaseName>;`

```sql
DROP DATABASE <databaseName>;
```

注意：删除一个数据库将导致该数据库的所有表全部被删除。

#### 进入(使用)某个数据库 `USE <databaseName>;`

```sql
USE <databaseName>;
```

对一个数据库进行操作时，必须先进入这个数据库。

### 操作表

以下操作，必须是先使用 `use <databaseName>;` 进入某个数据库之后。

#### 查看所有表 `SHOW TABLES;`

```sql
SHOW TABLES;
```

#### 创建一张表 `CREATE TABLE ...`

```sql
CREATE TABLE ...
```

#### 删除一张表 `DROP TABLE <tableName>;`

```sql
DROP TABLE <tableName>;
```

#### 修改一张表 `ALTER TABLE ...`

如果要给 `students` 表新增一列 `birth` ，使用：

```sql
ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;
```

要修改 `birth` 列，例如把列名改为 `birthday` ，类型改为 `VARCHAR(20)` ：

```sql
ALTER TABLE students CHANGE COLUMN birth birthday VARCHAR(20) NOT NULL;
```

要删除列，使用：

```sql
ALTER TABLE students DROP COLUMN birthday;
```

#### 查看一张表的结构 `DESC <tableName>;`

#### 查看一张表的创建语句 `SHOW CREATE TABLE <tableName>;`

运行后，会输出创建这个表使用的 SQL 语句：

```sql
students | CREATE TABLE `students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8
```

## 数据类型

对于一个关系表，除了定义每一列的名称外，还需要定义每一列的数据类型。关系数据库支持的标准数据类型包括数值、字符串、时间等：

名称 | 类型 | 说明
-- | -- | --
INT | 整型 | 4字节整数类型，范围约+/-21亿
BIGINT | 长整型 | 8字节整数类型，范围约+/-922亿亿
REAL | 浮点型 | 4字节浮点数，范围约+/-1038
DOUBLE | 浮点型 | 8字节浮点数，范围约+/-10308
DECIMAL(M,N) | 高精度小数 | 由用户指定精度的小数，例如，DECIMAL(20,10)表示一共20位，其中小数10位，通常用于财务计算
CHAR(N) | 定长字符串 | 存储指定长度的字符串，例如，CHAR(100)总是存储100个字符的字符串
VARCHAR(N) | 变长字符串 | 存储可变长度的字符串，例如，VARCHAR(100)可以存储0~100个字符的字符串
BOOLEAN | 布尔类型 | 存储True或者False
DATE | 日期类型 | 存储日期，例如，2018-06-22
TIME | 时间类型 | 存储时间，例如，12:20:59
DATETIME | 日期和时间类型 | 存储日期+时间，例如，2018-06-22 12:20:59

上面的表中列举了最常用的数据类型。很多数据类型还有别名，例如， `REAL` 又可以写成 `FLOAT(24)` 。还有一些不常用的数据类型，例如， `TINYINT` （范围在0~255）。各数据库厂商还会支持特定的数据类型，例如 `JSON` 。

选择数据类型的时候，要根据业务规则选择合适的类型。通常来说， `BIGINT` 能满足整数存储的需求， `VARCHAR(N)` 能满足字符串存储的需求，这两种类型是使用最广泛的。

## 关系模型

### 主键

在关系数据库中，一张表中的每一行数据被称为一条记录，能够通过某个字段唯一区分出不同的记录，这个字段被称为 **主键**。

基本原则：不使用任何业务相关的字段作为主键，比如名称，电话，身份证号，邮箱地址等。

通常，一般都会将命名为 `id` 的字段当作主键，常见 `id` 类型：

1. 自增整数类型：数据库会在插入数据时自动为每一条记录分配一个自增整数，这样我们就完全不用担心主键重复，也不用自己预先生成主键；

2. 全局唯一 GUID 类型：使用一种全局唯一的字符串作为主键，类似`8f55d96b-8acc-4636-8cb8-76bf8abc2f57` 。GUID 算法通过网卡 MAC 地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了 GUID 算法，可以自己预算出主键。

对于大部分应用来说，通常自增类型的主键就能满足需求。如果使用 `INT` 自增类型，那么当一张表的记录数超过 2147483647 （约21亿）时，会达到上限而出错。使用 `BIGINT` 自增类型则可以最多约 922 亿亿条记录。

关系数据库实际上还允许通过多个字段唯一标识记录，即两个或更多的字段都设置为主键，这种主键被称为联合主键，但通常不建议使用。

### 外键

在一张表中，通过某个字段，可以把数据与另一张表关联起来，这种列称为**外键**。

外键并不是通过列名实现的，而是通过定义外键约束实现的：

```sql
ALTER TABLE <表名>
ADD CONSTRAINT <约束名>
FOREIGN KEY (<外键列名>)
REFERENCES <关联表名> (关联列名);
```

```sql
ALTER TABLE students
ADD CONSTRAINT fk_class_id
FOREIGN KEY (class_id)
REFERENCES classes (id);
```

其中，外键约束的名称 `fk_class_id` 可以任意，`FOREIGN KEY (class_id)` 指定了`class_id` 作为外键，`REFERENCES classes (id)` 指定了这个外键将关联到`classes` 表的 `id` 列。

通过定义外键约束，关系数据库可以保证无法插入无效的数据。即如果 `classes` 表不存在 `id=99` 的记录， `students` 表就无法插入 `class_id=99` 的记录。

由于外键约束会降低数据库的性能，大部分互联网应用程序为了追求速度，并不设置外键约束，而是仅靠应用程序自身来保证逻辑的正确性。

删除一个外键约束，也是通过 `ALTER TABLE` 实现的：

```sql
ALTER TABLE <表名>
DROP FOREIGN KEY <外键名>;
```

```sql
ALTER TABLE students
DROP FOREIGN KEY fk_class_id;
```

#### 多对多

多对多关系实际上是通过两个一对多关系实现的，即通过一个中间表，关联两个一对多关系，就形成了多对多关系。

#### 一对一

一对一关系是指，一个表的记录对应到另一个表的唯一一个记录。

用于将一个大表拆分成两个小表，目的是把经常读取和不经常读取的字段分开，以获得更高的性能。

### 索引

在关系数据库中，如果有上万甚至上亿条记录，在查找记录的时候，想要获得非常快的速度，就需要使用索引。

索引是关系数据库中对某一列或多个列的值进行预排序的数据结构。通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。

```sql
ALTER TABLE <tableName>
ADD INDEX <indexName> (<column1>[, <column2>, ...<columnN>]);
```

索引的效率取决于索引列的值是否散列，即该列的值如果越互不相同，那么索引效率越高。反过来，如果记录的列存在大量相同的值，例如 `gender` 列，大约一半的记录值是 `M` ，另一半是 `F` ，因此，对该列创建索引就没有意义。

可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。

对于主键，关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。

#### 唯一索引

在设计关系数据表的时候，看上去唯一的列，例如身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键。

但是，这些列根据业务要求，又具有唯一性约束：即不能出现两条记录存储了同一个身份证号。这个时候，就可以给该列添加一个唯一索引。

```sql
ALTER TABLE <tableName>
ADD UNIQUE INDEX <indexName> (<columnName>);
```

也可以只对某一列添加一个唯一约束而不创建唯一索引：

```sql
ALTER TABLE <表名>
ADD CONSTRAINT <外键名>
UNIQUE (<列名>);
```

## 语句

### 查询语句

#### 基本查询

语法：

```sql
# 查询一张表中的所有信息
SELECT * FROM <表名>;

# 查询一张表中的指定的某些列，称作 投影查询
SELECT <列名1>, <列名2>, ... FROM <表名>;

# 给查询的列起别名，其中 AS 可省略
SELECT <列名1> AS <别名1>, <列名2> AS <别名2>, ... FROM <表名>;

# 查询某列的所有出现过的值
SELECT DISTINCT <列名> from <表名>;

# 对查询的列的数据执行计算
# 无别名时，会直接将表达式的字符串作为结果的字段
SELECT <含列名的计算表达式> from <表名>;
SELECT <计算表达式> AS <别名字段> from <表名>;
```

`SELECT` 是关键字，表示将要执行一个查询， `*` 表示“所有列”， `FROM` 表示将要从哪个表查询。

`SELECT` 语句其实并不要求一定要有 `FROM` 子句，比如执行 `SELECT 100+200;` 会执行计算，并作为查询结果。

虽然 `SELECT` 可以用作计算，但它并不是 SQL 的强项。但是，不带 `FROM` 子句的 `SELECT` 语句有一个有用的用途，就是用来判断当前到数据库的连接是否有效。许多检测工具会执行一条 `SELECT 1;` 来测试数据库连接。

#### 查询条件

```sql
SELECT * FROM <表名> WHERE <条件表达式>
```

条件表达式可以用 `AND`, `OR`, `NOT` 来分别表示 和，或，非

要组合三个或者更多的条件，就需要用小括号 `()` 表示如何进行条件运算。

如果不加括号，条件运算按照 `NOT`, `AND`, `OR` 的优先级进行，即 `NOT` 优先级最高，其次是 `AND` ，最后是 `OR` 。加上括号可以改变优先级。

运算符 | 意义 |  说明
-- | -- | -- | -- | --
`=` | 等于 | 字符串需要用单引号括起来，比如 `name = 'abc'`
`>` | 大于 | 字符串比较根据 ASCII 码，中文字符比较根据数据库设置
`>=` | 大于等于 |
`<` | 小于 |
`<=` | 小于或相等 |
`<>`, `!=` | 不相等 |
`<=>` | NULL 比较 | 如果两侧都为 NULL 返回 `1`，否则返回 `0`
`BETWEEN <min> AND <max>` | 范围 | 在两个数字范围之间
`LIKE` | 相似 |`%` 表示任意多个字符，`_` 表示一个字符，`'ab%'`, `ab_`
`IS NULL` | 为空 | 不能用 `xx = NULL`
`IS NOT NULL` | 不为空 | 不能用 `xx != NULL` 。
`IN ()` | 条件集合 | `WHERE age IN (10, 20, 30)`
`REGEXP`, `RLIKE` | 正则匹配 | `WHERE phone REGEXP '^\\d{11}$'` ，注意 `\` 需要转义

`+` | 加 |
`-` | 减 |
`*` | 乘 |
`/` | 除 |
`DIV` | 商 |
`%`, `MOD` | 取余 |

#### 排序

通常，查询结果是按照主键排序的，如果要根据某列进行排序，可以使用 `ORDER BY ...` 子句。列名接上关键字 `ASC` 或 `DESC` 表示正序或倒序排列。

```sql
# 正序，如果有 WHERE 子句，ORDER BY 语句要放在 WHERE 之后，ASC 为默认值可省略。
SELECT * FROM <表名> WHERE <条件表达式> ORDER BY <列名> ASC;

# 倒序
SELECT * FROM <表名> ORDER BY <列名> DESC;

# 先按 列名1 倒序排列，如果 列名1 值相同，再按 列名2 正序排列
SELECT * FROM <表名> ORDER BY <列名1> DESC, <列名2>;
```

#### 分页

通过 `LIMIT <M> OFFSET <N>` 子句实现分页查询，表示本次最多查询 M 条记录，跳过前 N 条纪录（相当于从 N + 1 开始）。

```sql
SELECT * FROM <表名>
WHERE <条件表达式>
ORDER BY <列名>
LIMIT <分页大小> OFFSET <跳过的数量>;
```

比如，每一页查 10 条数据，第一页为 `LIMIT 10 OFFSET 0` ，第二页为 `LIMIT 10 OFFSET 10` ，第三页为 `LIMIT 10 OFFSET 20`，最后一页不足 10 条时，则返回实际剩余的条数。

分页查询的关键在于，首先要确定每页需要显示的结果数量 `pageSize` ，然后根据当前页的索引 `pageIndex` （从 `1` 开始），确定 `LIMIT` 和 `OFFSET` 应该设定的值：

- `LIMIT` 总是设定为 `pageSize`；
- `OFFSET` 计算公式为 `pageSize * (pageIndex - 1)` 。

`OFFSET` 超过了数据表的最大数量并不会报错，而是得到一个空的结果集。

`OFFSET` 是可选的（默认值为 `0`），如果只写 `LIMIT 15` ，那么相当于 `LIMIT 15 OFFSET 0` 。

在MySQL中，`LIMIT 15 OFFSET 30` 还可以简写成 `LIMIT 30, 15` ，注意，OFFSET 和 LIMIT 的值对调了位置。

使用 `LIMIT <M> OFFSET <N>` 分页时，随着 `N` 越来越大，查询效率也会越来越低。

#### 聚合查询

对于统计总数、平均数这类计算，SQL 提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询，它可以快速获得结果。

`COUNT()` 函数用于统计一张表的数据量或某一列的数据量：

```sql
SELECT COUNT(*) FROM <表名>;
SELECT COUNT(*) AS <别名> FROM <表名>;
SELECT COUNT(<列名>) AS <别名> FROM <表名> WHERE <条件表达式>;
```

SQL 提供如下聚合函数：

函数 | 说明
-- | --
`COUNT(<列名>)` | 统计数量
`SUM(<数值列>)` | 计算某一列的合计值，该列必须为数值类型
`AVG(<数值列>)` | 计算某一列的平均值，该列必须为数值类型
`MAX(<列名>)` | 计算某一列的最大值
`MIN(<列名>)` | 计算某一列的最小值

注意， `MAX()` 和 `MIN()` 函数并不限于数值类型。如果是字符类型， `MAX()` 和 `MIN()` 会返回排序最后和排序最前的字符。

要特别注意：如果聚合查询的 `WHERE` 条件没有匹配到任何行， `COUNT()` 会返回 `0` ，而 `SUM()` 、 `AVG()` 、 `MAX()` 和 `MIN()` 会返回 `NULL` ：

##### 分组

对于聚合查询，SQL 还提供了“分组聚合”的功能，使用 `GROUP BY <列名>` 进行分组查询。

比如，要统计每个班的学生数量，可以用到分组。

```sql
# 根据 class_id 进行分组统计，但结果不知道哪个数据是哪个班
SELECT COUNT(*) num FROM students GROUP BY class_id;

# 分组统计时，同时查出班级的 class_id ，便于区分数据
SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;
```

注意，在聚合查询的列中，只能放入分组的列。也就是 `SELECT` 后的列名，只能是分组的列名，

可以使用多个列进行分组。

```sql
SELECT class_id, gender, COUNT(*) num FROM students GROUP BY class_id, gender;
```

查询结果是：

class_id | gender | num
-- | -- | --
1 | M | 2
1 | F | 2
2 | F | 1
2 | M | 2
3 | F | 2
3 | M | 1

#### 多表查询

从多张表中查询数据：

```sql
SELECT * FROM <表1> <表2>;
```

比如：

```sql
SELECT * FROM students, classes;
```

这种一次查询两个表的数据，查询的结果也是一个二维表，它是 `students` 表和 `classes` 表的“乘积”，即 `students` 表的每一行与 `classes` 表的每一行都两两拼在一起返回。结果集的列数是 `students` 表和 `classes` 表的**列数之和**，行数是 `students` 表和 `classes` 表的**行数之积**。

这种多表查询又称笛卡尔查询，使用笛卡尔查询时要非常小心，由于结果集是目标表的行数乘积，对两个各自有 100 行记录的表进行笛卡尔查询将返回 10000 条记录，对两个各自有 1 万行记录的表进行笛卡尔查询将返回 1 亿条记录。

多表查询时，各个表中相同的列名全都会作为结果的列名被列出来，所以结果中会看到多列 `id` 及其他相同字段。

可以利用投影查询的“设置列的别名”来给两个表各自的 `id` 和 `name` 列起别名：

```sql
SELECT
    students.id sid,
    students.name,
    students.gender,
    students.score,
    classes.id cid,
    classes.name cname
FROM students, classes;
```

要使用 `表名.列名` 这样的方式来引用列和设置别名，比如 `students.id` ，但这样书写太长太麻烦，可以给表设置别名来简化书写：

```sql
SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c;
```

给 `students` 表设置别名为 `s`, 给 `classes` 表设置别名为 `c` 。

给多表查询添加条件语句：

```sql
SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c
WHERE s.gender = 'M' AND c.id = 1;
```

#### 连接查询

连接查询是另一种类型的多表查询。连接查询对多个表进行JOIN运算，简单地说，就是先确定一个主表作为结果集，然后，把其他表的行有选择性地“连接”在主表结果集上。

```sql
# 选出 students 表的所有学生信息
SELECT s.id, s.name, s.class_id, s.gender, s.score FROM students s;
```

上面查出的学生信息中，没有班级名称，只有班级的 `class_id`，如果要查出对应的班级名称，要先根据 `students` 表的 `class_id` ，找到 `classes` 表对应的行，再取出 `name` 列，才可以获得班级名称。

但是用连接查询就比较简单：

语法：

```sql
SELECT ... FROM <主表> INNER JOIN <连接表> ON <条件...>
```

示例：

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
```

注意 `INNER JOIN` 查询的写法是：

1. 先确定主表，仍然使用 `FROM <主表>` 的语法；
2. 再确定需要连接的表，使用 `INNER JOIN <连接表>` 的语法；
3. 然后确定连接条件，使用 `ON <条件...>` ，这里的条件是 `s.class_id = c.id` ，表示 `students` 表的 `class_id` 列与 `classes` 表的 `id` 列相同的行需要连接；
4. 可选：加上 `WHERE` 子句、 `ORDER BY` 等子句。

所有连接方式：

- `INNER JOIN` 只选取主表和连接表都存在的记录
- `LEFT OUTER JOIN` 选取主表的全部记录，连接表没有对应值时补 `NULL`
- `RIGHT OUTER JOIN` 选取连接表的全部记录，主表没有对应值时补 `NULL`
- `FULL OUTER JOIN` 选取主表和连接表的全部记录，没有的都补 `NULL`

JOIN 查询需要先确定主表，然后把另一个表的数据“附加”到结果集上；

`INNER JOIN` 是最常用的一种JOIN查询。

### 修改数据的语句

关系数据库的基本操作就是增删改查，即 CRUD：Create、Retrieve、Update、Delete。其中，对于查询，我们已经详细讲述了SELECT语句的详细用法。

而对于增、删、改，对应的 SQL 语句分别是：

`INSERT` ：插入新记录；
`UPDATE` ：更新已有记录；
`DELETE` ：删除已有记录。

#### 插入语句 INSERT

语法：

```sql
INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);
```

示例：

```sql
# 插入一条记录
INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80);

# 插入多条记录，使用逗号分隔
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);
```

#### 更新语句 UPDATE

语法：

```sql
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
```

示例：

```sql
# 更新，修改 id 为 1 的那一行数据
UPDATE students SET name='大牛', score=66 WHERE id=1;

# 更新时使用表达式，比如把 80 分以下的所有人加 10 分
UPDATE students SET score=score+10 WHERE score<80;
```

如果 `WHERE` 条件没有匹配到任何记录， `UPDATE` 语句不会报错，也不会有任何记录被更新。

要特别小心的是，`UPDATE` 语句可以没有 `WHERE` 条件，此时，整个表的所有记录都会被更新。

所以，在执行 `UPDATE` 语句时要非常小心，最好先用 `SELECT` 语句来测试 `WHERE` 条件是否筛选出了期望的记录集，然后再用 `UPDATE` 更新。

在使用 MySQL 这类真正的关系数据库时，`UPDATE` 语句会返回更新的行数以及 `WHERE` 条件匹配的行数，比如 `Rows matched: 1 Changed: 1` 。

#### 删除语句 DELETE

语法：

```sql
DELETE FROM <表名> WHERE ...;
```

示例：

```sql
# 删除 id 为 1 的记录
DELETE FROM students WHERE id=1;

# 删除 id 大于等于 5 并且 小于等于 7 的所有记录
DELETE FROM students WHERE id>=5 AND id<=7;

# WHERE 条件没有匹配记录时，不会报错，也不会删除任何记录
DELETE FROM students WHERE id=999;

# 不带 WHERE 条件，将会删除整个表所有的记录
DELETE FROM students;
```

所以，在执行 `DELETE` 语句时也要非常小心，最好先用 `SELECT` 语句来测试 `WHERE` 条件是否筛选出了期望的记录集，然后再用 `DELETE` 删除。

使用 MySQL 这类真正的关系数据库时， `DELETE` 语句也会返回删除的行数以及 `WHERE` 条件匹配的行数，比如 `Query OK, 1 row affected (0.01 sec)` 。

### 实用 SQL 语句

#### 插入或替换

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就先删除原记录，再插入新记录。此时，可以使用 `REPLACE` 语句，这样就不必先查询，再决定是否先删除再插入：

```sql
REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```

若 `id=1` 的记录不存在， `REPLACE` 语句将插入新记录，否则，当前 `id=1` 的记录将被删除，然后再插入新记录。

#### 插入或更新

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就更新该记录，此时，可以使用 `INSERT INTO ... ON DUPLICATE KEY UPDATE ...` 语句：

```sql
INSERT
INTO students (id, class_id, name, gender, score)
VALUES (1, 1, '小明', 'F', 99)
ON DUPLICATE KEY UPDATE name='小明', gender='F', score=99;
```

若 `id=1` 的记录不存在， `INSERT` 语句将插入新记录，否则，当前 `id=1` 的记录将被更新，更新的字段由 `UPDATE` 指定。

#### 插入或忽略

如果我们希望插入一条新记录（INSERT），但如果记录已经存在，就啥事也不干直接忽略，此时，可以使用 `INSERT IGNORE INTO ...` 语句：

```sql
INSERT IGNORE
INTO students (id, class_id, name, gender, score)
VALUES (1, 1, '小明', 'F', 99);
```

若 `id=1` 的记录不存在， `INSERT` 语句将插入新记录，否则，不执行任何操作。

#### 快照

如果想要对一个表进行快照，即复制一份当前表的数据到一个新表，可以结合 `CREATE TABLE` 和 `SELECT` ：

```sql
# 对 class_id=1 的记录进行快照，并存储为新表 students_of_class1 :
CREATE TABLE students_of_class1
SELECT * FROM students WHERE class_id=1;
```

新创建的表结构和 `SELECT` 使用的表结构完全一致。

#### 写入查询结果集

如果查询结果集需要写入到表中，可以结合 `INSERT` 和 `SELECT` ，将 `SELECT` 语句的结果集直接插入到指定表中。

例如，创建一个统计成绩的表 `statistics` ，记录各班的平均成绩：

```sql
CREATE TABLE statistics (
    id BIGINT NOT NULL AUTO_INCREMENT,
    class_id BIGINT NOT NULL,
    average DOUBLE NOT NULL,
    PRIMARY KEY (id)
);
```

然后，我们就可以用一条语句写入各班的平均成绩：

```sql
INSERT INTO statistics (class_id, average)
SELECT class_id, AVG(score) FROM students
GROUP BY class_id;
```

确保 `INSERT` 语句的列和 `SELECT` 语句的列能一一对应，就可以在 `statistics` 表中直接保存查询的结果：

```sql
SELECT * FROM statistics;

+----+----------+--------------+
| id | class_id | average      |
+----+----------+--------------+
|  1 |        1 |         86.5 |
|  2 |        2 | 73.666666666 |
|  3 |        3 | 88.333333333 |
+----+----------+--------------+
3 rows in set (0.00 sec)
```

#### 强制使用指定索引

在查询的时候，数据库系统会自动分析查询语句，并选择一个最合适的索引。但是很多时候，数据库系统的查询优化器并不一定总是能使用最优索引。如果我们知道如何选择索引，可以使用 `FORCE INDEX` 强制查询使用指定的索引。例如：

```sql
SELECT * FROM students
FORCE INDEX (idx_class_id)
WHERE class_id = 1 ORDER BY id DESC;
```

指定索引的前提是索引 `idx_class_id` 必须存在。

## 示例

以创建数据库 `app` 为例

```sql
SET NAMES UTF8; # 指定编码字符格式
DROP DATABASE IF EXISTS app; # 如果已经存在 `app` 数据库，则先移除它
CREATE DATABASE app CHARSET=UTF8; # 创建数据库 `app`，并指定编码格式
USE app; # 进入数据库

# 创建一个表，名字叫做 `user`，指定对应字段
CREATE TABLE user (
  id INT,
  user_name VARCHAR(20),
  phone VARCHAR(11)
);

# 插入一行完整的完整的包含每一列数据
INSERT INTO user VALUES(1, 'Tom', '13112345678');

# 插入多行完整的包含每一列数据
INSERT INTO user VALUES
(1, 'Tom', '1311111111'),
(2, 'Jerry', '1311111112'),
(3, 'Andy', '1311111113'),
(4, 'Sam', '1311111114');

# 插入一行指定的字段的数据
INSERT INTO user(user_name, phone) VALUES('Tom','1311111111');

# 插入多行指定某几个列的数据
INSERT INTO user(user_name, phone) VALUES
('Tom', '1311111111'),
('Jerry', '1311111112'),
('Andy', '1311111113'),
('Sam', '1311111114');

# 使用键值对快速插入一行若干列数据，不能批量插入多行
INSERT INTO user SET user_name = 'Tom', phone = '13111111111';

# 使用对象形式插入数据
INSERT INTO user SET { user_name = 'Tom', phone = '13111111111' };

# 删除一行数据
DELETE FROM user WHERE id = 2;

# 更改一行数据的某些字段
UPDATE user SET user_name = 'Jerry',phone = '13111111113' WHERE id = 2;

# 查询一张表中每一行的所有字段
SELECT * FROM user;

# 查询一张表中每一行的某些字段
SELECT user_name, phone FROM user;

# 查询时使用正则表达式，比如，查询所有姓张的用户的电话
SELECT phone FROM user WHERE user_name REGEXP '^张';

# 统计表中某列有哪些值存在，比如，查询用户表中有哪些角色名存在
SELECT DISTINCT roleName from user;

# 在查询结果的基础上进行计算
# 查询出所有员工的姓名和年薪
SELECT ename 姓名, salary*12 年薪 FROM emp;
# 假设每个员工工资增加500，年终奖是5000，查询所有员工的姓名和年薪是多少。
SELECT ename 姓名, (salary+500)*12+5000 年薪 FROM emp;
```

## 约束 (constraint)

MySQL可以对插入表中的数据进行特定的验证，只有满足条件的数据才允许进入数据库。

约束可以使用 `CREATE TABLE` (建立表时)或 `ALTER TABLE`(表建立后)添加或修改。

约束定义在单列(列级约束)时，可以约束当前列的数据。

多列约束必须定义表级约束，相关的列在括号中指定, 用逗号分隔。

#### NOT NULL 非空约束

- 禁止不插入任何数据，必须给定具体的数据，否则会报错
- 如果插入的值是 `null`，不会报错，字符串变为空字符串，数值型保存的值变成 `0`。
- 非空约束只能定义列级，不能定义表级

#### UNIQUE 唯一约束

使用 `UNIQUE` 约束的列不能插入重复相同的值，但是允许 `NULL`。可在多行插入 `UNIQUE`

创建 `UNIQUE` 约束时，如果不定义约束名称，默认和列名相同。

#### PRIMARY KEY 主键约束

`PRIMARY KEY` 相当于 `NOT NULL` + `UNIQUE` 的组合，不允许重复，不允许为空。

每个表最多只允许一个主键，建立主键约束可以在列级别创建，也可以在表级别创建。

系统默认会在使用了 `PRIMARY KEY` 的列上建立对应的唯一索引，查询主键约束的列会更快。

#### FOREIGN KEY 外键约束

声明了外键约束的列，取值必须在另一个表的主键列上出现过

外部键列和引用键(reference key)列可以位于相同的表中(自引用完整性约束)

FOREIGN KEY 约束还有两个关键字：

  `ON DELETE CASCADE` 当删除所引用的父表记录时,删除子表中相关的记录
  `ON DELETE SET NULL` 与上面不同的是删除时,转换子表中相关记录为 `NULL` 值

默认情况下,如果没有指定以上两个其中一个，则父表中被引用的记录将不能被删除。

```sql
FOREIGN KEY (本表的列名) REFERENCES 另一张表(表中的列名)
```

#### DEFAULT 默认值约束

使用 `DEFAULT` 关键字为列声明默认值，两种方法使用：

在定义类后写 DEFAULT 值，然后在插入中写DEFAULT则使用默认值。

```sql
# 插入 DEFAULT 表示这里取默认值
INSERT INTO user VALUES(1, 'Tom', DEFAULT);

 # 不写也表示取默认值
INSERT INTO user(id, user_name) VALUES(1, 'Tom');
```

#### CHECK 检查约束

检查约束对要插入的数据进行检验

```sql
CREATE TABLE user(
  score TINYINT CHECK(score >= 0 AND score <= 100)
);
```

MySQL 不支持检查约束 `CHECK`，它认为会降低数据的插入速度。

#### 约束命令语句

##### 添加约束

语法：

```sql
ALTER TABLE <表名>
ADD CONSTRAINT <约束名>
FOREIGN KEY(<列名>)
REFERENCES <另一表名>(<表中列名>);
```

实例：

```sql
ALTER TABLE user
ADD CONSTRAINT constraint_name
FOREIGN KEY(id)
REFERENCES other_table(user_id);
```

##### 删除约束

```sql
ALTER TABLE user DROP CONSTRAINT constraint_name;
ALTER TABLE user DROP PRIMARY KEY CASCADE;
```

##### 删除 NOT NULL 约束,用 ALTER TABLE MODIFY 子句来删除

```sql
ALTER TABLE user MODIFY phone NULL;
```

##### 删除外键约束

```sql
ALTER TABLE user DROP INDEX email;
ALTER TABLE user DROP FOREIGN KEY constraint_name;
```

##### 关闭约束

```sql
# 如果没有被引用则不需 CASCADE 关键字
ALTER TABLE user DISABLE CONSTRAINT constraint_name CASCADE;
```

##### 打开约束

```sql
# 注意，打开一个先前关闭的被引用的主键约束,并不能自动打开相关的外键约束
ALTER TABLE user ENABLE CONSTRAINT constraint_name;
```

##### 从约束合集视图中查询约束的信息

```sql
SELECT constraint_name, constraint_type, search_condition
  FROM user_constraints WHERE table_name='users';
```

### 数据注释(comment)

```sql
  CREATE TABLE users(
    id INT NOT NULL DEFAULT 0 COMMENT '用户ID', # 对列添加注释
  ) COMMENT = '用户表'; # 对表添加注释
```

#### 建表后添加注释

```sql
ALTER TABLE TEST CHANGE COLUMN ID ID INT NOT NULL DEFAULT 0 COMMENT '用户编号'
```

#### 修改表的注释修改表的注释

```sql
ALTER TABLE users COMMENT '修改后的表的注释';
```

#### 修改列的注释

```sql
ALTER TABLE users MODIFY COLUMN uid INT COMMENT '用户编号';
```

#### 查看表的注释

```sql
SHOW CREATE TABLE users;
```

#### 查看列的注释

```sql
SHOW FULL COLUMNS FROM users;
```
