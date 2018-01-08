//主文件

//使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。
require.config({
　　paths: {
//　　　　"jquery": "jquery-2.1.0",
//　　　　"math": "math",
//　　　　"jq-signature": "../AllJS/jq-signature",
　　},
	shim: {   // 专门用来配置不兼容的模块。
//　　　　'jq-signature': {
//　　　　　　deps: ['jquery'],  //（2）deps数组，表明该模块的依赖性。
//　　　　　　exports: 'jQuery.fn.jqSignature' //义（1）exports值（输出的变量名） ，表明这个模块外部调用时的名称；
//　　　　}
　　}
});
require([], function ($,math){

});