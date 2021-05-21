import React from 'react'
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        authUserProfile: state.auth.authUserProfile,
    }
};

export default connect<MapPropsType, DispatchPropsType, {}, StateType>(mapStateToProps, {})(HeaderContainer);