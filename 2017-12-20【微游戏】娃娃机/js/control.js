
var startX,lastX,time,LaGan_X = 0,Only = true,type,messageIndex = -1;

(function(){
	machine.Yao_Gan = Tools.$('.yaogan1')[0];
	machine.La_Gan = Tools.$('.la_gan')[0];
	machine.Zhua = Tools.$('.zhua > img')[0];
	machine.msg_view = Tools.$('.text')[0];
	machine.start = Tools.$('.start')[0];
	machine.take_notes = Tools.$('.take_notes')[0];

	var popup_close = Tools.$('.PA_body .PA_close')[0],
		countText = Tools.$('.count > span')[0];

	console.log(machine);

	addEvent_yao_gan();

	addEvent_start();

	messageDiGuei();

	popup_close.addEventListener('touchstart',function(){
		this.parentNode.parentNode.style.setProperty('display','none');
	});

	countText.innerHTML = '剩余次数：' + count;


function removeEvent_yao_gan(){
	machine.Yao_Gan.removeEventListener('touchstart',start_YaoGan);
	machine.Yao_Gan.removeEventListener('touchmove',move_YaoGan);
	machine.Yao_Gan.removeEventListener('touchend',end_YaoGan);
}

function addEvent_yao_gan(){
	machine.Yao_Gan.addEventListener('touchstart',start_YaoGan);
	machine.Yao_Gan.addEventListener('touchmove',move_YaoGan);
	machine.Yao_Gan.addEventListener('touchend',end_YaoGan);
}

function removeEvent_start(){
	machine.start.removeEventListener('touchstart',start_start);
	machine.start.removeEventListener('touchmove',move_start);
	machine.start.removeEventListener('touchend',end_start);
}

function addEvent_start(){
	machine.start.addEventListener('touchstart',start_start);
	machine.start.addEventListener('touchmove',move_start);
	machine.start.addEventListener('touchend',end_start);
}

// 摇杆控制事件
function start_YaoGan(){
	var touch = event.touches[0];
	startX = Number(touch.pageX);
}
function move_YaoGan(){
	var touch = event.touches[0];
	lastX = Number(touch.pageX);

	var x = lastX - startX;
	if(x > 0){
		Tools.cssTransform(this,'rotate(18deg)');
		type = true;
	}else if(x < 0){
		Tools.cssTransform(this,'rotate(-18deg)');
		type = false;
	}
	removeEvent_start();

	if(Only){
		time = setInterval(function(){
			console.log(type);
			if(type){
				LaGan_X += machine.speed;
			}else{
				LaGan_X -= machine.speed;
			}

			if(Math.abs(LaGan_X) > machine.La_Gan.offsetWidth * 1.75){
				if(type){
					LaGan_X = machine.La_Gan.offsetWidth * 1.75;
				}else{
					LaGan_X = -(machine.La_Gan.offsetWidth * 1.75);
				}
				return;
			}
			Tools.cssTransform(machine.La_Gan,'translateY(-42%) translateX(' + LaGan_X + 'px)');
		},1000/64);
		Only = false;
	}
}

function end_YaoGan(){
	startX = lastX = 0;
	Tools.cssTransform(this,'rotate(0deg)');
	clearInterval(time);
	Only = true;
	addEvent_start();
}

// 开始控制事件
function start_start(){
	time = true;
}

function move_start(){
	time = false;
}

function end_start(){
	if(time){
		if(count < 1){
			popup_close.parentNode.parentNode.style.setProperty('display','block');
			return;
		}
		removeEvent_yao_gan();
		Tools.cssTransition(machine.La_Gan,1.8,'linear');
		Tools.cssTransform(machine.La_Gan,'translateY(22%) translateX(' + LaGan_X + 'px)');
		machine.Zhua.src = pageImg[5];
		setTimeout(function(){
			Tools.cssTransform(machine.La_Gan,'translateY(-42%) translateX(' + LaGan_X + 'px)');
			machine.Zhua.src = pageImg[6];
			setTimeout(function(){
				Tools.cssTransition(machine.La_Gan,0);
				machine.Zhua.src = pageImg[4];
				addEvent_yao_gan();
				count--;
				countText.innerHTML = '剩余次数：' + (count < 1 ? 0 : count);
			},1800);
		},2500);
	}
}

function messageDiGuei(){
	if(machine.message.length <= 0){
		return;
	}
	
	var ul = document.createElement('ul'),
		li = null,
		span = null,
		span1 = document.createElement('span'),
		text = '',
		box_width = machine.msg_view.offsetWidth;

	for(var i = 0,len = machine.message.length;i < len;i++){
		text += machine.message[i] + '&nbsp;&nbsp;';
	}

	for(var i = 0;i < 2;i++){
		li = document.createElement('li');
		span = document.createElement('span');
		span.innerHTML = text;
		li.appendChild(span);
		ul.appendChild(li);
	}

	machine.msg_view.appendChild(ul);

	console.log(ul.offsetWidth);


	time = setTimeout(test,100);

	function test(){
		Tools.cssTransition(ul,ul.offsetWidth / 34,'linear');
		Tools.cssTransform(ul,'translateY(-50%) translateX(-' + (ul.offsetWidth) + 'px)');
		setTimeout(function(){
			Tools.cssTransition(ul,0);
			Tools.cssTransform(ul,'translateY(-50%) translateX(-' + (ul.offsetWidth - li.offsetWidth) + 'px)');
			clearTimeout(time);
			time = setTimeout(test,100);
		},(ul.offsetWidth / 34) / 2 * 1000);
	}
}
})();