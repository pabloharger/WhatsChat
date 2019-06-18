import { combineReducers } from 'redux';
import AutenticationReducer from './AutenticationReducer';
import AppReducer from './AppReducer';
import ContactListReducer from './ContactListReducer';
import ListChatReducer from './ListChatReducer';
import ListChatsReducer from './ListChatsReducer';

export default combineReducers({
    AutenticationReducer,
    AppReducer,
    ContactListReducer,
    ListChatReducer,
    ListChatsReducer,
});
