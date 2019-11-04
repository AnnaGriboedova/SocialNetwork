import React from 'react'
import s from './../Navbar.module.scss'
import FriendItem from "./FriendItem/FriendItem";

const Friends = (props) => {
  let friendsElements = props.state.map(friend => <FriendItem name={friend.name} id={friend.id} />);
  return (
      <div className={s.friendsBlock}>
        <h3 className={s.heading}>Friends</h3>
        <div className={s.friendsList}>
          {friendsElements}
        </div>
      </div>
  )
};

export default Friends;