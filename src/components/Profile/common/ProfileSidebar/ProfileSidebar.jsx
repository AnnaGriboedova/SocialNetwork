import React from 'react'
import cn from "classnames";
import s from "../../Profile.module.scss";
import Job from "../Job/Job";
import Contacts from "../Contacts/Contacts";

const ProfileSidebar = (props) => {
    const {lookingForAJob, lookingForAJobDescription, contacts} = props;
    const isEmptyContactsValues = Object.values(contacts).some(contact => !!contact);

    return <div className={cn('infoBlock', s.sidebar)}>

        {(lookingForAJob || lookingForAJobDescription) &&
        <Job lookingForAJob={lookingForAJob} lookingForAJobDescription={lookingForAJobDescription}/>}

        {isEmptyContactsValues && <Contacts contacts={contacts}/>}
    </div>

};

export default ProfileSidebar;