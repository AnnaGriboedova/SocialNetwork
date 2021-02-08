import React from 'react'
import s from "../../Profile.module.scss";

const Name = (props) => {
    return <div className={s.profileFullName}>
        {props.fullName}
    </div>
};

export default Name;