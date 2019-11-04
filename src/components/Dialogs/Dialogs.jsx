import React from 'react'
import s from './Dialogs.module.scss'
import MessageItem from "./MessageItem/MessageItem";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = (props) => {
  let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

  let messagesElements = props.state.messages.map(m => <MessageItem message={m.message}/>);

  return (
      <div className={`${s.dialogs} container`}>
        <h3 className={s.heading}>Dialogs</h3>
        <div className={s.dialogsWrapper}>
          <div className={s.dialogsList}>
            {dialogsElements}
          </div>
          <div className={s.messagesList}>
            {messagesElements}
          </div>
        </div>
      </div>
  )
};

export default Dialogs;