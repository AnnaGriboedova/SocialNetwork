import {InferActionTypes} from "./redux-store";

const ADD_MESSAGE = 'ADD-MESSAGE';

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

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

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: action.newMessageText}]
            };

    }
    return state;
};

export const actions = {
    addMessage: (newMessageText: string) => ({
        type: ADD_MESSAGE,
        newMessageText
    }) as const
}


export default dialogsReducer;