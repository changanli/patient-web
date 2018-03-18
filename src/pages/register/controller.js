import View from './view'

var controller = function(params) {
	var view = new View(params);
	console.log("监听controller");
	controller.onRouteChange = function() {
		view.undelegateEvents();
		view.deinit();
	};
};

module.exports = controller;