import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {StateType} from '../redux/redux-store';

let mapStateToPropsForRedirect = (state: StateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType);

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) {
            return <Redirect to='/login'/>
        }
        return <WrappedComponent {...restProps as WCP}/>

    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, StateType>(
        mapStateToPropsForRedirect, {})
    (RedirectComponent)

    return ConnectedAuthRedirectComponent;

};