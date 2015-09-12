import React from 'react';

import AppService from './services/App.jsx';
import AppActions from './actions/AppActions';

import ChatWindow from './components/ChatWindow.jsx';

import cookie from 'cookie';

const SK_STORAGE = 'sk_deviceid';

var getDeviceId = () => {
    var deviceId;

    // get device ID first from local storage, then cookie. Otherwise generate new one
    deviceId = localStorage.getItem(SK_STORAGE) ||
        cookie.parse(document.cookie)[SK_STORAGE] ||
        uuid.v4().replace(/-/g, '');

    // reset the cookie and local storage
    document.cookie = SK_STORAGE + '=' + deviceId;
    localStorage.setItem(SK_STORAGE, deviceId);

    return deviceId;
};


export default class SupportKit {
    init(props) {
        this.VERSION = '0.2.30';

        let el = document.createElement('div');
        el.setAttribute('id', 'sk-body');
        React.render(
            <ChatWindow/>,
            el
        );

        document.addEventListener('DOMContentLoaded', function() {
           document.body.appendChild(el);
        });

        AppActions.setConfig({
            appToken: props.appToken,
            emailCaptureEnabled: props.emailCaptureEnabled,
            rootUrl: props.serviceUrl
        })

        AppService.appBoot({
            sdkVersion: this.VERSION,
            userId: props.userId,
            deviceId: getDeviceId()
        });

    }
}