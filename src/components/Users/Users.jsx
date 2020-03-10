import React from 'react'
import styles from './Users.module.scss'
import * as axios from 'axios'

import userPhoto from '../../assets/img/profile.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setUsersTotalCount(response.data.totalCount);
        });
    }

    onPageChanged(pageNum){
        this.props.setCurrentPage(pageNum);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.usersTotalCount / this.props.pageSize);
        let pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return <div className={styles.usersContainer}>
            <div>
                {pages.map(p => {
                    return <span onClick={()=>{this.onPageChanged(p)}} className={this.props.currentPage === p && styles.selectedPage}>{p}</span>
                })}
            </div>
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