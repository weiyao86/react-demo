import React, { Fragment } from 'react';
import { HashRouter, Route, Switch, Redirect, Router } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route exact path="/" component={Home}></Route>
          <Redirect to={"/home"}></Redirect>
        </Switch>
      </HashRouter>

    </>
  );
}


export default App;
