# 1

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

上面的表中列举了最常用的数据类型。很多数据类型还有别名，例如，REAL又可以写成FLOAT(24)。还有一些不常用的数据类型，例如，TINYINT（范围在0~255）。各数据库厂商还会支持特定的数据类型，例如JSON。

选择数据类型的时候，要根据业务规则选择合适的类型。通常来说，BIGINT能满足整数存储的需求，VARCHAR(N)能满足字符串存储的需求，这两种类型是使用最广泛的。

## 主流关系数据库

目前，主流的关系数据库主要分为以下几类：

商用数据库，例如：Oracle，SQL Server，DB2等；
开源数据库，例如：MySQL，PostgreSQL等；
桌面数据库，以微软Access为代表，适合桌面应用程序使用；
嵌入式数据库，以Sqlite为代表，适合手机应用和桌面程序。

## SQL

SQL语言定义了这么几种操作数据库的能力：

DDL：Data Definition Language

DDL允许用户定义数据，也就是创建表、删除表、修改表结构这些操作。通常，DDL由数据库管理员执行。

DML：Data Manipulation Language

DML为用户提供添加、删除、更新数据的能力，这些是应用程序对数据库的日常操作。

DQL：Data Query Language

DQL允许用户查询数据，这也是通常最频繁的数据库日常操作。

## 开始

## 安装

## 添加到环境变量

复制 mysql 安装目录下 bin 目录完整路径，添加到环境变量 path 中

## 连接

输入 `mysql -u root -p` 确定，输入密码，连接成功。

`mysql -h xx.xx.xx.xx -P 3306 -u root -p`

`-h`: host, 地址

`-P`: 需大写，port, 端口

`-u`: user, 用户名

`-p`: password, 密码，确定后再单独输入密码

## 常用命令

- `quit;` 退出数据库 ( `exit;` )
- `show databases;` 列出数据库列表
- `use datebaseName;` 使用（进入）某个数据库
- `show tables;` 列出当前数据库中所有的表
- `desc tableName;` 描述表中都有哪些字段(表头)

## SQL 语句两种执行方式

### 交互模式

在客户端输入一行，点击回车，服务器执行一行。适用于临时性查看数据

### 脚本模式

客户端把要执行的命令写在一个文本文件中，一次性提交给服务器执行。适用于批量的增删改查。

```sql
mysql -u root -p > ./demo.sql

```

## 语句

- 每条语句可跨越多行(USE命令除外)，见到分号认为语句结束，所以每条语句都应该以分号(`;`)结尾
- SQL语句不区分大小写，习惯上，关键字用大写，非关键字用小写
- 单行注释以 `#` 开头
- 多行注释 `/*...*/`

### 常用语句

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

# 查询一行的所有字段
SELECT * FROM user;

# 查询一行的某些字段
SELECT user_name, phone FROM user;
```

### 约束 (constraint)

MySQL可以对插入表中的数据进行特定的验证，只有满足条件的数据才允许进入数据库

约束可以在 `CREATE TABLE` (建立表时)或 `ALTER TABLE`(表建立后)添加或修改

约束定义在单列(列级约束), 可以约束当前列的数据;

多列约束必须定义表级约束, 相关的列在括号中指定, 用逗号分隔

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

FOREIGN KEY约束还有两个关键字：

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
ALTER TABLE 表名 ADD CONSTRAINT 约束名 FOREIGN KEY(列名) REFERENCES 另一表名(表中列名);
```

实例：

```sql
ALTER TABLE user ADD CONSTRAINT constraint_name FOREIGN KEY(id) REFERENCES other_table(user_id);
```

##### 删除约束

```sql
ALTER TABLE user DROP CONSTRAINT constraint_name;
ALTER TABLE user DROP PRIMARY KEY CASCADE;
```

##### 删除NOT NULL约束,用ALTER TABLE MODIFY子句来删除

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
ALTER TABLE user DISABLE CONSTRAINT constraint_name CASCADE; # 如果没有被引用则不需CASCADE关键字
```

##### 打开约束

```sql
ALTER TABLE user ENABLE CONSTRAINT constraint_name; # 注意,打开一个先前关闭的被引用的主键约束,并不能自动打开相关的外键约束
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

  ALTER TABLE users COMMENT '修改后的表的注释';

#### 修改列的注释

  ALTER TABLE users MODIFY COLUMN uid INT COMMENT '用户编号';

#### 查看表的注释

  SHOW CREATE TABLE users;

#### 查看列的注释

  SHOW FULL COLUMNS FROM users;
