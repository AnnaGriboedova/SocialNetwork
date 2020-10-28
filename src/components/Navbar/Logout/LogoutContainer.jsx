import React from 'react'
import {logout} from "../../../redux/authReducer";
import {connect} from "react-redux";
import Logout from "./Logout";

class LogoutContainer extends React.Component {
    render() {
        return (
            <Logout {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {
    logout
})(LogoutContainer);