import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
export default function Item({ id, image, name, old_price, priceAfter }) {
    const handleAddToCart = () => {

        let cart = JSON.parse(sessionStorage.getItem("cart")) || [];


        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {

            existingItem.qty += 1;
        } else {

            cart.push({
                id,
                name,
                image,
                old_price,
                priceAfter,
                qty: 1
            });
        }


        sessionStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        Swal.fire({
  position: "center",
  icon: "success",
  title: `${name} added to cart successfully`,
  showConfirmButton: false,
  timer: 1500
});
    };

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
            setCartCount(savedCart.length);
        };

        updateCartCount();


        window.addEventListener("cartUpdated", updateCartCount);

        return () => window.removeEventListener("cartUpdated", updateCartCount);
    }, []);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img
                src={image}
                className="card-img-top"
                alt={name}
                style={{ objectFit: "cover", height: "200px" }}
            />

            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>

                <div>
                    <span className="fw-bold fs-5 me-2 text-success">${priceAfter}</span>
                    <span className="text-muted text-decoration-line-through">${old_price}</span>
                </div>


                <button
                    className="btn btn-warning mt-3"
                    onClick={handleAddToCart}
                ><i className="fa-solid fa-cart-shopping me-2 text-white"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
