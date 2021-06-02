import {createSelector} from "reselect";
import {StateType} from "./redux-store";

export const getUsersSelector = (state: StateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
});

export const getUsersCount = (state: StateType) => {
    return state.usersPage.usersCount;
};

export const getTerm = (state: StateType) => {
    return state.usersPage.term;
};

export const getIsFriend = (state: StateType) => {
    return state.usersPage.isFriend;
};

export const getUsersTotalCount = (state: StateType) => {
    return state.usersPage.usersTotalCount;
};

export const getCurrentPage = (state: StateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: StateType) => {
    return state.usersPage.isFetching;
};

export const getOnFollowingUsersId = (state: StateType) => {
    return state.usersPage.onFollowingUsersId;
};
