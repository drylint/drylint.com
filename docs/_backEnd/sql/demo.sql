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
