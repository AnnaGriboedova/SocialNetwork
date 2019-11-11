import React from 'react'
import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>{
            (store) => {
                let state = store.getState().dialogsPage;

                const addMessage = () => {
                    store.dispatch(addMessageActionCreator())
                };
                const updateNewMessageText = (text) => {
                    store.dispatch(updateNewMessageTextActionCreator(text));
                };

                return <Dialogs dialogsPage={state}
                         addMessage={addMessage}
                         updateNewMessageText={updateNewMessageText}
                />
            }
        }</StoreContext.Consumer>
    )
};

export default DialogsContainer;