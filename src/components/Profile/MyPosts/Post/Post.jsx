import React from 'react'
import s from './Post.module.scss'

const Post = (props) => {
  return (
      <div className={s.post}>
          <img src={'https://peopletalk.ru/wp-content/uploads/2016/11/1480331127.jpg'}/>
          {props.message}
        <div>
          <span>{props.like} like</span>
        </div>
      </div>
  )
};

export default Post;