import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, UserProfileType} from "../types/types";

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


const profileReducer = (state = initialState, action: any): InitialStateType => {
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
            return {...state, posts: state.posts.filter((p: any) => p.id != action.postId)}
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

export const addPost = (post: PostType) =>
    async (dispatch: any) => {
        let responsePost = {...post};

        let promise = await new Promise((resolve: any) => setTimeout(function () {
            resolve();
        }, 3000));

        (() => {
            function randomInteger(min: any, max: any) {
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


export const savePhoto = (file: any) =>
    async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }

    }
;

export const getUserProfile = (userId: number) =>
    async (dispatch: any) => {
        let response = await usersAPI.getProfile(userId);

        dispatch(setUserProfile(response.data));
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

export const getStatus = (userId: number) =>
    async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));

    };

export const getPosts = (userId: number) =>
    async (dispatch: any) => {

        dispatch(setPosts([{
            user: {userName: 'Andrey'},
            id: 2,
            message: 'Posts are saved locally. You can try adding new posts.',
            likesCount: '3',
            date: new Date(2018, 8, 23, 15, 20, 1)
        }]));
        return Promise.resolve();

    };

export const updateStatus = (status: string) =>
    async (dispatch: any) => {
        try {
            let response = await profileAPI.updateStatus(status);

            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } catch (e) {
            alert(e);
        }

    };

export const saveProfile = (profileData: any) =>
    async (dispatch: any, getState: any) => {
        dispatch(toggleIsUpdateProfile(true));

        const userId = getState().auth.userId;
        let response = await profileAPI.saveProfile(profileData);

        if (response.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
            dispatch(toggleIsUpdateProfile(false));
        } else {
            dispatch(stopSubmit("profileInfoForm", {_error: response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }

    };


export default profileReducer;