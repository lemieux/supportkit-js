import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleWidget, showSettings, hideSettings } from 'actions/app-state-actions';

import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import NavigationExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less';
import NavigationExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more';

export class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
    }

    showSettings(e) {
        e.stopPropagation();
        this.actions.showSettings();
    }

    hideSettings(e) {
        e.stopPropagation();
        this.actions.hideSettings();
    }

    render() {
        let {settingsEnabled, settingsVisible, widgetOpened} = this.props.appState;
        let {settingsHeaderText, headerText} = this.props.ui.text;

        let unreadTimestamp = this.props.appState.messageReadTimestamp;

        let unreadMessagesCount = unreadTimestamp <= 0 ? 0 : this.props.conversation.messages.reduce((count, message) => {
            if (message.role !== 'appUser' && unreadTimestamp <= message.received) {
                return count + 1;
            }
            return count;
        }, 0);

        let unreadBadge = !settingsVisible && unreadMessagesCount > 0 ? (
            <div id="sk-badge">
                { unreadMessagesCount }
            </div>
            ) : null;

        const settingsButton = widgetOpened && settingsEnabled && !settingsVisible ? (
            <div id="sk-settings-handle" onClick={ this.showSettings }>
                <i className="fa fa-gear"></i>
            </div>
            ) : null;

        const backButton = widgetOpened && settingsEnabled && settingsVisible ? (
            <div className="sk-back-handle" onClick={ this.hideSettings }>
                <i className="fa fa-arrow-left"></i>
            </div>
            ) : null;

        const closeHandle = <IconButton onTouchTap={ this.actions.toggleWidget }>
                                { widgetOpened ? (
                                      <NavigationExpandMore color={ Colors.white } />
                                      ) : (
                                      <NavigationExpandLess color={ Colors.white } />
                                      ) }
                            </IconButton>;

        const settingsTextStyle = {
            display: 'inline-block',
            height: 30
        };

        const settingsText = <div style={ settingsTextStyle } onClick={ this.hideSettings }>
                                 { settingsHeaderText }
                             </div>;


        const styles = {
            title: {
                cursor: 'pointer',
            }
        };

        return (
            <AppBar zDepth={ 0 }
                    style={ styles.title }
                    onTitleTouchTap={ this.actions.toggleWidget }
                    showMenuIconButton={ false }
                    title={ settingsVisible ? settingsText : headerText }
                    iconElementRight={ closeHandle } />
            );
    }
}


// <div id={ settingsVisible ? 'sk-settings-header' : 'sk-header' } onClick={ this.actions.toggleWidget }>
//     { settingsButton }
//     { backButton }
//     { settingsVisible ? settingsText : headerText }
//     { unreadBadge }
//     { closeHandle }
// </div>

function mapStateToProps(state) {
    return {
        ui: state.ui,
        appState: state.appState,
        conversation: state.conversation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleWidget,
            showSettings,
            hideSettings
        }, dispatch)
    };
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
