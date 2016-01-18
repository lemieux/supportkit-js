import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage, getReadTimestamp, updateReadTimestamp } from 'services/conversation-service';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';


export class ChatInputComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            text: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    onSendMessage(e) {
        e.preventDefault();
        const text = this.state.text;
        if (text.trim()) {
            this.setState({
                text: ''
            });
            this.refs.input.clearValue();
            sendMessage(text);
        }

        this.refs.input.focus();
    }

    onFocus(e) {
        if (getReadTimestamp() > 0) {
            updateReadTimestamp(0);
        }
    }

    render() {
        const styles = {
            paper: {
                paddingLeft: 5
            },
            input: {
                width: 232
            }
        };

        return (
            <Paper style={ styles.paper }>
                <form onSubmit={ this.onSendMessage }>
                    <TextField ref='input'
                               hintText={ this.props.ui.text.inputPlaceholder }
                               onChange={ this.onChange }
                               onFocus={ this.onFocus }
                               style={ styles.input } />
                    <FlatButton ref='button' label={ this.props.ui.text.sendButtonText } onClick={ this.onSendMessage } />
                </form>
            </Paper>
            );
            // <div id='sk-footer'>
            //         <input ref='input'
            //             placeholder={ this.props.ui.text.inputPlaceholder }
            //             className='input message-input'
            //             onChange={ this.onChange }
            //             onFocus={ this.onFocus }
            //         value={ this.state.text }></input>
            //         <a ref='button'
            //             href='#'
            //             className='send'
            //         onClick={ this.onSendMessage }>
            //         { this.props.ui.text.sendButtonText }
            //         </a>
            //     </div>
    }
}

export const ChatInput = connect((state) => {
    return {
        ui: state.ui
    };
})(ChatInputComponent);
