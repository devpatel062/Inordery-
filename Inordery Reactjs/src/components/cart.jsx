import React,{useState} from 'react';
import { useEffect } from 'react';
import "../styles/cart.css";

const Cart = ({cart, setCart, handleChange}) => {
    const [prices, setPrices] = useState(0);
    const [show,setShow] = useState(false);
    const [user, setUser] = useState({ username:"" , phone : "", items:cart})

    const onChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handlePrice = ()=>{
        let ans = 0;
        cart.map((item)=>(
            ans += item.amount * item.price
        ))
        setPrices(ans);
    }

    const handleRemove = (id) =>{
        console.log(id)
        const arr = cart.filter((item)=>item._id !== id);
        setCart(arr);
        // handlePrice();
    }

    useEffect(()=>{
        handlePrice();
    })

    const takedetails = async () => {
        setShow(true);

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user)

        const response = await fetch("http://localhost:3001/mysite/orders/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
        const data = await response.json()
        console.log(data)


        setShow(false)
        
    }

  return (
    <>
    <article>
        {
            cart?.map((item)=>{
                const { _id, title, img, price , amount } = item;
                return(
                <div className="cart_box" key={_id}>
                    <div className="cart_img">
                        <img src={img} alt=""/>
                        <p>{title}</p>
                    </div>
                    <div>
                        <button onClick={()=>handleChange(item, +1)}> + </button>
                        <button>{amount}</button>
                        <button onClick={()=>handleChange(item, -1)}> - </button>
                    </div>
                    <div>
                        <span>{price}</span>
                        <button onClick={()=>handleRemove(_id)} >Remove</button>
                    </div>
                </div>
            )})}
        <div className='total'>
            <span>Total Price of your Cart</span>
            <span>Rs : {prices}</span>
        </div>
        <button className="btn btn-info" onClick={takedetails}>Place Order</button>
    </article>
    {
        show ?
        <form  className="form" onSubmit={onSubmit}>
                <h1>User Details</h1>
                <div className="input-style"> <input type="text" className="form-control mt-1" value={user.username} placeholder="username" name="username" onChange={onChangeUser} required/></div>
                <div className="input-style"><input type="text" className="form-control mt-1" value={user.phone} placeholder="phone" name="phone" onChange={onChangeUser} required/></div>
    
                <div className="button"><button className="btn btn-primary" type="submit">submit</button></div>
            </form>
            : null
    }
    </>
  )
}

export default Cart