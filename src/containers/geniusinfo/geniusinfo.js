
import React,{Component} from 'react';
import { NavBar,List,InputItem,TextareaItem,WingBlank,Button,WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';
import {infoUpdata} from '../../redux/user.redux'
import AvatarSelector from '../../components/avatarSelector/avatarSelector';
import inputChange from '../../components/zlh-HOC/inputChange'

class GeniusInfo extends Component{
  avatarSelector(val){
    this.props.stateChange('avatar',val);
  }
  render(){
    return(
      <div className="bossinfo">
        {this.props.user.redirectTo ? <Redirect to={this.props.user.redirectTo}></Redirect> : null}
        <NavBar mode="dark">牛人信息完善</NavBar>
        <AvatarSelector selector={this.avatarSelector.bind(this)}></AvatarSelector>
        <div className="inputList">
          <List renderHeader={()=>'相关信息'}>
            <InputItem clear onChange={(v)=>this.props.stateChange('title',v)}>
              意向职位:
            </InputItem>
            <TextareaItem
              title="个人简介:"
              rows={4}
              count={200}
              onChange={(v)=>this.props.stateChange('desc',v)}
            />
          </List>
        </div>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          <Button onClick={()=>this.props.infoUpdata(this.props.state)} type="primary">保存</Button>
        </WingBlank>
      </div>
    )
  }
}
GeniusInfo = withRouter(connect(
  state=>({
    user:state.userReducer
  }),
  {
    infoUpdata
  }
)(GeniusInfo));
GeniusInfo = inputChange(GeniusInfo);
export default GeniusInfo