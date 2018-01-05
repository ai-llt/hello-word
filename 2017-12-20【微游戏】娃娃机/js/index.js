var machine = {
	Yao_Gan : null,
	La_Gan : null,
	Zhua : null,
	start : null,
	take_notes : null,
	msg_view : null,
	message : ['测试信息1','123456789','abcdefg','测试信息1','123456789','abcdefg'],
	speed : 1
}

var count = 3;

window.addEventListener('load',function(){
	getAILLT();
});

// 请求工具箱
function getAILLT(){
	var res = new XMLHttpRequest(),
		status = 500,
		readyState = 0;

	res.open('get','js/AI_LLT.module.js');
	res.onreadystatechange = function(){
		readyState = res.readyState;
		if(readyState === 4){
			status = res.status;
			if(status >= 200 && status <= 300 || status == 304){

				if(status === 304){
					console.log('缓存加载');
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.text = res.responseText;
				script.title = 'AI_LLT';

				document.body.appendChild(script);

				getResource();

				Tools.openDefault();

				Tools.count_rem();
			}
		}
	}
	res.send(null);
}

// 请求加载资源文件
function getResource(){
	var res = new XMLHttpRequest(),
		status = 500,
		readyState = 0;

	res.open('get','js/resource.js');
	res.onreadystatechange = function(){
		readyState = res.readyState;
		if(readyState === 4){
			status = res.status;
			if(status >= 200 && status <= 300 || status == 304){

				if(status === 304){
					console.log('缓存加载');
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.text = res.responseText;
				script.title = 'resource';

				document.body.appendChild(script);

				getELMLoad();
				getControl();
			}
		}
	}
	res.send(null);
}

// 请求图片初始化JS
function getELMLoad(){
	var res = new XMLHttpRequest(),
		status = 500,
		readyState = 0;

	res.open('get','js/imgELMLoad.js?v=1.0');
	res.onreadystatechange = function(){
		readyState = res.readyState;
		if(readyState === 4){
			status = res.status;
			if(status >= 200 && status <= 300 || status == 304){

				if(status === 304){
					console.log('缓存加载');
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.text = res.responseText;
				script.title = 'img_load';

				document.body.appendChild(script);
			}
		}
	}
	res.send(null);
}

// 请求图片初始化JS
function getControl(){
	var res = new XMLHttpRequest(),
		status = 500,
		readyState = 0;

	res.open('get','js/control.js');
	res.onreadystatechange = function(){
		readyState = res.readyState;
		if(readyState === 4){
			status = res.status;
			if(status >= 200 && status <= 300 || status == 304){

				getDraw();

				if(status === 304){
					console.log('缓存加载');
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.text = res.responseText;
				script.title = 'control';

				document.body.appendChild(script);
			}
		}
	}
	res.send(null);
}

// 加载Canvas初始化JS
function getDraw(){
	var res = new XMLHttpRequest(),
		status = 500,
		readyState = 0;

	res.open('get','js/draw.js');
	res.onreadystatechange = function(){
		readyState = res.readyState;
		if(readyState === 4){
			status = res.status;
			if(status >= 200 && status <= 300 || status == 304){

				if(status === 304){
					console.log('缓存加载');
				}

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.text = res.responseText;
				script.title = 'canvasDraw';

				document.body.appendChild(script);
			}
		}
	}
	res.send(null);
}