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
import Tilaus from './Pages/Tilaus';
import { useState } from 'react';

 

function App() {

  const [items, setItems] = useState([])

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const getTotal = () => {
    if (!items) {
      return 0;
    }
    return items.reduce((total, item) => total + item.price, 0);
  };


  return (
    <Router>
      <Header setItems={setItems} items={items} removeItem={removeItem} getTotal={getTotal} />
      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='/Tuotteet' element={<Tuotteet setItems={setItems} items={items} removeItem={removeItem} getTotal={getTotal}/>} />
        <Route path='/tietoa-meista' element={<AboutUs />} />
        <Route path='/PrivacyStatement' element={<PrivacyStatement />} />
        <Route path='/ota-yhteytta' element={<ContactUs />} />
        <Route path='/tuotteet/:tuoteID' element={<ProductInformation setItems={setItems} items={items} removeItem={removeItem} getTotal={getTotal}/>} />
        <Route path='/tilaus' element={<Tilaus/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
