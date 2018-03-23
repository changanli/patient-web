import html from './health/template.ejs'
import addReportHtml from './health/addReport.ejs'
import noHealthRecordHtml from './health/noHealthRecord.ejs'
import navigation from '@/components/navigation/navigation'

import './healthRecord.scss';

import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

var HealthRecord = Backbone.View.extend({
	el: '#app',
	events: {
		'click .back': 'back',
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
		this.render();
	},

	render() {
		this.$el.html(navigation({title:'健康档案'})+html())
	},

	back(){
		appRouter.navigate('mine',{trigger:true});
	},
	chooseBirthDate(){
		weui.datePicker({
			start: 1990,
			end: new Date().getFullYear(),
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				const date = `${result[0].value}-${result[1].value}-${result[2].value}`;
				$('#date').html(date);
			}
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
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
				console.log(result[0].label);
				$('#relation').html(result[0].label);
			}
		});
	},
	chooseSex(){
		$('#male-icon').toggleClass('weui-icon-circle').toggleClass("weui-icon-success")
		$('#female-icon').toggleClass('weui-icon-success').toggleClass('weui-icon-circle')
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
			}
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
			}
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
			}
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
			}
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
			}
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
			}
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
			}
		});
	}

});

module.exports = HealthRecord;