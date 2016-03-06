#【翻译】JavaScript Style Guide

 [原文出处：Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)
 
##索引
------------------------------------------------
1. [类型](#1)
2. [参考](#2)
3. [对象](#3)
4. [数组](#4)
5. [类型](#1)

## <span id="1">类型</span> 
------------------------------------------------
 + 1.1 **原始类型**：当你访问一个原始类型的时候直接操作他的值。
  - string
  - number
  - boolean
  - null
  - undefined

```javascript
  const foo = 1;
  let bar = foo;
  
  bar = 9;
  
  console.log(foo, bar);  // => 1, 9
```


  
+ 1.2 **复杂类型**：当你访问一个复杂类型的时候操作的是这个值的引用。
  - object
  - array
  - function

```javascript
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```
## <span id="2">参考</span>
-----------------------------------------------
+ 2.1 为常量使用`const`，避免使用`var`
> 为什么？因为这可以保证你的变量不被修改，以免导致bug或者可读性变差。

```javascript
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```
+ 2.2 如果你必须修改变量，请使用let作为替代
> 为什么？`let`存活于块级作用域，而`var`是函数作用域
```javascript
// bad
var count= 1;
if (true) {
  count += 1;
}

// good, use the let
let count = 1;
if (true) {
  count += 1;
}
```
+ 2.3 注意：`let`和`const`都是块级作用域。
```javascript
// const and let only exist in the blocks they are defined in
{
  let a = 1;
  const b = 1;
}

console.log(a); //referenceError
console.log(b); //referenceError
```
## <span id="3">对象</span>
-----------------------------------------------
+ 3.1 使用字面量创建对象。
> 以下两种定义方式在作用上没有任何区别，后者节省字符，故推荐后者
```javascript
// bad
const item = new Object();

// good
const item = {};
```
+ 3.2 如果你的脚本运行在浏览器的脚本上下文，不要使用保留关键字作为键值。一来，可能会和高版本的ES冲突，二来，在低版本（例如：IE8）会失效。不过在ES6的模块和服务器端代码上使用是可以的。
```javascript
// bad IE8下superman.default失效，可使用superman['default']代替
const superman = {
  default: { clark: 'kent'},
  private: true,
};

// good
const superman = {
  defaults: { clark: 'kent'},
  private; true,
}
```
+ 3.3 使用可读性好的同义词代替保留关键字。
```javascript
// bad
const superman = {
  class: 'alien',
};

//bad
const superman = {
  klass: 'alien',
};

//good
const superman = {
  type: 'alien',
};
```
+ 3.4 创建带动态对象时使用"Computed Properties(ES6)"
```javascript
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: 'alien',
};
obj[getKey('enabled')] = true;

//good
const obj = {
  id: 5,
  name: 'alien',
  [getKey('enabled')]: true,
};
```
+ 3.5 使用shorthand(ES6)
```javascript
const abc = 'abc';

// bad
const atom = {
  abc: abc,
  
  addValue: function (value) {
    return atom.value + value;
  }
};
//good
const atom = {
  abc,
  
  addValue(value) {
    return atom.value + value;
  }
};
```
+ 3.6 把shorthand(ES6)分组放在对象声明的首部
```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```
+ 3.7 只对无效标识符使用引号
> 为什么？从主观上来说这样更易读，改进了语法高亮，也对很多JS引擎更加友好。
```javascript
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```
## <span id="4">数组</span>
-----------------------------------------------
+ 4.1 使用字面量创建数组。
> Array创建数组，单整数参数时，创建一个该整数长度的数组，其他情况则是创建以arguments为元素的数组。这种表里比兴的表现容易带来混淆。
```javascript
// bad
const item = new Array();

// good
const item = [];
```
+ 4.2 用Array#push插入元素而不是直接赋值。
```javascript
const someStack = [];

// bad
someStack[someStack.length] = 'aBC';

// good
someStack.push('aBC');
```
+ 4.4 用Array spread `...`(ES6)复制数组。
> spread操作符允许数组作为参数或者元素应用在数组操作或者函数参数上面。
```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for(i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```
+ 4.5 用Array#from(ES6)转换类数组对象为数组
```javascript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
+ 4.6 在数组方法的回调里面使用return。
```javascript
//good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

[1, 2, 3].map(x => x + 1);

//bad
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = memo.concat(item);
})

// good
const flat = {};
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
  const flatten = memo.concat(item);
  flat[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```
## <span id="5">解构</span>
-----------------------------------------------
+ 4.1 使用字面量创建数组。
> Array创建数组，单整数参数时，创建一个该整数长度的数组，其他情况则是创建以arguments为元素的数组。这种表里比兴的表现容易带来混淆。
```javascript
// bad
const item = new Array();

// good
const item = [];
```