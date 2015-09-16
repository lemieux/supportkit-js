import urljoin from 'urljoin';
import _ from 'underscore';
import { call } from '../utils/WebAPIUtils';

import AppStore from '../stores/AppStore';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

class UserService {
    constuctor() {
        this.update = _.throttle(this.immediateUpdate.bind(this), 5000);
    }

    immediateUpdate(props) {
        return call({
            url: urljoin('appusers', AppStore.appUserId),
            method: 'PUT',
            data: props
        }).then((user) => {
            UserActions.setUser(user);
        });
    }
}

export default new UserService();
