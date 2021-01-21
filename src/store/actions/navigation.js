import * as actionTypes from './actionTypes';


export const change_mobile = mobile => {
    return {
        type: actionTypes.CHANGE_MOBILE,
        mobile: mobile
    }
}

export const is_loading = loading => {
    return {
        type: actionTypes.IS_LOADING,
        loading: loading
    }
}