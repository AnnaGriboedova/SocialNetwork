import React from 'react'
import s from "../../Profile.module.scss";

type NameProps = {
    fullName: string
}
const Name: React.FC<NameProps> = (props) => {
    return <div className={s.profileFullName}>
        {props.fullName}
    </div>
};

export default Name;