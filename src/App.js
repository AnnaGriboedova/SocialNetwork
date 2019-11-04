import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

const App = (props) => {
  return (
      <BrowserRouter>
        <div className='appWrapper'>
          <Header/>
          <Navbar state={props.state.navbar} />
          <div className='contentContainer'>
            <Route render={() =>
                <Dialogs state={props.state.dialogsPage}/>
            } path='/dialogs' />

            <Route render={() =>
                <Profile state={props.state.profilePage} />
            } path='/profile' />

            <Route render={() => <News/>} path='/news'/>
            <Route render={() => <Music/>} path='/music'/>
            <Route render={() => <Settings/>} path='/settings'/>
          </div>
        </div>
      </BrowserRouter>
  );
};

export default App;
