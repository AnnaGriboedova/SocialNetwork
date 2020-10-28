import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Route, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        if (!this.props.isAuth) {
            return <Login/>

        }

        return (
            <div className='appWrapper'>
                <Navbar/>
                <div className='contentContainer'>
                    <Route render={
                        withSuspense(DialogsContainer)
                    } path='/dialogs'/>

                    <Route render={
                        withSuspense(ProfileContainer)
                    } path='/profile/:userId?'/>

                    <Route render={() =>
                        <UsersContainer/>
                    } path='/users'/>

                    {/*<Route render={() =>
                        <Login/>
                    } path='/login'/>*/}

                    <Route render={() => <News/>} path='/news'/>
                    <Route render={() => <Music/>} path='/music'/>
                    <Route render={() => <Settings/>} path='/settings'/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp
    })
)(App);

const SocialNetworkApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
};

export default SocialNetworkApp;
