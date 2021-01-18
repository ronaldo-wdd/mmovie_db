import axios from '../../axios';
import * as actions from '../actions';
import { put } from 'redux-saga/effects';


export function* fetchMoviesSaga() {
    try {
        const response = yield axios.get("/discover/movie");
        const fetchedMovies = response.data;

        yield put(actions.fetch_movies(fetchedMovies));
        
    } catch (error) {
        yield put (actions.fetch_movies_failed());
        console.log(error);
    }
}