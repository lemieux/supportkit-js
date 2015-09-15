import AppDispatcher from '../AppDispatcher.jsx';
import { SET_USER, UNSET_USER } from '../constants/UserConstants';

export default {
    setUser: (props) => {
        AppDispatcher.dispatch({
            actionType: SET_USER,
            user: props
        });
    },
    unsetUser: (props) => {
        AppDispatcher.dispatch({
            actionType: UNSET_USER
        });
    }
}
