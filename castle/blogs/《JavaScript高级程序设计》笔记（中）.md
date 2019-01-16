---
title: 《JavaScript高级程序设计》笔记（中）
date: 2019-01-14 8:00:00
tags: 读书笔记
categories: js
---
<!-- more --> 

重温高程

---

### Chapter 6.面向对象

OO === Object-Oriented

#### 属性类型

数据属性：

> [[ Configurable ]] - 能否通过delete删除属性，从新定义属性，能否把属性修改为访问器属性，默认为true；
> 
> [[ Enumerable ]] - 能否通过for-in循环返回属性，默认为true；
> 
> [[ Writable ]] - 能否修改属性；
> 
> [[ Value ]] - 包含这个属性的数据值；

访问器属性：(不包含数值，包含一对getter、setter)

> [[ Configurable ]] - 同上； 
> 
> [[ Enumerable ]] - 同上；
> 
> [[ Get ]] - 默认undefined；
> 
> [[ Set ]] - 默认undefined；

```javascript
var book = {};

Object.defineProperties(book,{
    _year: {//加下划线代表只能通过对象方法访问
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function(){
            return this._year;
        },
        set：function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
})
```

#### 构造函数和原型

引入prototype是为了让所有对象实例共享属性和方法；

每个函数都有prototype，该属性是一个指针，指向一个对象（原型对象）；

原型对象默认存在constructor属性，该属性指向构造函数；

```javascript
Person.prototype.constructor = Person; //Person是构造函数
```
实例内部存在__proto__属性，指向原型对象；

通过hasOwnProperty()方法判断属性来自实例还是原型，来自原型的属性会返回false；

in 操作符 在实例或者原型拥有属性的时候都会返回true，与hasOwnProperty一起用可以判断属性来自原型还是实例；

Object.keys()  - 返回包含所有可枚举实例属性的字符串数组；

Object.getOwnPropertyNames() - 返回所有实例属性，无论是否可枚举(constructor也会一起返回);

如果以对象字面量重写原型，constructor会指向Object，有必要的话可以手动添加：

```javascript
Person.prototype = {
    constructor: Person, //手动添加,不然访问实例person.constructor会返回Object而不是Person
    name: '',
    age: ''
    ...
}
//另外，这种属于重写原型的写法，已有实例由于引用的还是最初的原型，所以两者联系被切断；
//只是修改属性而不是重写的话就不会切断联系,即便是已有实例：

var friend = new Person();

Person.prototype.sayHi = function(){
    console.log('hi');
}

friend.sayHi(); //'hi'
```

#### 继承和原型链

js继承靠原型链实现


```javascript
//所有原型对象默认继承Object
function A(){
    this.a = true;
}
A.prototype.getA = function(){
    return this.a;
}
function B(){
    this.b = false;
}

//开始继承
B.prototype = new A();

//如果写在继承之前，会找不到，因为原型指向已变为A，只能找到A的方法；
B.prototype.getB = function(){
    return this.b;
}

var c = new B();
console.log(c.getA()); // true
console.log(c.getB()); // false
```

确定原型实例的关系：instanceof操作符、isPrototypeOf()
```javascript
c instanceof Object; //true
c instanceof B; //true
c instanceof A; //true

Object.prototype.isPrototypeOf(c); //true
B.prototype.isPrototypeOf(c); //true
A.prototype.isPrototypeOf(c); //true

```

---

### Chapter 7.函数表达式

#### 递归

阶乘：
```javascript
function a(num){
    if(num <= 1){
        return 1;
    }else {
    //这样写能避免函数名改了之后无效，但是严格模式下不能访问callee；
        return num * arguments.callee(num - 1); 
    }
}
```
```javascript
var a = (function f(num){//通过命名函数来解决这种问题
    if(num <= 1){
        return 1;
    }else {
        return num * f(num - 1); 
    }
})
```

#### 闭包与this

闭包：有权访问另一个函数作用域中的变量的函数；

```javascript
function createComparisonFunction(propertyName){
    return function(object1,object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else {
            return 0;
        }
    }
}
//创建闭包内调用了外部变量propertyName，
//导致propertyName这个局部变量在其函数执行完毕之后也不会销毁，要手动 = null；
```

eg:
```javascript
function createFunctions(){
    var result = new Array();
    for(var i = 0; i < 10; i++){
        result[i] = function(){
            return i;
        }
    }
    return result;
}

createFunctions()[0]() //10
createFunctions()[1]() //10
createFunctions()[2]() //10
...
createFunctions()[9]() //10
```
发生这种现象的原因就是因为闭包让每个函数（result）都保留着createFunctions的变量i，它们引用着同一个i，所以都返回10；

解决方法是创建另一个匿名函数让闭包符合预期：
```javascript
function createFunctions(){
    var result = new Array();
    for(var i = 0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            }
        }(i)//加了这个表示立即执行，并把i传进去
    }
    return result;
}
createFunctions()[0]() //0
createFunctions()[1]() //1
createFunctions()[2]() //2
...
createFunctions()[9]() //10
```

匿名函数中，this指向全局对象：

```javascript
var name = 'the window';

var object = {
    name: 'my object',
    getnameFunc: function(){
        return function(){
            return this.name;
        }
    }
}

console.log(object.getnameFunc()()); //the window
```
想要指向正确的对象，可以：
```javascript
var name = 'the window';

var object = {
    name: 'my object',
    getnameFunc: function(){
        var that = this;
        return function(){
            return that.name;
        }
    }
}

console.log(object.getnameFunc()()); //my object
```
或者不用匿名函数：
```javascript
var name = 'the window';

var object = {
    name: 'my object',
    getnameFunc: function(){
        return this.name;
    }
}

console.log(object.getnameFunc()); //my object
```

---

### Chapter 8.BOM

#### window对象

document.documentElement.clientHeight --- 可见区域高度

#### location对象

#### navigator对象

#### screen对象

#### history对象

---

...

越写越发觉得这样写没什么用，写不到深处，理解不到精髓，单纯抄书而已，所以今后还是按照说好的按模块写吧w(~~我真对得起自己的星座~~)

---

终了.

