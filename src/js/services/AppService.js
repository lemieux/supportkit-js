import { call } from '../utils/WebAPIUtils';

import AppActions from '../actions/AppActions';
import UserActions from '../actions/UserActions';

import cookie from 'cookie';
import uuid from 'uuid';

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

class AppService {
    login(props) {
        let data = {
            deviceId: getDeviceId(),
            deviceInfo: {
                URL: document.location.host,
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                browserLanguage: navigator.language,
                currentUrl: document.location.href,
                sdkVersion: props.sdkVersion,
                currentTitle: document.title,
                platform: 'web'
            }
        };

        if (props.userId) {
            data.userId = props.userId;
        }

        return call({
            url: 'appboot',
            method: 'POST',
            data: data
        }).then((response) => {
            AppActions.setConfig({
                appUserId: response.appUserId
            });

            UserActions.setUser(response.appUser);
        });
    }
}

export default new AppService();
