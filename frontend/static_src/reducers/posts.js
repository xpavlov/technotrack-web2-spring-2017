import update from 'react-addons-update';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from './../actions/posts';
import { START_POST_SENDING, SUCCESS_POST_SENDING, ERROR_POST_SENDING } from './../actions/posts';
import { START_COMMENT_SENDING, SUCCESS_COMMENT_SENDING, ERROR_COMMENT_SENDING } from './../actions/comments';
import { START_LIKE_SENDING, SUCCESS_LIKE_SENDING, ERROR_LIKE_SENDING } from './../actions/likes';
import { START_UNLIKE_SENDING, SUCCESS_UNLIKE_SENDING, ERROR_UNLIKE_SENDING } from './../actions/likes';

const initialState = {
    postList: [],
    isLoading: false,
    isPostSending: false,
    isCommentSending: false,
};


export default function posts(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.posts) {
        newStore = update(store, {
            // posts: { $merge: action.payload.entities.posts },
        });
    }

    switch (action.type) {
        case START_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                postList: { $set: action.payload },
            });
        }
        case ERROR_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }

        case START_POST_SENDING: {
            return update(newStore, {
                isPostSending: { $set: true },
            });
        }
        case SUCCESS_POST_SENDING: {
            return update(newStore, {
                isPostSending: { $set: false },
                postList: { $set: [action.payload, ...newStore.postList] },
            });
        }
        case ERROR_POST_SENDING: {
            return update(newStore, {
                isPostSending: { $set: false },
            });
        }

        case START_COMMENT_SENDING: {
            return update(newStore, {
                isCommentSending: { $set: true },
            });
        }
        case SUCCESS_COMMENT_SENDING: {
            let found = getPostListId(newStore, action.payload);
            if (found == -1)
                return newStore;

            let oldComments = newStore.postList[found].comments;

            return update(newStore, {
                isCommentSending: { $set: false },
                postList: { [found]: {"comments": { $set: [action.payload, ...oldComments] } } },
            });
        }
        case ERROR_COMMENT_SENDING: {
            return update(newStore, {
                isCommentSending: { $set: false },
            });
        }

        case START_LIKE_SENDING: {
            let found = getPostListId(newStore, action.payload);
            if (found == -1)
                return newStore;

            return update(newStore, {
                postList: { [found]: {"isLiked": {$set: true}} },
            });

        }
        case SUCCESS_LIKE_SENDING: {
            let found = getPostListId(newStore, action.payload);
            if (found == -1)
                return newStore;

            let newCount = newStore.postList[found].likes_count + 1;

            return update(newStore, {
                postList: { [found]: {"likes_count": {$set: newCount}, "likeId": {$set: action.payload.id}} },
            });
        }
        case ERROR_LIKE_SENDING: {
            return newStore;
        }
        case START_UNLIKE_SENDING: {
            let found = getPostListId(newStore, action.payload);
            if (found == -1)
                return newStore;

            let newCount = newStore.postList[found].likes_count - 1;

            return update(newStore, {
                postList: { [found]: {"likes_count": {$set: newCount}, "isLiked": {$set: false}, "likeId": {$set: 0}} },
            });

        }
        default:
            return newStore;
    }
}


function getPostListId(store, payload) {
    let contentType = payload.content_type;
    let objId = payload.object_id;

    //todo:  убрать хардкод
    if (contentType != 8)
        return -1;

    let i = 0;
    let found = -1;
    for (i=0; i < store.postList.length; i++){
        if (store.postList[i].id == objId) {
            found = i;
            break;
        }
    }

    console.log("found id = " + found);
    return found;
}