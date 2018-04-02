/**
 * Created by zh on 2016/10/9.
 */
$(function(){
    //头部动画
function animation_move1(){
    $(".animation_move1").animate({"right":"0px","top":"0px"},2000)
}
    animation_move1()
//轮播
    function lunbo(){
        var index=1
        setInterval(function lunob1(){
            $("#lunbo").animate({"left": -250 * index}, 500);
            index++;
            if(index==9){
                index=1;
            }
        },1000)



    }
    lunbo();
})