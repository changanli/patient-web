import html from './template.ejs'
import navigation from '@/components/navigation/navigation.ejs';
import '../register/register.scss'
import {query} from '@/utils';
import {
	Toast,
	Loading
} from '@/components'

import {signUp,resetPwd} from '@/redux/actions/user';

var Register = Backbone.View.extend({
	el: '#app',

	events: {
		'click .back' : 'back',
		'click #phoneCode' : 'getPhoneCode',
		'click #submit' : 'register',
		'click .tip a' : 'protocol'
	},

	initialize() {
		 //编码两次，在接收处解码一次，可以解决接受到乱码的问题
		this.title = decodeURI(query('title'));
		this.count = 60;
		this.render();
	},
	render() {
		this.$el.html(navigation({title:this.title})+html());
	  $('.tip').css('display',(this.title === '注册') ? 'block' : 'none')	
	},
	back(){
		appRouter.navigate('login', {trigger:true});
	},
	protocol(){
		appRouter.navigate(`iframe?title=${encodeURI(encodeURI('用户协议'))}&uri=/static/userProtocol.html&backRouter=register?title=${encodeURI(encodeURI('注册'))}`,{trigger:true,replace:true});
	}
	,
	getPhoneCode(){
		Toast({message:'验证码为123456'});
		$('#phoneCode').removeClass('phoneCodeSelected');
		$('#phoneCode').addClass('phoneCodeDiabled');
		$('#phoneCode').prop('disabled','disabled');
		$('#phoneCode').text(`重新获取(${this.count}s)`);
	
		this.timerId = setInterval(()=>{
			this.count -= 1;
			if (this.count < 0){
				clearInterval(this.timerId);
				this.timerId = null;
				$('#phoneCode').removeClass('phoneCodeDiabled');
				$('#phoneCode').addClass('phoneCodeSelected');
				$('#phoneCode').prop('disabled','');
				$('#phoneCode').text(`获取验证码`);
				this.count = 60;
				return;
			}
			$('#phoneCode').text(`重新获取(${this.count}s)`);
		},1000)
	},
	register(){
		let phone = $("#phone").val();
		let yanzhengma = $("#yanzhengma").val();
		let password = $("#password").val();
		let repeatPassword = $("#repeatPassword").val();
		if(!this.validate(phone,yanzhengma,password,repeatPassword)){
			return;
		}
		if(this.title === "注册"){
			this.reg(phone,password);
		}else{
			this.resetPassword(phone,password);
		}
	},
	resetPassword(phone,password){
	
		Store.dispatch(resetPwd({phone,password})).then(res=>{
	
			weui.dialog({
				title: '温馨提示',
				content: '修改密码成功，请重新登录',
				className: 'custom-classname',
				buttons: [{
				label: '确定',
				type: 'primary',
				onClick: function () { 
					appRouter.navigate('login',{trigger:true})
				}
				}]
			});
		}).catch(error=>{
		})
	}
	,
	reg(phone,password){
		Store.dispatch(signUp({phone,password})).then(res=>{
			appRouter.navigate('home',{trigger:true})
		}).catch(error=>{

		})
	},
	validate(phone,yanzhengma,password,repeatPassword){
		if (phone === ""){
			Toast({message:"请输入手机号"});
			return false;
		}else if(!(/^1[0-9]{10}$/.test(phone))){
			Toast({message:"手机号格式不正确"});
			return false;
		}else if(yanzhengma === ""){
			Toast({message:"请输入验证码"});
			return false;
		}else if (password === "") {
			Toast({message:"请输入密码"})
			return false;
		}
		else if(repeatPassword === ""){
			Toast({message:"请输入确认密码"});
			return false;
		}
		
		if(password.length < 6 || password.length > 18 ){
			Toast({message:"请输入6~18位的密码"});
			return false;
		}
		if(repeatPassword.length < 6 || repeatPassword.length > 18 ){
			Toast({message:"请输入6~18位的密码"});
			return false;
		}

		return true
	},
	deinit(){
		clearInterval(this.timerId);
		this.timerId = null;
	}
});

module.exports = Register;