import React from 'react'
import s from './../Dialogs.module.scss'
import {NavLink} from "react-router-dom";
import profileImg from './../../../assets/img/profile.png'

type DialogItem = {
    name: string
    id: number
}

const DialogItem: React.FC<DialogItem> = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog}>
            <img className={`${s.dialog__profileImg} smProfileIcon`} src={profileImg}></img>
            <div className={s.dialogInfo}>
                <NavLink to={path}>
                    {props.name}
                </NavLink>
            </div>
        </div>
    )
};

export default DialogItem;