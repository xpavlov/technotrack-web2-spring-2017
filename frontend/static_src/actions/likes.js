import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

// import { user } from './../utils/schemas';

export const START_LIKE_SENDING = 'START_LIKE_SENDING';
export const SUCCESS_LIKE_SENDING = 'SUCCESS_LIKE_SENDING';
export const ERROR_LIKE_SENDING = 'ERROR_LIKE_SENDING';

export const START_UNLIKE_SENDING = 'START_UNLIKE_SENDING';
export const SUCCESS_UNLIKE_SENDING = 'SUCCESS_UNLIKE_SENDING';
export const ERROR_UNLIKE_SENDING = 'ERROR_UNLIKE_SENDING';

export const sendLike = (url, content_type, object_id) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            body: JSON.stringify({"content_type": content_type, "object_id": object_id}),
            headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                },
            types: [
                {
                    type: START_LIKE_SENDING,
                    payload: {content_type, object_id}
                },
                {
                    type: SUCCESS_LIKE_SENDING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                console.log(json);
                                return json
                            },
                        );
                    },
                },
                ERROR_LIKE_SENDING,
            ],
        },
    };
};



export const sendUnLike = (url, like_id, content_type, object_id) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url + like_id + '/',
            method: 'DELETE',
            headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                },
            types: [
                {
                    type: START_UNLIKE_SENDING,
                    payload: {like_id, content_type, object_id}
                },
                SUCCESS_UNLIKE_SENDING,
                ERROR_UNLIKE_SENDING,
            ],
        },
    };
};


