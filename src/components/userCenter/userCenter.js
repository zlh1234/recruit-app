import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Result,Modal, WhiteSpace, List,WingBlank,Button } from 'antd-mobile';
import browserCookies from 'browser-cookies'
import {userReduxUnLogin} from '../../redux/user.redux'
import {listReduxUnLogin} from '../../redux/list.redux'
import {chatReduxUnLogin} from '../../redux/chat.redux'
class UserCenter extends Component{
  unLogin(){
    Modal.alert('退出','确定要退出吗？',[
      { text: '取消', onPress: () => console.log('取消被点击了') },
      { text: '确定', onPress: () => {
        browserCookies.erase('userid');
        this.props.userReduxUnLogin('/login');
        this.props.listReduxUnLogin();
        this.props.chatReduxUnLogin();
        this.props.history.push('/login');
      }}
    ]);
  }
  render(){
    const user = this.props.user;
    return user.userid ? (
      <div className="userInfo">
        <Result
          img={<img style={{width:60,height:60}} src={require(`../../img/${user.avatar}.jpg`)} alt="头像"/>}
          title={user.userid}
          message={user.type==='boss'?<div>{user.company}</div>:null}
        />
        <List renderHeader={()=>'详细信息'}>
          <List.Item multipleLine>
            <div>{user.type==='boss'?'招聘职位:':'期望工作:'}{user.title}</div>
          </List.Item>
          {
            user.type==='boss'?<List.Item>薪资:{user.money}</List.Item>:null
          }
          <List.Item multipleLine>
            <div>{user.type==='boss'?'职位要求:':'个人简介:'}</div>
            {user.desc.split('\n').map((v,i)=><List.Item.Brief style={{marginLeft:20}} key={i}>{v}</List.Item.Brief>)}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button onClick={()=>this.unLogin()}
            type="warning">
            退出登陆
          </Button>
        </WingBlank>
      </div>
    ) : <p></p>
  }
}

UserCenter = withRouter(connect(
  state=>({
    user:state.userReducer
  }),
  {
    userReduxUnLogin,
    listReduxUnLogin,
    chatReduxUnLogin
  }
)(UserCenter));
export default UserCenter