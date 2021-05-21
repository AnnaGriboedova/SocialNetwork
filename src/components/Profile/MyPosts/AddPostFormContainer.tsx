import React, {useState} from 'react'
import {formValueSelector} from "redux-form";
import {connect} from "react-redux";
import {DispatchProps} from "./MyPostsContainer";
import {UserProfileType} from "../../../types/types";
import {AddPostForm1, LoginFormData} from "./AddPostForm";


const selector = formValueSelector('profileAddPostForm');

export type AddPostFormContainerProps = {
    userProfile: UserProfileType
    authUserProfile: UserProfileType
    message: string
} & DispatchProps
const AddPostFormContainer: React.FC<AddPostFormContainerProps> = (props) => {
    let [isFetching, setIsFetching] = useState(false);
    const addPost = (values: LoginFormData) => {
        let userPhoto = props.authUserProfile.photos.small;
        let userName = props.authUserProfile.fullName;

        setIsFetching(true);
        props.addPost({user: {userPhoto, userName}, message: values.message}).then(() => {
            setIsFetching(false)
        })
    };

    return <AddPostForm1 onSubmit={addPost} isFetching={isFetching} {...props}/>
};

export default connect(state => {
    const message = selector(state, 'message');

    return {
        message
    }
})(AddPostFormContainer);