import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import { createMarkup } from 'utils/html';

import { MessageComponent } from 'components/message.jsx';

export class ConversationComponent extends Component {
    static get defaultProps() {
        return {
            style: {}
        }
    }

    constructor(...args) {
        super(...args);
        this.state = {
            logoIsAnchored: true
        };
    }
    _scrollToBottom() {
        let container = findDOMNode(this);
        let logo = this.refs.logo;
        let scrollTop = container.scrollHeight - container.clientHeight - logo.clientHeight;
        container.scrollTop = scrollTop;
    }

    _positionLogo() {
        let container = findDOMNode(this);
        let logo = this.refs.logo;
        let intro = this.refs.intro;
        let messages = this.refs.messages;
        let conversationHeight = container.clientHeight;
        let logoHeight = logo.clientHeight;
        let introHeight = intro.clientHeight;
        let messagesHeight = messages.clientHeight;
        let heightRemaining = conversationHeight - (introHeight + messagesHeight + logoHeight);

        if (heightRemaining > logoHeight) {
            this.refs.logo.className = 'sk-logo anchor-bottom';
        } else {
            this.refs.logo.className = 'sk-logo';
        }
    }

    componentDidMount() {
        setTimeout(this._scrollToBottom.bind(this));
        setTimeout(this._positionLogo.bind(this));
    }

    componentDidUpdate() {
        setTimeout(this._scrollToBottom.bind(this));
        setTimeout(this._positionLogo.bind(this));
    }

    render() {
        const messages = this.props.conversation.messages.map((message) => <MessageComponent key={ message._id } {...message} />);

        return (
            <div ref="container" style={ this.props.style }>
                <div ref="intro" className="sk-intro" dangerouslySetInnerHTML={ createMarkup(this.props.ui.text.introText) }></div>
                <div ref="messages">
                    { messages }
                </div>
                <div className="sk-logo" ref="logo">
                    <a href="https://smooch.io/?utm_source=widget" target="_blank"><span>In-App Messaging by</span> <img className="sk-image" src={ require('images/logo_webwidget.png') } alt="Smooch" /> <img className="sk-image-retina" src={ require('images/logo_webwidget_2x.png') } alt="Smooch" /></a>
                </div>
            </div>
            );
    }
}

export const Conversation = connect((state) => {
    return {
        ui: state.ui,
        conversation: state.conversation
    };
})(ConversationComponent);
