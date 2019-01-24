---
title: Scope & Closure
date: 2019-01-24 23:05:00
tags: js
categories: js
---
<!-- more --> 

作用域链以及闭包.

---

### 1. EC & VO

**执行环境(Execution Context => EC)**

so called '最为重要的概念' in JS高程第三版. <br>

 ：**定义了变量或函数有权访问的其他数据并决定他们各自的行为**.<br><br>

与之关联，每个EC都有一个**变量对象(Variable Object => VO)**.

EC中定义的所有函数和变量都在VO里；<br><br>

**全局执行环境**：最外围，在web浏览器中相当于window全局对象，关闭网页或浏览器时销毁；

**函数的执行环境**：函数环境随着代码执行入栈，出栈（环境栈）；

---

### 2. Scope Chain

全局环境中的变量谁都能访问，但是全局作用域**一般情况下**只能访问全局变量；

**作用域链**控制变量的访问权限；

每次进入一个EC，都会创建一条属于当前EC的SC，SC是所有能访问的VO的集合；

最前端当然就是当前EC的VO，就近原则；而最后一个当然也就是全局变量对象；

标识符解析沿着SC一步一步找，最后找到全局都找不到的话就会报错；

**一个经典例子**：
```javascript
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
```
结果是输出1，为什么JS不会顺理成章地输出我们期望看到的2呢？

这是因为JS采用**词法作用域**而非**动态作用域**（如果采用后者就能如愿输出2了）

#### 词法作用域

又称静态作用域；

上面那题的过程是：

1.做预解析，function和变量提升，此时作用域链已经生成；

2.开始执行代码bar();

3.var了value为2（局部），然后执行foo（）；

4.foo中收到console命令，开始在作用域链找value，自己的EC找不到，直接找全局，所以打印1；

看来bar不算是foo的外部函数作用域，所以根本不找bar；

外部函数作用域应该是要嵌套才算，修改代码如下就能够输出2：
```javascript
var value = 1;
function bar(){
    var value = 2
    foo()
    function foo() {
        console.log(value);//2
    }
}
```

---

### 3. Hoisting

提升，有**变量提升**和**函数提升**；<br><br>

**变量提升**：
```javascript
let a = 'window'
function hoisting(){
    console.log(a);
    var a = 'inside'
}
hoisting(); //undefined
console.log(a); //window
```
虽然console.log在var a前面，但是因为函数的作用域链最前端是函数的活动对象(Active Object)，所以会先找函数内部的a，此时a还未赋值，只是在当前环境里先声明了而已，所以undefined，这就叫作变量提升；

另外一种函数提升大家都很熟悉的啦，就不多说了~

**等等！**

差点忘了说let的特殊情况了：

看看这个就懂了：[var let变量提升引发的思考](https://www.jianshu.com/p/b87d620185f2)

```javascript
let x = 'global'
{
  console.log(x) // Uncaught ReferenceError: x is not defined
  let x = 1
}
```
如果把内部的let改为var，会打印undefined，但是如果是let，则会报错；

并不是因为let不存在变量提升，恰恰相反，**let也是存在变量提升的**！只不过let的提升没有包括变量的**初始化**；

文章里说，var声明的变量，[创建、初始化]两个过程都是提升的，所以console的时候已经初始化为undefined；

function的提升是[创建、初始化、赋值]三个过程都有提升，而let只有创建是提升的，初始化未提升，所以会报错！

遗憾的是我没找到任何能证明console的时候let的变量已经创建了的方法...

---

### 4.Closure

闭包：有权访问另一个函数作用域中的变量的函数（JS高程第三版）；

闭包能提高函数的自由度，灵活性，但也牺牲了性能；

经典例子：

```javascript
var fn = null;
function foo(){
    var a = 2;
    function innerFoo(){
        console.log(a)
    }
    fn = innerFoo;//这一句很关键
}

function bar(){
    fn(); //让全局变量fn保持了对innerFoo的引用
}

foo();
bar(); // 2
```

![](/static/img/closure1.png)

如图可以看到closure了，chrome标准的closure是指当前执行上下文，所以是foo；

所以我们通过闭包，可以在别的执行环境保持对函数内部变量的访问；

结合上文提到的JS词法作用域中的函数提升，有：

```javascript
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        console.log(c); // 因为c不在内部函数的作用域链中
        console.log(a);
    }
    fn = innnerFoo;
}

function bar() {
    var c = 100;
    fn();
}

foo();
bar();
```
显然，bar跟innerFoo其实没关系，bar并不是innerFoo的外部函数，所以变量c不在innerFoo的SC中；

--

例2：
```JavaScript
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}
function testList() {
    var fnlist = buildList([1,2,3]);
    // 使用j是为了防止搞混---可以使用i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
 testList() //输出 "item2 undefined" 3 次
```

原因是fnlist[j]保持对同一个变量i和item的引用，所以是最后一个，也就是item2和i = 3；

要正确输出，直接把对应两个var改成let就好；

如果被问到不用let行不行，那就这样：

```javascript
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
		ttt(i)
        function ttt(i){
            var item = 'item' + i;
            result.push( function() {console.log(item + ' ' + list[i])} );
        }
    }
    return result;
}
function testList() {
    var fnlist = buildList([1,2,3]);
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}
 testList() //正确输出
```

创建一个内部函数，让i保持被引用；

--

最后注意，闭包函数(chrome标准)每次被调用都会为局部变量创建一个独立的闭包：

例3
```javascript
function newClosure(someNum, someRef) {
    // 局部变量最终保存在闭包中
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '\nanArray ' + anArray.toString() +
            '\nref.someVar ' + ref.someVar);
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj); //第一次调用
fn2 = newClosure(5, obj); //第二次调用
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;
```

--

最后压轴题：
```javascript
function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // ?
a.fun(1);        // ?        
a.fun(2);        // ?
a.fun(3);        // ?

var b = fun(0).fun(1).fun(2).fun(3);  // ?

var c = fun(0).fun(1);  // ?
c.fun(2);        // ?
c.fun(3);        // ?
```

答案是：

```javascript
var a = fun(0);  // undefined
a.fun(1);        // 0        
a.fun(2);        // 0
a.fun(3);        // 0

var b = fun(0).fun(1).fun(2).fun(3);  
// undefined 0 1 2

var c = fun(0).fun(1);  // undefined 0
c.fun(2);        // 1
c.fun(3);        // 1
```

---

终了


---

参考文章：

[JavaScript中作用域和作用域链的简单理解（变量提升）](https://www.cnblogs.com/buchongming/p/5858026.html)

[JavaScript作用域、上下文、执行期上下文、作用域链、闭包](https://blog.csdn.net/qq_27626333/article/details/78463565)

[JavaScript 闭包入门（译文）](https://juejin.im/post/58832fe72f301e00697b672d)

[JavaScript 闭包](https://segmentfault.com/a/1190000006875662)
