import React, { Component } from 'react';
import Header from './Header.jsx';
import Conversation from './Conversation.jsx';
import ChatInput from './ChatInput.jsx';

export default class ChatWindow extends Component {

    render() {
        return (
            <div id="sk-container" className="sk-appear">
                <div id="sk-wrapper">
                    <Header/>
                    <Conversation/>
                    <ChatInput/>
                </div>
            </div>
        );
    }
}