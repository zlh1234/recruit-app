
import myAxios from '../myAxios'
import {getRedirectPath} from '../util'
const ALL_SUCCESS = 'ALL_SUCCESS';
const ERROR_MESSAGE = 'ERROR_MESSAGE';
const LOAD_DATA = 'LOAD_DATA';
const UNLOGIN = 'UNLOGIN';
//回到登陆的时候还原state
const LOADLOGIN = 'LOADLOGIN';
const initState = {
  redirectTo:'',
  msg:'',
  userid:'',
  type:''
}
//reducer
export function userReducer(state=initState,action){
  switch(action.type){
    case ALL_SUCCESS:
      return Object.assign({},state,{redirectTo:getRedirectPath(action.payload),msg:'',...action.payload})
    case LOAD_DATA:
      return Object.assign({},state,{...action.payload})
    case ERROR_MESSAGE:
      return Object.assign({},state,{msg:action.msg})
    case UNLOGIN:
      return {...initState,redirectTo:action.goTo}
    case LOADLOGIN:
      return initState
    default:
      return state
  }
}

//action
function errMsg(str){
  return {"type":ERROR_MESSAGE,"msg":str}
}
function allSuccess(data){
  return {"type":ALL_SUCCESS,"payload":data}
}

//注册
export function register({userid,password,repeatPwd,type}){
  if(!userid || !password){
    return errMsg('用户名或者密码不能为空')
  }else if(password!==repeatPwd){
    return errMsg('两次密码不同')
  }else{
    return async dispatch=>{
      const res = await myAxios.post('user/register',{userid,password,type});
      if(res.status===200 && res.data.code===0){
        dispatch(allSuccess({userid,password,type,_id:res.data.data._id}));
      }else{
        dispatch(errMsg(res.data.msg));
      }
    }
  }
}

//登陆
export function login({userid,password}){
  if(!userid||!password){
    return errMsg('用户名或者密码不能为空')
  }
  return async dispatch=>{
    const res = await myAxios.post('user/login',{userid,password});
    if(res.status===200 && res.data.code===0){
      dispatch(allSuccess(res.data.data));
    }else{
      dispatch(errMsg(res.data.msg));
    }
  }
}

//信息完善
export function infoUpdata(data){
  return async dispatch=>{
    const res = await myAxios.post('/user/infoupdata',{...data});
    if(res.status===200 && res.data.code===0){
      dispatch(allSuccess(res.data.data));
    }else{
      dispatch(errMsg(res.data.msg));
    }
  }
}

//注销后清除redux
export function userReduxUnLogin(val){
  return {"type":UNLOGIN,"goTo":val}
}

//init
export function loadDataSuccess(data){
  return {"type":LOAD_DATA,"payload":data}
}

export function loadLogin(){
  return {type:LOADLOGIN}
}