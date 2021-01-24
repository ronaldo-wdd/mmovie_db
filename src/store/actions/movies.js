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


export const fetch_movies_genre = () => {
    return {
        type: actionTypes.FETCH_MOVIES_GENRE
    }
}

export const fetch_movies_genre_success = genreList => {
    return {
        type: actionTypes.FETCH_MOVIES_GENRE_SUCCESS,
        genreList: genreList
    }
}


export const fetch_movies_cast = id => {
    return {
        type: actionTypes.FETCH_MOVIES_CAST,
        id: id
    }
}

export const fetch_movies_cast_success = cast => {
    return {
        type: actionTypes.FETCH_MOVIES_CAST_SUCCESS,
        cast: cast
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


export const set_active_filter = filter => {
    return {
        type: actionTypes.SET_ACTIVE_FILTER,
        filter: filter
    }
}