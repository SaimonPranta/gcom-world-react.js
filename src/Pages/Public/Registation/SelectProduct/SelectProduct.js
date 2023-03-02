import React from "react";
import { Link } from "react-router-dom";
import "./SelectProduct.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const SelectProduct = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);

 

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
    <div className="select-packgae" onClick={() => handleAddToCart(product._id)}>
        <div className="card-img">
          <img
            //   src={
            //     product.img
            //       ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
            //       : ""
            //   }
            src={product.img}
            alt="img"
          />
        </div>
        <div className="porduct-details">
          <h6>{product.title}</h6>
          <div className="price">
            <p>
              <TbCurrencyTaka />
              {Math.floor(
                product.price
              )}
            </p>
          </div>
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
    </div>
  );
};

export default SelectProduct;
