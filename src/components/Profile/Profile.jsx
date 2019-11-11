import React from 'react'
import s from './Profile.module.scss'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = () => {
    return (
        <div className={`${s.content} container`}>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;