import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
 } from '../actions/types';

 const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
};
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            };
            break;
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
            break;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                
            };
            break;
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false         
            };
            break;  
        default:
            return state;
            break;
    }
}