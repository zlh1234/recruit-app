
import myAxios from '../myAxios'

const GET_LIST = 'GET_LIST';
const REMOVE_LIST = 'REMOVE_LIST';
const initState = {
  userList:[]
}

export function listReducer(state=initState,action){
  switch(action.type){
    case GET_LIST:
      return Object.assign({},state,{userList:action.payload})
    case REMOVE_LIST:
      return initState
    default:
      return state
  }
}

//action
function getListFn(data){
  return {type:GET_LIST,payload:data}
}
export function getList(str){
  return async dispatch=>{
    const res = await myAxios.get(`/user/getlist?type=${str}`);
    if(res.status===200){
      dispatch(getListFn(res.data.data));
    }
  }
}

export function listReduxUnLogin(){
  return {type:REMOVE_LIST}
}