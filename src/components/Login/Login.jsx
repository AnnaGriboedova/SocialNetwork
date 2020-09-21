import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../redux/authReducer";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'email'} placeholder={'Email'} component={Input} validate={required}/>
        </div>
        <div>
            <Field name={'password'} placeholder={'Password'} type="password" component={Input} validate={required}/>
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
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {
    login, logout
})(Login);
