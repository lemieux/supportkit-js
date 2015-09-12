import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <div id="sk-header" className="">
                <div id="sk-notification-badge"><i className="fa fa-gear"></i></div>
                <div className="sk-close-handle sk-close-hidden"><i className="fa fa-times"></i></div>
            </div>
        );
    }
}