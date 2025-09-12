import React from 'react'

export default function Item({ image, name, old_price, priceAfter }) {

    // const discountAmount = (price * discount) / 100;
    // const priceAfter = +(price - discountAmount).toFixed(2);

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
            </div>
        </div>
    );
}
