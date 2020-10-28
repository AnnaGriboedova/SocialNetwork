import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        smallProfilePhoto: state.auth.authUserProfile.photos.small,
    }
};

export default connect(mapStateToProps, {})(HeaderContainer);