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
            cmp().then(mod => {
                this.setState({
                    component: mod.default || mod
                })
            })
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : <div>Loading...</div>;
        }
    }

    return AsyncCmp
}