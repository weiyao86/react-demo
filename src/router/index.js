import React, {Fragment, useState} from 'react';
import {withRouter} from 'react-router';
import {CheckList, PullToRefresh, List} from 'antd-mobile';
import {sleep} from 'antd-mobile/es/utils/sleep';
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

let current = 1;

function getNextData() {
  const ret = [];
  for (let i = 0; i < 18; i++) {
    ret.unshift(current.toString());
    current++;
  }
  return ret;
}
function Msg() {
  const [data, setData] = useState(() => getNextData());
  return (<div style={{background: '#f00'}}><CheckList defaultValue={['B']}>
    <CheckList.Item value="A">A</CheckList.Item>
    <CheckList.Item value="B">B</CheckList.Item>
    <CheckList.Item value="C" disabled>
      C
    </CheckList.Item>
    <CheckList.Item value="D" readOnly>
      D
    </CheckList.Item>
  </CheckList>
    <PullToRefresh
      onRefresh={async () => {
        await sleep(1000);
        setData([...getNextData(), ...data]);
      }}
    >
      <List style={{minHeight: '100vh'}}>
        {data.map(item => (
          <List.Item key={item}>{item}</List.Item>
        ))}
      </List>
    </PullToRefresh>
  </div>);
}

const routerConfig = [
  {
    path: '/',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLayout" */ '../pages/layout')]),
    breadcrumbName: 'layout',
    exact: true,
    title: '首页',
  },
  {
    path: '/login',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLogin" */ '../pages/login'), import(/* webpackChunkName: "pagesLoginModel" */ '../pages/login/model.js')]),
    breadcrumbName: 'login',
    exact: true,
    title: '登录',
    routes: [{
      path: '/login/message',
      breadcrumbName: 'message',
      component: () => (<Msg />),
      title: '登录消息1',
      // exact: true
    }, {
      path: '/login/message1',
      breadcrumbName: 'message1',
      component: () => (<div>Message1111</div>),
      exact: true,
      title: '登录消息2',
    }, {
      path: '/login/message3',
      breadcrumbName: 'message3',
      component: LazyMoudle(() => [import(/* webpackChunkName: "pagesLayout" */ '../pages/layout')]), // () => (<div>Message</div>),
      exact: true,
      title: '登录消息3',
    }],
  }, {
    path: '/home',
    component: LazyMoudle(() => [import(/* webpackChunkName: "pagesHome" */ '../pages/home'), import(/* webpackChunkName: "pageshomeModel" */ '../pages/home/model.js')]),
    breadcrumbName: 'home',
    title: 'Home',
  }, {
    path: '/demo',
    component: LazyMoudle(() => Demo1),
    breadcrumbName: 'demo',
    title: 'Demo',
  }];

export default routerConfig;
