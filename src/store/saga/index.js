import { takeLeading } from "redux-saga/effects";
import { 
    fetchMoviesSaga, 
    setActiveMovieSaga,
    fetchMoviesGenreSaga
} from './movies';

import * as actionTypes from '../actions/actionTypes';


export function* watchMovies () {
    yield takeLeading(actionTypes.FETCH_MOVIES_GENRE, fetchMoviesGenreSaga);
    yield takeLeading(actionTypes.FETCH_MOVIES, fetchMoviesSaga);
    yield takeLeading(actionTypes.SET_ACTIVE_FILTER, fetchMoviesSaga);
    yield takeLeading(actionTypes.ACTIVE_MOVIE, setActiveMovieSaga);
}