import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';

const ModelsCache = {};

@connect((state, b, c, d) => {
  return { ...state };
})
export default function asyncComponent(cmp) {
  class AsyncCmp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
        model: null,
      };
    }

    componentDidMount() {
      const { globalModel } = this.props;
      const cmpMethod = cmp();

      // 直接返回class
      if (cmpMethod.prototype instanceof React.Component || typeof cmpMethod === 'function') {
        return this.setState({
          component: cmpMethod,
          model: null,
        });
      }

      // 返回异步组件及model
      const [component, model = new Promise((r, j) => { r('load empty modules'); })] = cmpMethod;

      Promise.all([component, model]).then((arr) => {
        const [c, m] = arr;

        const ns=m.default;
        if (ns) {
          if(ns &&  !ModelsCache[ns]){
            window.AppInstance.model(ns);
            ModelsCache[ns]=1;
          }
        }

        this.setState({
          component: c.default || c,
          model: m.default || m,
        });

      }).catch((a, b, c) => {

        });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Spin size="large" tip="Loading" />;
    }
  }

  return AsyncCmp;
}
