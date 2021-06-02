import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {UsersPage} from "./components/Users/UsersPage";
import {Login} from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {StateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import UserProfileContainer from "./components/Profile/UserProfileContainer";
import {UserProfileType} from "./types/types";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const MyProfileContainer = React.lazy(() => import("./components/Profile/MyProfileContainer"));

const DialogsContainerSuspended = withSuspense(DialogsContainer)
const MyProfileContainerSuspended = withSuspense(MyProfileContainer)

export const AuthUserProfileContext = React.createContext({} as UserProfileType);

type AppProps = ReturnType<typeof mapStateToProps> & {
    initializeApp: () => void
}

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandedErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandedErrors)
    }

    catchAllUnhandedErrors = (e: PromiseRejectionEvent) => {
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
                                    () => <DialogsContainerSuspended/>
                                } path='/dialogs'/>

                                <Route exact render={
                                    () => <MyProfileContainerSuspended/>
                                } path='/profile'/>


                                <Route exact render={() =>
                                    <UsersPage/>
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


const mapStateToProps = (state: StateType) => ({
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    authUserProfile: state.auth.authUserProfile
});

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {
        initializeApp
    }),
)(App);

const SocialNetworkApp: React.FC = () => {
    //use BrowserRouter for hosting; if github page hosting - use HashRouter
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
};

export default SocialNetworkApp;
