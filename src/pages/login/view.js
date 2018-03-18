import html from './template.ejs'

import {
    local,
    localRemove
} from '@/utils'

import {signIn} from '@/redux/actions/user';

import {
	Toast,
	Loading
} from '@/components'

var Login = Backbone.View.extend({
	el: '#app',

	events: {
        'click #login' : 'login',
        'click .clear' : 'clear',
        'click input[type=checkbox]' : 'selected',
	},

	initialize() {
        this.render();
	},

	render() {
        this.isRememberPwd = local('rememberPwd')
        this.$el.html(html())
        if(this.isRememberPwd){
            let phone = local('phone');
            let password = local('password');
            $("input[type=tel]").val(phone);
            $("input[type=password]").val(password);
            $(".selected-icon").addClass("selected");
        }
    },
    selected(){
        $(".selected-icon").toggleClass("selected");
        this.isRememberPwd = !this.isRememberPwd;
        local('rememberPwd',this.isRememberPwd)
        //如果不记住密码，则删除密码
        if(this.isRememberPwd === false) {
            localRemove('password')
        }
    },
    clear(){
        $("input[type=tel]").val("");
    },
    login(){
        let phone = $("input[type=tel]").val()
        let password = $("input[type=password]").val();
        if (!this.validate(phone,password)){
           return;
        }

        Store.dispatch(signIn({phone,password})).then(res=>{
            this.isRememberPwd ? local('password',password) : localRemove('password')
            appRouter.navigate('home',true);
        }).catch(error=>{

        })
    },
    validate(phone,password){
        if (phone === "") {
            Toast({message:"请输入手机号"});
            return false;
        }else if (!(/^1[0-9]{10}$/.test(phone))){
            Toast({message:"手机号格式不正确，请重新输入!"});
            return
        }
        else if (password === ""){
            Toast({message:"请输入密码"});
            return false ;
        }else if (password.length<6 || password.length > 18) {
            Toast({message:"请输入6-18位的密码"});
            return false
        }
        return true;
    }
});

module.exports = Login;