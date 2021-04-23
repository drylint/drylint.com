[toc]

# image-webpack-loader

## 安装

```bash
npm install image-webpack-loader --save-dev
```

## 用法

在 `file-loader` 之后使用

### 通用默认配置

```js
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true, // webpack@1.x 版本使用此配置项
        disable: true, // webpack@2.x 以上使用此配置项
      },
    },
  ],
}]
```

### 各压缩器单独配置

```js
rules: [{
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    },
  ],
}]
```

以下压缩器均默认开启：

- mozjpeg — Compress JPEG images
- optipng — Compress PNG images
- pngquant — Compress PNG images
- svgo — Compress SVG images
- gifsicle — Compress GIF images

And optional optimizers:

- webp — Compress JPG & PNG images into WEBP

可通过配置 `optimizer.enabled: false` 禁用所有默认配置，再手动配置各单项压缩器。

## Options

### bypassOnDebug (all) 是否在开发模式或 debug 模式下禁用压缩

`Type: boolean`

`Default: false`

默认不禁用，webpack 1.x 配置项

开启此功能后，当使用 webpack 的 `debug` 模式时，不会进行任何处理，并且此 loader 会表现为一个普通的 `file-loader`。在开发或使用webpack-dev-server时，使用它可以加快初始编译速度，并在较小程度上加快后续编译速度。正常构建项目（build）则会正常处理，并输出压缩后的文件。

### disable 是否在开发模式下禁用压缩提升运行速度，默认不禁用

`Type: boolean`

`Default false`

与 bypassOnDebug 选项相同的功能，但不依赖于webpack的 `debug` 模式，因为 `debug` 模式在 `webpack 2.x` 中已被弃用。如果运行 webpack@2.x或更高版本，则使用此选项。

## 各压缩器各自配置项

### mozjpeg

### optipng

### pngquant

### svgo

### gifsicle

### webp

## vue-cli3 中

```js
config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use:[{
        loader: 'image-webpack-loader'
        options: {bypassOnDebug: true}
    }]
})
```

```js
// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
            .end()
    }
}
```
