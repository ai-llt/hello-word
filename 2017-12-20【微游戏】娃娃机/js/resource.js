// 页面组成图片
var pageImg = [
	'imgs/background.jpg',
	'imgs/introduce.png',
	'imgs/machine2-1.1c0269c.png',
	'imgs/len.png',
	'imgs/head.png',
	'imgs/head1.png',
	'imgs/head2.png',
	'imgs/machine2.9130105.png',
	'imgs/active.png',
	'imgs/active1.png',
	'imgs/start-k.7585844.png',
	'imgs/btn.png',
	'imgs/eawfdsa.png',
	'imgs/he.png',
	'imgs/he1.png'
];

(function (){
	var newArray = [],
		img = null,
		imgNum = 0;

	for(var i = 0,len = pageImg.length;i < len;i++){
		img = new Image();
		img.src = pageImg[i];
		newArray[i] = img;
	}

	for(var i = 0,len = newArray.length;i < len;i++){
		newArray[i].onload = function(){
			imgNum++;
			if(imgNum == pageImg.length){
				console.log('所有素材加载完毕');
				Tools.$('.myBody')[0].style.setProperty('display','block');
			}
		}
	}
})();