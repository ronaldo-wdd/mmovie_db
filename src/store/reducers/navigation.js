import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: true,
    mobile: false,
    showMovieDetails: false,
    showAllMovies: false
}


const changeMobile = (state, mobile) => {
    return {
        ...state,
        mobile: mobile
    }
}

const isLoading = (state, loading) => {
    return {
        ...state,
        loading: loading
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

 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOBILE: return changeMobile(state, action.mobile);
        case actionTypes.IS_LOADING: return isLoading(state, action.loading);
        case actionTypes.SHOW_MOVIE_DETAILS: return showMovieDetails(state, action.show);
        case actionTypes.SHOW_ALL_MOVIES: return showAllMovies(state, action.show);
        default: return state;
    }
}

export default reducer;