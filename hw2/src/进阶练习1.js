function sum(){
	var length = arguments.length;
	var sum = 0;

	for(var i = 0; i < length; i++){
		//判断是否为整数
		if(typeof arguments[i] === "number")  
			sum = Add(sum, arguments[i]);  
		//判断是否为何以转化为整数的字符串
		if(typeof arguments[i] === "string"){
			if(!isNaN(arguments[i])){
				var temp = parseFloat(arguments[i]);
                sum = Add(sum, temp);
			}
		}
	}
	return sum;
}
//加法函数 解决浮点数运算问题
function Add(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}