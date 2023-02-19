import React from "react";
import "./ProductCart.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
const ProductCart = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);

  useEffect(() => {
    const array = [];
    const emptyArray = [];
    for (let i = 1; i <= product.rating; i++) {
      array.push(i);
      setStartArray(array);
    }
    for (let i = 1; i <= 5 - product.rating; i++) {
      emptyArray.push(i);
      setHalfStartArray(emptyArray);
    }
  }, []);

  const handleAddToCart = (productID) => {
    if (localStorage.getItem("cartArray") == null) {
      const array = [
        {
          id: productID,
          quantity: 1,
        },
      ];
      localStorage.setItem("cartArray", JSON.stringify(array));
    } else {
      const cartArray = JSON.parse(localStorage.getItem("cartArray"));
      const isAlreadyExistist = cartArray.find(
        (pdInfo) => pdInfo.id == productID
      );
      const newCartArray = cartArray.map((info) => {
        if (info.id == productID) {
          info["quantity"] = info.quantity + 1;
        }
        return info;
      });
      if (!isAlreadyExistist) {
        newCartArray.push({
          id: productID,
          quantity: 1,
        });
      }
      localStorage.setItem("cartArray", JSON.stringify(newCartArray));
    }
  };

  return (
    <div className="product-cart" onClick={() => handleAddToCart(product._id)}>
      <div className="discount-parcent">
        <p>{product.discount}%</p>
      </div>
      <Link to={`/product/${product._id}`}>
        <div className="card-img">
          <img
            //   src={
            //     product.img
            //       ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
            //       : ""
            //   }
            src={product.img}
            alt=""
          />
        </div>
        <div className="porduct-details">
          <h6>{product.title}</h6>
          <p className="price">
            <TbCurrencyTaka />
            {Math.floor(product.price)}
          </p>
          <div className="old-price">
            <p>
              <TbCurrencyTaka />
              {Math.floor(
                product.price - product.price * (product.discount / 100)
              )}
            </p>
          </div>
          <p className="point">
            Point: {Math.floor(Number(product.price) / 12)}
          </p>

          <div>
            {starArray.map((ele) => {
              return <AiFillStar />;
            })}
            {halfStarArray.map((ele) => {
              return <AiOutlineStar />;
            })}
          </div>
          <div
            class="btn-group mt-md-3 d-grid  d-md-flex"
            role="group"
            aria-label="Basic mixed styles example"
          ></div>
        </div>
      </Link>
      <div className="product-btn">
        <button>
          <BsCart3 />
          <Link>Buy Now</Link>
        </button>

        <button className="add-to-tart">
          <MdOutlineAddShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
