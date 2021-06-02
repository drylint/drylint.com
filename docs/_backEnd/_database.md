# 1

```cmd

MySQL数据库
  1. 如何保存数据
    内存：速度快，空间有限
    自定义文件，速度慢
    Acess/Excel 文件越大速度越慢
    数据库存储
  2. 数据库概述(Database)：按照特定的数据结构存储数据的软件
    网状数据库
    层次性数据库
    关系型数据库(RDBMS)
      server -> Database -> Table -> Row -> Column
      SQLite：微型数据库，常用于移动设备
      MySQL: 开源中小型数据库，可用于各种操作系统
      PostgreSQL：开源中小型数据库
      SQL Server：Microsoft开发的中型数据库，只用于Windows系统
      Oracle：Oracle公司开发的中大型数据库，可用于各种操作系统
      DB2：IBM公司开发的中大型数据库，常与IBM服务器搭配
    非关系型数据库(NoSQL)
  3. MySQL数据库
    Oracle分支： mysql.com
    Martin分支： mariadb.org
    xampp服务器套装：包含有多个开源服务器Apache、MySQL、PHP
      mysqld.exe 服务器启动文件(d：deamon进程)
      mysql.exe  连接数据库服务器
      data： 保存数据库服务器中的数据
    安装使用MySQL数据库系统
      (1)服务器端：下载并安装mysql服务器软件
      (2)服务器端：启动mysql服务器，保证端口3306被MySQL占用
      (3)客户端：使用MySQL.exe连接数据库
           输入命令：mysql.exe -h127.0.0.1 -P3306 -uroot -p
           (-hlocalhost也可，-P3306的P需大写)
           -h：host
           -P:port端口;
           -u：user用户名(root为默认用户名)
           -p：password密码
           最终简写形式：mysql -uroot (-uroot如果删除则进入的来宾账户)

  4. MySQL常用管理命令(前提是已经成功连接进入数据库)【全部加分号结尾】
    quit;(exit;)    退出数据库：
    show databases;    查看服务器中有哪些数据库：
    use dbName数据库名称;  使用数据库：
    show tables;    显示当前数据库中所有的数据表
    desc tableName数据表名称; 描述表中都有哪些列(表头)
    练习：查询MySQL数据库中每一个数据库都有多少个数据表
  5. MySQL中的SQL语句
    SQL：Structured Query Language 结构化查询语言，用于操作关系型数据服务器
       中的数据————增删改查
    SQL语言最早由ANSI提出，后提交给ISO最终成为了数据库行业标准的语言，
       分为SQL-87、SQL-92、SQL-99，被绝大多数关系型数据库所支持。

    SQL语句两种执行方式：
      (1)交互模式：在客户端输入一行，点击回车，服务器执行一行。
        适用于临时性查看数据
        mysql -uroot 回车
      (2)脚本模式：客户端把要执行的命令写在一个文本文件中，一次性提交给服务器执行。
        适用于批量的增删改查。
        mysql -uroot < C:/xampp/htdocs/.../2.sql()
    SQL语法规范：
      (1)每条SQL语句都以英文分号结尾，一条语句可跨越多行(USE命令除外)，见到分号认为语句结束。
      (2)假如第N条语句出现语法错误，则此语句之后的所有语句都不会再执行。
      (3)SQL语句不区分大小写，习惯上，关键字用大写，非关键字用小写。
      (4)SQL语句单行注释(#...)、多行注释(/*...*/)，注释的语句不执行。
    常用的SQL语句
      (0)指定编码格式
          SET NAMES UTF8;
      (1)丢弃指定的数据库，如果存在的话
           DROP DATABASE IF EXISTS jd;
      (2)创建新的数据库
           CREATE DATABASE jd CHARSET=UTF8;
      (3)进入(使用)创建的数据库
           USE jd;
      (4)在进入的数据库中创建数据表
           CREATE TABLE emp(
            id INT,
            name VARCHAR(20),
            addr VARCHAR(20),
            phone VARCHAR(11)
           );
      (5)插入数据
        a. INSERT INTO tableName(column1,colume2,column3...)
            VALUES (value1,value2,value3...),(value1,value2,value3...)...; //批量插入多行指定某几个列的数据
        b. INSERT INTO emp VALUES('1','Tom','BEIJING','131...'); // 插入一行完整的完整的包含每一列数据
        c. INSERT INTO emp VALUES(...),(...),(...),(...); // 插入多行完整的包含每一列数据
        d. INSERT INTO emp(name,phone) VALUES('Jerry','135...',);
        e. INSERT INTO tableName SET field1 = value1,field2 = value2,... ; // 使用键值对快速插入一行若干列数据，不能批量插入
        f. INSERT INTO tableName SET {field1 = value1,field2 = value2,...};// 使用对象形式插入数据
      (6)删除数据
           DELETE FROM emp WHERE id='2';
      (6)更改数据
           UPDATE user SET upwd='12345678', email='123@163.com' WHERE uid='3';
      (7)查询数据
           SELECT * FROM emp;
    练习：新建4.sql，创建数据库tedu，在其中创建表student，
    包含sid,name,sex,score，向表中插入4条学生的数据
课后练习：
创建xz.sql，创建数据库xz，在其中创建表user，
包含uid,uname,upwd,email,phone,sex,userName(真实姓名)，registerTime(注册时间 2018-08-20)
插入5条数据，并查询所有。
--------------------------------------------------------------------------------------

2.数据库中的中文乱码
  计算机如何存储英文字符
    ASCII码：总共有128个，对所有的英文字符以及符号进行的编码。
    Latin-1：总共有256个，兼容ASCII码，同时对欧洲的符号进行了编码。
    MySQL默认使用Latin-1编码，而Latin-1不支持中文字符，直接插入中文会出现乱码。
  计算机如何存储中文字符
    GB2312：对六千多个中文字符进行的编码，主要是简体中文，兼容ASCII码。
    GBK：对两万多个中文字符进行编码，支持简繁体，兼容ASCII码。
    Unicode：对世界上主要国家的语言进行了编码，兼容ASCII码。有UTF-8，UTF-16，UTF-32存储方案
  中文乱码解决方案：
    (1)sql脚本文件保存时使用UTF8
    (2)客户端连接服务使用UTF8
    (3)服务器存储数据使用UTF8
练习：创建一个脚本文件01_dangdang.sql，使用UTF8，创建book数据表，
    包含bid，title，price，pubDate，isJia(是或否)

3. 列类型
  创建数据表的时候，制定的列所保存的数据类型
  CREATE TABLE book(bid 列类型);
  (1)数值类型-------数值类型可以不加引号
    TINYINT   微整型，1字节，存储范围 -128~127
    SMALLINT  小整型，占用二个字节，存储范围 -32768~32767
    INT    整型，占用四个字节，存储范围-2147483648~2147483647
    BIGINT   大整型，占用八个字节，存储范围-9223372036854775808~9223372036854775807
    FLOAT   单精度浮点型，占用4个字节，可取出几位作为指数使用，实际存储范围比INT大得多
    DOUBLE   双精度浮点型，占8个字节，实际存储范围比BIGINT大得多
    DECIMAL(M,D) 定点小数，不会产生误差,总共有效位数(不含小数点)，D表示小数点后有效位数
    BOOL   布尔型，只有两个值，TURE(1)和FALSE(0)，最终的存储方式使用数字1和0
类型     大小    范围(有符号)          范围(无符号)                   用途
TINYINT    1字节   (-128，127)             (0，255)                      小整数值
SMALLINT   2 字节  (-32 768，32 767)          (0，65 535)                     大整数值
MEDIUMINT   3 字节  (-8 388 608，8 388 607)       (0，16 777 215)                   大整数值
INT或INTEGER 4 字节  (-2 147 483 648，2 147 483 647)   (0，4 294 967 295)                 大整数值
BIGINT    8 字节  (-9 233 372 036 854 775 808，9 223 372 036 854 775 807)  (0，18 446 744 073 709 551 615) 极大整数值
FLOAT     4 字节  (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) 0，(1.175 494 351 E-38，3.402 823 466 E+38) 单精度
浮点数值
DOUBLE    8 字节  (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) 双精度
浮点数值
DECIMAL   对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 依赖于M和D的值 依赖于M和D的值 小数值


  (2)日期/时间类型--必须加引号( 日期列插入 now()  表示当前时间 )
    DATE   日期类型，例如2018-09-04
    TIME   时间类型，例如14:50:30
    DATETIME  日期时间类型，例如：2018-09-04 14:50:30
    存储时间，存储的是距离1970年1月1日的毫秒数。

类型  大小(字节)    范围              格式         用途
DATE   3   1000-01-01/9999-12-31           YYYY-MM-DD      日期值
TIME   3   '-838:59:59'/'838:59:59'         HH:MM:SS       时间值或持续时间
YEAR   1   1901/2155                 YYYY         年份值
DATETIME 8   1000-01-01 00:00:00/9999-12-31 23:59:59  YYYY-MM-DD HH:MM:SS  混合日期和时间值
TIMESTAMP 4
1970-01-01 00:00:00/2038

结束时间是第 2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07

YYYYMMDD HHMMSS 混合日期和时间值，时间戳
  (3)字符串类型-----必须加引号
    VARCHAR(M)  Variable Character 变长字符串，查询速度相对较慢，不存在空间浪费，M长度最多存储65535
    CHAR(M)   定长字符串，如手机号，身份证号等，查询速度较快，可能存在空间浪费，M最多存储255
    TEXT(M)   大型变长字符串，M最多存储2G
    注：
      VARCHAR(M)中字符串长度小于指定长度M时，字符串后只补一个空格\0
      CHAR(M)中字符串长度小于指定长度M时，字符串后补多个空格\0直至长度和指定长度相同
练习：创建一个脚本文件02_xz.sql,设置编码UTF8，创建数据库xz，在其中创建表laptop，
    包含lid,title,price,stockCount,shelfTime,isIndex，插入4条。
练习：使用恰当的列类型
    创建脚本文件03_tedu.sql,设置UTF8，创建数据库tedu，创建部门信息表dept，包含did,dname,empCount,
    10号部门，3人
    20号部门，2人
    30号部门，2人
    创建员工表emp，包含eid,ename,sex,phone,birthday,salary,deptid
3. 约束(constraint)
  MySQL可以对插入表中的数据进行特定的验证，只有满足条件的数据才允许进入数据库
  约束可以在CREATE TABLE(建立表时)或ALTER TABLE(表建立后)添加或修改
  约束定义在单列(列级约束), 可以约束当前列的数据;多列约束必须定义表级约束,相关的列在括号中指定,用逗号分隔
  如果没有为约束提供一个名字,那么ORACLE会分配一个系统生成的唯一名字,以SYS_开头,
  可以使用关键字CONSTRAINTS后面跟随相关的约束名字来为约束指定名字.
  (1)主键约束 PRIMARY KEY
    主键约束相当于 唯一约束 + 非空约束 的组合，主键约束列不允许重复，也不允许出现空值
    每个表最多只允许一个主键，建立主键约束可以在列级别创建，也可以在表级别创建。
    当创建主键的约束时，系统默认会在所在的列和列组合上建立对应的唯一索引。
    使用主键约束会加快查找速度。
    约束定义存储在数据字典中,查询USER_CONSTRAINTS可以获得相关信息.
    A. 建表时约束:
      A. 列级
        CREATE TABLE users(
          uid INT(10) PRIMARY KEY,
          ...
        );
      B. 表级
        CREATE TABLE users(
          uid INT(10),
          ...,
          CONSTRAINT users_id_pk PRIMARY KEY(id)
        );
      C. 复合主键
        CREATE TABLE users(
          uid INT(10),
          uname VARCHAR(16),
          ...,
          CONSTRAINT xxx PRIMARY KEY(uid,uname)
        );
    B. 建表后约束:
      ALTER TABLE 表名 ADD CONSTRAINT 约束名称 增加的约束类型 (列名)
      ALTER TABLE users ADD CONSTRAINT xxx PRIMARY KEY (id)
    C. 修改列为主键
      ALTER TABLE users MODIFY uname VARCHAR(32) PRIMARY KEY;
  (2)唯一约束 UNIQUE
    声明了唯一约束的列不能插入重复的值，但是允许插入一个或多个NULL。可在多行插入UNIQUE。
    创建唯一约束时，如果不定义约束名称，就默认和列名相同。
    A. 建表时约束:
      A. 列级
        CREATE TABLE users(
          uid INT(10) PRIMARY KEY,
          uname VARCHAR(32) NOT NULL UNIQUE,
          ...
        );
      B. 表级
        CREATE TABLE users(
          uid INT(10),
          uname VARCHAR(32) NOT NULL,
          ...,
          CONSTRAINT users_uname-uq UNIQUE(id)
        );
      C. 复合
        CREATE TABLE users(
          uid INT(10),
          uname VARCHAR(32),
          email VARCHAR(64),
          ...,
          //另一条数据的UNAME和EMAIL都重复则报错,一项重复不报错
          CONSTRAINT xxx UNIQUE(uname,email)
        );
    B. 建表后约束:
      ALTER TABLE 表格名称 ADD CONSTRAINT 约束名称 增加的约束类型 (列名)
      ALTER TABLE users ADD CONSTRAINT xxx UNIQUE (id)
  (3)非空约束 NOT NULL
    禁止插入NULL，必须给定具体的数据,如果定义了NOT NULL的列没有插入数据，则会报错
    如果插入的值是null，不会报错，字符串保存的值变成空的，数值型保存的值变成0。
    非空约束只能定义列级，不能定义表级
  (4)默认值约束 DEFAULT
    可以使用DEFAULT关键字为类声明默认值，两种方法使用：
    在定义类后写 DEFAULT 值，然后在插入中写DEFAULT则使用默认值。
    ① INSERT INTO user VALUES(1,'Tom',DEFAULT); #DEFAULT为默认值
    ② INSERT INTO user(uid,uname) VALUES(1,'Tom'); #最后一栏不写也是默认值
  (5)检查约束 CHECK
    检查约束对要插入的数据进行检验
    CREATE TABLE student(
      score TINYINT CHECK(score>=0 AND score<=100)
    );
    MySQL不支持检查约束CHECK，它认为会降低数据的插入速度。
  (6)外键约束 FOREIGN KEY
    声明了外键约束的列，取值必须在另一个表的主键列上出现过。
    外部键列和引用键(reference key)列可以位于相同的表中(自引用完整性约束)
    FOREIGN KEY约束还有两个关键字：
      ON DELETE CASCADE --当删除所引用的父表记录时,删除子表中相关的记录
      ON DELETE SET NULL--与上面不同的是删除时,转换子表中相关记录为NULL值
      默认情况下,如果没有指定以上两个中任一,则父表中被引用的记录将不能被删除.
    FOREIGN KEY(本表的列) REFERENCES 之前的表(表中的列)
    A. 创建表时约束
      CREATE TABLE posts(
        uid INT(10) REFERENCES users(uid) ON DELETE SET NULL, //列级
        newsid INT(10)
        ...,
        posts_id INT(10),
        FOREIGN KEY(uid) REFERENCES users(uid) ON DELETE CASCADE//表级,不指定约束名称,系统默认命名posts_uidfk_n(n为整数)
        FOREIGN KEY(posts_id) REFERENCES posts(newsid) //自引用、自关联（递归表、树状表）
      );
      多列外键组合，必须用表级别约束语法
      CONSTRAINT fk_uid_uname FOREIGN KEY(uid, uname) REFERENCES CLASSES(uid, uname)
    B. 建表后约束
      ALTER TABLE EMP ADD CONSTRAINT users_uid_fk FOREIGN KEY (did) REFERENCES users (id)
  (7) 约束命令
    添加约束
      ALTER TABLE posts ADD CONSTRAINT users_uid_fk FOREIGN KEY(uid) REFERENCES users(uid);
    删除约束
      ALTER TABLE posts DROP CONSTRAINT users_uid_fk;
      ALTER TABLE users DROP PRIMARY KEY CASCADE; //由于departments被employees.department_id引用了
    删除NOT NULL约束,用ALTER TABLE MODIFY子句来删除
      ALTER TABLE users MODIFY email NULL;
    删除外键约束
      ALTER TABLE TEMP DROP INDEX email;
      alter table student drop foreign key fk_uid_uname;
    关闭约束
      ALTER TABLE users DISABLE CONSTRAINT users_uid_pk CASCADE;   //如果没有被引用则不需CASCADE关键字
    打开约束
      ALTER TABLE users ENABLE CONSTRAINT users_uid_pk; //注意,打开一个先前关闭的被引用的主键约束,并不能自动打开相关的外部键约束

    可以从约束合集视图中查询约束的信息
    SELECT constraint_name,constraint_type,search_condition
      FROM user_constraints WHERE   table_name='users';

    约束类型
    C--CHECK和NOT NULL都算为C TYPE
    P--PRIMARY KEY
    R--REFERENTIAL INTEGRITY就是外部键约束
    U--UNIQUE
4. 注释(comment)
  CREATE TABLE users(
    uid INT NOT NULL DEFAULT 0 COMMENT '用户ID', //列的注释
    ...
  )COMMENT='用户表'; //表的注释
  建表后添加注释
    ALTER TABLE TEST CHANGE COLUMN ID ID INT NOT NULL DEFAULT 0 COMMENT '用户编号'
  修改表的注释修改表的注释
    ALTER TABLE users COMMENT '修改后的表的注释';
  修改列的注释
    ALTER TABLE users MODIFY COLUMN uid INT COMMENT '用户编号';
  查看表的注释
    SHOW CREATE TABLE users;
  查看列的注释
    SHOW FULL COLUMNS FROM users;
4. 正则表达式
  查找name是以'st'为开头的所有数据：
  SELECT name FROM person_tbl WHERE name REGEXP '^st';

5. 运算符
  (1)算术运算符
      +    加法
      -    减法
      *    乘法
      /    除法 10 / 4 == 2.5
      DIV   商值，10 DIV 4 ==2
      %    或 MOD 取余
  (2)比较运算符(返回 1， 0，或 NULL)
      =           等于
      <>, !=        不等于
      >           大于
      <           小于
      <=          小于
      >=          大于等于
      BETWEEN...AND...   在两值之间 >=min&&<=max
      NOT BETWEEN...AND... 不在两值之间
      IN          在集合中 select 5 in (1,2,3,4,5);
      NOT IN        不在集合中 select 5 not in (1,2,3,4,5);
      <=>          严格比较两个NULL值是否相等 两个操作码均为NULL时，其所得值为1；而当一个操作码为NULL时，其所得值为0
      LIKE         模糊匹配
      REGEXP或RLIKE     正则式匹配
      IS NULL        为空
      IS NOT NULL      不为空
  (3)逻辑运算符
      NOT 或 !   非
      AND      与
      OR      或
-------------------------------------------------------------------------------

1. 标准SQL语句的分类
  (1)DDL：Data Define Language 定义数据语言
     CREATE/DROP/ALTER(修改)/TRUNCATE(删除内容、释放空间但不删除定义)
  (2)DML：Data Manipulate Language 操作数据语言
     INSERT/DELETE/UPDATE
  (3)DQL：Data Quary Language  查询数据语言
     SELECT
  (4)DCL：Data Control Language 控制数据语言
     GRANT(授权、管理数据库)，REVOKE(收权)

2. 扩展知识：MySQL中的自增列
  AUTO_INCREMENT 只能用于整型列的主键上
  作用：在原来的最大值基础上+1，允许手动赋值，如果设置NULL就会自增。

练习：创03_tedu.sql，创库03_tedu,
    创表dept(did,dname)
    10  研发部
    20 测试部
    30 运营部
    40 市场部
    创表emp(eid,ename,sex,phone,birthday,salary,deptId)
    插入15条数据，有一个员工部门为NULL，其中市场部没有员工
3. 简单查询
  (1)查询所有的列：SELECT * FROM emp;
  (2)查询特定的列：
     查询所有员工的编号的姓名：SELECT eid,ename FROM emp;
     查询所有员工的姓名，性别，工资，生日：SELECT ename,sex,salary,birthday FROM emp;
  (3)给列取别名：(AS可省略，引号可省略，但乱码时要set charset gbk;)
     查询员工的姓名，工资，列名称使用汉字：SELECT ename AS '姓名', salary AS '工资' FROM emp;
     查询所有员工的编号，姓名，性别，生日，全部使用中文别名：
     SELECT eid '编号',ename '姓名',sex '性别',birthday '生日' FROM emp;
     SELECT eid 编号,ename 姓名,sex 性别,birthday 生日 FROM emp;
  (4)只显示不同的记录(合并相同的记录)
     查询哪些部门下有员工(员工都在哪些部门)？
     SELECT DISTINCT deptId FROM emp;
     查询公司都有哪些性别的员工？
     SELECT DISTINCT sex FROM emp;
  (5)在查询时执行计算
     计算3*4/5+2
     SELECT 3*4/5+2 AS 结果;
     查询出所有员工的姓名和年薪
     SELECT ename 姓名, salary*12 年薪 FROM emp;
     假设每个员工工资增加500，年终奖是5000，查询所有员工的姓名和年薪是多少。
     SELECT ename 姓名, (salary+500)*12+5000 年薪 FROM emp;
  (6)查询结果集的排序(ORDER BY 后不写ASC/DESC的话，默认为ASC升序)
     查询出所有的部门信息，结果按照部门编号排序
     SELECT * FROM dept ORDER BY did ASC; #ASC：Ascendent 升序排列
     SELECT * FROM dept ORDER BY did DESC; #DESC：Descendent 降序排列
     查询所有的员工，结果按照工资由低到高排序；
     SELECT * FROM emp ORDER BY salary;
     查询所有的员工，按照年龄排序从小到大；
     SELECT * FROM emp ORDER BY birthday DESC;
     查询所有的员工，按照姓名升序排列；
     SELECT * FROM emp ORDER BY ename ASC;
     按工资升序排，工资相同则按照姓名升序排。
     SELECT * FROM emp ORDER BY salary ASC,sex ASC,ename DESC;
     按生日升序，相同则按工资降序；
     SELECT * FROM emp ORDER BY birthday ASC,salary DESC;
  (7)条件查询
     查询出编号为5的员工的所有信息
      SELECT * FROM emp WHERE eid=5;
     查询出姓名为KING的员工的编号，工资，生日
      SELECT eid,salary,birthday FROM emp WHERE ename='KING';
     查询出所有的男员工信息
      SELECT * FROM emp WHERE sex=1;
     查询出工资大于等于5000的员工信息；
      SELECT * FROM emp WHERE salary>=5000;
     查询出19910101之后出生的员工信息
      SELECT * FROM emp WHERE birthday>=19910101;#也可写'1991-1-1','1991-01-01'，有杠需有引号
     查询出不在10号部门的员工信息
      SELECT * FROM emp WHERE deptId!=10;
     查询出暂时没有部门的员工信息；
      SELECT * FROM emp WHERE deptId IS NULL;#查询null只能用is不能用=
     查询出有明确部门的员工信息；
      SELECT * FROM emp WHERE deptId IS NOT NULL;
     查询出工资大于6000的女员工的信息；
      SELECT * FROM emp WHERE salary>6000 AND sex=0;
     查询出工资在5000~5999之间的员工信息；
      SELECT * FROM emp WHERE salary>=5000 AND salary<=5999;
      SELECT * FROM emp WHERE salary BETWEEN 5000 AND 5999;#BETWEEN...AND...用于两者之间的条件
     查询出工资小于4000和大于8000的员工信息;
      SELECT * FROM emp WHERE salary<=4000 OR salary>=8000;
      SELECT * FROM emp WHERE salary NOT BETWEEN 4000 AND 8000;
     查询出在1991年出生的员工信息;
      SELECT * FROM emp WHERE birthday>=19910101 AND birthday<=19911231;
      SELECT * FROM emp WHERE birthday BETWEEN 19910101 AND 19911231;
     查询出在1990年之前和1993年之后出生的员工信息;
      SELECT * FROM emp WHERE birthday<19900101 OR birthday>19931231;
      SELECT * FROM emp WHERE birthday NOT BETWEEN 19900101 AND 19931231;
     查询出在10号和30号部门的员工信息;
      SELECT * FROM emp WHERE deptId=10 OR deptId=30;
      SELECT * FROM emp WHERE deptId IN(10,30);#IN(条件1，条件2...)满足任一条件即选出
     查询出在10,30,50,80号部门的员工信息;
      SELECT * FROM emp WHERE deptId=10 OR deptId=30 OR deptId=50 OR deptId=80;
      SELECT * FROM emp WHERE deptId IN(10,30,50,80);
     查询出不在10和30号部门的员工信息;
      SELECT * FROM emp WHERE deptId!=10 AND deptId!=30 OR deptId IS NULL;
      SELECT * FROM emp WHERE deptId NOT IN(10,30) OR deptId IS NULL;
    删除工资在5000~10000之间的员工信息；
      DELETE FROM emp WHERE salary BETWEEN 5000 AND 10000;
  (8)模糊查询(LIKE) %代表任意字符
     查询出姓名中包含字母E的员工信息；
      SELECT * FROM emp WHERE ename LIKE '%e%';# %在前后表示前后都还有字符
     查询出姓名以E结尾的员工信息；
      SELECT * FROM emp WHERE ename LIKE '%e';#后面无%表示后面没有字符
     查询出姓名中倒数第二个字符是E的员工信息；
      SELECT * FROM emp WHERE ename LIKE '%e_'; #_一个字符；__两个；___三个...
  (9)分页查询----LIMIT
     分页显示：查询结果集中有太多的记录行，一次显示不完，可以分页显示，
     不同的数据库有不同的分页查询方式，MySQL分页查询最简单。
     语法：limit后的两个数不能加引号
      SELECT * FROM emp LIMIT START,count;
      #START：是一个数字，表示从结果集中的哪一行开始读取。
      #COUNT：是一个数字，表示读取的最多行数。
      假设每一页最多显示4条记录：
        SELECT * FROM emp LIMIT 0,4; #第一页
        SELECT * FROM emp LIMIT 4,4; #第二页
        SELECT * FROM emp LIMIT 8,4; #第三页
        ...
      假设每一页最多显示5条记录：
        SELECT * FROM emp LIMIT 0,5; #第一页
        SELECT * FROM emp LIMIT 5,5; #第二页
        SELECT * FROM emp LIMIT 10,5; #第三页
        ...
      练习：查询工资最低的5个员工
        SELECT * FROM emp ORDER BY salary asc LIMIT 0,5;
      练习：查询男员工中工资最高的五个人
        SELECT * FROM emp WHERE sex=1 ORDER BY salary DESC LIMIT 0,5;
综合语法：SELECT ... FROM tableName WHERE ... ORDER BY ... LIMIT...;
          SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY ... LIMIT ...;

4. 复杂查询----聚合查询/分组查询
  函数：功能体，接收若干个数据，返回特定的计算结果。
  (1)聚合函数：COUNT(...); sum(...); avg(...); MAX(...); MIN(...);
  示例：查询出所有员工的数量
    SELECT COUNT(eid) FROM emp;
    SELECT COUNT(deptId) FROM emp;#deptId有一行为null，查不到null的行数
    SELECT COUNT(*) FROM emp; #推荐使用
  男员工数量：SELECT COUNT(sex) FROM emp WHERE SEX=1;
  女员工数量：SELECT COUNT(sex) FROM emp WHERE SEX=0;
  查询出所有员工的工资总和：
    SELECT SUM(salary) FROM emp;
  查询出所有员工的平均工资：
    SELECT SUM(salary)/COUNT(*) FROM emp;
    SELECT AVG(salary) FROM emp;
  查询出工资最高/最低的员工：
    SELECT MAX(salary) FROM emp;
    SELECT MIN(salary) FROM emp;
  查询年龄最大/最小的员工：
    SELECT MIN(birthday) FROM emp;
    SELECT MAX(birthday) FROM emp;
  (2)分组查询：GROUP BY ... 只能查询分组的条件和聚合函数。
  查询出每个部门的员工数量是多少：
    SELECT deptId,COUNT(*),SUM(salary) FROM emp GROUP BY deptId;
  查询出男女员工的平均工资/最高工资/最低工资：
    SELECT sex '性别',SUM(salary) '工资总和',AVG(salary)'平均工资',
      Max(salary)'最高工资',MIN(salary) '最低工资' FROM emp GROUP BY sex;
  year(rowName) 获取rowName日期中的年份
  month(rowName) 获取rowName日期中的月份
  day(rowName) 获取rowName日期中的天
  查询出1991年出生的员工：
  SELECT * FROM emp where YEAR(birthday)=1991;
  查询出3月份出生的员工：
  SELECT * FROM emp where MONTH(birthday)=3;
  查询出每个月5号生日的员工：
  SELECT * FROM emp where DAY(birthday)=5;

  (3)子查询---一个SQL语句的结果作为另一个SQL语句的查询条件。
  查询出研发部中的所有员工的信息
    步骤1：查询出研发部的部门编号：
      SELECT did FROM dept WHERE dname='研发部';
    步骤2：查询出员工表中，部门编号为10的员工
      SELECT * FROM emp WHERE deptId=10;
    综合：
      SELECT * FROM emp WHERE deptId=(SELECT did FROM dept WHERE dname='研发部');
    练习：查询出工资比Tom高的所有员工信息：
      SELECT * FROM emp WHERE salary>(SELECT salary FROM emp WHERE ename='Tom');
    练习：查询出与Tom同一年出生的员工信息：
      SELECT * FROM emp WHERE year(birthday)=(SELECT year(birthday) FROM emp WHERE ename='Tom');
  (4)多表查询
    查询出所有员工的姓名及其部门名称
      SELECT ename,dname FROM emp,dept; #产生笛卡尔积错误
    多表查询如何避免笛卡尔积，为查询添加条件
      SELECT ename,dname FROM emp,dept WHERE deptId=did;
    /*上述的语法是SQL-92中的多表查询语法，无法查询出没有部门的员工，
      也无法查询出没有员工的部门,SQL-99中提出了新的多表查询方法
    */
    ①内连接 INNER JOIN tableName ON 条件----和SQL-92的结果一致，不完整。
      SELECT ename,dname FROM emp INNER JOIN dept ON deptId=did;
    ②左外链接 LEFT OUTER JOIN tableName ON 条件
      #查询结果是左侧所有的记录都显示
      SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON deptId=did;
      #OUTER可省略
      SELECT ename,dname FROM emp LEFT JOIN dept ON deptId=did;
    ③右外链接 RIGHT OUTER JOIN tableName ON 条件
      #查询结果是右侧所有的记录都显示，OUTER可省略
      SELECT ename,dname FROM emp RIGHT JOIN dept ON deptId=did;
    ④全连接 FULL JOIN
    #查询结果是显示左侧和右侧所有的记录，MySQL不支持。
     MySQL的全连接形式：UNION/UNION ALL
    #两个查询结果集中合并相同记录  UNION
    SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON deptId=did
    UNION
    SELECT ename,dname FROM emp RIGHT JOIN dept ON deptId=did;

    #两个查询结果集中不合并相同记录  UNION ALL
    SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON deptId=did
    UNION ALL
    SELECT ename,dname FROM emp RIGHT JOIN dept ON deptId=did;

课后任务：
  (1)复习今天内容，把代码删除只保留注释，重新书写SQL语句。
  (2)创建学子商城数据库
  (3)预习复杂查询















































```
