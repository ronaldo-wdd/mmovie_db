import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fetchedMovies: null,
    movies: [],
    genresList: null,
    error: false,
    activeMovie: 0,
    activeMovieCast: [],
    activeFilter: 'popular',
    video: null,
    videoError: false
}


const fetch_movies_success = (state, movies) => {
    return {
        ...state,
        fetchedMovies: movies,
        movies: movies.results,
        activeMovie: 0,
        error: false
    }
}

const fetch_movies_failed = (state) => {
    return {
        ...state,
        error: true
    }
}

const fetch_movies_genre_success = (state, genresList) => {
    return {
        ...state,
        genresList: genresList
    }
}

const fetch_more_movies_success = (state, movies) => {
    return {
        ...state,
        fetchedMovies: movies,
        movies: [...state.movies].concat(movies.results),
        error: false
    }
}

const fetch_movie_cast_success = (state, cast) => {
    return {
        ...state,
        activeMovieCast: cast
    }
}

const set_active_movie = (state, index) => {
    return {
        ...state,
        activeMovie: index
    }
}

const set_active_filter = (state, filter) => {
    return {
        ...state,
        activeFilter: filter
    }
}

const fetch_movie_trailer_success = (state, video) => {
    return {
        ...state,
        video: video,
        videoError: false
    }
}
const fetch_movie_trailer_failed = state => {
    return {
        ...state,
        videoError: true
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIES_SUCCESS: return fetch_movies_success(state, action.movies);
        case actionTypes.FETCH_MORE_MOVIES_SUCCESS: return fetch_more_movies_success(state, action.movies);
        case actionTypes.FETCH_MOVIES_FAILED: return fetch_movies_failed(state);
        case actionTypes.SET_ACTIVE_MOVIE: return set_active_movie(state, action.index);
        case actionTypes.SET_ACTIVE_FILTER: return set_active_filter(state, action.filter);
        case actionTypes.FETCH_MOVIES_GENRE_SUCCESS: return fetch_movies_genre_success(state, action.genreList);
        case actionTypes.FETCH_MOVIES_CAST_SUCCESS: return fetch_movie_cast_success(state, action.cast);
        case actionTypes.FETCH_MOVIE_TRAILER_SUCCESS: return fetch_movie_trailer_success(state, action.video);
        case actionTypes.FETCH_MOVIE_TRAILER_FAILED: return fetch_movie_trailer_failed(state);
        default: return state
    }
}

export default reducer;