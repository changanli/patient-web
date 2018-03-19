import html from './template.ejs'
import './knowledge.scss'

import {
	Toast,
	Loading
} from '@/components'

var Knowledge = Backbone.View.extend({
	el: '#app',

	events: {
        
	},

	initialize() {
		this.render();

		console.log(Store.getState())
	},

	render() {
		this.$el.html(html())
	}
});

module.exports = Knowledge;