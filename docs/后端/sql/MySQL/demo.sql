create table user
(
    `id`            INT unsigned NOT NULL AUTO_INCREMENT COMMENT '用户 ID',
    `username`      varchar(45) NOT NULL comment '用户登录名',
    `nickname`      varchar(45) comment '昵称',
    `realname`      varchar(20) comment '真名',
    `email`         varchar(30) comment '电子邮箱',
    `avatar`        int(11) comment '头像',
    `birthday`      date comment '生日（年月日）',
    `gender`        tinyint NOT NULL default 0 comment '性别，0-未知，1-男，2-女，3-女转男，4-男转女，5-其他',
    `intro`         varchar(150) comment '简介',
    `register_ip`   int NOT NULL comment '用户注册时的源 IP',
    `status`        tinyint NOT NULL default 0 comment '帐号状态，0-未知，1-正常，2-禁用', # 默认插入时自动插入当前时间
    `create_at`   timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP comment '创建时间', # 默认更新时自动修改为当前时间
    `update_at`   timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP comment '修改时间',

    primary key (`id`),
    unique key `idx_id` (`id`),
    key `idx_username`(`username`),
    key `idx_create_at`(`create_at`)
)
engine = InnoDB
AUTO_INCREMENT = 10000000
default charset = utf8
comment = '用户表';
