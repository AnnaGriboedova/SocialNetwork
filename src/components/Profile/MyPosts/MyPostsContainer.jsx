import React, {useContext} from 'react'
import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getUserProfileSelector} from "../../../redux/profileSelectors";
import {change, blur} from "redux-form";
import {AuthUserProfileContext} from "../../../App";

const MyPostsContainer = (props) => {
    const authUserProfile = useContext(AuthUserProfileContext);
    return <MyPosts authUserProfile={authUserProfile} {...props}/>
};

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        userProfile: getUserProfileSelector(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeFieldValue: (formName, fieldName, newFieldValue) => {
            dispatch(change(formName, fieldName, newFieldValue))
        },
        blurFieldValue: (formName, fieldName, newFieldValue) => {
            dispatch(blur(formName, fieldName, newFieldValue))
        },
        addPost: (post) => {
            return dispatch(addPost(post));
        },

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);