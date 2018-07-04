import update from 'react-addons-update';
import { START_USER_LOADING, SUCCESS_USER_LOADING, ERROR_USER_LOADING } from './../actions/users';


const initialState = {
    userList: [],
    isLoading: false,
};


export default function posts(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.users) {
        newStore = update(store, {
            users: { $merge: action.payload.entities.users },
        });
    }

    switch (action.type) {
        case START_USER_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_USER_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                userList: { $set: action.payload },
            });
        }
        case ERROR_USER_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}