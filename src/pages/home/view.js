import html from './template.ejs'
import './home.scss'
import {local,query} from '@/utils';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import fetch from '@/utils/fetch';
import {
	Toast,
	Loading
} from '@/components'

var Home = Backbone.View.extend({
	el: '#app',

	events: {
		'click #searchDoctor':'searchDoctor'
	},

	initialize(params) {
		const {userId} = Store.getState().user
		fetch.get('/pv1/home',{
			params:{userId}
		}).then(res=>{
			this.banners = res.data.banners;
			this.render();
			this.initializeSwiper();
		}).catch(error=>{
			console.log(error);
		})
		this.scroll()
	},
	render() {
		this.$el.html(html({banners:this.banners}))
	},
	initializeSwiper(){
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			pagination: {
			  el: '.swiper-pagination',
			  clickable: true
			},
			autoplay:{
			  stopOnLastSlide:true
			}
		  });
		  $('.swiper-slide').on('click',function(){
			//正则去掉首尾``字符
			const link = $(this).attr('alt').replace(new RegExp('^\\`+|\\`+$', 'g'), '');
			appRouter.navigate(`iframe?uri=${link}&backRouter=home`,{trigger:true});
		});
	   
		/**
		 * 普通函数中的this:
		 * 1.this总是代表它的直接调用者(js的this是执行上下文), 例如 obj.func ,那么func中的this就是obj
		 * 2.在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window (约定俗成) 例如:func()
		 * 3.在严格模式下,没有直接调用者的函数中的this是 undefined 例如 func()
		 * 4.使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象
		 * 箭头函数中的this: 是父级作用域中的this
		 * 比如:$('.swiper-slide').on('click',()=>{})
		 * 它里面的this是父级作用域initializeSwiper的this,initializeSwiper中的this就是调用它的直接调用者。
		 */
	},
	scroll(){
		window.onscroll = function(){
			let top = $(this).scrollTop();
			let opacity = top / 100.0;
			if(opacity > 1){
				opacity = 1;
			}
			$(".search_nav").css('backgroundColor',`rgba(44, 169, 253,${opacity})`);
		}
	},
	searchDoctor(){
		appRouter.navigate('doctor',{trigger:true});
	}
});

module.exports = Home;