import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fetchedMovies: null,
    movies: [],
    error: false,
    activeMovie: 0
}


const fetch_movies_success = (state, movies) => {
    return {
        ...state,
        fetchedMovies: movies,
        movies: [...state.movies].concat(movies.results),
        error: false
    }
}

const fetch_movies_failed = (state) => {
    return {
        ...state,
        error: true
    }
}

const set_active_movie = (state, index) => {
    return {
        ...state,
        activeMovie: index
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetch_movies_success(state, action.movies);
        case actionTypes.FETCH_MOVIES_FAILED: return fetch_movies_failed(state);
        case actionTypes.SET_ACTIVE_MOVIE: return set_active_movie(state, action.index);
        default: return state
    }
}

export default reducer;