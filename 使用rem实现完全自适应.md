# 几个概念
### 什么是响应式？
让我们开发的网页，在不同分辨率屏幕上，有不同的展现效果或布局

### 什么是自适应？
让我们开发的网页，在不同分辨率屏幕上，都有着和设计稿**完全一致**的展现效果

### 什么是rem？
> rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到rem大家一定会想起em单位，em（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素，一个是依赖父元素计算

### 关于尺寸单位
- 设备像素：设备屏幕的物理像素，单位是px，比如iPhone6的750x1334px
- CSS像素：CSS样式代码中使用的逻辑像素
- devicePixelRatio：指window.devicePixelRatio，设备像素比。当前设备的 *物理像素/逻辑像素* 所得的比例。如iphone6物理像素750，逻辑像素375，所以iphone6的devicePixelRatio为2


# 一些做法
### 普通青年的做法
##### 媒体查询（media query）
用媒体查询，区分有限的几种屏幕分辨率，直接一套代码通吃大屏，中屏，小屏；工作量大，可维护性低；适合中小企业的中小型项目；

### 文艺青年的做法
##### viewport缩放
###### 堪比rem的一种做法
> 以320宽度为基准，进行缩放，最大缩放为320*1.3=416，缩放到416都就可以兼容iphone6 plus的屏幕了。不过有时候缩放会导致有些页面元素模糊的情况。

### 二逼青年的做法
##### 固定宽度
把页面设置成320的宽度，超出部分留白；这样做，开发和设计皆大欢喜，但是，在大屏幕手机下两边是留白的，而且看起来页面会特别小，操作的按钮也很小，体验不佳
##### 百分比
宽度用百分比，高度固定px；一般只会在有限的几种分辨率下体验还好，一旦分辨率过高，页面元素被拉的很宽，但是高度却不变，显示出的效果，和设计稿差别明显；

### 牛逼青年的做法
## rem!

# 身为牛逼青年，我们要怎么做？
### 搞懂rem实现自适应的原理
- 由于rem的值，是根据根元素（html元素）的`font-size`来计算的
- 所以，如果我们以640分辨率的情况为基准，给html元素，设定一个基准`font-size`，如`100px`
- 然后，通过一种方式，根据屏幕尺寸的不同，具体的计算出该屏幕尺寸下**合适的**根元素`font-size`，再设置给根元素
- 如，分辨率为750时，750/640*100，即为750分辨率下html元素的`font-size`值。
- 此时，我们页面中，使用rem设置尺寸的元素，自然也会跟着变化自身的大小。

###### （note: 使用js实时的设置`html`元素的`font-size`值，页面中使用rem的地方，其尺寸会实时发生变化。）

举个栗子：640分辨率的设计稿上给了一个高度为100px的div

HTML:
```html
<html>
    <body>
        <div class="test"></div>
    </body>
</html>
```
普通CSS:
```css
.test{
    /* 假定当前手机的devicePixelRatio为2 */
    height: 50px;
}

```
牛比CSS:
```css
html{
    font-size: 100px;
}
.test{
    /*实际显示的宽度为：100 * 0.5 = 50px*/
    height: .5rem;
}

```
当然，这只是640分辨率下，也就是iphone5手机上的样式，如果放到iphone6上，分辨率更大，屏幕更宽，实际上我们的`.test`元素，需要自行放大一点，但是如果根元素还是100px，那么`.test`元素，还是50px，就没有做到自适应的效果，怎么办？

答：JS搞定。


对于其他分辨率的手机：
```javascript
/*
根据上面的结论，在iphone6上，根元素font-size为：750/640*100
iphone5: 640
iphone6: 750
iphone6s: 1240
*/
//获取屏幕的物理宽度
var deviceWidth = window.documentElement.clientWidth;
//设置根元素的font-size
document.documentElement.style.fontSize = (deviceWidth / 640 * 100) + 'px';
```

至此，rem实现自适应的基本原理，已经解释完毕，但是，是不是还有些问题呢？

1. 如果用户开启了屏幕翻转，页面在加载完之后，分辨率发生了改变，怎么办？
2. 由于设计稿给的分辨率，通常是开发时用到的2倍，所以每次写尺寸，都要除以2，有啥办法解决？
3. 由于目前市面上大部分手机的设备像素比不为1，所以，通常我们在CSS中设置1px的边框，在手机中显示出来，是2个物理像素，看起来就会有点粗，怎么办？

# 答：

#### 分辨率变化
```javascript
window.onresize = function(){
    //获取屏幕的物理宽度
    var deviceWidth = window.documentElement.clientWidth;
    //设置根元素的font-size
    document.documentElement.style.fontSize = (deviceWidth / 640 * 100) + 'px';
};
```

#### 除以2问题，1px问题
```javascript
var scale = 1 / devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```
