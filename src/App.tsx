import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Main} from './pages/main/main';
import {Register} from './pages/register';
import {Login} from './pages/login';
import {NavbarComponent} from './components/navbar';

import { useState, createContext} from 'react';
import { boolean } from 'yargs';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="App">
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
