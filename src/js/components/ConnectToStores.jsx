import React, { Component } from 'react';
import shallowEqual from 'shallowequal';

export default (stores, getState) => {
    return (ComposedComponent) => {
        const displayName =
          ComposedComponent.displayName ||
          ComposedComponent.name ||
          'Component';

        return class StoreConnector extends Component {
            static displayName = 'connectToStores(${displayName})';

            constructor(props) {
                super(props);
                this.handleStoresChanged = this.handleStoresChanged.bind(this);

                this.state = getState(props);
            }

            componentWillMount() {
                stores.forEach(store =>
                    store.addChangeListener(this.handleStoresChanged)
                );
            }

            componentWillReceiveProps(nextProps) {
                if (!shallowEqual(nextProps, this.props)) {
                    this.setState(getState(nextProps));
                }
            }

            componentWillUnmount() {
                stores.forEach(store =>
                    store.removeChangeListener(this.handleStoresChanged)
                );
            }

            handleStoresChanged() {
                this.setState(getState(this.props));
            }

            render() {
                return <ComposedComponent {...this.props} {...this.state} />;
            }
        };
    };
}