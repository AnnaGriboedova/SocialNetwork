import React from 'react'
import styles from './Users.module.scss'
import * as axios from 'axios'

import userPhoto from '../../assets/img/profile.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            debugger;
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <div className={styles.usersContainer}>
            {this.props.users.map(u => <div className={styles.userWrapper} key={u.id}>
                <div className={styles.userProfile}>
                    <div>
                        <a className={styles.profileImgLink}>
                            <img className={styles.profileImg} alt={'profile image'}
                                 src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                        </a>
                    </div>
                </div>
                <div className={styles.userInfoWrapper}>
                    <div className={styles.userInfo}>
                        <div className={styles.userName}>{u.name}</div>
                        <div className={styles.userStatus}>{u.status}</div>
                        <div className={styles.userButtonWrapper}>
                            {u.followed ?
                                <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button> :
                                <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div>
                        {/*<div>{u.location.country}</div>
                    <div>{u.location.city}</div>*/}
                    </div>
                </div>
            </div>)}
        </div>
    }
}

export default Users;