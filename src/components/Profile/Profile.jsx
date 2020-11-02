import React from 'react'
import s from './Profile.module.scss'
import ProfileInfoContainer from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfoContainer savePhoto={props.savePhoto} isOwner={props.isOwner} userProfile={props.userProfile}
                                  status={props.status} updateStatus={props.updateStatus}
                                  saveProfile={props.saveProfile} isUpdateProfile={props.isUpdateProfile}
            />
            {/*<MyPostsContainer/>*/}
        </div>
    )
};

export default Profile;