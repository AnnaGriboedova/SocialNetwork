import React from 'react'
import s from './Profile.module.scss'

const Profile = () => {
  return (
      <div className={s.content}>
        <div>
          <img
              src={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}/>
        </div>
        <div>
          Ava+desc
        </div>
        <div>
          My posts
          <div>
            New post
          </div>
          <div>
            <div>
              post 1
            </div>
            <div>
              post 2
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile;