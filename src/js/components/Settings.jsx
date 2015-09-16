import { Component } from 'react';
import React from 'react/addons'
import mixin from 'react-mixin';

import AppStore from '../stores/AppStore';
import UserStore from '../stores/UserStore';
import ConnectToStores from './ConnectToStores.jsx';

import UserService from '../services/UserService';

@ConnectToStores([AppStore, UserStore], props => ({
    uiText: AppStore.uiText,
    email: UserStore.user && UserStore.user.email
}))
@mixin.decorate(React.addons.LinkedStateMixin)
export default class Settings extends Component {
    static displayName = 'Settings'

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email
        };

        this.save = this.save.bind(this);
    }

    save(e) {
        e.preventDefault();

        UserService.immediateUpdate({
            email: this.state.email
        });
    }

    render() {
        return (
            <div id="sk-settings">
                <div className="settings-wrapper">
                    <p>
                        { this.props.readOnlyEmail ? this.props.uiText.settingsReadOnlyText : this.props.uiText.settingsText }
                    </p>
                    <form onSubmit={this.save}>
                        <div className="input-group">
                            <i className="fa fa-envelope-o before-icon"></i>
                            <input type="text" placeholder={this.props.uiText.settingsInputPlaceholder} className="input email-input" valueLink={this.linkState('email')} />
                        </div>

                        <div className="input-group">
                            <button type="button" className="btn btn-sk-primary" onClick={ this.save }>{ this.props.uiText.settingsSaveButtonText }</button>
                            <span className="form-message"></span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}