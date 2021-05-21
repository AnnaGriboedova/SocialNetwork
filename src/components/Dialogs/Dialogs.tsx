import React from 'react'
import s from './Dialogs.module.scss'
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";
import {actions} from "../../redux/dialogsReducer";
import {mapStateToProps} from './DialogsContainer';

type DialogsProps = ReturnType<typeof mapStateToProps> & typeof actions

const Dialogs: React.FC<DialogsProps> = ({dialogsPage, addMessage}) => {
    let dialogsElements = dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    let messagesElements = dialogsPage.messages.map(m => <MessageItem key={m.id} message={m.message}/>);

    const addNewMessage = (values: AddMessageFormData) => {
        addMessage(values.newMessageText);
    };

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

type AddMessageFormData = {
    newMessageText: string
}
const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormData>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} validate={[required]} placeholder={'Enter your message'}
                       name='newMessageText'
                       className={s.messageInput}/>
            </div>
            <div>
                <button>send</button>
            </div>
        </form>
    )
};

const AddMessageReduxForm = reduxForm<AddMessageFormData>({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;