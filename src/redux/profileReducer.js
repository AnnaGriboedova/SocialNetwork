import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

let initialState = {
    posts: [
        {id: 1, message: 'i love you', likesCount: '100'},
        {id: 2, message: 'hi. i bad boy', likesCount: '3'}
    ],
    userProfile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let post = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, post],
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
    }
    return state
};

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
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

export const getStatus = (userId) =>
    async (dispatch) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));

    };

export const updateStatus = (status) =>
    async (dispatch) => {
        let response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }

    };

export default profileReducer;