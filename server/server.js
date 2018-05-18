
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');
const userRouter = require('./api/user');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection',function(socket){
  console.log('user connect success');
  socket.on('sendMessage',function(data){
    const {from,to,msg} = data;
    const chatId = [from,to].sort().join('_');
    console.log(chatId);
    Chat.create({chatId,from,to,content:msg},function(err,doc){
        io.emit('recvMessage',Object.assign({},doc._doc));
    })
  });
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);

server.listen(8088,function(){
  console.log('Listen success 8088!');
});