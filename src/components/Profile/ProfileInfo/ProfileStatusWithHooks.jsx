import React, {useState, useEffect} from 'react';
import s from '../Profile.module.scss'

import thinkingIcon from "../../../assets/img/icons/thinking.svg"

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);

    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };

    return (
        <div className={s.profileStatusWrap}>
            {!editMode &&
            <span className={s.profileStatusContainer}>
                <span className={s.profileStatusIcon} style={{backgroundImage: `url(${thinkingIcon})`}}></span>
                <span className={s.profileStatus} onDoubleClick={activateEditMode}>{props.status || '---------'}</span>
            </span>
            }
            {editMode &&

            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                   value={status}/>

            }
        </div>
    )

};

export default ProfileStatusWithHooks;