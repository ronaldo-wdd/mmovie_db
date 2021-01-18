import * as actionTypes from '../actions/actionTypes';

const initialState = {
    movies: null,
    error: false
}

const fetch_movies = (state, movies) => {
    return {
        ...state,
        movies: movies,
        error: false
    }
}

const fetch_movies_failed = (state) => {
    return {
        ...state,
        error: true
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES: return fetch_movies(state, action.movies);
        case actionTypes.FETCH_MOVIES_FAILED: return fetch_movies_failed(state);
        default: return state
    }
}

export default reducer;