import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
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
import UserProfileContainer from "./components/Profile/UserProfileContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const MyProfileContainer = React.lazy(() => import("./components/Profile/MyProfileContainer"));

export const AuthUserProfileContext = React.createContext({});

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandedErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandedErrors)
    }

    catchAllUnhandedErrors = (e) => {
        alert("Внимание: Необработанная ошибка Promise. Причина: "
            + e.reason);
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        if (!this.props.isAuth || !this.props.authUserProfile) {
            return <Login/>

        }

        return (
            <AuthUserProfileContext.Provider value={this.props.authUserProfile}>
                <div className='appWrapper'>
                    <Navbar/>
                    <div className='contentContainer'>
                        <div className="postInfo">
                            <Switch>
                                <Route exact render={() => <Redirect to={'/profile'}/>
                                } path='/'/>

                                <Route render={
                                    withSuspense(DialogsContainer)
                                } path='/dialogs'/>

                                <Route exact render={
                                    withSuspense(MyProfileContainer)
                                } path='/profile'/>


                                <Route exact render={() =>
                                    <UsersContainer/>
                                } path='/users'/>

                                <Route render={
                                    withSuspense(UserProfileContainer)
                                } path='/users/:userId?'/>

                                {/*<Route render={() =>
                        <Login/>
                    } path='/login'/>*/}

                                <Route render={() => <News/>} path='/news'/>
                                <Route render={() => <Music/>} path='/music'/>
                                <Route render={() => <Settings/>} path='/settings'/>

                                <Route render={() => <div>404 not found</div>} path='*'/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </AuthUserProfileContext.Provider>
        )
    }
}


const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    authUserProfile: state.auth.authUserProfile
});

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {
        initializeApp
    })
)(App);

const SocialNetworkApp = () => {
    //use BrowserRouter for hosting; if github page hosting - use HashRouter
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
};

export default SocialNetworkApp;
