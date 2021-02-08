import React from 'react'
import Preloader from "../../common/Preloader/Preloader";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import styles from "../../common/FormsControls/FormsControls.module.scss";

const ProfileEdit = (props) => {
    if (!props.userProfile) {
        return <Preloader/>
    }

    const onSubmit = (values) => {
        props.saveProfile(values).then(() => {
            props.deactivateProfileEdit();
        })
    };

    return (
        <div>
            {props.isUpdateProfile && <Preloader/>}
            <ProfileInfoReduxForm initialValues={props.userProfile} userProfile={props.userProfile}
                                  onSubmit={onSubmit}/>
        </div>
    )
};

const ProfileInfoForm = (props) => {
    const contacts = props.userProfile.contacts;
    return (
        <form onSubmit={props.handleSubmit}>

            <div>
                full Name: <span>
                    <Field component={Input} name={'fullName'} validate={required} type="text"/>
                </span>
            </div>

            <div>
                About Me:
                <span>
                    <Field component={Textarea} name={'aboutMe'} validate={required}/>
                </span>
            </div>

            <div>
                Looking For A Job:
                <span>
                    <Field component={Input} name={'lookingForAJob'} type="checkbox"/>YES
                </span>
            </div>

            <div>
                Looking For A Job Description:
                <span>
                    <Field component={Textarea} name={'lookingForAJobDescription'} validate={required}/>
                </span>
            </div>

            <div>
                <b>Contacts</b>:
                {Object.keys(contacts).map(key => {
                    return <div>
                        {key}:
                        <span>
                            <Field component={Input} name={"contacts." + key} type="text"/>
                        </span>
                    </div>
                })}
            </div>

            <button>SAVE</button>

            {props.error && <div className={styles.summaryError}>
                {
                    props.error
                }
            </div>}
        </form>
    )
};

const ProfileInfoReduxForm = reduxForm({
    form: 'profileInfoForm'
})(ProfileInfoForm);

export default ProfileEdit;