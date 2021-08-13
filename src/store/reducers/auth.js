import * as actions from '../actions/actionTypes';

const initialState = {
    request_token: null,
    username: '',
    loading: false
}

const set_request_token = (state, token) => {
    return {
        ...state,
        request_token: token
    }
}

const set_username = (state, username) => {
    return {
        ...state,
        username: username
    }
}

const auth_start = (state) => {
    return {
        ...state,
        loading: true
    }
}

const auth_success = (state, authData) => {
    console.log('auth successed!!!');
    return {
        ...state,
        authData: authData,
        loading: false
    }
}

const auth_failed = (state, error) => {
    console.log('auth failed!!!');
    
    return {
        ...state,
        error: error,
        loading: false
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_TOKEN: return set_request_token(state, action.token);
        case actions.USERNAME: return set_username(state, action.username);
        case actions.AUTH_START: return auth_start(state);
        case actions.AUTH_SUCCESS: return auth_success(state, action.authData);
        case actions.AUTH_FAILED: return auth_failed(state, action.error);
        default: return state;
    }
}

export default reducer;