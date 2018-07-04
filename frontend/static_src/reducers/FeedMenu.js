import update from 'react-addons-update';
import apiUrls from './../constants/apiUrls';

import {CHANGE_FEED_MENU} from '../actions/FeedMenu';


const initialState = {
    activeItem: 3,
    apiUrl: apiUrls.posts
};


export default function posts(store = initialState, action) {
    let newStore = store;

    switch (action.type) {
        case CHANGE_FEED_MENU: {
            let newUrl = apiUrls.posts;
            let newIndex = parseInt(action.payload.index);
            if (newIndex == 0)
                newUrl = apiUrls.events;
            if (newIndex == 1)
                newUrl = apiUrls.myFeedPosts;
            if (newIndex == 2)
                newUrl = apiUrls.myPosts ;
            if (newIndex == 3)
                newUrl = apiUrls.posts;

            return update(newStore, {
                activeItem: { $set: newIndex },
                apiUrl: { $set: newUrl},
            });
        }
        default:
            return newStore;
    }
}