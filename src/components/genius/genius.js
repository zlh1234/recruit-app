
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getList} from '../../redux/list.redux'
import { WingBlank, WhiteSpace } from 'antd-mobile';
import UserList from '../userList/userList'
class Genius extends Component{
  componentDidMount(){
    this.props.getList('boss');
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
Genius = withRouter(connect(
  state=>({
    list:state.listReducer
  }),
  {
    getList
  }
)(Genius))

export default Genius