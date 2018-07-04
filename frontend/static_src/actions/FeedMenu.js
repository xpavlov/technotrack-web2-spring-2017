export const CHANGE_FEED_MENU = 'CHANGE_FEED_MENU';


export const changeItem = (item, data) => {
    return {
        type: CHANGE_FEED_MENU,
        payload: data ,
    }
};