import React, { Component } from 'react';
import Header from './Header.jsx';
import Conversation from './Conversation.jsx';
import Settings from './Settings.jsx';
import ChatInput from './ChatInput.jsx';

export default class ChatWindow extends Component {

    constructor() {
        super();

        this.state = {
            isOpened: false,
            isToggled: false,
            showSettings: false
        };

        this.toggle = this.toggle.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
    }

    toggle(e) {
        e.preventDefault();

        this.setState({
            isOpened: !this.state.isOpened,
            isToggled: true,
            showSettings: false
        });
    }

    showSettings(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isOpened: true,
            isToggled: true,
            showSettings: true
        });
    }

    hideSettings(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            isOpened: true,
            isToggled: true,
            showSettings: false
        });
    }

    render() {

        let className = this.state.isToggled ? '' : 'sk-noanimation ';
        className += this.state.isOpened ? 'sk-appear' : 'sk-close';

        let settings = this.state.showSettings ? (<Settings showSettings={this.state.showSettings} />) : undefined;
        return (
            <div id="sk-container" className={ className }>
                <div id="sk-wrapper">
                    <Header
                        isOpened={this.state.isOpened}
                        showSettings={this.state.showSettings}
                        onClick={this.toggle}
                        onSettingsClick={this.showSettings}
                        onBackClick={this.hideSettings}
                    />
                    { settings }
                    <Conversation/>
                    <ChatInput/>
                </div>
            </div>
        );
    }
}