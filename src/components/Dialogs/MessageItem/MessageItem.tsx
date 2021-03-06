import React from 'react'
import s from './../Dialogs.module.scss'
import smProfileIcon from './../../../assets/img/profile.png'

type MessageItem = {
    message: string
}

const MessageItem: React.FC<MessageItem> = (props) => {
    return (
        <div className={s.message}>
            <img src={smProfileIcon} className={`${s.message__profileImg} smProfileIcon`}/>
            {props.message}
        </div>
    )
};

export default MessageItem;