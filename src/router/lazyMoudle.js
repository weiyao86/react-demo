import React from 'react'
export default function asyncComponent(cmp) {
  class AsyncCmp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      }
    }

    componentDidMount() {
      const cmpMethod = cmp();
      
      if (cmpMethod.then)
        cmpMethod.then(mod => {
          this.setState({
            component: mod.default || mod
          })
        })
      else
        this.setState({
          component: cmpMethod
        })
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <div>Loading...</div>;
    }
  }

  return AsyncCmp
}