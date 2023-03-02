import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Login.css";
import { useFormik } from 'formik';
import sucess from '../../../Shades/Toastes/sucess';
import failed from '../../../Shades/Toastes/failed';
import { setCookie } from '../../../Hooks/cookies';



const Login = () => {
    const [inputUser, setInputUser] = useState({});
    const [processing, setProcessing] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [forgotPassCondition, setForgotPassCondition] = useState({});

    const [cooki] = useState(
      document.cookie
        .replaceAll("token", "")
        .replaceAll("=", "")
        .replaceAll(";", "")
    );
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ? location.state.from.pathname : "/";

    useEffect(() => {
      if (user && user._id) {
        navigate(from, { replace: true });
      } else {
        if (cooki) {
          fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user`, {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              authorization: `Bearer ${cooki}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(true);
              if (data.data) {
                data.data._id && navigate(from, { replace: true });
                data.data.password = null;
                setUser(data.data);
              }
            });
        } else {
          setLoading(true);
        }
      }
    }, [user, cooki]);

    const { values, errors, handleChange, handleSubmit } = useFormik({
      initialValues: {
        userID: "",
        password: ""
      },
      onSubmit: (values) => {
        console.log(values);
        fetch(`http://localhost:8000/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.data) {
              sucess("Login sucessfull");
              setCookie("gcom-user-token", data.token);
            }
            if (data.failed) {
              failed(data.failed);
            }
          });

      }

    })
    const fromInputHandler = (e) => {
    //   inputHandler(e, inputUser, setInputUser);
    };

    const varifierFunction = () => {
      const phoneNumber = "+88" + inputUser.singInPhoenNumber;
      const appVerifier = window.recaptchaVerifier;

    //   signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
    //     .then((confirmationResult) => {
    //       window.confirmationResult = confirmationResult;
    //       setProcessing(false);

    //       let currntCondition = { ...forgotPassCondition };
    //       currntCondition["isNumberExist"] = true;
    //       setForgotPassCondition(currntCondition);
    //     })
    //     .catch((error) => {
    //       setProcessing(false);
    //       const humanCheckerDiv = document.getElementById("sign-in-button");
    //       humanCheckerDiv.remove();

    //       setTimeout(() => {
    //         document
    //           .getElementById("logIn_form")
    //           .insertAdjacentHTML(
    //             "afterend",
    //             "<div id='sign-in-button'></div>"
    //           );
    //       }, 1);
    //       failed("You Porved Phone Number are Invalid !");
    //     });
    };

    const handleLogin = (e) => {
      e.preventDefault();

      if (
        !processing &&
        inputUser.singInPhoenNumber &&
        inputUser.signInPassword
      ) {
        setProcessing(true);

        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/logIn`, {
          method: "post",
          body: JSON.stringify(inputUser),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setProcessing(false);
            if (data && data.token) {
            //   document.cookie = `token = ${data.token}; ${cookieExpires(
            //     3
            //   )}; path=/`;
              // document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/dashboard`;
            }
            if (data.data) {
              data.data.password = null;
              setUser(data.data);
              navigate(from, { replace: true });
            }
            if (data.sucess) {
            //   sucess(data.sucess);
            }
            if (data.failed) {
            //   failed(data.failed);
            }
          });
      } else {
        // failed("Before Submit You Must Need to Fill Phone Number & Password !");
      }
    };
    const handleForgotPassword = () => {
      let currntCondition = { ...forgotPassCondition };
      currntCondition["forgotPassword"] = true;
      setForgotPassCondition(currntCondition);
    };
    const handleCheckForgotPhoneNumber = (e) => {
      e.preventDefault();

      if (!processing && inputUser.singInPhoenNumber) {
        setProcessing(true);

        fetch(
          `${process.env.REACT_APP_SERVER_HOST_URL}/check_forgot_pass_phonenumber`,
          {
            method: "POST",
            body: JSON.stringify({ phoneNumber: inputUser.singInPhoenNumber }),
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.sucess) {
            //   window.recaptchaVerifier = new RecaptchaVerifier(
            //     "sign-in-button",
            //     {
            //       size: "invisible",
            //       callback: (response) => {},
            //     },
            //     authentication
            //   );
            //   varifierFunction();
            } else if (data.failed) {
            //   failed(data.failed);
            //   setProcessing(false);
            }
          });
      } else {
        // failed("Please, Provide Phone Number & Then Try !");
      }
    };

    const handleNewPassword = (e) => {
      e.preventDefault();

      if (!processing && inputUser.phoneNumber && inputUser.newPassword) {
        setProcessing(true);
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/forgot_password`, {
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
            //   document.cookie = `token = ${data.token}; ${cookieExpires(
            //     3
            //   )}; path=/`;
            //   document.cookie = `token = ${data.token}; ${cookieExpires(3)}; path=/dashboard`;
            }
            if (data.sucess) {
            //   sucess(data.sucess);
            }
            if (data.failed) {
            //   failed(data.failed);
            }
          });
      } else {
        // failed("Something is Worong Please try Again !");
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
            setProcessing(false);

            const userPhoneNumber = result.user.phoneNumber;
            if (userPhoneNumber) {
              const trimNumber = userPhoneNumber.replace("+88", "");
              inputUser["phoneNumber"] = trimNumber;

              let currntCondition = { ...forgotPassCondition };
              currntCondition["validPhoneNumber"] = true;
              setForgotPassCondition(currntCondition);
            } else {
            //   failed("Something is Worong Please try Again !");
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

    return (
      <section className="authentication m-auto">
        {!forgotPassCondition.forgotPassword ? (
          <form onSubmit={handleSubmit} autoComplete="off">
            <h6>Login</h6>
            <label>User ID</label>
            <input
              type="text"
              name="userID"
              placeholder="User ID"
              value={values.userID}
              required
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.userID && <p className="form-error">{errors.userID}</p>}
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              required
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
            <input type="submit" value="Login" required autoComplete="off" />

            <div className="form-navigation d-flex text-white">
              <p>
                Don't have an account?{" "}
                <Link to="/registaion">
                  <span>Register an account</span>
                </Link>
              </p>
            </div>
            <div className="form-navigation d-flex text-white">
              <span onClick={handleForgotPassword}>Forgotten Password?</span>
            </div>
            <div id="sign-in-button"></div>
            <div className="bg-them-one" />
            <div className="bg-them-two" />
            <div className="bg-them-three" />
          </form>
        ) : (
          <>
            {forgotPassCondition.forgotPassword &&
              !forgotPassCondition.validPhoneNumber && (
                <form autoComplete="off" id="logIn_form">
                  {!forgotPassCondition.isNumberExist ? (
                    <>
                      <h6>Enter Your User ID</h6>
                      <input
                        type="text"
                        name="userID"
                        placeholder="User ID"
                        value={inputUser.userID ? inputUser.userID : ""}
                        required
                        autoComplete="off"
                        onChange={fromInputHandler}
                      />

                      <input
                        type="submit"
                        value="Submit"
                        required
                        autoComplete="off"
                        onClick={handleCheckForgotPhoneNumber}
                      />
                    </>
                  ) : (
                    <>
                      <h6>Validate OTP</h6>
                      <label style={{ fontSize: ".9rem", fontWeight: "100" }}>
                        Please enter the OTP (one time password) to verify your
                        account. A Code has been sent to 01*****
                        {inputUser.singInPhoenNumber &&
                          inputUser.singInPhoenNumber.substring(8)}
                      </label>
                      <label>Enter 6 digit code</label>
                      <input
                        type="text"
                        placeholder="OTP code"
                        name="otp"
                        value={inputUser.otp ? inputUser.otp : ""}
                        required
                        autoComplete="off"
                        onChange={fromInputHandler}
                      />
                      <input
                        type="submit"
                        value="Verify"
                        onClick={handleVarification}
                      />
                    </>
                  )}

                  <div id="sign-in-button"></div>
                  {/* <div className='form-navigation d-flex'><p>Didn't get the code? <a onClick={resendFunction} style={{cursor:"pointer"}}><span>Resend it</span></a></p></div> */}
                </form>
              )}

            {forgotPassCondition.validPhoneNumber && (
              <form
                onSubmit={handleNewPassword}
                autoComplete="off"
                autoCorrect="off"
              >
                <h6>Set New Password</h6>
                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={inputUser.newPassword ? inputUser.newPassword : ""}
                  required
                  autoComplete="off"
                  onChange={fromInputHandler}
                />

                <input type="submit" value="Submit" />
              </form>
            )}
          </>
        )}
      </section>
    );
};

export default Login;