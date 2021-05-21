import React, {useContext} from 'react'
import {addPost} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getUserProfileSelector} from "../../../redux/profileSelectors";
import {blur, BlurAction, change, ChangeAction} from "redux-form";
import {AuthUserProfileContext} from "../../../App";
import {StateType} from "../../../redux/redux-store";
import {PostType} from '../../../types/types';

const MyPostsContainer: React.FC<StateProps & DispatchProps> = (props) => {
    const authUserProfile = useContext(AuthUserProfileContext);
    return <MyPosts authUserProfile={authUserProfile} {...props}/>
};

export type StateProps = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: StateType) => {
    return {
        posts: state.profilePage.posts,
        userProfile: getUserProfileSelector(state),
    }
};

export type DispatchProps = {
    change: typeof change & ChangeAction
    blur: typeof blur & BlurAction
    addPost: (post: PostType) => any
}


export default connect<StateProps, DispatchProps, {}, StateType>(mapStateToProps,
    {
        change,
        blur,
        addPost,

    } as DispatchProps)(MyPostsContainer);