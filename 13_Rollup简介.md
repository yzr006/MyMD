# 什么是Rollup.js？
Rollup 是一个 JavaScript 模块打包器，类似于 Webpack，可以将小块代码打包在一起。Rollup 使用 ES6 的标准模块格式处理 JS 模块，如`import`、`export`等，而不是 CommonJS 或 AMD。这并不是说 Rollup 无法支持 ES6 之外的模块格式，后边我们会介绍其支持方式。Rollup 借助 ES6 的模块标准，天然支持 Tree-shaking，让打包后的代码，更精简。

## 关于 Tree-shaking
所谓“Tree-shaking”，即是指移除 JS 代码上下文中未引用的代码(dead-code)。其实这个名字已经很形象了，Tree: 树，shaking：摇晃，合在一起，“摇晃树”，为何摇晃树呢，主要的目的之一，就是把没有长在树枝上的叶子，或其他没用的东西，总之，就是跟主干没有关系的东西，摇下来。

我们在用 webpack 的时候，应该也听过这个概念，从 webpack2 开始，这个概念被引入，然而这个概念实际上是兴起于 Rollup 的。

# 优缺点
## 优势
- ES6 模块
- Tree-shaking
- 配置轻量

## 劣势
- 官方不支持代码分割
- 官方不支持按需加载
- 官方不支持图片、字体等资源

# 开始使用

## 安装
```shell
$ npm i rollup -D
```
## 使用
可以通过命令行直接使用，不过比较麻烦，要写一堆参数，相信在实际场景中，大多数人不会这么用，所以我们直接来说配置文件的使用方式。

首先，把需要打包的入口文件，放在项目根目录（其他目录也行，这里是举例），起名为 `index.js` ，项目根目录建一个 `rollup.config.js`，内容如下：
```js
export default {
    // 入口文件的配置
    input: './index.js',
    output: {
        // 打包后的文件配置
        file: './dist/index.js',
        // 打包的格式
        format: 'cjs',
    },
}
```
### 关于打包格式
对于浏览器：
```js
// 打包输出为一个 iife，可以直接在浏览器的<script>标签中使用
format: 'iife',
```
对于 Node.js：
```js
// 打包输出为一个 CommonJS 模块
format: 'cjs',
```
对于浏览器和 Node.js：
```js
// 打包输出为一个 UMD 模块，使用这种方式时，必须指定一个 name
format: 'umd',
name: '必须指定一个名字',
```

然后，修改 `package.json` 文件，增加命令：
```json
"scripts": {
    "build": "rollup --config rollup.config.js"
},
```

最后，执行命令：
```shell
$ npm run build
```

命令执行完，就可以在 dist 目录看到打包后的文件了。

OK，以上就是最基本的 Rollup 的使用方式，是不是看起来特别简单呢。

当然，实际使用中，除了最基本的功能外，我们肯定还需要一些额外的东西，比如 babel、CommonJS模块解析、Sourcemap、本地开发服务、热更新，等等。

以上这些，实际上都有相关的插件，可以搭配 Rollup 一起使用，在此不做详细介绍，有需要的同学，可以很容易在网上搜索到相关资料。

# 适用场景
Rollup号称是下一代打包工具，其基于 ES6 模块系统，天然支持 Tree-shaking，配置上相对webpack更轻量。对于一些纯 JS 工具或类库的开发，非常适合使用 Rollup。但是对于业务场景丰富的应用，如需要各种 loader 来处理图片、css、字体等，或者需要按需加载，代码分割等，那么还是 Webpack 更适合。

总结来说：针对 App 级别的应该使用 Webpack，针对 JS 库级别的应用应该使用 Rollup。