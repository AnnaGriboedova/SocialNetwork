import {authAPI, usersAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
    return state
};


export const setUserAuthData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth},
});

export const getAuthUserData = () =>
    (dispatch) => {
        authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setUserAuthData(id, email, login, true));
            }
        });
    };

export const login = (email, password, rememberMe) =>
    (dispatch) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                alert('Данные введены не верно')
            }
        });
    };
export const logout = () =>
    (dispatch) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserAuthData(null, null, null, false));
            }
        });
    };

export default authReducer;