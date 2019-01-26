---
title: __proto__ & prototype
date: 2019-01-26 23:30:00
tags: js
categories: js
---
<!-- more --> 

原型

---

> 在ECMAScript-262中，对象被定义为“无序的集合，其属性可以包含基本值、对象或者函数。”（键值对）

--

访问属性：

```javascript
var person = {
    name: 'caster',
    age: '21',
    getName: function(){
        return this.name
    }
}

console.log(person.name);
console.log(person['name']);

['name','age'].forEach( e=>{ //这个方法不错
    console.log(person[e])
})
```

---

### 几种模式

--

#### 工厂模式

解决了机械、死板地定义问题：

麻烦模式：
```javascript
var eczn = {
    name: 'eczn',
    age: '23',
    getName: function(){
        return this.name
    }
}

var lry = {
    name: 'lry',
    age: '23',
    getName: function(){
        return this.name
    }
}
```
用工厂模式：

```javascript
var createPerson = function(name, age){
    let o = new Object();
    o.name = name;
    o.age = age;
    o.getName = function(){
        return this.name;
    }
    
    return o;
}
var eczn = createPerson('eczn', 23);
var lry = createPerson('lry', 23);
```

工厂模式虽然解决了多个相似对象的问题，但是它的弊端是无法知道对象的类型：

```javascript
let obj = {}；
obj instanceof Object; //true
//这里就是指对象无法知道自己是哪个函数生出来的
```
--

#### 构造函数模式

```javascript
var Person = function(name, age){//构造函数
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
}
var eczn = new Person('eczn', 23);
var lry = new Person('lry', 23);
```

构造函数很好，可以知道是自己哪个妈生的：

```javascript
eczn instanceof Person; //true
```
但是以上两个模式还有一个问题，

就是getName这个函数，在每次创造实例的时候都会创建，which is没有必要的，所以引出了原型模式

p.s. 虽然可以简单解决，就是把方法提到全局创建，这样可以共享方法，但是，这么做会污染全局对象，把全局对象搞得乌烟瘴气

--

#### 原型（prototype）模式

```javascript
// 声明构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 通过prototye属性，将方法挂载到原型对象上
Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('eczn', 223);
var p2 = new Person('lrys', 23);
console.log(p1.getName === p2.getName); // true
```

**当我们访问实例对象中的属性或方法时，会优先访问实例对象自身的属性方法**

```javascript
function Person(name, age) {
    this.getName = function(){
        console.log('function in constructor')
    }
}
Person.prototype.getName = function() {
    return this.name;
}

var p1 = new Person('eczn', 223);
console.log(p1.getName()); //'function in constructor'
```

--

---

### \_\_proto\_\_

```javascript
//Object
new Object({}).__proto__ = Object.prototype;

//Number
new Number(123).__proto__ = Number.prototype;

//String
new String('abc').__proto__ = String.prototype;

//Boolean
new Boolean(true).__proto__ = Boolean.prototype;

//Function
let f = function(){};
f.__proto__ = Function.prototype;

//Object
new Object({}).__proto__ = Object.prototype;

```

例题：

```javascript
function Person(){}
let p1 = new Person();

console.log(p1.__proto__); // ?
console.log(Person.__proto__); // ? 
console.log(Person.prototype.__proto__); // ? 
console.log(Object.__proto__); // ? 
console.log(Object.prototype.__proto__); // ? 
```

答案：

```javascript
console.log(p1.__proto__); // Person.prototype
console.log(Person.__proto__); // Function.prototype
console.log(Person.prototype.__proto__); // Object.prototype
// Person.prototype是普通对象，普通对象的构造函数是Object
console.log(Object.__proto__); // Function.prototype
console.log(Object.prototype.__proto__); // null
//其他类型如Function.prototype.__proto__情况同3，=== Object.prototype
```

\_\_proto\_\_指向对象构造函数的原型

1.无论是什么类型的构造函数，Function、Array、String之类的，它们的原型对象都是对象，所以Function.prototype.\__proto__自然是Object.prototype;

2.众所周知，函数是一等公民：

--

a.除了Function,其它原型都是object
```javascript
console.log(typeof Function.prototype) // function
console.log(typeof Object.prototype)   // object
console.log(typeof Number.prototype)   // object
console.log(typeof Boolean.prototype)  // object
console.log(typeof String.prototype)   // object
console.log(typeof Array.prototype)    // object
console.log(typeof RegExp.prototype)   // object
console.log(typeof Error.prototype)    // object
console.log(typeof Date.prototype)     // object
console.log(typeof Object.prototype)   // object
```

--

b.所有类型的构造器都来自Function.prototype:
```javascript
Object.__proto__; // Function.prototype
Array.__proto__; // Function.prototype
Number.__proto__; // Function.prototype
String.__proto__; // Function.prototype
Boolean.__proto__; // Function.prototype
```
它们继承Function.prototype的属性和方法如bind、call、apply；

--

c.同时它们又继承了Object.prototype的所有方法：
```javascript
Function.prototype.__proto__ === Object.prototype// true
```
所以那些类型的构造器又是函数同时也是JS对象，可以给自己添加/删除属性；继承了Object的toString、valueof等方法；

---

最后：

```javascript
//null是object
typeof null; //"object"

let a = Object.create(null);
a.__proto__; //undefined

console.log(Object.prototype.__proto__); // null
//原型链终止于null
```

万物终止于null => null生万物

一知半解..

---

终了

---

参考文章：

[前端基础进阶（九）：详解面向对象、构造函数、原型与原型链](https://www.jianshu.com/p/15ac7393bc1f)

[最详尽的 JS 原型与原型链终极详解，没有「可能是」。（一）](https://www.jianshu.com/p/dee9f8b14771)

[最详尽的 JS 原型与原型链终极详解，没有「可能是」。（二）](https://www.jianshu.com/p/652991a67186)

[最详尽的 JS 原型与原型链终极详解，没有「可能是」。（三）](https://www.jianshu.com/p/a4e1e7b6f4f8)

[白话原型和原型链](https://juejin.im/post/599d69fc6fb9a0248f4a7b31)


