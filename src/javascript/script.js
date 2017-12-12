var model = {
	selectedCat: null,
	cats: [{
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
	}]
};
	
var octopus = {
	init: function() {
		view.init();
		viewAdminPanel.init();
	},
	getCats: function() {
		return model.cats;
	},
	getCat: function(catId) {
		var cats = model.cats;
		for (var i=0; i<cats.length; i++) {
			if (cats[i].id == catId) {
				return cats[i];
			}
		}
	},
	updateCatCount: function(catId) {
		var selectedCat = this.getCat(catId);
		selectedCat.count += 1;
	},
	updateSelected: function(cat) {
		model.selectedCat = cat;
	},
	getSelectedCat: function() {
		return model.selectedCat;
	},
	updateSelectedCatValues(name, url, count) {
		var cat = this.getCat(model.selectedCat.id);
		cat.name = name;
		cat.img = url;
		cat.count = Number(count);
	}
};

var view = {

	init: function() {
		this.allCats = octopus.getCats();
		$('#catList').empty();
		this.allCats.forEach(function(cat) {
			var catList = '<li id=' + cat.id + '>' + cat.name + '</li>';
			$('#catList').append(catList);
			$('#'+cat.id).click(function(event) {
				this.render(event.currentTarget.id);
				octopus.updateSelected(octopus.getCat(event.currentTarget.id));
				viewAdminPanel.init();
			}.bind(this));
		}.bind(this));
		octopus.updateSelected(octopus.getCat(this.allCats[0].id));
		this.render(this.allCats[0].id);
	},

	render: function(catId) {
		var clickedCat = octopus.getCat(catId);
		var catHtml = '<h1>'+ clickedCat.name + '</h1>' +
			'<img src=' + clickedCat.img + ' id="cat' + clickedCat.id + '">' +
			'Click Count <input id="count' + clickedCat.id + '"' + 'type="number" disabled/>';
		$('#catDesc').empty();
		$('#catDesc').append(catHtml);
		$('#count'+clickedCat.id)[0].value = clickedCat.count;
		$('#cat'+clickedCat.id).click(function(e) {
			octopus.updateCatCount(catId);
			$('#count'+clickedCat.id)[0].value = clickedCat.count;
		});
	}

};

var viewAdminPanel = {
	init: function() {
		this.adminButton = $('[name="admin"]');
		this.adminView = $('#adminView');
		this.adminView.addClass('hidden');
		this.cancelButton = $('[name="cancel"]');
		this.saveButton = $('[name="save"]');

		this.name = $('[name="catName"]')[0];
		this.url = $('[name="catUrl"]')[0];
		this.count = $('[name="catCount"]')[0];
		this.selectedCat = octopus.getSelectedCat();
		this.adminButton.click(function(e) {
			this.adminView.removeClass('hidden');
			this.render();
		}.bind(this));
		this.cancelButton.click(function(e) {
			this.adminView.addClass('hidden');
		}.bind(this));
		this.saveButton.click(function(e) {
			octopus.updateSelectedCatValues(this.name.value, this.url.value, this.count.value);
			octopus.init();
		}.bind(this));
	},
	render: function() {
		this.name.value = this.selectedCat.name;
		this.url.value = this.selectedCat.img;
		this.count.value = this.selectedCat.count;
	}
}
octopus.init();