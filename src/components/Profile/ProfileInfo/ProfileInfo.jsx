import React, {useState} from 'react'
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from '../../../assets/img/profile.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileInfoEdit from "./ProfileInfoEdit";

const ProfileInfoContainer = (props) => {

    let [isProfileEdit, setIsProfileEdit] = useState(false);

    if (!props.userProfile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    };

    const activateProfileEdit = (e) => {
        setIsProfileEdit(true);
    };
    const deactivateProfileEdit = (e) => {
        setIsProfileEdit(false);
    };

    return (
        <div>
            <div>
                <img className={s.image}
                     src={props.userProfile.photos.large || userPhoto}/>
                {props.isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
            </div>

            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>

            {isProfileEdit ?

                <ProfileInfoEdit saveProfile={props.saveProfile} deactivateProfileEdit={deactivateProfileEdit}
                                 userProfile={props.userProfile} isUpdateProfile={props.isUpdateProfile}/>
                :
                <ProfileInfo userProfile={props.userProfile} activateProfileEdit={activateProfileEdit}/>

            }

        </div>
    )
};

const ProfileInfo = (props) => {
    const {lookingForAJob, lookingForAJobDescription, fullName, contacts, aboutMe} = props.userProfile;

    let isEmptyContactsArrValues = !Object.values(contacts).some(value => !!value);

    return <div>
        {fullName &&
        <div>
            full Name: {fullName}
        </div>
        }

        {aboutMe &&
        <div>
            About Me:<span>{aboutMe}</span>
        </div>
        }

        <div>
            Looking For A Job: {lookingForAJob ? 'yes' : 'no'}
        </div>

        {lookingForAJobDescription &&
        <div>
            Looking For A Job Description:
            <span>{lookingForAJobDescription}</span>
        </div>
        }

        {
            Object.keys(contacts).length !== 0 && contacts.constructor === Object && !isEmptyContactsArrValues &&
            <div>
                <b>Contacts</b>: {Object.keys(contacts).map(key => {
                if (contacts[key]) {
                    return <div className={s.contact}>{key}: {contacts[key]}</div>
                }
                return '';
            })}
            </div>
        }

        <button onClick={props.activateProfileEdit}>PROFILE EDIT</button>
    </div>
};

export default ProfileInfoContainer;