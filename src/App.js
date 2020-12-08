import React, { Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect, Router, hashHistory } from 'react-router-dom';
// import { Router, Route, hashHistory, browserHistory } from 'react-router';
import Login from './pages/login';
import Home from './pages/home';
import Layout from './pages/layout';

function App() {
  return (
    <>
      <ul><li>111</li><li>222</li></ul>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
        <Route exact path="/" component={Layout}></Route>
        <Redirect to={"/Layout"}></Redirect>
      </Switch>
      {/* <Router history={browserHistory}>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
        <Route exact path="/" component={Home}></Route>
        {/* <Redirect to={"/home"}></Redirect>
      </Router> */}

    </>
  );
}


export default App;
