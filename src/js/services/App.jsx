import { call } from '../utils/WebAPIUtils';

class AppService {
    appBoot(props) {
        call({
            url: 'appboot',
            method: 'POST',
            data: {
                deviceId: props.deviceId,
                userId: props.userId,
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
            }
        }).then((response) => {
            console.log(response)
        });
    }

    initFaye() {

    }
}

export default new AppService();