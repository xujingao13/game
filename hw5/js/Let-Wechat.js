var messagesRef = new Firebase('https://let-wechat.firebaseio.com');
var namelistRef = messagesRef.child('namelist'); //所有在线名字的数据库
var names = []; //登录时在线的名字
var current_room = 0; //默认登录时在主界面
var current_name; //当前用户名
var current_text; //当前用户说的话
var current_nameRef; //当前在的聊天室对应的数据库
var FirstEnter = [false,true,true,true]; //记录是否去过某个聊天室
var temp = true; //如果在登录层 temp的值为true 否则为false
//刷新界面时候载入数据
$(window).load(function(){
	//载入界面淡入效果
	$('#mask').fadeIn(1000);
	$('#login').fadeIn(2000);
	//输入层定位
	$('#login').css("left",($(document).width() - $("#login").width()) /2 + "px");
	$('#login').css("top",($(document).height() - $("#login").height()) /2 + "px");

	//获取数据库当中所有在线的名字
	namelistRef.on('value',function (snapshot){
		var data = snapshot.val();
		for(var attr in data){
			names.push(data[attr].name);
		}
	})

	//给确认按钮添加点击事件
	$('#confirm').click(my_click);
	//给发送按钮添加点击事件
	$('#sendmessage').click(sendMessage);

	//点击主聊天室
	$('#mainroom').click(function(){
		if(current_room !== 0){
			current_room = 0;
			enter_room(0);
			$("#contain").css("background-image","url(images/1.jpg)");
		}
	})
	//点击聊天室1
	$('#room1').click(function(){
		if(current_room !== 1){
			current_room = 1;
			enter_room(1);
			$("#contain").css("background-image","url(images/2.jpg)");
		}
	})
	//点击聊天室2
	$('#room2').click(function(){
		if(current_room !== 2){
			current_room = 2;
			enter_room(2);
			$("#contain").css("background-image","url(images/3.jpg)");
		}
	})
	//点击聊天室3
	$('#room3').click(function(){
		if(current_room !== 3){
			current_room = 3;
			enter_room(3);
			$("#contain").css("background-image","url(images/4.jpg)");
		}
	})
})

//进入聊天室
function enter_room(room_num){
	//调用当前聊天室对应的数据库和在线用户数据库
	if(room_num === 0){
		messagesRef = new Firebase('https://let-wechat.firebaseio.com');
		namelistRef = messagesRef.child('namelist');
	}
	else if(room_num === 1){
		messagesRef = new Firebase('https://let-wechat.firebaseio.com/chatroom1');
		namelistRef = new Firebase('https://let-wechat.firebaseio.com/chatroom1/namelist1');
	}
	else if(room_num === 2){
		messagesRef = new Firebase('https://let-wechat.firebaseio.com/chatroom2');
		namelistRef = new Firebase('https://let-wechat.firebaseio.com/chatroom2/namelist2');
	}
	else if(room_num === 3){
		messagesRef = new Firebase('https://let-wechat.firebaseio.com/chatroom3');
		namelistRef = new Firebase('https://let-wechat.firebaseio.com/chatroom3/namelist3');
	}
	
	//如果是第一次来这个聊天室，就把用户名添加到当前聊天室的用户名数据库之中
	if(FirstEnter[room_num] === true){
		current_nameRef = namelistRef.push({name:current_name});
		FirstEnter[room_num] = false;
	}
	//添加离开绑定事件响应
	current_nameRef.onDisconnect().remove();
	showUserList();
	showMessageList();
}
//为确认按钮添加点击函数
function my_click(){
	if($('#nameInput').val() === ""){
		alert("暂不接受匿名登录，请输入用户名");
	}
	else{
		current_name = $('#nameInput').val();
		if($.inArray(current_name, names) === -1){
			$('.log_username').html("登录成功");
			temp = false;
			$('#nameInput').css("display","none");
			$('#confirm').remove();
			$('.log_username').animate({
				marginTop: '80px',
				marginLeft: '130px',
				fontSize: '35px'
			},1500,function(){
				$('#login').fadeOut(1000);
				$('#mask').fadeOut(2000);
			});
			current_nameRef = namelistRef.push({name:current_name});
			//绑定离开事件处理
			current_nameRef.onDisconnect().remove();
		}
		else{
			alert("用户已经存在，请重新输入");
		}
	}
}
//显示当前聊天室数据库中的聊天内容
function showMessageList(){
	$("#messages").children().remove();
	messagesRef.on('value',function (snapshot){
		var data = snapshot.val();
		for(var attr in data){
			var info = data[attr];
			if(!("name" in info))
				return;

			var username = info.name;
			var message = info.text;
			var messageElement = $("<li>");
			var nameElement = $("<strong></strong>");

			nameElement.text(username+": ");
			messageElement.text(message).prepend(nameElement);
			$('#messages').append(messageElement);
			$('.chat-message')[0].scrollTop = $('.chat-message')[0].scrollHeight - $('.chat-message').height();
		}	
	})
}
//显示当前聊天室名字数据库之中的用户名
function showUserList(){
	namelistRef.on("value", function (snapshot){
		$(".chat-userlist").children().remove();
		var title = $("<p>");
		title.attr("id","names");
		title.text("当前在线用户：");
	$(".chat-userlist").append(title);
		var data = snapshot.val();
		for(var attr in data){
			var online_user = $("<p>");
		    online_user.attr("id","names");
		    online_user.css("color", "#006400");
		    online_user.text(data[attr].name);
		    $('.chat-userlist').append(online_user);
		}
	})
}
//为发送按钮添加点击事件
function sendMessage(){
	current_text = $("#messageInput").val();
	messagesRef.push({name:current_name, text:current_text});
	$("#messageInput").val("");
	showMessageList();
}
//在线人数添加时刷新在线人列表
namelistRef.on("child_added", function (snapshot){
	var data = snapshot.val();
	var online_user = $("<p>");
    online_user.attr("id","names");
    online_user.css("color", "#006400");
    online_user.text(data.name);
    $('.chat-userlist').append(online_user);
})
//有人下线时刷新在线人列表
namelistRef.on("child_removed", function (snapshot){
	var data = snapshot.val();
	var deleted_name;
	deleted_name = data.name;
	var num = $(".chat-userlist").children().length;
	for(var i = 1; i < num; i++){
		if($(".chat-userlist").children()[i].innerHTML === deleted_name){
			$(".chat-userlist").children()[i].remove();
			break;
		}
	}
})

//有人说话时刷新聊天界面
messagesRef.on("child_added", function (snapshot){
	var data = snapshot.val();
	if(!("name" in data))
		return;
	var username = data.name;
	var message = data.text;

	var messageElement = $("<li>");
	var nameElement = $("<strong></strong>");

	nameElement.text(username+": ");
	messageElement.text(message).prepend(nameElement);
	$('#messages').append(messageElement);
	//$('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;
	$('.chat-message')[0].scrollTop = $('.chat-message')[0].scrollHeight - $('.chat-message').height();
})

//添加回车按钮响应事件
$(window).keydown(function (e){
	if(e.keyCode == 13 && temp === false){
		sendMessage();
	}
	else if(e.keyCode == 13 && temp === true){
		my_click();
	}
})