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

export const fetch_more_movies = () => {
    return {
        type: actionTypes.FETCH_MORE_MOVIES
    }
}

export const fetch_more_movies_success = movies => {
    return {
        type: actionTypes.FETCH_MORE_MOVIES_SUCCESS,
        movies: movies
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


export const set_params = param => {
    return {
        type: actionTypes.SET_PARAMS,
        param: param
    }
}


export const fetch_movie_trailer = id => {
    return {
        type: actionTypes.FETCH_MOVIE_TRAILER,
        id: id
    }
}
export const fetch_movie_trailer_success = video => {
    return {
        type: actionTypes.FETCH_MOVIE_TRAILER_SUCCESS,
        video: video
    }
}
export const fetch_movie_trailer_failed = () => {
    return {
        type: actionTypes.FETCH_MOVIE_TRAILER_FAILED
    }
}

export const loading_cast = loading => {
    return {
        type: actionTypes.LOADING_CAST,
        loading: loading
    }
}