import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    window.dispatchEvent(event);
  };

  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newCart = cart.filter((item) => item.id !== id);
        updateCart(newCart);
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
        });
      }
    });
  };

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCart([]);
        Swal.fire({
          title: "Deleted!",
          text: "Your cart has been deleted.",
          showConfirmButton: false,
          timer: 1500,
          icon: "success",
        });
      }
    });
  };

  const incrementQty = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(newCart);
  };

  const decrementQty = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    updateCart(newCart);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.priceAfter) * Number(item.qty),
    0
  );

  const Checkout = () => {
    if (cart.length === 0) {
      Swal.fire("Oops!", "Your cart is empty!", "info");
      return;
    }

    // Build receipt HTML — includes images (or placeholder) and price formatting
    const receiptHtml = `
      <div style="text-align:left; max-height:400px; overflow:auto;">
        <ul style="list-style:none; padding:0; margin:0;">
          ${cart
            .map((item) => {
              const imgSrc =
                typeof item.image === "string" && item.image
                  ? item.image
                  : "https://via.placeholder.com/40";
              const priceEach = Number(item.priceAfter) || 0;
              const lineTotal = (priceEach * Number(item.qty || 0)).toFixed(2);
              return `
                <li style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                  <img src="${imgSrc}" alt="${item.name}" style="width:40px; height:40px; object-fit:cover; border-radius:6px;" />
                  <div>
                    <div style="font-weight:600;">${item.name}</div>
                    <div style="font-size:12px; color:#555;">
                      Qty: ${item.qty} × $${priceEach.toFixed(2)} = $${lineTotal}
                    </div>
                  </div>
                </li>
              `;
            })
            .join("")}
        </ul>
        <hr style="margin:10px 0;" />
        <h5 style="margin:0;">Total: $${totalPrice.toFixed(2)}</h5>
      </div>
    `;

    Swal.fire({
      title: "🧾 Receipt",
      html: receiptHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Pay",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCart([]);
        Swal.fire({
          title: "✅ Order Confirmed!",
          text: "Thank you for your purchase.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "❌ Payment Cancelled",
          text: "You can complete your order later.",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

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
                  src={item.image || "https://via.placeholder.com/50"}
                  alt={item.name}
                  style={{ width: "50px", marginRight: "10px", objectFit: "cover", borderRadius: 6 }}
                />
                <div>
                  <h6 className="mb-0">{item.name}</h6>
                  <small>
                    Price: ${Number(item.priceAfter).toFixed(2)} × {item.qty} ={" "}
                    <strong>${(Number(item.priceAfter) * Number(item.qty)).toFixed(2)}</strong>
                  </small>
                </div>
              </div>

              {/* Increment / Decrement Buttons */}
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => decrementQty(item.id)}
                  disabled={item.qty <= 1}
                >
                  -
                </button>
                <span style={{ minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => incrementQty(item.id)}
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={() => removeItem(item.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
            <div>
              <button className="btn btn-warning me-2" onClick={clearCart}>
                <i className="fa-solid fa-trash-can me-2"></i>Clear Cart
              </button>
              <button className="btn btn-success" onClick={Checkout}>
                <i className="fa-solid fa-credit-card me-2"></i>Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
