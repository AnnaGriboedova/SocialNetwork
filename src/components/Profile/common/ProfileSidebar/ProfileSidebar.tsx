import React from 'react'
import cn from "classnames";
import s from "../../Profile.module.scss";
import Job, {JobProps} from "../Job/Job";
import Contacts from "../Contacts/Contacts";
import {ContactsType} from "../../../../types/types";

type ProfileSidebarProps = JobProps & { contacts: ContactsType }

const ProfileSidebar: React.FC<ProfileSidebarProps> = (props) => {
    const {lookingForAJob, lookingForAJobDescription, contacts} = props;
    const isEmptyContactsValues = Object.values(contacts).some(contact => !!contact);

    return <div className={cn('infoBlock', s.sidebar)}>

        {(lookingForAJob || lookingForAJobDescription) &&
        <Job lookingForAJob={lookingForAJob} lookingForAJobDescription={lookingForAJobDescription}/>}

        {isEmptyContactsValues && <Contacts contacts={contacts}/>}
    </div>

};

export default ProfileSidebar;