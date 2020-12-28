import React from 'react'
import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getUserProfileSelector} from "../../../redux/profileSelectors";
import {change, blur} from "redux-form";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        authUserProfile: state.auth.authUserProfile,
        userProfile: getUserProfileSelector(state),
        emojisByCategory: state.app.emojisByCategory
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

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;