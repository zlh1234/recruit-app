
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter,Redirect} from 'react-router-dom'
import { List, InputItem, WhiteSpace, WingBlank,Button } from 'antd-mobile';
import {login,loadLogin} from '../../redux/user.redux';
import Logo from '../../components/logo/logo'
import './login.css'

import inputChange from '../../components/zlh-HOC/inputChange'

class Login extends Component{
  componentWillMount(){
    this.props.loadLogin();
  }
  loginBtn(){
    this.props.login(this.props.state);
  }
  register(){
    this.props.history.push('/register');
  }
  render(){
    return(
      <div className="login">
        {this.props.user.redirectTo&&this.props.user.redirectTo!=='/login' ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
        <Logo></Logo>
        {this.props.user.msg?<p className="msgTitle">{this.props.user.msg}</p>:null}
        <List renderHeader={()=>'登陆'}>
            <InputItem
              clear
              placeholder="请输入用户名"
              onChange={v=>{this.props.stateChange('userid',v)}}
            >用户名</InputItem>

            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              onChange={v=>{this.props.stateChange('password',v)}}
            >密码</InputItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button onClick={()=>{this.loginBtn()}} type="primary">登陆</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={()=>{this.register()}} type="default">去注册</Button>
        </WingBlank>
      </div>
    )
  }
}

Login = withRouter(connect(state=>({
  user:state.userReducer
}),{
  login,loadLogin
})(Login))

Login = inputChange(Login)

export default Login