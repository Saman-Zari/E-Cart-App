import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    console.log("Buy Now clicked for:", product);
    navigate("/checkout", { state: { items: [product] } });
  };

  const handleCheckout = () => {
    console.log("Checkout clicked");
    navigate("/checkout", { state: { items: cart } });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <>
      <div className="container my-5" style={{ width: "100%" }}>
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product) => (
            <div
              key={product.id}
              className="card mb-3 my-5"
              style={{ width: "100%" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.imgSrc}
                    className="img-fluid rounded-start"
                    alt={product.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">
                      {product.price} Rs
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="btn btn-warning"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length !== 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={handleCheckout} className="btn btn-warning mx-5">
            Checkout
          </button>
          <button onClick={handleClearCart} className="btn btn-danger">
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
