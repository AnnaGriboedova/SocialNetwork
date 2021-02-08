import React from 'react'
import s from '../Profile.module.scss'
import cn from 'classnames'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../common/Status/ProfileStatus";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import EditButton from "./components/EditButton";
import PhotoChange from "./components/PhotoChange";
import Photo from "../common/Photo/Photo";
import Name from "../common/Name/Name";
import AboutMe from "../common/AboutMe/AboutMe";
import ProfileSidebar from "../common/ProfileSidebar/ProfileSidebar";

const MyProfile = (props) => {

    if (props.profile.constructor === Object && Object.keys(props.profile).length === 0) {
        return <Preloader/>
    }

    return (
        <div className={cn('infoBlocksWrap', s.profileWrap)}>
            <div className={cn('infoBlock', s.profileInfoWrap)}>
                <Photo photos={props.profile.photos}>
                    <PhotoChange savePhoto={props.savePhoto}/>
                </Photo>

                <div className={s.profileInfo}>

                    <Name fullName={props.profile.fullName}/>

                    <ProfileStatus edit={true} status={props.status} updateStatus={props.updateStatus}/>

                    {props.profile.aboutMe && <AboutMe aboutMe={props.profile.aboutMe}/>}
                </div>

                <EditButton activateProfileEdit={props.activateProfileEdit}/>
            </div>

            <div className={s.profileColumnsWrap}>
                <ProfileSidebar lookingForAJob={props.profile.lookingForAJob}
                                lookingForAJobDescription={props.profile.lookingForAJobDescription}
                                contacts={props.profile.contacts}/>

                <MyPostsContainer/>
            </div>
        </div>
    )
};


export default MyProfile;