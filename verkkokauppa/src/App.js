import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Etusivu from './Pages/Etusivu';
import Tuotteet from './Pages/Tuotteet';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PrivacyStatement from './Pages/PrivacyStatement';
import ProductInformation from './Pages/ProductInformation';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='/Tuotteet' element={<Tuotteet />} />
        <Route path='/tietoa-meista' element={<AboutUs />} />
        <Route path='/PrivacyStatement' element={<PrivacyStatement />} />
        <Route path='/ota-yhteytta' element={<ContactUs />} />
        <Route path='/tuotteet/:tuoteID' element={<ProductInformation/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
