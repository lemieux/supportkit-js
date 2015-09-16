import React, { Component } from 'react';
import Header from './Header.jsx';
import Conversation from './Conversation.jsx';
import ChatInput from './ChatInput.jsx';

export default class ChatWindow extends Component {

    constructor() {
        super();

        this.state = {
            isOpened: false,
            isToggled: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(e) {
        e.preventDefault();

        this.setState({
            isOpened: !this.state.isOpened,
            isToggled: true
        });
    }

    render() {

        let className = this.state.isToggled ? '' : 'sk-noanimation ';
        className += this.state.isOpened ? 'sk-appear' : 'sk-close';

        return (
            <div id="sk-container" className={ className }>
                <div id="sk-wrapper">
                    <Header isOpened={this.state.isOpened} onClick={this.toggle}/>
                    <Conversation/>
                    <ChatInput/>
                </div>
            </div>
        );
    }
}