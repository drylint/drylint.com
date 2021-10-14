(window.webpackJsonp=window.webpackJsonp||[]).push([[192],{395:function(s,a,t){"use strict";t.r(a);var e=t(6),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#触发器"}},[s._v("#")]),s._v(" 触发器")]),s._v(" "),t("p",[s._v("MySQL 语句在需要时被执行，存储过程也是如此。但是，如果你想要某条语句（或某些语句）在事件发生时自动执行，怎么办呢？")]),s._v(" "),t("p",[s._v("触发器是 MySQL 响应 "),t("code",[s._v("DELETE")]),s._v(", "),t("code",[s._v("INSERT")]),s._v(", "),t("code",[s._v("UPDATE")]),s._v(" 语句而自动执行的一条语句。")]),s._v(" "),t("p",[s._v("在 MySQL 5中，触发器名必须在每个表中唯一，但不是在每个数据库中唯一。这在其他每个数据库触发器名必须唯一的 DBMS 中是不允许的，但尽量应该在数据库范围内使用唯一的触发器名。")]),s._v(" "),t("h2",{attrs:{id:"创建触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建触发器"}},[s._v("#")]),s._v(" 创建触发器")]),s._v(" "),t("p",[s._v("触发器用 "),t("code",[s._v("CREATE TRIGGER")]),s._v(" 语句创建：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TRIGGER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("触发器名"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("BEFORE "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("AFTER")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UPDATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DELETE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("表名"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOR EACH ROW")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("触发器执行的语句"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("上述语句中：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("CREATE TRIGGER <触发器名>")]),s._v(" 创建触发器")]),s._v(" "),t("li",[t("code",[s._v("<BEFORE | AFTER> <INSERT | UPDATE | DELETE>")]),s._v(" 表示可以在 "),t("code",[s._v("INSERT")]),s._v(", "),t("code",[s._v("UPDATE")]),s._v(", "),t("code",[s._v("DELETE")]),s._v(" 语句之前或之后执行，"),t("code",[s._v("BEFORE")]),s._v(" 通常用于拦截验证数据。")]),s._v(" "),t("li",[t("code",[s._v("ON <表名>")]),s._v(" 指定触发器监听的是哪一张表，只有表才支持触发器，视图不支持。")]),s._v(" "),t("li",[t("code",[s._v("FOR EACH ROW <触发器执行的语句>")]),s._v(" 表示对每一行的操作都执行什么语句")])]),s._v(" "),t("p",[s._v("触发器按每个表每个事件每次地定义，每个表每个事件每次只允许一个触发器。因此，每个表最多支持 6 个触发器，分别是：")]),s._v(" "),t("ul",[t("li",[t("code",[s._v("BEFORE INSERT")])]),s._v(" "),t("li",[t("code",[s._v("AFTER INSERT")])]),s._v(" "),t("li",[t("code",[s._v("BEFORE UPDATE")])]),s._v(" "),t("li",[t("code",[s._v("AFTER UPDATE")])]),s._v(" "),t("li",[t("code",[s._v("BEFORE DELETE")])]),s._v(" "),t("li",[t("code",[s._v("AFTER DELETE")])])]),s._v(" "),t("p",[s._v("一个触发器不能与多个事件或多个表关联，比如，如果你需要对 "),t("code",[s._v("INSERT")]),s._v(" 和 "),t("code",[s._v("UPDATE")]),s._v(" 触发相同的操作，也需要分别定义两个触发器。")]),s._v(" "),t("p",[s._v("触发器的执行流程："),t("code",[s._v("BEFORE => 增/删/改语句 => AFTER")]),s._v(" ，任意一个环节出错后，后续都不会再执行。")]),s._v(" "),t("h3",{attrs:{id:"insert-语句的触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#insert-语句的触发器"}},[s._v("#")]),s._v(" INSERT 语句的触发器")]),s._v(" "),t("ul",[t("li",[s._v("在 INSERT 触发器代码内，可引用一个名为 "),t("code",[s._v("NEW")]),s._v(" 的关键字，表示被插入的行数据")]),s._v(" "),t("li",[s._v("在 "),t("code",[s._v("BEFORE INSERT")]),s._v(" 触发器中， 可以拦截并修改 "),t("code",[s._v("NEW")]),s._v(" 中的值，也就是更改被插入的行数据")]),s._v(" "),t("li",[s._v("对于 "),t("code",[s._v("AUTO_INCREMENT")]),s._v(" 列， "),t("code",[s._v("NEW")]),s._v(" 在 "),t("code",[s._v("INSERT")]),s._v(" 执行之前包含 "),t("code",[s._v("0")]),s._v(" ，在 "),t("code",[s._v("INSERT")]),s._v(" 执行之后包含新的自动生成值")])]),s._v(" "),t("p",[s._v("比如，确定新插入行的 "),t("code",[s._v("AUTO_INCREMENT")]),s._v(" 列的值：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 假设 orders 表中，id 是自增列，触发器语句中通过 NEW 访问插入的行数据")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TRIGGER")]),s._v(" after_orders_insert\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("AFTER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" orders\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOR EACH ROW")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SELECT")]),s._v(" NEW"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"delete-语句的触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#delete-语句的触发器"}},[s._v("#")]),s._v(" DELETE 语句的触发器")]),s._v(" "),t("ul",[t("li",[s._v("在 "),t("code",[s._v("DELETE")]),s._v(" 触发器代码内，你可以引用一个名为 "),t("code",[s._v("OLD")]),s._v(" 的关键字，表示被删除的行数据")]),s._v(" "),t("li",[t("code",[s._v("OLD")]),s._v(" 中的值全都是只读的，不能修改。")])]),s._v(" "),t("p",[s._v("比如，在删除 "),t("code",[s._v("orders")]),s._v(" 订单表每一行数据之前，先把这一行数据存到另一张存档表  "),t("code",[s._v("archive_orders")]),s._v(" 之中：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TRIGGER")]),s._v(" before_orders_delete\nBEFORE "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DELETE")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" orders\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOR EACH ROW")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BEGIN")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果要完全复制行数据，并且两张表结构一致的话，")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 可使用 INSERT INTO archive_orders VALUES OLD;")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INSERT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("INTO")]),s._v(" archive_orders"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" order_num"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" user_id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("VALUES")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("OLD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" OLD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("order_num"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" OLD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("user_id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("END")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("p",[s._v("上例中，"),t("code",[s._v("BEGIN ... AND;")]),s._v(" 语句不是必须的，但是没有坏处，使用 "),t("code",[s._v("BEGIN ... AND;")]),s._v(" 则可以兼容执行多条语句的情况。")]),s._v(" "),t("h3",{attrs:{id:"update-语句的触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#update-语句的触发器"}},[s._v("#")]),s._v(" UPDATE 语句的触发器")]),s._v(" "),t("ul",[t("li",[s._v("在 "),t("code",[s._v("UPDATE")]),s._v(" 触发器执行的语句中，可以引用一个名为 "),t("code",[s._v("OLD")]),s._v(" 的关键字访问更新前的旧值，引用一个名为 "),t("code",[s._v("NEW")]),s._v(" 的关键字访问新更新的值；")]),s._v(" "),t("li",[s._v("在 "),t("code",[s._v("BEFORE UPDATE")]),s._v(" 触发器执行的语句中，可以拦截并修改 "),t("code",[s._v("NEW")]),s._v(" 中的值，也就是更改被插入的数据，")]),s._v(" "),t("li",[t("code",[s._v("OLD")]),s._v(" 中的值全都是只读的，不能更新。")])]),s._v(" "),t("p",[s._v("比如，更新 users 用户表的数据时，拦截新数据中的 email 字段，存储为全小写：")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TRIGGER")]),s._v(" before_users_update\nBEFORE "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("UPDATE")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" users\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("FOR EACH ROW")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BEGIN")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" NEW"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("email "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" Lower"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("NEW"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("email"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("END")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("可以看到，用触发器来保证数据的一致性（大小写、格式等）是非常方便的。在触发器中执行这种类型的处理的优点是它总是会进行这种处理，而且是透明地进行，与客户机应用无关。")]),s._v(" "),t("p",[s._v("遗憾的是，MySQL触发器中不支持 CALL 语句。这表示不能从触发器内调用存储过程。所需的存储过程代码需要复制到触发器内。")]),s._v(" "),t("h2",{attrs:{id:"删除触发器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#删除触发器"}},[s._v("#")]),s._v(" 删除触发器")]),s._v(" "),t("p",[s._v("触发器不能更新或覆盖。为了修改一个触发器，必须先删除它，然后再重新创建。")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DROP")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TRIGGER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("触发器名"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])])])}),[],!1,null,null,null);a.default=r.exports}}]);