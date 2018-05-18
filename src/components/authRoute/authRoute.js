
import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import myAxios from '../../myAxios'
import {loadDataSuccess} from '../../redux/user.redux'
class AuthRoute extends React.Component{
  componentDidMount(){
    const { history,location,loadDataSuccess } = this.props;
    const pageFliter = ['/login','/register'];
    if(pageFliter.indexOf(location.pathname)!==-1){
      return null
    }else{
      myAxios.get('/user/info')
        .then(res=>{
          if(res.status === 200){
            if(res.data.code===0){
              //有登陆信息
              loadDataSuccess(res.data.data);
            }else{
              //没有登陆信息
              history.push('/login');
            }
          }
        })
        .catch(err=>{
          console.log(err);
        });
    }
  }
  render(){
    return null
  }
}


export default withRouter(connect(state=>({

}),
{
  loadDataSuccess
})(AuthRoute))