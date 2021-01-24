import { takeLeading } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import { 
    fetchMoviesSaga, 
    setActiveMovieSaga,
    fetchMoviesGenreSaga,
    fetchMovieCastSaga
} from './movies';


export function* watchMovies () {
    yield takeLeading(actionTypes.FETCH_MOVIES_GENRE, fetchMoviesGenreSaga);
    yield takeLeading(actionTypes.FETCH_MOVIES, fetchMoviesSaga);
    yield takeLeading(actionTypes.SET_ACTIVE_FILTER, fetchMoviesSaga);
    yield takeLeading(actionTypes.ACTIVE_MOVIE, setActiveMovieSaga);
    yield takeLeading(actionTypes.FETCH_MOVIES_CAST, fetchMovieCastSaga);
}