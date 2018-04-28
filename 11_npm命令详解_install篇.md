## 公司新开了个项目，git仓库建好了，也拉到本地了，现在想安装一些npm依赖！
```bash
# 先初始化一下npm环境
$ npm init
```

## 我想先安装一个`Vue`！
```bash
# 安装
$ npm install vue

# 或者，简单点
$ npm i vue
```

### 注：
`i`是`install`的简写形式，还可以使用`$ npm add`来安装，最终都是执行`$ npm install`。

## 有些依赖是代码执行时需要的，有些是编译构建时需要的，有些是可选的，不一定安装，怎么区分他们呢？
```bash
# 代码执行时需要的，这样安装。依赖关系，会写入 package.json 文件的 ”dependencies“ 字段。
$ npm i vue
# 或者
$ npm i vue --save-prod
# 或者
$ npm i vue -P

# 编译构建时需要的，这样安装。依赖关系，会写入 package.json 文件的 ”devDependencies“ 字段。
$ npm i vue-loader -D
# 或者
$ npm i vue-loader --save-dev

# 可选的，即不必须的依赖。依赖关系，会写入 package.json 文件的 ”optionalDependencies“ 字段。
$ npm i less -O
# 或者
$ npm i less --save-optional
```

### 注：
**一、有个关于`--save`的点，不是太清晰。**

截至目前（20180428），官方的NPM[使用指南](https://docs.npmjs.com/getting-started/using-a-package.json)里介绍说，`--save`或`-S`会写入`dependencies`，`--save-dev`会写入`devDependencies`，但是在官方的CLI[使用说明](https://docs.npmjs.com/cli/install)里，又完全没有提到`--save`这个参数，而是说要加`--save-prod`或`-P`，或者干脆不加任何参数，默认就会直接保存到`dependencies`。

实际尝试发现，其实2种做法都没问题。加`--save`、`-S`、`--save-prod`、`-P`，或者啥都不加，都会写入`dependencies`。猜测应该是个历史问题，保险起见可以加上，或者自行尝试一下，不需要加就不加。

**二、关于可选依赖**

顾名思义，可选的依赖，指的是，即使在`npm install`时，该依赖安装失败，`install`命令依然可以继续，不需要抛错误给终端。

相关文档中，该类型针对的场景是，对于针对特定平台才能安装成功的库，或者即使这些库安装失败，你也已经有备用的库来替代（这里考虑的可以是不同库的兼容性程度或性能优劣），可以声明依赖到`optionalDependencies`中。

## 还有些依赖是开发工具，我想一次安装，到处使用！
```bash
# 全局安装。本机任何地方都可以使用。
$ npm i webpack -g
# 或者
$ npm i webpack --global
```

## 我刚`clone`了一个别人的项目，怎么安装依赖呢？
```bash
# 安装所有 package.json 文件中描述的依赖
$ npm install
```

## 我不想安装那些没用的开发依赖！
```bash
$ npm install --production
```

## 我不想安装那些可选的依赖！
```bash
$ npm install --no-optional
```

## 这个依赖我只是本地安装，随便玩下，不要记录下来！
```bash
$ npm install vue-loader --no-save
```

## 明明项目的`package.json`里记录的某个依赖版本是`^1.0.0`，为啥我执行`$ npm install`之后，装的却是`1.0.5`？我只想安装`1.0.0`啊！
```bash
$ npm i vue -S --save-exact
# 或者
$ npm i vue -S -E
```
### 注：
一般情况下安装依赖，在`package.json`里描述的时候，版本号前边，会自动加一个`^`号，如：`^1.0.0`，后续再次初始化安装的时候，会自动安装依赖的最新版本，如果想让后续的初始化安装，都保持最开始的依赖版本，第一次安装依赖时，多加一个参数：`-E`，相应的版本号记录，会变为：`1.0.0`。

更多关于版本范围的说明，可参考[官方文档](https://docs.npmjs.com/files/package.json#dependencies)

## 我想安装当前的最新版本啊！
```bash
$ npm i vue@latest
```