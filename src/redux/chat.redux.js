
import myAxios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8088');

//读取列表
const LIST_MSG = 'LIST_MSG';
//读取
const RECV_MSG = 'RECVMSG';
//标记已读
const READ_MSG = 'READMSG';
//注销
const REMOVE_LIST = 'REMOVE_LIST';
//解决重复监听
const UPDATE_LIST = 'UPDATE_LIST';

const initState = {
  chatMsg:[],
  users:{},
  unRead:0,
  isRecv:true
}

export function chatReducer(state=initState,action){
  switch(action.type){
    case LIST_MSG:
      let b = action.payload.data.filter(v=>!v.read && v.to===action.payload.now_id).length;
      return {...state,chatMsg:action.payload.data,users:action.payload.users,unRead:b}
    case RECV_MSG:
      let n = action.payload.data.to===action.payload.now_id ? 1 : 0;
      return {...state,chatMsg:[...state.chatMsg,action.payload.data],unRead:state.unRead+n,isRecv:false}
    case READ_MSG:
      let a = state.chatMsg.map(v=>v.from===action.payload.fromID&&v.to===action.payload.now_id?{...v,read:true}:v);
      return {...state,chatMsg:a,unRead:state.unRead-action.payload.num}
    case REMOVE_LIST:
      return {...initState,isRecv:false}
    case UPDATE_LIST:
      return {...state,isRecv:false}
    default:
      return state
  }
}
//action
//获取所有
function msgList(data,users,now_id){
  return {type:LIST_MSG,payload:{data,users,now_id}}
}
export function getMsgList(now_id){
  return async (dispatch,getState)=>{
    const res = await myAxios.get('/user/getmsglist');
    if(res.data.code===0){
        dispatch(msgList(res.data.data,res.data.users,now_id));
    }
  }
}
//发送
export function sendMsg({from,to,msg}){
  return dispatch=>{
    socket.emit('sendMessage',{from,to,msg});
  }
}

//接收消息
function msgRecv(data,now_id){
  return {type:RECV_MSG,payload:{data,now_id}}
}
export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvMessage',function(data){
      let now_id = getState().userReducer._id;
      if(now_id){
        dispatch(msgRecv(data,now_id));
      }
    })
  }
}

//标记已读
function readMsgListFn(fromID,now_id,num){
  return {type:READ_MSG,payload:{fromID,now_id,num}}
}
export function readMsg(fromID){
  return async (dispatch,getState)=>{
    const res = await myAxios.post('/user/readmsglist',{fromID});
    if(res.data.code===0){
      let now_id = getState().userReducer._id;
      dispatch(readMsgListFn(fromID,now_id,res.data.num));
    }
  }
}

//注销
export function chatReduxUnLogin(){
  return {type:REMOVE_LIST}
}

//解决重复监听
export function actionsFilter(){
  return {type:UPDATE_LIST}
}