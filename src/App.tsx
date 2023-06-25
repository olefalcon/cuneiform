import React, { useReducer } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import {Main} from './pages/main/main';
import {Register} from './pages/register';
import {Login} from './pages/login';
import {NavbarComponent} from './components/navbar';


function App() {

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
