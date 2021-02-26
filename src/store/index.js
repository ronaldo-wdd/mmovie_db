import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import moviesReducer from './reducers/movies';
import navigationReducer from './reducers/navigation';
import thunk from 'redux-thunk';
import { watchMovies } from './saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose,
    sagaMiddleware = createSagaMiddleware(),
    rootReducer = combineReducers({
        movies: moviesReducer,
        navigation: navigationReducer }
    ),
    store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk, sagaMiddleware)
    )
);

sagaMiddleware.run(watchMovies);

export default store;