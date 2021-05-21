import {ResultCodes} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelpers";
import {PhotosType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, StateType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/usersAPI";

const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';
const SET_USERS = 'USERS/SET_USERS';
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'USERS/SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'USERS/TOGGLE_IS_FOLLOWING';

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

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({
        type: FOLLOW,
        userId
    }) as const,
    unfollowSuccess: (userId: number) => ({
        type: UNFOLLOW,
        userId
    }) as const,
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    }) as const,
    setUsersTotalCount: (totalCount: number) => ({
        type: SET_USERS_TOTAL_COUNT,
        totalCount
    }) as const,
    setCurrentPage: (currentPage: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    }) as const,
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    }) as const,
    toggleIsFollowing: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING,
        userId,
        isFetching
    }) as const
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);

        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setUsersTotalCount(data.totalCount));


    }
};

const followUnfollowFLow = async (
    dispatch: Dispatch<ActionTypes>, userId: number,
    apiMethod: typeof usersAPI.deleteFriend | typeof usersAPI.addFriend,
    actionCreator: (userId: number) => ActionTypes
) => {
    dispatch(actions.toggleIsFollowing(true, userId));

    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodes.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowing(false, userId));
};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFLow(dispatch, userId, usersAPI.deleteFriend.bind(usersAPI), actions.unfollowSuccess)
    }
};

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFLow(dispatch, userId, usersAPI.addFriend.bind(usersAPI), actions.followSuccess)
    }
};

export default usersReducer;