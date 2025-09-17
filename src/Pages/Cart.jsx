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
    window.dispatchEvent(new Event("cartUpdated"));
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
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will clear your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCart([]);
        Swal.fire({
          title: "Cleared!",
          text: "Your cart is now empty.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
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
    const receiptHtml = `
      <div class="text-start" style="max-height:400px; overflow:auto;">
        <ul class="list-unstyled">
          ${cart
            .map((item) => {
              const imgSrc =
                typeof item.image === "string" && item.image
                  ? item.image
                  : "https://via.placeholder.com/40";
              const priceEach = Number(item.priceAfter) || 0;
              const lineTotal = (priceEach * Number(item.qty || 0)).toFixed(2);
              return `
                <li class="d-flex align-items-center mb-2">
                  <img src="${imgSrc}" alt="${item.name}" class="rounded me-2" style="width:40px; height:40px; object-fit:cover;" />
                  <div>
                    <div class="fw-bold">${item.name}</div>
                    <small class="text-muted">
                      Qty: ${item.qty} × $${priceEach.toFixed(2)} = $${lineTotal}
                    </small>
                  </div>
                </li>
              `;
            })
            .join("")}
        </ul>
        <hr />
        <h5>Total: $${totalPrice.toFixed(2)}</h5>
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
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center fw-bold">Your cart is empty</div>
      ) : (
        <>
          <div className="list-group mb-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="rounded me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">
                      ${Number(item.priceAfter).toFixed(2)} × {item.qty} ={" "}
                      <strong>
                        ${(Number(item.priceAfter) * Number(item.qty)).toFixed(2)}
                      </strong>
                    </small>
                  </div>
                </div>

                {/* Increment / Decrement  */}
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => decrementQty(item.id)}
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>
                  <span className="px-2">{item.qty}</span>
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
          </div>

          {/* Footer */}
          <div className="card p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Total: ${totalPrice.toFixed(2)}</h5>
              <div>
                <button className="btn btn-outline-danger me-2" onClick={clearCart}>
                  <i className="fa-solid fa-trash-can me-1"></i>Clear Cart
                </button>
                <button className="btn btn-success" onClick={Checkout}>
                  <i className="fa-solid fa-credit-card me-1"></i>Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
