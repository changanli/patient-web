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
        const timestamp = Date.parse(new Date()); //获取时间戳
        const accessToken = md5(phone + password + timestamp); //生成accessToken
        const userModel = new User({phone,password,accessToken});
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
 
module.exports = Router;