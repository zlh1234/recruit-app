
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList} from '../../redux/list.redux'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import UserList from '../userList/userList'
class Boss extends Component{
  componentDidMount(){
    this.props.getList('genius');
  }
  render(){
    const {userList} = this.props.list;
    return (
      <WingBlank>
      <WhiteSpace></WhiteSpace>
        <UserList list={userList}></UserList>
      </WingBlank>
    )
  }
}
Boss = withRouter(connect(
  state=>({
    list:state.listReducer
  }),
  {
    getList
  }
)(Boss))

export default Boss