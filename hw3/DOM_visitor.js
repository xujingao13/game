function $(str){
	var Ele = new Object();
	var len = str.length;
	var content = str.substring(0, len);
	var target = content.substring(0, 1);
	var l = content.length;

	if(target === "#"){
		var tag = content.substring(1, content.length);
		Ele.elements = document.getElementById(tag);
	}
	else if(target === "."){
		var tag = content.substring(1, content.length);
		if(document.getElementsByClassName(tag).length > 1)
			Ele.elements = document.getElementsByClassName(tag);
		else
			Ele.elements = document.getElementsByClassName(tag)[0];
	}
	else{
		if(document.getElementsByTagName(content).length > 1)
			Ele.elements = document.getElementsByTagName(content);
		else
			Ele.elements = document.getElementsByTagName(content)[0];
	}

	Ele.attr = function(){
		var argunum = arguments.length;
		if(argunum === 1){
			return this.elements.getAttribute(arguments[0]);
		}
		else{
			this.elements.setAttribute(arguments[0], arguments[1]);
		}
	}

	return Ele;
}