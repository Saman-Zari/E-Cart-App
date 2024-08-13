import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { items } = location.state || {};
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  if (!items || items.length === 0) {
    return (
      <div className="container my-5 text-center">No items to checkout.</div>
    );
  }

  // Calculate the total amount from items
  const totalAmount = items.reduce((total, item) => {
    // Ensure item.price is treated as a number
    const price = parseFloat(item.price) || 0;
    return total + price;
  }, 0);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log("Order placed:", { shippingInfo, paymentMethod, items });
  };

  return (
    <div className="container my-5">
      <h1>Checkout</h1>
      <div className="row">
        <div className="col-lg-8">
          <h3>Order Summary</h3>
          <div className="row">
            {items.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 my-3 text-center">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={item.imgSrc}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <button className="btn btn-primary mx-3">
                      {item.price} Rs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center my-3">
            <h3>Total Amount: {totalAmount.toFixed(2)} Rs</h3>
          </div>
        </div>

        <div className="col-lg-4">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">
                Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={shippingInfo.country}
                onChange={handleShippingChange}
                required
              />
            </div>

            <h3>Payment Method</h3>
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="creditCard"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="creditCard">
                  Credit Card
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="bankTransfer"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={handlePaymentChange}
                />
                <label className="form-check-label" htmlFor="bankTransfer">
                  Bank Transfer
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
