import { SET_VIEW, CONVERSATION_VIEW, SETTINGS_VIEW } from '../constants/NavigationConstants';
import BaseStore from './BaseStore';

class NavigationStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._currentView = CONVERSATION_VIEW;
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case SET_VIEW:
                this._currentView = action.view;
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get currentView() {
        return this._currentView;
    }
}

export default new NavigationStore();
