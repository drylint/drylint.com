# SplitChunksPlugin

[toc]

从 `webpack@4` 开始，`CommonsChunkPlugin` 被移除，以支持 `optimization.splitChunks`

## 默认情况

默认情况下，它只影响按需加载（on-demand）的代码块，因为改变初始代码块（initial chunks）会影响运行项目时 HTML 文件包含的 `<script />` 标签。

webpack 会基于如下原则自动分割代码：

- 可以被共享的代码块，或来自 `node_modules` 文件夹的模块。

- 打包出来的代码块大小超过 `20k`（在 min + gz 之前）。

- 当按需加载块时，并行请求的最大数量希望小于或等于 `30` 的时候。

- 在页面初始加载时并行请求的最大数量希望小于或等于 `30` 的时候。

当试图完成后两项时，总会生成较大体积的代码块。

```js
splitChunks: {
      // chunks可以为三种值：async,initial,all；决定代码满足条件后是否进行拆分。
      // initial表示只考虑非import()异步导入代码进行拆分，async表示只拆分异步代码块，而all表示同异步都加入拆分范畴。
      chunks: 'async',

      // 满足尺寸才发生拆分
      // 例如导入10kb的依赖包小于30kb便不会拆分代码块
      minSize: 30000,

      // 当bundle达到maxSize，必须进行拆分
      // 例如jquery与lodash合并成了140kb，maxSize定位80kb，便会拆分两个依赖
      maxSize: 0,

      // 最少被引用的chunk个数
      // 例如一个入口块和一个异步块都引用了lodash，minChunks大于2时就不会添加新chunk来装lodash
      minChunks: 1,

      // 异步代码块最多可拆分次数
      // 假设某个import()模块有2MB，maxSize设定为500kb，如果此属性为1，模块最多就只能拆分一个bundle出去。
      maxAsyncRequests: 5,

      // 这属性和maxAsyncRequests道理一致，不过是作用与initial模块的
      maxInitialRequests: 3,

      // bundle自动命名使用的连接字符
      automaticNameDelimiter: '~',

      // bundle自动命名时名称长度限制
      automaticNameMaxLength: 30,

      // 可为bool、string类型，true是会使用默认命名，否则使用序号命名；string指定文件名称
      name: true,

      // 自定义拆分组
      cacheGroups: {

        // 每个属性就是一个分组
        vendors: {

          // 导入路径的正则匹配，这为所有node_modules引用的模块代码
          test: /[\\/]node_modules[\\/]/,

          // 优先级默认为0，如果两个组引用了同一个模块，优先级高的组可以获得此模块
          priority: -10

        },
        default: {
          minChunks: 2,
          priority: -20,

          // 是否复用其他chunk内已拥有的模块
          // 默认为false，关闭表示拆分出复用部分的模块，给双方引用
          reuseExistingChunk: true
        }
      }
    }

```

## `optimization.splitChunks` 配置对象，传给插件的配置

默认配置的值之所以是这样的，是为了适应 web 性能最佳实践，但是您项目的最佳策略可能有所不同。如果您正在更改配置，您应该度量更改的影响，以确保有真正的好处。

```js
// webpack.config.js

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/u,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
```

```js
module.exports = {
  optimization: {
    /**
     * 传递给 SplitChunksPlugin 插件的配置对象
     */
    splitChunks: {
      /**
       * 指定要进行代码分割的 chunk 类型
       * 'async' 默认值，只对异步导入的 chunk 进行分割，也就是 import() 导入
       * 'initial' 只对原始导入的 chunk 进行分割，也就是 import x from 'x' 导入
       * 'all' 以上两者均包括
       */
      chunks: 'async',

      /**
       * 进行代码分割的最小尺寸
       */
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/u,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
```

> 注意：使用 webpack 处理文件路径时， 目录分隔符始终应包含 Unix 系统的 `/` 和 Windows 系统的 `\` 。 这就是为什么 `{cacheGroup}.test` 字段的值中，需要使用 `[\\/]` 来表示路径分隔符。只使用 `/` 或 `\` 时，跨平台运行会导致意外的出现。
>
> 从 webpack 5 开始, 传递 entry name 给 `{cacheGroup}.test` 字段，以及对 `{cacheGroup}.name` 使用一个已经存在的 chunk name 都将不再允许。

### `automaticNameDelimiter` 生成的文件名的连接符号，默认 `~`

`type: string`

`default: '~'`

webpack 默认会使用 chunk 的来源，加上连接符 `~` ，再加上 chunk 的名称来命名新生成的代码块（例如：`vendor~main.js`）。该配置项可以让你来自定义代码块名称连接符。

### `automaticNameMaxLength` (v5 弃用)生成代码块名的最大长度，默认 `109`

`type: number`

`default: 109`

### `chunks` 指定要分割的 chunk 引入类型，默认 `'async'`

`type: function (chunk) | 'async' | 'initial' | 'all'`

`default: 'async'`

该项指定了那种类型的 chunk 将被分割。

- `initial` 如果两个入口一个是同步引入，一个是异步引入，那么会分开打包

- `async` 只分割异步引入（`import()`）。同步引入会被插件忽略，直接打包到入口文件中。

- `all` 包括以上两者，也就是全部都会进行分割。

也可以传入一个函数来控制，通过返回值来决定是否应该包含每一个模块。

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks (chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk';
      },
    },
  },
}
```

可以结合 `html-webpack-plugin` 使用此配置项，它将为你添加所有新生成的代码块。

### `maxAsyncRequests` 按需加载时所允许的最大并行请求数。默认 `30`

`type: number`

`default: 30`

### `maxInitialRequests` 入口所允许的最大并行请求数。默认为 `30`

`type: number`

`default: 30`

### `minChunks` 最小被引用次数，超过才进行分割。默认 `1`

`type: number`

`default: 1`

最少被多少个代码块公共使用才进行拆分。

### `minSize` 最小尺寸，超过才进行分割，默认 `20000`

`type: number`

`default: 20000`

最少达到多少 bytes 的大小才进行拆分。

该值为压缩前的，也就是先分包，再压缩。

### `enforceSizeThreshold` 见 `{cacheGroup}.enforceSizeThreshold`

详见 `splitChunks.cacheGroups.{cacheGroup}.enforceSizeThreshold`

### `minRemainingSize` 见 `{cacheGroup}.minRemainingSize`

详见 `splitChunks.cacheGroups.{cacheGroup}.minRemainingSize`

### `maxSize` 模块最大尺寸，超出进行分割，默认 `0`

`type: number`

`default: 0`

使用 `maxSize` 选项，无论是全局值 `optimization.splitChunks.maxSize`，还是每一个缓存组值 `optimization.splitChunks.cacheGroups[x].maxSize`，还是回调缓存组值 `optimization.splitChunks.fallbackCacheGroup.maxSize`，都将会通知 webpack 尝试将体积大于设定的 `maxSize` 值的代码块分割成更小的代码块。

分割出的块大小将至少为 `minSize` 值（最大为 `maxSize` 值）。

该算法是确定的，对模块的更改只会产生局部影响，因此，它在使用长期缓存时是可用的，不需要记录。

`maxSize` 只是一个提示，当模块大于 `maxSize`， 或分割会小于 `minSize` 时，是可以不遵守此配置的。

一旦一个块已经有了名称，每个其他部分都会以之为衍生获得一个名称，这个名称取决于 `optimization.splitChunks.hidePathInfo` 的值，并且添加一个从起始块派生来的键名或哈希值。

`maxSize` 是打算用于配合 HTTP/2 和长效缓存使用的。它增加了请求数以求更好的缓存，它也可以用于快速重构即减小文件体积。

> `maxSize` 的优先级高于 `maxInitialRequest/maxAsyncRequests`，事实上优先级关系为如下：
>
> `maxInitialRequest/maxAsyncRequests < maxSize < minSize`.
>
> 设置 `maxSize` 值会同时设置 `maxAsyncSize` 和 `maxInitialSize`的值。

### `maxAsyncSize` 最大的按需加载的尺寸

`type: number`

`default: -`

和 `maxSize` 一样，`maxAsyncSize` 也可以通过以下几种方式来配置：

- `splitChunks.maxAsyncSize`
- `splitChunks.cacheGroups.{cacheGroup}.maxAsyncSize`
- `splitChunks.fallbackCacheGroup.maxAsyncSize`

`maxAsyncSize` 和 `maxSize` 的区别在于，`maxAsyncSize` 只影响按需加载的 chunks 。

### `maxInitialSize` 最大的初始加载的尺寸

`type: number`

`default: -`

和 `maxSize` 一样，`maxInitialSize` 也可以通过以下几种方式来配置：

- `splitChunks.maxInitialSize`
- `splitChunks.cacheGroups.{cacheGroup}.maxInitialSize`
- `splitChunks.fallbackCacheGroup.maxInitialSize`

`maxInitialSize` 和 `maxSize` 的区别在于，`maxInitialSize` 只影响原始加载的 chunks 。

### `name` 分割出来的代码块的名称

`type: boolean | string | function (module, chunks, cacheGroupKey) => string`

`default: true`

同时会对 `splitChunks.cacheGroups.{cacheGroup}.name` 生效

传入 `true` 则会根据 模块 和 cacheGroup 的 key 自动生成 模块名

提供字符串或函数将可以使用自定义名称。

注意，提供的字符串或函数如果始终会返回一个相同字符串的话，将把所有 common 模块和 vendors 模块合并为一整个块。这可能会导致更大的初始下载，降低页面加载速度。

指定一个函数时，函数会被传入 `module, chunks, cacheGroupKey` 这三个参数，其中的第二个参数为 chunk 数组，数组元素为 chunk 对象，包括 `chunk.name` 和 `chunk.hash` 属性，这对使用函数返回一个自定义的且各不相同的模块名非常有用。

如果 `splitChunks.name` 匹配一个入口名称，这个入口将被删除。

对于生产版本，建议将 `splitChunks.name` 设置为 `false` ，这样它就不会不必要地更改名称。

```js
// main.js

import _ from 'lodash';

console.log(_.join(['Hello', 'webpack'], ' '));

```

```js
// webpack.config.js

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey 在这里是 cacheGroup 的 key，也就是 `commons`
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module.identifier().split('/').reduceRight(item => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all'
        }
      }
    }
  }
};
```

使用此配置运行 webpack 还会输出一个带有 common 组名称的 chunk：

```files
commons-main-lodash.js.e7519d2bb8777058fa27.js
```

> 当为不同的分割块分配了相同的名称时，所有的 vendor 模块都将被放在一个共享块中，所以不推荐这样做，因为这样会导致更多的代码下载。

### `automaticNamePrefix` 自动设置名称前缀，默认 `''`

`type: string`

`default: ''`

当需要对生成的模块添加前缀时设置。

```js
module.exports = {
  optimization: {
    splitChunks: {
      automaticNamePrefix: 'general-prefix', // 通用前缀
      cacheGroups: {
        react: {
          // ...
          automaticNamePrefix: 'react-chunks-prefix', // react 的前缀
        }
      }
    }
  }
};
```

### `cacheGroups` 缓存组对象

`type: object`

`default: -`

#### `default` 是否使用默认配置，默认 `true`

`type: boolean`

`default: true`

#### `test` 见 `{cacheGroup}.test`

详见 `{cacheGroup}.test`

#### `{cacheGroup}` 自定义 cacheGroup 名称以及配置对象

`cacheGroups` 由多个 `cacheGroup` 组成，每一个 `cacheGroup` 的 key 就是缓存组的名称，value 是一个配置对象，此对象和 `splitChunks` 的选项有很多相同项。

但是 `test`, `priorty` 和 `reuseExistingChunk` 这几个字段只能在 `cacheGroup` 内设置。

除此之外，所有 `splitChunks` 中的配置项都可以用在 `cacheGroup` 里，包括：`chunks, minSize, minChunks, maxAsyncRequests, maxInitialRequests, name` 等。

```js
module.exports = {
  optimization: {
    splitChunks: {
      // ...总的配置
      cacheGroups: {
        cacheGroup1: {
          // ...自动继承总的配置，也可覆盖为自己的配置
          test: /[\\/]dir[\\/]/u,
          priorty: 0,
          reuseExistingChunk: true,
        },
        cacheGroup2: {
          // ...
        },
        cacheGroup3: {
          // ...
        },
      }
    }
  }
};
```

每一个 `cacheGroup` 对象会继承 `splitChunks` 的配置，也可以设置自己的配置来覆盖继承的配置。

如果 `cacheGroups` 下的 `cacheGroup` 完全不想使用默认的配置，向 `cacheGroups` 对象中添加 `default: false` 属性值即可：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        cacheGroup1: {
          // ...
        },
      }
    }
  }
};
```

默认配置好的 `cacheGroup` 的 `priotity` （优先级）属性默认是负数，而自定义 `cacheGroup` 的 `priotity` 属性默认值是 `0`，因此所有自定义 `cacheGroup` 都可以有比它更高的优先级，更高优先级的缓存组可以优先打包所选择的模块。

##### `priority` cacheGroup 优先级，默认 `0`

`type: number`

`default: 0`

一个 module 有可能会属于多个 cacheGroup 。优化时将根据优先级决定将 module 打包到哪一个 cacheGroup 中。

默认的 cacheGroup 的优先级为负值，以便为自定义 cacheGroup 提供相对较高的优先级，自定义cacheGroup 的优先级默认为 `0`

##### `reuseExistingChunk` 是否复用已存在的 chunk

`type: boolean`

`default: false`

如果当前 chunk 中有包含的 module 已经从 main bundle 中分割出来，那么将复用这些 module 而不会生成新的。这将可能会影响生成结果的 chunk 的名称。

##### `type` 按 module 类型将 module 分配给缓存组

type: `function | RegExp | string`

`default: -`

```js
cacheGroups: {
  json: {
    type: 'json', // 将所有 .json 文件分配到 json 缓存组
  }
}
```

##### `test` 匹配要分配到该 cacheGroup 的 module

`type:  RegExp | string | function (module, chunk) => boolean`

`default: -`

控制此缓存组选择哪些 module 。省略它将选择所有 module。它可以匹配 module 的绝对路径或 chunk 名称。当匹配 chunk 名称时，将选择 chunk 中的所有 module 。

当 webpack 处理文件时，目录分隔符将会是 `/` (Unix) 或 `\` (Windows). 所以 `test` 接收正则时，需要使用 `[\\/]` 来正确匹配跨平台时的目录分隔符。

从 webpack 5 开始, 传递 entry name 给 `{cacheGroup}.test` 字段，以及对 `{cacheGroup}.name` 使用一个已经存在的 chunk name 都将不再允许。

将 `test` 设为一个函数：

```js
cacheGroups: {
  svgGroup: {
    test (module, chunks) {
      // `module.resource` 表示文件在硬盘上的绝对路径
      // 分隔符：windows(\)，unix(/)
      // 跨平台使用，需要使用 `path.sep` 变量来代替 `/` 和 `\` 目录分隔符
      const path = require('path')
      return module.resource
        && module.resource.endsWith('.svg')
        && module.resource.includes(`${path.sep}cacheable_svgs${path.sep}`)
    },
  },
  byModuleTypeGroup: {
    test (module, chunks) {
      return module.type === 'javascript/auto'
    },
  },
},
```

将 `test` 设为一个正则表达式：

```js
cacheGroups: {
  defaultVendors: {
    // 记得使用 `[\\/]` 作为路径分隔符以兼容跨平台使用
    test: /[\\/]node_modules[\\/]|vendor[\\/]analytics_provider|vendor[\\/]other_lib/u,
  },
},
```

##### `filename` 文件名

`type:  string | function (pathData, assetInfo) => string`

`default: -`

当且仅当它是 initial chunk 时，允许重写文件名，所有在 `output.filename` 中可用的占位符均可用在此处。

这个选项也可以全局设置在 `splitChunks.filename` 字段上。但不建议这样全局设置，因为如果当 `splitChunks.chunks` 的值不是 `initial` 的时候，它将发生错误。

设置为一个字符串值，可用占位符：

```js
cacheGroups: {
  defaultVendors: {
    filename: '[name].bundle.js',
  },
},
```

设置为一个方法：

```js
cacheGroups: {
  defaultVendors: {
    filename (pathData) {
      // 使用 pathData 对象根据需求生成文件名字符串
      return `${pathData.chunk.name}-bundle.js`
    },
  },
},
```

提供带有路径前缀的文件名可以创建一个文件夹结构

```js
cacheGroups: {
  defaultVendors: {
    filename: 'js/[name]/bundle.js',
  },
},
```

##### `enforce` 是否强制为该 cacheGroup 生成分离的 chunk

`type: boolean`

`default: false`

忽略 `splitChunks.minSize`, `splitChunks.minChunks`, `splitChunks.maxAsyncRequests`, `splitChunks.maxInitialRequests` 配置项，强制为该 cacheGroup 创建 chunk 。

```js
cacheGroups: {
  defaultVendors: {
    enforce: true,
  },
},
```

##### `idHint` 设置 chunk id 的提示信息

`type: string`

`default: -`

设置 chunk id 的提示。它将被添加到 chunk 的文件名中。

```js
cacheGroups: {
  defaultVendors: {
    idHint: 'vendors',
  },
},
```

##### `enforceSizeThreshold` 强制分割阈值大小，默认 `50000`

type: `number`

default: `50000`

当文件大小超过指定值时，强制执行分割代码，忽略 `minRemainingSize`, `maxAsyncRequests`, `maxInitialRequests` 配置。

##### `minRemainingSize` 默认 `0`

`splitChunks.minRemainingSize` 选项是在 webpack 5 中引入的，通过此选项确保代码分割后，剩下的块的尺寸不能小于多少，以此避免一个 0 大小的模块。

开发模式下默认为 `0`，其他情况下，他它的值默认为 `splitChunks.minSize` 的值。所以它不需要手动指定，除非在少数情况下需要深度控制。

## 示例

### 默认情况的示例 1

```js
// index.js

import('./a'); // dynamic import
```

```js
// a.js

import 'react';

//...
```

结果：一个单独分割出的包含 `react` 的 chunk 将会被创建， 当 import 调用时，这个 chunk 会和原始包含 `./a` 的 chunk 并行加载

原因：

- 这个chunk 包含来自 `node_modules` 的 module
- `react` 大小超过 `30kb`
- import 调用的并行请求数量是 `2`
- 不影响初始页面加载时的请求

这背后的原因是什么? `react` 可能不会像应用程序代码那样经常变化。通过将它移到一个单独的 chunk 中，这个 chunk 可以与你的应用程序代码分开缓存(假设你使用 chunkhash, records, Cache-Control 或其他长期缓存方法)。

### 默认情况的示例 2

```js
// entry.js

// dynamic imports
import('./a');
import('./b');
```

```js
// a.js
import './helpers'; // helpers is 40kb in size

//...
```

```js
// b.js
import './helpers';
import './more-helpers'; // more-helpers is also 40kb in size

//...
```

结果：一个包含 `./helpers` 和它的所有依赖的单独的 chunk 将会被创建，import 调用时，这个 chunk 会和原始 chunk 并行加载。

原因：

- 这个 chunk 被两个 import 共享
- `helpers` 大小超过 30kb
- import 调用的并行请求数量是 `2`
- 不影响初始页面加载时的请求

将 `helpers` 的内容内置到每一个 chunk 中去的话，将会导致 `helpers` 的代码被下载两次，通过使用一个分离的 chunk 则只会下载一次。 当然，这会导致多了一次额外的资源请求，这可以看作一种权衡，这也是为什么有一个配置是分离的最小尺寸(minSize)是 `30Kb` 。

### 配置代码分离示例 1

创建一个 chunk 叫做 `commons`，其中包括入口之间共享的所有代码。

```js
// webpack.config.js

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};
```

此配置将会增大 initial bundle 的大小，当一个 module 不需要立即使用时，建议使用动态导入 `import()`。

### 配置代码分离示例 2

创建一个 chunk 叫做 `vendors`，其中包括整个应用中所有来自 `node_modules` 的代码。

```js
// webpack.config.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

这可能会导致一个包含所有外部包(external packages)的大 chunk。建议只包含核心框架和实用程序，并动态加载其余的依赖项。

### 配置代码分离示例 3

创建一个自定义的 vendor chunk，其中包含给定的正则表达式匹配的来自 `node_modules` 的 package 。

```js
// webpack.config.js

module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/u,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
}

```

这将导致 `react` 和 `react-dom` 一起被分离到一个单独的 chunk 中。如果您不确定一个 chunk 中包含了哪些 package ，可以参考 Bundle Analysis 一节了解详细信息。

## vue-cli 默认配置

```js
// config.optimization.splitChunks

{
  cacheGroups: {
    vendors: {
      name: 'chunk-vendors',
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
      chunks: 'initial'
    },
    common: {
      name: 'chunk-common',
      minChunks: 2,
      priority: -20,
      chunks: 'initial',
      reuseExistingChunk: true
    }
  }
}
```
