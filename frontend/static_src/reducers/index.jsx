import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';
import users from './users';
import events from './events'
import notifications from './notifications'
import UsersMenu from './UsersMenu';
import FeedMenu from './FeedMenu';


export default combineReducers({
    routerReducer,
    posts,
    users,
    events,
    notifications,
    UsersMenu,
    FeedMenu,
});