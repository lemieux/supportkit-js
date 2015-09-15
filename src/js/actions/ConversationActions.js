import AppDispatcher from '../AppDispatcher.jsx';
import { SET_CONVERSATION, ADD_MESSAGE, CLEAR_CONVERSATION, SET_CLIENT } from '../constants/ConversationConstants';

export default {
    setConversation: (props) => {
        AppDispatcher.dispatch({
            actionType: SET_CONVERSATION,
            conversationId: props.conversationId,
            appMakers: props.appMakers,
            appUsers: props.appUsers,
            messages: props.messages
        });
    },

    addMessage: (props) => {
        AppDispatcher.dispatch({
            actionType: ADD_MESSAGE,
            message: props.message
        });
    },

    clearConversation: (props) => {
        AppDispatcher.dispatch({
            actionType: CLEAR_CONVERSATION
        });
    },

    setClient: (props) => {
        AppDispatcher.dispatch({
            actionType: SET_CLIENT,
            client: props.client
        });
    }
}
