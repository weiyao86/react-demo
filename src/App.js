import React, { Fragment } from 'react';
import {
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  Route, Redirect, Switch, Link
} from 'dva/router';
import { withRouter } from "react-router";
import Login from './pages/login';
import Home from './pages/home';
import Layout from './pages/layout';


const routerList = [
  {
    path: '/',
    component:Layout,
    exact: true
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/demo',
    component: Demo
  }]

function Demo() {
  // debugger;
  // let { path, url } = useRouteMatch();
  // let { id } = useParams();
  return (<div>Demo--</div>);
}

class App extends React.Component {
  render() {
    return (<>
      <ul>
        <li><Link to="/login">to-login</Link></li>
        <li><Link to="/home">to-home</Link></li>
        <li><Link to="/demo">to-demo</Link></li>
        <li><Link to="/">to-layout</Link></li>
      </ul>
      <Switch>
        {routerList.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </>)
  }
}
function RouteWithSubRoutes(route) {
  return (
    // <Route path="/demo" component={Demo}/>
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        
        return <route.component {...props} routes={route.routes}></route.component>
      }}
    />
  );
}
export default App

