import html from './health/template.ejs'
import addReportHtml from './health/addReport.ejs'
import noHealthRecordHtml from './health/noHealthRecord.ejs'
import navigation from '@/components/navigation/navigation'

import './healthRecord.scss';

import {
	render,
	query
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

import fetch from '@/utils/fetch';

var HealthRecord = Backbone.View.extend({
	el: '#app',
	events: {
		'click .back': 'back',
		'click #addHealthRecord' : 'addHealthRecord',
		'click #commit' : 'editPatient',
		'click .health-info' : 'changeInfo',
		'click .weui-navbar__item' : 'changeTab',
		'click #addBirthDate' : 'chooseBirthDate',
		'click #addRelation' : 'chooseRelations',
		'click #male' : 'chooseSex',
		'click #female' : 'chooseSex',
		'click #chooseHeight' : 'chooseHeight',
		'click #chooseWeight' : 'chooseWeight',
		'click #isMarried' : 'isMarried',
		'click #sensitiveHistory' : 'isSensitiveHistory',
	
		// 生活习惯
		'click #isSmoking' : 'isSmoking',
		'click #isDrinking' : 'isDrinking',
		'click #isEatingNormal,#isSleepingNormal,#isIncontinenceNormal,#isAnodyneNormal' : 'lifeIsNormal',
	},
	initialize() {
		this.loadPatients();
	},
	render(data) {
		console.log(data);
		this.$el.html(navigation({title:'健康档案'})+html({data:data}))
	},
	loadPatients(){
		const {userId} = Store.getState().user;
		fetch.get('/pv1/patient_profile',{
			params:{
				userId
			}
		}).then(res=>{
			const patients = res.data;
			console.log(patients);
			if(patients.length == 0){
				this.type = 0;
				this.$el.html(navigation({title:'健康档案'})+noHealthRecordHtml());
			}else{
				this.type = 1;
				this.patient = patients[0];
				
				this.patient.age = this.calculateAge();
				this.render(patients[0]);
			}
		}).catch(error=>{
			console.log(error)
		})
	},
	editPatient(){
		if(this.type == 0){
			this.addPatientInfo()
		}else{
			this.updatePatient();
		}
	},
	addPatientInfo(){
		const {userId} = Store.getState().user;
		const relation = $('#relation').html();
		const name = $('#name').val();
		const sex = $('#male').prop('checked') ? '男' : '女';
		const birthday = $('#date').html();
		const phone = $('phone').val();
		const params = {userId,relation,name,sex,birthday,phone}
		if(relation == "请选择"){
			Toast({message:'请选择与您的关系'})
			return
		}
		if(name == ""){
			Toast({message:'请输入姓名'})
			return
		}
		if(birthday == '请选择'){
			Toast({message:'请选择出生日期'})
			return
		}
		if(phone == ""){
			Toast({message:'请输入手机号码'})
			return
		}
		fetch.post('/pv1/addPatient',params).then(res=>{
			
			if (res.data.code == 0){
				this.loadPatients();
			}
		}).catch(error=>{
			console.log(error);
		})
	},
	updatePatient(){
		//updatePatient
		const {userId} = Store.getState().user;
		const relation = $('#relation').html();
		const name = $('#name').val();
		const sex = $('#male').prop('checked') ? '男' : '女';
		const birthday = $('#date').html();
		const phone = $('#phone').val();
		const params = {userId,relation,name,sex,birthday,phone,"_id":this.patient._id};
		fetch.post('/pv1/updatePatient',params).then(res=>{
			if (res.data.code == 0){
				this.loadPatients();
			}
		}).catch(error=>{
			console.log(error);
		})
	},
	back(){
		if($('#addReport').css('display') === 'block'){
			this.$el.html(this.oldHtml);
			return;
		}
		appRouter.navigate('mine',{trigger:true});
	},
	changeInfo(){
		//这样可以记录住用户的已经选择好的信息
		//返回后，信息依然显示。
		//同时保证了修改档案信息界面不记录用户已经填写的信息。
		//这样感觉比通过控制显示隐藏要好些。
		this.oldHtml = this.$el.html()
		this.$el.html(navigation({title:'修改档案信息'})+addReportHtml())
		$('#relation').html(this.patient.relation);
		$('#name').val(this.patient.name);
		$('#date').html(this.patient.birthday);
		
		$('#male').prop('checked',(this.patient.sex == '男') ? 'checked' : '')

		$('#female').prop('checked',(this.patient.sex == '男') ? '' : 'checked')

		$((this.patient.sex == "男") ? '#male' : '#female')
		.siblings()
		.removeClass('weui-icon-circle')
		.addClass('weui-icon-success')

		$((this.patient.sex == "男") ? '#female' : '#male')
		.siblings()
		.removeClass('weui-icon-success')
		.addClass('weui-icon-circle')

		$('#phone').val(this.patient.phone);
	},
	calculateAge(){
		const birthday = this.patient.birthday;
		const currentDate = new Date();
		const cYear = currentDate.getFullYear();
		const cMonth = currentDate.getMonth()+1;
		const cDate = currentDate.getDate();

		const bYear = birthday.substr(0,4);
		const bMonth = birthday.substr(5,1);
		const bDate = birthday.substr(7,2);
		let age = ""
		if((cYear - bYear)==0){
			if((cMonth-bMonth)==0){
				age = `${cDate - bDate}天`
			}else{
				age = `${cMonth - bMonth}月`
			}
		}else{
			age = `${cYear - bYear}岁`
		}

		return age;
	}
	,
	changeTab(e){
		const that = e.target;
		$(that).addClass('weui-bar__item_on').siblings().removeClass('weui-bar__item_on')
		const id = $(that).attr('data-id');
		$(`#${id}`).css('display','block').siblings().css('display','none');
	},
	addHealthRecord(){
		this.oldHtml = this.$el.html();
		this.$el.html(navigation({title:'添加档案信息'})+addReportHtml())
	},
	chooseBirthDate(){
		const currentDate = new Date();
		const year = currentDate.getFullYear()
		const month = currentDate.getMonth()+1
		const day = currentDate.getDate()
		weui.datePicker({
			start: 1900,
			end: currentDate,
			defaultValue:[year,month,day],
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				const date = `${result[0].value}-${result[1].value}-${result[2].value}`;
				$('#date').html(date);
			},
			id:'date'
		});
	},
	chooseRelations(){
		weui.picker([{
			label: '自己',
			value: 0
		}, {
			label: '配偶',
			value: 1
		}, {
			label: '父母',
			value: 2
		},{
			label: '子女 ',
			value: 3
		}, {
			label: '其他',
			value: 4
		}], {
			defaultValue: [0],
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				console.log(result[0].label);
				$('#relation').html(result[0].label);
			},
			defaultValue:[0],
			id:'relation'
		});
	},
	chooseSex(){

		if($('#male').prop('checked')){
			$('#male-icon').removeClass('weui-icon-circle').addClass("weui-icon-success")
			$('#female-icon').removeClass('weui-icon-success').addClass('weui-icon-circle')
		}else{
			$('#male-icon').addClass('weui-icon-circle').removeClass("weui-icon-success")
			$('#female-icon').addClass('weui-icon-success').removeClass('weui-icon-circle')
		}
	},
	chooseHeight(){
		let heights = []
		for(let i = 1; i<300;i++){
			heights.push(`${i}cm`)
		}
		
		weui.picker(heights, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#height').html(result[0].label);
			},
			defaultValue:[150],
			id: 'height'
		});
	
	},
	chooseWeight(){
		let weights = []
		for(let i = 1; i<150;i++){
			weights.push(`${i}kg`)
		}
		weui.picker(weights, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#weight').html(result[0].label);
			},
			defaultValue:[75],
			id: 'weight'
		});
	},
	isMarried(){
		let datas = [
			{value:0,label:'未婚'},
			{value:1,label:'已婚'}
		]
		weui.picker(datas, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#marry').html(result[0].label);
			},
			defaultValue:[0],
			id:'marry'
		});
	},
	isSensitiveHistory(){
		let datas = [{value:0,label:'是'},{value:1,label:'否'}];
		weui.picker(datas, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#sensitive').html(result[0].label);
			},
			defaultValue:[1],
			id:'sensitive'
		});
	},
	isSmoking(){
		let datas = [{value:0,label:'是'},{value:1,label:'否'},{value:2,label:'已戒烟'}];
		weui.picker(datas, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#smoke').html(result[0].label);
			},
			defaultValue:[1],
			id:'smoke'
		});
	},
	isDrinking(){
		let datas = [{value:0,label:'从不'},{value:1,label:'偶尔'},{value:2,label:'经常'},{value:3,label:'每天'}];
		weui.picker(datas, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$('#drink').html(result[0].label);
			},
			defaultValue:[0],
			id:'drink'
		});
	},
	lifeIsNormal(that){
		const tag = $(that.currentTarget).attr('data-tag');
		
		let datas = [{value:0,label:'是'},{value:1,label:'否'}]
		weui.picker(datas, {
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				$(`#${tag}`).html(result[0].label)
			},
			defaultValue:[0],
			id:`${tag}`
		});
	}

});

module.exports = HealthRecord;