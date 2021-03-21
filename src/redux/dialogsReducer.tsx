const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

/*type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}*/

let initialState = {
    dialogs: [
        {id: 1, name: 'Anna'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Dima'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'yo'},
        {id: 2, message: 'How are you'},
        {id: 3, message: 'Where are you'}
    ] as Array<MessageType>,
};

type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: action.newMessageText}]
            };

    }
    return state;
};

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
};

export const addMessageActionCreator = (newMessageText: string): AddMessageActionType => ({
    type: ADD_MESSAGE,
    newMessageText
});


export default dialogsReducer;