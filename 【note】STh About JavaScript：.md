### 【note】STh About JavaScript：
## 1.
这里的难点在于`setTimeout(func, [delay, [arg1, [arg2, ...]]])`的理解
```javascript
var a= 0;
function one(){
  for(var i = 0;i<10;i++){
   setTimeout(function(){
    a+=i;
   },0)
  }
}
function two(){
  alert(a); //a=100
}
one();
setTimeout(function(){
    two();
  },0);//此处setTimeout去掉的话，alert出来的a值为0
```
## 2. 
```javascript
function b(a) {
    console.log(a);
    var a = 1;
    console.log(a);
    // function a() {}
    console.log(a);
}
b(7);
```
## 3. 

```javascript
var o = {
    foo: a,
    length: 5,
    bar: function() {
        arguments[0]();
    }
}
function a() {
    //a.length为Function形参的个数
    console.log(this.length);
}
o.foo();
o.bar(a, 0, 2);
```
##4.
涉及语言细节：
1）变量声明提升
2）函数表达式的执行（拆分两行，具体见下文注释）
3）JS运算符优先级
4）构造函数返回值
 >1.JS中构造函数若没有指定返回值，则像其他语言一样返回实例化对象
 2.若有返回值，if 返回值 == 引用类型: 返回该引用类型 else if 返回值为非引用类型: 与无返回值处理相同，返回实例化对象。
                           
注意：
    第三问中，执行`Foo()`后覆盖了原来的`window.getName`，从而影响了第四问的结果；
    第五问中`.`的优先级高于`new`,相当于`new (Foo.getName)()`
    同理，第六文中括号优先于`new`，相当于`(new Foo()).getName()`，`(new Foo())`返回实例化对象，然后再调用实例化对象的`getName()`，也就是prototype中的`getName()`。
    
```javascript
function Foo() {
    getName = function() {
        alert(1);
    }
    return this;
}
Foo.getName = function() {
    alert(2);
}
Foo.prototype.getName = function() {
    alert(3);
}
/**解析顺序为 
    var getName 编译时提升变量声明到开头
    getName = function() {...} 后执行
 **/
var getName = function() {
    alert(4);
} 
function getName() {
    alert(5);
}
//run
Foo.getName();    //2
getName();        //4
Foo().getName();  //1 
getName();        //1
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3   
```

