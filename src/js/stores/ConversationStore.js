import urljoin from 'urljoin';

import { SET_CONVERSATION, ADD_MESSAGE, CLEAR_CONVERSATION } from '../constants/ConversationConstants';
import BaseStore from './BaseStore';
import AppStore from './AppStore';

class ConversationStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this._processMessage = this._processMessage.bind(this);
        this._conversationId = null;
        this._messages = [];
        this._appMakers = [];
        this._appUsers = [];
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case SET_CONVERSATION:
                this._conversationId = action.conversationId;
                this._appMakers = action.appMakers;
                this._appUsers = action.appUsers;
                this._messages = action.messages.map(this._processMessage);
                this.emitChange();
                break;
            case ADD_MESSAGE:
                this._messages.push(this._processMessage(action.message));
                this.emitChange();
                break;
            case CLEAR_CONVERSATION:
                this._conversationId = null;
                this._messages = [];
                this.emitChange();
                break;
            default:
                break;
        }
    }

    _processMessage(message) {
        message.isAppMaker = this.appMakers.indexOf(message.authorId) >= 0;
        return message;
    }

    get messages() {
        return this._messages;
    }

    get conversationId() {
        return this._conversationId;
    }

    get appMakers() {
        return this._appMakers;
    }

    get appUsers() {
        return this._appUsers;
    }
}

export default new ConversationStore();
