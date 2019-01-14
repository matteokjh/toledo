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

---

to be continued.