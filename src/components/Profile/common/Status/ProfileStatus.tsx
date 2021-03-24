import React, {useState, useEffect, ChangeEvent} from 'react';
import s from '../../Profile.module.scss'

import thinkingIcon from "../../../../assets/img/icons/thinking.svg"

type ProfileStatusPropsType = {
    edit: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = (props) => {
    return (
        <div className={s.profileStatusWrap}>
            {props.edit ?
                <ProfileStatusEdit status={props.status} updateStatus={props.updateStatus}/> :
                <ProfileStatusText status={props.status}/>}
        </div>
    )

};

type ProfileStatusTextPropsType = {
    status: string
}
const ProfileStatusText: React.FC<ProfileStatusTextPropsType> = (props) => {

    return (

        <span className={s.profileStatusContainer}>
                <span className={s.profileStatusIcon} style={{backgroundImage: `url(${thinkingIcon})`}}></span>
                <span className={s.profileStatus}>{props.status || '---------'}</span>
        </span>

    )

};

type ProfileStatusEditPropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusEdit: React.FC<ProfileStatusEditPropsType> = (props) => {

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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    };

    return (

        <div className={s.profileStatusEdit}>
            {!editMode &&
            <span onDoubleClick={activateEditMode}>
                <ProfileStatusText status={props.status}/>
            </span>

            }
            {editMode &&

            <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                   value={status}/>

            }
        </div>

    )

};

export default ProfileStatus;