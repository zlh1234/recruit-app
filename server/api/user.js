
const express = require('express');
const Router = express.Router();
const model = require('../model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const myUtils = require('../myUtil');

const _filter = {"password":0,__v:0};


Router.get('/aaabbb',(req,res)=>{
  // Chat.find({},function(err,doc){
  //   return res.json(doc);
  // })
  // Chat.remove({},function(err,doc){ return res.json(doc) });
});

Router.get('/list',(req,res)=>{
  // User.remove({},function(e,d){});
  User.find({},function(err,doc){
    return res.json(doc);
  })
});

//已读聊天
Router.post('/readmsglist',(req,res)=>{
  const user_id = req.cookies.userid;
  const {fromID} = req.body;
  console.log('------------------------------------------------');
  console.log(req.body);
  console.log(user_id);
  Chat.update({from:fromID,to:user_id},{'$set':{read:true}},{multi:true},(err,doc)=>{
    if(!err){
      console.log('doc:');
      console.log(doc);
      return res.json({code:0,num:doc.nModified})
    }
    return res.json({code:1,msg:'修改失败'})
  })
})

//获取聊天列表
Router.get('/getmsglist',(req,res)=>{
  const user = req.cookies.userid;
  User.find({},function(e,userDoc){
    let users = {};
    userDoc.forEach(v=>{
      users[v._id]={name:v.userid,avatar:v.avatar,_id:v._id}
    });
    Chat.find({'$or':[{"from":user},{"to":user}]},function(err,doc){
      if(!err){
        res.json({code:0,data:doc,users:users})
      }
    });
  });
})

//获取用户列表
Router.get('/getlist',(req,res)=>{
  const {type} = req.query;
  User.find({type},function(err,doc){
    if(err) return res.json({code:1,msg:"未知错误"})
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
});

Router.get('/info',(req,res)=>{
  //用户有没有cookie
  const {userid} = req.cookies;
  if(!userid){
    return res.json({"code":1,"msg":"请先登陆"});
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"未知错误"})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
    return res.json({code:1,msg:"未知错误"})
  })
});

//接收注册信息
Router.post('/register',(req,res)=>{
  const {userid,password,type} = req.body;
  User.findOne({userid},function(err,doc){
    if(doc){
      return res.json({"code":1,"msg":"用户名已存在"})
    }
    const userModel = new User({userid,type,password:myUtils.md5Password(password)});
    userModel.save(function(e,d){
      if(e){
        return res.json({"code":1,"msg":"未知错误"})
      }
      const {userid,type,_id} = d;
      res.cookie("userid",_id);
      return res.json({"code":0,data:{userid,type,_id}})
    });
  })
});

//完善信息
Router.post('/infoupdata',(req,res)=>{
  const {userid} = req.cookies;
  if(!userid){
    return res.json({code:1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid,body,function(err,doc){
    if(err){
      return res.json({"code":1,"msg":"未知错误"})
    }
    const data = Object.assign({},{
      userid:doc.userid,
      type:doc.type
    },body);
    return res.json({code:0,data});
  })
});

//登陆
Router.post('/login',(req,res)=>{
  const {userid,password} = req.body;
  User.findOne({userid,password:myUtils.md5Password(password)},_filter,function(err,doc){
    if(!doc) {
      return res.json({code:1,msg:"用户名或者密码错误"})
    }
    res.cookie("userid",doc._id);
    return res.json({code:0,data:doc})
  });

})

module.exports = Router