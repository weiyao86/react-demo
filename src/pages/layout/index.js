import React, { Component } from 'react';
import Header from '../../components/header';
import './index.scss';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateLoginIs: this.props.loginis
    }
    debugger;
  }

  componentDidMount(){
    
  }

  render() {
    return (<div>layout</div>)
  }
}

export default Layout;