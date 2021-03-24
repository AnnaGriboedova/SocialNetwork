import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {PhotosType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5 as number,
    usersTotalCount: 20 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    onFollowingUsersId: [] as Array<number>//array as users id
};

type InitialStateType = typeof initialState;

type ActionTypes = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetUsersTotalCountType |
    SetCurrentPageType | ToggleIsFetchingType | ToggleIsFollowingType

type ThunkType = ThunkAction<void, StateType, unknown, ActionTypes>


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
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

type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessType => ({
    type: FOLLOW,
    userId
});

type UnfollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({
    type: UNFOLLOW,
    userId
});

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({
    type: SET_USERS,
    users
});

type SetUsersTotalCountType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    totalCount: number
}
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCountType => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount
});

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type ToggleIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING,
    userId: number,
    isFetching: boolean
}
export const toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingType => ({
    type: TOGGLE_IS_FOLLOWING,
    userId,
    isFetching
});

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));


    }
};

const followUnfollowFLow = async (dispatch: Dispatch<ActionTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnfollowSuccessType) => {
    dispatch(toggleIsFollowing(true, userId));

    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowing(false, userId));
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFLow(dispatch, userId, usersAPI.deleteFriend.bind(usersAPI), unfollowSuccess)
    }
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFLow(dispatch, userId, usersAPI.addFriend.bind(usersAPI), followSuccess)
    }
};

export default usersReducer;