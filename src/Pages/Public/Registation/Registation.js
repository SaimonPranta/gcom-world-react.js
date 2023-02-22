import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Registation.css";
import countryList from "react-select-country-list";
import { useFormik } from "formik";
import { singUpSchema } from "../../../Schemas";

const initialFormValue = {
      fullName: "",
      fatherName: "",
      motherName: "",
      gender: "male",
      phoneNumber: "",
      userID: "",
      eamil: "",
      address: "",
      country: "",
      nid: "",
      referID: "",
      password: "",
      confirmPassword: "",
    };


const Registation = () => {
  const [inputUser, setInputUser] = useState({});
  const [user, setUser] = useState({});
  const [condition, setCondition] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";
  const { referID } = useParams();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialFormValue,
    // validationSchema: singUpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(errors);
  useEffect(() => {
    user._id && navigate(from, { replace: true });
  }, [user]);

  const fromInputHandler = (e) => {
    // inputHandler(e, inputUser, setInputUser);
  };
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
      {!condition && (
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
          {errors.fullName && <p className="form-error">{errors.fullName}</p>}
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
          {errors.fatherName && (
            <p className="form-error">{errors.fatherName}</p>
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
          {errors.motherName && (
            <p className="form-error">{errors.motherName}</p>
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
          {errors.phoneNumber && (
            <p className="form-error">{errors.phoneNumber}</p>
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
          {errors.userID && <p className="form-error">{errors.userID}</p>}

          <label>Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            name="eamil"
            value={values.eamil}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}

          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={values.address}
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.address && <p className="form-error">{errors.address}</p>}

          <div className="select">
            <label>Country</label>
            <select value={values.country}>
              {countryList().getData() && countryList().getData().map( value => {
                return <option value={value.label}>{value.label}</option>;
              })}
              
            </select>
            {errors.country && <p className="form-error">{errors.country}</p>}
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
          {errors.nid && <p className="form-error">{errors.nid}</p>}

          <label>Referral ID</label>
          <input
            type="text"
            placeholder="Referral ID"
            name="refferalID"
            value={values.refferalID}
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.referID && <p className="form-error">{errors.referID}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword}</p>
          )}

          <input type="submit" value="Next" />
          <div className="form-navigation d-flex">
            <p>
              Already have an account?{" "}
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

      {condition && (
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
    </section>
  );
};

export default Registation;
