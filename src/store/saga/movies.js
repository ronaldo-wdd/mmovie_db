import axios from '../../axios';
import * as actions from '../actions';
import { put, select } from 'redux-saga/effects';

import * as selectors from "./selectors";


export function* fetchMoviesSaga() {
    yield put(actions.loaded(false));

    try {
        const moviesFilter = yield select(selectors.activeFilter),
            params = yield select(selectors.params),
            response = params.year || params.genre
                ? yield axios.get('/discover/movie', {
                    params: {
                        year: params.year, 
                        with_genres: params.genre
                    }})
                : params.query
                    ? yield axios.get('/search/movie', {params: {query: params.query}})
                    : yield axios.get(`/movie/${moviesFilter}`),
            fetchedMovies = response.data;
            
        yield put(actions.fetch_movies_success(fetchedMovies));
        yield put(actions.loaded(true));
    } 
    catch (error) {
        yield put (actions.fetch_movies_failed());
    }
}


export function* fetchMoreMoviesSaga() {
    const totalPages = yield select(selectors.totalPages),
        page = yield select(selectors.page),
        moviesFilter = yield select(selectors.activeFilter),
        params = yield select(selectors.params);

    if (totalPages - page <= 0) return;
        
    try {
        const response = params.year || params.genre
            ? yield axios.get('/discover/movie', {
                params: {
                    year: params.year, 
                    with_genres: params.genre,
                    page: page + 1
                }})
            : params.query
                ? yield axios.get('/search/movie', {
                    params: {
                        query: params.query, 
                        page: page + 1
                    }})
                : yield axios.get(`/movie/${moviesFilter}`, {params: {page: page + 1}}),
            fetchedMovies = response.data;

        yield put(actions.fetch_more_movies_success(fetchedMovies));
    } 
    catch (error) {
        console.log(error);
        yield put (actions.fetch_movies_failed());
    }
}


export function* fetchMoviesGenreSaga() {
    try {
        const response = yield axios.get('/genre/movie/list'),
            fetchedMoviesGenre = response.data;
        let genresList = {};

        fetchedMoviesGenre.genres.forEach(el => {
            genresList[el.id] = el.name;
        });
        
        yield put(actions.fetch_movies_genre_success(genresList));        
    } catch (error) {
        console.log("fetching genre fails", error);
    }
}


export function* fetchMovieCastSaga(action) {
    try {
        yield put(actions.loading_cast(true))
        
        const response = yield axios.get(`/movie/${action.id}/credits`),
            cast = response.data.cast;

        yield put(actions.fetch_movies_cast_success(cast));        
    } catch (error) {
        console.log("fetching movie cast fail", error);
    }
}


export function* fetchMovieTrailer(action) {
    try {
        const response = yield axios.get(`/movie/${action.id}/videos`),
            video = response.data;

            console.log(video);
            
            if (video.results.length > 0) {
                yield put(actions.fetch_movie_trailer_success(video));
                yield put(actions.show_modal(true));
            } else throw 'Trailer not found :)';
    } catch (error) {
        yield put(actions.fetch_movie_trailer_failed());
    }
}


export function* setActiveMovieSaga(action) {
    let moviesResults = yield select(selectors.moviesResults);

    if (action.index < moviesResults) 
        yield put(actions.set_active_movie(action.index));
}
