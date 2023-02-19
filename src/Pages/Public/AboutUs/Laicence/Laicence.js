import React from "react";
import "./Laicence.css";
import { CgFileDocument } from "react-icons/cg";
const certificate_img =
  "data:image/jpeg;base64,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";

const Laicence = () => {
  return (
    <section className="laicence text-white mb-4 container-lg">
      <div className="mx-4 sub-laicence  p-3 p-md-5 ">
        <h5>Our All Laicence</h5>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
        <div>
          <h6>
            <CgFileDocument /> Laicence Name
          </h6>
          <img src={certificate_img} alt="img" />
        </div>
      </div>
    </section>
  );
};

export default Laicence;