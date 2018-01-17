# 强类型，弱类型，动态类型，静态类型

## 简单的说
> 编译时就知道变量类型的，是静态类型；运行时才知道变量类型的，是动态类型。

> 不允许隐式类型转换的，是强类型；允许隐式类型转换的，是弱类型。

## 复杂的说

先说一些基本概念：
### Program Errors（程序错误）
- trapped errors（可处理的错误）：程序已有相应的错误处理机制，来捕获并处理这种错误，同时终止程序运行。如除0，Java中数组越界访问；
- untrapped errors（无法处理的错误）：程序没有对应的错误处理机制，出错后，不确定程序是否能继续运行。如C语言里的缓冲区溢出，Jmp到错误地址；
### Forbidden Behaviors（禁止行为）
一门程序语言，在设计的时候，会定义一组forbidden behaviors（不允许的行为），其中要包括所有的untrapped errors（无法处理的错误），可能包括trapped errors（可处理的错误）。
### Well behaved, ill behaved
- Well behaved（表现不错）: 如果程序的执行不可能出现forbidden behaviors，则称为well behaved（表现不错）
- ill behaved（表现不好）: 只要有可能出现 forbidden behaviors，则称为ill behaved（表现不好）

根据这些概念，定义如下：
- 强类型：如果一种语言编写的程序都是well behaved，即不可能出现forbidden behaviors，则该语言为强类型；
- 弱类型：否则为弱类型。
- 静态类型：如果程序在编译时拒绝ill behaved程序，则是静态类型；
- 动态类型：如果程序在运行时拒绝ill behaviors, 则是动态类型；

# 那么，TypeScript是什么？
