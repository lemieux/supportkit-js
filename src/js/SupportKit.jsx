import React from 'react';

import AppService from './services/AppService';
import ConversationService from './services/ConversationService';

import AppStore from './stores/AppStore';
import UserStore from './stores/UserStore';
import ConversationStore from './stores/ConversationStore';

import AppActions from './actions/AppActions';

import ChatWindow from './components/ChatWindow.jsx';


export default class SupportKit {
    init(props) {
        this.VERSION = '0.2.30';

        this._el = document.createElement('div');
        this._el.setAttribute('id', 'sk-holder');

        document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(this._el);
        });

        AppActions.setConfig({
            appToken: props.appToken,
            emailCaptureEnabled: props.emailCaptureEnabled,
            rootUrl: props.serviceUrl,
            customText: props.customText
        });

        return this.login(props.userId, props.jwt);
    }

    login(userId, jwt) {
        if (jwt) {
            AppActions.setConfig({
                jwt: jwt
            });
        }

        return AppService.login({
            sdkVersion: this.VERSION,
            userId: userId
        })
            .then(ConversationService.getConversation)
            .then(() => {
                if (ConversationStore.conversationId) {
                    return ConversationService.connect({
                        conversationId: ConversationStore.conversationId
                    });
                }
            })
            .then(() => {
                this._render();
            });
    }

    _render() {
        React.render(<ChatWindow/>, this._el);
    }
}
