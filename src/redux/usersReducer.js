import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 5,
    usersTotalCount: 20,
    currentPage: 1,
    isFetching: true,
    onFollowingUsersId: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_USERS_TOTAL_COUNT:
            return {...state, usersTotalCount: action.totalCount};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state, onFollowingUsersId: action.isFetching ?
                    [...state.onFollowingUsersId, action.userId]
                    : state.onFollowingUsersId.filter(id => id !== action.userId)
            };
    }
    return state
};

export const followSuccess = (userId) => ({
    type: FOLLOW,
    userId
});
export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW,
    userId
});
export const setUsers = (users) => ({
    type: SET_USERS,
    users
});
export const setUsersTotalCount = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
});
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
});
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});
export const toggleIsFollowing = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING,
    userId,
    isFetching
});

export const requestUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));

        });
    }
};

export const unfollow = (friendId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowing(true, friendId));
        usersAPI.deleteFriend(friendId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(friendId))
            }
            dispatch(toggleIsFollowing(false, friendId));
        });
    }
};

export const follow = (friendId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowing(true, friendId));
        usersAPI.addFriend(friendId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(friendId))
            }
            dispatch(toggleIsFollowing(false, friendId));
        });
    }
};

export default usersReducer;