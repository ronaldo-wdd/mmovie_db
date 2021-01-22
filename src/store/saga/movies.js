import axios from '../../axios';
import * as actions from '../actions';
import { put, select } from 'redux-saga/effects';

import * as selectors from "./selectors";


export function* fetchMoviesSaga() {
    yield put(actions.is_loading(true));

    let moviesFilter = yield select(selectors.activeFilter);

    try {
        const response = yield axios.get(`/movie/${moviesFilter}`);
        const fetchedMovies = response.data;

        yield put(actions.fetch_movies_success(fetchedMovies));
        yield put(actions.is_loading(false));
        
    } catch (error) {
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

export function* setActiveMovieSaga(action) {
    let moviesResults = yield select(selectors.moviesResults);

    if (action.index < moviesResults) 
        yield put(actions.set_active_movie(action.index));
}