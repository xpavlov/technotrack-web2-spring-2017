import update from 'react-addons-update';
import { START_EVENT_LOADING, SUCCESS_EVENT_LOADING, ERROR_EVENT_LOADING } from './../actions/events';

const initialState = {
    eventList: [],
    isLoading: false,
};


export default function events(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case START_EVENT_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_EVENT_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                eventList: { $set: action.payload },
            });
        }
        case ERROR_EVENT_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}
