
# Sass 中的函数 `@function`

[toc]

Sass 中的函数有些类似于 javascript 中的函数，先定义一个函数，然后调用这个函数。

- `@return` 只能且必须在 `@function` 中使用，也就是说二者必须同时出现。
- `@function` 只能作为一个属性的值，因为它返回的就只能是一个 css 值，而不能是样式块。

```scss
// 定义一个函数，指定接收的参数，使用之后返回一个结果
@function fn(a, b, ..., n) {
  // ...
  @return $result;
}

// 调用一个函数
@debug fn();
```

Sass 中还有一个和函数非常类似的东西，叫做 mixin，具体用法查看 mixin 章节。

从技术上讲，函数可能会有一些副作用，比如设置全局变量，但这是非常不鼓励的。应该使用 mixin 来产生副作用，使用函数仅仅是用来做一些值的计算。

## 默认参数

定义函数时可以提供默认参数值，如果调用时传递了对应参数，则忽略默认参数值，如果没有传递，则使用默认参数值。

```scss
@function sum ($a, $b: 16px) {
  @return $a + $b;
}

.div1 {
  font-size: sum(4px);
}

.div2 {
  font-size: sum(4px, 20px);
}
```

编译后的 css ：

```css
.div1 {
  font-size: 20px;
}

.div2 {
  font-size: 24px;
}
```

## 关键词参数

调用一个函数时，传递的参数默认地会按照定义参数的顺序依次传递给各参数，如果使用关键词参数，则可以打乱顺序来传递参数。

```scss
@function sum ($a, $b: 16px) {
  @return $a + $b;
}

.div1 {
  font-size: sum($b: 4px, $a: 20px);
}
```

## 接收任意参数

如果一个函数可以允许用户传递任意个参数，那么可以使用任意参数来接收，写一个变量，后面紧跟三个点 `...` 即可。

```scss
@function sum($numbers...) {
  @debug $numbers; // list, 10px, 20px, 30px, 40px

  $sum: 0;

  @each $number in $numbers {
    $sum: $sum + $number;
  }

  @return $sum; // 100px
}

.div1 {
  width: sum(10px, 20px, 30px, 40px);
}
```

如上所示，任意参数将是一个 list 列表类型的数据，可以通过 `@each ... in ...` 进行遍历使用。

## 接收带关键词的任意参数

如果传递给函数的参数是带关键词的，那么任意参数需要使用 `meta.keywords()` 来处理，处理后将返回一个 map 类型的数据。

如果没有将任意参数传递给 `meta.keywords()` 函数，那么这个任意参数列表就不允许接收带有关键词的参数，编译程序会报错。

```scss
@use 'sass:meta';

@function sum($numbers...) {
  @debug meta.keywords($numbers); // (a: 10px, b: 20px, c: 30px, d: 40px)

  $sum: 0;

  @each $key, $value in meta.keywords($numbers) {
    @if ($key == 'a') {
      $sum: $sum + $value;
    }
  }

  @return $sum;
}

.div1 {
  width: sum($a: 10px, $b: 20px, $c: 30px, $d: 40px);
}

```

## 传递任意参数

接收的任意参数可以是一个列表（list），那么，也可以把一个列表作为任意参数传递，同样只需要在后面加上 `...` 即可。

```scss
$font: 16px, 600, #f00;

@debug font($font...);
```

同样，也可以把一个 `map` 作为任意参数传递：

```scss
$font: (
  weight: 600,
  size: 16px,
);

@debug font($font...);
```

## 纯 css 函数

Sass 同样兼容 css 中的函数，Sass 在编译时将会保留这些函数的调用，当然，在调用时如果使用了 Sass 表达式，这些表达式依然会被编译成返回值。

```scss
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;

@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
```
