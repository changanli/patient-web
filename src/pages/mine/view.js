import html from './template.ejs'
import './mine.scss'

import {
	Toast,
	Loading
} from '@/components'

import fetch from '@/utils/fetch';

var Mine = Backbone.View.extend({
	el: '#app',

	events: {
        'click .sign' : 'postSign'
	},

	initialize() {
		this.render();
		$('.weui-cell:eq(0)').on('click',function(){
			appRouter.navigate('personalInformation',{trigger:true})
		})
		let {userId} = Store.getState().user;
		fetch.get('/user/userInfo',{
			params:{
				userId
			}
		}).then(res=>{
			console.log(res);
			const {score,balance,discount,isSign} = res.data;
			this.score = score;
			this.balance = balance;
			this.discount = discount;
			this.isSign = isSign;
			$('#score').html(this.score);
			$('#discount').html(this.discount);
			$('#balance').html(this.balance);
			this.sign();
		
		}).catch(error=>{
			console.log(error);
		})
	},

	render() {
		this.$el.html(html({score:this.score,balance:this.balance,discount:this.discount}));
	},
	postSign(){
		const {userId} = Store.getState().user;
		fetch.post('/user/sign',{
			userId
		}).then(res=>{
			const {code,msg,score} = res.data;
			if(code == 0){
				Toast({message:'签到成功!'})
				this.score = score;
				$('#score').html(this.score);
				this.isSign = true;
				this.sign();
			}else{
				weui.topTips(msg);
			}
		}).catch(error=>{
			console.log(error);
		})
	},
	sign(){
		$('.sign').prop('disabled',this.isSign ? 'disabled' : '');
		$('.sign').html(this.isSign ? '已签到' : '每日签到');
		$('.sign').css('backgroundColor',this.isSign ? 'red' : 'orange');
	}
});

module.exports = Mine;