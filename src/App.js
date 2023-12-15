// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomePage from './pages/HomePage';
import GenerateCodes from './pages/GenerateCodes';
import AuthorizeCodes from './pages/AuthorizeCodes';
import Administration from './pages/Administration';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/generarcodigos" element={<GenerateCodes />} />
          <Route path="/autorizarcodigos" element={<AuthorizeCodes />} />
          <Route path="/administracion" element={<Administration />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;