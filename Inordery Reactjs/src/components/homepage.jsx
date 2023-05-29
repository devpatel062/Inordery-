import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';
import Menu from "./menu";
import React, { useEffect, useState } from "react";
import items from "./data";
import Categories from "./categories";
import Navbar from "./navbar";
import "../styles/warning.css";
import Cart from "./cart.jsx";
import "../styles/addrecipe.css";

// import Home from './components/homepage';

const allcategories = ["all", ...new Set(items.map((item) => item.category))];
function Homepage() {
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(
        "http://localhost:3001/mysite/menu/viewmenu",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // fetch data from the server
      const data = await response.json();
      console.log(data);
      setMenuItems(data.data);
      setTotal(data.data);
    };
    fetchdata();
  }, []);

  const [customerid, setcustomerid] = useState("");
  const [username, setUserName] = useState("");
  const [orderisdone, setOrderIsDone] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const popup = async () => {
      const response = await fetch(
        "http://localhost:3001/mysite/orders/order/completed",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("down");
      if (data.data.length > 0) {
        setResponse(true);
        setcustomerid(data.data[0]._id);
        setUserName(data.data[0].username);
        console.log(data.data);
      }
    };
    setTimeout(() => {
      popup();
    }, 4000);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse(false);
    }, 3000);
    setOrderIsDone(true);
    console.log(customerid);
    return () => clearTimeout(timer);
    // timer();
  }, [response]);

  const deleteobject = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:3001/mysite/orders/deleteorder/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      })
    const data = await response.json();
    console.log(data);
  }

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setcategories] = useState(allcategories);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);
  const [show, setShow] = useState(true);
  const [total, setTotal] = useState([]);

  const filterItems = (category) => {
    console.log(menuItems);
    if (category === "all") {
      return setMenuItems(total);
    }
    const newItems = menuItems.filter((item) => item.category === category);
    console.log(newItems);
    return setMenuItems(newItems);
  };

  if (orderisdone) {
    console.log("reached homepage");
    setTimeout(() => {
      setOrderIsDone(false);
      setTimeout(() => {
        deleteobject(customerid);
      }, 3000);
    }, 3000);
  }
  const handleclick = (item) => {
    let ispresent = false;
    cart.forEach((product) => {
      // eslint-disable-next-line eqeqeq
      if (item._id == product._id) ispresent = true;
    });
    if (ispresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 1500);
      return;
    }
    setCart([...cart, item]);
    console.log(item);
  };

  const handleChange = (item, d) => {
    console.log(item);
    console.log(d);
    let ind = -1;
    cart.forEach((data, index) => {
      if (data._id === item._id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };

  return (
    <React.Fragment>
      {orderisdone ? (
        <h3 className="form">
          {username}'s order with id : {customerid} is Ready !!!
        </h3>
      ) :
        <div className="container">
          <Navbar size={cart.length} setShow={setShow} />
          <div className="row">
            <div className="col-md-12">
              {show ? (
                <div>
                  <h2 className="text-center py-5">Our Menu</h2>

                  <Categories filterItems={filterItems} categories={categories} />
                  {/* <div className='container'>
                    <div className="row">
                      <div className="col-md-8 mx-auto">
                        <div className='category-tabs'>
                          {
                            categories.map((category, index) => {
                              return (

                                <button key={index} className='filterItems' onClick={() => filterItems(category)}>{category}</button>
                              )

                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <Menu
                    items={menuItems}
                    handleclick={handleclick}
                    crud={false}
                  />
                </div>
              ) : (
                <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
              )}
              {warning && <h3 className="warning">Item is already in cart</h3>}
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default Homepage;
