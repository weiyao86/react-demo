import React, {Fragment} from 'react';
import {withRouter} from 'react-router';

import LazyMoudle from './lazyMoudle';

/**
 * 非路由组件使用react-router location history对象，包裹withRouter
 */
class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

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
      count: 2,
    };
  }

  componentDidMount() {
    const c = this.cmp;

    this.setState(_ => ({
      count: 4,
    }));
  }

  componentDidUpdate(prevProps) {
    console.log('********');
    const lc = this.props.location !== prevProps.location;
    const lc1 = this.props.history.location !== prevProps.history.location;
    console.log(lc, lc1);
  }

  render() {
    return <WC wrappedComponentRef={c => (this.cmp = c)} />;
  }
}

const Demo1 = Class;

function Msg() {
  return <div style={{background: '#f00'}}>MSGSSSSSSSSSSS</div>;
}

const routerConfig = [
  {
    path: '/',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLayout" */ '../pages/layout')]),
    breadcrumbName: 'layout',
    exact: true,
  },
  {
    path: '/login/message3',
    breadcrumbName: 'message3',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLayout" */ '../pages/layout')]), // () => (<div>Message</div>),
    exact: true,
  },
  {
    path: '/login',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLogin" */ '../pages/login')]),
    breadcrumbName: 'login',
    exact: true,
    routes: [{
      path: '/login/message',
      breadcrumbName: 'message',
      component: () => (<div>Message188888888</div>),
      // exact: true
    }, {
      path: '/login/message1',
      breadcrumbName: 'message1',
      component: () => (<div>Message1111</div>),
      exact: true,
    }],
  }, {
    path: '/home',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesHome" */ '../pages/home'), import(/* webpackChunkName: "pagesLogin" */ '../pages/home/model.js')]),
    breadcrumbName: 'home',
  }, {
    path: '/demo',
    component: LazyMoudle(() => Demo1),
    breadcrumbName: 'demo',
  }];

export default routerConfig;
