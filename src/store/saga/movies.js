import axios from '../../axios';
import * as actions from '../actions';
import { put, select } from 'redux-saga/effects';

import * as selectors from "./selectors";


export function* fetchMoviesSaga() {
    let moviesFilter = yield select(selectors.activeFilter);

    try {
        const response = yield axios.get(`/movie/${moviesFilter}`);
        const fetchedMovies = response.data;

        yield put(actions.fetch_movies_success(fetchedMovies));
        
    } catch (error) {
        yield put (actions.fetch_movies_failed());
    }
}

export function* setActiveMovieSaga(action) {
    let moviesResults = yield select(selectors.moviesResults);

    if (action.index <= moviesResults) 
        yield put(actions.set_active_movie(action.index));
}