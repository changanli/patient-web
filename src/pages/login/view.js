import html from './template.ejs'

import {
    local,
    localRemove,
} from '@/utils'

import {
    REMEMBERPWD,
    USER_PHONE,
    PASSWORD
} from '@/utils/const.js'

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
        'click .register' : 'register',
        'click .forgetPwd' : 'forgetPwd'
	},

	initialize() {
        this.render();
	},

	render() {
        this.isRememberPwd = local(REMEMBERPWD)
        this.$el.html(html())
        let phone = local(USER_PHONE);
        console.log(`手机号:${phone}`)
        $("input[type=tel]").val(phone);
        if(this.isRememberPwd){
            let password = local(PASSWORD);
            $("input[type=password]").val(password);
            $(".selected-icon").addClass("selected");
        }
    },
    selected(){
        $(".selected-icon").toggleClass("selected");
        this.isRememberPwd = !this.isRememberPwd;
        local(REMEMBERPWD,this.isRememberPwd)
        //如果不记住密码，则删除密码
        if(this.isRememberPwd === false) {
            localRemove(PASSWORD)
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
            if(this.isRememberPwd){
                local(PASSWORD,password)
            }else{
                localRemove(PASSWORD)
            }
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
    },
    register(){
        //编码两次，在接收处解码一次，可以解决接受到乱码的问题
        // 如果传递参数有中文，不进行encodeURI编码的话，路由会被调用两次，一次传递过去的是
		// 正常汉字，一次传递过来的是编码之后的字符 
        appRouter.navigate(`register?title=${encodeURI(encodeURI("注册"))}`,{trigger:true})
    },
    forgetPwd(){
         //编码两次，在接收处解码一次，可以解决接受到乱码的问题
         // 如果传递参数有中文，不进行encodeURI编码的话，路由会被调用两次，一次传递过去的是
		// 正常汉字，一次传递过来的是编码之后的字符 
         appRouter.navigate(`register?title=${encodeURI(encodeURI("忘记密码"))}`,{trigger:true})
    }
});

module.exports = Login;