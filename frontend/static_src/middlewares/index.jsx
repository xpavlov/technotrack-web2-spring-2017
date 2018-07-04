import { apiMiddleware } from 'redux-api-middleware';
// import asyncDispatchMiddleware from './asyncDispatchMiddleware.jsx';
import thunk from 'redux-thunk';

export default [
    // asyncDispatchMiddleware, // ломает action generator loadPosts
    thunk,
    apiMiddleware,
];