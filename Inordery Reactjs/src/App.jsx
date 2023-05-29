import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import Menu from './components/menu';
import React, { useState } from 'react';
// import Categories from './components/categories';
// import Navbar from './components/navbar'
import './styles/warning.css'
// import Cart from './components/cart.jsx'
import Adminlogin from './components/admin.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/homepage';
import Chef from './components/chef.jsx';

function App() {

  return (
    <React.Fragment>
      {/* {
        orderisdone ? <div className='alert alert-success'>Your order with id : {customerid} is Ready !!!</div> : null
      } */}
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/chef" element={<Chef />} />
        </Routes>
      </Router>
    </React.Fragment>

  );
}

export default App;
