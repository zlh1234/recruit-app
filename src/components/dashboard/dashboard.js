
import React,{Component} from 'react'
import { NavBar} from 'antd-mobile';
import {withRouter,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import TabBarLink from '../tabBar/tabBar'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Message from '../message/message'
import UserCenter from '../userCenter/userCenter'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
import './dashboard.css'
import QueueAnim from 'rc-queue-anim';
import BrowserCookies from 'browser-cookies'

class DashBoard extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedTab:'index'
    }
  }
  componentDidMount(){
    let now_id = BrowserCookies.get('userid')?BrowserCookies.get('userid').split(':')[1].replace(/\"/g, ""):'';
    if(!this.props.chat.chatMsg.length){
      this.props.getMsgList(now_id);
    }
    if(this.props.chat.isRecv){
      this.props.recvMsg();
    }
  }
  selectedFn(val){
    this.setState({
      selectedTab:val
    });
  }
  render(){
    const {pathname} = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path:'/boss',
        text:'求职者',
        title:'求职者列表',
        icon:<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
          />,
        component:Boss,
        hide:user.type==='genius'
      },
      {
        path:'/genius',
        text:'boss',
        title:'Boss列表',
        icon:<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
          />,
        component:Genius,
        hide:user.type==='boss'
      },
      {
        path:'/msg',
        text:'消息',
        title:'消息列表',
        icon:<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
          />,
        component:Message
      },
      {
        path:'/me',
        text:'我',
        title:'个人中心',
        icon:<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
          />,
        component:UserCenter
      }
    ];
    const currPath = navList.find(v=>v.path===pathname);
    return currPath? (
      <div className="dashboard">
        <NavBar className="top-bar" mode="dark">{currPath.title}</NavBar>
        <div className="content">
          {/* {
            navList.map((v,i)=>{
              return <Route key={i} path={v.path} component={v.component}></Route>
            })
          } */}
          <QueueAnim type={['left','alpha']} duration={400} leaveReverse>
            <Route key={currPath.path} path={currPath.path} component={currPath.component}></Route>
          </QueueAnim>
        </div>
        <div className="bottom-bar">
          <TabBarLink data={navList}></TabBarLink>
        </div>
      </div>
    ) : <p>{user.type? (user.type==='boss'?<Redirect to="/boss"></Redirect> : <Redirect to="/genius"></Redirect>) :''}</p>
  }
}

DashBoard = withRouter(connect(state=>({
  user:state.userReducer,
  chat:state.chatReducer
}),
{
  getMsgList,recvMsg
})(DashBoard));

export default DashBoard