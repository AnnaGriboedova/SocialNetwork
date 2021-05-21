import React, {useEffect, useState} from 'react'
import s from './MyPosts.module.scss'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import cn from 'classnames'
import UserSmallPhoto from "../../common/UserSmallPhoto/UserSmallPhoto";
import Emoji from "../../common/Emoji/Emoji";
import {AddPostFormContainerProps} from './AddPostFormContainer';

type LoginFormProps = {
    isFetching: boolean
} & AddPostFormContainerProps

export type LoginFormData = {
    message: string
}
let AddPostForm: React.FC<LoginFormProps & InjectedFormProps<LoginFormData, LoginFormProps>> = (props) => {

    useEffect(() => {
        if (!isFormOpen && props.message) {
            setIsFormOpen(true);
        } else if (isFormOpen && !props.message) {
            setIsFormOpen(false);
        }
    }, [props.message]);

    let [isFormOpen, setIsFormOpen] = useState(false);

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        props.blur('profileAddPostForm', 'message');

        if (!e.target.value) {
            setIsFormOpen(false)
        }

    };

    const onFocus = () => {
        setIsFormOpen(true);
    };
    const change = (newVal: string) => {
        let value = (props.message || '') + newVal
        //props.change('profileAddPostForm', 'message', value);
        props.change('message', value);
    };


    return (
        <form onSubmit={props.handleSubmit} className={cn('infoBlock', s.form, isFormOpen && s.open)}>
            <div className={s.postInfo}>
                <UserSmallPhoto photo={props.authUserProfile.photos.small} styles={{circle: true, size: 'sm'}}/>
                <div className={cn(s.messageWrap)}>

                    <Field onFocus={onFocus} onBlur={onBlur}
                           placeholder={'Type something to ' + props.userProfile.fullName}
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

export const AddPostForm1 = reduxForm<LoginFormData, LoginFormProps>({
    form: 'profileAddPostForm'
})(AddPostForm);