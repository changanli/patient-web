import html from './template.ejs'
import navigation from '@/components/navigation/navigation';
import './doctorList.scss';

import {
    render,
    query
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

import fetch from '@/utils/fetch';

var DoctorList = Backbone.View.extend({
	el: '#app',

	events: {
		'click .back': 'back'
	},

	initialize(params) {
		//编码两次，在接收处解码一次，可以解决接受到乱码的问题
		
		let secondFacultyId = query('secondFacultyId');
		fetch.get('/pv1/doctorList',{params:{
			secondFacultyId
		}}).then(res=>{
			const doctors = res.data.doctorList;
			if(doctors.length === 0){
				Toast({message:'暂无医生数据,请联系后台添加'});
			}
			this.render(decodeURI(query('title')),doctors);
			console.log(doctors);
		}).catch(error=>{

		})
	},

	render(title,doctors) {
		this.$el.html(navigation({title})+html({doctors}))
	},
	back(){
		appRouter.navigate('doctor',{trigger:true});
	}
});

module.exports = DoctorList;