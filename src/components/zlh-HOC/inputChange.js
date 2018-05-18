
import React from 'react'

export default function(Comp){
  return class Warp extends React.Component{
    constructor(props){
      super(props);
      this.state={};
      this.stateChange=this.stateChange.bind(this);
    }
    stateChange(key,val){
      this.setState({
        [key]:val
      });
    }
    render(){
      return<Comp stateChange={this.stateChange} state={this.state} {...this.props}></Comp>
    }
  }
}