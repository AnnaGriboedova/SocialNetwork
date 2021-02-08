import React, {useEffect, useContext} from 'react'
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthUserId} from "../../redux/authSelectors";
import {getUserProfileSelector} from "../../redux/profileSelectors";
import UserProfile from "./UserProfile/UserProfile";
import {AuthUserProfileContext} from "../../App";

const UserProfileContainer = (props) => {
    const authUserProfile = useContext(AuthUserProfileContext);
    let userId = props.match.params.userId;

    useEffect(() => {
        refreshProfile();
    }, []);

    useEffect(() => {
        refreshProfile();
    }, [userId]);


    const refreshProfile = () => {
        if (!userId) {
            props.history.push('/profile')
        }
        if (authUserProfile.userId === Number.parseInt(userId)) {
            props.history.replace('/profile')
        }
        props.getUserProfile(userId);
       // props.getStatus(userId);
    };


    return (
        <UserProfile {...props} isOwner={!props.match.params.userId}/>
    )

}

let mapStateToProps = (state) => (
    {
        userProfile: getUserProfileSelector(state),
        status: state.profilePage.status,
        authUserId: getAuthUserId(state),
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
)(UserProfileContainer);