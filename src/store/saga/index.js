import { takeLeading } from "redux-saga/effects";
import { fetchMoviesSaga } from './movies';

import * as actionTypes from '../actions/actionTypes';


export function* watchMovies () {
    yield takeLeading(actionTypes.FETCH_MOVIES, fetchMoviesSaga);
}