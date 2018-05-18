
import React,{Component} from 'react';
import { List,Grid } from 'antd-mobile';
import PropTypes from 'prop-types'

import './avatar.css'
class AvatarSelector extends Component{
  static propType = {
    selector:PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
    this.state={
      nowTx:''
    };
  }
  render(){
    const arr=['tx1','tx2','tx3','tx4','tx5','tx6','tx7','tx8','tx9','tx10','tx11','tx12'];
    const avatar = arr.map((v,i)=>({
      icon:require(`../../img/${v}.jpg`),
      text:`头像${i+1}`
    }));
    const nowTxContent = this.state.nowTx
                          ?
                          (<div className="nowTx">
                            <span>已选择：</span>
                            <img src={this.state.nowTx.icon} alt="头像" />
                           </div>)
                          :
                          (<span style={{'fontSize':16}}>请选择头像</span>);
    return(
      <div className="avatarSelector">
        <List renderHeader={()=>nowTxContent}>
          <Grid onClick={(elm,i)=>{
            this.setState({
              nowTx:elm
            });
            this.props.selector(arr[i])
            }} data={avatar} columnNum="4" />
        </List>
      </div>
    )
  }
}

export default AvatarSelector