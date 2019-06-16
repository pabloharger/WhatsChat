import {
    ADD_CONTACT_MODIFY_EMAIL,
    ADD_CONTACT_ERROR,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
    addContactEmail: 'raquelortunio@gmail.com',
    addContactError: '',
    addContactLoading: false,
    addContactSuccess: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CONTACT_MODIFY_EMAIL:
            return { ...state, addContactEmail: action.payload };
        case ADD_CONTACT_ERROR: 
            return { ...state, addContactError: action.payload, addContactLoading: false };
        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                addContactLoading: false,
                addContactSuccess: action.payload,
                addContactEmail: ''
            };
        case ADD_CONTACT_LOADING:
            return { ...state, addContactLoading: true, addContactError: '' };
        default:
            return state;
    }
};
