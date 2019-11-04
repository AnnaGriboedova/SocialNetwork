import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElements = props.postsData.map(p => <Post message={p.message} like={p.likesCount}/>);
  return (
      <div>
        My posts
        <div>
          <textarea>qw</textarea>
          <button>Add Post</button>
        </div>
        <div className={s.posts}>
          {postsElements}
        </div>
      </div>
  )
};

export default MyPosts;