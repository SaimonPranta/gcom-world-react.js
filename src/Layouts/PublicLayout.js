import React from "react";
import Footer from "../Shades/Footer/Footer";
import Header from "../Shades/Header/Header";

const PublicLayout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default PublicLayout;
