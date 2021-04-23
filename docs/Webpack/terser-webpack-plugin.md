# terser-webpack-plugin

[toc]

## 安装

```bash
npm install terser-webpack-plugin --save-dev
```

## 基本使用方法

```js

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

```

## 配置项

### test 匹配要处理的文件的表达式

`Type: String | RegExp | Array<String |RegExp>`

`Default: /\.m?js(\?.*)?$/i`

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
```

### include 包括的文件或目录

`Type: String | RegExp | Array<String | RegExp>`

`Default: undefined`

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\/includes/,
      }),
    ],
  },
};
```

### exclude 要排除的文件或目录

`Type: String | RegExp | Array<String | RegExp>`

`Default: undefined`

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: /\/excludes/,
      }),
    ],
  },
};
```

### chunkFilter 函数，过滤要处理或不处理的 chunk，返回 true 则要处理，默认全返回 true

`Type: Function<(chunk) -> boolean>`

`Default: () => true`

函数默认会接收 chunk 作为参数，可以根据判断返回 true 来过滤要处理的 chunk。

```js
  new TerserPlugin({
    chunkFilter: (chunk) => {
      // Exclude uglification for the `vendor` chunk
      if (chunk.name === 'vendor') {
        return false; // 返回 false 表示不处理
      }
      return true;
    },
  })
```

### cache 是否允许缓存文件，默认为 true。（ webpack5 下无法工作 ）

`Type: Boolean | String`

`Default: true` （uglifyjs-webpack-plugin 默认为 `false`）

默认缓存目录路径为 `node_modules/.cache/terser-webpack-plugin`。

如果使用自己的 `minify` 函数，请正确阅读 `minify` 缓存无效的部分。

- Boolean 值，开启或关闭文件缓存
- String 值，允许缓存并指定缓存目录的路径

### cacheKeys 一个返回 cacheKeys 对象的函数，覆盖默认的 cache keys。（ webpack5 下无法工作 ）

`Type: Function<(defaultCacheKeys, file) -> Object>`

`Default: defaultCacheKeys => defaultCacheKeys`

函数的第一个参数就是默认的 cache keys 对象：

```js
({
  terser: require('terser/package.json').version, // terser version
  'terser-webpack-plugin': require('../package.json').version, // plugin version
  'terser-webpack-plugin-options': this.options, // plugin options
  path: compiler.outputPath ? `${compiler.outputPath}/${file}` : file, // asset path
  hash: crypto
    .createHash('md4')
    .update(input)
    .digest('hex'), // source file hash
});
```

```js
  new TerserPlugin({
    cache: true,
    cacheKeys: (defaultCacheKeys, file) => {
      defaultCacheKeys.myCacheKey = 'myCacheKeyValue';
      return defaultCacheKeys;
    },
  }),
```

### parallel  多进程并行提升打包速度，默认值为 cpu 核心数减 1 ： `os.cpus().length - 1`

`Type: Boolean | Number`

`Default: true` （uglifyjs-webpack-plugin 默认为 `false`）

`Boolean` 值表示是否允许多进程并行打包。`Number` 值表示允许并设置并发运行进程的数量。

### sourceMap

`Type: Boolean`

`Default: false`

有关devtool值和SourceMapDevToolPlugin插件的详细信息，请参见下文。

仅适用于 `devtool` 选项的值为以下之一时：`source-map | inline-source-map | hidden-source-map | nosources-source-map`。

因为：

`eval` 将 modules 裹入 `eval("string")` ，而 minimizer 不处理字符串。

`cheap` 没有列（column）的信息，而 minimizer 压缩后代码却只有一行。

本插件遵守 `devtool` 并使用 SourceMapDevToolPlugin 插件。所以，使用有效的 `devtool` 的值开启 source map，并且使用 SourceMapDevToolPlugin 和能生成列信息的 `devtool` 值，以开启 source map 的生成。

使用 source map 来将错误信息定位到模块，这会降低编译速度，如果使用自己的 `minify` 函数，请却独 `minify` 部分以正确地处理 source map。

```js
  new TerserPlugin({
    sourceMap: true,
  }),
```

### minify 覆盖默认的 `minify` 函数

`Type: Function`

`Default: undefined`

默认情况下，本插件使用 terser 软件包，对于使用、测试未发布的版本或 forks 非常有用。

如果 `parallel` 是开启的，在 `minify` 函数内，务必使用 `require`。

```js
  new TerserPlugin({
    minify: (file, sourceMap) => {
      const extractedComments = [];

      // Custom logic for extract comments

      const { error, map, code, warnings } = require('uglify-module') // Or require('./path/to/uglify-module')
        .minify(file, {
          /* Your options for minification */
        });

      return { error, map, code, warnings, extractedComments };
    },
  }),
```

### terserOptions 插件的压缩选项配置

`Type: Object`

`Default: default`

具体配置项详情见最后的 `terser`。

以下为压缩选项配置：

```js
  new TerserPlugin({
    terserOptions: {
      ecma: undefined,
      warnings: false,
      parse: {},
      compress: {},
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: false,
      output: null,
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_classnames: undefined,
      keep_fnames: false,
      safari10: false,
    },
  }),
```

以下为 uglifyjs-webpack-plugin 的压缩配置项：

```js
  new UglifyJsPlugin({
    uglifyOptions: {
      warnings: false,
      parse: {},
      compress: {},
      mangle: true, // Note `mangle.properties` is `false` by default.
      output: null,
      toplevel: false,
      nameCache: null,
      ie8: false,
      keep_fnames: false,
    },
  }),
```

### extractComments 是否提取注释，并将其放置在一个独立文件之中

`Type: Boolean | String | RegExp | Function<(node, comment) -> Boolean|Object> | Object`

`Default: true`（uglifyjs-webpack-plugin 默认为 `false`）

默认情况下，仅使用正则表达式 `/^\**!|@preserve|@license|@cc_on/i` 提取匹配的注释并删除其余注释。

比如原文件为 `foo.js`，则注释将存储到 `foo.js.LICENSE` 文件中。

`terserOptions.output.comments` 配置项指定了是否保留注释，这让我们可以在提取其他注释的同时保留某些注释，甚至保留已提取的注释。

- Boolean 值，表示是否启用提取注释功能
- String 值，`'all'` 表示提取所有，`'some'` 表示提取 `/^\**!|@preserve|@license|@cc_on/i` 匹配的注释。

    ```js
      new TerserPlugin({
        extractComments: 'all',
      }),
    ```

- RegExp 值，所以与给定正则表达式匹配的注释将会被提取到一个独立的文件中。

    ```js
      new TerserPlugin({
        extractComments: /@extract/i,
      }),
    ```

- Function<(node, comment) -> Boolean> 值，返回 true 表示要提取。

    ```js
      new TerserPlugin({
        extractComments: (astNode, comment) => {
          if (/@extract/i.test(comment.value)) {
            return true;
          }

          return false;
        },
      }),
    ```

- Object 值，允许自定义要提取注释的条件，指定提取文件名和 banner

    ```js
      new TerserPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: (file, fileData) => {
            // ⚠ webpack 5: there is only fileData parameter

            // A file can contain a query string (for example when you have `output.filename: '[name].js?[chunkhash]'`)
            // You must consider this
            // The "fileData" argument contains object with "filename", "basename", "query"
            return file.replace(/\.(\w+)($|\?)/, '.$1.LICENSE$2');
          },
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
    ```

  - object.condition 值可以为 `extractComments` 配置项除 Object 以外的值，表示提取条件。
  - object.filename 提取的注释的文件名

        `Type: String|Function<(string) -> String>`

        `Default: [file].LICENSE[query]`

        可用的占位符有：`[file]`, `[query]`, `[filebase]` 以及 webpack5 专用的 `[base]`。

        默认会为文件名添加后缀 `.LICENSE`。

  - banner 添加到注释顶部的 banner 信息

        `Type: Boolean|String|Function<(string) -> String>`

        `Default: /*! For license information please see ${commentsFile} */`

        `false` 表示不添加 banner，字符串或函数返回字符串都可添加，函数接收文件名 `filename` 的字符串值作为参数。

### warningsFilter 一个过滤警告的函数，返回 true 表示保留警告信息

`Type: Function<(warning, source, file) -> Boolean>`

`Default: () => true`

如果没有启用 source map，参数 `source` 可能为 `undefined` 。

```js
  new TerserPlugin({
    warningsFilter: (warning, source, file) => {
      if (/Dropping unreachable code/i.test(warning)) {
        return true;
      }

      if (/source\.js/i.test(source)) {
        return true;
      }

      if (/file\.js/i.test(file)) {
        return true;
      }

      return false;
    },
  }),

```

## 一些例子

### 保留注释

提取所有合法的注释（比如 `/^\**!|@preserve|@license|@cc_on/i` ），但保留 `/@license/i` 注释

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: /@license/i,
          },
        },
        extractComments: true,
      }),
    ],
  },
};
```

### 移除注释

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
```

### 自定义 `minify` 函数

使用 `uglify-js` 压缩方法覆盖默认的 `minify` 函数。

```js
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // Uncomment lines below for cache invalidation correctly
        // cache: true,
        // cacheKeys: (defaultCacheKeys) => {
        //   delete defaultCacheKeys.terser;
        //
        //   return Object.assign(
        //     {},
        //     defaultCacheKeys,
        //     { 'uglify-js': require('uglify-js/package.json').version },
        //   );
        // },
        minify: (file, sourceMap) => {
          // https://github.com/mishoo/UglifyJS2#minify-options
          const uglifyJsOptions = {
            /* your `uglify-js` package options */
          };

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return require('uglify-js').minify(file, uglifyJsOptions);
        },
      }),
    ],
  },
};
```

# terser

## Minify options

### ecma 覆盖 `parse`, `compress` 和 `output` 的 `ecma` 选项值

`type: number(5 | 6 | 7 | 8)`

`default: undefined`

### warnings 是否输出警告信息，或是输出详细的警告信息

`type: boolean | 'verbose'`

`default: false`

设为 `true` 将压缩警告信息返回到 `result.warnings` 属性中。设为 `verbose` 将返回更详细的警告信息。

### parse 对象，指定一些额外的解析选项

`type: object`

`default: {}`

#### `bare_returns` 是否支持顶级 return 语句，默认 `false`

#### `ecma` 指定 ecma 版本，可选 `5 | 6 | 7 | 8(默认)`

除了ES8在函数参数列表、调用时的可选尾逗号需要设为 `8` 以外，此选项为非必填

#### `html5_comments` html的注释，默认 `true`

#### `shebang` 是否支持 `#!command` 作为第一行，默认 `true`

### compress 对象，指定压缩选项，或跳过压缩

`type: boolean | object`

`default: {}`

设为 `false` 将完全跳过压缩。通过对象指定一些压缩选项。

### mangle 对象，指定变量名压缩选项，或跳过破坏变量名

`type: boolean | object`

`default: true`

设为 `false` 将跳过变量名的破坏性修改。通过对象指定一些破坏选项。

#### mangle.properties

`type: boolean | object`

`default: false`

mangle 选项的子类别，通过对象来指定自定义 mangle property 选项。

### module 是否启用ES6模块化

`type: boolean`

`default: false`

压缩 ES6 模块时使用，`'use strict'` 将会被默认包含，并且可以在顶层作用域内修改名称，如果 `compress` 和 `mangle` 选项都被启用，则 `toplevel` 选项也会被自动启用。

### output

`type: null | object`

`default: null`

通过对象指定一些输出选项，默认值已针对最佳压缩进行了优化。

### sourceMap 是否开启 sourceMap 或通过对象指定 sourceMap 选项

`type: boolean | object`

`default: false`

### toplevel 是否启用顶级变量和函数名的 mangle，丢弃未使用的变量和函数

`type: boolean`

`default: false`

### nameCache 对象，指定缓存名称

`type: null | object`

`default: null`

如果希望在多次 `minify()` 的调用中，缓存已处理的变量名和属性名，可以设为空对象 `{}` 或之前使用过的 `nameCache` 对象。

注意：此属性是可读写属性。`minify()` 方法将会读取此对象的名称缓存状态，并在压缩过程中更新它。以便用户可以重用它，或将其外部保留。

### ie8 是否启用对 ie8 的支持

`type: boolean`

`default: false`

### keep_classnames 是否保留或保留哪些类名(class names)

`type: undefined | boolean | RegExp`

`default: undefined`

设为 `true` 来防止丢弃或破坏 class names。设为一个正则表达式可仅保留匹配的 class names。

### keep_fnames 是否保留或保留哪些函数名(fnames)

`type: boolean`

`default: false`

设为 `true` 来防止丢弃或破坏 function names。设为一个正则表达式可仅保留匹配的 class names。

这对于有代码依赖于 `Function.prototype.name` 时很有用，如果配置项 `keep_classnames` 为 `undefined`，`keep_classnames` 会自动被 `keep_fnames` 的值给覆盖。

### safari10 解决一些 Safari 10 中的 bugs

`type: boolean`

`default: false`

设为 `true` 可解决 Safari 10/11 在循环作用域(loop scoping)和`await`中的 bugs。详细信息，请参见 safari10 的选项。

## 配置项结构

```js
{
    parse: {
        // parse options
    },
    compress: {
        // compress options
    },
    mangle: {
        // mangle options

        properties: {
            // mangle property options
        }
    },
    output: {
        // output options
    },
    sourceMap: {
        // source map options
    },
    ecma: 5, // specify one of: 5, 6, 7 or 8
    keep_classnames: false,
    keep_fnames: false,
    ie8: false,
    module: false,
    nameCache: null, // or specify a name cache object
    safari10: false,
    toplevel: false,
    warnings: false,
}

```

[toc]

#### `arrows: true` 是否压缩箭头函数，将非箭头转为箭头函数

将 `()=>{return x}` 转为 `()=>x` 。 如果 `Class` 类 和对象字面量的方法能缩短，也将被转换为箭头函数表达式，例如： `m(){return x}` 转为 `m:()=>x` 。

#### `arguments: false` 是否尽可能将 `arguments[i]` 表达式替换为参数名

#### `booleans: true` 是否进行布尔上下文的优化

例如： `!!a ? b : c` 优化为 `a ? b : c`

#### `booleans_as_integers: false` 是否将布尔值转为 0 或 1，并使用非严格比较运算符

若开启，和布尔值比较的运算符 `===`，`!==` 会被替换为 `==`，`!=`

#### `collapse_vars: true` 是否折叠一次性的非常量的变量，允许副作用

#### `comparisons: true` 是否对二进制节点实施有把握的优化

例如： `!(a <= b)` 转为 `a > b` （仅当 `unsafe_comps` 选项为 `true` 时）, 并尝试使二进制节点无效， 例如： `a = !b && !c && !d && !e` 转为 `a=!(b||c||d||e)`。

#### `computed_props: true` 是否将通过常量计算出的属性转为常规属性

例如： `{['computed']: 1}` 转为 `{computed: 1}` 。

#### `conditionals: true` 是否优化 if 语句和条件表达式

#### `dead_code: true` 是否删除程序无法到达的死区代码

#### `defaults: true` 是否使用 `compress` 配置项的大多数默认值，设 `false` 可禁用

在只想启用某几个 `compress` 选项而禁用其余选项时很有用 。

#### `directives: true` 是否移除冗长的或非标准的 directives

#### `drop_console: false` 是否抛起所有 `console.*` 函数的调用

如果希望仅移除指定的函数调用比如 `console.info`，或删除函数后需要保留此函数自变量的副作用，则应当使用 `pure_funcs` 配置项。

#### `drop_debugger: true` 是否移除 debugger 语句

#### `ecma: 5` 传递 6 或更大的数字可开启将ES5代码转为更短的等效的 ES6+ 代码

#### `evaluate: true` 是否尝试计算常量表达式并使用结果来替换

#### `expression: false` 是否保留没有 `return` 的最终语句的完成值

比如在小书签中。

小书签：又名 Bookmarklet，由英文单词 Bookmark 和 Applet 组合而来。简单地说，小书签就是把一段带有特定功能的 JavaScript 代码保存至收藏夹，当你需要的时候点击它来实现这段 JavaScript 代码的功能。比如生成二维码，生成短链接，阅读模式等等功能。

#### `global_defs: {}` 定义全局变量，实现条件编译

详情查看 conditional compilation 条件编译配置项

#### `hoist_funs: false` 是否提升函数声明

#### `hoist_props: true` 是否将常量对象和字面量数组中的属性提升为受一组约束的常规变量

hoist properties from constant object and array literals into regular variables subject to a set of constraints.

例如： `var o={p:1, q:2}; f(o.p, o.q);` 转为 `f(1, 2);` 。

注意：`hoist_props` 最优工作的条件：`mangle` 配置项启用 ， `compress.passes` 值设为 `2` 或更高，`compress.toplevel` 设为 `true`

#### `hoist_vars: false` 是否提升 `var` 变量声明

启用的话通常会增大输出的大小。

#### `if_return: true` 是否优化 `if/return` 和 `if/continue` 语句

#### `inline: true` 是否启用函数 `simple/return` 语句的行内调用

可选值：

- `false` 与值为 0 相同
- `0` 禁用 inlining
- `1` 内联简单函数 simple functions
- `2` 内联带参数的内联函数 functions with arguments
- `3` 内联带参数和变量的内联函数 functions with arguments and variables
- `true` 同 `3`

#### `join_vars: true` 是否连接连续使用的 `var` 语句

#### `keep_classnames: false` 是否保留或保留哪些类名

设为 `true` 来防止丢弃或破坏 class names。设为一个正则表达式可仅保留匹配的 class names。

另可见 `mangleOptions.keep_classnames` 配置项

#### `keep_fargs: true` 是否防止丢弃未使用的函数参数，使用 `Function.length` 时需要

Prevents the compressor from discarding unused function arguments. You need this for code which relies on Function.length.

#### `keep_fnames: false` 是否保留或保留哪些函数名(fnames)

设为 `true` 来防止丢弃或破坏 function names。设为一个正则表达式可仅保留匹配的 function names。

若有代码依赖 `Function.prototype.name` 时则需要开启

另可见 `mangleOptions.keep_fnames` 配置项

#### `keep_infinity: false` 是否阻止将 `Infinity` 压缩为 1 或 0

开启后可能会导致 Chrome 出现性能问题。

#### `loops: true` 是否在能够静态确定条件时优化 `do-while`， `while`， `for` 循环

#### `module: false` 是否是在压缩 ES6 模块，设为 `true` 将开启严格模式和 `toplevel`选项

#### `negate_iife: true` 是否忽略返回值被丢弃的立即执行函数来避免代码生成器插入圆括号

#### `passes: 1` 压缩次数，多次压缩可进一步提升压缩，但也会花更多时间

#### `properties: true` 是否使用点（`.`）重写属性的读取 `foo['bar']` 重写为 `foo.bar`

#### `pure_funcs: null` 指定纯函数列表以便于 Terser 知道它无副作用

可以设为一个由函数名组成的数组，Terser 将假定这些函数都不具有副作用。

注意：不会检查函数名是否在作用域内被重新定义。

比如： `var q = Math.floor(a/b)`，如果变量 `q` 没有在别处使用，则会被移除，但仍会保留 `Math.floor(a/b)` 并且不知道它的作用。这种情况则可以配置 `pure_funcs: [ 'Math.floor' ]` 来让 Terser 知道这个函数不会产生任何的副作用，在这种情况下整个语句都将被移除。当然这会增加一些压缩的开销，增长压缩时间。

#### `pure_getters: 'strict'` 对象属性访问的模式

设为 `true` 的话，Terser 将假定对象属性的访问 `foo.bar` 或 `foo['bar']` 没有任何副作用。

仅在确定 `foo` 不抛出副作用时， 设为 `pure_getters: 'strict'` 来视为 `foo.bar` 是无副作用的，比如不是 `null` 或 `undefined` 时。

#### `reduce_funcs` 旧选项，为了向后兼容，可安全地忽略此选项

#### `reduce_vars: true` 是否提升变量赋值以及作为常量使用的优化

#### `sequences: true` 使用逗号将简单的连续语句连接成一个序列

使用逗号来连接简单的连续语句，设为正整数来指定要生成的逗号连接序列的最大数量。

设为 `true` 会将序列数默认为 `200`，设为 `0` 或 `false` 可以禁用逗号连接序列。

最小连接序列长度为 `2`，如果设为 `1` 会被视为 `true` 以及默认长度为 `200`，

在极少数情况下，默认的序列长度限制会导致压缩变慢，在这种情况下，推荐设置为 `20` 或更小。

#### `side_effects: true` 是否允许被标记为了的纯函数的调用

设为 `false` 来禁用被标记了的可能被丢弃的纯函数的调用。

将注释 `/*@__PURE__*/` 或 `/*#__PURE__*/` 紧接在调用之前，则会将此函数调用标记为 “纯”，比如： `/*@__PURE__*/foo();`

#### `switches: true` 删除重复的和无法到达的 switch 分支

#### `toplevel: false` 是否移除顶级作用域内未被引用的函数和变量

#### `top_retain: null` 指定要保留的（不想被移除的）顶级作用域内未被引用的函数和变量

值可以为：名字组成的数组，逗号分隔的字符串，正则表达式，或是函数

指定后，意味着 `toplevel` 将被自动启用。

#### `typeofs: true` 是否转换 `typeof` 语句

例如 `typeof foo == 'undefined'` 转为 `foo === void 0` 。

注意：由于已知问题，在兼容 IE10及之前的浏览器时，建议设为 `false`

#### `unsafe: false` 是否应用不安全的转换

详情见后文

#### `unsafe_arrows: false` 是否对不访问 this 的匿名函数不安全的转为箭头函数形式

如果函数体没有访问 `this`，则将 ES5 匿名函数表达式 转为 箭头函数表达式。

注意：这对于代码依赖于具有 `prototype` 的函数来说，执行这种转换操作不是绝对安全的，因为箭头函数没有 `prototype` 。 此项功能需要将 `ecma` 选项设置为 `6` 或以上。

#### `unsafe_comps: false` 是否对比较运算符执行不安全的转换

将 `<`， `<=` 翻转为 `>`， `>=`，以便于改善压缩。

当两个操作数中的至少一个是具有计算值的对象时，由于方法（如 `get`， `valueOf`）的使用，这可能是不安全的，当比较表达式中的操作数对调之后，这可能会引起执行顺序的改变。

只有在 `comparisons: true` 以及 `unsafe_comps: true` 都开启时，才会执行此压缩功能。

#### `unsafe_Function: false` 是否对字符串字面量函数执行不安全的破坏性压缩

当 `Function(args, code)` 中的 `args` 和 `code` 都为字符串字面量时执行 compress 和mangle

#### `unsafe_math: false` 是否开启不安全数值表达式优化，可能得出不精确的浮点数结果

比如： `2 * x * 3` 转为 `6 * x`

#### `unsafe_methods: false`

将 `{ m: function(){} }` 转为 `{ m(){} }`。

`ecma` 选项必须设置为 6 或以上。

如果 `unsafe_methods` 设置为一个正则表达式，那么键值对的 key 匹配正则时，将转换为简写。

注意：如果启用此选项，在任何代码尝试去对前一个函数执行 `new` 操作时，将有一个获得 TypeError 报错的风险：`xxx is not a constructor`

#### `unsafe_proto: false` 是否对设计原型的表达式进行不安全的优化

比如将 `Array.prototype.slice.call(a)` 转为 `[].slice.call(a)`

#### `unsafe_regexp: false` 是否允许使用 `RegExp` 值替换变量，就像它们是常量一样

#### `unsafe_undefined: false`

如果在作用域中有一个名为 `undefined` 的变量，则替换为 `void 0`

变量名将被篡改，通常简化为单个字符。

#### `unused: true` 是否移除未被引用的函数和变量

简单直接的变量赋值不会被视为一种引用，除非将此项设置为 `unused: 'keep_assign'`

#### `warnings: false` 是否在移除无法到达的代码或未使用的声明时显示警告信息

### Mangle options

#### `eval: false` 是否在使用 `eval` 或 `with` 的作用域中破坏压缩名称

Pass `true` to mangle names visible in scopes where eval or with are used.

#### `keep_classnames: false`

设为 `true` 来防止丢弃或破坏 class names。设为一个正则表达式可仅保留匹配的 class names。

另可见 `compressOptions.keep_classnames` 配置项

#### `keep_fnames: false`

设为 `true` 来防止丢弃或破坏 function names。设为一个正则表达式可仅保留匹配的 function names。

若有代码依赖 `Function.prototype.name` 时则需要开启

另可见 `mangleOptions.keep_fnames` 配置项

#### `module: false` 告诉插件是否是在压缩 ES6 模块

模块中的 toplevel scope 不是 global scope。开启此项，意味着 `toplevel` 选项会被默认开启。

#### `reserved: []` 指定要保留的不被压缩的标识符组成的数组

比如：`['foo', 'bar']`

#### `toplevel: false` 破坏性压缩顶级作用域中声明的名称

#### `safari10: false` 是否解决 Safari10 循环迭代器报错无法两次声明 let 变量的问题

设置为 `true` 即可解决 Safari10 循环迭代器中报错：`Cannot declare a let variable twice`

另可见 `outputOptions.safari10` 配置项。

```js
// test.js
var globalVar;

function funcName(firstLongName, anotherLongName) {
  var myVariable = firstLongName +  anotherLongName;
}

```

```js
var code = fs.readFileSync('test.js', 'utf8');

// 默认地，顶级作用域的变量名和函数名不会被破坏性压缩
Terser.minify(code).code;
// 'function funcName(a,n){}var globalVar;'

// 指定要保留的不被破坏压缩的变量名
Terser.minify(code, { mangle: { reserved: ['firstLongName'] } }).code;
// 'function funcName(firstLongName,a){}var globalVar;'

// 开启顶级作用域中的变量名执行破坏压缩
Terser.minify(code, { mangle: { toplevel: true } }).code;
// 'function n(n,a){}var a;'
```

#### Mangle properties options 捣碎对象的属性的选项

##### `builtins : false` 是否允许对内置 DOM 属性的破坏性操作。不建议修改此设置

##### `debug : false`

Mangle names with the original name still present. Pass an empty string '' to enable, or a non-empty string to set the debug suffix.

##### `keep_quoted : false` 是否仅捣碎未加引号的属性名

- `true` 引号包括的属性名将自动保留，并且任何未被引号包裹的属性名将不会被捣碎
- `'strict'` 高级选项，除非明确保留，否则所有未加引号的属性名都将被捣碎

##### `regex : null` 只捣碎与指定正则匹配的属性名

##### `reserved : []` 指定不希望被捣碎的属性名

##### `undeclared : false` 是否捣碎使用到的顶级作用域变量的未声明属性名

当一个 name 作为顶层作用域的变量的属性被访问，但是代码中又找不到这个 name 的声明时，是否要捣碎它。

可能在压缩项目的一部分的时候有用。

```js
var code1 = 'var Bar = {};';
var code2 = 'var Foo = { foo: function () { return Bar.bar() } };';
var terserOptions = {
  // ...
};

terser.minify(code1, terserOptions);
var result = terser.minify(code2, terserOptions);

console.log(result.code)

// 开启（设为 true ）时的输出
var r={o:function(){return a.v()}};

// 未开启（设为 false）时的输出
var r={o:function(){return a.bar()}};
```

### Output options 输出选项

代码生成器默认配置会尝试输出尽可能短的代码。也可以手动指定配置项：

#### `ascii_only : false` 是否转义字符串和正则中的 Unicode 字符

同时也会使 非ASCII 字符的指令失效

#### `beautify : true` 是否美化实际的输出代码

命令行传递 `-b` 会自动将此配置项设为 `true`，如果需要传入 `-b` 又想生成压缩代码，可以使用 `-b beautify=false` 来覆盖

#### `braces : false` 是否总是插入花括号给 `if | for | do | while | with` 等语句

即使它们之中的代码只有一个单语句也插入花括号。

#### `comments : 'some'` 默认保留 包括 `@license | @preserve` 的 JSDoc 注释

设为 `true` 或 `'all'` 可保留所有注释，设为 `false` 可忽略（丢弃）所有注释。

也可设为一个正则或一个函数来匹配需要保留的注释。

#### `ecma : 5` 要输出的 `ecma` 版本

设为 `6` 或以上会生成简写对象属性，比如： `{a: a}` 转为 `{a}`。

此配置将仅在 beautifier 的直接控制下改变输出代码

抽象语法树（AST）语法树中不兼容的功能将会原样输出，比如，设为 `5` 也不会将 ES6+ 的语法转换为 ES5 代码。

#### `indent_level: 4` 缩进等级，默认为 4

#### `indent_start : 0` 在每一行之前添加多少个空格，默认添加 0 个

#### `inline_script : true` 是否转义 html 注释和`</script>`中出现的斜线

#### `keep_quoted_props : false` 是否移除对象字面量中属性名的引号

#### `max_line_len : false` 一行代码的最大长度（对于已压缩代码）

#### `preamble : null` 要前置到输出中的一段文字，比如包含许可信息的注释

#### `quote_keys : false` 是否要给所有字面量对象的所有属性（key）加上引号

#### `quote_style : 0` 指定更喜欢的引号样式

- `0` 双引号，将字符串外的多层双引号转为单引号
- `1` 总是使用单引号
- `2` 总是使用双引号
- `3` 总是使用原本的引号

#### `safari10 : false` 是否需要解决 Safari 10/11 的 await bug

另可见 `mangleOptions.safari10` 配置项

#### `semicolons : true` 是否使用分号分隔语句

设为 `false` 将尽可能使用换行代替分号，以生成更具有可读性的压缩代码输出。gzip之前的大小可以更小； gzip之后的大小可以忽略不计。

#### `shebang : true` 将 shebang `#!` 保留在 preamble 中 (bash scripts)

#### `webkit : false` 是否启用针对 WebKit bugs 的解决方法，PhantomJS 用户应启用

#### `wrap_iife : false` 是否对立即执行函数换行

See #640 for more details.

#### `wrap_func_args : true` 是否对圆括号中的回调函数换行

See OptimizeJS for more details.
