import urljoin from 'urljoin';
import { call } from '../utils/WebAPIUtils';
import { initFaye } from '../utils/FayeUtils';

import AppStore from '../stores/AppStore';
import ConversationStore from '../stores/ConversationStore';
import ConversationActions from '../actions/ConversationActions';

var setConversation = (conversation) => {
    ConversationActions.setConversation({
        conversationId: conversation._id,
        messages: conversation.messages || [],
        appMakers: conversation.appMakers || [],
        appUsers: conversation.appUsers || []
    });
};


class ConversationService {
    getConversation() {
        return call({
            url: 'conversations',
            method: 'GET'
        }).then((conversations) => {
            if (conversations.length > 0) {
                let conversation = conversations[0];
                setConversation(conversation);
            }
        });
    }

    createConversation() {
        return call({
            url: 'conversations',
            method: 'POST'
        }).then(setConversation);
    }

    sendMessage(props) {
        let promise = ConversationStore.conversationId
            ? Promise.resolve()
            : this.createConversation();

        promise.then(() => {
            return call({
                url: urljoin('conversations', ConversationStore.conversationId, 'messages'),
                method: 'POST',
                data: {
                    text: props.text,
                    authorId: AppStore.appUserId
                }
            }).then((message) => {
                ConversationActions.addMessage({
                    message: message
                })
            })
        });

        return promise;
    }

    connect() {
        return initFaye(ConversationStore.conversationId)
            .then((client) => {
                ConversationActions.setClient({
                    client: client
                });
            });
    }
}

export default new ConversationService();
