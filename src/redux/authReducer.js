import {authAPI, securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const SET_AUTH_USER_PROFILE = 'auth/SET_AUTH_USER_PROFILE';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    authUserProfile: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            };
        }
        case SET_AUTH_USER_PROFILE: {
            return {...state, authUserProfile: action.authUserProfile}
        }
    }
    return state
};


export const setUserAuthData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth},
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
});
export const setAuthUserProfile = (authUserProfile) => ({
    type: SET_AUTH_USER_PROFILE,
    authUserProfile
});

export const getAuthUserInfo = (userId) =>
    async (dispatch) => {
        let response = await usersAPI.getProfile(userId);

        dispatch(setAuthUserProfile(response.data));

    }
;

export const getAuthUserData = () =>
    async (dispatch) => {
        let response = await authAPI.me();

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;

            dispatch(setUserAuthData(id, email, login, true));
            await dispatch(getAuthUserInfo(id));
        }

    };

export const login = (email, password, rememberMe, captcha) =>
    async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    };
export const logout = () =>
    async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }

    };

export const getCaptchaUrl = () =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    };

export default authReducer;