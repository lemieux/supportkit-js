import React, { Component } from 'react';

import AppStore from '../stores/AppStore';
import ConnectToStores from './ConnectToStores.jsx';

@ConnectToStores([AppStore], props => ({
    uiText: AppStore.uiText
}))
export default class Header extends Component {
    render() {
        let settingsButton = this.props.showSettings ? '' : (
            <div id="sk-notification-badge" onClick={this.props.onSettingsClick}><i className="fa fa-gear"></i></div>
        );

        let backButton = this.props.showSettings ? (
            <div className="sk-back-handle" onClick={this.props.onBackClick}><i className="fa fa-arrow-left"></i></div>
        ) : '';

        return (
            <div id={ this.props.showSettings ? 'sk-settings-header' : 'sk-header'} onClick={this.props.onClick}>
                { settingsButton }
                { backButton }
                { this.props.showSettings ? this.props.uiText.settingsHeaderText : this.props.uiText.headerText }
                <div className="sk-show-handle sk-appear-hidden"><i className="fa fa-arrow-up"></i></div>
                <div className="sk-close-handle sk-close-hidden"><i className="fa fa-times"></i></div>
            </div>
        );
    }
}