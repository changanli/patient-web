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
        'accessToken':{'type':String},
        'username':{'type':String},
        'avatar':{'type':String},// 头像
        'score':{'type':Number}, // 积分
        'balance':{'type':Number},   // 账户余额
        'discount':{'type':Number}, //优惠券
        'signTime' : {'type':String}, //上一次签到的日期 年月日
        'createTime':{'type':String}
    },
    doctor:{
        'doctorId':{type:String},
        'name':{type:String},
        'fullGrade':{type:String},
        'specialize':{type:String},
        'isCaseOpened':{type:String},
        'isPhoneOpened':{type:String},
        'isBookingOpened':{type:String},
        'isOpenConsultation':{type:String},
        'isOpenRegistration':{type:String},
        'hospitalName':{type:String},
        'hospitalFacultyName':{type:String},
        'hospitalFacultyFullName':{type:String},
        'logoUrl':{type:String},
        'spaceId':{type:String},
        'onLineTime':{type:String},
        'goodVoteCount':{type:String},
        'casePostCount2Week':{type:String},
        'isServiceStar':{type:String},
        'isPhoneOnline':{type:String},
        'voteCnt':{type:String},
        'voteCntIn2Years':{type:String},
        'recommendIndex':{type:String},
        'recommendStatus':{type:String},
        'status4RankShow':{type:String},
        'rankType':{type:String},
        'effect':{type:String},
        'attitude':{type:String},
        'isOpenClinic':{type:String},
        'replyRate24H':{type:String},
        'isShowAppointmentTag':{type:String},
        'productPriceList':[{
            'productType':{type:String},
            'price': {type:String},
            'isOpen': {type:String},
            'text' : {type:String},
            'isConsult' : {type:String},
            'isShowPlatformCharge' : {type:String}
        }],
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