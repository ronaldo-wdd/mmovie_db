import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loaded: false,
    loading: true,
    mobile: false,
    showMovieDetails: false,
    showAllMovies: false,
    moviesListScrollPosition: 0,
    showModal: false,
    currPage: ''
}


const changeMobile = (state, mobile) => {
    return {
        ...state,
        mobile: mobile
    }
}

const is_loaded = (state, loaded) => {
    return {
        ...state,
        loaded: loaded
    }
}

const loading = (state, ld) => {
    return {
        ...state,
        loading: ld
    }
}

const showMovieDetails = (state, show) => {
    return {
        ...state,
        showMovieDetails: show
    }
}

const showAllMovies = (state, show) => {
    return {
        ...state,
        showAllMovies: show
    }
}

const updateScrollPosition = (state, position) => {
    return {
        ...state,
        moviesListScrollPosition: position
    }
}

const showModal = (state, show) => {
    return {
        ...state,
        showModal: show
    }
}

const currPage = (state, page) => {
    return {
        ...state,
        currPage: page
    }
}

 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOBILE: return changeMobile(state, action.mobile);
        case actionTypes.LOADED: return is_loaded(state, action.loaded);
        case actionTypes.SHOW_MOVIE_DETAILS: return showMovieDetails(state, action.show);
        case actionTypes.SHOW_ALL_MOVIES: return showAllMovies(state, action.show);
        case actionTypes.UPDATE_SCROLL_POSITION: return updateScrollPosition(state, action.position);
        case actionTypes.SHOW_MODAL: return showModal(state, action.show);
        case actionTypes.CURR_PAGE: return currPage(state, action.page);
        case actionTypes.LOADING: return loading(state, action.loading);
        default: return state;
    }
}

export default reducer;