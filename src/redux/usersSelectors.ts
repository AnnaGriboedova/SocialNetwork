import {createSelector} from "reselect";
import {StateType} from "./redux-store";

export const getUsersSelector = (state: StateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
});

export const getPageSize = (state: StateType) => {
    return state.usersPage.pageSize;
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
