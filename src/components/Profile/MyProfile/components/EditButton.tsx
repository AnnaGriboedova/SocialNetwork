import React from 'react'

import s from "../../Profile.module.scss";
import editIcon from "../../../../assets/img/icons/edit.svg";

type EditButtonProps = {
    activateProfileEdit: () => void
}
const EditButton: React.FC<EditButtonProps> = (props) => {
    return (
        <button className={s.profileEditBtn} onClick={props.activateProfileEdit}>
            <span className={s.profileEditIcon} style={{backgroundImage: `url(${editIcon})`}}></span>
        </button>
    )
};

export default EditButton;