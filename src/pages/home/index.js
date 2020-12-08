import React, { Component, Fragment } from 'react'
import Header from '../../components/header';
import { connect } from 'dva';
import './home.scss'


// class Welcome extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (<div>Welcome to CQ</div>);
//     }
// }

// // 高阶组件透传[ref]
// function logEnhance() {
//     class LogEnhance extends Component {
//         constructor(props) {
//             super(props);
//         }

//         render() {
//             const { forwardRef, ...rest } = this.props;
//             return (<Welcome ref={forwardRef} {...rest} />);
//         }
//     }
//     return React.forwardRef((props, ref) => {
//         return <LogEnhance {...props} forwardRef={ref}></LogEnhance>
//     });
// }

// const Wel = logEnhance(Welcome);

// @connect(state => state)
class Home extends Component {

  constructor(props) {
    super(props)

    this.gotoHome = this.gotoHome.bind(this);
    this.ref1 = React.createRef();
  }

  componentDidMount(previos) {

    console.log('==================>');
    console.log(this.ref1);
  }

  gotoHome() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <>
        {/* <Wel ref={this.ref1} /> */}
        <Header/>
        <div className="p-home"><h1>Home page</h1></div>
        <button onClick={this.gotoHome}>跳转Login</button>
      </>
    );
  }
}

export default Home;