//组件层

define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI){
	function Window(){
		this.cfg = {
			width : 500,
			height : 300,
			title : "系统消息",
			content : "",
			hasCloseBtn : false,
			hasMask : true,
			isDraggeble : true,//是否可拖动
			dragHandle : null,//配置可拖动区
			skinClassName : null,//皮肤接口
			text4AlertBtn : "确定",
			text4ConfirmBtn : "确定",
			text4CancelBtn : "取消",
			handler4AlertBtn : null,
			handler4CloseBtn : null,
			handler4ConfirmBtn : null,
			handler4CancelBtn : null,
			text4PromptBtn : "确定",
			isPromptInputPassword : false,//输入的是否是密码
			defaultValue4PromptInput : "",//输入框的默认文本
			maxlength4PromptInput : 10,//输入的最大字符数
			handler4PromptBtn : null
		};
		this.handlers = {};
	}
	//继承widget公有类
	Window.prototype = $.extend({}, new widget.Widget(), {
		renderUI : function(){
			var footerContent = "";
			switch(this.cfg.winType){
				case "alert" :
					footerContent = "<input type='button' class='window_alertBtn' value='"+this.cfg.text4AlertBtn+"'/>";
					break;
				case "confirm" :
					footerContent = "<input type='button' class='window_confirmBtn' value='"+this.cfg.text4ConfirmBtn+
									"'/><input type='button' class='window_cancelBtn' value='"+this.cfg.text4CancelBtn+
									"'/>";
					break;
				case "prompt" :
					this.cfg.content += "<p class='window_promptInputWrapper'><input type='"+
						(this.cfg.isPromptInputPassword?"password":"text")+"' value='"+
						this.cfg.defaultValue4PromptInput+"' maxlength='"+
						this.cfg.maxlength4PromptInput+"' class='window_promptInput'></p>";
					footerContent = "<input type='button' class='window_promptBtn' value='"+this.cfg.text4PromptBtn+
									"'/><input type='button' class='window_cancelBtn' value='"+this.cfg.text4CancelBtn+
									"'/>";
					break;
			}
			this.boundingBox = $(
				"<div class='window_boundingBox'>"+
					"<div class='window_body'>"+this.cfg.content+"</div>"+
				"</div>"
			);
			if(this.cfg.winType != "common"){
				this.boundingBox.prepend("<div class='window_header'>"+this.cfg.title+"</div>");
				this.boundingBox.append("<div class='window_footer'>"+footerContent+"</div>");
			}
			if(this.cfg.hasMask){
				this._mask = $("<div class='window_mask'></div>");
				this._mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append("<span class='window_closeBtn'>X</span>");
			}
			this.boundingBox.appendTo(document.body);
			this._promptInput = this.boundingBox.find(".window_promptInput");
		},
		bindUI : function(){
			var that = this;
			this.boundingBox.delegate(".window_alertBtn", "click", function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn", "click", function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn", "click", function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn", "click", function(){
				that.fire("cancel");
				that.destroy();
			}).delegate(".window_promptBtn", "click", function(){
				that.fire("prompt", that._promptInput.val());
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert", this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close", this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("confirm", this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel", this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4PromptBtn){
				this.on("prompt", this.cfg.handler4PromptBtn);
			}
		},
		syncUI : function(){
			this.boundingBox.css({
				width : this.cfg.width+"px",
				height : this.cfg.height+"px",
				left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
				top : (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + "px",
				marginTop : "0px",
				marginLeft : "0px"
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggeble){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle, containment: "document"});
				}else{
					this.boundingBox.draggable();
				}
			}
		},
		destructor : function(){
			this._mask && this._mask.remove();
		},
		alert : function(cfg){
			$.extend(this.cfg, cfg, {winType : "alert"});
			this.render();
			return this;
		},
		confirm : function(cfg){
			$.extend(this.cfg, cfg, {winType : "confirm"});
			this.render();
			return this;
		},
		prompt : function(cfg){
			$.extend(this.cfg, cfg, {winType : "prompt"});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common : function(cfg){
			$.extend(this.cfg, cfg, {winType : "common"});
			this.render();
			return this;
		}
	});
	return {
		Window : Window
	};
});