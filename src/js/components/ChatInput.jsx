import { Component } from 'react';
import React from 'react/addons'
import mixin from 'react-mixin';

import AppStore from '../stores/AppStore';
import ConnectToStores from './ConnectToStores.jsx';

import ConversationService from '../services/ConversationService';

@ConnectToStores([AppStore], props => ({
    uiText: AppStore.uiText
}))
@mixin.decorate(React.addons.LinkedStateMixin)
export default class ChatInput extends Component {
    static displayName = 'ChatInput'

    constructor() {
        super();
        this.state = {
            text: ''
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        let text = this.state.text;
        this.setState({text: ''});

        ConversationService.sendMessage({
            text: text
        });
    }

    render() {
        return (
            <div id="sk-footer">
                <form onSubmit={ this.sendMessage }>
                    <input placeholder={ this.props.uiText.inputPlaceholder } className="input message-input" valueLink={this.linkState('text')}></input>
                    <a href="#" className="send" onClick={ this.sendMessage }>{ this.props.uiText.sendButtonText }</a>
                </form>
            </div>
        );
    }
}