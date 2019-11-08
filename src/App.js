import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className='appWrapper'>
                <Header/>
                <Navbar state={props.state.navbar}/>
                <div className='contentContainer'>
                    <Route render={() =>
                        <DialogsContainer store={props.store}/>
                    } path='/dialogs'/>

                    <Route render={() =>
                        <Profile store={props.store}/>
                    } path='/profile'/>

                    <Route render={() => <News/>} path='/news'/>
                    <Route render={() => <Music/>} path='/music'/>
                    <Route render={() => <Settings/>} path='/settings'/>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
