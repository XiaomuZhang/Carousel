#Carousel
##[展示地址](https://xiaomuzhang.github.io/Carousel/)     
该项目为一个公司主页网站，其中主要技术点为要实现在不同屏幕尺寸下的轮播图效果。可兼容Chrome\Firefox\IE9及以上。        
技术点：        
###1.清除浮动       
在CSS中定义一个清除浮动的伪对象，在需要清除浮动的标签中添加clearfix类名，解决高度塌陷问题    
```
.clearfix::after,
.clearfix::before{
    content:"";
    display:table;
}
.clearfix::after{
    clear:both;
}
```
###2.字体大小       
rem是相对于根元素<html>，，不会受到父级的影响，一般浏览器默认字体大小16px，在html选择器中设置font-size:62.5%(10/16 * 100% = 62.5%)，则浏览器字体大小改为10px，1rem=10px。       
(由于chrome浏览器字体最小为12px，可以在html选择器统一设置font-size：20px)     
###3.div.box的宽度值        
为了解决撑破容器的问题，可使用CSS3新属性calc()去计算div.box的宽度,比如:`width:calc(30% - (padding值 + marging值 + border值))`。通过calc()计算后，div.box不在会超出其父亲容器的宽度。       
###4.轮播图(详见main.js)    
大体思路:使用'imgWidth = $(window).width()'获取屏幕宽度，在carousel容器中定义一个.list容器（绝对定位），图片在其中
浮动排列，三张图片的排列为 3 1 2 3 1。        
**a** .点击切换按钮，调用animate()函数，函数内传入当前图片宽度的数值，向右滑动传入正值，向左传入负值；      
**b** .在animate()中，根据传入的计算偏移量，加在.list标签的left属性中，从而实现图片的切换；       
**c** .定义一个全局变量index,用以高亮显示轮播图的指示按钮，jQuery代码`$dot.removeClass('on').eq(index-1).addClass('on')`,包装在函数中，每次切换需调用该函数;       
**d** .动态获取屏幕尺寸，`imgWidth = $(window).width()`，用以设置图片及可视窗口宽度:  
```     
//设置图片宽度
$('.list').find('img').css('width', imgWidth);
//设置轮播图片容器的初始偏移量
$('.picture').find('.list').css('left', -imgWidth);

        /*根据屏宽，动态选择图片的尺寸，实现响应式效果*/
        switch (true) {
            case imgWidth >= 996: size = 'l';
                break;
            case imgWidth < 996 && imgWidth >= 768: size = 'm';
                break; 
            case imgWidth < 768: size = 's';
            default:
                break;
        }

        $('.list').find('img').each(function(index, item) {

            var src = $(item).data('src');
            $(item).attr('src', src + size + '.png');
        });   
```

