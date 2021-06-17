# windows 10 开启自启动应用管理

## 任务管理器-启动

1. 在底部任务栏点击【右键】，启动【任务管理器】，快捷键为 `Ctrl` + `Shift` + `Esc`
2. 如果是精简窗口，点击【详细信息】
3. 在详细页面点击 【启动】，可以看到一些自启动应用
4. 在对应的应用上，点击【右键】，然后点击【禁用】即可

## 设置-应用-启动

1. 打开【设置】，打开【应用】，打开侧边栏【启动】
2. 关闭不需要自启动的程序即可

## 设置-隐私-后台应用

1. 打开【设置】，打开【隐私】
2. 侧边栏菜单中打开【后台应用】
3. 可以关闭上方的【允许应用在后台运行】一键禁止全部应用，也可以在应用列表中单独禁止某个应用后台运行

## 未在任务管理器中的软件

1. 快捷键 `Win` + `R` 打开【运行】弹窗，输入 `shell:startup` 然后点击【确定】会打开一个文件夹
2. 文件夹中存放了要自启动的程序的快捷方式，将对应的应用快捷方式删除即可
3. 同理，需要开机启动的程序，将快捷方式放到此文件夹中即可
4. 还有一个文件夹： `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp` 也是同样的操作。

## 工具： Autoruns for Windows

微软官方自启动管理工具：[Autoruns](https://docs.microsoft.com/zh-cn/sysinternals/downloads/autoruns) ([下载](https://download.sysinternals.com/files/Autoruns.zip)) ，非常全面实用的应用启动监测工具。

下载后，以管理员身份运行程序，找到对应的自启动应用即可禁用

Autoruns 是 [Sysinternals Suite](https://docs.microsoft.com/zh-cn/sysinternals/downloads/sysinternals-suite) ([下载]((https://download.sysinternals.com/files/SysinternalsSuite.zip))) 套件其中之一，也可以下载整个套件，其中还有很多其他的实用工具。
