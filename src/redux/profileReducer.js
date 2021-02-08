import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

export const SET_POST = 'SET-POST';
const SET_POSTS = 'SET-POSTS';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const TOGGLE_IS_UPDATE_PROFILE = 'TOGGLE_IS_UPDATE_PROFILE';

let initialState = {
    posts: [],
    userProfile: null,
    isUpdateProfile: false,
    status: ''
};

const profileReducer = (state = initialState, action) => {
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
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case SET_USER_PROFILE: {
            return {...state, userProfile: action.userProfile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case SET_USER_PHOTO: {
            return {...state, userProfile: {...state.userProfile, photos: action.photos}}
        }
        case TOGGLE_IS_UPDATE_PROFILE: {
            return {...state, isUpdateProfile: action.isUpdateProfile}
        }
    }
    return state
};

export const addPost = (post) =>
    async (dispatch) => {
        let responsePost = {...post};

        let promise = await new Promise(resolve => setTimeout(function () {
            resolve();
        }, 3000));

        (() => {
            function randomInteger(min, max) {
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

export const setPost = (post) => ({
    type: SET_POST,
    post
});

export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
});

export const setUserProfile = (userProfile) => ({
    type: SET_USER_PROFILE,
    userProfile
});

export const savePhotoSuccess = (photos) => ({
    type: SET_USER_PHOTO,
    photos
});


export const savePhoto = (file) =>
    async (dispatch) => {
        let response = await profileAPI.savePhoto(file);

        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }

    }
;

export const getUserProfile = (userId) =>
    async (dispatch) => {
        let response = await usersAPI.getProfile(userId);

        dispatch(setUserProfile(response.data));
        await dispatch(getStatus(userId));
        await dispatch(getPosts(userId));
    }
;
export const setStatus = (status) => ({
    type: SET_STATUS,
    status
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
});

export const toggleIsUpdateProfile = (isUpdateProfile) => ({
    type: TOGGLE_IS_UPDATE_PROFILE,
    isUpdateProfile
});

export const getStatus = (userId) =>
    async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));

    };

export const getPosts = (userId) =>
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

export const updateStatus = (status) =>
    async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status);

            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        } catch (e) {
            alert(e);
        }

    };

export const saveProfile = (profileData) =>
    async (dispatch, getState) => {
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