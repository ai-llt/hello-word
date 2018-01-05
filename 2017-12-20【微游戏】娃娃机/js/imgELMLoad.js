(function(){
	// 获取所有页面当中的img标签
	var imgs = Tools.$('img'),
		alt = '',
		img = null,
		img_index = -1;

	for(var i = 0,len = imgs.length;i < len;i++){
		img = imgs[i];
		alt = img.getAttribute('data-src');
		switch(alt){
			case 'background':
				img_index = 0;
				break;
			case 'introduce':
				img_index = 1;
				break;
			case 'ji_he':
				img_index = 2;
				break;
			case 'la_gan':
				img_index = 3;
				break;
			case 'zhua':
				img_index = 4;
				break;
			case 'ji_ke':
				img_index = 7;
				break;
			case 'yaogan1':
				img_index = 8;
				break;
			case 'yaogan2':
				img_index = 9;
				break;
			case 'start':
				img_index = 10;
				break;
			case 'take_notes':
				img_index = 11;
				break;
			case 'message':
				img_index = 12;
				break;
			case 'XinSui':
				img_index = 14;
				break;
		}
		img.src = pageImg[img_index];
	}
})();