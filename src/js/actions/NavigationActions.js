import AppDispatcher from '../AppDispatcher.jsx';
import { SET_VIEW, CONVERSATION_VIEW, SETTINGS_VIEW } from '../constants/NavigationConstants';

export default {
    showConversation: () => {
        AppDispatcher.dispatch({
            actionType: SET_VIEW,
            view: CONVERSATION_VIEW
        });
    },
    showSettings: () => {
        AppDispatcher.dispatch({
            actionType: SET_VIEW,
            view: SETTINGS_VIEW
        });
    }
}
