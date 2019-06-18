import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import {
    ADD_CONTACT_MODIFY_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_LOADING,
    USER_CONTACT_LIST,
    CHAT_MESSAGE_TO_SEND,
    CHAT_SEND_MESSAGE,
    CHAT_LIST_CHAT_USER,
    CHAT_LIST_CHATS_USER,
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

export const chatModifyMessageSend = (text) => (
    {
        type: CHAT_MESSAGE_TO_SEND,
        payload: text
    }
);

export const chatSendMessage = (message, contactName, contactEmail) => {
    const userEmail = firebase.auth().currentUser.email;
    const userEmailB64 = b64.encode(userEmail);
    const contactEmailB64 = b64.encode(contactEmail);

    return (dispatch) => {
        firebase.database().ref(`/messages/${userEmailB64}/${contactEmailB64}`)
            .push({
                message,
                type: 's',
            })
            .then(() => {
                firebase.database().ref(`/messages/${contactEmailB64}/${userEmailB64}`)
                    .push({ message, type: 'r' })
                    .then(() => dispatch({ type: CHAT_SEND_MESSAGE }));
                })
            .then(() => {
                firebase.database().ref(`user_chats/${userEmailB64}/${contactEmailB64}`)
                    .set({ name: contactName, email: contactEmail });
            })
            .then(() => {
                firebase.database().ref(`contacts/${userEmailB64}`)
                    .once('value')
                    .then(snapshot => {
                        const userData = _.first(_.values(snapshot.val()));
                        firebase.database().ref(`user_chats/${contactEmailB64}/${userEmailB64}`)
                        .set({ name: userData.name, email: userEmailB64 });
                    });
            });
    };
};

export const chatUserFetch = contactEmail => {
    const userEmail = firebase.auth().currentUser.email;
    const userEmailB64 = b64.encode(userEmail);
    const contactEmailB64 = b64.encode(contactEmail);

    return dispatch => {
        firebase.database().ref(`/messages/${userEmailB64}/${contactEmailB64}`)
            .on('value', snapshot => {
                dispatch({
                    type: CHAT_LIST_CHAT_USER,
                    payload: snapshot.val()
                });
            });
    };
};

export const chatsUserFetch = () => {
    const userEmail = firebase.auth().currentUser.email;
    const userEmailB64 = b64.encode(userEmail);

    return dispatch => {
        firebase.database().ref(`/user_chats/${userEmailB64}/`)
            .on('value', snapshot => {
                dispatch({
                    type: CHAT_LIST_CHATS_USER,
                    payload: snapshot.val()
                });
            });
    };
};
