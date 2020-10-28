import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthUserId} from "../../redux/authSelectors";

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId;
            if (!userId) {
                this.props.history.push('/login')
            }

            //userId = 6268
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
            <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
        )
    }
}

let mapStateToProps = (state) => (
    {
        userProfile: state.profilePage.userProfile,
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
)(ProfileContainer);