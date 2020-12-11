import React, { Fragment } from 'react';
import {
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  Route, Redirect, Switch, Link
} from 'dva/router';


import RouterConfig from './router';

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
        {RouterConfig.map((route, i) => (
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

