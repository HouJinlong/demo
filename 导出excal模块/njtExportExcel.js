
/* ===============================================================================
************   农机通excal导出 封装 ************
=============================================================================== */
/* global $:true */
+function ($) {
	"use strict";
	
	var njtExportExcel = function(el, data) {
		this.el = $(el);
	    this.el.data("njtExportExcel", this);
	    this.data = data || {};
	    this.init();
	};
	
	njtExportExcel.prototype.init = function() {
	    this.DOMInt();
	    this.bindEvent();
    }
	
	njtExportExcel.prototype.DOMInt = function() {
	    var $arr = $('.modalTemp');
	    this.modal = $($arr.eq(0).html());
	    this.load = $($arr.eq(1).html());
	    $('body').append(this.modal,this.load)
    }
	
	njtExportExcel.prototype.bindEvent = function() {
		var _self = this;
		
	    this.el.on('click',function(){
	    	
	    	_self.load.modal().find('h3').html('导出处理中...');
	    	Api.IsVerification(function(){
	    		
	    		_self.sendAjax($.extend({
		    			url:'http://IsVerification',
		    			success:function(data){
		    				 _self.load.modal('hide');
			    			log('返回值',data)	    			
			    			if(data.Code==0){
			    				_self.xlsx(data.ExtraJsonReturn,_self.data.ExcelName);		    				
			    			}else if(data.Code==2){			    			
			    				_self.load.modal('hide');
			    				var tel = data.ExtraJsonReturn.tel+'';			    				
								_self.modal.modal().find('.form-control-static').html(tel.substr(0, 3) + '****' + tel.substr(7));
								_self.codeReset();
			    			}else{
			    				_self.data.err(data)
			    			}
		    			}
		    		},_self.data.ExportAjax() || {}));
	    	},_self.data.ExportAjax().data || {});
	    });
	    
	    
	    this.modal.find('.export_code_send').on('click',function(){
	    	var PostData = {
	    		code:_self.modal.find('[name="code" ]').val() 
	    	}
	    	
	    	if(!PostData.code){
	    		_self.err('<i class="fa fa-exclamation-triangle text-danger" ></i>&nbsp;&nbsp;校验码不能为空');
	    		return;
	    	}
	    	_self.modal.modal('hide');
	    	_self.load.modal().find('h3').html('提交验证中...');
	    	Api.sendCode(PostData,function(){
	    		_self.sendAjax({
	    			url:'http://sendCode',
	    			success:function(data){
		    			log('返回值',data)	    			
		    			if(data.Code==0){
		    				_self.el.trigger('click');    				
		    			}else{
		    				_self.load.modal('hide');
		    				_self.modal.modal();
		    				_self.err('<i class="fa fa-exclamation-triangle text-danger" ></i>&nbsp;&nbsp;校验码输入错误');
		    			}
	    			}
	    		});
	    	});		
	    });
	    
	   
   }
	njtExportExcel.prototype.err = function (str){	 
		var _self = this;
	    	_self.modal.find('.help-block').html(str);
	    	_self.modal.removeClass('shake');
	    	setTimeout(function(){
	    		 _self.modal.addClass('shake');
	    	},300)
	    };
	njtExportExcel.prototype.codeReset = function(){
		var _self = this;
		var wait = 10;
        +function time($o) {
            if (wait == 0) {
                $o.removeClass("btn-default").addClass("btn-primary").html('发送校验码').one('click',function(){
                	Api.creatCode('已重新生成验证码-->');
	    			$o.addClass("btn-default").removeClass("btn-primary");
	    			_self.codeReset();
	    			_self.err('<i class="fa fa-check text-success" ></i>&nbsp;&nbsp;校验码已发送，请注意查收')
	    		});
                wait = 60;
            } else {
                $o.html("重新获取(" + wait + ")");
                wait--;
                setTimeout(function () {
                    time($o)
                },
                1000)
            }
        }(this.modal.find('.export_code_reset'))
	};
	njtExportExcel.prototype.sendAjax = function(Option){
		var _self = this;
		var defaultOption = {
	        url        : "",    //请求的url地址  必须
	        dataType   : "json",   //返回格式为json
	        async      : true, //请求是否异步，默认为异步，这也是ajax重要特性
	        data       : {},    //参数值
	        type       : "post",   //请求方式
	        beforeSend : function() {
	        },
	        success: function(data) {
	        	
	        },
	        complete: function() {
	        },
	        error: function() {
	            alert('请求超时');
	        }
	      };
		$.ajax($.extend(defaultOption,Option));
	}
	/*
	 * 导出excal
	 * @param {Object} json  数据
	 * @param {Object} sheetName  文件名字
	 */
	njtExportExcel.prototype.xlsx =function (json, filename ){
		var wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(json);
		 
		/* add worksheet to workbook */
		XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
		
		/* write workbook */
		XLSX.writeFile(wb, filename+'.xlsx');
    };
	$.fn.njtExportExcel = function(data) {
	    return this.each(function() {
	      new njtExportExcel(this, data);
	    });
	  }
}($);
