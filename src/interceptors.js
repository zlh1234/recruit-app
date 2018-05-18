import myAxios from './myAxios'
import {Toast} from 'antd-mobile'
//请求拦截器
myAxios.interceptors.request.use(config=>{
  Toast.loading("Loading...",0);
  return config;
},error=>{

  return Promise.reject(error);
});

//响应拦截器
myAxios.interceptors.response.use(config=>{
  Toast.hide();
  return config;
},error=>{

  return Promise.reject(error);
});