/*轮播图代码*/
$(function(){

    var number = 3;
    var $list = $('.list');
    var index = 1;
    var interval = 2000;
    var timer, size, imgWidth ;

    function resize() {
        
        //获取屏幕宽度
        imgWidth = $(window).width();

        $('.list').find('img').css('width', imgWidth);

        //设置轮播图片的初始偏移量
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

    }
    

    //图片滑动函数
    function animate(offset){
        var left = parseInt($list.css('left')) + offset;
        $list.animate({'left':left}, 300, function() {
            if (left > -imgWidth) {
                $list.css('left', -imgWidth * number);
            }
            if (left < -imgWidth * number) {
                $list.css('left', -imgWidth);
            }
        });
    }

    //点击箭头，图片向后/向前滑动
    var $next = $('.next');
    var $prev = $('.prev');
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
    //点击箭头，图片向左滑动
    $prev.on('click', function() {
        if ($list.is(':animated')) {
            return;
        }
        if (index == 1) {
            index = 3;
        }else{
            index -= 1;
        }
        animate(imgWidth);
        showButton();
    });

    //按钮切换
    var $dot = $('.buttons').find('span');
    $.each($dot, function(idx,item ) {
        $(item).on('click',index, function(){
            var newIndex = parseInt($(this).attr('class'));
            if ($list.is(':animated') || newIndex == index ) {
                return;
            }
            var offset =  -imgWidth * (newIndex - index);
            index = newIndex;
            animate(offset);
            showButton();
        })
    });

    //按钮高亮显示
    function showButton() {
        $dot.removeClass('on').eq(index-1).addClass('on');
    }

    function play() {
         timer = setTimeout(function () {
            $next.trigger('click');
            play();
        },interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    $(window).on('resize', resize).trigger('resize');

    $('.picture').hover(stop, play);
    play();


});