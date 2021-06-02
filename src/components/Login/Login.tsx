import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";
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


export const Login: React.FC = (props) => {
    const captchaUrl = useSelector((state: StateType) => state.auth.captchaUrl),
        isAuth = useSelector((state: StateType) => state.auth.isAuth),
        dispatch = useDispatch(),
        onLogin = (email: string, password: string, rememberMe: boolean, captcha: string) => {
            dispatch(login(email, password, rememberMe, captcha))
        }

    const onSubmit = (formData: LoginFormData) => {
        onLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
};