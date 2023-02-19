import React from "react";
import "./Home.css";
import Slider from "../../Public/Home/Slider/Slider";
import sideImg from "../../../Assets/Images/temp/slideImg.png";
import cartImgOne from "../../../Assets/Images/temp/21bc8d04-e3c0-4e42-a84f-097506424fb2.png";
import cartImgtwo from "../../../Assets/Images/temp/513df212-048b-4ed8-9e00-3db27164241f.png";
import { IoIosArrowForward } from "react-icons/io";
import FlashSaleCart from "../../../Shades/Carts/FlashSaleCart/FlashSaleCart";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import ProductCart from "../../../Shades/Carts/ProductCart/ProductCart";
import Service from "../../../Shades/Carts/Service/Service";

const Home = () => {
  const productArray = {
    img: "https://static-01.daraz.com.bd/p/8cadfceb410b84cb3dedd7c729ca0c0c.jpg",
    title: "mi a3 5inco display amulate fanale",
    price: 500,
    discount: 20,
    point: 20,
    rating: 3,
  };
  return (
    <section className="container mt-5">
      <section className="hero-section">
        <div className="inner-hero">
          <Slider />
        </div>
        <div className="right-section">
          <img src={sideImg} alt="img" />
          <img src={sideImg} alt="img" />
          <img src={sideImg} alt="img" />
        </div>
      </section>
      <section className="categories py-5">
        <div>
          <img src={cartImgOne} alt="img" />
          <p>Mart</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgtwo} alt="img" />
          <p>Fashion</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgOne} alt="img" />
          <p>Home $ Living</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgOne} alt="img" />
          <p>Mart</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgtwo} alt="img" />
          <p>Fashion</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgtwo} alt="img" />
          <p>Fashion</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgOne} alt="img" />
          <p>Home $ Living</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgOne} alt="img" />
          <p>Mart</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgtwo} alt="img" />
          <p>Fashion</p>
          <IoIosArrowForward />
        </div>
        <div>
          <img src={cartImgtwo} alt="img" />
          <p>Fashion</p>
          <IoIosArrowForward />
        </div>
      </section>
      <section className="flsh-sale">
        <div className="product-section-title">
          <h3>Flash Sale</h3>
        </div>
        <div className="inner-product-collection">
          <div className="count-section">
            <p className="on-sale-now">On Sale Now</p>
            <p className="ending">Ending in</p>
            <div className="count-box">
              <p>11</p>
              <p>16</p>
              <p>19</p>
            </div>
          </div>
          <div className="product-collection">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              // modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
              <SwiperSlide>
                <FlashSaleCart product={productArray} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
      <section className="my-5 product-collection">
        <div className="product-section-title">
          <h3>Products</h3>
        </div>
        <div className="inner-product-collection">
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
          <ProductCart product={productArray} />
        </div>
      </section>
      <section className="my-5 service-colloction">
        <div className="product-section-title">
          <h3>services</h3>
        </div>
        <div className="inner-service-colloction">
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
          <Service product={productArray} />
        </div>
      </section>
    </section>
  );
};

export default Home;
