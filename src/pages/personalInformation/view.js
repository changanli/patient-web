import html from './template.ejs'
import nameHtml from './changeName.ejs'
import './information.scss';

import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'
import {getUserInfo,updateUserInfo} from '@/redux/actions/user';
import fetch from '@/utils/fetch';

var Index = Backbone.View.extend({
	el: '#app',

	events: {
		'click .back' : 'back',
		'click #select-photo': 'chooseFile',
		'click .fanhui' : 'fanhui',
		'click .done' : 'done',
		'click #name-cell' : 'changeName'
	},

	initialize() {
		this.render();
		this.getUserData()
	},

	render() {
		this.$el.html(html())
	},
	initData(){
		const {phone,username,avatar} = Store.getState().user;
		$('#name').html((username.length==0) ? '未设置' : username); 
		$('#phone').html(phone);
		avatar.length != 0 && $('.photo span').css({'background':`url('${avatar}') no-repeat center`,'background-size':'contain'})
	}
	,
	getUserData(){
		let {userId} = Store.getState().user;
		Store.dispatch(getUserInfo({params:{userId}})).then(res=>{
			this.initData();
		}).catch(err=>{
			console.log(err);
		})
	},
	changeName(){
		this.$el.html(nameHtml({'title':'修改用户名称'}))
	}
	,
	done(){
		const name = $('.weui-input').val();
		if (name.length === 0){
			weui.topTips("请输入用户名");
			return;
		}
		this.save(null,name,1);
	},
	back(){
		appRouter.navigate('mine',{trigger:true})
	},
	fanhui(){//从修改用户名页返回
		this.$el.html(html())
		this.initData();
	},
	save(avatar,username=null,type=0){
		const {userId} = Store.getState().user;
		Store.dispatch(updateUserInfo({avatar,username,userId})).then(res=>{
			if(type === 1){
				this.fanhui();
			}
			const {avatar,username,phone} = res;
			$(".photo span").css({'background':`url(${avatar}) center no-repeat`,'background-size':'contain'});
			$('#name').html(username.length == 0 ? '未设置' : username);
		}).catch(error=>{
			console.log(error);
		})
	},
	chooseFile(e){
		const userId = Store.getState().user.userId;
		var that = this;
		weui.uploader('.weui-cell__ft.photo', {
			url: '../pv1/upload',
			auto: true,
			type: 'file',
			fileVal: 'upfile',
			compress: {
				width: 1600,
				height: 1600,
				quality: .8
			},
			onBeforeQueued: function (files) {
				if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
					Toast('请上传图片');
					return false; // 阻止文件添加
				}
				if (this.size > 10 * 1024 * 1024) {
					Toast('请上传不超过10M的图片');
					return false;
				}
				if (files.length > 5) { // 防止一下子选择过多文件
					Toast('最多只能上传5张图片，请重新选择');
					return false;
				}

			},
			onBeforeSend: function (data, headers) {
				$.extend(data, {
					userId,
					type: 'image'
				});
			},
			onProgress: function (procent) {},
			onSuccess: function (ret) {
				that.save(ret.img);
			},
			onError(err) {
				weui.topTips(err.message, 1500);
			}
		});
	}	


});

module.exports = Index;