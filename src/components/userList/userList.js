
import React,{Component} from 'react'
import { Card, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionsFilter} from '../../redux/chat.redux'
class UserList extends Component{
  static propType={
    userList:PropTypes.array.isRequired
  }
  chat(v){
    this.props.actionsFilter();
    this.props.history.push(`/chat/${v._id}`);
  }
  render(){
    const userList = this.props.list;
    return (
        <div className="userlist">
          {
            userList.map((v,i)=>(
              v.avatar ? (<div key={i} className="Card">
                  <WhiteSpace></WhiteSpace>
                  <Card onClick={()=>this.chat(v)}>
                    <Card.Header
                      title={v.userid}
                      thumb={require(`../../img/${v.avatar}.jpg`)}
                      thumbStyle={{width:25,height:25}}
                      extra={<span style={{fontSize:14}}>{v.type==='boss'?'招聘: ':'意向: '}{v.title}</span>}
                    />
                    <Card.Body>
                      {v.type==='boss' ? (
                        <div>
                          <div>公司名称:{v.company}</div>
                          <div>薪资:{v.money}</div>
                          <div>职位要求:</div>
                        </div>
                        ):<div>个人简介:</div>}
                      {v.desc.split('\n').map((v,i)=><div style={{marginLeft:10,fontSize:14}} key={i}>{v}</div>)}
                    </Card.Body>
                  </Card>
                </div>) : null
            ))
          }
        </div>
    )
  }
}
UserList = connect(state=>({

}),
{
  actionsFilter
})(UserList)
export default withRouter(UserList)