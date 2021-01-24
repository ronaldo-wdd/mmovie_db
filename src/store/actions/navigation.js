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

export const show_movie_details = show => {
    return {
        type: actionTypes.SHOW_MOVIE_DETAILS,
        show: show
    }
}

export const show_all_movies = show => {
    return {
        type: actionTypes.SHOW_ALL_MOVIES,
        show: show
    }
}