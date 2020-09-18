import React from 'react'
import s from './Dialogs.module.scss'
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={m.id} message={m.message}/>);

    const addNewMessage = (values) => {
        props.addMessage(values.newMessageText);
    };

    if (!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={`${s.dialogs} container`}>
            <h3 className={s.heading}>Dialogs</h3>
            <div className={s.dialogsWrapper}>
                <div className={s.dialogsList}>
                    {dialogsElements}
                </div>
                <div className={s.messagesList}>
                    <div>{messagesElements}</div>
                    <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
};

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required]} placeholder={'Enter your message'} name='newMessageText'
                       className={s.messageInput}/>
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;