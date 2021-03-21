import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";
import userPhoto from "../../../assets/img/profile.png";
import cn from 'classnames'
import AddPostForm from "./AddPostForm";
import Preloader from "../../common/Preloader/Preloader";

const MyPosts = React.memo(props => {
    if (!props.authUserProfile || !props.userProfile) return <Preloader/>;

    return (
        <div className={cn('infoBlocksWrap', s.postsWrapper)}>
            <AddPostForm userProfile={props.userProfile} authUserProfile={props.authUserProfile}
                         blurFieldValue={props.blurFieldValue} addPost={props.addPost}
                         changeFieldValue={props.changeFieldValue}/>
            <Posts posts={props.posts}/>

        </div>
    )
});

const Posts = (props) => {
    if (!props.posts.length) return null;

    let postsCopy = [...props.posts];
    let postsSortByDate = postsCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
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