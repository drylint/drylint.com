# 移除所有 `console`

## 安装

```bash
npm install -D babel-plugin-transform-remove-console
```

## 使用

配置在生产环境中去除所有 `console`

```js
// babel.config.js

// 生产环境插件列表
const prodPlugin = []

if (process.env.NODE_ENV === 'production') {
  // 添加插件，插件配置保留 `console.error` 与 `console.warn`
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn'],
    },
  ])
}

module.exports = {
   plugins: [
     ...prodPlugin
   ]
}
```
