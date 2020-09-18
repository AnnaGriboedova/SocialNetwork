import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'login'} placeholder={'Login'} component={Input} validate={required}/>
        </div>
        <div>
            <Field name={'password'} placeholder={'Password'} component={Input} validate={required}/>
        </div>
        <div>
            <Field name={'rememberMe'} type={'checkbox'} component={Input}/>remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>

};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    };

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

let mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, {
    login
})(Login);
