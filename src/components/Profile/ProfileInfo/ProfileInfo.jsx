import React from 'react'
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>
                <img className={s.image}
                     src={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}/>
            </div>*/}
            <div>
                <img className={s.image}
                     src={props.userProfile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;