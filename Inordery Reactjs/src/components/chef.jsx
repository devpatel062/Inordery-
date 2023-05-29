import React from 'react'
import { useEffect, useState } from 'react'
// import from '../s/'

const Chef = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch("http://localhost:3001/mysite/orders/order/pending", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data)
            // console.log("middle")
            // console.log({data:data})
            setOrders(data.data)
        }
        fetchdata();
    }, [])

    const orderdone = async (id) => {
        console.log("reach till app.jsx ")
        console.log(id)
        const response = await fetch(`http://localhost:3001/mysite/orders/order/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ispending: false }),
        })
        const data = await response.json()
        console.log(data.data)
        setOrders(null);
    }

    return (
        <main className="product-space">
            <h1 className="orderno">{orders.length}</h1>
            <div className="container">
                <div className="row">
                
                    {orders?.map((Items) => {
                        const { _id, username, phone, ispending, items, date } = Items;
                        return (
                            <>

                                

                                <div key={_id} className="col-md-6">
                                    <article className="main-div">

                                        <div className="content">
                                            <div className="title">
                                                <h4>Name:{username}</h4>
                                                <h6>Phone:{phone}</h6>
                                            </div>
                                            <p>{date}</p>

                                            {
                                                items.map((item) => {
                                                    const { _id, title, img, price, amount } = item;
                                                    return (
                                                        <div className="cart_box" key={_id}>
                                                            <div className="cart_img">
                                                                <img src={img} alt="" />
                                                                <p>{title}</p>
                                                            </div>

                                                            <div className="cart_price">
                                                                <p>price</p>
                                                                <p>{price}</p>
                                                            </div>

                                                            <div className="cart_amount">
                                                                <p>Qty.</p>
                                                                <p>{amount}</p>
                                                            </div>

                                                            <div className="cart_total">
                                                                <p>Total</p>
                                                                <p>{price * amount}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }


                                            {
                                                ispending ?
                                                    <div style={{ marginTop: "20px" }}>
                                                        <button className="btn btn-warning" onClick={() => orderdone(_id)}>Order is Done</button>
                                                    </div>
                                                    :
                                                    <div style={{ marginTop: "20px" }}>
                                                        <button className="btn btn-success" >Done</button>
                                                    </div>
                                            }

                                        </div>
                                    </article>
                                </div>
                                {/* } */}
                            </>
                        );
                    })}
                </div>
            </div>
        </main>
    )
}

export default Chef