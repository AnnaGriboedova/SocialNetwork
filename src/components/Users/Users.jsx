import React from 'react'
import styles from './Users.module.scss'

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: 1,
                    profileImgUrl: 'http://localhost:3000/static/media/profile.4c03f727.png',
                    followed: true,
                    fullName: 'Dmitry',
                    status: 'I am Boss',
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: 2,
                    profileImgUrl: 'http://localhost:3000/static/media/profile.4c03f727.png',
                    followed: true,
                    fullName: 'Sasha',
                    status: 'I am Boss1',
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    profileImgUrl: 'http://localhost:3000/static/media/profile.4c03f727.png',
                    followed: false,
                    fullName: 'Andru',
                    status: 'I am Boss2',
                    location: {city: 'Kiev', country: 'Ukraine'}
                }
            ]
        )
    }
    return <div className={styles.usersContainer}>
        {props.users.map(u => <div className={styles.userWrapper} key={u.id}>
            <div className={styles.userProfile}>
                <div>
                    <a className={styles.profileImgLink}> <img className={styles.profileImg} alt={u.fullName + ' profile image'} src={u.profileImgUrl}/> </a>
                </div>
            </div>
            <div className={styles.userInfoWrapper}>
                <div className={styles.userInfo}>
                    <div className={styles.userName}>{u.fullName}</div>
                    <div className={styles.userStatus}>{u.status}</div>
                    <div className={styles.userButtonWrapper}>
                        {u.followed ?
                            <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button> :
                            <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </div>
                <div>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </div>
            </div>
        </div>)}
    </div>
};

export default Users;