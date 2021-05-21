import React from 'react'
import s from "../../Profile.module.scss";
import userPhoto from "../../../../assets/img/profile.png";
import {PhotosType} from '../../../../types/types';

type PhotoProps = {
    photos: PhotosType
}
const Photo: React.FC<PhotoProps> = (props) => {
    return <div className={s.profilePhotoWrap}>
        <img className={s.profilePhoto}
             src={props.photos.large || userPhoto}/>

        {props.children}
    </div>
};

export default Photo;