function $(str){
	var len = str.length;
	var content = str.substring(0, len);
	var target = content.substring(0, 1);
	var l = content.length;

	if(target === "#"){
		var tag = content.substring(1, content.length);
		return document.getElementById(tag);
	}
	else if(target === "."){
		var tag = content.substring(1, content.length);
		if(document.getElementsByClassName(tag).length > 1)
			return document.getElementsByClassName(tag);
		else
			return document.getElementsByClassName(tag)[0];
	}
	else{
		if(document.getElementsByTagName(content).length > 1)
			return document.getElementsByTagName(content);
		else
			return document.getElementsByTagName(content)[0];
	}
}
Element.prototype.attr = function(){
	var argunum = arguments.length;
	if(typeof arguments[0] != "string")
		console.log("first arguments error!");
	if(argunum === 1){
		var result = this.getAttribute(arguments[0]);
		if(result == null)
			console.log("the attribute is not in the element");
		else return result;
	}
	if(argunum === 2){
		if(typeof arguments[1] != "string")
			console.log("second arguments error!");
		else
			this.setAttribute(arguments[0], arguments[1]);
	}
	if(argunum > 2)
		console.log("arguments is too much");
}