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

import {getDoctorList} from '@/redux/actions/doctor';

var DoctorList = Backbone.View.extend({
	el: '#app',

	events: {
		'click .back': 'back',
		'click .doctor_info' : 'doctorDetail'
	},

	initialize(params) {
	
		// 编码两次，在接收处解码一次，可以解决接受到乱码的问题
		// let secondFacultyId = query('secondFacultyId');
		// const title = decodeURI(query('title'));
		
		//这样从医生详情页返回时依然可以获取参数加载医生列表
		//刷新页面会导致Store被重置,可以选择将secondFacultyId,title存储在本地，然后在加载到Store
		//然后在显示出来，待实现
		const {secondFacultyId,title} = Store.getState().doctor;
		Store.dispatch(getDoctorList({params:{
			secondFacultyId
		}})).then(res=>{
			const doctors = res;
			if(doctors.length === 0){
				Toast({message:'暂无医生数据,请联系后台添加'});
			}
			this.render(title,doctors);
		}).catch(error=>{

		})
	},

	render(title,doctors) {
		this.$el.html(navigation({title})+html({doctors}))
	},
	back(){
		appRouter.navigate('doctor',{trigger:true});
	},
	doctorDetail(e){
		const doctorId = $(e.target).attr('data-doctorId');
		appRouter.navigate(`doctorDetail?doctorId=${doctorId}`,{trigger:true});
	}
});

module.exports = DoctorList;