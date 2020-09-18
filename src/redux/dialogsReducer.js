const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: action.newMessageText}]
            };

    }
    return state;
};

export const addMessageActionCreator = (newMessageText) => ({
    type: ADD_MESSAGE,
    newMessageText
});


export default dialogsReducer;