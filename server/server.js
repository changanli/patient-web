const express = require('express'); //express开发web接口
const fs = require('fs');
const bodyPaeser = require('body-parser'); // 引入body-parser post请求要借助body-parser模块
const cookieParser = require('cookie-parser'); //引入模块
const userRouter = require('./user');
const path = require('path');
const multer = require('multer'); //接收图片
// 新建app
const app = express();
// 配合Express使用
const server = require('http').Server(app);
const io = require('socket.io')(server);
const model = require('./model');
const User = model.getModel('user');
const upload = multer({dest:'./uploads'}) //定义图片上传时的临时目录
//使用中间件
app.use(cookieParser());
app.use(bodyPaeser.json());
app.use('/user',userRouter);
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')
    || req.url.startsWith("/g1/")
    || req.url.startsWith("/d1/")){
        return next();
    }
    if(req.url.startsWith('/pv1/')){
        return next();
    }
    if(req.url.startsWith('/static/')||req.url.startsWith('/uploads/')){
        const str = '.'+String(req.path)
        return res.sendFile(path.resolve(str));
    }
    
    return res.sendFile(path.resolve('build/index.html'));
})
app.use('/',express.static(path.resolve('build')));

app.post('/pv1/upload',upload.single('upfile'),function(req,res,next){
    const newFilePath = 'uploads/'+ Date.parse(new Date()) + req.file.originalname
    fs.rename(req.file.path,newFilePath,function(err){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        return res.status(200).json({code:0,'img':newFilePath});
    })
   
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
});
app.get('/pv1/home',function(req,res){
    const {userId} = req.query;
    const accessToken = req.header('accessToken')
    User.findOne({'_id':userId,accessToken},function(err,doc){
        if(err){
            return res.status(500).json('服务器内部错误');
        }
        if(!doc){
           return res.status(401).json('会话过期,请重新登录');
        }
        return res.status(200)
        .json({
            'banners':[
                {'link':'http://www.cnlod.net','img':'/static/banner1.jpg'},
                {'link':'http://www.cnlod.net','img':'/static/banner2.jpg'},
                {'link':'http://www.cnlod.net','img':'/static/banner3.jpg'}
            ]
        });
        
    })
   
})


// 启动app,监听9090
//加入了socket.io之后使用server监听，否则会报跨域的错误
server.listen(9090,function(){
    console.log('Node app is running on port:9090');
});

/*
  Socket.IO 由两部分组成： websocket框架
  一个服务端用于集成 (或挂载) 到 Node.JS HTTP 服务器： socket.io
  一个加载到浏览器中的客户端： socket.io-client
    io.on 监听事件
    io.emit 触发事件
*/ 

/*
https://segmentfault.com/a/1190000009663833
    cookie-parser 在用 express 生成器构建项目时自动安装的，
    它的作用就是设置，获取和删除 cookie
    var cookieParser = require('cookie-parser');    //引入模块
    app.use(cookieParser());        //挂载中间件，可以理解为实例化

    res.cookie(name, value [, options]); //创建cookie

    var cookies = req.cookies       // 获取cookie集合
    var value = req.cookies.key    // 获取名称为key的cookie的值

    res.clearCookie(name [, options]) //删除cookies

    上文所写 cookie 的各种操作，都是没有经过签名的。签名可以提高安全性。下面是使用签名生成 cookie 的方法，大同小异，修改上文即可

    app.use(cookieParser('ruidoc')); # 需要传一个自定义字符串作为secret
    # 创建cookie的options中，必填 signed: true
    res.cookie(name, value, {    
        'signed': true
    });
    var cookies = req.signedCookies      # 获取cookie集合
    var value = req.signedCookies.key    # 获取名称为key的cookie的值
    提示：使用签名时这三处必须一起修改，只改一处是无效的！
*/

/*
    body-parser中间件
    post请求要借助body-parser模块。使用后，将可以用req.body得到参数
    安装:
        npm install body-parser
    导入:
    var bodyPaeser =require('body-parser')
    使用中间件:
        app.use(bodyParser.urlencoded({ extended: false }));
*/
/*
    在package.json中添加 "proxy":"http://localhost:9093"，解决跨域问题
*/ 

/*
    node调试工具:nodemon

    nodemon 的安装：
        npm install -g nodemon
    安装完 nodemon 后，就可以用 nodemon 来代替 node 来启动应用：
    nodemon [project] [port]
    可以运行 debug 模式：
     nodemon --debug ./server.js 80

*/ 