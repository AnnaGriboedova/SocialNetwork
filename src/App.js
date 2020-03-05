import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = () => {
    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className='contentContainer'>
                <Route render={() =>
                    <DialogsContainer/>
                } path='/dialogs'/>

                <Route render={() =>
                    <Profile/>
                } path='/profile'/>

                <Route render={() =>
                    <UsersContainer/>
                } path='/users'/>

                <Route render={() => <News/>} path='/news'/>
                <Route render={() => <Music/>} path='/music'/>
                <Route render={() => <Settings/>} path='/settings'/>
            </div>
        </div>
    );
};

export default App;
