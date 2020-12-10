import React, { Fragment } from 'react';
import { withRouter } from "react-router";

import LazyMoudle from './lazyMoudle';

/**
 * 非路由组件使用react-router location history对象，包裹withRouter
 */
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }

    this.ref = React.createRef();
  }

  componentDidMount() {
    // let { match, location } = this.props;

    // let { path, url } = match;
  }
  render() {

    return (<div ref={this.ref}>Demo--</div>);
  }
}

const WC = withRouter(Class);
class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 2
    }
  }

  componentDidMount() {
    let c = this.cmp;

    this.setState(_ => ({
      count: 4
    }))
  }

  componentDidUpdate(prevProps) {
    console.log("********")
    const lc = this.props.location !== prevProps.location;
    const lc1 = this.props.history.location !== prevProps.history.location;
    console.log(lc, lc1)
  }

  render() {
    return <WC wrappedComponentRef={c => (this.cmp = c)} />;
  }
}

// const Demo = Class;

const routerConfig = [
  {
    path: '/',
    component: LazyMoudle(() => import(/* webpackChunkName: "pagesLayout" */ '../pages/layout')),
    exact: true
  },
  {
    path: '/login',
    component: LazyMoudle(() => import(/* webpackChunkName: "pagesLogin" */ '../pages/login'))
  }, {
    path: '/home',
    component: LazyMoudle(() => import(/* webpackChunkName: "pagesHome" */ '../pages/home'))
  }, {
    path: '/demo',
    component: LazyMoudle(() => Demo)
  }];

export default routerConfig;