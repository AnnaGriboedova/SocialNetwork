import React from 'react'
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthUserId} from "../../redux/authSelectors";
import {getUserProfileSelector} from "../../redux/profileSelectors";
import UserProfile from "./UserProfile/UserProfile";

class UserProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            this.props.history.push('/profile')
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <UserProfile {...this.props} isOwner={!this.props.match.params.userId}/>
        )
    }
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