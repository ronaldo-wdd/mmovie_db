import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: true,
    mobile: false
}


const changeMobile = (state, mobile) => {
    return {
        ...state,
        mobile: mobile
    }
}

const isLoading = (state, loading) => {
    return {
        ...state,
        loading: loading
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MOBILE: return changeMobile(state, action.mobile);
        case actionTypes.IS_LOADING: return isLoading(state, action.loading);
        default: return state;
    }
}

export default reducer;