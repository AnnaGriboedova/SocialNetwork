import React, {useContext, useEffect, useState} from 'react'
import MyProfile from "./MyProfile/MyProfile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import ProfileEdit from "./MyProfile/ProfileEdit";
import {AuthUserProfileContext} from "../../App";
import {StateType} from "../../redux/redux-store";
import {UserProfileType} from "../../types/types";

const MyProfileContainer: React.FC<StateProps & DispatchProps & RouteComponentProps<{ userId: string }>> = (props) => {
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

    const activateProfileEdit = () => {
        setIsProfileEdit(true);
    };
    const deactivateProfileEdit = () => {
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

let mapState = (state: StateType) => (
    {
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        isUpdateProfile: state.profilePage.isUpdateProfile
    }
);

export type StateProps = ReturnType<typeof mapState>
export type DispatchProps = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    saveProfile: (profileData: UserProfileType) => Promise<string> | never,
}

export default compose<React.ComponentType>(
    connect(mapState, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter,
    //withAuthRedirect
)(MyProfileContainer);