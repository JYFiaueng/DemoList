//此为组件核心层

define(['jquery'], function($){
	function Widget(){
		this.boundingBox = null;//属性：最外层容器
	}
	Widget.prototype = {
		//绑定事件
		on : function(type, handler){
			if(typeof this.handlers[type] == "undefined"){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		//触发事件
		fire : function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0, len = handlers.length; i < len; i++){
					handlers[i](data);
				}
			}
		},
		//去除事件
		off : function(type, handler){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0, len = handlers.length; i < len; i++){
					if(handlers[i] === handler){
						break;
					}
				}
				handlers.splice(i, 1);
			}
		},
		renderUI : function(){},	//接口：添加DOM节点
		bindUI : function(){},	//接口：监听事件
		syncUI : function(){},	//接口：初始化组件属性
		render : function(container){	//渲染组件，参数是指定要添加到的节点
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destructor : function(){},	//接口：销毁前的处理函数
		destroy : function(){	//方法：销毁组件
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	};
	return {
		Widget : Widget
	};
});