import {profileAPI, ResultCodes, usersAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, UserProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";

export const SET_POST = 'SET-POST';
const SET_POSTS = 'SET-POSTS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const TOGGLE_IS_UPDATE_PROFILE = 'TOGGLE_IS_UPDATE_PROFILE';

let initialState = {
    posts: [] as Array<PostType>,
    userProfile: null as UserProfileType
        | null,
    isUpdateProfile: false as boolean,
    status: '' as string
};

type InitialStateType = typeof initialState;

type ActionTypes = SetPostType | SetPostsType | SetUserProfileType | SavePhotoSuccessType | SetStatusType |
    DeletePostType | ToggleIsUpdateProfileType
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

        dispatch(setPost(responsePost));
        return promise;

    };

type SetPostType = {
    type: typeof SET_POST,
    post: PostType
}

export const setPost = (post: PostType): SetPostType => ({
    type: SET_POST,
    post
});

type SetPostsType = {
    type: typeof SET_POSTS,
    posts: Array<PostType>
}

export const setPosts = (posts: Array<PostType>): SetPostsType => ({
    type: SET_POSTS,
    posts
});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    userProfile: UserProfileType
}

export const setUserProfile = (userProfile: UserProfileType): SetUserProfileType => ({
    type: SET_USER_PROFILE,
    userProfile
});

type SavePhotoSuccessType = {
    type: typeof SET_USER_PHOTO
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
    type: SET_USER_PHOTO,
    photos
});


export const savePhoto = (file: HTMLInputElement): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.savePhoto(file);

        if (data.resultCode === ResultCodes.Success) {
            dispatch(savePhotoSuccess(data.data.photos));
        }

    }
;

export const getUserProfile = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await usersAPI.getProfile(userId);

        dispatch(setUserProfile(data));
        await dispatch(getStatus(userId));
        await dispatch(getPosts(userId));
    }
;

type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusType => ({
    type: SET_STATUS,
    status
});

type DeletePostType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostType => ({
    type: DELETE_POST,
    postId
});

type ToggleIsUpdateProfileType = {
    type: typeof TOGGLE_IS_UPDATE_PROFILE
    isUpdateProfile: boolean
}
export const toggleIsUpdateProfile = (isUpdateProfile: boolean): ToggleIsUpdateProfileType => ({
    type: TOGGLE_IS_UPDATE_PROFILE,
    isUpdateProfile
});

export const getStatus = (userId: number): ThunkType =>
    async (dispatch) => {
        let data = await profileAPI.getStatus(userId);
        dispatch(setStatus(data));

    };

export const getPosts = (userId: number): ThunkType =>
    async (dispatch) => {

        dispatch(setPosts([{
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
                dispatch(setStatus(status));
            }
        } catch (e) {
            alert(e);
        }

    };

export const saveProfile = (profileData: UserProfileType):
    ThunkAction<void, StateType, unknown, ActionTypes | FormAction> =>
    async (dispatch, getState) => {
        dispatch(toggleIsUpdateProfile(true));

        const userId = getState().auth.userId;
        let data = await profileAPI.saveProfile(profileData);

        if (data.resultCode === ResultCodes.Success) {
            // @ts-ignore
            dispatch(getUserProfile(userId));
            dispatch(toggleIsUpdateProfile(false));
        } else {
            dispatch(stopSubmit("profileInfoForm", {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }

    };


export default profileReducer;