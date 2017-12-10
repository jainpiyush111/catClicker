var cats = [{
	name: 'Smokey',
	img: 'https://c1.staticflickr.com/2/1126/625069434_db86b67df8_n.jpg',
	count: 0
}, {
	name: 'Kitty',
	img: 'https://c1.staticflickr.com/6/5211/5513402618_3ce232e01a_n.jpg',
	count: 0
}];

cats.forEach(function(cat, index) {
	var catHtml = '<h1>'+ cat.name + '</h1>' +
		'<img src=' + cat.img + ' id="cat' + index + '">' +
		'Click Count <input id="count' + index + '"' + 'type="number" value=0 disabled/>';
	$('#cats').append(catHtml);
	$('#cat'+index).click(function(e) {
		var count = $('#count'+index);
		count.attr('value', Number(count.val()) + 1);
	});
});