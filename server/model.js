
const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/recruit";

mongoose.connect(DB_URL);

const models = {
  user:{
    "userid":{"type":String,"require":true},
    "password":{"type":String,"require":true},
    "type":{"type":String,"require":true},//0---牛人，1---BOSS
    "avatar":{"type":String},//头像
    "desc":{"type":String},//简介
    //职位名，牛人--要找的职位，BOSS--要招聘的职位
    "title":{"type":String},
    //如果是BOSS
    "company":{"type":String},
    "money":{"type":String}
  },
  chat:{
    'chatId':{type:String,require:true},
    'from':{type:String,require:true},
    'to':{type:String,require:true},
    'content':{type:String,require:true,default:''},
    read:{type:Boolean,default:false},
    'createTime':{type:String,default:new Date().getTime()}
  }
}

for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}