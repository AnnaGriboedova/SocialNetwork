import React from 'react'
import {logout} from "../../../redux/authReducer";
import {connect} from "react-redux";
import Logout from "./Logout";
import {StateType} from "../../../redux/redux-store";

class LogoutContainer extends React.Component<StateProps & DispatchProps> {
    render() {
        return (
            <Logout {...this.props}/>
        )
    }
}

let stateProps = (state: StateType) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export type StateProps = ReturnType<typeof stateProps>
export type DispatchProps = {
    logout: () => void
}

export default connect<StateProps, DispatchProps, {}, StateType>(stateProps, {
    logout
})(LogoutContainer);