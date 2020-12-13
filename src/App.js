
import React from 'react'
import {
  connect
} from 'dva';
import {
  Route, Redirect, Switch, Link, withRouter
} from 'dva/router';



import { Layout, Menu, Breadcrumb } from 'antd';

import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined } from '@ant-design/icons';
import RouterConfig from './router';
import { getBreadcrumbs } from './components/breadCrumbs';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const flattenRouters = arr => arr.reduce(function (prev, item) {
  let isArray = Array.isArray(item.routes);
  prev.push(item);
  return isArray ? prev.concat(flattenRouters(item.routes)) : prev;
}, []);

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        return route.render ? (
          route.render({ ...props, route: route })
        ) : (
            <route.component {...props} routes={route.routes} />
          )
      }}
    />
  );
}
@withRouter
@connect(state => state)
class App extends React.Component {
  constructor(props) {
    super(props);

    this.unlisten = this.props.history.listen((location, action) => {

      if (location.pathname !== this.state.location.pathname) {

        // this.setState({defaultSelectKeys: [location.pathname],location})
      }
    });

    this.state = {
      defaultSelectKeys: ['/'],
      location: this.props.location
    };
  }

  componentDidMount(prevProps) {
    this.tet();

  }

  async tet() {
    let rst = await this.props.dispatch({
      type: 'globalModel/init',
      payLoad: {
        name: "test",
        age: 43
      },
      cb(c) {
        alert('已' + c.globalModel.globalState)
      }
    })
    alert(rst)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.pathname !== state.location.pathname) {
      console.log([props.location.pathname])
      return {
        defaultSelectKeys: [props.location.pathname],
        location: props.location
      }
    }
    return null;
  }



  render() {

    this.breadcrumbs = getBreadcrumbs(RouterConfig, this.props.location);
    this.RouterConfigs = flattenRouters(RouterConfig);
    return (
      <Layout>
        <Header className="header">
          <div className="logo" >Logo</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background" collapsible={true}>
            <Menu
              mode="inline"
              defaultSelectedKeys={this.state.defaultSelectKeys}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" onClick={(i, j) => {

                let to = i.item.props['to'];
                this.props.history.push(to, { exact: true });
              }}>
                <Menu.Item key="/login" to="/login" >to-login </Menu.Item>
                <SubMenu key="sub11" icon={<UserOutlined />} title="message">
                  <Menu.Item key="/login/message" to="/login/message">to-login-message</Menu.Item>
                </SubMenu>
                <Menu.Item key="/home" to="/home">to-home</Menu.Item>
                <Menu.Item key="/demo" to="/demo">to-demo</Menu.Item>
                <Menu.Item key="/" to="/">to-layout</Menu.Item>

              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: "16px 0" }} itemRender={(route, params, routes, paths) => {

              const last = routes.indexOf(route) === routes.length - 1;
              return last ? (
                <span>{route.breadcrumbName}</span>
              ) : (
                  <Link to={route.path}>{route.path === '/' && <HomeOutlined />}{route.breadcrumbName}</Link>
                );
            }} routes={this.breadcrumbs} />

            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>

                {this.RouterConfigs.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}

              </Switch>

            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App;
