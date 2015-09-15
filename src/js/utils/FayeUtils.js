import Faye from 'faye';
import _ from 'underscore';
import urljoin from 'urljoin';

import AppStore from '../stores/AppStore';
import ConversationActions from '../actions/ConversationActions';

export function initFaye(conversationId) {
    var faye = new Faye.Client(urljoin(AppStore.rootUrl, '/faye'));
    faye.addExtension({
        outgoing: (message, callback) => {
            if (message.channel === '/meta/subscribe') {
                message.appToken = AppStore.appToken;
                message.appUserId = AppStore.appUserId;

                if (AppStore.jwt) {
                    message.jwt = AppStore.jwt;
                }
            }

            callback(message);
        }
    });

    return new Promise((resolve, reject) => {
        faye.subscribe('/conversations/' + conversationId, function(message) {
            ConversationActions.addMessage({
                message: message
            });
        }).then(() => {
            resolve(faye);
        }, reject);

    });
}
