const express = require('express');
const md5 = require('md5');
const Router = express.Router();
const mongoose = require('mongoose'); //mongoose操作mongodb
// brew install mongodb
const model = require('./model');
const User = model.getModel('user');
//登录
Router.post('/login',function(req,res){
    const {phone,password} = req.body;
    User.findOne({phone},function(err,doc){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        if(!doc){
           return res.status(400).json('该手机号还没有注册')
        }
        const timestamp = Date.parse(new Date()); //获取时间戳
        const accessToken = md5(phone + password + timestamp); //生成accessToken
        User.update({phone},{accessToken},function(e,d){
            if(e) {
                return res.status(500).json('服务器内部错误');
            }
            const {phone,_id:_id} = doc;
            const pwd = doc.password;
            if(password !== pwd) {
                return res.status(400).json('密码错误');
            }
            res.cookie('Authorization',accessToken);
            return res.status(200).json({code:0,phone,accessToken,'userId':_id});
        })
       
    })
});
//注册
Router.post('/register',function(req,res){
   const {phone,password} = req.body;

    User.findOne({phone},function(err,doc){
        if(doc){
            return res.status(400).json("用户名已经存在");
        }
        let date = new Date();
        const createTime = date.getFullYear() + 
        '年' + date.getMonth() + 
        '月' + date.getDate() + 
        '日 ' + date.getHours() + 
        ':' + date.getMinutes() +
        ':' + date.getSeconds()
        const timestamp = Date.parse(new Date()); //获取时间戳
        const accessToken = md5(phone + password + timestamp); //生成accessToken
        const score = 100; //注册成功后，奖励100积分
        const userModel = new User({phone,password,accessToken,score,avatar:'',balance:0,discount:0,username:'',signTime:'',createTime});
        userModel.save(function(e,d){
            if(e){
                return res.status(500).json('服务器内部错误');
            }
            const {phone,accessToken,_id:_id} = d;
            res.clearCookie('Authorization');
            res.cookie('Authorization',accessToken);
            return res.status(200).json({code:0,phone,accessToken,'userId':_id});
        })
    })
})

//重置密码
Router.post('/resetPassword',function(req,res){
    const {phone,password} = req.body;
 
     User.findOne({phone},function(err,doc){
         if(!doc){
             return res.status(400).json("该用户没有注册");
         }
         const timestamp = Date.parse(new Date()); //获取时间戳
         const accessToken = md5(phone + password + timestamp); //生成accessToken
         User.update({phone},{password,accessToken},function(e,d){
             if(e) {
                 return res.status(500).json('服务器内部错误');
             }
            res.clearCookie('Authorization');
            res.cookie('Authorization',accessToken);
            return res.status(200).json({code:0,phone,accessToken,'userId':doc._id});
         })
     })
 })
// 获取用户个人信息
 Router.get('/userInfo',function(req,res){
    const {userId} = req.query;
    const accessToken = req.header('accessToken')
    User.findOne({'_id':userId,accessToken},function(err,doc){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        if(!doc){
           return res.status(401).json('会话过期,请重新登录');
        }
        const date = new Date();
        const currentTime = date.getFullYear() + 
        '年' + date.getMonth() + 
        '月' + date.getDate() + 
        '日'
        const {phone,score,avatar,balance,discount,username,signTime} = doc;
        let isSign = (signTime == currentTime);
        return res.status(200).json({code:0,phone,score,avatar,balance,discount,username,isSign});
    })
 });
// 更新用户信息
 Router.post('/update',function(req,res){
    const {avatar,username,userId} = req.body;
    const accessToken = req.header('accessToken')
    User.findOne({'_id':userId,accessToken},function(err,doc){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        if(!doc){
           return res.status(401).json('会话过期,请重新登录');
        }
        var params = {};
        if(avatar != null) {
            params = {avatar};
        }else if (username != null){
            params = {username}
        }else if(username == null && avatar == null){
            return res.status(400).json('请传入参数');
        }else{
            params = {username,avatar};
        }
        User.update({'_id':userId},params,function(e,d){
            if(e) {
                return res.status(500).json('服务器内部错误');
            }
            User.findOne({'_id':userId,accessToken},function(er,dc){
                const {username,avatar,phone} = dc;
                console.log(username);
                return res.status(200).json({code:0,username,avatar,phone});
            })
        })
    })
 });

 //每日签到
 Router.post('/sign',function(req,res){
    //用户如果已经签到
    const {userId} = req.body;
    const accessToken = req.header('accessToken')
    User.findOne({'_id':userId,accessToken},function(err,doc){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        if(!doc){
           return res.status(401).json('会话过期,请重新登录');
        }
        let date = new Date();
        const currentTime = date.getFullYear() + 
        '年' + date.getMonth() + 
        '月' + date.getDate() + 
        '日'
        const {signTime,score} = doc;
        if(signTime == currentTime){
            return res.status(200).json({code:1,msg:"今天已经签到"});
        }else{
            //签到成功，积分加50
            User.update({'_id':userId},{'signTime':currentTime,'score':score+50},function(e,d){
                if(e) {
                    return res.status(500).json('服务器内部错误');
                }
                return res.status(200).json({code:0,score:score+50});
            })
          
        }
    })
 });
 
 Router.get('/delete',function(req,res){
    User.remove({},function(err,doc){
        if(!err){
            return res.json({resultCode:0,msg:"删除成功"})
        }
    });

})
module.exports = Router;