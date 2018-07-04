export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

var notificationCount = 0;

export const addNotification = (message) => {
    return (function (dispatch) {
        var show = notificationCount == 0;
        notificationCount += 1;
        dispatch({
            type: ADD_NOTIFICATION,
            payload: message,
        });
        if (show) {
            dispatch(showNotification());
        }
        // setTimeout(dispatch, 5000, {type: DELETE_NOTIFICATION});
    })
};


export const showNotification = () => {
    return (function (dispatch) {
        dispatch({
            type: SHOW_NOTIFICATION,
        });
        // setTimeout(dispatch, 100, {type: SHOW_NOTIFICATION});
        setTimeout(dispatch, 5000, hideNotification());
    })
}

export const hideNotification = () => {
    return (function (dispatch) {
        dispatch({
            type: HIDE_NOTIFICATION,
        });
        setTimeout(dispatch, 1000, deleteNotification());
    })
}

export const deleteNotification = () => {
    return (function (dispatch) {
        dispatch({
            type: DELETE_NOTIFICATION,
        });
        notificationCount -= 1;
        if (notificationCount > 0) {
            setTimeout(dispatch, 0, showNotification());
        }
    })
}
