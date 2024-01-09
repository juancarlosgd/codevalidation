// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomePage from './pages/HomePage/HomePage';
import GenerateCodes from './pages/GenerateCodes/GenerateCodes';
import AuthorizeCodes from './pages/AuthorizeCodes/AuthorizeCodes';
import Administration from './pages/Administration/Administration';
import SiteNav from './components/common/SiteNav';
import SiteFooter from './components/common/SiteFooter';
import Login from './pages/Auth/Login'

function App() {
  return (
    <RecoilRoot>
      <SiteNav />
      <Router>
        <Routes>
          <Route path="/generarcodigos" element={<GenerateCodes />} />
          <Route path="/autorizarcodigos" element={<AuthorizeCodes />} />
          <Route path="/administracion" element={<Administration />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <SiteFooter />
    </RecoilRoot>
  );
}

export default App;