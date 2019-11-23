import React from 'react'
import s from './Dialogs.module.scss'
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);

    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={m.id} message={m.message}/>);

    const sendMessage = () => {
        props.addMessage()
    };
    const onMessageChange = (e) => {
        let text = e.target.value;
        props.updateNewMessageText(text);
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
                    <div>
                        <div><textarea placeholder={'Enter your message'} className={s.messageInput} onChange={onMessageChange}
                                     value={props.dialogsPage.newMessageText}/></div>
                        <div>
                            <button onClick={sendMessage}>send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;