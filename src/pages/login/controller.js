import View from './view'
import login from './login'
var controller = function(params) {

	var view = new View(params);

	controller.onRouteChange = function() {
		view.undelegateEvents();
	};
};

module.exports = controller;