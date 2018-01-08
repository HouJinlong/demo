// 自己编写的 模块     固定写法
define(function (data){
	
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
	console.log(data)
		var a=2;
　　　　return {
　　　　　　add: add,
		 a:a,
　　　　};
　　});