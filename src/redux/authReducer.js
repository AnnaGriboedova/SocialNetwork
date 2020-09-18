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
                ...action.data,
                isAuth: true
            };
        }
    }
    return state
};


export const setUserAuthData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: {userId, email, login}
});

export const getAuthUserData = () =>
    (dispatch) => {
        authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setUserAuthData(id, email, login));
            }
        });
    };

export const login = (email, password, rememberMe) =>
    (dispatch) => {
        authAPI.login(email, password, rememberMe).then(response => {
            if (response.data.resultCode === 0) {

               /* alert(response.data.data.userId+'  '+ email+'  '+ email);
                dispatch(setUserAuthData(response.data.data.userId, email, email));*/
                authAPI.me().then(response => {
                    if (response.data.resultCode === 0) {
                        let {id, email, login} = response.data.data;
                        dispatch(setUserAuthData(id, email, login));
                    }
                });
            }else{
                alert('Данные введены не верно')
            }
        });
    };

export default authReducer;