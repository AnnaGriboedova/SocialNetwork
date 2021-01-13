import React, {useState} from 'react'
import s from '../Profile.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/profile.png'
import ProfileStatusWithHooks from "../ProfileInfo/ProfileStatusWithHooks";
import cn from 'classnames'


import MyPostsContainer from "../MyPosts/MyPostsContainer";
import Contacts from "../Contacts/Contacts";


const UserProfile = (props) => {

    if (!props.userProfile) {
        return <Preloader/>
    }


    return (
        <div className={cn('infoBlocksWrap', s.profileWrap)}>
            <div className={cn('infoBlock', s.profileInfoWrap)}>
                <div className={s.profilePhotoWrap}>
                    <img className={s.profilePhoto}
                         src={props.userProfile.photos.large || userPhoto}/>
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

                <button className={s.profileEditBtn}>
                    <span className={s.profileEditIcon}></span>
                </button>
            </div>

            <div className={s.profileColumnsWrap}>

                <UserProfileInfo userProfile={props.userProfile}/>


                <MyPostsContainer/>
            </div>


        </div>
    )
};

const UserProfileInfo = (props) => {
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
export default UserProfile;