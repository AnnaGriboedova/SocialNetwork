import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, logout} from "../../redux/authReducer";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.scss";
import {StateType} from "../../redux/redux-store";

type LoginFormProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<LoginFormProps & InjectedFormProps<LoginFormData, LoginFormProps>> =
    ({
         handleSubmit,
         error,
         captchaUrl
     }) => {
        return <form onSubmit={handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'Email'} component={Input} validate={required}/>
            </div>
            <div>
                <Field name={'password'} placeholder={'Password'} type="password" component={Input}
                       validate={required}/>
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

const LoginReduxForm = reduxForm<LoginFormData, LoginFormProps>({
    form: 'login'
})(LoginForm);

type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


const Login: React.FC<MapStateToProps & MapDispatchToProps> = (props) => {
    const onSubmit = (formData: LoginFormData) => {
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

type MapStateToProps = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    logout: () => void
}

let mapStateToProps = (state: StateType): MapStateToProps => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {
    login, logout
} as MapDispatchToProps)(Login);
