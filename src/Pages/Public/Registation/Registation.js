import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Registation.css";
import { ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import { useFormik } from "formik";
import { singUpSchema } from "../../../Schemas";
import { BiUserCircle } from "react-icons/bi";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import SelectProduct from "./SelectProduct/SelectProduct";
import { setCookie } from "../../../Hooks/cookies";

const initialFormValue = {
  fullName: "",
  fatherName: "",
  motherName: "",
  gender: "male",
  phoneNumber: "",
  userID: "",
  placementID: "",
  email: "",
  address: "",
  country: "Bangladesh",
  nid: "",
  referID: "",
  password: "",
  confirmPassword: "",
};

const Registation = () => {
    const [errorContainer, setErrorContainer] = useState({});
    const [valuesContainer, setValuesContainer] = useState({});
    const [condition, setCondition] = useState({
      stapOne: true
    });

  const [inputUser, setInputUser] = useState({});
  const [user, setUser] = useState({});
  const [placemantIDs, setPlacemantIDs] = useState([]);


  const [processing, setProcessing] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";
  const { referID } = useParams();
  const productArray = {
    img: "https://static-01.daraz.com.bd/p/8cadfceb410b84cb3dedd7c729ca0c0c.jpg",
    title: "mi a3 5inco display amulate fanale",
    price: 500,
    discount: 20,
    point: 20,
    rating: 3,
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialFormValue,
    validationSchema: singUpSchema,
    onSubmit: (values) => {
      // console.log(values);

      fetch(`http://localhost:8000/user/registation/data_verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.sucess) {
            setCondition({stapTwo: true})
            sucess("First Stap Done");
          }
          if (data?.failed) {
            failed(data.failed);
          }
        });
    },
  });

  useEffect(() => {
    setErrorContainer(errors);
  }, [errors]);
  useEffect(() => {
    setValuesContainer(values);
  }, [values]);

  const handlePlacementID = (e) => {
    const value = e.target.value;
    if (value) {
      fetch(`http://localhost:8000/public/get_placement_id/${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(handleChange);
          if (data.message) {
            errors.referID = data.message;
            setPlacemantIDs([]);
          }
          if (data.placementID) {
            setPlacemantIDs([]);
            values.placementID = data.placementID;
            console.log(values.placementID);
          } else {
            values.placementID = "";
          }
          if (data.data) {
            setPlacemantIDs(data.data);
            errors.referID = "";
          }
        });
    }
  };
  const handlePlacementInputID = (e) => {
    if (values.referID) {
      handleChange(e, "placementID");
      errors.placementID = "";
    } else {
      errors.placementID =
        "Sorry, you con't set placement ID before set Referral ID";
      values.placementID = "";
      console.log(errors);
    }
  };
  const handleSelectPlacementID = (value) => {
    values.placementID = value;
    errors.placementID = "";
  };

  const handleSelectProduct = (productID) => {
    const currentInfo = { ...valuesContainer };
    currentInfo["productID"] = productID;
    setValuesContainer(currentInfo);
  };
  const handleSubmitProductForm = (e) => {
    e.preventDefault();
    if (!valuesContainer.productID) {
      return failed("Please select your Packge and then try to submit");
    }
    // registation sumit prodcess will shift to after Number verification function
    fetch(`http://localhost:8000/user/registation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valuesContainer),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.sucess) {
          sucess(data.sucess);
        }
        if(data.data){
          setCookie("gcom-user-token", data.token);
        }
        if (data?.failed) {
          failed(data.failed);
        }

      });
  };
  useEffect(() => {
    user._id && navigate(from, { replace: true });
  }, [user]);

 
  const varifierFunction = () => {
    const phoneNumber = "+88" + inputUser.phoneNumber;
    const appVerifier = window.recaptchaVerifier;

    // signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setProcessing(false);
    //     setCondition(true);
    //   })
    // .catch((error) => {
    //   const humanCheckerDiv = document.getElementById("sign-in-button");
    //   humanCheckerDiv.remove();
    //   setProcessing(false);

    //   setTimeout(() => {
    //     document
    //       .getElementById("registation_form")
    //       .insertAdjacentHTML("afterend", "<div id='sign-in-button'></div>");
    //   }, 1);
    //   // failed("You Porved Phone Number are Invalid !");
    // });
  };

  const registationFormHanle = (e) => {
    e.preventDefault();

    if (referID) {
      inputUser["referNumber"] = referID;
    }

    if (
      !processing &&
      inputUser.firstName &&
      inputUser.lastName &&
      inputUser.phoneNumber &&
      inputUser.phoneNumber &&
      inputUser.referNumber
    ) {
      if (inputUser.password === inputUser.confirmPassword) {
        setProcessing(true);

        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/before_registation_checking`,
          {
            method: "POST",
            body: JSON.stringify(inputUser),
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.sucess) {
              // window.recaptchaVerifier = new RecaptchaVerifier(
              //   "sign-in-button",
              //   {
              //     size: "invisible",
              //     callback: (response) => {},
              //   },
              //   // authentication
              // );
              varifierFunction();
            } else if (data.failed) {
              // failed(data.failed);
              setProcessing(false);
            }
          });
      } else {
        // failed("Sorry, Your Password and Confirm Password doesn't Match !");
      }
    } else {
      // failed("Before Submit You must Need to Fill Full Form !");
    }
  };

  const handleVarification = (e) => {
    e.preventDefault();

    if (!processing && inputUser.otp.length === 6) {
      setProcessing(true);

      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(inputUser.otp)
        .then((result) => {
          const userPhoneNumber = result.user.phoneNumber;
          if (userPhoneNumber) {
            const trimNumber = userPhoneNumber.replace("+88", "");
            inputUser["phoneNumber"] = trimNumber;
            if (
              inputUser.firstName &&
              inputUser.lastName &&
              inputUser.phoneNumber &&
              inputUser.phoneNumber &&
              inputUser.referNumber
            ) {
              fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/registation`, {
                method: "POST",
                body: JSON.stringify(inputUser),
                headers: {
                  "content-type": "application/json; charset=UTF-8",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  setProcessing(false);

                  if (data.data) {
                    data.data.password = null;
                    setUser(data.data);
                    navigate(from, { replace: true });
                  }
                  if (data && data.token) {
                    // document.cookie = `token = ${data.token}; ${cookieExpires(
                    //   3
                    // )}; path=/`;
                    // document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/dashboard`;
                  }
                  if (data.sucess) {
                    // sucess(data.sucess);
                  }
                  if (data.failed) {
                    // failed(data.failed);
                  }
                });
            } else {
              // failed("Something is Worong Please try Again !");
            }
          } else {
            // failed("Something is Worong Please try Again !");
          }
        })
        .catch((error) => {
          setProcessing(false);
          // failed(
          //   "You are Providing a Wrond OTP Code or Your OTP Code are Expired !"
          // );
        });
    } else {
      // failed("You are Providing a Wrond OTP Code OTP !");
    }
  };
  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <section className="authentication m-auto text-white">
      {condition.stapOne && (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          autoCorrect="off"
          id="registation_form"
        >
          <h6>Register an account</h6>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={values.fullName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.fullName && (
            <p className="form-error">{errorContainer.fullName}</p>
          )}
          <div className="select">
            <label>Gender</label>
            <select name="gender" value={values.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <label>Father Name</label>
          <input
            type="text"
            placeholder="Father Name"
            name="fatherName"
            value={values.fatherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.fatherName && (
            <p className="form-error">{errorContainer.fatherName}</p>
          )}

          <label>Mother Name</label>
          <input
            type="text"
            placeholder="Mother Name"
            name="motherName"
            value={values.motherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.motherName && (
            <p className="form-error">{errorContainer.motherName}</p>
          )}

          <label>phone Number</label>
          <input
            type="text"
            placeholder="phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.phoneNumber && (
            <p className="form-error">{errorContainer.phoneNumber}</p>
          )}

          <label>User Id</label>
          <input
            type="text"
            placeholder="User Id"
            name="userID"
            value={values.userID}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.userID && (
            <p className="form-error">{errorContainer.userID}</p>
          )}

          <label>Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.email && (
            <p className="form-error">{errorContainer.email}</p>
          )}

          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={values.address}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.address && (
            <p className="form-error">{errorContainer.address}</p>
          )}

          <div className="select">
            <label>Country</label>
            <select
              value={values.country}
              name="country"
              onChange={handleChange}
            >
              {countryList().getData() &&
                countryList()
                  .getData()
                  .map((value) => {
                    return <option value={value.label}>{value.label}</option>;
                  })}
            </select>
            {errorContainer.country && (
              <p className="form-error">{errorContainer.country}</p>
            )}
          </div>
          <label>NID</label>
          <input
            type="text"
            placeholder="NID"
            name="nid"
            value={values.nid}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.nid && (
            <p className="form-error">{errorContainer.nid}</p>
          )}
          <div className="placementID">
            <label>Referral ID</label>
            <input
              type="text"
              placeholder="Referral ID"
              name="referID"
              value={values.referID}
              autoComplete="off"
              onChange={handleChange}
              onKeyUp={handlePlacementID}
            />
            {errorContainer.referID && (
              <p className="form-error">{errorContainer.referID}</p>
            )}
            <div
              className="placement-id-container"
              style={{ display: placemantIDs.length ? "block" : "none" }}
            >
              <h6>Select Placement ID</h6>
              <div>
                {placemantIDs?.length &&
                  placemantIDs.map((id) => {
                    return (
                      <p onClick={() => handleSelectPlacementID(id)}>
                        <BiUserCircle />
                        {id}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <label>placement ID</label>
          <input
            type="text"
            placeholder="placement ID"
            name="placementID"
            value={values.placementID}
            autoComplete="off"
            // onChange={handleChange}
            onChange={handlePlacementInputID}
          />
          {errorContainer.placementID && (
            <p className="form-error">{errorContainer.placementID}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.password && (
            <p className="form-error">{errorContainer.password}</p>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.confirmPassword && (
            <p className="form-error">{errorContainer.confirmPassword}</p>
          )}

          <input type="submit" value="Next" />
          <div className="form-navigation d-flex">
            <p>
              Already have an account?
              <Link to="/login">
                <span>Login</span>
              </Link>
            </p>
          </div>
          <div id="sign-in-button"></div>
          <div className="bg-them-one" />
          <div className="bg-them-two" />
          <div className="bg-them-three" />
        </form>
      )}

      {condition.stapTwo && (
        <form
          autoComplete="off"
          autoCorrect="off"
          id="registation_form"
          onSubmit={handleSubmitProductForm}
        >
          <h6>Register an account</h6>
          <label className="select-product-title">Select Your Packge</label>

          <div className="select-packgae-container">
            <div onClick={() => handleSelectProduct("2343sdfs")}>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
            <div>
              <SelectProduct product={productArray} />
            </div>
          </div>
          <input type="submit" value="Submit" />

          <div id="sign-in-button"></div>
          <div className="bg-them-one" />
          <div className="bg-them-two" />
          <div className="bg-them-three" />
        </form>
      )}
      {condition.stapThree && (
        <form onSubmit={handleVarification}>
          <h6>Validate OTP</h6>
          <label style={{ fontSize: ".9rem", fontWeight: "100" }}>
            Please enter the OTP (one time password) to verify your account. A
            Code has been sent to 01*****
            {inputUser.phoneNumber && inputUser.phoneNumber.substring(8)}
          </label>
          <label>Enter 6 digit code</label>
          <input
            type="text"
            placeholder="OTP code"
            name="otp"
            value={inputUser.otp ? inputUser.otp : ""}
            autoComplete="off"
            onChange={handleChange}
          />
          <input type="submit" value="Verify" />

          {/* <div className='form-navigation d-flex'><p>Didn't get the code? <a onClick={resendFunction} style={{cursor:"pointer"}}><span>Resend it</span></a></p></div> */}
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default Registation;
