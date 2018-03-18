import html from './template.ejs'
import navigation from '@/components/navigation/navigation.ejs'

import {
	Toast,
	Loading
} from '@/components'

var Iframe = Backbone.View.extend({
        el: '#app',

        events: {
                'click .back' : 'back' 
        },

        initialize(params) {
                this.title = params[0];
                this.render();
        },

        render() {
                this.$el.html(navigation({title:this.title})+html());
        },

        back(){
                appRouter.navigate('register/注册',{trigger:true})
        }
});

module.exports = Iframe;