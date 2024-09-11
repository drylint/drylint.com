# Electron 各个版本对应的 Chromium / Node / V8 的版本

每个 Electron 版本通常都会包含一个特定的 Chromium 版本，并且随着 Electron 的大版本更新，所捆绑的 Chromium 版本也会随之升级。以下是一些主要的 Electron 版本和其对应的 Chromium 版本：

| **Electron 版本** | **Chromium 版本** | **Node.js 版本** | **V8 版本** |
|------------------|------------------|-----------------|--------------|
| 26.x.x           | 114.x.x          | 20.x.x          | 11.x.x       |
| 25.x.x           | 112.x.x          | 20.x.x          | 10.2.x       |
| 24.x.x           | 110.x.x          | 18.x.x          | 10.1.x       |
| 23.x.x           | 108.x.x          | 18.x.x          | 10.0.x       |
| 22.x.x           | 106.x.x          | 16.x.x          | 10.0.x       |
| 21.x.x           | 104.x.x          | 16.x.x          | 10.0.x       |
| 20.x.x           | 102.x.x          | 16.x.x          | 10.0.x       |
| 19.x.x           | 100.x.x          | 16.x.x          | 9.8.x        |
| 18.x.x           | 98.x.x           | 16.x.x          | 9.7.x        |
| 17.x.x           | 96.x.x           | 16.x.x          | 9.6.x        |
| 16.x.x           | 96.x.x           | 16.x.x          | 9.4.x        |
| 15.x.x           | 94.x.x           | 16.x.x          | 9.4.x        |
| 14.x.x           | 93.x.x           | 14.x.x          | 9.3.x        |
| 13.x.x           | 91.x.x           | 14.x.x          | 9.1.x        |
| 12.x.x           | 89.x.x           | 14.x.x          | 8.9.x        |
| 11.x.x           | 87.x.x           | 12.x.x          | 8.7.x        |
| 10.x.x           | 85.x.x           | 12.x.x          | 8.5.x        |
| 9.x.x            | 83.x.x           | 12.x.x          | 8.3.x        |
| 8.x.x            | 80.x.x           | 12.x.x          | 8.0.x        |
| 7.x.x            | 78.x.x           | 12.x.x          | 7.8.x        |
| 6.x.x            | 76.x.x           | 12.x.x          | 7.6.x        |
| 5.x.x            | 73.x.x           | 12.x.x          | 7.4.x        |
| 4.x.x            | 69.x.x           | 10.x.x          | 7.0.x        |
| 3.x.x            | 66.x.x           | 10.x.x          | 6.7.x        |
| 2.x.x            | 61.x.x           | 8.x.x           | 6.1.x        |
| 1.x.x            | 50.x.x           | 6.x.x           | 5.1.x        |

## 如何查看当前 Electron 版本的 Chromium 版本

你可以通过以下方法查看你正在使用的 Electron 版本所包含的 Chromium 版本：

1. **查看 Electron 的 `process.versions`：**
   在 Electron 应用的开发者工具中，运行以下命令来查看 Chromium 版本：

   ```js
   console.log(process.versions);
   ```

   该命令将输出所有相关版本，包括 Chromium、Node.js 和 V8。

2. **查看 Electron 官方发布说明：**
   每个 Electron 发布版本的说明中都会列出所捆绑的 Chromium、Node.js 和 V8 版本。可以访问 [Electron 的发布页面](https://github.com/electron/electron/releases) 查看具体版本信息。
