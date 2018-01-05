/* AI_LLT 的JavaScript工具 2.0.3 */

/**
 * 日期：2017-11-21
 * 描述：移动终端用户滑动控制
 */
var Scroll = (function(s){
	var scrollList = [];

	var scrollId = -1;

	var startY,lastY;
	var startTime,lastTime;

	var start = function(){
		var touch = event.touches[0];
		startY = Number(touch.pageY);
		startTime = Number(new Date());
	}
	var move = function(){
		var touch = event.touches[0];
		lastY = Number(touch.pageY);
		lastTime = Number(new Date());

		var dataY = (this.getAttribute('data-touchY') || 0) * 1;

		var y = lastY - startY;
		y = (dataY + y);

		scrollList[scrollId].block.style.setProperty('margin-top',y + 'px');

		Tools.cssTransition(scrollList[scrollId].block,0);
	}
	var end = function(){
		var time = lastTime - startTime;

		Tools.cssTransition(scrollList[scrollId].block,0.3);

		var y = lastY - startY;

		var top = (scrollList[scrollId].block.style.marginTop);
		top = top.substring(0,top.indexOf('px')) * 1;

		var speed = Math.abs(y) / time;

		if(speed > 0.8){
			var inertia_distance =  parseInt(speed * y);
			top += inertia_distance;
		}

		if(top > 0){
			top = 0;
		}else if(top < (this.offsetHeight - scrollList[scrollId].block.offsetHeight)){
			if(scrollList[scrollId].block.offsetHeight > this.offsetHeight){
				top = (this.offsetHeight - scrollList[scrollId].block.offsetHeight) - 15;
			}else{
				top = 0;
			}
		}

		this.setAttribute('data-touchY',top);
		scrollList[scrollId].block.style.setProperty('margin-top',top + 'px');
	}

	s.addScroll = function(area,block){
		var obj = {};
		obj.area = area;
		obj.block = block;
		scrollList[scrollList.length] = obj;

		var objs = s.setScrollID(scrollList.length - 1);
		s.addEvent(objs);

		/* 返回ID */
		return (scrollList.length - 1);
	}

	s.addEvent = function(obj){
		obj.area.addEventListener('touchstart',start);
		obj.area.addEventListener('touchmove',move);
		obj.area.addEventListener('touchend',end);
	}

	s.setScrollID = function(id){
		scrollId = id;
		return s.getScroll();
	}

	s.getScroll = function(){
		return scrollList[scrollId];
	}

	return s;
}(Scroll || {}));

/**
 * 日期：2017-11-21
 * 描述：工具
 */
var Tools = (function(t){

	t.$ = function(string){
		return document.querySelectorAll(string);
	}

	t.create = function(string){
		return document.createElement(string);
	}

	t.cssTransition = function(elm,ms,ease){
		ease = ease || 'ease';
		elm.style.setProperty('-webkit-transition','all ' + ms + 's ' + ease);
		elm.style.setProperty('-moz-transition','all ' + ms + 's ' + ease);
		elm.style.setProperty('-ms-transition','all ' + ms + 's ' + ease);
		elm.style.setProperty('-o-transition','all ' + ms + 's ' + ease);
		elm.style.setProperty('transition','all ' + ms + 's ' + ease);
	}

	t.cssTransform = function(elm,value){
		elm.style.setProperty('-webkit-transform',value);
		elm.style.setProperty('-moz-transform',value);
		elm.style.setProperty('-ms-transform',value);
		elm.style.setProperty('-o-transform',value);
		elm.style.setProperty('transform',value);
	}

	// 根据页面宽度计算出相应比例的px值从而引导“rem”
	t.count_rem = function (doc, win, undefined) {

		doc = doc || document;
		win = win || window;

		var docEl = doc.documentElement,
			resizeEvt = ('orientationchange' in win) ? 'orientationchange' : 'resize',
			recalc = function (){
				var clientWidth = docEl.clientWidth;

				if(clientWidth === undefined){
					return;
				}

				docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
			}

		if(doc.addEventListener === undefined){
			return;
		}
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
		recalc();
	}

	// 禁止移动端浏览器自带的滑动效果方案
	t.openDefault = function(){
		document.addEventListener('touchmove',function(){
			window.event? window.event.cancelBubble = true : event.stopPropagation();
			window.event? window.event.returnValue = false : event.preventDefault();
		},false);
	}

	// 删除 chileNodes 获取的子元素中不必要的 text
	t.removeText = function(childNodes){
		var arry = [];

		for(var i = 0;i < childNodes.length;i++){
			arry[i] = childNodes[i];
		}
		
		for(var i = 0;i < arry.length;i++){
			if(arry[i].nodeName == '#text'){
				arry.splice(i,1);
			}
		}

		return arry;
	}

	return t;
}(Tools || {}));

var Event = (function(e){

	// 绑定的事件数组
	var event_list = [];
	var elm_object = {
		elm : '',
		list : [],
		eType : []
	};

	// 比对是否有历史痕迹
	function select_object(obj){

	}

	// 创建元素事件模型
	function createObject(elm,eType){
		var boolean_eTypeList = false;
		elm_object = {
			elm : '',
			list : [],
			eType_list : []
		};

		elm_object.elm = elm;
		elm_object.list[eType] = [];


		for(var item in elm_object.eType_list){
			if(elm_object.eType_list[item] == eType){
				boolean_eTypeList = true;
				break;
			}
		}

		if(!boolean_eTypeList){
			elm_object.eType_list[elm_object.eType_list.length] = eType;
		}
	}

	e.add = function(obj,event_type,fun){

	}

	e.remove = function(obj,event_type){
	}

	e.removeALL = function(obj,event_type){
	}
	return e;
}(Event || {}));