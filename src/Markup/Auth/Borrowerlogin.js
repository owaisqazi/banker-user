/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Baseurl from "../../Baseurl";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
const Borrowerlogin = () => {
  const [loader, setLoader] = useState(false);
  // const params = useParams()
  const history = useHistory();
  const [loginres, setLoginres] = useState();
  const [viewPass, setViewPass] = useState(false);
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState([]);
  const Data = new FormData();
  Data.append("email", email);
  Data.append("password", password);
 const Login = () => {
    setLoader(true);

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}borrower/login`,
      data: Data,
    };

    axios(config)
      .then(function (response) {
        setLoader(true);
        console.log(response);
        setLoginres(response?.data);
        console.log(response?.data?.data);
        setToken(response?.data?.token);
        localStorage.setItem("usertoken", response?.data?.token);
        localStorage.setItem("role_id", response?.data?.data?.role_id);
        localStorage.setItem("borreower_id", response?.data?.data?.id);
        localStorage.setItem(
          "userDetail",
          JSON.stringify(response?.data?.data)
        );
        if (response.data.status === true) {
          setLoader(false);
          history.push("/CutomerPortal/Dashboard");
          Swal.fire({
            toast: true,
            icon: "success",
            title: response?.data?.message,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        } else {
          setLoader(false);

          Swal.fire({
            toast: true,
            icon: "error",
            title: response?.data?.message,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        setLoader(false);
        setError(error?.response?.data?.errors);
        // Swal.fire({
        //   toast: true,
        //   icon: "error",
        //   title: error?.response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message
            ? error?.response?.data?.errors
            : "Connection Error",
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });

  };

  const viewPassword = () => {
    setViewPass(!viewPass);
  };
  console.log(viewPass);
  return (
    <>
      <>{loader ? <div className="loader"></div> : null}</>
      <Header />
      <section className="bg-light vh-75 manDivLogin">
        <div className="container-fluid login_container">
          <div className="row">
            <div className="card custom_card bg-white my-5 ">
              <div className="row">
                <div className="col-md-6 pt-4 my-5 mt-5 border-right LoginDev1">
                  <div className="my-3 mx-3">
                    <Link
                      className="service twitter col-md-12 service--text"
                      id=""
                      target="_top"
                      to="#"
                    >
                      <span className="logo"></span>
                      <span
                        className="service--text"
                        title="Sign in with Twitter"
                      >
                        Sign in with Twitter
                      </span>
                    </Link>
                    <Link
                      className="service facebook col-md-12 service--text"
                      id=""
                      target="_top"
                      to="#"
                    >
                      <span className="logo"></span>
                      <span
                        className="service--text"
                        title="Sign in with Twitter"
                      >
                        Sign in with Facebook
                      </span>
                    </Link>
                    <Link
                      className="service google col-md-12 service--text"
                      id=""
                      target="_top"
                      to="#"
                    >
                      <span className="logo"></span>
                      <span
                        className="service--text"
                        title="Sign in with google"
                      >
                        Sign in with Google
                      </span>
                    </Link>
                    <Link
                      className="service linkedin col-md-12 service--text"
                      id=""
                      target="_top"
                      to="#"
                    >
                      <span className="logo"></span>
                      <span
                        className="service--text"
                        title="Sign in with linkedin"
                      >
                        Sign in with linkedin
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="my-3 mx-3 LoginDev1Box">
                    <h3>Sign In</h3>
                    <p className="fs-small">
                      Don't have an account?&nbsp;
                      <span>
                        <Link to={"/Borrower/Signup"}>Create Account</Link>
                      </span>
                    </p>
                    <div className="row mt-3">
                      <div className="form-group w-75">
                        <label className="mb-2 fs-small">Email</label>
                        <div className="input-group">
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            required=""
                            className="form-control py-2"
                            placeholder="Your Email Address"
                            type="email"
                          />
                        </div>
                        {Error?.email
                          ? Error?.email.map((e) => (
                              <p className="text-danger col-lg-12">{e}</p>
                            ))
                          : null}
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="form-group w-75">
                        <label className="mb-2 fs-small">Password</label>
                        <div className="input-group w-100">
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            required=""
                            className="form-control py-2 w-75"
                            type={viewPass === true ? "text" : "password"}
                          />
                           <span class="input-group-text p-2 rounded-0 w-25">
                          <i
                            className={
                              viewPass === true
                                ? `fa fa-eye-slash text-danger`
                                : `fa fa-eye text-primary`
                            }
                            title={
                              viewPass === true
                                ? `Hide Password`
                                : `Show Password`
                            }
                            onClick={viewPassword}
                          />
                        </span>
                        </div>
                        {Error?.password
                          ? Error?.password.map((e) => (
                              <p className="text-danger col-lg-12">{e}</p>
                            ))
                          : null}
                      </div>
                      <br />
                      <br />
                      <br />
                      <div className="mt-3 text-right">
                        <Link to={"#"}>
                          <h6>Forgot Password ?</h6>
                        </Link>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <Link
                        to={"/"}
                        className="btn btn-primary w-auto ms-3"
                        onClick={() => Login()}
                      >
                        Sign In &nbsp;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Borrowerlogin;
