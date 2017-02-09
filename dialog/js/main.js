//此处为应用层

require.config({
	paths : {
		//文件名配置，在windowjs中直接jquery，只是指定了一种映射关系
		jquery : "./jquery-2.2.2.min",
		jqueryUI : "./jquery-ui-1.9.2.min"
	}
});

require(['jquery', 'window'], function($, w){
	$("#alertBtn").click(function(){
		var win = new w.Window();
		win.alert({
			title : "直接修改、传参修改、用类修改，显然使用第三种可定制化最高",
			content : "Hello require.js",
			width : 500,
			height : 200,
			x : 200,
			y : 100,
			hasCloseBtn : true,
			handler4AlertBtn : function(){
				alert("alert");
			},
			handler4CloseBtn : function(){
				alert("close");
			},
			skinClassName : "window_skin_a",
			text4AlertBtn : "不确定",
			dragHandle : ".window_header"
		}).on("alert", function(){
			alert("second alert");
		}).on("close", function(){
			alert("second close");
		});
	});
	$("#confirmBtn").click(function(){
		var win = new w.Window();
		win.confirm({
			title : "系统消息",
			content : "确定要删除此文件吗？",
			width : 400,
			height : 200,
			y : 100,
			x : 600,
			hasCloseBtn : true,
			text4ConfirmBtn : "是",
			text4CancelBtn : "否",
			dragHandle : ".window_header"
		}).on("confirm", function(){
			alert("确定");
		}).on("cancel", function(){
			alert("取消");
		});
	});
	$("#promptBtn").click(function(){
		var win = new w.Window();
		win.prompt({
			title : "请输入您的名字",
			content : "您输入的信息将被保密",
			width : 500,
			height : 200,
			x : 400,
			y : 150,
			hasCloseBtn : true,
			text4PromptBtn : "请输入",
			text4CancelBtn : "取消",
			defaultValue4PromptInput : "张三",
			dragHandle : ".window_header",
			handler4PromptBtn : function(inputValue){
				alert("您输入的内容是:"+inputValue);
			},
			handler4CancelBtn : function(){
				alert("已取消");
			}
		});
	});
	$("#commonBtn").click(function(){
		var win = new w.Window();
		win.common({
			content : "我是一个通用弹窗",
			width : 300,
			height : 150,
			x : 350,
			y : 150,
			hasCloseBtn : true,
			skinClassName : "window_skin_b",
			dragHandle : ".window_body"
		});
	});
});