import _ from 'underscore';

import { SET_CONFIG, UNSET_CONFIG, DEFAULT_UI_TEXT, ROOT_URL } from '../constants/AppConstants';
import BaseStore from './BaseStore';

class AppStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._rootUrl = ROOT_URL;
        this._appToken = null;
        this._jwt = null;
        this._appUserId = null;
    }

    _registerToActions(action) {
        switch (action.actionType) {
        case SET_CONFIG:
            this._rootUrl = action.config.rootUrl || this._rootUrl;
            this._appToken = action.config.appToken || this._appToken;
            this._jwt = action.config.jwt || this._jwt;
            this._appUserId = action.config.appUserId || this._appUserId;
            this._uiText = _.extend({}, DEFAULT_UI_TEXT, action.config.customText);
            this.emitChange();
            break;
        case UNSET_CONFIG:
            this._rootUrl = ROOT_URL;
            this._appToken = null;
            this._jwt = null;
            this._appUserId = null;
            this._uiText = DEFAULT_UI_TEXT;
            break;
        default:
            break;
        }
    }

    get rootUrl() {
        return this._rootUrl;
    }

    get appToken() {
        return this._appToken;
    }

    get jwt() {
        return this._jwt;
    }

    get appUserId() {
        return this._appUserId;
    }

    get uiText() {
        return this._uiText;
    }
}

export default new AppStore();
