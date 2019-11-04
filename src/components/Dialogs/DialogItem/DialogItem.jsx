import React from 'react'
import s from './../Dialogs.module.scss'
import {NavLink} from "react-router-dom";
import profileImg from './../../../img/icons/profile.png'

const DialogItem = (props) => {
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