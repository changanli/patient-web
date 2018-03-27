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
		'click .weui-cell' : 'info',
		'click #avatar' : 'info',
		'click .name' : 'info',
		'click .weui-cell' : 'detail'
	},

	initialize() {
		this.render();
		this.getUserData();
	},

	render() {
		this.$el.html(html());
	},
	detail(e){
		const tag = $(e.currentTarget).attr('data-tag');
		const routers = ["personalInformation","healthRecord"]
		const router = routers[tag];
		console.log(typeof(router));
		// 只能用 === 运算来测试某个值是否是未定义的，因为 == 运算符认为 undefined 值等价于 null。
		if(router === undefined){
			return;
		}
		//或者通过typeof来判断
		// if(typeof(router) == 'undefined'){
		// 	return
		// }
		appRouter.navigate(routers[tag],{trigger:true})
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