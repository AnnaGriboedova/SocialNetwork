import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";
import {maxLengthCreator} from "../../../utils/validators/validators";
import cn from 'classnames'
import AddPostForm from "./AddPostForm";

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map(p => <Post message={p.message} like={p.likesCount}/>);

    let newPostElement = React.createRef();
    const onAddPost = () => {
        props.addPost();
    };
    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    const addPost = (values) => {
        import("../../../math").then(math => {
            console.log(math.add(16, 26));
        });
        // props.addPost(values.newPostText);
    };


    return (
        <div className={cn('infoBlocksWrap', s.postsWrapper)}>
            <AddPostForm userProfile={props.userProfile} authUserProfile={props.authUserProfile}
                         blurFieldValue={props.blurFieldValue}
                         changeFieldValue={props.changeFieldValue} onSubmit={addPost}
                         userName={props.userProfile.fullName}/>
            <div className={cn('infoBlock', s.posts)}>
                {postsElements}
            </div>
        </div>
    )
});



export default MyPosts;