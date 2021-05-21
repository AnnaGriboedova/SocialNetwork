import {StateType} from "./redux-store";

export const getUserProfileSelector = (state: StateType) => {
    return state.profilePage.userProfile;
};