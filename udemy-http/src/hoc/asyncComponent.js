import React, { Component } from 'react';

// Official React way to lazy load | https://reactjs.org/docs/code-splitting.html

// Lazy load a Component
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount() {
            importComponent().then(cmp => {
                this.setState({
                    component: cmp.default
                });
            });
        };

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        };
    };
};

export default asyncComponent;
