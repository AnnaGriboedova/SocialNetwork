import React from 'react'

import s from "../../Profile.module.scss";
import camera from "../../../../assets/img/icons/camera.svg";

const PhotoChange = (props) => {
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };

    return <div className={s.photoChangeWrap}>
        <div className={s.photoChange}>
            <span className={s.photoChange__info}>
                <span className={s.photoChange__infoIcon}
                      style={{backgroundImage: `url(${camera})`}}></span>
            </span>
            <label htmlFor="custom-file-upload" className={s.photoChange__label}>
                <span className={s.photoChange__changeLink}>Change photo</span>
                <input name="attachment-file" id="custom-file-upload" className={s.photoChange__input}
                       type='file' onChange={onMainPhotoSelected}/>
            </label>
        </div>
    </div>
};

export default PhotoChange;