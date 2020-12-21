import React from 'react';
import {connect} from 'dva';
import {Route, Redirect, Switch, Link, withRouter} from 'dva/router';
import {convertRoutes} from 'dva-router-config';
import {matchRoutes, renderRoutes} from 'react-router-config';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

// import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeOutlined } from '@ant-design/icons';
import RouterConfig from './router';
import {getBreadcrumbs} from './components/breadCrumbs';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const flattenRouters = arr =>
  arr.reduce((prev, item) => {
    const isArray = Array.isArray(item.routes);
    prev.push(item);
    return isArray ? prev.concat(flattenRouters(item.routes)) : prev;
  }, []);

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (route.render ? route.render({...props, route}) : <route.component {...props} routes={route.routes} />)}
    />
  );
}
@withRouter
@connect(state => state)
class App extends React.Component {
  constructor(props) {
    super(props);

    // this.unlisten = this.props.history.listen((location, action) => {
    //   if (location.pathname !== this.state.location.pathname) {
    //     this.setState({defaultSelectKeys: [location.pathname], location});
    //   }
    // });

    this.state = {
      defaultSelectKeys: ['/'],
      location: this.props.location,
    };
  }

  componentDidMount(prevProps) {
    // this.tet();
  }

  async tet() {
    const rst = await this.props.dispatch({
      type: 'globalModel/init',
      payLoad: {
        name: 'test',
        age: 43,
      },
      cb(c) {
        alert(`已${c.globalModel.globalState}`);
      },
    });
    alert(rst);
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.location.pathname !== state.location.pathname) {
  //     console.log([props.location.pathname]);

  //     return {
  //       defaultSelectKeys: [props.location.pathname],
  //       location: props.location,
  //     };
  //   }
  //   return null;
  // }

  initDynamicMenu=(routes) => {
    let menu = [];
    routes.map((item) => {
      if (Array.isArray(item.routes)) {
        const m = (<SubMenu
          key={item.path}
          title={
            <span>
              <Icon type="user" />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.initDynamicMenu(item.routes)}
        </SubMenu>);
        menu = [...menu, m];
      } else {
        menu.push(<Menu.Item key={item.path} to={item.path}>{item.title}</Menu.Item>);
      }
      return [];
    });

    return menu;
  }

  render() {
    const menus = [...RouterConfig];
    this.breadcrumbs = getBreadcrumbs([...menus], this.props.location);
    this.routerConfigs = flattenRouters([...menus]);

    const menu = this.initDynamicMenu([...menus]);

    // debugger;
    const curRoute = matchRoutes(this.routerConfigs, this.props.location.pathname);

    const stKey = curRoute[0].route.path || '/';

    return (
      <Layout>
        <Header className="header">
          <div className="logo">Logo</div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background" collapsible>
            <Menu
              mode="inline"
              style={{height: '100%', borderRight: 0}}
              // defaultSelectKeys={['/']}
              selectedKeys={[stKey]}
              onClick={(item, key, keyPath, domEvent) => {
                this.props.history.push(item.key, {exact: true});
              }}
            >

              {menu}
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb
              style={{margin: '16px 0'}}
              itemRender={(route, params, routes, paths) => {
                const last = routes.indexOf(route) === routes.length - 1;
                return last ? (
                  <span>{route.breadcrumbName}</span>
                ) : (
                  <Link to={route.path}>
                    {route.path === '/' && <Icon type="home" />}
                    {route.breadcrumbName}
                  </Link>
                );
              }}
              routes={this.breadcrumbs}
            />

            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                {this.routerConfigs.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
