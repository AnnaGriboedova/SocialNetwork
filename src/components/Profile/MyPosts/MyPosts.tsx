import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";
import userPhoto from "../../../assets/img/profile.png";
import cn from 'classnames'
import Preloader from "../../common/Preloader/Preloader";
import {PostType, UserProfileType} from "../../../types/types";
import {DispatchProps, StateProps} from "./MyPostsContainer";
import AddPostFormContainer from "./AddPostFormContainer";

type MyPostsProps = {
    authUserProfile: UserProfileType
} & StateProps & DispatchProps

const MyPosts = React.memo<MyPostsProps>(props => {
    if (!props.authUserProfile || !props.userProfile) return <Preloader/>;

    return (
        <div className={cn('infoBlocksWrap', s.postsWrapper)}>
            <AddPostFormContainer userProfile={props.userProfile} authUserProfile={props.authUserProfile}
                                  blur={props.blur} addPost={props.addPost}
                                  change={props.change}/>
            <Posts posts={props.posts}/>

        </div>
    )
});

type PostsProps = {
    posts: Array<PostType>
}
const Posts: React.FC<PostsProps> = (props) => {
    if (!props.posts.length) return null;

    let postsCopy = [...props.posts];
    let postsSortByDate = postsCopy.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    let postsElements = postsSortByDate.map(p => <Post date={p.date || new Date()}
                                                       name={(p.user && p.user.userName) || 'Name'}
                                                       photo={(p.user && p.user.userPhoto) || userPhoto}
                                                       message={p.message}
                                                       like={p.likesCount}/>);

    return <div className={s.posts}>
        <h3 className={cn(s.postsHeading, 'title--md-greyColor')}>Publications</h3>
        {postsElements}
    </div>
};


export default MyPosts;