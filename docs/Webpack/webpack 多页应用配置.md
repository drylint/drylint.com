# webpack 多页应用配置

```js
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
 // 多入口，分别为每页应用指定入口文件
 entry: {
  home: './src/index.js', // 为首页指定入口文件，并命名为 home
  about: './src/about.js' // 为about页面指定入口文件，并命名为 about
 },
 output: {
  filename: '[name].js', // [name]会使用入口文件指定的名字替换： home.js &&  about.js
  path: path.resolve(__dirname, 'dist')
 },
 plugins: [
  new CleanWebpackPlugin(), // 自动清理配置文件的 output 目录
  new HtmlWebpackPlugin({
   template: path.join(__dirname, 'src/index.html'),
   filename: 'index.html', // 生成输出的文件名
   chunks: ['home'] // 指定使用输出哪一个js模块，若不指定会将 output 输出的js全部加载
  }),
  new HtmlWebpackPlugin({
   template: path.join(__dirname, 'src/about.html'), // 要使用的模板文件，不指定则使用默认
   filename: 'about.html', // 生成输出的文件名
   chunks: ['about'] // 指定使用输出哪一个js模块，若不指定会将 output 输出的js全部加载
  })
 ],
}
```
