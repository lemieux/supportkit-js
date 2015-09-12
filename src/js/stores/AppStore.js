import { SET_CONFIG } from '../constants/AppConstants';
import BaseStore from './BaseStore';

var ROOT_URL = 'https://sdk.supportkit.io';

class AppStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._rootUrl = ROOT_URL;
        this._appToken = undefined;
        this._jwt = undefined;
        this._appUserId = undefined;
    }

    _registerToActions(action) {
        switch (action.actionType) {
        case SET_CONFIG:
            this._rootUrl = action.config.rootUrl || this._rootUrl;
            this._appToken = action.config.appToken || this._appToken;
            this._jwt = action.config.jwt || this._jwt;
            this._appUserId = action.config.appUserId || this._appUserId;
            this.emitChange();
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
}

export default new AppStore();
