import urljoin from 'urljoin';
import { call } from '../utils/WebAPIUtils';
import { initFaye } from '../utils/FayeUtils';

import ConversationActions from '../actions/ConversationActions';

var setConversation = (conversation) => {
    ConversationActions.setConversation({
        conversationId: conversation._id,
        messages: conversation.messages,
        appMakers: conversation.appMakers,
        appUsers: conversation.appUsers
    });
};


class ConversationService {
    getConversation(props) {
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

    createConversation(props) {
        return call({
            url: 'conversations',
            method: 'POST'
        }).then(setConversation);
    }

    sendMessage(props) {
        return call({
            url: urljoin('conversations', props.conversationId, 'messages'),
            method: 'POST',
            data: props.message
        }).then((message) => {
            ConversationActions.addMessage({
                message: message
            })
        });
    }

    connect(props) {
        return initFaye(props.conversationId)
            .then((client) => {
                ConversationActions.setClient({
                    client: client
                });
            });
    }
}

export default new ConversationService();
