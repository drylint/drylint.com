# Sass 调试

[toc]

Sass 提供了一些调试语句，有：

- `@error`
- `@warn`
- `@debug`

## `@error`

当编写带有参数的 mixin 或函数时，通常希望接收到正确的参数，如果调用时没有传递正确的参数，应该通知用户并且停止运行。

Sass 通过 `@error <expression>` 。它会在控制台输出表达式返回的值（通常是一个字符串），一旦打印出错误，Sass 就停止编译，并抛出错误信息。

```scss
@mixin text-align ($align) {
  @if ($align != left or $align != center) {
    @error "调用 text-align 只能传递 left 或 center 值";
  }

  text-align: $align;
}

.div {
  // 传递一个不被允许的参数，会在控制台抛出错误信息
  @include text-align(right);
}
```

## `@warn`

用法与 `@error` 相同，但与 `@error` 不同的是，它不会导致 Sass 停止编译，只是在控制台抛出警告信息。

## `@debug`

通过 `@debug <expression>` 可以很方便地在控制台打印出表达式返回的值。

```scss
@debug "1 + 1 = #{1 + 1}"; // 1 + 1 = 2
```
