import * as actionTypes from './actionTypes';

export const fetch_movies = movies => {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

export const fetch_movies_success = movies => {
    return {
        type: actionTypes.FETCH_MOVIES_SUCCESS,
        movies: movies
    }
}

export const fetch_movies_failed = () => {
    return {
        type: actionTypes.FETCH_MOVIES_FAILED
    }
}

export const active_movie = index => {
    return {
        type: actionTypes.ACTIVE_MOVIE,
        index: index
    }
}

export const set_active_movie = index => {
    return {
        type: actionTypes.SET_ACTIVE_MOVIE,
        index: index
    }
}