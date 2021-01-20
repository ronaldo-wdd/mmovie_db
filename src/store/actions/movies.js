import * as actionTypes from './actionTypes';

export const fetch_movies = movies => {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

export const fetch_movies_failed = () => {
    return {
        type: actionTypes.FETCH_MOVIES_FAILED
    }
}

export const activeMovie = index => {
    return {
        type: actionTypes.ACTIVE_MOVIE,
        index: index
    }
}