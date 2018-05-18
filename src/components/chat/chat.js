import React from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getMsgList,sendMsg,recvMsg,readMsg,actionsFilter} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import BrowserCookies from 'browser-cookies'
import QueueAnim from 'rc-queue-anim';
import './chat.css'

const emgji='😀,😁,😂,🤣,😃,😄,😅,😆,😉,😊,😋,😎,😍,😘,😗,😙,😚,🙂,🤗,🤩,🤔,🤨,😐,😑,😶,😣,😥,😮,🤐,😯,😪,😫,😴,😌,😛,😜,😝,🤤,😒,😕,🙃,🤑,😲,🙁,😖,😞,😤,😢,😦,😧,😨,😩,🤯,😬,😰,😱,😳,🤪,😵,🤕,🤢,🤮,🤧,😇,🤠,🤡,🤥,🤫,🤭,🧐,🤓';

const emgjiItem = emgji.split(',').map(v=>({text:v}));

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      text:'',
      msg:[],
      emgjiShow:false
    }
    this.sendFn = this.sendFn.bind(this);
  }
  componentDidMount(){
    let b = this.refs.contentDiv ? this.refs.contentDiv.offsetHeight : 0;
    window.scrollTo(0,b);
    let now_id = BrowserCookies.get('userid').split(':')[1].replace(/\"/g, "")||'';
    if(!this.props.chat.chatMsg.length){
      this.props.getMsgList(now_id);
    }
    if(this.props.chat.isRecv){
      this.props.recvMsg();
    }
  }
  componentDidUpdate(){
    let b = this.refs.contentDiv ? this.refs.contentDiv.offsetHeight : 0;
    window.scrollTo(0,b);
  }
  componentWillUnmount(){
    const fromID = this.props.match.params._id;
    this.props.readMsg(fromID);
    this.props.actionsFilter();
  }
  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'));
    },0);
  }
  sendFn(){
    const from = this.props.user._id;
    const to = this.props.match.params._id;
    const msg = this.state.text;
    this.props.sendMsg({from,to,msg});
    this.setState({
      text:'',
      emgjiShow:false
    });
  }
  backFn(){
    this.props.history.goBack();
  }
  emgjiFn(v){
    this.setState({
      text:this.state.text+v.text
    });
  }
  render(){
    console.log("触发2");
    const curUser = this.props.match.params._id;
    const users = this.props.chat.users;
    if(!users[curUser]) return null
    const getChatIdValue = getChatId(curUser,this.props.user._id);
    const activeChat = this.props.chat.chatMsg.filter(v=>v.chatId==getChatIdValue)
    return (
      <div id="chat-page" className="chat">
        <NavBar leftContent={<Icon type="left" />} onLeftClick={this.backFn.bind(this)} className="navBar" mode="dark">{users[curUser].name}</NavBar>
        <div ref="contentDiv" className="content">
          {activeChat.map((v,i)=>{
              const avatar = require(`../../img/${users[v.from].avatar}.jpg`);
              return v.from===curUser?(
                <List key={i}>
                  <List.Item
                  thumb={avatar}>
                  {v.content}
                  </List.Item>
                </List>
              ) : (
                <List key={i}>
                  <List.Item
                  extra={<img src={avatar} alt="" />}
                  className="chat-me">
                    {v.content}
                  </List.Item>
                </List>
              )
            })}
        </div>
        
        <div className="stick-footer">
          <List>
          <InputItem
              placeholder="请输入消息"
              value={this.state.text}
              onChange={v=>{
                this.setState({
                  text:v
                })
              }}
              extra={<div className="inputSendBtnWarp">
                  <span className="emgjiBtn" onClick={()=>{
                    this.setState({
                      emgjiShow:!this.state.emgjiShow
                    });
                    this.fixCarousel();
                  }}><i>😀</i></span>
                  <span className="sendBtn" onClick={this.sendFn}><i>发送</i></span>
                </div>}
            ></InputItem>
          </List>
              {/* Grid有BUG 需手动派发一个resize事件 */}
              {
                this.state.emgjiShow
                ? <Grid className="ABC" columnNum={8} carouselMaxRow={3} data={emgjiItem} isCarousel onClick={(v)=>this.emgjiFn(v)} />
                : null
              }
        </div>
      </div>
    )
  }
}

Chat = withRouter(connect(
  state=>({
    user:state.userReducer,
    chat:state.chatReducer
  }),
  {
    getMsgList,sendMsg,recvMsg,readMsg,actionsFilter
  }
)(Chat));

export default Chat