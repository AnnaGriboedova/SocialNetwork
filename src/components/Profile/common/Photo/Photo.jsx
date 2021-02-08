import React from 'react'
import s from "../../Profile.module.scss";
import userPhoto from "../../../../assets/img/profile.png";

const Photo = (props) => {
    return <div className={s.profilePhotoWrap}>
        <img className={s.profilePhoto}
             src={props.photos.large || userPhoto}/>

        {props.children}
    </div>
};

export default Photo;