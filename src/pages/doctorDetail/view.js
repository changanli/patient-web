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
		'click .back':'back'
	},

	initialize() {
		this.render();

		console.log(Store.getState())
	},

	render() {
		this.$el.html(html())
	},
	back(){
		// appRouter.navigate('doctorList',{trigger:true});
	}
});

module.exports = DoctorDetail;