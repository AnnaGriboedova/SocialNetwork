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
        if (!isFormOpen && props.newPostText) {
            setIsFormOpen(true);
        }
    }, [props.newPostText]);

    let [isFormOpen, setIsFormOpen] = useState(false);

    const onBlur = (e) => {
        e.preventDefault();

        props.blurFieldValue('profileAddPostForm', 'newPostText');

        if (!e.target.value) {
            setIsFormOpen(false)
        }

    };

    const onFocus = (e) => {
        setIsFormOpen(true);
    };
    const change = (newVal) => {
        props.changeFieldValue('profileAddPostForm', 'newPostText', (props.newPostText || '') + newVal);
    };


    return (
        <form onSubmit={props.handleSubmit} className={cn('infoBlock', s.form, isFormOpen && s.open)}>
            <div className={s.postInfo}>
                <UserSmallPhoto photo={props.authUserProfile.photos.small} styles={{circle: true, size: 'sm'}}/>
                <div className={cn(s.messageWrap)}>

                    <Field onFocus={onFocus} onBlur={onBlur}
                           placeholder={'Type something to ' + props.userName}
                           className={cn(s.messageInput)}
                           component={Textarea} name={'newPostText'}/>
                </div>
                <Emoji change={change}/>
            </div>

            {isFormOpen &&
            <div className={s.sendPost}>
                <button className={cn(s.sendBtn, 'button')}>Add Post</button>
            </div>
            }
        </form>
    )
};

AddPostForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm);

const selector = formValueSelector('profileAddPostForm');
AddPostForm = connect(state => {
    const newPostText = selector(state, 'newPostText');

    return {
        newPostText
    }
})(AddPostForm);


export default AddPostForm;