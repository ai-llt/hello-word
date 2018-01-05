(function(){
	/*所有页面中的 canvas */
	var canvas_List = Tools.$('canvas'),
	/*带 data-pattern 属性的 canvas 列表*/
		pattern_List = [],
		data_pattern = null;

	/*筛选出带 data-pattern 属性的 canvas 元素*/
	for(var i = 0,len = canvas_List.length;i < len;i++){

		data_pattern = canvas_List[i].getAttribute('data-pattern');

		if(data_pattern){
			pattern_List[pattern_List.length] = canvas_List[i];

			data_pattern = null;
		}
	}

	console.log('带属性的 canvas 元素列表：',pattern_List);

	for(var i = 0,len = pattern_List.length;i < len;i++){
		switch(pattern_List[i].getAttribute('data-pattern')){
			case 'X':
				draw_X(pattern_List[i]);
				break;
		}
	}

	function draw_X(can){
		/*获取画布画笔*/
		var cxt = can.getContext('2d'),
		/*获取画布宽度*/
			w = can.width,
		/*获取画布高度*/
			h = can.height,
		/*获取画笔颜色*/
			c = can.getAttribute('data-color') || '#000000',
		/*获取画笔粗细*/
			weight = can.getAttribute('data-weight') || '10';

		/*开始绘制
		创建新的路径*/
		cxt.beginPath();

		/*设置画笔颜色*/
		cxt.strokeStyle = c;
		/*设置画笔粗细*/
		cxt.lineWidth = weight;

		/*设置画笔起始点*/
		cxt.moveTo(0,0);
		/*设置画笔第二落点*/
		cxt.lineTo(w,h);

		/*绘制执行*/
		cxt.stroke();

		/*创建新的路径*/
		cxt.beginPath();

		/*设置起始点*/
		cxt.moveTo(w,0);
		/*设置第二点*/
		cxt.lineTo(0,h);

		/*绘制执行*/
		cxt.stroke();
	}
})();