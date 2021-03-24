import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer, {SET_POST} from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer";

let rootReducer = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navbar: navbarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer.plugin({
        profileAddPostForm: (state, action) => {
            switch (action.type) {
                case SET_POST:
                    return undefined;
                default:
                    return state;
            }
        }
    })
});

type RootReducerType = typeof rootReducer;
export type StateType = ReturnType<RootReducerType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));


// @ts-ignore
window.__store__ = store;

export default store;