import html from './template.ejs'
import './mine.scss'

import {
	Toast,
	Loading
} from '@/components'

var Mine = Backbone.View.extend({
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

module.exports = Mine;