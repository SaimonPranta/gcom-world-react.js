import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayout from "../Layouts/HeaderLayout";
import PublicLayout from "../Layouts/PublicLayout";
import AboutUs from "../Pages/Public/AboutUs/AboutUs";
import Home from "../Pages/Public/Home/Home";
import Registation from "../Pages/Public/Registation/Registation";
import Login from "../Pages/Public/Login/Login";



const Routess = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout children={<Home />} />} />
          <Route
            path="/about_us"
            element={<PublicLayout children={<AboutUs />} />}
          />
          <Route
          path="/registaion"
            element={<HeaderLayout children={<Registation />} />}
          />
          <Route
            path="/login"
            element={<HeaderLayout children={<Login/>} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routess;
