import { CHAT_LIST_CHATS_USER } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAT_LIST_CHATS_USER:
            return action.payload;
        default:
            return { ...state };
    }
};
