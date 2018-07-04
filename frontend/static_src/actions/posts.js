import { CALL_API, getJSON } from 'redux-api-middleware';
import { push } from 'react-router-redux';
// import { normalize } from 'normalizr';

// import { post } from './../utils/schemas';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const START_POST_SENDING = 'START_POST_SENDING';
export const SUCCESS_POST_SENDING = 'SUCCESS_POST_SENDING';
export const ERROR_POST_SENDING = 'ERROR_POST_SENDING';

export const SHOW_POST_DETAILS = 'SHOW_POST_DETAILS';


export const loadPosts = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_POST_LOADING,
                {
                    type: SUCCESS_POST_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                // const normalizedData = normalize(json.results, [post]);
                                // delete json.results;
                                // return Object.assign({}, json, normalizedData);
                                return json.map(item => item);
                            },
                        );
                    },
                },
                ERROR_POST_LOADING,
            ],
        },
    };
};

export const sendPost = (url, text) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'POST',
            body: JSON.stringify({text}),
            headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                },
            types: [
                START_POST_SENDING,
                {
                    type: SUCCESS_POST_SENDING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                console.log(json);
                                return json
                            },
                        );
                    },
                },
                ERROR_POST_SENDING,
            ],
        },
    };
};


export const showPostDetails = (postId) => {
    return (
        function (dispatch) {
            // dispatch({
            //     type: SHOW_POST_DETAILS,
            //     payload: arrayId
            //     });
            dispatch(push('/posts/' + postId));
        }
    );
};