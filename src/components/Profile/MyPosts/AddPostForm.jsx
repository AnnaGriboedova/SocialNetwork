import React, {useEffect, useState} from 'react'
import s from './MyPosts.module.scss'
import {Field, reduxForm, change, formValueSelector} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import cn from 'classnames'
import UserSmallPhoto from "../../common/UserSmallPhoto/UserSmallPhoto";
import Emoji from "../../common/Emoji/Emoji";
import {connect} from "react-redux";


let AddPostForm = (props) => {

    useEffect(() => {
        if (!isFormOpen && props.message) {
            setIsFormOpen(true);
        } else if (isFormOpen && !props.message) {
            setIsFormOpen(false);
        }
    }, [props.message]);

    let [isFormOpen, setIsFormOpen] = useState(false);

    const onBlur = (e) => {
        e.preventDefault();

        props.blurFieldValue('profileAddPostForm', 'message');

        if (!e.target.value) {
            setIsFormOpen(false)
        }

    };

    const onFocus = (e) => {
        setIsFormOpen(true);
    };
    const change = (newVal) => {
        props.changeFieldValue('profileAddPostForm', 'message', (props.message || '') + newVal);
    };


    return (
        <form onSubmit={props.handleSubmit} className={cn('infoBlock', s.form, isFormOpen && s.open)}>
            <div className={s.postInfo}>
                <UserSmallPhoto photo={props.authUserProfile.photos.small} styles={{circle: true, size: 'sm'}}/>
                <div className={cn(s.messageWrap)}>

                    <Field onFocus={onFocus} onBlur={onBlur}
                           placeholder={'Type something to ' + props.userName}
                           className={cn(s.messageInput)}
                           component={Textarea} name={'message'}/>
                </div>
                <Emoji change={change}/>
            </div>

            {isFormOpen &&
            <div className={s.sendPost}>
                <button disabled={props.isFetching} className={cn(s.sendBtn, 'button')}>Add Post</button>
            </div>
            }
        </form>
    )
};

AddPostForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm);

const selector = formValueSelector('profileAddPostForm');

const AddPostFormContainer = (props) => {
    let [isFetching, setIsFetching] = useState(false);
    const addPost = (values) => {
        let userPhoto = props.authUserProfile.photos.small;
        let userName = props.authUserProfile.fullName;

        setIsFetching(true);
        props.addPost({user: {userPhoto, userName}, message: values.message}).then(() => {
            setIsFetching(false)
        })
    };

    return <AddPostForm onSubmit={addPost} isFetching={isFetching} {...props}/>
};

export default connect(state => {
    const message = selector(state, 'message');

    return {
        message
    }
})(AddPostFormContainer);