# webpack-chain

[toc]

使用链式 API 来生成和简化 webpack 版本 2-4 配置的修改。

本文档对应于webpack-chain的v4版本。

- [v3 docs](https://github.com/neutrinojs/webpack-chain/tree/v3)
- [v2 docs](https://github.com/neutrinojs/webpack-chain/tree/v2)
- [v1 docs](https://github.com/neutrinojs/webpack-chain/tree/v1.4.3)

*注意: 虽然 webpack-chain 被广泛应用在Neutrino中，然而本软件包完全独立，可供任何项目使用。*

## 介绍

webpack 本身的核心配置是基于创建和修改一个潜在的笨拙 JavaScript 对象。虽然这对于单个项目上的配置是可以的，但尝试跨项目共享这些对象并进行后续修改会变得很混乱，因为您需要对底层对象结构有深刻的理解才能进行这些更改。

而 webpack-chain 试图通过为创建和修改 webpack 配置提供一个可链接的或流畅的 API 来改进这个过程。API 的关键部分可以通过用户指定的名称来引用，这有助于标准化如何跨项目修改配置。

## 安装

```bash
npm install --save-dev webpack-chain
```

## 开始使用

在项目根目录创建 `webpack.config.js` ，然后使用 webpack-chain 完成配置，最终生成并且导出符合 webpack 配置的对象即可。

```js
// webpack.config.js

// webpack-chain 导出的是一个构造函数
const Config = require('webpack-chain')

// 创建 config 实例
const config = new Config()

// 调用 config.toConfig() 就会生成最终的 webpack 配置对象，直接导出即可
module.exports = config.toConfig() // {}
```

上例中，`config` 创建后什么操作都没有做，所以导出的配置对象其实就是一个空对象。

下面来使用链式 API 对配置做一些修改：

```js

config
  // 配置根选项 entry
  .entry('index')
  .add('src/index.js')
  .end()
  // 配置根选项 output
  .output
  .path('dist')
  .filename('[name].bundle.js')

// 配置根选项 module
config.module
  // 创建具名的 rule 配置，方便之后可以访问并修改这个 rule
  .rule('lint')
  .test(/\.js$/)
  .pre()
  .include
  .add('src')
  .end()
  // 也可以创建具名的 use
  .use('eslint')
  .loader('eslint-loader')
  .options({
    rules: {
      semi: 'off',
    },
  })

config.module
  .rule('compile')
  .test(/\.js$/)
  .include
  .add('src')
  .add('test')
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: [
      ['@babel/preset-env', { modules: false }],
    ],
  })

module.exports = config.toConfig()
```

上面代码实际导出的对象为：

```js
module.exports = {
  entry: { index: ['src/index.js'] },
  output: { path: 'dist', filename: '[name].bundle.js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: ['src'],
        use: [
          {
            loader: 'eslint-loader',
            options: { rules: { semi: 'off' } },
          },
        ],
      },
      {
        test: /\.js$/,
        include: ['src', 'test'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]],
            },
          },
        ],
      },
    ],
  },
}

```

## webpack-chain 的核心

- `ChainedMap` 类似于 JavaScript 的 `Map` ，对应 webpack 配置中的对象类型
- `ChainedSet` 类似于 JavaScript 的 `Set` ，对应 webpack 配置中的数组类型

webpack 的配置对象有很多层，基本上，对于任意一个节点配置项，如果是一个对象，那么它在 webpack-chain 中就对应一个 `ChainedMap`，如果这个节点配置项是一个数组，那么在 webpack-chain 中就对应一个 `ChainedSet` 。

也就是说，在 webpack-chain 中，config 是由很多个不同层级的 `ChainedMap` 和 `ChainedSet` 组成的。

## ChainedMap

webpack-chain 的核心 API 之一是 `ChainedMap` 。`ChainedMap` 的操作类似于JavaScript 中的 `Map`，为链式操作和生成配置提供了一些便利。 如果某个配置属性被标记为一个 `ChainedMap` , 则它将具有如下的 API 和方法:

除非是专门说明了方法的返回值，否则这些方法执行后依然返回这个 `ChainedMap` 自身, 以方便继续链式调用这些方法。

```js
// 清空当前 ChainedMap 上的所有配置
clear()


// 移除当前 ChainedMap 上的某一项配置
delete(key)



// 获取当前 ChainedMap 上的某一项配置
// 此方法不返回 ChainedMap，返回获取到的值
get(key)


// 获取当前 ChainedMap 上的某一项配置
// 如果指定 key 不存在，则增加这个 key ，并将它的值设为 fn 的返回值
// 此方法不返回 ChainedMap，返回获取到的值或设置之后的值
getOrCompute(key, fn)


// 设置当前 ChainedMap 上的某一项配置
set(key, value)


// 获取当前 ChainedMap 中是否存在指定的 key
// 此方法不返回 ChainedMap，返回 true / false
has(key)


// 获取当前 ChainedMap 中存储的所有值组成的数组
// 此方法不返回 ChainedMap，返回一个数组
values()


// 获取当前 ChainedMap 上的所有键值对组成的对象
// 使用了 `.before() 或 .after()` 的 ChainedMap , 将按照属性名进行排序。
// 此方法不返回 ChainedMap ，返回一个对象， ChainedMap 为空时返回 undefined
entries()


// 将一个对象合并到当前 ChainedMap 上
// 第一个参数是一个对象，将这个对象的键值对合并到当前 ChainedMap 上
// 第二个参数非必传，是一个由不需要合并的 key 组成的数组
merge(obj, omit)


// 针对当前配置上下文执行一个函数，这个函数会被传入 ChainedMap 作为参数
batch(handler)


// 根据条件进行不同配置
// 第一个参数为条件表达式
// 第二个和第三个参数为函数，均接收 ChainedMap 作为参数
// 第一个参数返回 true 时，执行第二个函数，否则执行第三个参数
when(condition, whenTruthy, whenFalsy)
```

## ChainedSet

webpack-chain 的另一个核心 API 是 `ChainedSet` 。`ChainedSet` 的操作类似于JavaScript 中的 `Set`，为链式操作和生成配置提供了一些便利。 如果一个配置属性被标记为一个 `ChainedSet` , 则它将具有如下的 API 和方法:

除非是专门说明了方法的返回值，否则这些方法执行后依然返回这个 `ChainedSet` 自身, 以方便继续链式调用这些方法。

```js
// 在当前 ChainedSet 末尾推入一个值
add(value)


// 在当前 ChainedSet 最前面推入一个值
prepend(value)


// 清空当前 ChainedSet 的所有值
clear()


// 移除当前 ChainedSet 中的一个指定的值
delete(value)


// 检测当前 Set 中是否存在指定的值
// 此方法不返回 ChainedMap，返回 true / false
has(value)


// 获取当前 Set 中所有值组成的数组
// 此方法不返回 ChainedMap ，返回一个数组
values()


// 传入一个数组，合并到当前 Set 的尾部
merge(arr)


// 针对当前配置上下文执行一个函数，这个函数会被传入 ChainedSet 作为参数
batch(handler)


// 根据条件进行不同配置
// 第一个参数为条件表达式
// 第二个和第三个参数为函数，均接收 ChainedMap 作为参数
// 第一个参数返回 true 时，执行第二个函数，否则执行第三个参数
when(condition, whenTruthy, whenFalsy)
```

## 简写方法

在 `ChainedMap` 上有许多快捷方法可以使用，这些方法名和 key 是同名的。例如：

```js
// devServer.hot 普通的配置方式
devServer.set('hot', true)

// 在 ChainedMap 上，可以直接使用同名方法进行设置，方法的参数就是要设置的值
devServer.hot(true)
```

简写方法依然是可以链式使用的，调用简写方法后依然会返回当前的 `ChainedMap` ，以方便继续链式操作。

## config

前面说到 webpack-chain 导出的是一个构造函数，这个构造函数生成的实例 `config` ，其实就是一个 `ChaindMap` 。它是 webpack-chain 中最顶层的 `ChaindMap` 。

```js
const Config = require('webpack-chain')

const config = new Config()
```

```js
config: ChainedMap
```

链式调用进入到 API 的更深层后将改变正在配置的内容的上下文，可以通过重新引用 `config` 进入顶级配置，或者通过 `.end()` 方法向上移动一级。

如果你熟悉 jQuery , 这里与其 `.end()` 工作原理类似。

再次强调，除非是专门说明了某个方法的返回值，否则全部的 API 调用都将在当前上下文中返回 API 实例（`ChainedMap` 或 `ChainedSet`），以方便连续的链式 API 调用。

要了解对所有简写和低级方法有效的特定值的详细信息，请参阅 [webpack docs hierarchy](https://webpack.js.org/configuration/) 中对应的名称。

### config 上的简写方法

```js
config
  .amd(amd)
  .bail(bail)
  .cache(cache)
  .devtool(devtool)
  .context(context)
  .externals(externals)
  .loader(loader)
  .mode(mode)
  .parallelism(parallelism)
  .profile(profile)
  .recordsPath(recordsPath)
  .recordsInputPath(recordsInputPath)
  .recordsOutputPath(recordsOutputPath)
  .stats(stats)
  .target(target)
  .watch(watch)
  .watchOptions(watchOptions)
```

### 配置入口 config.entry

```js
// 添加/访问 config.entry 对象的某个属性 ，类型是 ChainedSet
config.entry(name): ChainedSet

// 上一层就是根选项 entry 对象，在 webpack-chain 中这一节点是 ChainedMap 类型
config.entryPoints: ChainedMap

config
  .entry(name)
    .add(value)
    .add(value)

config
  .entry(name)
    .clear()

// 使用低级的方式设置入口 config.entryPoints:
config.entryPoints
  .get(name)
    .add(value)
    .add(value)

config.entryPoints
  .get(name)
    .clear()
```

### config.output

```js
// output 的类型是 ChainedMap
config.output: ChainedMap

// output 的简写方法
config.output
  .auxiliaryComment(auxiliaryComment)
  .chunkFilename(chunkFilename)
  .chunkLoadTimeout(chunkLoadTimeout)
  .crossOriginLoading(crossOriginLoading)
  .devtoolFallbackModuleFilenameTemplate(devtoolFallbackModuleFilenameTemplate)
  .devtoolLineToLine(devtoolLineToLine)
  .devtoolModuleFilenameTemplate(devtoolModuleFilenameTemplate)
  .filename(filename)
  .hashFunction(hashFunction)
  .hashDigest(hashDigest)
  .hashDigestLength(hashDigestLength)
  .hashSalt(hashSalt)
  .hotUpdateChunkFilename(hotUpdateChunkFilename)
  .hotUpdateFunction(hotUpdateFunction)
  .hotUpdateMainFilename(hotUpdateMainFilename)
  .jsonpFunction(jsonpFunction)
  .library(library)
  .libraryExport(libraryExport)
  .libraryTarget(libraryTarget)
  .path(path)
  .pathinfo(pathinfo)
  .publicPath(publicPath)
  .sourceMapFilename(sourceMapFilename)
  .sourcePrefix(sourcePrefix)
  .strictModuleExceptionHandling(strictModuleExceptionHandling)
  .umdNamedDefine(umdNamedDefine)
```

### config.resolve

```js
// resolve 的类型是 ChainedMap
config.resolve: ChainedMap

config.resolve
  .cachePredicate(cachePredicate)
  .cacheWithContext(cacheWithContext)
  .enforceExtension(enforceExtension)
  .enforceModuleExtension(enforceModuleExtension)
  .unsafeCache(unsafeCache)
  .symlinks(symlinks)
```

#### config.resolve.alias

```js
config.resolve.alias: ChainedMap

config.resolve.alias
  .set(key, value)
  .set(key, value)
  .delete(key)
  .clear()
```

#### config.resolve.modules

```js
config.resolve.modules: ChainedSet

config.resolve.modules
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolve.aliasFields

```js
config.resolve.aliasFields: ChainedSet

config.resolve.aliasFields
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolve.descriptionFields

```js
config.resolve.descriptionFields: ChainedSet

config.resolve.descriptionFields
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolve.extensions

```js
config.resolve.extensions: ChainedSet

config.resolve.extensions
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolve.mainFields

```js
config.resolve.mainFields: ChainedSet

config.resolve.mainFields
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolve.mainFiles

```js
config.resolve.mainFiles: ChainedSet

config.resolve.mainFiles
  .add(value)
  .prepend(value)
  .clear()
```

### config.resolveLoader

`config.resolveLoader` 拥有和 `config.resolve` 完全相同的 API ，并且还拥有以下额外的 API :

#### config.resolveLoader.moduleExtensions

```js
config.resolveLoader.moduleExtensions: ChainedSet

config.resolveLoader.moduleExtensions
  .add(value)
  .prepend(value)
  .clear()
```

#### config.resolveLoader.packageMains

```js
config.resolveLoader.packageMains: ChainedSet

config.resolveLoader.packageMains
  .add(value)
  .prepend(value)
  .clear()
```

### config.performance

```js
config.performance: ChainedMap

config.performance
  .hints(hints)
  .maxEntrypointSize(maxEntrypointSize)
  .maxAssetSize(maxAssetSize)
  .assetFilter(assetFilter)
```

### config.optimization

```js
config.optimization: ChainedMap

config.optimization
  .concatenateModules(concatenateModules)
  .flagIncludedChunks(flagIncludedChunks)
  .mergeDuplicateChunks(mergeDuplicateChunks)
  .minimize(minimize)
  .minimizer(minimizer)
  .namedChunks(namedChunks)
  .namedModules(namedModules)
  .nodeEnv(nodeEnv)
  .noEmitOnErrors(noEmitOnErrors)
  .occurrenceOrder(occurrenceOrder)
  .portableRecords(portableRecords)
  .providedExports(providedExports)
  .removeAvailableModules(removeAvailableModules)
  .removeEmptyChunks(removeEmptyChunks)
  .runtimeChunk(runtimeChunk)
  .sideEffects(sideEffects)
  .splitChunks(splitChunks)
  .usedExports(usedExports)
```

### 插件配置 config.plugin

```js
// 对应 webpack 中的 config.plugins
config.plugin(name): ChainedMap
```

#### 添加插件 plugin

注意：不要使用 `new` 来创建插件实例，因为 webpack-chain 已经做了这一步。

原始的 webpack 的 plugins 配置项是一个数组，其中的插件实例相当于都是匿名插件。

在 webpack-chain 中允许使用插件时提供名称，以方便在之后还可以引用修改这个插件。

```js
// 语法
config
  // 给插件一个名称
  .plugin(name)
  // 第一个参数为引入的插件，第二个参数为插件的参数配置
  .use(WebpackPlugin, args)


// 示例
config
  .plugin('hot')
  .use(webpack.HotModuleReplacementPlugin)


// 插件也可以通过它们的路径来指定
// 以免在顶部使用了 require() 引入插件，但是在条件判断中又不一定会用到。
config
  .plugin('env')
  .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{ 'VAR': false }])
```

#### 修改 plugin 参数

当在添加插件时有些参数无法确定，在之后的流程中需要进行一些参数修改时使用。

```js
// 语法
config
  // name 就是之前添加插件时自定义的一个名称
  .plugin(name)
  .tap(args => newArgs)

// 示例
config
  .plugin('env')
  .tap(args => [...args, 'SECRET_KEY'])
```

#### 修改插件实例

```js
config
  .plugin(name)
  .init((Plugin, args) => new Plugin(...args))
```

#### 移除某个插件

```js
config.plugins.delete(name)
```

#### 设置插件在其他某个插件之前调用

指定当前的插件上下文应该在另一个命名的插件之前操作。不能在同一个插件上同时使用 `.before()` 和 `.after()` 。

```js
// 指定插件 name 要在插件 otherName 之前使用
config
  .plugin(name)
    .before(otherName)

// 示例：
// script-ext 虽然写在后面，但通过 .before() 让它在 html-template 之前使用
config
  .plugin('html-template')
    .use(HtmlWebpackTemplate)
    .end()
  .plugin('script-ext')
    .use(ScriptExtWebpackPlugin)
    .before('html-template')
```

#### 设置插件在其他某个插件之后调用

指定当前的插件上下文应该在另一个命名的插件之后操作。不能在同一个插件上同时使用 `.before()` 和 `.after()` 。

```js
// 指定插件 name 要在插件 otherName 之后使用
config
  .plugin(name)
    .after(otherName)

// 示例
config
  .plugin('html-template')
    .after('script-ext')
    .use(HtmlWebpackTemplate)
    .end()
  .plugin('script-ext')
    .use(ScriptExtWebpackPlugin)
```

### config.resolve.plugin

```js
// Backed at config.resolve.plugins
config.resolve.plugin(name): ChainedMap
```

使用方式同 `config.plugin` 相同。

### config.node

```js
config.node: ChainedMap

config.node
  .set('__dirname', 'mock')
  .set('__filename', 'mock')
```

### config.devServer

```js
config.devServer: ChainedMap
```

#### config.devServer.allowedHosts

```js
config.devServer.allowedHosts: ChainedSet

config.devServer.allowedHosts
  .add(value)
  .prepend(value)
  .clear()
```

#### config.devServer 简写方法

```js
config.devServer
  .bonjour(bonjour)
  .clientLogLevel(clientLogLevel)
  .color(color)
  .compress(compress)
  .contentBase(contentBase)
  .disableHostCheck(disableHostCheck)
  .filename(filename)
  .headers(headers)
  .historyApiFallback(historyApiFallback)
  .host(host)
  .hot(hot)
  .hotOnly(hotOnly)
  .https(https)
  .inline(inline)
  .info(info)
  .lazy(lazy)
  .noInfo(noInfo)
  .open(open)
  .openPage(openPage)
  .overlay(overlay)
  .pfx(pfx)
  .pfxPassphrase(pfsPassphrase)
  .port(port)
  .progress(progress)
  .proxy(proxy)
  .public(public)
  .publicPath(publicPath)
  .quiet(quiet)
  .setup(setup)
  .socket(socket)
  .staticOptions(staticOptions)
  .stats(stats)
  .stdin(stdin)
  .useLocalIp(useLocalIp)
  .watchContentBase(watchContentBase)
  .watchOptions(watchOptions)
```

#### config.module

```js
config.module: ChainedMap
```

#### config.module 简写方法

```js
config.module: ChainedMap

config.module
  .noParse(noParse)
```

#### config.module.rules

```js
config.module.rules: ChainedMap

config.module
  .rule(name)
    .test(test)
    .pre()
    .post()
    .enforce(preOrPost)
```

#### 使用 loader

```js
config.module.rules{}.uses: ChainedMap

config.module
  .rule(name)
    .use(name)
      .loader(loader)
      .options(options)

// Example

config.module
  .rule('compile')
    .use('babel')
      .loader('babel-loader')
      .options({ presets: ['@babel/preset-env'] })
```

#### 修改 loader 选项

```js
config.module
  .rule(name)
    .use(name)
      .tap(options => newOptions)

// Example

config.module
  .rule('compile')
    .use('babel')
      .tap(options => merge(options, {
        plugins: ['@babel/plugin-proposal-class-properties']
      }))
```

#### 配置 rules 中的 oneOf 规则 (满足一个即不再继续匹配)

```js
config.module.rules{}.oneOfs: ChainedMap<Rule>

// 语法
config.module
  .rule(name)
    .oneOf(name)

// 示例
config.module
  .rule('css')
    .oneOf('inline')
      .resourceQuery(/inline/)
      .use('url')
        .loader('url-loader')
        .end()
      .end()
    .oneOf('external')
      .resourceQuery(/external/)
      .use('file')
        .loader('file-loader')
```

### 合并配置

webpack-chain支持将对象合并到配置实例中，该实例的布局与webpack-chain模式的布局类似。

注意，这不是一个 webpack 配置对象，但你可以在将 webpack-chain 提供给它之前转换它的配置对象，以匹配它的布局。

```js
config.merge({ devtool: 'source-map' })

config.get('devtool') // "source-map"
```

```js
config.merge({
  [key]: value,

  amd,
  bail,
  cache,
  context,
  devtool,
  externals,
  loader,
  mode,
  parallelism,
  profile,
  recordsPath,
  recordsInputPath,
  recordsOutputPath,
  stats,
  target,
  watch,
  watchOptions,

  entry: {
    [name]: [...values]
  },

  plugin: {
    [name]: {
      plugin: WebpackPlugin,
      args: [...args],
      before,
      after
    }
  },

  devServer: {
    [key]: value,

    clientLogLevel,
    compress,
    contentBase,
    filename,
    headers,
    historyApiFallback,
    host,
    hot,
    hotOnly,
    https,
    inline,
    lazy,
    noInfo,
    overlay,
    port,
    proxy,
    quiet,
    setup,
    stats,
    watchContentBase
  },

  node: {
    [key]: value
  },

  optimizations: {
    concatenateModules,
    flagIncludedChunks,
    mergeDuplicateChunks,
    minimize,
    minimizer,
    namedChunks,
    namedModules,
    nodeEnv,
    noEmitOnErrors,
    occurrenceOrder,
    portableRecords,
    providedExports,
    removeAvailableModules,
    removeEmptyChunks,
    runtimeChunk,
    sideEffects,
    splitChunks,
    usedExports,
  },

  performance: {
    [key]: value,

    hints,
    maxEntrypointSize,
    maxAssetSize,
    assetFilter
  },

  resolve: {
    [key]: value,

    alias: {
      [key]: value
    },
    aliasFields: [...values],
    descriptionFields: [...values],
    extensions: [...values],
    mainFields: [...values],
    mainFiles: [...values],
    modules: [...values],

    plugin: {
      [name]: {
        plugin: WebpackPlugin,
        args: [...args],
        before,
        after
      }
    }
  },

  resolveLoader: {
    [key]: value,

    alias: {
      [key]: value
    },
    aliasFields: [...values],
    descriptionFields: [...values],
    extensions: [...values],
    mainFields: [...values],
    mainFiles: [...values],
    modules: [...values],
    moduleExtensions: [...values],
    packageMains: [...values],

    plugin: {
      [name]: {
        plugin: WebpackPlugin,
        args: [...args],
        before,
        after
      }
    }
  },

  module: {
    [key]: value,

    rule: {
      [name]: {
        [key]: value,

        enforce,
        issuer,
        parser,
        resource,
        resourceQuery,
        test,

        include: [...paths],
        exclude: [...paths],

        oneOf: {
          [name]: Rule
        },

        use: {
          [name]: {
            loader: LoaderString,
            options: LoaderOptions,
            before,
            after
          }
        }
      }
    }
  }
})
```

### 条件配置

当使用 `ChainedMap` 和 `ChainedSet` 实例时，可以使用 `.when()` 方法根据条件来动态配置，有点类似于三目运算符。

`.when(condition, fnTrue, fnFalse)` 第一个参数为真，执行第二个参数，否则执行第三个参数。这两个函数都会接收 `config` 实例作为参数。

```js
// 示例: 仅在生产环境下使用 minify 插件
config
  .when(process.env.NODE_ENV === 'production', config => {
    config
      .plugin('minify')
      .use(BabiliWebpackPlugin)
  })
```

```js
// 示例: 仅在生产环境下使用 minify 插件
// 否则设置 `devtool` 的值为 'source-map'
config
  .when(process.env.NODE_ENV === 'production',
    config => config.plugin('minify').use(BabiliWebpackPlugin),
    config => config.devtool('source-map')
  )
```

### 检查 config 将会生成的配置

可以通过调用 `config.toString()` 来检查生成的配置. 这将生成一个字符串化的配置信息，并且包括 rules, uses, plugins 的注释信息。

``` js
config
  .module
    .rule('compile')
      .test(/\.js$/)
      .use('babel')
        .loader('babel-loader')

config.toString()
```

```js
{
  module: {
    rules: [
      /* config.module.rule('compile') */
      {
        test: /\.js$/,
        use: [
          /* config.module.rule('compile').use('babel') */
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

默认情况下，如果生成的字符串包含需要的函数和插件，则不能直接用作真正的 webpack 配置使用。

为了生成可用的配置，您可以通过在这些函数和插件上设置一个特殊的 `__expression` 属性，用来定制它们如何被字符串化：

``` js
class MyPlugin {}
MyPlugin.__expression = `require('my-plugin')`

function myFunction () {}
myFunction.__expression = `require('my-function')`

config
  .plugin('example')
    .use(MyPlugin, [{ fn: myFunction }])

config.toString()

/*
{
  plugins: [
    new (require('my-plugin'))({
      fn: require('my-function')
    })
  ]
}
*/
```

通过路径来指定的插件将会自动生成它的 `require()` 语句：

``` js
config
  .plugin('env')
    .use(require.resolve('webpack/lib/ProvidePlugin'), [{ jQuery: 'jquery' }])

config.toString()

/*
{
  plugins: [
    new (require('/foo/bar/src/node_modules/webpack/lib/EnvironmentPlugin.js'))(
      {
        jQuery: 'jquery'
      }
    )
  ]
}
*/
```

还可以调用 `Config` 的静态方法 `Config.toString()` ，用来在字符串化之前修改配置对象。

You can also call `toString` as a static method on `Config` in order to
modify the configuration object prior to stringifying.

```js
Config.toString({
  ...config.toConfig(),
  module: {
    defaultRules: [
      {
        use: [
          {
            loader: 'banner-loader',
            options: { prefix: 'banner-prefix.txt' },
          },
        ],
      },
    ],
  },
})
```

生成的配置对象：

```js
{
  plugins: [
    /* config.plugin('foo') */
    new TestPlugin()
  ],
  module: {
    defaultRules: [
      {
        use: [
          {
            loader: 'banner-loader',
            options: {
              prefix: 'banner-prefix.txt'
            }
          }
        ]
      }
    ]
  }
}
```
