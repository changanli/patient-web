import html from './template.ejs'
import './settings.scss';
import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

import {loginOut} from '@/redux/actions/user.js'

var Settings = Backbone.View.extend({
	el: '#app',

	events: {
        'click #logout':'logout',
		'click .back' : 'back',
		'click #resetPwd':'resetPwd',
		'click #resetPhone' : 'resetPhone'
	},

	initialize() {
		this.render();
	},

	render() {
		this.$el.html(html())
    },
    logout(){
        Store.dispatch(loginOut())
        appRouter.navigate('login',{trigger:true,replace:true})
    },
    back(){
        appRouter.navigate('mine',{trigger:true});
	},
	resetPwd(){
		appRouter.navigate(`register?title=${encodeURI(encodeURI('忘记密码'))}&type=1`,{trigger:true})
	},
	resetPhone(){
		Toast({message:'暂未开通，敬请期待'})
	}
});

module.exports = Settings;