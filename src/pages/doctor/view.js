import html from './template.ejs'
import './doctor.scss'

import {
	Toast,
	Loading
} from '@/components'

import fetch from '@/utils/fetch';
import {getDeparts,doctorList} from '@/redux/actions/doctor'

var Doctor = Backbone.View.extend({
	el: '#app',

	events: {
        'click .depart' : 'gotoDoctorList'
	},

	initialize() {
		const {userId} = Store.getState().user;
		Store.dispatch(getDeparts({userId})).then(res=>{
			console.log(res);
			const faculty = res.faculty;
			this.faculty = faculty;
			this.render(faculty);
			$('.disease .desc').html(res.disease);
			$('.hospital .desc').html(res.hospital);
		}).catch(error=>{
			console.log(error);
		})
	},

	render(faculty) {
		const icons = [
			require('../../images/icon/针筒.png'),
			require('../../images/icon/量杯.png'),
			require('../../images/icon/药.png'),
			require('../../images/icon/胶囊.png'),
			require('../../images/icon/直升机.png'),
			require('../../images/icon/烧杯.png'),
			require('../../images/icon/点滴.png'),
			require('../../images/icon/温度计.png')]
		this.$el.html(html({faculty,icons}))
	},
	gotoDoctorList(e){
		//h5自定义属性，用来确定section和row
		const section = $(e.currentTarget).attr('data-section');
		const row = $(e.currentTarget).attr('data-row');
		const title =this.faculty[section].secondList[row].name;
		const secondFacultyId = this.faculty[section].secondList[row].secondFacultyId
		//通过redux暂时保存title和secondFacultyId,下一页请求使用
		Store.dispatch(doctorList({title,secondFacultyId}));
		// 如果传递参数有中文，不进行encodeURI编码的话，路由会被调用两次，一次传递过去的是
		// 正常汉字，一次传递过来的是编码之后的字符 
		//编码两次，在接收处解码一次，可以解决接受到乱码的问题
		appRouter.navigate('doctorList',{trigger:true});

		/*
			1.通过url传递参数
			2.通过redux传递参数
		*/
	}
});

module.exports = Doctor;