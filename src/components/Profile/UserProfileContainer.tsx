import React, {useContext, useEffect} from 'react'
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthUserId} from "../../redux/authSelectors";
import {getUserProfileSelector} from "../../redux/profileSelectors";
import UserProfile from "./UserProfile/UserProfile";
import {AuthUserProfileContext} from "../../App";
import {StateType} from "../../redux/redux-store";
import {UserProfileType} from "../../types/types";


const UserProfileContainer: React.FC<StateProps & DispatchProps & RouteComponentProps<{ userId: string }>>
    = (props) => {
    const authUserProfile = useContext(AuthUserProfileContext);
    let userId = Number.parseInt(props.match.params.userId);

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
        if (authUserProfile.userId === userId) {
            props.history.replace('/profile')
        }
        props.getUserProfile(userId);
    };

    return (
        <UserProfile {...props} />
    )
}

let mapState = (state: StateType) => (
    {
        userProfile: getUserProfileSelector(state),
        status: state.profilePage.status,
        authUserId: getAuthUserId(state),
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
)(UserProfileContainer);