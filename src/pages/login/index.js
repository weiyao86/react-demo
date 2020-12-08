import React, { Component } from 'react';
import Header from '../../components/header';
import './login.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateLoginIs: this.props.loginis
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('props-----------', state)
    // debugger;
    if (props.loginis !== state.stateLoginIs) {

      return {
        stateLoginIs: props.loginis
      }
    }
    return null;
  }
  onTest(){
    alert('test')
  }

  render() {
    // debugger;
    let { kind, ...others } = this.props;
    return (<button className={kind} {...others}>{this.state.stateLoginIs}--{this.props.children}</button>)
  }
}



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginis: 'false',
      obj:null
    }
  }

  * test() {
    let test = 'tt';
    yield test;
    test = 'dd';
    yield test;
    return 55;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(_ => ({ loginis: 'true' }))
    }, 3000);
  }


  gotoLogin(event) {
    let t = this.test();
    console.log(event); // => nullified object.
    console.log(event.type); // => "click"
    const eventType = event.type; // => "click"

    setTimeout(function () {
      console.log(event.type); // => null
      console.log(eventType); // => "click"
    }, 2000);

    // t.forEach(item=>{
    //   console.log('========' + item)
    // })

    // for (let i = 0, item; i < 10 && (item = t.next()); i++) { console.log('========' + item.value) }

    // this.props.history.push('/home');
    // this.setState((state, props) => ({ loginis: 231 }))
    // this.setState({ loginis: 1 })
    // console.log(this.state.loginis)
    // this.setState({ loginis: 2 })
    // console.log(this.state.loginis)
    this.setState({ obj: event })
    // console.log(this.state.loginis)
  }

  componentDidUpdate() {
    console.log('componentDidUpdate', this.state.obj)
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('props-----------', state)
    return null;
  }
  render() {
    console.log('1')
    return (
      <div className="p-login">
        <Header />
        <h1>Login &#10;&#13; page</h1>

        {/* <Button kind="test" onClick={() => console.log('log')} onFocus={_ => alert('focus')}>Hello button1</Button> */}
        <Button onClick={this.onTest} kind="test" {...this.state}>跳转Home</Button>
      </div>
    )
  }
}

export default Login;