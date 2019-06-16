import { combineReducers } from 'redux';
import AutenticationReducer from './AutenticationReducer';
import AppReducer from './AppReducer';
import ContactListReducert from './ContactListReducert';

export default combineReducers({
    AutenticationReducer,
    AppReducer,
    ContactListReducert,
});
