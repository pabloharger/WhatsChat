import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
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
} from './types';

export const modifyEmail = text => (
    {
        type: USER_MODIFY_EMAIL,
        payload: text,
    }
);

export const modifyPassword = text => (
    {
        type: USER_MODIFY_PASSWORD,
        payload: text
    }
);

export const modifyName = text => (
    {
        type: USER_MODIFY_NAME,
        payload: text
    }
);

export const registerUser = ({ name, email, password }) => (
    dispatch => {
        dispatch({ type: REGISTER_LOADING });
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const emailb64 = b64.encode(email);
                firebase.database().ref(`/contacts/${emailb64}`)
                    .push({ name })
                    .then(() => registerUserSuccessful(dispatch));
            })
            .catch(error => registerUserFailed(dispatch, error));
    }
);

export const registerUserSuccessful = dispatch => {
    dispatch({ type: REGISTER_SUCCESS });
    Actions.welcome();
};

export const registerUserFailed = (dispatch, error) => {
    dispatch({
        type: REGISTER_ERROR,
        payload: error.message
    });
};

export const autenticateUser = ({ email, password }) => (
    dispatch => {
        dispatch({ type: LOGIN_LOADING });
        firebase.auth().signInWithEmailAndPassword(
            email, 
            password
        ).then(() => loginUserSuccessful(dispatch))
        .catch(error => loginUserFailed(error, dispatch));
    }
);

export const loginUserSuccessful = dispatch => {
    dispatch({ type: LOGIN_SUCCESS });

    Actions.main();
};

export const loginUserFailed = (error, dispatch) => {
    dispatch({
        type: LOGIN_ERROR,
        payload: error.message
    });
};
