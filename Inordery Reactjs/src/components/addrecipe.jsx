import React, { useState } from 'react'
import "../styles/addrecipe.css"

const Addrecipe = () => {

    const [show, setShow] = useState(false);

    const [user, setUser] = useState({ title: "", price: "", desc: "", img: "", category: "" })

    const onChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user)

        const response = await fetch("http://localhost:3001/mysite/menu/addmenu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        })
        const data = await response.json()
        console.log(data)


        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)

    }
    return (
        <>
            {
                show ? <div className="alert alert-success" role="alert">
                    Recipe Added Successfully</div> 
                     : null

            }
            <form onSubmit={onSubmit} className="form">
                <h1>Add Dishes</h1>
                <div className="input-style"> <input type="text" className="form-control mt-1" value={user.price} placeholder="Price" name="price" onChange={onChangeUser} required /></div>
                <div className="input-style"><input type="text" className="form-control mt-1" value={user.title} placeholder="Name" name="title" onChange={onChangeUser} required/></div>
                <div className="input-style"><input type="text" className="form-control mt-1" value={user.desc} placeholder="Description" name="desc" onChange={onChangeUser} required/></div>
                <div className="input-style"><input type="text" className="form-control mt-1" value={user.img} name="img" placeholder="Image" onChange={onChangeUser} required/></div>
                <div className="input-style"><input type="text" className="form-control mt-1" value={user.category} name="category" placeholder="Category" onChange={onChangeUser} required/></div>
                <div className="button"><button className="btn btn-primary" type="submit">submit</button></div>
            </form>

        </>
    )
}

export default Addrecipe