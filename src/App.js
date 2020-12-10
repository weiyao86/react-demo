// import React, { Fragment } from 'react';
// import {
//   useParams,
//   useRouteMatch
// } from "react-router-dom";
// import {
//   Route, Redirect, Switch, Link
// } from 'dva/router';


// import RouterConfig from './router';

// class App extends React.Component {
//   render() {
//     return (<>
//       <ul>
//         <li><Link to="/login">to-login</Link></li>
//         <li><Link to="/home">to-home</Link></li>
//         <li><Link to="/demo">to-demo</Link></li>
//         <li><Link to="/?id=5">to-layout</Link></li>
//       </ul>
//       <Switch>
//         {RouterConfig.map((route, i) => (
//           <RouteWithSubRoutes key={i} {...route} />
//         ))}
//       </Switch>
//     </>)
//   }
// }
// function RouteWithSubRoutes(route) {
//   return (
//     // <Route path="/demo" component={Demo}/>
//     <Route
//       path={route.path}
//       exact={route.exact}
//       render={(props) => {

//         return <route.component {...props} routes={route.routes}></route.component>
//       }}
//     />
//   );
// }
// export default App

import {
  Route, Redirect, Switch, Link, withRouter
} from 'dva/router';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import RouterConfig from './router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {

        return <route.component {...props} routes={route.routes}></route.component>
      }}
    />
  );
}

function App(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1" onClick={(i, j) => {

              let to = i.item.props['to'];
              props.history.push(to);
            }}>
              <Menu.Item key="1" to="/login" >to-login</Menu.Item>
              <Menu.Item key="2" to="/home">to-home</Menu.Item>
              <Menu.Item key="3" to="/demo">to-demo</Menu.Item>
              <Menu.Item key="4" to="/">to-layout</Menu.Item>
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
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              {RouterConfig.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withRouter(App);
