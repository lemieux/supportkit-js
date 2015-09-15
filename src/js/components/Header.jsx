import React, { Component } from 'react';

import AppStore from '../stores/AppStore';
import ConnectToStores from './ConnectToStores.jsx';

@ConnectToStores([AppStore], props => ({
    uiText: AppStore.uiText
}))
export default class Header extends Component {
    render() {
        return (
            <div id="sk-header" className="" onClick={this.props.onClick}>
                <div id="sk-notification-badge"><i className="fa fa-gear"></i></div>
                <div className="sk-show-handle sk-appear-hidden"><i className="fa fa-arrow-up"></i></div>
                <div className="sk-close-handle sk-close-hidden"><i className="fa fa-times"></i></div>
                { this.props.uiText.headerText }
            </div>
        );
    }
}