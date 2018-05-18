import React,{Component} from 'react'
import {withRouter,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Logo from '../../components/logo/logo'
import { List, InputItem, WhiteSpace, WingBlank,Button,Radio } from 'antd-mobile';
import {register} from '../../redux/user.redux'
import './register.css'
import inputChange from '../../components/zlh-HOC/inputChange'

class Register extends Component{
  componentDidMount(){
    this.props.stateChange('type','genius');
  }
  login(){
    this.props.history.push('/login');
  }
  registerBtn(){
    this.props.register(this.props.state);
  }
  render(){
    const RadioItem = Radio.RadioItem;
    const radioData=[{"type":"genius","label":"牛人"},{"type":"boss","label":"BOSS"}];
    return(
      <div className="register">
        {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
        <Logo></Logo>
        {this.props.user.msg?<p className="msgTitle">{this.props.user.msg}</p>:null}
        <List renderHeader={()=>'注册'}>
          <InputItem
            clear
            placeholder="请输入用户名"
            onChange={v=>this.props.stateChange('userid',v)}
          >用户名</InputItem>

          <InputItem
            type="password"
            clear
            placeholder="请输入密码"
            onChange={v=>this.props.stateChange('password',v)}
          >密码</InputItem>

          <InputItem
            type="password"
            clear
            placeholder="再次输入密码"
            onChange={v=>this.props.stateChange('repeatPwd',v)}
          >确认密码</InputItem>
        </List>
        <List renderHeader={()=>'选择身份'}>
          {
            radioData.map((v,i)=>{
              return (
                <RadioItem
                  key={i}
                  checked={this.props.state.type===v.type}
                  onChange={()=>this.props.stateChange('type',v.type)}
                >
                  {v.label}
                </RadioItem>
              )
            })
          }
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button onClick={()=>{this.registerBtn()}} type="primary">注册</Button>
          <WhiteSpace />
          <Button onClick={()=>{this.login()}} type="default">返回登陆</Button>
        </WingBlank>
      </div>
    )
  }
}

Register = withRouter(connect(state=>({
  user:state.userReducer
}),
{
  register
})(Register));
Register = inputChange(Register);
export default Register