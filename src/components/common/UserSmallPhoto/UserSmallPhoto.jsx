import s from "./UserSmallPhoto.module.scss";
import userPhoto from "../../../assets/img/profile.png";
import React from "react";
import cn from 'classnames';

const UserSmallPhoto = ({photo, styles}) => {
    return (
        <img className={cn(s.profilePhoto, styles && {
            [s.circle]: styles.circle,
            [s[styles.size]]: styles.size
        })} src={photo || userPhoto}/>
    )
};

export default UserSmallPhoto;