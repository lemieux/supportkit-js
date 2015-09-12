import AppDispatcher from '../AppDispatcher.jsx';
import { SET_CONFIG } from '../constants/AppConstants';

export default {
    setConfig: (config) => {
        AppDispatcher.dispatch({
            actionType: SET_CONFIG,
            config: config
        });
    }
}