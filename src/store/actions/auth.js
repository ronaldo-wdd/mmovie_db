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

export const auth = (user, password) => {
    return dispatch => {
        dispatch(authStart());
        
        axios.post('/authentication/token/validate_with_login', {
            params: {
                username: user,
                password: password,
                request_token: store.getState().auth.request_token
            }
        }).then(
            dispatch(response => authSuccess(response))
        ).catch(error => dispatch(authFail(error)))
    }
}