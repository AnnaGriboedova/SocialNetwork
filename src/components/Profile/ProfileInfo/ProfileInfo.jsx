import React, {useState} from 'react'
import s from '../Profile.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/profile.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileInfoEdit from "./ProfileInfoEdit";
import cn from 'classnames'


import editIcon from "../../../assets/img/icons/edit.svg"

import instagram from "../../../assets/img/icons/soc-network/instagram.svg"
import vk from "../../../assets/img/icons/soc-network/vk.svg"
import twitter from "../../../assets/img/icons/soc-network/twitter.svg"
import facebook from "../../../assets/img/icons/soc-network/facebook.svg"
import github from "../../../assets/img/icons/soc-network/github.svg"
import youtube from "../../../assets/img/icons/soc-network/youtube.svg"
import MyPostsContainer from "../MyPosts/MyPostsContainer";


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
                    <input className={s.profilePhotoInput} type='file' onChange={onMainPhotoSelected}/>}
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

    let isEmptyContactsArrValues = !Object.values(contacts).some(value => !!value);

    let socNetworkIcons = {
        vk,
        instagram,
        twitter,
        facebook,
        github,
        youtube
    };

    return <div className={s.infoWrap}>
        <div className={cn('infoBlock', s.profileInfoBlockWrap)}>

            <div className={s.profileInfoBlock__title}>Job</div>
            <b>
                Looking For A Job: {lookingForAJob ? 'yes' : 'no'}
            </b>
            <div className={s.profileInfoBlock__desc}>

                {lookingForAJobDescription &&
                <div>
                    <span>{lookingForAJobDescription}</span>
                </div>
                }
            </div>

            {
                Object.keys(contacts).length !== 0 && contacts.constructor === Object && !isEmptyContactsArrValues &&
                <div className={s.contacts}>
                    {Object.keys(contacts).map(key => {
                        if (contacts[key]) {
                            return <div className={s.contactWrap}>
                                <a className={s.contact} href={contacts[key]}>
                                    {socNetworkIcons[key] &&
                                    <img className={s.contactIcon} src={socNetworkIcons[key]}/>}
                                    {contacts[key]}
                                </a>
                            </div>
                        }
                        return '';
                    })}
                </div>
            }
        </div>
    </div>
};

export default ProfileInfoContainer;