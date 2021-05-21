import s from "./UserSmallPhoto.module.scss";
import userPhoto from "../../../assets/img/profile.png";
import React from "react";
import cn from 'classnames';

type UserSmallPhotoProps = {
    photo: string
    styles: {
        circle: boolean
        size: 'md' | 'sm'
    }
}
const UserSmallPhoto: React.FC<UserSmallPhotoProps> = ({photo, styles}) => {
    return (
        <img className={cn(s.profilePhoto, styles && {
            [s.circle]: styles.circle,
            [s[styles.size]]: styles.size
        })} src={photo || userPhoto}/>
    )
};

export default UserSmallPhoto;