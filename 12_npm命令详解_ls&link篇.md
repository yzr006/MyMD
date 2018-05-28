## 我想查看当前项目安装了哪些依赖
```bash
# 直接查看
$ npm ls
```

## 这输出的格式不喜欢，能给我输出json格式么？
```bash
# 可以
$ npm ls --json
```

## 我想看看每个包的版本、简介、git地址
```bash
# 也行
$ npm ls --long
```

## 我想看看每个包的安装路径
```bash
# 好的
$ npm ls --parseable
```

## 我想看看全局安装的包有哪些
```bash
# 看
$ npm ls --global
```

## 为何每次都输出一大堆，我只想看直接依赖，能过滤掉那些二级或更深层级的依赖不？
```bash
# 能！
$ npm ls --depth=0

# 顺便也看看二级依赖吧
$ npm ls --depth=1

# 更深层依赖，数字累加即可
```

## 我只想看生产环境所需的依赖
```bash
# 行
$ npm ls --prod
```

## 我只想看看开发环境所需的依赖
```bash
# 好
$ npm ls --dev
```

## 我想看看哪些是`linked`依赖
```bash
$ npm ls --link
```

## 不过话说，啥是`linked`依赖？
举个栗子：

假如我们自己开发了一个 npm 模块，比如就叫：`my-package`。然后自己本地的很多项目，都用到了这个模块，我想让这个模块的修改，及时同步到用到它的本地项目中，怎么办呢？

首先我们会想到，发布到npm服务器，但是这只解决了新代码的发布问题，却没解决各个项目中的及时更新问题。我们发布了新代码，还要手动到各个项目中，安装新的模块。

这时，我们就需要用到一个新的npm命令：`npm link`。

那么用这个命令，怎么解决我们的问题呢？

首先，我们进入`my-package`模块的根目录，执行命令：
```bash
$ npm link
```
然后，进入需要使用`my-package`的项目文件夹，执行命令：
## 
```bash
$ npm link my-package

# 如果是一个scope包，记得加上前缀，比如如果是 admin 下的
$ npm link @admin/my-package

# 如果对版本有要求，记得加上版本
$ npm link @admin/my-package@1.0.1
```
OK，这样处理完，你的项目中，就可以直接引用`my-package`这个包了，比如：
## 
```js
import test from 'my-package'

console.log(test)
```
不过，此时如果你在这个项目中执行`npm ls`，可能会看到输出结果有错误提示：`npm ERR! extraneous`。

不用担心，这是因为，前边我们把`my-package`这个包，进行了`link`处理之后，npm 系统自动给这个包，创建了一个全局的“快捷方式”，其他项目 link 时，相当于引用了一个全局的包，所以该依赖关系，不会出现在项目的`package.json`文件的`dependencies`（或`devDependencies`）字段中，这时就报错了，意思是这个包是一个没有用到的（`package.json`没有用到）包。实际上不用理会，其实并不影响我们使用。


这时，我们在项目中再执行：
## 
```bash
$ npm ls --link
```
系统就会列出`my-package`这个包了，因为这是一个`linked`包，可以理解为“快捷方式”包。

当然，`link`这个操作，一般适用于 npm 包的开发调试阶段，调试完发布了之后，记得在项目中，解除 linked 状态（其实不手动解除 link ，直接从服务器安装已发布的包，也会自动解除 link 的）：
```bash
$ npm unlink my-package
```
然后正常安装`my-package`，上边的报错，也就没有啦。

以上。
