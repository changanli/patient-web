import html from './template.ejs'
import './home.scss'
import {local} from '@/utils';

import {
	Toast,
	Loading
} from '@/components'

var Home = Backbone.View.extend({
	el: '#app',

	events: {
		'click button': 'clickTips'
	},

	initialize() {
		console.log(Store.getState().user);
		this.render();
	},

	render() {
		this.$el.html(html())
	},

	clickTips(){
		Toast('上拉加载更多1');
	}



});

module.exports = Home;