import React, {useState, useEffect, useContext} from 'react'
import MyProfile from "./MyProfile/MyProfile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import ProfileEdit from "./MyProfile/ProfileEdit";
import {AuthUserProfileContext} from "../../App";


const MyProfileContainer = (props) => {
    let [isProfileEdit, setIsProfileEdit] = useState(false);

    const authUserProfile = useContext(AuthUserProfileContext);

    useEffect(() => {
        if (!authUserProfile.userId) {
            props.history.push('/login')
            //userId = 6268
        }
       // props.getStatus(authUserProfile.userId);
        props.getUserProfile(authUserProfile.userId);


    }, []);


    const activateProfileEdit = (e) => {
        setIsProfileEdit(true);
    };
    const deactivateProfileEdit = (e) => {
        setIsProfileEdit(false);
    };

    if (!authUserProfile) return null;

    return <>
        {!isProfileEdit ?
            <MyProfile activateProfileEdit={activateProfileEdit}
                       deactivateProfileEdit={deactivateProfileEdit} profile={authUserProfile} {...props}
                       isOwner={!props.match.params.userId}/>
            :
            <ProfileEdit saveProfile={props.saveProfile} deactivateProfileEdit={deactivateProfileEdit}
                         userProfile={authUserProfile} isUpdateProfile={props.isUpdateProfile}/>
        }
    </>


};

let mapStateToProps = (state) => (
    {
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        isUpdateProfile: state.profilePage.isUpdateProfile
    }
);

export default compose(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter,
    //withAuthRedirect
)(MyProfileContainer);