import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {actionsFilter} from '../../redux/chat.redux'
import {List,Badge} from 'antd-mobile'
import './message.css'
class Message extends React.Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    }
  }
  getLast(arr){
    return arr[arr.length-1]
  }
  clickFn(val){
    this.props.actionsFilter();
    this.props.history.push(`/chat/${val}`);
  }
  render(){
    const msgGroup = [];
    this.props.chat.chatMsg.forEach(v=>{
      msgGroup[v.chatId] = msgGroup[v.chatId] || [];
      msgGroup[v.chatId].push(v);
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      let a_last = this.getLast(a).createTime;
      let b_last = this.getLast(b).createTime;
      return b_last-a_last
    });
    return (
      <div style={{marginTop:5}}>
        {
          chatList.map((v,i)=>{
            const userInfo = this.props.chat.users;
            const now_id = this.props.user._id;
            const targetID = v[0].from===now_id ? v[0].to : v[0].from;
            let unReadNum = v.filter(v=>!v.read&&v.from!==now_id).length;
            return (
              <List key={i}>
                <List.Item
                onClick={this.clickFn.bind(this,targetID)}
                arrow="horizontal"
                extra={unReadNum?<Badge text={unReadNum} overflowCount={99} />:null}
                  thumb={require(`../../img/${userInfo[targetID].avatar}.jpg`)}>
                  {this.getLast(v).content}
                  <List.Item.Brief>
                      {userInfo[targetID].name}
                  </List.Item.Brief>
                </List.Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

Message = connect(state=>({
  chat:state.chatReducer,
  user:state.userReducer
}),
{
  actionsFilter
})(Message)

export default withRouter(Message)