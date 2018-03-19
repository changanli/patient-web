import html from './template.ejs'
import './doctor.scss'

import {
	Toast,
	Loading
} from '@/components'

var Doctor = Backbone.View.extend({
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

module.exports = Doctor;