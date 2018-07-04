import { CALL_API, getJSON } from 'redux-api-middleware';
// import { normalize } from 'normalizr';

// import { post } from './../utils/schemas';

export const START_COMMENT_SENDING = 'START_COMMENT_SENDING';
export const SUCCESS_COMMENT_SENDING = 'SUCCESS_COMMENT_SENDING';
export const ERROR_COMMENT_SENDING = 'ERROR_COMMENT_SENDING';

export const sendComment = (url, content_type, object_id, text) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            body: JSON.stringify({content_type, object_id, text}),
            headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                },
            types: [
                START_COMMENT_SENDING,
                {
                    type: SUCCESS_COMMENT_SENDING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                // console.log(json);
                                return json
                            },
                        );
                    },
                },
                ERROR_COMMENT_SENDING,
            ],
        },
    };
};
