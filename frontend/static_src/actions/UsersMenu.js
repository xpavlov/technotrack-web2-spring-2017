export const CHANGE_USERS_MENU = 'CHANGE_USERS_MENU';


export const changeItem = (item, data) => {
    return {
        type: CHANGE_USERS_MENU,
        payload: data ,
    }
};