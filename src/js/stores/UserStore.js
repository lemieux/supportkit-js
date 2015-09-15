import { SET_USER, UNSET_USER } from '../constants/UserConstants';
import BaseStore from './BaseStore';

class UserStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._user = undefined;
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case SET_USER:
                this._user = action.user;
                this.emitChange();
                break;
            case UNSET_USER:
                delete this._user;
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get user() {
        return this._user;
    }
}

export default new UserStore();
