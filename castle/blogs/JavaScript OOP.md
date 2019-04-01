---
title: JavaScript OOP
date: 2019-03-21 05:51:00
tags: js
categories: js
---
<!-- more --> 

讲一下我理解的JS-OOP(Object Oriented Programming)

---


### 面向对象 & 面向过程

- 面向过程关注解决问题的步骤，以动作为主；
- 面向对象关注解决问题的步骤中的对象以及它们的行为，以主谓为主；

面向过程：
> 开门(冰箱)
>
> 装入(冰箱，大象)
>
> 关门(冰箱)

面向对象：
> 冰箱.开门
>
> 冰箱.装入(大象)
>
> 冰箱(关门)

---



- 不应该把两者完全独立开，面向对象的方法中也包含面向过程的思想，只是主角是对象，对象封装的方法也要按照过程步骤执行；

**面向过程语言**：C（只知道C，一些早期的高级语言应该都是）;

**面向对象语言**：C++、C#、Java、Python、**JavaScript**、PHP 等等;

--

- 面向过程：
- - 优点：流程化，模块化，性能比面向对象好(Linux大部分、windows一些效率为重的地方)；
- - 缺点：难复用，难维护，难扩展;

想象一个五子棋程序，如果要加个‘悔棋’功能，要改写步骤，上一步以及上上步操作都要无效化，这对于只关注步骤的面向过程来讲简直是个噩梦，改动起来分分钟伤筋动骨；

而面向对象的话，由于走子方法封装在棋子、棋盘实例中，想要悔棋，只要在棋盘实例中封装一个方法，修改棋子地图属性就可；

--

- 面向对象：
- - 优点：易维护、易复用、易扩展，直观，是人类观察世界的直观思维;
- - 缺点：性能较差;

对于性能差这一点，主要是较于面向过程，oop的对象要封装函数，涉及继承多态，所以占用的内存就肯定比过程高；

这里献上一张经典的图：

![](/static/img/oop1.png)

实在是太搞笑了

---

### JavaScript OOP

面向对象三大元素：封装、继承、多态;

**封装**就是类的概念： 一类对象共用的属性和方法放在一个类里，类只对外暴露接口，外界无需了解内部具体实现;

- 由于JS没有类的概念，故JS的封装靠函数实现封装（如ES6 class）;

```javascript
var Student = function(id, name, age){// 封装学生类
    var id = id; // 私有属性，只能通过方法访问
    function checkId(){ // 私有方法，只能通过类访问，实例无法访问(private)
        console.log('private checkId()');
    }
    this.getId = function(){ // 可访问私有属性的公有方法（protected）
        console.log(id);
    }
    this.name = name; // public
}

var s1 = new Student(1, 'Alice', 20);//创建实例
s1.checkId();// s1.checkId is not a function
s1.getId();// 1, 访问到了私有属性
s1.name; // Alice

```

--

**继承**前面有讲：[Caster：继承](https://sulpures.com/#/toledo?title=%E7%BB%A7%E6%89%BF)

简而言之就是客观事物有共性，观察它们的共有属性并封装在‘原型’中，客观事物就可以作为‘原型’的实例对象存在，它们共有一些属性；

--

**多态**：同一种操作对于不同的对象会产出不同的结果



*《JavaScript设计模式与开发实践》*中的经典例子：

非多态：
```javascript
var makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
}
var Duck = function(){}
var Chicken = function() {};
makeSound(new Chicken());
makeSound(new Duck());
```

多态：
```javascript
var makeSound = function(animal) {
    animal.sound();
}

var Duck = function(){}
Duck.prototype.sound = function() {
    console.log('嘎嘎嘎')
}
var Chicken = function() {};
Chicken.prototype.sound = function() {
    console.log('咯咯咯')
}

makeSound(new Chicken());
makeSound(new Duck());
```

为什么上面的第一个例子不是多态的例子呢？它一样是同一操作的不同结果阿！

个人理解就是因为首先上面的例子弹性非常差，只能判断两个类，如果多一个Goose就需要再加个判断，直接影响makeSound函数；

而多态的核心思想应该是：**把 ‘谁来做’ 跟 ‘怎么做’ 分开**；

所以法二就能区分开 ：makeSound里调用对应动物的方法，也就是负责叫谁来执行（谁来做），而类里的同名方法则是决定不同的类要做的事情是什么(怎么做)；

一般的js多态方法都是子类重写父类方法从而覆盖父类的方法，也就是做到了Java的重写(override)，做不到Java的重载(overload);

顺带一提，重载指的是方法名相同，但是函数参数的类型，个数不同可以视作两个不同方法，并根据以上特征执行对应函数；

---

参考文章：

[Cherry：javascript面向对象编程，带你认识封装、继承和多态](https://cherryblog.site/javascript-oop.html) （较多参考）