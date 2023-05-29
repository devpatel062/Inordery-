import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './menu';
import Categories from './categories';
import '../styles/warning.css'
import items from './data'
import { useEffect, useState } from 'react';
import Addrecipe from './addrecipe';
import Nav from './navbar';
import {  useNavigate } from "react-router-dom";

const allcategories = ['all', ...new Set(items.map((item) => item.category))]

export const Adminlogin = () => {

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch("http://localhost:3001/mysite/menu/viewmenu", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            }) // fetch data from the server
            const data = await response.json()
            console.log(data)
            setMenuItems(data.data)

        }
        fetchdata();
    }, []);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setcategories] = useState(allcategories);
    const [deleted, setDeleted] = useState(false);

    const filterItems = (category) => {
        if (category === 'all') {
            return setMenuItems(items);
        }
        const newItems = items.filter((item) => item.category === category)
        return setMenuItems(newItems)

    }
    
    const handledelete = async (id) => {
        console.log(id)
        const response = await fetch(`http://localhost:3001/mysite/menu/deletemenu/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        setDeleted(true)
    }

    setTimeout(()=>{
        setDeleted(false)
    },2000)


    const navigate = useNavigate();

    const Handlenavigate = () => {

        navigate("/");
    }

    return (
        <div> 
            {
                deleted && <div className="warning" role="alert">
                    Deleted Successfully
                </div>
            }
            <button className="btn btn-primary" style={{margin:20}} onClick={()=>Handlenavigate()} >Back</button>
            <Addrecipe />
            <h2 className='text-center py-5'>Our Menu</h2>

            <Categories filterItems={filterItems} categories={categories} />

            <Menu items={menuItems} handleclick={handledelete} crud={true}/>
        </div>
    )
}

export default Adminlogin