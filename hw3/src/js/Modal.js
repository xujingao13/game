//决定模态对话框是否显示
function overlay(){
    var e1 = document.getElementById('modal-overlay');
    if(e1.style.visibility == "visible")
    	e1.style.visibility = "hidden";
    else
    	e1.style.visibility = "visible";
}
//初始化对话框的内容
function changeText(){
	var words = eval(document.getElementById('change')).value;
	document.getElementById('content').innerHTML = words;
}
var isMousedown = 0;
var ClickLeft = 0;
var ClickTop = 0;
var canMove = false;
var quitKeyCode = 0;
//初始化鼠标点击事件
function moveInit(divID, evt){
	if(canMove === false)
		return;
	isMousedown = 1;

	if(getBrowserType() === "NSupport")
		return;
	var obj = document.getElementById(divID);
	if(getBrowserType() === "fox"){
		ClickLeft = evt.pageX - parseInt(obj.style.left);
		ClickTop = evt.pageY - parseInt(obj.style.top);
	}
	else{
		ClickLeft = evt.x - parseInt(obj.style.left);
		ClickTop = evt.y - parseInt(obj.style.top);
	}
}
//鼠标移动事件
function Move(divID,evt){
	if(canMove === false)
		return;
	if(isMousedown === 0)
		return;
	var objDiv = document.getElementById(divID);
	if(getBrowserType() == "fox"){
    	objDiv.style.left = evt.pageX - ClickLeft;
    	objDiv.style.top = evt.pageY - ClickTop;
    }
    else{
    	objDiv.style.left = evt.x - ClickLeft;
    	objDiv.style.top = evt.y - ClickTop;
    }
}
//鼠标停止移动事件
function stopMove(){
	isMousedown = 0;
}
//得到浏览器版本
function getBrowserType(){
	var browser = navigator.appName;
	var b_version = navigator.appVersion;
	var version = parseFloat(b_version);

	if(browser === "Netscape"){
		return "fox";
	}
	else if(browser == "Microsoft Internet Explorer"){
		if(version >= 4)
			return "ie4+";
		else return "ie4-";
	}
	else return "NSupport";
}
function divCanMove(){
	canMove = true;
	document.getElementById("YES").disabled = true;
	document.getElementById("NO").disabled = false;
}
function divCannotMove(){
	canMove = false;
	document.getElementById("YES").disabled = false;
	document.getElementById("NO").disabled = true;
}
document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && (e.keyCode == 27 || e.keyCode == quitKeyCode)){ // 按 Esc 
		document.getElementById('modal-overlay').style.visibility = "hidden";
	}
}
function setQuitKey(){
	quitKeyCode = parseInt(eval(document.getElementById("code")).value);
}