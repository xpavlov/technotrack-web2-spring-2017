import { CALL_API, getJSON } from 'redux-api-middleware';
import { normalize } from 'normalizr';

export const START_USER_LOADING = 'START_USER_LOADING';
export const SUCCESS_USER_LOADING = 'SUCCESS_USER_LOADING';
export const ERROR_USER_LOADING = 'ERROR_USER_LOADING';


export const loadUsers = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_USER_LOADING,
                {
                    type: SUCCESS_USER_LOADING,
                    payload: (action, state, res) => {
                        return getJSON(res).then(
                            (json) => {
                                // const normalizedData = normalize(json.results, [user]);
                                // delete json.results;
                                // return Object.assign({}, json, normalizedData);
                                return json.map(item => item);
                            },
                        );
                    },
                },
                ERROR_USER_LOADING,
            ],
        },
    };
};