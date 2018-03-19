import html from './template.ejs'
import navigation from '@/components/navigation/navigation.ejs'
import './iframe.scss'

import {
	Toast,
	Loading
} from '@/components'

import {query} from '@/utils'

var Iframe = Backbone.View.extend({

        el: '#app',

        events: {
                'click .back' : 'back' 
        },

        initialize(params) {
                const title = decodeURI(query('title')) //解码为字符串类型了
                this.title = (title == 'null' ? document.title : title)
                this.uri = query('uri')
                this.backRouter = query('backRouter')
                console.log(this.backRouter)
                this.render();
        },

        render() {
                this.$el.html(navigation({title:this.title})+html({uri:this.uri}));
        },

        back(){
                //还需要重新编码一次
                appRouter.navigate(encodeURI(this.backRouter),{trigger:true})
        }
});

module.exports = Iframe;