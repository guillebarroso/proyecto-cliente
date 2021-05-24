import './App.css';
import axios from 'axios'
import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./pages/Login";
import Instruments from "./pages/Instruments";
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import InstrumentProfile from './pages/InstrumentProfile';
import UploadInstruments from './pages/UploadInstruments';
import Book from './pages/Book';
import Chat from './pages/Chat';
import Images from './pages/Images';
import Profile from './pages/Profile';
import NavItem from './components/NavItem';
import DropdownMenu from './components/DropdownMenu';


function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [other_user, setOther_user] = useState()
  
  useEffect(() => {
    (      
      async () => {
          await axios({
            method: 'get',
            url: 'http://localhost:80/api/user',
            withCredentials: true,
          }).then(response => {
            setId(response.data.id);
            setName(response.data.name);
          })
          .catch(function (error) {
            console.log(error.response.status)}); // 401        
      }
    )();
  },[]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Navbar name={name} setName={setName}>
            <NavItem>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </Navbar>
        </header>
        <main>    
          <Route path="/" component={() => <Dashboard name={name}></Dashboard>}/> 
          <Route path="/login" component={Login}/>
          <Route path="/instruments" component={() => <Instruments setOther_user={setOther_user}/>}/>
          <Route path="/reservar" component={() => <Book id={id} name={name}/>}/>          
          <Route path="/chat" component={() => <Chat id={id} other_user={other_user}/>}/>
          <Route path="/upload" component={() => <UploadInstruments id={id}/>}/>
          <Route path="/instrument/profile" component={() => <InstrumentProfile id={id} other_user={other_user}/>}/>
          <Route path="/instrument/:instrumentid" component={() => <InstrumentProfile id={id}/>}/>
          <Route path="/images/:instrumentid" component={() => <Images id={id}/>}/>
          <Route path="/user/:userid" component={() => <Profile id={id}/>}/>
                 
        </main>
      </BrowserRouter>  
    </div>
  );
}

export default App;
