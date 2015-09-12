import React, { Component } from 'react';

export default class Conversation extends Component {

    render() {
        return (
            <div id="sk-conversation">
                <div className="sk-intro">Wassup React</div>
                    <div data-ui-messages></div>
                    <div className="sk-logo">
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