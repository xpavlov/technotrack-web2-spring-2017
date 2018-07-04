import { CALL_API, getJSON } from 'redux-api-middleware';
import { push } from 'react-router-redux';
// import { normalize } from 'normalizr';

// import { post } from './../utils/schemas';

export const START_EVENT_LOADING = 'START_EVENT_LOADING';
export const SUCCESS_EVENT_LOADING = 'SUCCESS_EVENT_LOADING';
export const ERROR_EVENT_LOADING = 'ERROR_EVENT_LOADING';

export const loadEvents = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_EVENT_LOADING,
                {
                    type: SUCCESS_EVENT_LOADING,
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
                ERROR_EVENT_LOADING,
            ],
        },
    };
};