import update from 'react-addons-update';
import { ADD_NOTIFICATION, DELETE_NOTIFICATION, SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './../actions/notifications';

const initialState = {
    notificationList: [],
    currentNotification: "",
};

export default function notifications(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case ADD_NOTIFICATION: {
            return update(newStore, {
                notificationList: {$set: [...newStore.notificationList, action.payload]},
            });
        }

        case DELETE_NOTIFICATION: {
            return update(newStore, {
                notificationList: {$set: [...(newStore.notificationList.slice(1))]},
            });
        }

        case SHOW_NOTIFICATION: {
            var current = "";
            if (newStore.notificationList.length > 0)
                current = newStore.notificationList[0];
            return update(newStore, {
                currentNotification: {$set: current},
            });
        }

        case HIDE_NOTIFICATION: {
            return update(newStore, {
                currentNotification: {$set: ""},
            });
        }

        default:
            return newStore;
    }
}
