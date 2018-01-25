# TypeScript是什么？

## 简介
> TypeScript 是由微软开发的，一种编程语言，本质上是向 JavaScript 增加静态类型系统。

> 它是 JavaScript 的超集，扩展了 JavaScript 的语法，添加了很多特性。

> 现有的 JavaScript 代码，可与 TypeScript 一起工作，而无需任何修改。 

> TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

> 它是为大型软件开发而设计的，它最终编译产生 JavaScript，所以可以运行在浏览器、NodeJS 等环境中。

# 强类型，弱类型，动态类型，静态类型

## 简单的说
> 编译时就知道变量类型的，是静态类型；运行时才知道变量类型的，是动态类型。

> 不允许隐式类型转换的，是强类型；允许隐式类型转换的，是弱类型。

## 复杂的说

先说一些基本概念：
### Program Errors（程序错误）
- trapped errors（可处理的错误）：程序已有相应的错误处理机制，来捕获并处理这种错误，同时终止程序运行。如除0，Java中数组越界访问，JS中访问一个不存在的对象的一个属性；
- untrapped errors（无法处理的错误）：程序没有对应的错误处理机制，出错后，不确定程序是否能继续运行。可能由语言设计的缺陷导致。如C语言里的缓冲区溢出；
### Forbidden Behaviors（禁止行为）
一门程序语言，在设计的时候，会定义一组forbidden behaviors（不允许的行为），其中要包括所有的untrapped errors（无法处理的错误），可能包括trapped errors（可处理的错误）。
### Well behaved, ill behaved
- Well behaved（表现不错）: 如果程序的执行不可能出现forbidden behaviors，则称为well behaved（表现不错）
- ill behaved（表现不好）: 只要有可能出现 forbidden behaviors，则称为ill behaved（表现不好）

### 根据这些概念，定义如下：
- 强类型：如果一种语言编写的程序都是well behaved，即不可能出现forbidden behaviors，则该语言为强类型；
- 弱类型：否则为弱类型。
- 静态类型：如果程序在编译时拒绝ill behaved程序，则是静态类型；
- 动态类型：如果程序在运行时拒绝ill behaviors, 则是动态类型；

> 注意：
综合上边简单和复杂的说法，强／弱类型的界定，其实是有争议的，而且其概念现在已经被大量误用。如果不是专门强调的话，一般只说明某个语言是静态／动态类型就足够了，慎用强／弱类型的概念。

# 一些特性
- ## 类 Classes
作为面向女朋友，不不，面向对象编程最基本的东西，TS自然是有类（Class）的概念的：

```typescript
// test2.ts
class student {
    name: string
    gender: string
    age: number

    constructor(name: string, gender: string) {
        this.name = name
        this.gender = gender
    }

    setAge(age: number) {
        this.age = age
    }
    
    showInfo() {
        console.log(this.name, this.gender, this.age)
    }
}

const stu1 = new student('咯咯哒', 'female')
stu1.setAge(88)
stu1.showInfo()
```

上面是一个最简单的类的示例，至于什么public, private, protected, static, readonly, set, get, 继承，抽象类，等等概念，这里考虑到大家的生命安全，就不展开了。

有兴趣的同学，请先深入学习一下面向女朋友，不不，面向对象编程的一些基本概念。或者直接学一门面向对象的语言。对于我们前端来说，Java是个不错的选择。

- ## 接口 Interfaces
约定一种数据类型，规范代码逻辑中的数据格式。可以用来约束Object中字段的类型。

```typescript
interface Config{
    name: string
    width: number
    color?: string // (?参数可有可无)
}

function func(config: Config){
    // some code
}
```

- ## 模块 Modules
和ES6的模块概念基本相同，使用方法也相同。

- ## 类型注解 Type annotations
TS里的基本数据类型，包括：boolean、number 、string 、 array 、 enum（枚举类型） 、any（任意类型） 、void（空类型）。
- ## 编译时类型检查 Compile time type checking 
看如下代码：
```typescript
function showName(name: string) {
    console.log(name)
}

showName(123)
```
编译一下：
```shell
> tsc test3.ts

test3.ts(5,10): error TS2345: Argument of type '123' is not assignable to parameter of type 'string'.
```

- ## Arrow 函数
同ES6的箭头函数


# TypeScript的优势

## 自动监测程序错误
TS有更高的可预测性，易于纠错

看下边这个例子
```javascript
// test1.js
// 通过分数获取图标
function getRankIcon(score: number) {
  if (score >= 100) {
    return 'a.png,b.png';
  } else if (score >= 500) {
    return 'c.png,d.png';
  } else if (score >= 1500) {
    return 'e.png,f.png';
  }
}
const icon = getRankIcon(5);
const iconArray = icon.split(',');
```
运行一下：
```shell
> node test1.js

TypeError: Cannot read property 'split' of undefined
```
JS报错，程序也挂了。

同样的代码，放到TypeScript里，编译一下：
```shell
> tsc --strict test1.ts

test1.ts(12,19): error TS2532: Object is possibly 'undefined'.
```
> `--strict`: 启用严格类型检查选项

直接通不过编译。

类似这种JS代码里的疏漏，相信很多人开发时，并不能完全避免。而且，这种疏漏，不会影响代码打包压缩，一不留神，就发布上线了，常常到了线上，收到大量报错信息，才知道出了问题。那么此时，TS的静态类型系统的优势，就体现出来了。

## 大型项目开发更稳健
像一些传统的知名后端语言一样，对面向对象的强大支持，使得构建大型复杂应用更加容易。

举个例子：

有一个前端项目，几十万行JS代码，对接的后端接口无数，接口下发的数据更是五花八门。

突然有一天，后端的一个涉及面贼广的接口，要改个字段。怎么办呢？

一般的做法，全局搜索，一个个核对，一个个改，改完了，一个个测，有时候逻辑复杂点，可能还有遗漏，一套流程下来，少说小几个小时，多则半天一天，最后还不包你稳，上线了翻车也是常有的事。

如果用TS的话，把后端数据对应的`interface`改掉，编译一下，所有有问题的地方，全给你列出来，全改掉，基本就妥了。

这里，静态类型系统的优势，再次显现了。

## IDE上的一点小优势
配合微软自家的 VS Code，各种提示，各种自动，各种省心，你懂的。（我还没怎么体验到。。先吹一波再说。。）

# 关于动态类型&静态类型的选择
有句广为流传的话，是这么说的：
> “动态类型一时爽，代码重构火葬场”

表达的意思很明显，但是为什么这么说？

很多人说，是因为缺少测试环节。这么说是没错的，但是问题的本质并不在这。

这里引用一段别人说的话：
> 无论是类型还是测试，都是一种约束。
> 
> 就像法律是对人的约束一样，类型和测试会约束代码的行为。约束的好处是能够规范代码的行为，坏处是失去了一部分自由，并且构建约束本身，也要消耗很大精力。
> 
> 你写了个类Square，就是约束了它的实例必须是长宽相等的正方形。好处是这些实例不会出现长宽不等的异常，坏处是说不定你之后还想用长方形，于是就必须改这个类或者重新写个类，并且修改相关代码。
> 
> 你写了个单元测试保证函数的输出是正方形。其实无非就是把「对正方形的约束」从类型定义变成了代码逻辑，本质上是一样的。写比较大的工程时，肯定要有前期的设计，由此给出对代码行为的约束。这时用动态类型也好静态类型也好，都是要用类型和测试给出这些约束，由此保证程序的正确性。
> 
> 所谓重构，也就是在保证约束成立的情况下，优化代码的结构。
> 
> 很多时候我们用动态类型语言，并不是因为有多需要它的动态特性（实际上绝大多数变量的类型在运行时就没变过），只是因为懒得花时间处理约束问题而已。——俺知道s肯定是个字符串，但俺就是懒得写 string s = "fuck" 前面那七个字符。

从上面这段话，可以看出，动态类型相比静态类型，少了很多约束，多了几分自由。这就让这两种类型的语言，有了不大相同的适用场合。

动态类型，简洁灵活，对于我们前端来说，处理一些交互逻辑，或简单的业务逻辑，绰绰有余，同时带来了更高的开发效率。

而静态类型，对于逻辑复杂的大型项目来说，则可以有效降低系统复杂度，提前发现，并减少低级错误，提高代码稳健性，利于代码维护和扩展。

所以很难绝对的说，两者孰优孰劣。

如果站在我们个人成长的角度，多了解一门语言，多掌握一门技能，自然是再好不过的事。

而在项目开发的角度，我们在做选择之前，更多要做的，其实是分析需求，准确判断项目场景，并选择最合适的工具，来帮助我们更快更好的完成任务。