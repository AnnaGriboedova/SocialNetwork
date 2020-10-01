import React from 'react'
import s from './MyPosts.module.scss'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map(p => <Post message={p.message} like={p.likesCount}/>);

    let newPostElement = React.createRef();
    const onAddPost = () => {
        props.addPost();
    };
    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };

    const addPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <div>
            My posts
            <AddPostReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]}/>
            <button>Add Post</button>
            {/*<textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
            <button onClick={onAddPost}>Add Post</button>*/}
        </form>
    )
};

const AddPostReduxForm = reduxForm({
    form: 'profileAddPostForm'
})(AddPostForm);


export default MyPosts;