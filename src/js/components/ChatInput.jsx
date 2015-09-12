import React, { Component } from 'react';

export default class ChatInput extends Component {

    render() {
        return (
            <div id="sk-footer" className="">
                <form data-ui-form>
                    <input placeholder="Type a message..." className="input message-input"></input>
                    <a href="#" className="send" data-ui-send>Send</a>
                </form>
            </div>
        );
    }
}