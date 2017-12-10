var cats = [{
			id: '1000',
			name: 'Smokey',
			img: 'https://c1.staticflickr.com/2/1126/625069434_db86b67df8_n.jpg',
			count: 5
		}, {
			id: '1001',
			name: 'Kitty',
			img: 'https://c1.staticflickr.com/6/5211/5513402618_3ce232e01a_n.jpg',
			count: 17
		}, {
			id: '1002',
			name: 'Puss',
			img: 'https://c1.staticflickr.com/2/1384/5110231975_41ce19ef23_n.jpg',
			count: 24
		}, {
			id: '1003',
			name: 'Tiger',
			img: 'https://c1.staticflickr.com/5/4220/34866685395_1b9a7efb51_m.jpg',
			count: 56
		}
];

function getCat(catId) {
	for (var i=0; i<cats.length; i++) {
		if (cats[i].id == catId) {
			return cats[i];
		}
	}
}

cats.forEach(function(cat) {
	var catList = '<li id=' + cat.id + '>' + cat.name + '</li>';
	$('#catList').append(catList);
	$('#'+cat.id).click(function(e) {
		var clickedCat = getCat(e.currentTarget.id);
		var catHtml = '<h1>'+ clickedCat.name + '</h1>' +
			'<img src=' + clickedCat.img + ' id="cat' + cat.id + '">' +
			'Click Count <input id="count' + cat.id + '"' + 'type="number" disabled/>';
		$('#catDesc').empty();
		$('#catDesc').append(catHtml);
		$('#count'+cat.id)[0].value = clickedCat.count;
		$('#cat'+cat.id).click(function(e) {
			clickedCat.count += 1;
			$('#count'+cat.id)[0].value = clickedCat.count;
		});
	});
});