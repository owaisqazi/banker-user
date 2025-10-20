/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import { AiOutlineArrowRight } from "react-icons/ai";
// import RefSideBar from "./RefSideBar";
import ProfileInfo from "../Profile/ProfileInfo";
import axios from "axios";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { FaBars, FaCheckCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Progress } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import Footerx404 from "../../../../Images/Footerx404.png";
import { BiDollar } from "react-icons/bi";
// import Footer from "../../../../Images/footercity.svg"

const RefMortageinfo = () => {
  const location = useLocation();
  const [allPostData, setAllPostData] = useState();
  const mort =
    location.pathname === "/ref/mortageinfo"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100 ";
  const pers =
    location.pathname === "/ref/personalinfo"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";
  const cobo =
    location.pathname === "/ref/Co-Borrowers"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";
  const inc =
    location.pathname === "/ref/income"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";
  const ass =
    location.pathname === "/ref/assets"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";
  const real =
    location.pathname === "/ref/realstate"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";
  const Decl =
    location.pathname === "/ref/declaration"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";

  const demo =
    location.pathname === "/ref/demographic"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";

  const credit =
    location.pathname === "/ref/credit"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";

  const refreviewandsubmit =
    location.pathname === "/ref/refreviewandsubmit"
      ? "sidecolheight d-flex justify-content-around align-items-center w-100 sidecirclemain"
      : "sidecolheight d-flex justify-content-around align-items-center w-100";

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      console.log(isOpen, "hui");
    }
    console.log(isOpen, "huihui");
  };

  const { pathname } = location;
  const [edit, setEdit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();
  const history = useHistory();
  // const [id, setId] = useState(null);

  // states for form inputs
  // const token = localStorage.getItem("usertoken");
  const Assign_id = localStorage.getItem("assignId"); // also on condition for add and update
  const [id, setId] = useState(null);
  const [typeOfProperty, setTypeOfProperty] = useState("");
  const [occupyProperty, setOccupyProperty] = useState("Primary Residence");
  const [operate_business, setOperate_business] = useState(0);
  // const [checkForOperateBussniess,setCheckForOperateBussniess] = useState(0)
  const [comfortable_monthly, setComfortable_monthly] = useState("");
  const [goalForRefinancing, setGoalForRefinancing] = useState("");
  const [locationRefinanceProperty, setLocationRefinanceProperty] =
    useState("");
  const [valueOfYourProperty, setValueOfYourProperty] = useState("");
  const [currentBalOfMortgage, setCurrentBalOfMortgage] = useState("");

  if (pathname.includes("edit")) {
    setEdit(true);
    console.log("success");
  }

  const getRefMortgageInfo = async () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/get/mortgage/info`,
      data: Data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setLoader(false);
        console.log(response);
        const {
          id,
          comfortable_monthly_ho_payment,
          down_payment,
          operate_business,
          price_of_property,
          property_location,
          property_type,
          refinancing_goal,
          use_of_property,
          user_id,
        } = response?.data?.data;
        console.log(use_of_property, "use_of_property");
        setId(id);
        setComfortable_monthly(comfortable_monthly_ho_payment);
        setTypeOfProperty(property_type);
        setLocationRefinanceProperty(property_location);
        setValueOfYourProperty(price_of_property);
        setCurrentBalOfMortgage(down_payment);
        setGoalForRefinancing(refinancing_goal);
        setOperate_business(operate_business); //for check box
        setOccupyProperty(use_of_property); // redio button
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  };
  const postData = () => {
    const token = localStorage.getItem("usertoken");
    const reviewData = new FormData();
    reviewData.append("application_id", Assign_id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}application/completion`,
      data: reviewData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setAllPostData(response?.data?.data);
        console.log(response?.data?.data, "sidebar response");
        if (response?.data?.status === true) {
          console.log(response?.data?.message, "response?.data?.message");
          setLoader(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setLoader(false);
        }
        console.log(response, "my response");
      })
      .catch(function (error) {
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  };
  useEffect(() => {
    getRefMortgageInfo();
    postData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checked, setChecked] = useState("");
  const IsChecked = (e) => {
    const value = e.target.value;
    const check = e.target.checked;

    if (check) {
      setChecked([...checked, value]);
      setOperate_business(1);
    } else {
      setChecked(checked.filter((e) => e !== value));
      setOperate_business(0);
    }
    console.log(operate_business);
  };

  const Data = new FormData();
  Data.append("property_type", typeOfProperty || "");
  Data.append("comfortable_monthly_ho_payment", comfortable_monthly || "");
  Data.append("use_of_property", occupyProperty || "");
  Data.append("refinancing_goal", goalForRefinancing || "");
  Data.append("price_of_property", valueOfYourProperty || "");
  Data.append("property_location", locationRefinanceProperty || "");
  Data.append("down_payment", currentBalOfMortgage || ""); //down payment == values of property estimated
  Data.append("operate_business", operate_business ?1:0);
  Data.append("application_id", Assign_id || "");
  if (id) {
    Data.append("id", id);
  }
  const onSubmit = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/store/mortgage/info`,
      data: Data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setLoader(true);

        console.log(response);
        // setMortage_info(response?.data);
        console.log(response?.data?.data);
        console.log("title:", response?.data?.data?.message);
        if (response.data.status === true) {
          setLoader(false);

          history.push("/ref/personalinfo");
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
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setLoader(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          Swal.fire({
            toast: true,
            icon: "error",
            title: response?.data?.error.map((e) => e),
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
      .catch((error) => {
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setFieldsError(error?.response?.data?.errors);
        Swal.fire({
          toast: true,
          icon: "error",
          title: error?.response?.data?.message,
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
        console.log(error);
      });

    // for (var pair of Data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
  };
  const [editing, steediting] = useState(true);
  function handleChange(event, state, type) {
    if (type === "price_of_property") {
      steediting(false);
    } else {
      steediting(false);
    }
    const inputValue = event.target.value;
    // Remove all non-numeric characters from the input value
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    // Format the numeric value using toLocaleString
    const formattedValue = Number(numericValue).toLocaleString();
    state(formattedValue);

    // alert()

    // if (eventvalueOfYourProperty.length<4) {
    //   return setComfortable_monthly(0)
    // }

    // let syntizievalue = event?.replace(/[$,]/g, "")

    // console.log("syntizievalue", Number(syntizievalue))

    // const formattedValue = `$${parseFloat(syntizievalue).toFixed(2)}`;
    // const converted = parseFloat(syntizievalue).toLocaleString("en-US", {
    //   style: "currency",
    //   currency: "USD",
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });
    // setComfortable_monthly(converted);
  }
  console.log(allPostData, "allPostData");
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <Header />
      <div className="container-fluid">
        <div className="row">
          <>
            <FaBars
              class=" none"
              onClick={() => {
                // props.OnHandleToggle();
                handleToggle();
              }}
            />

            <FaBars
              class=" block"
              id="topnav-hamburger-icon"
              onClick={() => {
                // props.OnHandleToggle();
                handleToggle();
              }}
            />
            <div
              className={
                isOpen === true
                  ? "col-md-2 ps-0 sidebarmain fixed_side sidebar-nav open "
                  : "d-none"
              }
            >
              <div className="px-4 my-3">
                <Link to="#">Dashboard</Link>
                <Progress percent={allPostData} status="actice" />
              </div>
              <div className="refgreyline"></div>
              <Link to={"/ref/mortageinfo"}>
                <div className={mort}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/mortageinfo" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Mortgage</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/personalinfo"}>
                <div className={pers}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/personalinfo" ? (
                      <>
                        <FaCheckCircle className="checkicon" />
                      </>
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Personal Info</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/Co-Borrowers"}>
                <div className={cobo}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/Co-Borrowers" ? (
                      <>
                        <FaCheckCircle className="checkicon" />
                      </>
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Co-Borrowers</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/income"}>
                <div className={inc}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/income" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Income</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/assets"}>
                <div className={ass}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/assets" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}{" "}
                  </div>
                  <div className="mort grey_color fw-500">Assets</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/realstate"}>
                <div className={real}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/realstate" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Real State</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/declaration"}>
                <div className={Decl}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/declaration" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Declaration</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/demographic"}>
                <div className={demo}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/demographic" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Demographic</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/credit"}>
                <div className={credit}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/credit" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">Credit</div>
                  <div></div>
                </div>
              </Link>
              <Link to={"/ref/refreviewandsubmit"}>
                <div className={refreviewandsubmit}>
                  <div className="sidecircle">
                    {location.pathname === "/ref/refreviewandsubmit" ? (
                      <FaCheckCircle className="checkicon" />
                    ) : null}
                  </div>
                  <div className="mort grey_color fw-500">
                    Review and Submit
                  </div>
                  <div></div>
                </div>
              </Link>
              {/* <Link to={"/review"}>
          <div className={review}>
            <div className="sidecircle">
              {location.pathname === "/review" ? (
                <FaCheckCircle className="checkicon" />
              ) : null}
            </div>
            <div className="mort grey_color fw-500">Review and Submit</div>
            <div></div>
          </div>
        </Link> */}
            </div>
          </>
          <div
            className={
              isOpen === true
                ? "col-md-8 open he mt-5 mb-2 ps-lg-5"
                : isOpen === false
                ? "col-md-10 open nhi he mt-5 mb-2 ps-lg-5 "
                : ""
            }
          >
            <div className="row">
              <div className="col-md-12">
                <div className=" form-label">
                  <h5>What type of property are you seeking to refinance?</h5>
                </div>
              </div>
              <div className="form-group mt-4 col-md-10">
                <select
                  class={`form-select rounded-0 ${
                    typeOfProperty === undefined || typeOfProperty === null|| typeOfProperty === ""
                      ? "text-dark"
                      : "text-success"
                  }`}
                  value={typeOfProperty}
                  onChange={(e) => setTypeOfProperty(e.target.value)}
                >
                  <option selected disabled>
                    Select Property Type
                  </option>
                  <option value={"Other"}>
                    {" "}
                    Other{" "}
                    {typeOfProperty === "Other" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"Manufactured Home"}>
                    {" "}
                    Manufactured Home{" "}
                    {typeOfProperty === "Manufactured Home" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"Cooperative"}>
                    {" "}
                    Cooperative{" "}
                    {typeOfProperty === "Cooperative" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"Condominium"}>
                    {" "}
                    Condominium{" "}
                    {typeOfProperty === "Condominium" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"4 Unit"}>
                    {" "}
                    4 Unit{" "}
                    {typeOfProperty === "4 Unit" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"3 Unit"}>
                    {" "}
                    3 Unit{" "}
                    {typeOfProperty === "3 Unit" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"2 Unit"}>
                    {" "}
                    2 Unit{" "}
                    {typeOfProperty === "2 Unit" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                  <option value={"Single Family"}>
                    {" "}
                    Single Family{" "}
                    {typeOfProperty === "Single Family" ? (
                      <span className="tick-mark2">✔</span>
                    ) : null}
                  </option>
                </select>
                {fieldsError?.property_type
                  ? fieldsError?.property_type.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
            </div>

            <div className="row pb-0 ">
              <div className="col-md-12">
                <div className="form-label">
                  <h5>How do you occupy the property?</h5>
                </div>
              </div>
              <div className="form-group mt-2">
                <div className="d-flex flex-wrap ">
                  <div className="me-0 me-md-3">
                    <div className="property_radio mx-auto">
                      <input
                        label={`Primary Residence ${
                          occupyProperty === "Primary Residence" ? "✔" : ""
                        }`}
                        type="radio"
                        id="male"
                        name="type"
                        className={`marrx404 ${
                          occupyProperty === "Primary Residence"
                            ? "text-success"
                            : ""
                        }`}
                        value="Primary Residence"
                        checked={
                          occupyProperty === "Primary Residence" ? true : false
                        }
                        onChange={(e) => setOccupyProperty(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="me-0 me-md-3">
                    <div className="property_radio mx-auto">
                      <input
                        label={`Investment ${
                          occupyProperty === "Investment" ? "✔" : ""
                        }`}
                        type="radio"
                        id="male"
                        name="type"
                        className={`marrx404 ${
                          occupyProperty === "Investment" ? "text-success" : ""
                        }`}
                        value="Investment"
                        checked={occupyProperty === "Investment" ? true : false}
                        onChange={(e) => setOccupyProperty(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="me-0 me-md-3">
                    <div className="property_radio mx-auto">
                      <input
                        label={`Second Home ${
                          occupyProperty === "Second Home" ? "✔" : ""
                        }`}
                        type="radio"
                        id="male"
                        name="type"
                        className={`marrx404 ${
                          occupyProperty === "Second Home" ? "text-success" : ""
                        }`}
                        value="Second Home"
                        checked={
                          occupyProperty === "Second Home" ? true : false
                        }
                        onChange={(e) => setOccupyProperty(e.target.value)}
                      />
                    </div>
                  </div>
                  {fieldsError?.use_of_property
                    ? fieldsError?.use_of_property.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {operate_business === "1" ? (
                    <div className="mt-3 d-flex align-items-baseline">
                      &nbsp; &nbsp;
                      <input type="checkbox" checked />
                      &nbsp; &nbsp;
                      <label className="h6 text-muted">
                        I might also operate my business here
                      </label>
                    </div>
                  ) : (
                    <div className="mt-3 d-flex align-items-baseline">
                      &nbsp; &nbsp;
                      <input type="checkbox" onChange={IsChecked} />
                      &nbsp; &nbsp;
                      <label className="h6 text-muted">
                        I might also operate my business here
                      </label>
                    </div>
                  )}
                </div>

                <div className="row">
                  <h5 className="mt-4 col-lg-12">
                    What is a comfortable monthly housing payment?
                  </h5>
                  <div class="input-group126 position-relative my-2 col-lg-10 ">
                    <BiDollar
                      className="textHover126"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        position: "absolute",
                        left: "18px",
                        top: "12px",
                        zIndex: "123",
                      }}
                    />
                    {/* <input
                        onChange={(e) => setComfortable_monthly(e.target.value)}
                        className="form-control123 m-0 ps-4"
                        type="number"
                        name=""
                        id=""
                        value={comfortable_monthly}
                      /> */}
                    <input
                      onChange={(e) => {
                        handleChange(
                          e,
                          setComfortable_monthly,
                          "comfortable_monthly"
                        );
                      }}
                      className="form-control123 m-0 ps-4"
                      type="tel"
                      step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        comfortable_monthly === undefined
                          ? 2
                          : comfortable_monthly
                      }${editing === true ? "" : ""}`}
                      pattern="^[\d,]+$"
                      name=""
                      id=""
                    />
                    {comfortable_monthly.length < 4 ||
                    comfortable_monthly === "0" ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "18px",
                          top: "8px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                  </div>
                </div>
                {fieldsError?.comfortable_monthly_ho_payment
                  ? fieldsError?.comfortable_monthly_ho_payment.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}

                <div className="row">
                  <h5 className="mt-4 col-lg-12">
                    What is your goal for refinancing your current mortgage?
                  </h5>
                  <div className="col-lg-10">
                  <select
                    name="refinancing_goal"
                    class={`form-select rounded-0 col-lg-10 ${
                      goalForRefinancing === undefined ||
                      goalForRefinancing === null||
                      goalForRefinancing === ""
                        ? "text-dark"
                        : "text-success"
                    }`}
                    value={goalForRefinancing}
                    onChange={(e) => setGoalForRefinancing(e.target.value)}
                  >
                    <option selected disabled>
                      -Select Refinance Goal-
                    </option>
                    <option value={"Debt Consolidation"}>
                      Debt Consolidation{" "}
                      {goalForRefinancing === "Debt Consolidation" ? (
                        <span className="tick-mark2">✔</span>
                      ) : null}
                    </option>
                    <option value={"Student Loan"}>
                      Student Loan{" "}
                      {goalForRefinancing === "Student Loan" ? (
                        <span className="tick-mark2">✔</span>
                      ) : null}
                    </option>
                    <option value={"Home Improvement"}>
                      Home Improvement
                      {goalForRefinancing === "Home Improvement" ? (
                        <span className="tick-mark2">✔</span>
                      ) : null}
                    </option>
                    <option value={"Rate and Term Change"}>
                      Rate and Term Change{" "}
                      {goalForRefinancing === "Rate and Term Change" ? (
                        <span className="tick-mark2">✔</span>
                      ) : null}
                    </option>
                    <option value={"Other"}>
                      Other{" "}
                      {goalForRefinancing === "Other" ? (
                        <span className="tick-mark2">✔</span>
                      ) : null}
                    </option>
                  </select>
                  </div>
                  {fieldsError?.refinancing_goal
                    ? fieldsError?.refinancing_goal.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                </div>

                <div className="row mt-5 InputTxt123 widthsingle">
                  <h5>Where is the refinance property located?</h5>

                  {/* <div className="SearcIcon p-0"><CiSearch /></div> */}
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control text-capitalize"
                      placeholder=" Enter a location"
                      value={locationRefinanceProperty}
                      id=""
                      onChange={(e) =>
                        setLocationRefinanceProperty(e.target.value)
                      }
                    />{" "}
                    {locationRefinanceProperty.length < 4 ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "18px",
                          top: "8px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                  </div>
                </div>
                {fieldsError?.property_location
                  ? fieldsError?.property_location.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}

                <div className="row mt-5">
                  <h5>
                    What is the current value of your property? Estimates are
                    fine.
                  </h5>
                  <div className="position-relative widthsingle me-2 yourproperty" >
                    <input
                      onChange={(e) =>
                        handleChange(
                          e,
                          setValueOfYourProperty,
                          "valueOfYourProperty"
                        )
                      }
                      className="form-control123 m-0 ps-4"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        valueOfYourProperty === undefined
                          ? 0
                          : valueOfYourProperty
                      }${editing === true ? "" : ""}`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {valueOfYourProperty === "0" ||
                    valueOfYourProperty.length < 4 ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "18px",
                          top: "8px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                  </div>
                </div>
                {fieldsError?.price_of_property
                  ? fieldsError?.price_of_property.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}

                <div className="row mt-5 ">
                  <h5>What is the current balance of your mortgage?</h5>
                  <div className="position-relative widthsingle me-2 yourproperty" >
                    <input
                      onChange={(e) =>
                        handleChange(
                          e,
                          setCurrentBalOfMortgage,
                          "currentBalOfMortgage"
                        )
                      }
                      className="form-control123 m-0 ps-4"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        currentBalOfMortgage === undefined
                          ? 0
                          : currentBalOfMortgage
                      }${editing === true ? "" : ""}`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {currentBalOfMortgage === "0" ||
                    currentBalOfMortgage.length < 4 ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "18px",
                          top: "8px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                  </div>
                </div>
                {fieldsError?.down_payment
                  ? fieldsError?.down_payment.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}

                <div className="row mt-4">
                  <label className="text-secondary h6">
                    Next is <span className="text-dark">Personal Info</span>
                  </label>
                </div>
                <button
                  className="btn btn-primary rounded-0 "
                  onClick={onSubmit}
                >
                  Save And Continue &nbsp;
                  <AiOutlineArrowRight />
                </button>
              </div>
              {/* <div style={{width:"88%", height:"40px", paddingTop:"15px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" className="Images2x" alt="" /> </div> */}
              {/* <img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg"  alt="" /> */}
              <div>
                <hr />
                <img src={Footerx404} alt="" width="100%" height="50%" />
              </div>
            </div>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </>
  );
};

export default RefMortageinfo;
