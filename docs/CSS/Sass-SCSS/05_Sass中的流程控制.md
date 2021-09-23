# Sass中的流程控制

[toc]

在 SassScript 中，用于控制流程的语句有：

- `@if`, `@else` 条件判断语句
- `@each` 遍历一个 list ， 或 一个 map 的键值对
- `@for` 循环一定的次数
- `@while` 循环直到遇到 `true` 值

## `@if`

语法为 `@if <expression> { ... }` ， 如果表达式返回 `true` 则执行代码块中的语句，否则什么都不做。

还可以搭配 `@else if` 和 `@else` 语句，`@else if` 之后写另一个判断表达式，`@else` 语句会在前面的所有条件都不满足时执行。

也就是，`@if` 返回 `false` 就执行 `@else if` ，如果没有 `@else if` 就执行 `@else` ， 如果没有 `@else` 就什么到不做。

```scss
$size: 100px;

@if $size > 100px {
  @debug "大于 100 px";
} @else if $size == 100px {
  @debug "等于 100px";
} @else {
  @debug "小于 100px";
}
```

注意，表达式只有返回 `false` 或 `null` 才表示不满足条件，返回其它任何类型都表示满足条件。

## `@for`

`@for` 循环语句，可以写成：

- `@for <variable> from start to end { ... }`
- `@for <variable> from start through end { ... }`

也就是有 `to` 和 `through` 的区别， `to` 表示不包含结束的数字， `through` 表示包含结束的数字。

```scss
@for $var from 1 to 5 {
  @debug $var;
}
// 1 2 3 4

@for $var from 1 through 5 {
  @debug $var;
}
// 1 2 3 4 5
```

## `@each`

遍历一个 list 或一个 map ，语法为 `@each $item in $list { ... }` 。

使用 `@each` 可以方便的生成大量重复却有一点小变化的样式。

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

编译后的 css ：

```css
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```

### 遍历 map

语法为 `@each $key, $value in $map { ... }` 。

```scss
$font-size: (
  "big": 20px,
  "middle": 16px,
  "small": 14px,
  "mini": 12px,
);

@each $key, $value in $font-size {
  .font-#{$key} {
    font-size: $value;
  }
}
```

编译后的 css ：

```css
.font-big {
  font-size: 20px;
}

.font-middle {
  font-size: 16px;
}

.font-small {
  font-size: 14px;
}

.font-mini {
  font-size: 12px;
}
```

### 解构 list 中的 list

如果一个 list 中的元素也是 list，那么可以使用 `@each $a, $b, ..., $n in $list` 直接将内层 list 的值依次取出来。

```scss
$font: (
  "small" 14px 400 #f00,
  "middle" 16px 500 #0f0,
  "big" 18px 600 #00f,
);

@each $name, $size, $weight, $color in $font {
  .font-#{$name} {
    font-size: $size;
    font-weight: $weight;
    color: $color;
  }
}
```

编译后的 css ：

```css
.font-small {
  font-size: 14px;
  font-weight: 400;
  color: #f00;
}

.font-middle {
  font-size: 16px;
  font-weight: 500;
  color: #0f0;
}

.font-big {
  font-size: 18px;
  font-weight: 600;
  color: #00f;
}
```

注意，如果 `@each` 后的变量数量多余内层数组的元素数量，多出来的变量将会得到 `null` 值。

```scss
$font: (
  "small" 14px 400 #f00,
  "middle" 16px 500 #0f0,
  "big" 18px 600 #00f,
);

@each $name, $size, $weight, $color, $other in $font {
  @debug $name, $size, $weight, $color, $other;
}

// "small", 14px, 400, #f00, null
// "middle", 16px, 500, #0f0, null
// "big", 18px, 600, #00f, null
```

每个 map 其实都算是一个包含键值对的列表，如果将上例中的 list 改成 map 类型：

```scss
$font: (
  "small": 14px 400 #f00,
  "middle": 16px 500 #0f0,
  "big": 18px 600 #00f,
);

@each $name, $size, $weight, $color, $other in $font {
  @debug $name, $size, $weight, $color, $other;
}

// "small", 14px 400 #f00, null, null, null
// "middle", 16px 500 #0f0, null, null, null
// "big", 18px 600 #00f, null, null, null
```

可以看到，遍历 list 和 map 时，`@each` 后的变量数量表示的意义有一点区别：

- 遍历 list 时，`@each` 之后的每个变量依次表示内层 list 的元素
- 遍历 map 时，`@each` 之后只有两个变量可以拿到值，第一个变量表示 map 的 key，第二个变量表示 map 的 值，尽管这个值也是一个 list，之后的变量都是 `null` 值。

## `@while`

`@while` 语句，写为 `@while <expression>{ ... }` ， 如果它的表达式返回 `true`，则一直反复运行代码块。一直持续到表达式最终返回 `false` 为止。

```scss
$num: 5;

@while $num <= 10 {
  @debug $num;
  $num: $num + 1;
}

// 5 6 7 8 9 10
```

注意，如果能使用 `@for` 或 `@each` 语句实现的话，尽量不使用 `@while` 语句。
