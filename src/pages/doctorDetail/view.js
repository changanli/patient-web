import html from './template.ejs'
import './doctorDetail.scss';
import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

var DoctorDetail = Backbone.View.extend({
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

module.exports = DoctorDetail;