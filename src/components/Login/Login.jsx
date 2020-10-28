import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../redux/authReducer";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.scss";

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <Field name={'email'} placeholder={'Email'} component={Input} validate={required}/>
        </div>
        <div>
            <Field name={'password'} placeholder={'Password'} type="password" component={Input} validate={required}/>
        </div>
        <div>
            <Field name={'rememberMe'} type={'checkbox'} component={Input}/>remember me
        </div>

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && <Field name={'captcha'} component={Input} validate={required}/>}

        {error && <div className={styles.summaryError}>
            {
                error
            }
        </div>}
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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
};

let mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {
    login, logout
})(Login);
