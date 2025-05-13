import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Builder from './pages/Builder';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;