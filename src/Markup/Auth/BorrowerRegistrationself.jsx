/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Baseurl from "../../Baseurl";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

const BorrowerRegistrationself = () => {
  const [loader, setLoader] = useState(false);
  const [verfication, setVerficationResponse] = useState(false);
  const [broker, setBroker] = useState([]);
  const [viewPass, setViewPass] = useState(false);
  const [Code, setCode] = useState();
  let { useremail, key, id, userNAme } = useParams();
  const [bund, setBund] = useState("");

  console.log(key, id, useremail, "key");
  console.log(userNAme, "userNAme");

  const history = useHistory();
  const [loginres, setLoginres] = useState();
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [brokerid, setBrokerId] = useState("");
  const [firstNameCheck, setFirstNameCheck] = useState("");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const [selectedId, selectedFirstName] = selectedValue.split(",");
    console.log("Selected Broker ID:", selectedId);
    console.log("Selected Broker First Name:", selectedFirstName);
    setBrokerId(selectedId);
    setFirstNameCheck(selectedFirstName);
  };
  console.log("Selected Broker First Name:", firstNameCheck);
  const getBroker = () => {
    setLoader(true);

    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/brokers/for/registration`,
    };

    axios(config)
      .then(function (response) {
        console.log(
          response?.data?.data?.map((e) => e?.first_name),
          "response login"
        );
        if (response.data.status === true) {
          setBund("");
          setLoader(false);
          setBroker(response.data.data);
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
          console.log(response?.data?.errors.email, "err agaya ha");

          Swal.fire({
            toast: true,
            icon: "error",
            title: response?.data?.error,
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
        setLoader(false);
        setBund(error?.response?.data?.errors);

        Swal.fire({
          toast: true,
          icon: "success",
          title: error,
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
  const Login = () => {
    setLoader(true);
    const Data = new FormData();
    const PhoneNumber = phone?.replace(/\D/g, "");
    Data.append("email", email);
    Data.append("password", password);
    Data.append("first_name", firstname);
    Data.append("last_name", lastname);
    Data.append("phone", PhoneNumber);
    Data.append("broker_id", brokerid);
    // Data.append("key", key);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}borrower/self/registration`,
      data: Data,
    };

    axios(config)
      .then(function (response) {
        setLoader(true);
        console.log(response);
        setLoginres(response?.data);
        console.log(response?.data, "response login");
        setToken(response?.data?.token);
        localStorage.setItem("usertoken", response?.data?.token);
        localStorage.setItem(
          "userDetail",
          JSON.stringify(response?.data?.data)
        );
        if (response.data.status === true) {
          setBund("");
          setLoader(false);
          setVerficationResponse(true);
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
          console.log(response?.data?.errors.email, "err agaya ha");
          setVerficationResponse(false);
          Swal.fire({
            toast: true,
            icon: "error",
            title: response?.data?.error,
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
        setLoader(false);
        setBund(error?.response?.data?.errors);

        Swal.fire({
          toast: true,
          icon: "success",
          title: error,
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
  const Verfiycode = () => {
    const Data = new FormData();
    Data.append("code", Code);
    Data.append("user_id", loginres?.data.id);
    setLoader(true);

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}borrower/verification`,
      data: Data,
    };

    axios(config)
      .then(function (response) {
        setLoader(true);
        console.log(response);
        // setLoginres(response?.data);
        localStorage.clear();
        history.push("/Borrower/Login");
        console.log(response?.data?.data);
        // setToken(response?.data?.token);
        // localStorage.setItem("usertoken", response?.data?.token);
        // localStorage.setItem(
        //   "userDetail",
        //   JSON.stringify(response?.data?.data)
        // );
        if (response.data.status === true) {
          setLoader(false);
          //   setregistrationformShow(false)
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
        setLoader(false);

        Swal.fire({
          toast: true,
          icon: "success",
          title: error,
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

  useEffect(() => {
    getBroker();
  }, []);
  const viewPassword = () => {
    setViewPass(!viewPass);
  };
  const handlePhoneNumberChange = (event, state) => {
    let inputPhoneNumber = event.target.value.replace(/\D/g, ""); // remove non-numeric characters
    if (inputPhoneNumber.length > 10) {
      inputPhoneNumber = inputPhoneNumber.slice(0, 10); // truncate to 10 digits
    }
    let formattedPhoneNumber = "";
    if (inputPhoneNumber.length > 3) {
      formattedPhoneNumber = `(${inputPhoneNumber.substring(0, 3)})`;
      if (inputPhoneNumber.length > 6) {
        formattedPhoneNumber += ` ${inputPhoneNumber.substring(
          3,
          6
        )}-${inputPhoneNumber.substring(6)}`;
      } else {
        formattedPhoneNumber += ` ${inputPhoneNumber.substring(3)}`;
      }
    } else {
      formattedPhoneNumber = inputPhoneNumber;
    }
    state(formattedPhoneNumber);
  };
  return (
    <>
      <>{loader ? <div className="loader"></div> : null}</>

      <section className="bg-light " style={{ height: window.screen.height }}>
        <div className="container-fluid " style={{ maxWidth: "80%" }}>
          <div className="row">
            <div className="card custom_card bg-white my-5 ">
              <div className="row">
                {!verfication ? (
                  <>
                    <div
                      className="col-md-6 d-flex;
                  justify-content-center;
                  align-items-center;
                  h-100"
                    >
                      <img
                        className="mx-5 mt-3"
                        width={"100%"}
                        src="https://img.freepik.com/free-photo/man-smiling-pointing_1149-1336.jpg?t=st=1714232414~exp=1714236014~hmac=552b865e626bd16bfa594d79a0e3274e19ff17756757c99d63f931701c9ddb95&w=740"
                      />
                    </div>
                    <div className="col-md-6 mt-4 px-5">
                      <div className="my-3 ">
                        <h5 className="fw-bold fs-4">Create Account</h5>
                        <small className="">Already have an account? </small>
                        <a href="/" class="privacy mx-2">
                          <small>Sign In</small>
                        </a>
                        <div className="row mt-3 fw-bold">
                          <div className="col-md-12">
                            <div className="form-group  col-12">
                              <label
                                className="mb-2 fs-small"
                                style={{ color: "#34395e" }}
                              >
                                First name
                              </label>
                              <div className="input-groups position-relative">
                                <input
                                  onChange={(e) => setFirstname(e.target.value)}
                                  required=""
                                  value={firstname}
                                  // value={""}
                                  placeholder="Your First Name"
                                  type="text"
                                  className="form-control text-capitalize bg-light py-2"
                                  style={{ backgroundColor: "gray" }}
                                />
                                {firstname === undefined ||
                                firstname === null ||
                                firstname === "" ||
                                firstname.length < 4 ? null : (
                                  <p
                                    style={{
                                      fontSize: "16px",
                                      color: "green",
                                      fontWeight: "bold",
                                      position: "absolute",
                                      right: "3%",
                                      top: "10px",
                                      zIndex: "123",
                                    }}
                                  >
                                    ✔
                                  </p>
                                )}
                                {bund?.first_name
                                  ? bund?.first_name.map((e) => (
                                      <p className="text-danger">{e}</p>
                                    ))
                                  : null}
                              </div>
                            </div>
                          </div>

                          <div className="form-group  col-12 ">
                            <label
                              className="mb-2 fs-small"
                              style={{ color: "#34395e" }}
                            >
                              Last Name
                            </label>
                            <div className="input-group position-relative">
                              <input
                                onChange={(e) => setLastname(e.target.value)}
                                required=""
                                // value={""}
                                placeholder="Your Last Name"
                                className="form-control text-capitalize bg-light py-2"
                                style={{ backgroundColor: "gray" }}
                                type="text"
                              />
                              {lastname === undefined ||
                              lastname === null ||
                              lastname === "" ||
                              lastname.length < 4 ? null : (
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "green",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    right: "3%",
                                    top: "10px",
                                    zIndex: "123",
                                  }}
                                >
                                  ✔
                                </p>
                              )}
                              {bund?.last_name
                                ? bund?.last_name.map((e) => (
                                    <p className="text-danger">{e}</p>
                                  ))
                                : null}
                            </div>
                          </div>

                          <div className="form-group ">
                            <label
                              className="mb-2 fs-small"
                              style={{ color: "#34395e" }}
                            >
                              Email
                            </label>
                            <div className="input-groups position-relative">
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                required=""
                                value={email}
                                placeholder="Your Email Address"
                                className="form-control text-capitalize bg-light py-2"
                                style={{ backgroundColor: "gray" }}
                                type="email"
                              />
                              {!email ||
                              !/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
                                email
                              ) ||
                              email === undefined ? null : (
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "green",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    right: "15px",
                                    top: "10px",
                                    zIndex: "123",
                                  }}
                                >
                                  ✔
                                </p>
                              )}
                              {bund?.email
                                ? bund?.email.map((e) => (
                                    <p className="text-danger">{e}</p>
                                  ))
                                : null}
                            </div>
                          </div>

                          <div className="form-group ">
                            <label
                              className="mb-2 fs-small"
                              style={{ color: "#34395e" }}
                            >
                              Password
                            </label>
                            <div className="input-group">
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                required=""
                                // value={""}
                                className="form-control text-capitalize bg-light py-2"
                                style={{
                                  backgroundColor: "gray",
                                  width: "88%",
                                }}
                                type={viewPass === true ? "text" : "password"}
                              />
                              {password === undefined ||
                              password === null ||
                              password === "" ||
                              password.length < 8 ? null : (
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "green",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    right: "10%",
                                    top: "10px",
                                    zIndex: "123",
                                  }}
                                >
                                  ✔
                                </p>
                              )}
                              <span
                                class="input-group-text p-2 rounded-0"
                                style={{ width: "12%" }}
                              >
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
                              {bund?.password
                                ? bund?.password.map((e) => (
                                    <p className="text-danger">{e}</p>
                                  ))
                                : null}
                            </div>
                          </div>
                          <br />
                          <br />
                          <br />

                          <div className="form-group ">
                            <label className="mb-2 fs-small">Phone</label>
                            <div className="input-group position-relative">
                              <input
                                type="tel"
                                name="phone"
                                class="form-control text-capitalize text-lowercase BgColors"
                                onChange={(e) =>
                                  handlePhoneNumberChange(e, setPhone)
                                }
                                value={phone}
                                className="form-control text-capitalize bg-light py-2"
                              />
                              {phone === undefined ||
                              phone === null ||
                              phone === "" ||
                              phone.length < 14 ? null : (
                                <p
                                  style={{
                                    fontSize: "16px",
                                    color: "green",
                                    fontWeight: "bold",
                                    position: "absolute",
                                    right: "10%",
                                    top: "10px",
                                    zIndex: "123",
                                  }}
                                >
                                  ✔
                                </p>
                              )}
                              <br />
                            </div>
                            {bund?.phone
                              ? bund?.phone.map((e) => (
                                  <p className="text-danger">{e}</p>
                                ))
                              : null}

                            <p className="mt-3 position-relative">
                              {" "}
                              <small>
                                Broker
                                <select
                                  className="form-select"
                                  onChange={handleSelectChange}
                                  aria-label="Default select example"
                                >
                                  <option value="" selected hidden>
                                    Select Broker....
                                  </option>
                                  {broker
                                    .filter(
                                      (broker) =>
                                        broker.first_name !== null
                                    )
                                    .map((broker) => (
                                      <option
                                        key={broker.id}
                                        value={`${broker.id},${broker.first_name}`}
                                      >
                                        {broker.first_name} {broker.last_name}
                                      </option>
                                    ))}
                                </select>
                                {console.log(firstNameCheck, "firstname")}
                                {firstNameCheck === null ||
                                firstNameCheck === "" ||
                                firstNameCheck === "null" ||
                                brokerid === "" ? null : (
                                  <p
                                    style={{
                                      fontSize: "16px",
                                      color: "green",
                                      fontWeight: "bold",
                                      position: "absolute",
                                      right: "30px",
                                      top: "30px",
                                      zIndex: "123",
                                    }}
                                  >
                                    ✔
                                  </p>
                                )}
                                By clicking 'Create Account' button you agree to
                                our <br /> <a href="3">Terms of Use</a> and{" "}
                              </small>
                            </p>
                          </div>
                          <br />
                          <br />
                          <br />
                        </div>
                        <div className="row mt-3">
                          <Link
                            to={"#"}
                            className="btn btn-primary w-auto ms-3"
                            onClick={() => Login()}
                          >
                            Create Account&nbsp;
                            {/* <i className="fa fa-arrow-right"></i> */}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-md-12">
                    <div className="my-3 ">
                      <h3 className="text-center">
                        Borrower Code Verification
                      </h3>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <img
                            className="mx-5 mt-3"
                            width={"100%"}
                            src="https://img.freepik.com/free-photo/3d-key-posing-with-blank-placard_1156-342.jpg?t=st=1714233279~exp=1714236879~hmac=aa94ccc90740376f2122c01943acba9f741282bd04dceadde610f3380f144d21&w=740"
                            alt="ok"
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <br />
                            <label className="mb-2 fs-small">Code</label>
                            <div className="input-group">
                              <input
                                onChange={(e) => setCode(e.target.value)}
                                required=""
                                // value={""}
                                placeholder="Code Send You on Email"
                                className="form-control text-capitalize bg-light py-2"
                                style={{ backgroundColor: "gray" }}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <Link
                              to={"#"}
                              className="btn btn-primary w-auto ms-3"
                              onClick={() => Verfiycode()}
                            >
                              Verify &nbsp;
                              {/* <i className="fa fa-arrow-right"></i> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BorrowerRegistrationself;
