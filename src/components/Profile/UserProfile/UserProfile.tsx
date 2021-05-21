import React from 'react'
import s from '../Profile.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../common/Status/ProfileStatus";
import cn from 'classnames'
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import Photo from "../common/Photo/Photo";
import Name from "../common/Name/Name";
import AboutMe from "../common/AboutMe/AboutMe";
import ProfileSidebar from "../common/ProfileSidebar/ProfileSidebar";
import {DispatchProps, StateProps} from '../UserProfileContainer';

type UserProfileProps = StateProps & DispatchProps
const UserProfile: React.FC<UserProfileProps> = (props) => {
    if (!props.userProfile) {
        return <Preloader/>
    }

    return (
        <div className={cn('infoBlocksWrap', s.profileWrap)}>
            <div className={cn('infoBlock', s.profileInfoWrap)}>
                <Photo photos={props.userProfile.photos}/>

                <div className={s.profileInfo}>
                    <Name fullName={props.userProfile.fullName}/>

                    <ProfileStatus edit={false} status={props.status} updateStatus={props.updateStatus}/>

                    {props.userProfile.aboutMe && <AboutMe aboutMe={props.userProfile.aboutMe}/>}
                </div>

                <button className={s.profileEditBtn}>
                    <span className={s.profileEditIcon}></span>
                </button>
            </div>

            <div className={s.profileColumnsWrap}>

                <ProfileSidebar lookingForAJob={props.userProfile.lookingForAJob}
                                lookingForAJobDescription={props.userProfile.lookingForAJobDescription}
                                contacts={props.userProfile.contacts}/>

                <MyPostsContainer/>
            </div>
        </div>
    )
};

export default UserProfile;