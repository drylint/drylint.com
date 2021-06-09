# 1

[toc]

## 语句

语句就是一条完整的 SQL 语句，语句由多个子句（clause）组成，有些子句是必需的，而有的是可选的。一个子句通常由一个关键字和所提供的数据组成。子句的例子有 `FROM`, `WHERE`, `ORDER BY` 等。

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
SELECT DISTINCT roleName FROM user;

# 在查询结果的基础上进行计算
# 查询出所有员工的姓名和年薪
SELECT ename 姓名, salary*12 年薪 FROM emp;
# 假设每个员工工资增加500，年终奖是5000，查询所有员工的姓名和年薪是多少。
SELECT ename 姓名, (salary+500)*12+5000 年薪 FROM emp;
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
