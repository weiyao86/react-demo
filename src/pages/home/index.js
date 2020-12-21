import React, {Component, Fragment} from 'react';
import Header from '../../components/header';
import {connect} from 'dva';
import './home.scss';


class Home extends Component {
  constructor(props) {
    super(props);

    this.gotoHome = this.gotoHome.bind(this);
    this.ref1 = React.createRef();
    this.state = {
      count: 1,
    };
  }

  componentDidMount(previos) {
    console.log('==================>');
    console.log(this.state.count);
  }

  gotoHome() {
    this.props.history.push('/');
  }

  onChange() {
    console.log(this.state.count);
    // this.setState({
    //   count: this.state.count++
    // })

    this.setState(state => ({
      count: ++state.count,
    }));
  }

  render() {
    const {count} = this.state;
    return (
      <>
        {/* <Wel ref={this.ref1} /> */}

        <Button user="test-namess" count={count}>{s => <div>{s.count}is meme---Children Props</div>}</Button>


        <ButtonRender user="test-name" count={count} render={tt => (<div>{tt.count}------Render Props</div>)} />

        <Header />
        <div className="p-home" onClick={() => this.onChange()}><h1>Home page</h1></div>
        <button onClick={this.gotoHome}>跳转首页</button>
      </>
    );
  }
}

/**
 *
 * @param {*} props 测试children
 */
function Button(props) {
  return (<div {...props}>hah ha ha ...{props.children(props)}</div>);
}

/**
 *
 * @param {*} props  测试render props
 */
// eslint-disable-next-line react/no-multi-comp
class ButtonRender extends React.Component {
  state = {}

  static getDerivedStateFromProps() {
    return null;
  }

  shouldComponentUpdate(props, state) {
    return true;
  }

  // componentWillReceiveProps() {
  //   debugger;
  // }

  componentDidMount() { }

  componentDidUpdate() {
  }

  componentDidCatch() {
  }

  componentWillUnmount() {
  }

  render() {
    const {render, ...rest} = this.props;

    return (<div {...rest}>{render && render(rest)}</div>);
  }
}

export default Home;
