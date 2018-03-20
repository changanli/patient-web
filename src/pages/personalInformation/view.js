import html from './template.ejs'

import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

var Index = Backbone.View.extend({
	el: '#app',

	events: {
        'click .back' : 'back'
	},

	initialize() {
		this.render();
		
		console.log(Store.getState())
	},

	render() {
		const {phone} = Store.getState().user;
		this.$el.html(html({phone,name:'未设置'}))
	},

	back(){
		appRouter.navigate('mine',{trigger:true})
	}



});

module.exports = Index;