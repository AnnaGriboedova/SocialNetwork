import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} like={p.likesCount}/>);

    let newPostElement = React.createRef();
    const onAddPost = () => {
        props.addPost();
    };
    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };
    return (
        <div>
            My posts
            <div>
                <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
                <button onClick={onAddPost}>Add Post</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};

export default MyPosts;