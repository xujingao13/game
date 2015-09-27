function $(str){
	var len = str.length;
	var content = str.substring(0, len);
	var target = content.substring(0, 1);
	var l = content.length;

	if(target === "#"){
		var tag = content.substring(1, content.length);
		var id_array = document.getElementById(tag);

		return id_array;
	}
	else if(target === "."){
		var tag = content.substring(1, content.length);
		var class_array = document.getElementsByClassName(tag);

		return class_array;
	}
	else{
		var tag_array = document.getElementsByTagName(content);

		return tag_array;
	}
}