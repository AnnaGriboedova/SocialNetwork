import React from 'react'
import s from './../../Navbar.module.scss'
import profileImg from './../../../../img/icons/profile.png'

const FriendItem = (props) => {
  return (
      <div className={s.friendItem}>
        <img src={profileImg} className={`${s.profileImage} smProfileIcon`}/>
        <div className={s.name}>{props.name}</div>
      </div>
  )
};

export default FriendItem;