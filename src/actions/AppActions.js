import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import {
    ADD_CONTACT_MODIFY_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_LOADING,
    USER_CONTACT_LIST,
} from './types';

export const addContactModifyAddEmail = text => (
    {
        type: ADD_CONTACT_MODIFY_EMAIL,
        payload: text,
    }
);

export const addContactAdd = email => (
    dispatch => {
        dispatch({ type: ADD_CONTACT_LOADING });
        const emailB64 = b64.encode(email);
        firebase.database().ref(`/contacts/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    const userData = _.first(_.values(snapshot.val()));
                    const currentUser = firebase.auth().currentUser;
                    const emailUser64 = b64.encode(currentUser.email);
                    if (emailB64 !== emailUser64) {
                        firebase.database().ref(`/user_contacts/${emailUser64}`)
                            .push({ email, name: userData.name })
                            .then(() => addContactSuccsess(dispatch))
                            .catch(error => addContactFailed(error.message, dispatch));
                    } else {
                        addContactFailed('Cannot add your oun e-mail.', dispatch);
                    }
                } else {
                    addContactFailed('email not registred.', dispatch);
                }
            });
    }
);

export const addContactFailed = (error, dispatch) => {
    dispatch({
        type: ADD_CONTACT_ERROR,
        payload: error       
    });
};

export const addContactSuccsess = (dispatch) => {
    dispatch(updateSuccess(true));
};

export const updateSuccess = (success) => (
    {
        type: ADD_CONTACT_SUCCESS,
        payload: success,
    }    
);

export const userContactsFetch = () => {
    const currentUser = firebase.auth().currentUser;

    return (dispatch) => {
        const emailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/user_contacts/${emailB64}`)
            .on('value', (snapshot) => {
                dispatch({
                    type: USER_CONTACT_LIST,
                    payload: snapshot.val()
                });
            });
    };
};
