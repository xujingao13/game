$(window).scroll(function(){
	var scrollTop = document.body.scrollTop;
	var WinHeight = $(window).height();
	var DocHeight = $(document).height();
	if(scrollTop + WinHeight + 30 > DocHeight){
		loadXMLDoc();
	}
})
var time = 1;
var xhr;

function loadXMLDoc(){
	if(time <= 4){
		var str = "json/"+time+".json";
		$.getJSON(str, function(data){
			for(var i = 0; i < data.images.length; i++){
				addImage(data.images[i]);
			}
		})
		$('#state').css("top",$(document).height());
		time++;
	}
	else{
		$('#state').html("图片已经全部加载完毕");
		return;
	}
}
window.onload = function(event){
	loadXMLDoc();
	loadXMLDoc();
}
function addImage(obj){
	var latitude = obj.latitude;
	var longitude = obj.longitude;
	var img = document.createElement("img");
	$(img).attr("src", obj.path).click(function(){
		$('#display').css("visibility", "visible");
		$('#display').css("height",$(document).height());

		var bigImage = document.createElement("img");
		$(bigImage).attr("class", "bigimg").attr("src", $(this).attr("src"));

		var commit = document.createElement("div");
		$(commit).attr("class", "commitment");

		$('#union').append(bigImage).append(commit).css("visibility", "visible");

		var close = document.createElement("img");
		var next = document.createElement("img");
		var previous = document.createElement("img");

		$(close).attr("class","close").attr("src","images/close.png").click(close_commitment);
		$(next).attr("class","next").attr("src","images/next.png");
		$(previous).attr("class","previous").attr("src","images/previous.png");

		var path = "json/commitment_"+page+".json";
		showCommitment(path);

		var total = document.createElement("div");
		$(total).attr("class","total");
		$(total).css("margin-top",$(bigImage).height() / 4);

		var location = document.createElement("div");


		$(commit).css("height",$('.bigimg').height()-50);
		$(commit).css("margin-left",$('.bigimg').width()).append(location).append(total);

		$(location).attr("class", "location");
		$(location).css("height", $(bigImage).height / 4);
		$(location).append("<p>秀恩爱地理位置 经度："+latitude+" 纬度:"+longitude+"</p>");
		

		getLocation();
		var distance = parseInt(getDistance(m_latitude,m_longitude,latitude,longitude));
		$(location).append("<p>与我的距离："+distance+"km.</p>");
		

		$(previous).css("margin-left",$('.bigimg').width()+50);
		$(previous).css("margin-top",$('.bigimg').height()-50).click(pre_commitment);

		$(next).css("margin-top",$('.bigimg').height()-50).click(next_commitment);

		$('#union').append(previous).append(close).append(next);
		$('#union').css("height",$('.bigimg').height()+1);
		$('#union').css("background","url('images/back.jpg')");
		$('#union').css("width", $('.bigimg').width()+$('.commitment').width()+$(close).width());
	});
	var div1 = document.createElement("div");
	$(div1).attr("class","pic").append(img);
	var div2 = document.createElement("div");
	$(div2).attr("class","box").append(div1);
	$("#main").append(div2);
}

var page = 1;
var m_latitude;
var m_longitude;


function getLocation(){
	if(navigator.geolocation){
    	navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  	else{
  		alert("不支持定位操作");
  	}
}

function showPosition(position){
  	m_latitude = position.coords.latitude;
  	m_longitude = position.coords.longitude;
}
function showError(error){
  	switch(error.code){
    	case error.PERMISSION_DENIED:
     		alert("User denied the request for Geolocation.");
      	break;
    	case error.POSITION_UNAVAILABLE:
      		alert("Location information is unavailable.");
      	break;
    	case error.TIMEOUT:
      		alert("The request to get user location timed out.");
      	break;
    	case error.UNKNOWN_ERROR:
      		alert("An unknown error occurred.");
      	break;
    }
  }
function getDistance(locationX, locationY, x, y){
	var x1 = Math.cos(locationX) * Math.cos(locationY);
	var x2 = Math.cos(y) * Math.cos(x);
	var y1 = Math.cos(locationY) * Math.sin(locationX);
	var y2 = Math.cos(y) * Math.sin(x);
	var z1 = Math.sin(locationY);
	var z2 = Math.sin(y);
	var a = Math.acos(x1 * x2 + y1 * y2 + z1 * z2);
	var d = a / 180 * Math.PI * 6371;

	return d;
}
function close_commitment(){
	$('#union').css("visibility","hidden");
	$('#display').css("visibility","hidden");
	$('.commitment').remove();
	$('.bigimg').remove();
	$('.close').remove();
	$('.next').remove();
	$('.previous').remove();
}

function next_commitment(){
	page++;
	if(page == 4){
		alert("已经是最后一条评论了。");
		page--;
		return;
	}
	$('.bump').remove();
	var path = "json/commitment_"+page+".json";
	showCommitment(path);	
}
function pre_commitment(){
	page--;
	if(page == 0){
		alert("已经是第一条评论了。");
		page++;
		return;
	}
	$('.bump').remove();
	var path = "json/commitment_"+page+".json";
	showCommitment(path);
}
function showCommitment(path){
	$.getJSON(path, function(data){
		var comments = data.comments;
		var i;
		for(i = 0; i < comments.length; i++){
			$(".total").append("<p class='bump'>"+comments[i]+"</p>");
		}
		$(".bump").css({
			"color":"balck",
			"font-size":"20px",
			"font-family":"楷体",
			"max-width":"200px",
			"margin-left":50
		});
	})
}