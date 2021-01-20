import { takeLeading } from "redux-saga/effects";
import { fetchMoviesSaga, setActiveMovieSaga } from './movies';

import * as actionTypes from '../actions/actionTypes';


export function* watchMovies () {
    yield takeLeading(actionTypes.FETCH_MOVIES, fetchMoviesSaga);
    yield takeLeading(actionTypes.ACTIVE_MOVIE, setActiveMovieSaga);
}