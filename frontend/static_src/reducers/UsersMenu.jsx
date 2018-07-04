import update from 'react-addons-update';
import apiUrls from './../constants/apiUrls';

import {CHANGE_USERS_MENU} from '../actions/UsersMenu';


const initialState = {
    activeItem: 0,
    apiUrl: apiUrls.users
};


export default function users(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case CHANGE_USERS_MENU: {
            let newUrl = apiUrls.users;
            let newIndex = parseInt(action.payload.index);
            if (newIndex == 0)
                newUrl = apiUrls.following;
            if (newIndex == 1)
                newUrl = apiUrls.followers;
            if (newIndex == 2)
                newUrl = apiUrls.users;

            return update(newStore, {
                activeItem: { $set: newIndex },
                apiUrl: { $set: newUrl},
            });
        }
        default:
            return newStore;
    }
}