import {authAPI, securityAPI, usersAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./redux-store";
import {UserProfileType} from "../types/types";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const SET_AUTH_USER_PROFILE = 'auth/SET_AUTH_USER_PROFILE';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    authUserProfile: null as UserProfileType | null
};

type InitialStateType = typeof initialState;

type ActionTypes = SetUserAuthDataType | GetCaptchaUrlSuccessActionType | SetAuthUserProfileActionType

type ThunkType = ThunkAction<void, StateType, unknown, ActionTypes>

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

type SetUserAuthDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserAuthDataType = {
    type: typeof SET_USER_DATA,
    payload: SetUserAuthDataActionPayloadType,
}
export const setUserAuthData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserAuthDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth},
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
});

type SetAuthUserProfileActionType = {
    type: typeof SET_AUTH_USER_PROFILE,
    authUserProfile: UserProfileType
}

export const setAuthUserProfile = (authUserProfile: UserProfileType): SetAuthUserProfileActionType => ({
    type: SET_AUTH_USER_PROFILE,
    authUserProfile
});

export const getAuthUserInfo = (userId: number): ThunkType =>
    async (dispatch) => {
        let response = await usersAPI.getProfile(userId);

        dispatch(setAuthUserProfile(response.data));

    }
;

export const getAuthUserData = (): ThunkType =>
    async (dispatch) => {
        let response = await authAPI.me();

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;

            dispatch(setUserAuthData(id, email, login, true));
            await dispatch(getAuthUserInfo(id));
        }

    };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):
    ThunkAction<Promise<void>, StateType, unknown, ActionTypes | FormAction> =>
    async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha);

        if (response.data.resultCode === 0) {
            // noinspection ES6MissingAwait
            dispatch(getAuthUserData());
        } else {
            if (response.data.resultCode === 10) {
                // noinspection ES6MissingAwait
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    };
export const logout = (): ThunkType =>
    async (dispatch) => {
        let response = await authAPI.logout();

        if (response.data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }

    };

export const getCaptchaUrl = (): ThunkType =>
    async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    };

export default authReducer;