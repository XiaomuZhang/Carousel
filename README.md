#Carousel
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
(也可以在html选择器设置font-size：20px)     
###3.div.box的宽度值        
为了解决撑破容器的问题，可使用CSS3新属性calc()去计算div.box的宽度,比如:`width:calc(30% - (padding值 + marging值 + border值))`。通过calc()计算后，div.box不在会超出其父亲容器的宽度。       
###4.轮播图(详见main.js)    
大体思路:使用'imgWidth = $(window).width()'获取屏幕宽度，在carousel容器中定义一个picture容器，图片在其中
浮动排列，三张图片的顺序为 3 1 2 3 1。点击切换按钮，调用animate()函数，函数内传入当前图片宽度的数值，向右切换为负值，向左为正，
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
关于图片切换：   
```
//点击箭头，图片向右滑动
    $next.on('click', function (){
        //如果切换动画未执行完成，则不触发该次事件
        if ($list.is(':animated')) {
            return;
        }
        if (index == 3) {
            index =1;
        }else{
            index += 1;
        }
        animate(-imgWidth);
        showButton();
    });

