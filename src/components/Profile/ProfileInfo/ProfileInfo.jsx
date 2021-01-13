import React, {useState} from 'react'
import s from '../Profile.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import Contacts from "../Contacts/Contacts";
import userPhoto from '../../../assets/img/profile.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileInfoEdit from "./ProfileInfoEdit";
import cn from 'classnames'


import editIcon from "../../../assets/img/icons/edit.svg"

import MyPostsContainer from "../MyPosts/MyPostsContainer";

import camera from "../../../assets/img/icons/camera.svg"

const ProfileInfoContainer = (props) => {

    let [isProfileEdit, setIsProfileEdit] = useState(false);

    if (!props.userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };

    const activateProfileEdit = (e) => {
        setIsProfileEdit(true);
    };
    const deactivateProfileEdit = (e) => {
        setIsProfileEdit(false);
    };

    return (
        <div className={cn('infoBlocksWrap', s.profileWrap)}>
            <div className={cn('infoBlock', s.profileInfoWrap)}>
                <div className={s.profilePhotoWrap}>
                    <img className={s.profilePhoto}
                         src={props.userProfile.photos.large || userPhoto}/>
                    {props.isOwner &&
                    <div className={s.photoChangeWrap}>
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
                    </div>}
                </div>

                <div className={s.profileInfo}>
                    {props.userProfile.fullName &&
                    <div className={s.profileFullName}>
                        {props.userProfile.fullName}
                    </div>
                    }

                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

                    {props.userProfile.aboutMe &&
                    <div className={s.profileInfo__item}>
                        {props.userProfile.aboutMe}
                    </div>
                    }
                </div>

                <button className={s.profileEditBtn} onClick={activateProfileEdit}>
                    <span className={s.profileEditIcon} style={{backgroundImage: `url(${editIcon})`}}></span>
                </button>
            </div>

            <div className={s.profileColumnsWrap}>
                {isProfileEdit ?

                    <ProfileInfoEdit saveProfile={props.saveProfile} deactivateProfileEdit={deactivateProfileEdit}
                                     userProfile={props.userProfile} isUpdateProfile={props.isUpdateProfile}/>
                    :
                    <ProfileInfo userProfile={props.userProfile} activateProfileEdit={activateProfileEdit}/>

                }
                <MyPostsContainer/>
            </div>


        </div>
    )
};

const ProfileInfo = (props) => {
    const {lookingForAJob, lookingForAJobDescription, fullName, contacts, aboutMe} = props.userProfile;

    return <div className={s.infoWrap}>
        <div className={cn('infoBlock', s.profileInfoBlockWrap)}>

            <div className={cn(s.profileInfoBlock__title, 'title--md-greyColor')}>Job</div>
            <div className={cn('title--sm--greyColor')}>
                Looking For A Job: {lookingForAJob ? 'yes' : 'no'}
            </div>
            <div className={s.profileInfoBlock__desc}>

                {lookingForAJobDescription &&
                <div>
                    <span>{lookingForAJobDescription}</span>
                </div>
                }
            </div>

            {contacts && <Contacts contacts={contacts}/>}
        </div>
    </div>
};


export default ProfileInfoContainer;