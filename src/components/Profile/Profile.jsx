import React from 'react'
import ProfileInfoContainer from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (

            <ProfileInfoContainer savePhoto={props.savePhoto} isOwner={props.isOwner} userProfile={props.userProfile}
                                  status={props.status} updateStatus={props.updateStatus}
                                  saveProfile={props.saveProfile} isUpdateProfile={props.isUpdateProfile}
            />
    )
};

export default Profile;