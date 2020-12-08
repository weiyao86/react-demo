import dva from 'dva';

const App =()=><div>Hello dva</div>;

const app = dva();

app.router(()=><App/>);

app.start("#root");