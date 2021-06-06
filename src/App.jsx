import './App.css';
import axios from 'axios'
import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Instruments from "./pages/Instruments";
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import InstrumentProfile from './pages/InstrumentProfile';
import UploadInstruments from './pages/UploadInstruments';
import Book from './pages/Book';
import Chat from './pages/Chat';
import Images from './pages/Images';
import NavItem from './components/NavItem';
import DropdownMenu from './components/DropdownMenu';
import Footer from './components/Footer';
import Users from './pages/Users';
import Profile from './pages/Profile';
import EditInstrument from './pages/EditInstrument';
import Search from './pages/Search';


function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
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
            setNickname(response.data.nickname);
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
              <DropdownMenu name={name} setName={setName}></DropdownMenu>
            </NavItem>
          </Navbar>
        </header>
        <Switch> 
          <Route path="/search/:param/:param2" component={() => <Search/>}/>       
          <Route path="/instrument/:instrumentid" component={() => <InstrumentProfile nickname={nickname} id={id}/>}/>
          <Route path="/images/:instrumentid" component={() => <Images id={id}/>}/>
          <Route path="/user/:userid" component={() => <Users id={id}/>}/>
          <Route path="/edit/:instrumentid" component={() => <EditInstrument/>}/>
          <Route path="/profile" component={() => <Profile nickname={nickname} id={id}/>}/>
          <Route path="/login" component={() => <Login name={name} setName={setName} />}/>
          <Route path="/instruments" component={() => <Instruments setOther_user={setOther_user}/>}/>
          <Route path="/reservar" component={() => <Book id={id} name={name}/>}/>          
          <Route path="/chat" component={() => <Chat id={id} other_user={other_user}/>}/>
          <Route path="/upload" component={() => <UploadInstruments id={id}/>}/>
          <Route path="/" component={() => <Dashboard name={name}></Dashboard>}/> 

        </Switch>
        <Footer></Footer>
      </BrowserRouter>  
    </div>
  );
}

export default App;
