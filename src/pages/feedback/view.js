import html from './template.ejs'

import {
	render
} from '@/utils'
import {
	Toast,
	Loading
} from '@/components'

var Feedback = Backbone.View.extend({
	el: '#app',

	events: {
        'click .back': 'back',
        'click #commit' : 'commit'
	},

	initialize() {
		this.render();

		console.log(Store.getState())
	},

	render() {
        this.$el.html(html())
        const total = 200;
        $('#contact').val(Store.getState().user.phone)
        $('#words').html(0)
        $('#total').html(total)
        $('#opinion').keyup(
            function(){
                const num = $(this).val().length;
                const remain = total - num;
                if(remain < 0){
                    $(this).val(this.content);
                    return
                }
                this.content = $(this).val();
                $('#words').html(num)
            }
        );
	},

	back(){
		appRouter.navigate('mine',{trigger:true})
    },
    commit(){
        if($('#opinion').val().length<6){
            Toast({message:'请输入多于6个字'})
            return
        }
        weui.toast('提交成功', {
            duration: 1000,
            className: 'custom-classname',
            callback: function(){ appRouter.navigate('mine',{trigger:true})}
        });
    }
});

module.exports = Feedback;