import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Paper from 'material-ui/lib/paper';
import LeftNav from 'material-ui/lib/left-nav';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import CommunicationChat from 'material-ui/lib/svg-icons/communication/chat';
import Colors from 'material-ui/lib/styles/colors';

import { Conversation } from 'components/conversation';
import { ChatInput } from 'components/material-ui/chat-input';

import { toggleWidget } from 'actions/app-state-actions';

import { Header } from 'components/material-ui/header';

export class WidgetComponent extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            conversationHeight: '100%'
        };
    }

    updateConversationHeight() {
        const headerHeight = findDOMNode(this.refs.header).clientHeight;
        const inputHeight = findDOMNode(this.refs.input).clientHeight;
        const leftNavHeight = findDOMNode(this.refs.leftNav).children[0].clientHeight;

        this.setState({
            conversationHeight: leftNavHeight - headerHeight - inputHeight
        });
    }

    componentDidMount() {
        setTimeout(this.updateConversationHeight.bind(this));
    }

    render() {
        let className = typeof this.props.appState.widgetOpened === 'undefined' ? '' :
            this.props.appState.widgetOpened ? 'sk-appear' : 'sk-close';

        const styles = {
            wrapper: {
                width: 330,
                height: 440,
                position: 'relative',
                borderRadius: 'none'
            },
            container: {
                border: 'none',
                boxShadow: 'none',
                borderRadius: 0,
                overflow: 'visible',
                animation: 'none',
                bottom: 0,
                zIndex: 9997
            },
            button: {
                position: 'relative',
                left: -20,
                bottom: 25,
            // visibility: this.props.appState.widgetOpened ? 'hidden' : 'visible'
            },
            leftNav: {
                background: 'rgba(240, 240, 240, 0.97)',
                zIndex: 9998
            },
            conversation: {
                height: this.state.conversationHeight,
                overflowY: 'scroll'
            }
        };



        return (

            <div>
                <LeftNav ref="leftNav"
                         style={ styles.leftNav }
                         open={ this.props.appState.widgetOpened }
                         width={330}
                         openRight={ true }>
                    <Header ref="header" />
                    <Conversation ref="conversation" style={ styles.conversation } />
                    <ChatInput ref="input" />
                </LeftNav>
                <div style={ styles.container } id="sk-container" className={ className }>
                    <div style={ styles.button }>
                        <FloatingActionButton primary={ true } onTouchTap={ this.props.actions.toggleWidget }>
                            <CommunicationChat color={ Colors.white } />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
            )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleWidget
        }, dispatch)
    };
}

export const Widget = connect((state) => {
    return {
        appState: state.appState
    };
}, mapDispatchToProps)(WidgetComponent);
