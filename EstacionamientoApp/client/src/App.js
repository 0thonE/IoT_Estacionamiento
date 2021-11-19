import React/* , { useState } */ from 'react-router';
import './App.scss';

import { Routes, Route } from 'react-router-dom';

import ParkingLot from './components/ParkingLot';
import NavBar from './components/NavBar';

//pages
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';




let Map = () => {
  return (<div style={{ width: '800px', backgroundColor: 'red' }}><ParkingLot /> </div>)
}

function App() {
  return (
    <div id="root-container">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Map />} />

        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/" element={<NotFoundPage />} />

      </Routes>
    </div>
  );
}

export default App;
