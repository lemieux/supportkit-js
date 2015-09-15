import React, { Component } from 'react';
import urljoin from 'urljoin';

import ConversationStore from '../stores/ConversationStore';
import AppStore from '../stores/AppStore';
import ConnectToStores from './ConnectToStores.jsx';

import { createMarkup } from '../utils/HTMLUtils';

@ConnectToStores([AppStore], props => ({
    rootUrl: AppStore.rootUrl
}))
export class Message extends Component {
    render() {
        let avatar = null;
        if(this.props.isAppMaker) {
            let avatarUrl =
                this.props.avatarUrl ||
                (this.props.isAppMaker ? urljoin(this.props.rootUrl, '/api/users/', this.props.authorId, '/avatar') : '');
            avatar = <img className="sk-msg-avatar" src={ avatarUrl } />;
        }

        let text = this.props.text.split('\n').length === 1
            ? this. props.text
            : this.props.text.split('\n').map((item, index) => {
              return (<span key={index}>{item}<br/></span>);
            });

        return (
            <div className={ 'sk-row ' + (this.props.isAppMaker ? 'sk-left-row' : 'sk-right-row') }>
                { avatar }
                <div className="sk-msg-wrapper">
                    <div className="sk-from">{ this.props.isAppMaker ? this.props.name : '' }</div>
                    <div className="sk-msg"> { text }</div>
                </div>
                <div className="sk-clear"></div>
            </div>
        );
    }
}

@ConnectToStores([ConversationStore, AppStore], props => ({
    messages: ConversationStore.messages,
    uiText: AppStore.uiText
}))
export default class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        };
    }

    _scrollToBottom() {
        let container = this.refs.container.getDOMNode();
        let logo = this.refs.logo.getDOMNode();

        let scrollTop = container.scrollHeight - container.clientHeight - logo.clientHeight;
        container.scrollTop = scrollTop;
    }

    componentDidMount() {
        this._scrollToBottom();
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    render() {
        let messages = this.state.messages.map((message) => {
            return <Message key={message._id} {...message} />;
        });

        return (
            <div id="sk-conversation" ref="container">
                <div className="sk-intro" dangerouslySetInnerHTML={createMarkup(this.props.uiText.introText)}></div>
                    { messages }
                    <div className="sk-logo" ref="logo">
                        <a href="https://supportkit.io/?utm_source=widget" target="_blank">
                            In-App Messaging by
                            <img className="sk-image" src="https://cdn.supportkit.io/images/logo_webwidget.png" alt="SupportKit" />
                            <img className="sk-image-retina" src="https://cdn.supportkit.io/images/logo_webwidget_2x.png" alt="SupportKit" />
                        </a>
                    </div>
            </div>
        );
    }
}