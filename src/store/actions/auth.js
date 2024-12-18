import * as actions from './actionTypes';
import axios from '../../axios';
import store from '../';

export const request_token = token => {
    return {
        type: actions.REQUEST_TOKEN,
        token: token
    }
}

export const username = user => {
    return {
        type: actions.USERNAME,
        username: user
    }
}

export const authStart = () => {
    return {
        type: actions.AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: actions.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = error => {
    return {
        type: actions.AUTH_FAILED,
        error: error
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());

        const options = {
            username,
            password,
            request_token: store.getState().auth.request_token
        }
        
        axios.post('/authentication/token/validate_with_login', options)
            .then(response => dispatch(authSuccess(response.data)))
            .catch(error => dispatch(authFail(error.message)))
    }
}
