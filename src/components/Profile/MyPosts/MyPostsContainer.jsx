import React from 'react'
import {addPostActionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getUserProfileSelector} from "../../../redux/profileSelectors";
import {change, blur} from "redux-form";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
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
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        },

    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
export default MyPostsContainer;