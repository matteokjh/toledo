---
title: Java
date: 2017-09-07 22:40:22
tags: ‘’
categories: java
---
Java 学习汇总.
(此贴记录本人大二(2017-2018学年)上学期java学习的点滴.)
最后修改：2017.09.24
<!-- more -->
<small>有些内容由于一些不可抗力的原因非常简略，待以后有机会仔细学习时补充</small>
<hr>

# 第一章 Java综述.

Java是一门面向对象的语言,面向对象包含：封装，继承，多态.
Java以类为组织单元.
## 三大版本

### Java SE
Standard Edition.
Java EE 与 Java ME 以此为基础.
包含:
面向对象相关，API（Application Programming Interface,应用程序编程接口），JVM 等.
其中JVM属于JRE,JRE又属于JDK.
<br>
JVM: virtual machine, 虚拟机用作把.java源文件编译成.class字节码文件.
JRE: Runtime Environment, 运行环境.
JDK: Development Kit, 开发工具包.
<hr>

### Java EE
Enterprise Edition.
包含:
JSP(Java Server Pages),EJB(Enterprise JavaBeans)等等.
<hr>

### Java ME 
Micro Edition.
移动，游戏，通信相关.
<hr>

## 环境变量.
系统设置里面找环境变量，加PATH,CLASSPATH,JAVA_HOME.
其中PATH的为:
![](/img/java1.png);

## 记事本写Java.
写好 .java 后缀文件后打开cmd输入
```bash
javac + 文件名 #编译
```
之后会出现.class后缀文件.
运行
```bash
java + 文件名字 #注意，此处不能加后缀.
```
<hr>

## ide
我选择的是Intellij idea.
步骤:
1.创建项目(project)
2.创建程序包(package,管理代码,避免重名)
3.编写Java程序,运行.
<br>
引用时加包名.
![](/img/java2.png)
<hr>

## Java工具包.
java.lang 语言基础
java.util 各种工具
java.io   输入输出
<br>
使用时import.+包名+类名.(直接引整个包也行)
<hr>

# Java基础

## 数据类型
大多类似C，下面只列出需要注意的.

1.如果需要对浮点型数据赋初值，初值后加f或F.
2.char 初值加单引号; String 加双引号.
<br>

## 语句
foreach:
```java
for(int x: arr){
   //这样就可以遍历arr. 
}
```
label:
```java
label: statement
        ···;
        break label;//或者continue
//label只是个标记的名字怎么取都行.
```

## 注释
annotation
Java 的注释
```java
/**
 *
 *注释
 */
```
<hr>

# 第二章 面向对象

## 类的声明
固有格式:
```java
[modifiers] class ClassName [extends SuperClassName] [implements InterfaceNames]
//方括号的可省略
```
### 1.modefiers部分
modefiers 为修饰符,可以设置为 abstract , final , public.
1.abstract: 抽象类，不能直接实例化为对象，存在抽象方法但无法直接调用，需要有子类重写并给出方法体.
        （如果一个类的子类会用不同方式实现该类方法，就可以定义为abstract）
2.final: 如果认为一个类已经很完善，不需要再改变，就可以定义为终类.
3.public: 公用类，位于前两者之前，可以被包外调用，但只能有一个.
3.省略: 表明该类友好，只能在包内用.

### 2.ClassName部分
类名，必须是有效的Java标识符.

###　3.extends 部分
SuperClassName 是超类名，extends表明本类是从超类中派生出来的子类，
1）Java不支持多重继承，因此每个类只有一个超类。
2）Java每一个类必须有一个超类，若extends省略则默认继承Object。

### 4.implements部分
InterfaceNames 是多个接口名，implements表明本类实现这些接口
可以实现多个接口，用逗号隔开.
<hr>

## 类体部分

### 成员变量(member variables)
也称作域（field），分为类变量（class variable）和实例变量（instance variable）.
类变量在类中只出现一次，系统只会为类变量分配一次内存。
实例变量出现在类的每个新实例中，两者区别在于是否有static.
声明成员变量的一般格式：
```java
[accessSpecifier][static][final][transient][volatile]type variablename
```
#### 1.accessSpecifier 访问限制符
private
protected
public
friendly
(省略默认friendly)
#### 2.static
有就是类变量，无就是实例变量（但注意两者都属于成员变量）
只是没有static就不能ClassName.类名而是构造一个实例之后实例名.类名。
#### 3.final
表明该变量是个常数

#### 4.transient
不会被序列化

#### 5.volatile
可以被多个并行的线程异步修改

### 方法
格式：
```java
[accessSpecifier][static][abstract][final][native][synchronized]
returnType methodName([paramlist])[throws exceptionsList]
```
native: 没有方法体，需要其他语言来实现
synchronized: 控制多个并发线程对共享数据的访问
paramList：参数（与成员变量同名，局部优先），成员变量不设置初始值默认为0，局部变量必须设初始值
throws exceptionList: 异常处理

#### 构造方法
与类同名，不能声明返回类型，未定义会自动生成

#### 方法重载overloading
方法同名，利用参数需求不同来区分,常用于构造方法，提供多种初始化方法.

<hr>

## 对象

<hr>

## 类的继承

<hr>

## 嵌套类
分静态与非静态

### 静态嵌套类

只能访问外部静态成员

### 内部类（非静态）

每个内部类都独立继承一个接口的实现，外面影响不到里面

#### 1.成员内部类
不能存在static变量和方法，依附外围，只有先到外围才能到里面。
#### 2.局部内部类
在方法内定义
#### 3.匿名内部类
类似匿名函数

### 抽象类与接口
若抽象类方法全为抽象的，则称为接口。
interface 接口名
实现：
className implements 接口名
<hr>

## 多态
<hr>

## 泛型
<hr>

## 枚举
<hr>

# 第三章 Lambda表达式
<hr>

# 第四章 实用类

## 数学类
<hr>

## 正则表达式
<hr>

## 字符串类
<hr>

## 日期与时间类 
<hr>

# 第五章 增强性能类

## 异常
---感觉就是绕过检查出错误的组件
异常处理错误，可以把异常代码跟正常代码分开，沿调用栈向上传递错误，
可以按错误类型和错误区别分组。
类型必须是Throwable类型，在lang中定义。
分 <strong>运行时刻异常(RuntimeException)</strong> 和 <strong>非运行时刻异常(Non-runtime)</strong>

### 运行时刻异常
Java虚拟机异常，包括算术异常(被0除)，指针异常(通过null引用访问对象)，下标异常。
捕获代价很大，不要求捕获抛出。
<br>

### 非运行时刻异常
合法操作所调用方法必须知道的有用信息，如磁盘满了，没有访问权限，
必须抛出或捕获。

### 异常处理
try--catch--finally
新：try-with-resources

### 抛出异常
throws：方法声明；
throw：方法体；

## 并发

### 线程
线程是程序中单个顺序控制流，又称为<strong>执行上下文(execution context)</strong>或者<strong>轻量级进程(lightweight process)</strong>
Java在编程语言级就具有支持多线程的能力.创建方法：
1）派生Thread类的子类，其实现了Runnable接口。
```java
class className extends Thread {
        public void run(){
                ···        
        }
}
```
2）创建实现Runnable接口的类，接口中定义了run()方法。 
```java
class className implements Runnable {
        public void run() {
                ···
        }
}
```
#### 线程状态
<strong>1.新线程态：</strong>new了一个线程但未调用start()方法。
<strong>2.可运行态：</strong>调用start()方法后
<strong>3.不可运行态：</strong>suspend()方法，sleep()方法，wait()方法等或者被I/O阻塞
<strong>4.死亡状态：</strong>run()方法正常退出，stop()方法抛出对象给线程接收。
~注：suspend，resume，stop不是线程安全的，所以不建议使用。
<hr>



<hr>


# 第六章 输入输出流
<hr>

# 第七章 收集与数据结构应用
![](/img/shouji.jpg)
1）核心的收集接口：Collection,Set,List,Queue,Map等。
2）所有接口都是泛型

## Collection 接口
只有接口，没有实现。
可以用for-each遍历收集
也可以用Iterator接口遍历；
<hr>

## Set
三种实现：
HashSet：哈希表，性能最好，但不保证顺序(只能存放不重复的元素)
TreeSet：红-黑数，按元素值排序
LinkedHashSet：链表实现哈希表，介于前两者之间。
```java
Set<String> s = new HashSet<String>();
```
<hr>

## List
有序的Collection，按插入排序，可包含重复元素
List实现：
ArrayList 和 LinkedList
```java
List<Type> list = new ArrayList<Type>();//创建对象
list.add(Type element);//输入元素
list.get(int i);//按位置访问
list.indexOf();//从左到右找元素，返回位置，没有则返回-1；
list.lastIndexOf();//从右到左
```
列举操作：
```java
ListIterator<E> it = list.listIterator();

```

<hr>

## Queue
有个字接口Deque包含双端队列方法比Queue多
```java
Queue<Type> queue = new LinkedList<Type>();
Deque<Type> dq = new ArrayDeque<Type>();
```

<hr>

### Map
把键(key)映射到值(value)的对象。类似函数映射
实现类似Set三种
<hr>


<hr>
未完成