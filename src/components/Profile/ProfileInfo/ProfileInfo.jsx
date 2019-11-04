import React from 'react'
import s from './ProfileInfo.module.scss'

const ProfileInfo = () => {
  return (
      <div>
        <div>
          <img className={s.image}
               src={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}/>
        </div>
        <div>
          Ava+desc
        </div>
      </div>
  )
};

export default ProfileInfo;