import React from 'react';
import '../styles/navbar.css';
import {  useNavigate } from "react-router-dom";

const Navbar = ({size, setShow}) => {

    const navigate = useNavigate();

    const Handlenavigate = () => {

        navigate("/adminlogin");
    }

  return (
    
    <nav>
        <div className="nav_box">
            <span className="my_shop" onClick={()=>setShow(true)}>
                Inordery
            </span>
            <div className="cart" onClick={()=>setShow(false)}>
                <span>
                    <i className="fas fa-cart-plus">Order</i>
                </span>
                <span>{size}</span>
            </div>
            <div>
                <button className="admin" onClick={()=>Handlenavigate()} to='/adminlogin'>Manage Menu</button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar