# debugger

- resume/continue

- step into：单步执行，遇到子函数就进入并且继续单步执行（简而言之，进入子函数）；

- step over：在单步执行时，在函数内遇到子函数时不会进入子函数内单步执行，而是将子函数整个执行完再停止，也就是把子函数整个作为一步。有一点,经过我们简单的调试,在不存在子函数的情况下是和step into效果一样的（简而言之，越过子函数，但子函数会执行）。

- step out：当单步执行到子函数内时，用step out就可以执行完子函数余下部分，并返回到上一层函数。

step

Pause/Resume script execution：暂停/恢复脚本执行（程序执行到下一断点停止）。
Step over next function call：执行到下一步的函数调用（跳到下一行）。
Step into next function call：进入当前函数。
Step out of current function：跳出当前执行函数。
Deactive/Active all breakpoints：关闭/开启所有断点（不会取消）。
Pause on exceptions：异常情况自动断点设置。

Watch：Watch表达式
Call Stack: 栈中变量的调用，这里是递归调用，肯定是在内存栈部分调用。
Scope：当前作用域变量观察。
BreakPoints：当前断点变量观察。
XHR BreakPoints：面向Ajax，专为异步而生的断点调试功能。
DOM BreakPoints：主要包括下列DOM断点，注册方式见下图
当节点属性发生变化时断点（Break on attributes modifications）
当节点内部子节点变化时断点（Break on subtree modifications）
当节点被移除时断点（Break on node removal）

Global Listeners：全局事件监听
Event Listener Breakpoints：事件监听器断点，列出了所有页面及脚本事件，包括：鼠标、键盘、动画、定时器、XHR等等。

Pause on exception 在捕获到未知错误时暂停运行，但是如果代码加了 `try...catch`，则不能定位到异常的位置。

Pause on caught exceptions 捕获到错误时暂停，包括 `try.catch` 里面的异常也可以定位到具体位置。
