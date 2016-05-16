# 【note】Android

xml控制样式和元素属性
安卓的每个页面窗口成为Activity
Activity之间通过startActivity跳转，传递Intent对象通信

犯错：
1.onclick绑定的方法定义必须传入一个View对象作为参数，否则崩溃

未解决问题：
1. `actionBar.setHomeButtonEnabled(false);`
    Exception:Attempt to invoke virtual method 'void android.app.ActionBar.setHomeButtonEnabled(boolean)' on a null object reference
`解决方案`：引用v7没引用v4导致冲突？

