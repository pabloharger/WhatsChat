import {
    USER_MODIFY_EMAIL,
    USER_MODIFY_PASSWORD,
    USER_MODIFY_NAME,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    REGISTER_LOADING,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    LOGIN_SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    errorRegister: '',
    errorLogin: '',
    loadingLogin: false,
    loadingRegister: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_MODIFY_EMAIL:
            return { ...state, email: action.payload };
        case USER_MODIFY_PASSWORD:
            return { ...state, password: action.payload };
        case USER_MODIFY_NAME:
            return { ...state, name: action.payload };
        case REGISTER_ERROR:
            return { ...state, errorRegister: action.payload, loadingRegister: false };
        case REGISTER_SUCCESS:
            return { ...state, name: '', email: '', password: '' };
        case REGISTER_LOADING:
            return { ...state, loadingRegister: true, errorRegister: '' };
        case LOGIN_ERROR:
            return { ...state, errorLogin: action.payload, loadingLogin: false };
        case LOGIN_SUCCESS:
            return { ...state, loadingLogin: false };
        case LOGIN_LOADING:
            return { ...state, loadingLogin: true, errorLogin: '' };
        case LOGIN_SIGN_OUT: 
            return { ...state, ...INITIAL_STATE };
        default: return state;
    }
};
