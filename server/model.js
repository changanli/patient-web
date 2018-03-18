const mongoose = require('mongoose');
// 链接mongodb,并且使用my-react这个集合
const DB_URL = 'mongodb://localhost:27017/patient'
mongoose.connect(DB_URL);
/*
1.安装mongodb
brew install mongodb
2.有时候需要手动启动mongodb
mongod --config /usr/local/etc/mongod.conf
*/ 
const models = {
    user:{
        'phone':{type:String,'require':true},
        'password':{type:String,'require':true},
        // 头像
        avatar:{'type':String},
        // 个人简介
        'desc':{'type':String},
        // 职位名称
        'title':{'type':String},
        'accessToken':{'type':String},
    }
};

for(let m in models){
    // 类似于mysql的表 mongo里有文档、字段的概念，
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}