import './App.css';
import React, {SyntheticEvent, useState} from 'react';
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



function App() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    (
        async () => {
            const response = await fetch('http://localhost:80/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });

            const content = await response.json();

            setId(content.id)
            setName(content.name);
        }
    )();
},[]);
  return (
    <div className="App">
      <BrowserRouter>
                <Navbar name={name} setName={setName}/>

                <main className="form-signin">
                    <Route path="/login" component={Login}/>
                    <Route path="/instruments" component={Instruments}/>
                    <Route path="/instrumentprofile" component={InstrumentProfile}/>
                    <Route path="/reservar" component={() => <Book id={id} name={name}/>}/>
                    <Route path="/dashboard" component={() => <Dashboard name={name}/>}/>
                    <Route path="/upload" component={() => <UploadInstruments id={id}/>}/>
                    <Route path="/chat" component={() => <Chat id={id}/>}/>
                    
                </main>
            </BrowserRouter>
      
    </div>
  );
}

export default App;
