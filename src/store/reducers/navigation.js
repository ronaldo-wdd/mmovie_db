import * as actionTypes from '../actions';

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
        case actionTypes.change_mobile: return changeMobile(state, action.mobile);
        case actionTypes.is_loading: return isLoading(state, action.loading);
        default: return state;
    }
}

export default reducer;