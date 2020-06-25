import React from 'react';
import './App.scss';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

const App = () => {
    return (
        <div className='appWrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='contentContainer'>
                <Route render={() =>
                    <DialogsContainer/>
                } path='/dialogs'/>

                <Route render={() =>
                    <ProfileContainer/>
                } path='/profile/:userId?'/>

                <Route render={() =>
                    <UsersContainer/>
                } path='/users'/>

                <Route render={() =>
                    <Login/>
                } path='/login'/>

                <Route render={() => <News/>} path='/news'/>
                <Route render={() => <Music/>} path='/music'/>
                <Route render={() => <Settings/>} path='/settings'/>
            </div>
        </div>
    );
};

export default App;
