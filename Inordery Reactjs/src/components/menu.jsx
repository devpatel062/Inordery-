import React from "react";

const Menu = ({ items, handleclick, crud }) => {

    return (
        <main className="product-space">
            <div className="container">
                <div className="row">
                    {items.map((menuItems) => {
                        const { _id, title, img, desc, price } = menuItems;
                        return (
                            <div key={_id} className="col-md-6">
                                <article className="main-div">
                                    <div className="main-img">
                                        <img src={img} alt="" />
                                    </div>
                                    <div className="content">
                                        <div className="title">
                                            <h4>{title}</h4>
                                            <h6>Rs. {price}</h6>
                                        </div>
                                        <p>{desc}</p>
                                        {
                                            crud ?
                                                <div>
                                                    <button className="btn btn-primary" onClick={() => handleclick(_id)}>Delete</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="btn btn-primary" onClick={() => handleclick(menuItems)}>Add to Cart</button>
                                                </div>
                                        }

                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default Menu;
