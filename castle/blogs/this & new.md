---
title: this & new
date: 2019-01-21 23:05:00
tags: js
categories: js
---
<!-- more --> 

### this

this是JS的关键字之一，是对象自动生成的内部对象，只能在对象内部使用；

**this的指向取决于调用者而不是创建者**

---

#### 四种绑定方式

**1.默认绑定**：默认函数调用，this指向window（严格模式指向undefined）

```javascript
function test(){
    let a = 1;
    console.log(this.a)
}
let a = 100;
test(); //100
```

**2.隐性绑定**

```javascript
function test2(){
    console.log(this.a)
}
let obj = {
    a: 100,
    test2: test2
}
test2(); // undefined
obj.test2(); // 100
```

当函数test2执行的时候，它执行环境不再是全局而是有了上下文对象，所以this隐性地指向上下文对象obj;

<br>

**3.显性绑定**

由于隐性绑定的条件是对象必须包含这个函数，所以局限很大，为了对象不包含函数也能绑定this，就引出了call、apply、bind方法：

```javascript
function test3(){
    console.log(this.a)
}
let obj = {
    a: 100
}
test3(); //undefined
test3.call(obj); //100
test3.apply(obj); //100
test3.bind(obj)(); //100
```

**4.new绑定**

new操作符干了四件事：

1.创建一个新对象；

2.把这个对象的__proto__指向原函数的prototype；

3.将这个新对象绑定到函数的this上；

4.返回新对象，如果这个函数没有返回任何其他对象；


```javascript
function test4(){
    this.a = 10;
    console.log(this)
}
test4(); //window
console.log(a); //10

let obj = new test4();//先创建一个名为test4的新对象，再赋值给obj
console.log(obj.a); //10
```

使用new会让函数创建一个以自己名字命名的新对象，并返回；

所以如果函数返回一个对象，则会丢失新对象：

```javascript
function t(){
    this.a = 10;
    return {}
}
let obj = new t();
console.log(obj.a); //undefined
console.log(obj); //{}
```

return的对象覆盖了本来应该返回的新对象；

如果return的不是对象，则不会影响new返回的新对象，只会影响函数执行结果：

```javascript
function t(){
    this.a = 10;
    return 123123
}
let obj = new t();
console.log(obj.a); //10
t(); //123123
```

---

优先级：

new > 显性(call,apply,bind) > 隐性 > 默认

---

精彩的题目：

```javascript
function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // ?
console.log(b.a);    // ?
```
(摘自参考1)

解析：
>return this就是return window;
>而var a = foo(1)也就是var a = window;
>a.a == window.a，所以此时a.a是1；
>但是下面多了个var b = foo(10)，把原本指向window的a指向了arg，也就是10，所以a.a变成了undefined(猪队友..)；
>这时候b经历了相同的操作变成了window，于是b.a = 10;

答案是 undefined，10

<br>

题2：

```javascript
function foo() {
    getName = function () { 
        console.log (1); 
    };
    return this;
}
foo.getName = function () { 
    console.log(2);
};

foo.prototype.getName = function () { 
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName () {
    console.log(5);
}
 
foo.getName ();                // ?
getName ();                    // ?
foo().getName ();              // ?
getName ();                    // ?
new foo.getName ();            // ?
new foo().getName ();          // ?
new new foo().getName ();      // ?
```

解析：

1.首先，最后那个function getName因为是声明提前，所以被表达式覆盖，所以永远不会有5出现；
<br>

2.foo.getName()正常调用，2；<br>

3.getName()调用的是表达式的4；<br>

4.foo().getName()调用的是1,重新声明了getName的函数表达式，getName此时已全局变化，并且返回了window；<br>

5.这时候再来一次getName()，已经被上一步污染改变了，所以变成了1；<br>

6.new foo.getName()，对一个函数进性构造调用，也是经历2过程的，所以是2，同时创建了一个同名对象，内置3的函数；<br>

7.new foo().getName()，刺激！等价于new foo()生成的新对象newObj.getName()，由于new foo()会内置3，所以调用的getName自然就是3；<br>

8.new new foo().getName():

分解：var obj = new foo();

var obj2 = new obj.getName();

就是第6、第7步的合体，新生成obj内置3然后新生成obj2，但是我们不关心obj2内置什么（obj.getName），new的过程就是构造调用了一遍，所以还是3；

---

箭头函数(ES6)

=>

根据外部作用域来决定this指向，并且this无法被修改；

---

关于call、apply、bind的一些东西以后再议；

终了.

---

参考文章：

[深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )](https://segmentfault.com/a/1190000011194676#articleHeader13)

[前端基础进阶（五）：全方位解读this](https://www.jianshu.com/p/d647aa6d1ae6)

[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)

[JavaScript中的call、apply、bind深入理解](https://www.jianshu.com/p/00dc4ad9b83f)