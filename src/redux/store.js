import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import navbarReducer from "./navbarReducer";

let store = {
    _subscriber() {
        console.log('no subscriber')
    },
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'i love you', likesCount: '100'},
                {id: 2, message: 'hi. i bad boy', likesCount: '3'}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Anna'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Dima'}
            ],
            messages: [
                {id: 1, message: 'yo'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Where are you'}
            ],
            newMessageText: ''
        },
        navbar: {
            friends: [
                {id: 1, name: 'Anna'},
                {id: 2, name: 'Lusia'},
                {id: 3, name: 'Sasha'}
            ]
        }
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._subscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._subscriber(this._state);
    }
};
export default store;