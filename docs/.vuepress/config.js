const { nav, sidebar } = require('./utils/NavAndSidebar')
module.exports = {
  title: '代码干燥计划',
  description: '分享前端工程化、模块化、组件化开发经验；包括 Webpack, Vue, React, TypeScript, Node, 微信小程序, Taro, Uni-app 等。',
  // 默认 '/' ， 如果要发到 user.github.io/blog ，则 base 需要设为 /blog/
  base: '/',
  // 打包文件存放路径，默认 .vuepress/dist
  dest: 'dist',
  evergreen: true, // 目标客户端为常青树浏览器，即禁止 ESNext 转为 ES5
  configureWebpack: {
    resolve: {
      alias: {
        '@imagesxx': 'imagesxxx',
      },
    },
  },
  // markdown 渲染配置
  markdown: {
    // 目录渲染
    toc: {
      includeLevel: [2, 3, 4, 5, 6],
      markerPattern: /^\[toc\]/imu,
    },
    // 是否显示代码块行号
    lineNumbers: true,
  },
  // 默认主题配置修改
  themeConfig: {
    // logo: 'https://cn.vuejs.org/images/logo.png',
    displayAllHeaders: true, // 显示所有页面的标题链接，默认值：false (只显示当前页面的标题链接)
    activeHeaderLinks: true, // 是否在滚动时，实时更新嵌套的标题链接和 URL 中的 Hash 值
    nav,
    // 侧边栏显示的 toc 标题深度
    // 可选值 0 (不显示), 1 (默认，h2), 2 (h3)
    sidebarDepth: 2,
    sidebar,
    smoothScroll: true,
    // Git 仓库和编辑链接
    repo: 'drylint/vuepress-template',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页',
  },
}

// sidebar: {
//   '/frontEnd/javascript/ES6/': [
//     {
//       title: '分组一',
//       collapsable: false,
//       children: [
//         ['ES6', 'ES6'], // [link, text] 表示 [链接地址，链接文字]
//         'ES6_08_function',
//         'ES6_09_Array',
//         'ES6_10_11_Object',
//         'ES6_12_Symbol',
//       ],
//     },
//   ],
// }
