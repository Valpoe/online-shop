import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Etusivu from './Pages/Etusivu';
import Tuotteet from './Pages/Tuotteet';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PrivacyStatement from './Pages/PrivacyStatement';
import ProductInformation from './Pages/ProductInformation';
import Tilaus from './Pages/Tilaus';
import OrderManagement from './Pages/OrderManagement';
import AccountManagement from './Pages/AccountManagement';

function App() {

  const [items, setItems] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)
  const [asiakasTiedot, setAsiakasTiedot] = useState(null)


  // Hakee tuotteiden määrän
  const getItemsCount = () => {
    if (!items) {
      return 0;
    }
    return items.length;
  };

  // Hakee ostoskorin tuotteiden yhteishinnan
  const getTotal = () => {
    if (!items) {
      return 0;
    }
    return items.reduce((total, item) => total + item.hinta, 0);
  };

  // Hakee ostoskorin tuotteiden määrän
  const countItem = (itemID) => {
    let count = 0;
    items.forEach((item) => {
      if (item.itemID === itemID) { count++; }
    });
    return count;
  };

  return (
    <Router>
      <Header setItems={setItems} items={items} getTotal={getTotal} getItemsCount={getItemsCount} countItem={countItem} user={user} setUserID={setUserID} userID={userID} setUser={setUser} setAsiakasTiedot={setAsiakasTiedot} asiakasTiedot={asiakasTiedot} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
      <Routes>
        <Route path='/' element={<Etusivu />} />
        <Route path='/Tuotteet' element={<Tuotteet setItems={setItems} items={items} getTotal={getTotal} countItem={countItem}/>} />
        <Route path='/tietoa-meista' element={<AboutUs />} />
        <Route path='/PrivacyStatement' element={<PrivacyStatement />} />
        <Route path='/ota-yhteytta' element={<ContactUs />} />
        <Route path='/tuotteet/:tuoteID' element={<ProductInformation setItems={setItems} items={items} getTotal={getTotal} countItem={countItem}/>} />
        <Route path='/tilaus' element={<Tilaus items={items} setItems={setItems} userID={userID} setUserID={setUserID} user={user} setUser={setUser} asiakasTiedot={asiakasTiedot} setAsiakasTiedot={setAsiakasTiedot} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/> } />
        <Route path='/tilaushallinta' element={<OrderManagement items={items} setItems={setItems}/> } />
        <Route path='/tilinhallinta' element={<AccountManagement items={items} setItems={setItems} user={user} setUserID={setUserID} userID={userID} setUser={setUser} asiakasTiedot={asiakasTiedot}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
