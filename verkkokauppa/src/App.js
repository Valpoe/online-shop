import React, { useEffect } from 'react';
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
import OrderManagement from './Pages/OrderManagement';
import AccountManagement from './Pages/AccountManagement';

function App() {

  
  const [items, setItems] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)


  //get items count
  const getItemsCount = () => {
    if (!items) {
      return 0;
    }
    return items.length;
  };

  const getTotal = () => {
    if (!items) {
      return 0;
    }
    return items.reduce((total, item) => total + item.hinta, 0);
  };

  const countItem = (itemID) => {
    let count = 0;
    items.forEach((item) => {
      if (item.itemID === itemID) { count++; }
    });
    return count;
  };

  return (
    <Router>
      <Header setItems={setItems} items={items} getTotal={getTotal} getItemsCount={getItemsCount} countItem={countItem} />
      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='/Tuotteet' element={<Tuotteet setItems={setItems} items={items} getTotal={getTotal} countItem={countItem}/>} />
        <Route path='/tietoa-meista' element={<AboutUs />} />
        <Route path='/PrivacyStatement' element={<PrivacyStatement />} />
        <Route path='/ota-yhteytta' element={<ContactUs />} />
        <Route path='/tuotteet/:tuoteID' element={<ProductInformation setItems={setItems} items={items} getTotal={getTotal} countItem={countItem}/>} />
        <Route path='/tilaus' element={<Tilaus items={items} setItems={setItems} userID={userID}/> } />
        <Route path='/tilaushallinta' element={<OrderManagement items={items} setItems={setItems}/> } />
        <Route path='/tilinhallinta' element={<AccountManagement items={items} setItems={setItems}/> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
