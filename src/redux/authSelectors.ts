import {StateType} from "./redux-store";

export const getAuthUserId = (state: StateType) => {
    return state.auth.userId;
};