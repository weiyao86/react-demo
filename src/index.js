
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import dva from 'dva';
import {BrowserRouter} from 'dva/router';
import createHistory from 'history/createBrowserHistory';
import models from './models/global';
import './common/style/frame.scss';
import App from './App';


import RouterConfig from './router';

const history = createHistory();

const app = dva({
  initialState: {},
  history,
  onError(e, dispatch) {
    console.log('***************dvajs-onError***************');
    console.log(e.message);
  },
});

app.model(models);

window.AppInstance = app;

app.router(props => (
  <BrowserRouter>
    {/* <Route component={App} /> */}
    <App {...props} />
  </BrowserRouter>
));

const AppStart = app.start();

ReactDOM.render(<AppStart />, document.getElementById('root'));
