import React, { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);
    const updateCart = (newCart) => {
        setCart(newCart);
        sessionStorage.setItem("cart", JSON.stringify(newCart));
        const event = new Event("cartUpdated");
        window.dispatchEvent(event)
    };

    const removeItem = (id) => {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
    };
    const clearCart = () => {
        updateCart([]);
    };

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.priceAfter * item.qty,
        0
    );

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                        >
                            <div className="d-flex align-items-center">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: "50px", marginRight: "10px" }}
                                />
                                <div>
                                    <h6 className="mb-0">{item.name}</h6>
                                    <small>
                                        Price: ${item.priceAfter} × {item.qty} ={" "}
                                        <strong>${item.priceAfter * item.qty}</strong>
                                    </small>
                                </div>
                            </div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeItem(item.id)}
                            >
                                <i className="fa-solid fa-trash"></i>

                            </button>
                        </div>
                    ))}


                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h5>Total: ${totalPrice}</h5>
                        <button className="btn btn-warning" onClick={clearCart}>
                            <i className="fa-solid fa-trash-can me-2"></i>Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
