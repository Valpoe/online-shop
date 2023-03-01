import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Etusivu from './Pages/Etusivu';
import Tuotteet from './Pages/Tuotteet';
import AboutUs from './Pages/AboutUs';
import Ostoskori from './Pages/Ostoskori';
import PrivacyStatement from './Pages/PrivacyStatement';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='/Tuotteet' element={<Tuotteet />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Ostoskori' element={<Ostoskori />} />
        <Route path='/PrivacyStatement' element={<PrivacyStatement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
