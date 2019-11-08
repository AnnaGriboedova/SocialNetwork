import React from 'react'
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state=props.store.getState().dialogsPage;

    const addMessage = () => {
        props.store.dispatch(addMessageActionCreator())
    };
    const updateNewMessageText = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    };

    return (
        <Dialogs dialogsPage={state}
                 addMessage={addMessage}
                 updateNewMessageText={updateNewMessageText}
        />
    )
};

export default DialogsContainer;