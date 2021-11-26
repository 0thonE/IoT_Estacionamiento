import React/* , { useState, useContext } */ from 'react';
import './App.scss';

import { Routes, Route } from 'react-router-dom';
import PrivateRoute from "./state/PrivateRoute";

import NavBar from './components/NavBar';

//pages
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import Map from './pages/Map'
import MapCont from './pages/MapCont'


function App() {
  return (
    <div id="root-container">
      <NavBar />
      <Routes>
        <Route className="Map-route" exact path="/" element={<PrivateRoute><Map /></PrivateRoute>} />
        <Route className="Map-route" exact path="/shhh" element={<PrivateRoute users={['cont']}><MapCont /></PrivateRoute>} />

        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/" element={<NotFoundPage />} />

      </Routes>
    </div>
  );
}

export default App;
