import {ResultCodes} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, UserProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {InferActionTypes, StateType} from "./redux-store";
import {profileAPI} from "../api/profileAPI";

export const SET_POST = 'PROFILE/SET-POST';
const SET_POSTS = 'PROFILE/SET-POSTS';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'PROFILE/SET_STATUS';
const DELETE_POST = 'PROFILE/DELETE_POST';
const SET_USER_PHOTO = 'PROFILE/SET_USER_PHOTO';
const TOGGLE_IS_UPDATE_PROFILE = 'PROFILE/TOGGLE_IS_UPDATE_PROFILE';

export let initialState = {
    posts: [] as Array<PostType>,
    userProfile: null as UserProfileType
        | null,
    isUpdateProfile: false as boolean,
    status: '' as string
};

type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>
type ThunkType = ThunkAction<void, StateType, unknown, ActionTypes>

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_POST: {
            return {
                ...state,
                posts: [...state.posts, action.post],
            };
        }
        case SET_POSTS: {
            return {
                ...state,
                posts: action.posts,
            };
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter((p: PostType) => p.id !== action.postId)}
        }
        case SET_USER_PROFILE: {
            return {...state, userProfile: action.userProfile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_USER_PHOTO: {
            return {...state, userProfile: {...state.userProfile, photos: action.photos} as UserProfileType}
        }
        case TOGGLE_IS_UPDATE_PROFILE: {
            return {...state, isUpdateProfile: action.isUpdateProfile}
        }
    }
    return state
};

export const addPost = (post: PostType): ThunkType =>
    async (dispatch) => {
        let responsePost = {...post};

        let promise = await new Promise((resolve: (value: string) => void) => setTimeout(function () {
            resolve('Success send');
        }, 3000));

        (() => {
            function randomInteger(min: number, max: number) {
                let rand = min - 0.5 + Math.random() * (max - min + 1);
                return Math.round(rand);
            }

            responsePost.date = new Date();
            responsePost.id = randomInteger(3, 50000);
            responsePost.likesCount = 0;
        })();

        dispatch(actions.setPost(responsePost));
        return promise;
    };

export const actions = {
    setPost: (post: PostType) => ({
        type: SET_POST,
        post
    }) as const,
    setPosts: (posts: Array<PostType>) => ({
        type: SET_POSTS,
        posts
    }) as const,
    setUserProfile: (userProfile: UserProfileType) => ({
        type: SET_USER_PROFILE,
        userProfile
    }) as const,
    savePhotoSuccess: (photos: PhotosType) => ({
        type: SET_USER_PHOTO,
        photos
    }) as const,
    setStatus: (status: string) => ({
        type: SET_STATUS,
        status
    }) as const,
    deletePost: (postId: number) => ({
        type: DELETE_POST,
        postId
    }) as const,
    toggleIsUpdateProfile: (isUpdateProfile: boolean) => ({
        type: TOGGLE_IS_UPDATE_PROFILE,
        isUpdateProfile
    }) as const,
}

export const savePhoto = (file: File): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.savePhoto(file);

        if (data.resultCode === ResultCodes.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    }
;

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getProfile(userId);

        dispatch(actions.setUserProfile(data));
        await dispatch(getStatus(userId));
        await dispatch(getPosts(userId));
    }
;

export const getStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));

    };

export const getPosts = (userId: number): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setPosts([{
            user: {userName: 'Andrey'},
            id: 2,
            message: 'Posts are saved locally. You can try adding new posts.',
            likesCount: '3',
            date: new Date(2018, 8, 23, 15, 20, 1)
        }]));
        return Promise.resolve();
    };

export const updateStatus = (status: string): ThunkType =>
    async (dispatch) => {
        try {
            let data = await profileAPI.updateStatus(status);

            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.setStatus(status));
            }
        } catch (e) {
            alert(e);
        }
    };

export const saveProfile = (profileData: UserProfileType):
    ThunkAction<void, StateType, unknown, ActionTypes | FormAction> =>
    async (dispatch, getState) => {
        dispatch(actions.toggleIsUpdateProfile(true));

        const userId = getState().auth.userId;
        let data = await profileAPI.saveProfile(profileData);

        if (data.resultCode === ResultCodes.Success) {
            // @ts-ignore
            dispatch(getUserProfile(userId));
            dispatch(actions.toggleIsUpdateProfile(false));
        } else {
            dispatch(stopSubmit("profileInfoForm", {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }
    };


export default profileReducer;