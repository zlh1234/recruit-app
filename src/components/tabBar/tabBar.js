import React,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class TabBarLink extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedTab:'牛人'
    }
  }
  selectedFn(v){
    this.setState({
      selectedTab:v.text
    });
    this.props.history.push(v.path);
  }
  render(){
    const {pathname} = this.props.location;
    const newList = this.props.data.filter(v=>!v.hide);
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white">
        {
          newList.map((v,i)=>{
            return (
              <TabBar.Item
                badge={v.path==='/msg' ? this.props.chat.unRead : null}
                title={v.text}
                key={v.text}
                icon={v.icon}
                selectedIcon={v.icon}
                selected={pathname===v.path}
                onPress={()=>this.selectedFn(v)}
              >
              </TabBar.Item>
            )
          })
        }
      </TabBar>
    )
  }
}

export default withRouter(connect(state=>({
  chat:state.chatReducer
}),
{
  
})(TabBarLink))