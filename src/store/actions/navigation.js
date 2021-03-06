import * as actionTypes from './actionTypes';


export const change_mobile = mobile => {
    return {
        type: actionTypes.CHANGE_MOBILE,
        mobile: mobile
    }
}

export const loaded = ld => {
    return {
        type: actionTypes.LOADED,
        loaded: ld
    }
}

export const loading = ld => {
    return {
        type: actionTypes.LOADING,
        loading: ld
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

export const update_scroll_position = position => {
    return {
        type: actionTypes.UPDATE_SCROLL_POSITION,
        position: position
    }
}

export const show_modal = show => {
    return {
        type: actionTypes.SHOW_MODAL,
        show: show
    }
}

export const curr_page = page => {
    return {
        type: actionTypes.CURR_PAGE,
        page: page
    }
}