//按键盘上的一个键返回顶部
document.onkeydown = function(e){
    if(e.keyCode == 113){
        var timer;
        clearInterval(timer);
        timer=setInterval(function(){
            var now=document.body.scrollTop;
            var speed=(0-now)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(document.body.scrollTop==0){
                clearInterval(timer);
            }
            document.body.scrollTop=document.body.scrollTop+speed;
        }, 30);
    }
}
//按按钮返回顶部
function ClickBacKToTopButton(evt){
    var timer;
    clearInterval(timer);
    timer = setInterval(function(){
        var now = document.body.scrollTop;
        var speed = (0 - now) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(document.body.scrollTop == 0){
            clearInterval(timer);
        }
        document.body.scrollTop = document.body.scrollTop + speed;
    }, 30);
}
//页面重新载入添加事件处理，每次载入页面判断按钮应该在哪里
window.onload = function(){
    var myButton = GetBackToTopButton();
    var position = "RightDown";
    var x,y;
    if(position != 0){
        myButton.init(false,position);
    }
    else{
        myButton.init(true,x,y);
    }
    myButton.addEventListener('click', ClickBacKToTopButton, false);
    myButton.style.left = myButton.x;
    myButton.style.top = myButton.y;
    
    if(document.body.scrollTop == 0){
        myButton.style.visibility = "hidden";
    }
    else{
        myButton.style.visibility = "visible";
    }
    window.onscroll = function(){
        if(position != 0){
            myButton.init(false,position);
        }
        else{
            myButton.init(true,x,y);
        }
        myButton.style.left = myButton.x;
        myButton.style.top = myButton.y;
        if(document.body.scrollTop == 0){
            myButton.style.visibility = "hidden";
        }
        else{
            myButton.style.visibility = "visible";
        }
    }
    document.getElementById("LU").onclick = function(){
        position = "LeftUp";
    }
    document.getElementById("RU").onclick = function(){
        position = "RightUp";
    }
    document.getElementById("LD").onclick = function(){
        position = "LeftDown";
    }
    document.getElementById("RD").onclick = function(){
        position = "RightDown";
    }
    document.getElementById("XY").onclick = function(){
        position = 0;
        x = eval(document.getElementById("x")).value;
        y = eval(document.getElementById("y")).value;
        myButton.init(true,x,y);
    }
}

//对返回顶部按钮进行操作
function GetBackToTopButton(){
    var button = document.getElementById("BackToTop");
    var screenW = document.body.clientWidth;
    var screenH = document.body.clientHeight;
    var scrolltop = document.body.scrollTop;
    button.init = function(flag, x, y){
        //如果flag为true则接受XY输入方式，如果flag为false则接受的是位置定位方式
        if(flag == true){
            if(x > screenW - this.offsetWidth){
                this.x = screenW - this.offsetWidth;
            }
            else{
                this.x = parseInt(x);
            }
            if(y > screenH-this.offsetHeight){
                this.y = screenH - this.offsetHeight + document.body.scrollTop;
            }
            else{
                this.y = parseInt(y) + document.body.scrollTop;
            }
        }
        else{
            if(x == "LeftUp"){
                this.x = 0;
                this.y = document.body.scrollTop;
            }
            if(x == "LeftDown"){
                this.x = 0;
                this.y = screenH - this.offsetHeight + document.body.scrollTop;
            }
            if(x == "RightUp"){
                this.x = screenW - this.offsetWidth;
                this.y = document.body.scrollTop;
            }
            if(x == "RightDown"){
                this.x = screenW - this.offsetWidth;
                this.y = screenH - this.offsetHeight + document.body.scrollTop;
            }
        }
    }
    return button;
}

