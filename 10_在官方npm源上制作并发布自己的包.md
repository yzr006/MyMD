# 前言
作为一个前端程序猿，随着代码量的提升，慢慢会觉得很多重复性的工作，可以进行抽象，单独封装出一个轮子，方便以后复用，同时，为了便于维护，和提供给其他需要的同学使用，我们可能需要一个地方来公开的存放代码，而且能方便的进行后续更新维护、发布等工作，此时，作为一个合格的前端，应该很自然的想到npm。

# 准备工作
首先，npm是什么，就不过多介绍了，不了解的，可以先面壁思过一下。

直接进入正题，要在官方npm发布一个包，首先要准备：

## 1. 注册官方npm账号
[官网地址](www.npmjs.com)
## 2. 注册github或其他git服务账号

# 开始
## 1. 创建一个git仓库，克隆到本地，用来存储源码
> 要创建git仓库，请到相应的git服务站点（gitlab, github等等），自行创建
```shell
# 打开工作目录
$ cd ~/workspace

# 克隆git仓库
$ git clone git@github.com:username/my-npm-package.git my-npm-package

# 写入测试代码和readme文件，并保存（这一步可以通过其他代码编辑器来做，就是新建文件，写入点内容，保存即可）
$ vi index.js
$ vi readme.md
```

## 2. 初始化npm包
```shell
# 按提示步骤，初始化npm包文件夹
$ npm init
```
## 3. 本地登录npm账号
```shell
# 登录npm。按提示，输入在npm官网注册的用户名、密码，邮箱可自定义
$ npm adduser

# 如登录成功，则提示
> Logged in as username on https://registry.npmjs.org/.

# 确认登录账户。会输出登录的用户名
$ npm whoami
> username
```

## 4. 发布npm包
```shell
# 提交代码到git
$ git add -A
$ git commit -m '发布代码'
$ git push -u origin master

# 更新一下版本号
$ npm version patch

# 发布npm包
$ npm publish
```
> `npm version`的使用，可以直接输入`npm version -h`查看自带的帮助。或参考官方文档：[链接](https://docs.npmjs.com/cli/version)

> 提示：如果发布失败，提示E403，则可能你的包名，已经在npm服务器上存在，请改一个没人用到的包名。直接修改package.json里的name即可。

## 5. 后续维护、更新、发布等
```
# 代码修改后，先提交到git
$ git add -A
$ git commit -m '更新代码'
$ git push origin master

# 然后打一个新版本
$ npm version patch

# 然后发布即可
$ npm publish
```

# 其他
## 1. 如何安装使用自己的包？
发布成功之后，在项目中，像使用其他包一样，直接`npm install`即可

## 2. 关于`npm token`
本地登录npm账号之后，在npm官网会生成一个token，用来记录本次登录。

token可以控制登录账户的读写权限，还可以做一些其他事情，关于npm token的具体使用，请参考：[链接](https://docs.npmjs.com/cli/token)

## 3. 包名重复咋解决？
可以使用npm的包作用域功能，类似`@username/my-npm-package`。

具体可参考：

[官方参考](https://docs.npmjs.com/misc/scope)

[第三方博客](http://huang-x-h.github.io/2016/06/09/using-npm-scoped-package/)