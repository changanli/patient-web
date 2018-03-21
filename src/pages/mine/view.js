import html from './template.ejs'
import './mine.scss'

import {
	Toast,
	Loading
} from '@/components'

import fetch from '@/utils/fetch';
import {getUserInfo,sign} from '@/redux/actions/user';

var Mine = Backbone.View.extend({
	el: '#app',

	events: {
		'click .sign' : 'postSign',
		'click .weui-cell:eq(0)' : 'info',
		'click #avatar' : 'info',
		'click .name' : 'info'
	},

	initialize() {
		this.render();
		this.getUserData()
	},

	render() {
		this.$el.html(html());
	},
	info(){
		appRouter.navigate('personalInformation',{trigger:true})
	},
	getUserData(){
		const {userId} = Store.getState().user;
		Store.dispatch(getUserInfo({params:{userId}})).then(res=>{
			const {score,balance,discount,username,avatar} = res;
			$('#score').html(score);
			$('#discount').html(discount);
			$('#balance').html(balance);
			$('.name').html((username.length == 0) ? '未设置' : username)
			avatar.length != 0 && $('#avatar').attr('src',avatar);
			this.sign();
		}).catch(err=>{
			console.log(err);
		})
	},
	postSign(){
		const {userId} = Store.getState().user;
		Store.dispatch(sign({userId})).then(res=>{
			const {code,msg,score} = res.data;
			if(code == 0){
				Toast({message:'签到成功,奖励50金币!'})
				$('#score').html(score);
				this.sign();
			}else{
				weui.topTips(msg);
			}
		}).catch(error=>{
			console.log(error);
		});
	},
	sign(){
		const {isSign} = Store.getState().user;
		$('.sign').prop('disabled',isSign ? 'disabled' : '');
		$('.sign').html(isSign ? '已签到' : '每日签到');
		$('.sign').css('backgroundColor',isSign ? 'red' : 'orange');
	}
});

module.exports = Mine;