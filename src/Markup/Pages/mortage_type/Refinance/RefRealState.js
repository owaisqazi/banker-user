/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import { AiOutlineArrowRight } from "react-icons/ai";
import ProfileInfo from "../Profile/ProfileInfo";
import Baseurl from "../../../../Baseurl";
import axios from "axios";
import Swal from "sweetalert2";
import { FaBars, FaCheckCircle, FaPen, FaSearch } from "react-icons/fa";
import { Progress } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
// import { color } from "@mui/system";
// import ReFooter from "./ReFooter";
import Footerx404 from "../../../../Images/Footerx404.png";

function RefRealState() {
  const location = useLocation();
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

  const history = useHistory();
  const Assign_id = localStorage.getItem("assignId");

  const [showform, setShowForm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fieldError, setFieldError] = useState("");

  // const [email, setEmail] = useState("");
  // const [propertyValue, setPropertyValue] = useState("");
  // const [propertyUsage, setPropertyUsage] = useState("");
  // const [propertyStatus, setPropertyStatus] = useState("");
  // const [propertyType, setPropertyType] = useState("");
  // const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const [anotherProperty, setAnotherProperty] = useState([
    {
      address: "",
      property_value: "",
      property_usage: "",
      property_status: "",
      property_type: "",
      monthly_expenses: "",
    },
  ]);

  const Data1 = new FormData();
  Data1.append("application_id", Assign_id);
  const [no_real_estate, setno_real_estate] = useState(0);
  const getRealStateData = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/get/all/real/estate`,
      data: Data1,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data?.data, "resmortgage");
        console.log(response?.data?.data, "res");
        if (response?.data?.data.length > 0) {
          setShowForm(true);
          setno_real_estate(
            response?.data?.data[0]?.no_real_estate
              ? response?.data?.data[0]?.no_real_estate
              : 0
          );
          setAnotherProperty(response?.data?.data);
        }
        if (response?.data?.status === true) {
          setLoader(false);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setFieldError(error?.response?.data?.errors);
      });
  };

  useEffect(() => {
    getRealStateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Data = new FormData();
  Data.append("application_id", Assign_id);
  Data.append("no_real_estate", no_real_estate);
  {
    anotherProperty?.map((e, i) => {
      Data.append(`address[${i}]`, e?.address);
      Data.append(`monthly_expenses[${i}]`, e?.monthly_expenses);
      Data.append(`property_value[${i}]`, e?.property_value);
      Data.append(`property_status[${i}]`, e?.property_status);
      Data.append(`property_usage[${i}]`, e?.property_usage);
      Data.append(`property_type[${i}]`, e?.property_type);
    });
  }

  const addRealState = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/add/real/estate`,
      data: Data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response);
        if (response?.data?.status === true) {
          console.log(response?.data?.message, "response?.data?.message");
          history.push("/ref/declaration");
          setLoader(false);
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
        }
      })
      .catch(function (error) {
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setFieldError(error?.response?.data?.errors);
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
      });
  };

  const handelChange = (e, ind) => {
    const { name, value } = e.target;
    const data = [...anotherProperty];
    data[ind][name] = value;
    setAnotherProperty(data);
  };
  const [editing, steediting] = useState(true);
  function handleChangeFormat(event, state, ind) {
    console.log(event?.target.value, state, "eventeventevent");
    // if (state === "property_value") {
    //   steediting(false);
    // } else {
    //   steediting(false);
    // }
    const { name, value } = event.target;
    // Remove all non-numeric characters from the input value
    const numericValue = value.replace(/[^0-9]/g, "");
    console.log(numericValue, "eventeventevent");
    // Format the numeric value using toLocaleString
    const formattedValue = Number(numericValue).toLocaleString();
    console.log(formattedValue, "formattedValue");
    const data = [...anotherProperty];
    console.log(data[ind][name], "formattedValue");
    data[ind][name] = formattedValue;
    setAnotherProperty(data);
  }
  const onAdd = () => {
    setAnotherProperty((perv) => [
      ...perv,
      {
        address: "",
        property_value: "",
        property_usage: "",
        property_status: "",
        property_type: "",
        monthly_expenses: "",
      },
    ]);
  };

  console.log(anotherProperty);
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
                <Link to="#">RealState</Link>
                <Progress percent={50} status="actice" />
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
            style={{ position: "relative" }}
            className={
              isOpen === true
                ? "col-md-8 open he mt-5 mb-2 ps-lg-5"
                : isOpen === false
                ? "col-md-10 open nhi he mt-5 mb-2 ps-lg-5"
                : ""
            }
          >
            <div className="row ps-5 Realxmain4">
              {/* <div className="col-lg-9">
                <h2 className="mt-1">Real State</h2>
              </div> */}

              <p className="h5 fw-semibold mt-4">Do you own any real estate?</p>
              <div className="row">
                <div
                  className="col-2 col-md-2 col-lg-2 my-3"
                  style={{ width: "100px" }}
                >
                  <input
                    type="radio"
                    className="btn-check rounded-0"
                    name="options"
                    id="YES"
                    checked={no_real_estate === 0}
                      onChange={() => {
                        setno_real_estate(0);
                      }}
                  />
                  <label
                    className="btn btn-link px-3 py-2 btnx404 rounded-0"
                    for="YES"
                  >
                    Yes
                  </label>
                </div>
                <div className="col-3 col-md-2 col-lg-1 my-3">
                  <input
                    type="radio"
                    className="btn-check"
                    name="options"
                    id="NO"
                    autocomplete="off"
                    checked={no_real_estate === 1?'border-primary1':''}
                      onChange={() => {
                        setno_real_estate(1);
                      }}
                  />
                  <label
                    className="btn btn-link px-3 py-2 btnx404 rounded-0"
                    for="NO"
                  >
                    No
                  </label>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-12">
                  {no_real_estate == 0 ? (
                    <>
                      <p className="h5 fw-semibold mt-4">
                        Fill real estate address and other details
                      </p>
                      {anotherProperty.length > 0
                        ? anotherProperty.map((el, ind) => (
                            <AddAnotherRealStateProperty
                              handleChangeFormat={handleChangeFormat}
                              handelChange={handelChange}
                              ind={ind}
                              editing={editing}
                              steediting={steediting}
                              setAnotherProperty={setAnotherProperty}
                              onAdd={onAdd}
                              fieldError={fieldError}
                              el={el}
                            />
                          ))
                        : null}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row ">
                <div className=".col-md-6 col-lg-4  wxwith pb-4">
                  <label className="text-secondary h6 mt-4">
                    Next is <span className="text-dark">Declarations</span>
                  </label>
                  <br />
                  <button
                    className="btn btn-primary rounded-0 mt-2 "
                    onClick={addRealState}
                  >
                    Save And Continue &nbsp;
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            </div>
            {/* <div id="naimImages4040" style={{width:"80%", paddingTop:"15px", position:"absolute",bottom:"0px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" alt="" /> </div> */}
            <div className="Reals4040" style={{ marginTop: "220px" }}>
              <hr />
              <img src={Footerx404} alt="" width="100%" height="50%" />
            </div>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </>
  );
}

export default RefRealState;

export const AddAnotherRealStateProperty = ({
  handelChange,
  ind,
  onAdd,
  fieldError,
  handleChangeFormat,
  editing,
  steediting,
  el,
}) => {
  console.log(el);

  return (
    <>
      <div className="row">
        <div className="col-lg-9">
          <div className="input-group mt-5 position-relative">
            <FaSearch
              style={{
                position: "absolute",
                left: "6px",
                top: "13px",
                fontSize: "16px",
                color: "gray",
              }}
            />

            <input
              type="email"
              placeholder="Address"
              aria-label="First name"
              className="form-control text-capitalize rounded-0 "
              style={{ backgroundColor: " #0000ff00", paddingLeft: "30px" }}
              name="address"
              value={el?.address}
              onChange={(e) => handelChange(e, ind)}
            />
            {el?.address?.length < 4 || el?.address === undefined ? null : (
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "30px",
                  top: "10px",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
            <FaPen
              style={{
                position: "absolute",
                right: "10px",
                top: "14px",
                color: "#0d6efd",
              }}
            />
          </div>
          {fieldError?.address
            ? fieldError?.address.map((e) => <p className="text-danger">{e}</p>)
            : null}

          <div className="input-group mt-3">
            <span className="input-group-text mcx4044  rounded-0 w-25">
              Property Value
            </span>
            <input
              type="text"
              placeholder="0"
              aria-label="First name"
              className="form-control text-capitalize rounded-0"
              style={{ backgroundColor: " #0000ff00" }}
              name="property_value"
              onChange={(e) => handleChangeFormat(e, "property_value", ind)}
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${
                el?.property_value === undefined ||el?.property_value === null ? 0 : el?.property_value
              }${editing === true ? ".00" : ""}`}
            />
            {el?.property_value?.length < 2 ||
            el?.property_value === undefined ||
            el?.property_value === null ? null : (
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "40%",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
          </div>
          {fieldError?.property_value
            ? fieldError?.property_value.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mt-3">
            <span className="input-group-text mcx4044  rounded-0 w-25">
              Property Usage
            </span>
            <select
              className="form-select py-2  rounded-0"
              id="inputGroupSelect01"
              name="property_usage"
              value={el?.property_usage}
              onChange={(e) => handelChange(e, ind)}
            >
              <option selected>--Select Property Usage--</option>
              <option value="Primary Residence">
                Primary Residence{" "}
                {el?.property_usage === "Primary Residence" ? "✔" : ""}
              </option>
              <option value="Investment">
                Investment {el?.property_usage === "Investment" ? "✔" : ""}
              </option>
              <option value="Second Home">
                Second Home {el?.property_usage === "Second Home" ? "✔" : ""}
              </option>
            </select>
          </div>
          {fieldError?.property_usage
            ? fieldError?.property_usage.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mt-3">
            <span className="input-group-text mcx4044  rounded-0 w-25">
              Property Status
            </span>
            <select
              className="form-select py-2  rounded-0"
              id="inputGroupSelect01"
              name="property_status"
              value={el?.property_status}
              onChange={(e) => handelChange(e, ind)}
            >
              <option selected>--Select Property Status--</option>
              <option value="Pending Sale">
                Pending Sale {el?.property_status === "Pending Sale" ? "✔" : ""}
              </option>
              <option value="Retain">
                Retain {el?.property_status === "Retain" ? "✔" : ""}
              </option>
              <option value="Sold">
                Sold {el?.property_status === "Sold" ? "✔" : ""}
              </option>
            </select>
          </div>
          {fieldError?.property_status
            ? fieldError?.property_status.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mt-3">
            <span className="input-group-text mcx4044  rounded-0 w-25">
              Property Type
            </span>
            <select
              className="form-select py-2  rounded-0"
              id="inputGroupSelect01"
              name="property_type"
              value={el?.property_type}
              onChange={(e) => handelChange(e, ind)}
            >
              <option selected>--Select Property Type--</option>
              <option value="Single Family">
                Single Family {el?.property_type === "Single Family" ? "✔" : ""}
              </option>
              <option value="Condominium">
                Condominium {el?.property_type === "Condominium" ? "✔" : ""}
              </option>
              <option value="Cooperative">
                Cooperative {el?.property_type === "Cooperative" ? "✔" : ""}
              </option>
              <option value="Manufactured Home">
                Manufactured Home{" "}
                {el?.property_type === "Manufactured Home" ? "✔" : ""}
              </option>
              <option value="Two to Four Family">
                Two to Four Family{" "}
                {el?.property_type === "Two to Four Family" ? "✔" : ""}
              </option>
              <option value="Other">
                Other {el?.property_type === "Other" ? "✔" : ""}
              </option>
              <option value="Commerical">
                Commerical {el?.property_type === "Commerical" ? "✔" : ""}
              </option>
              <option value="Farm">
                Farm {el?.property_type === "Farm" ? "✔" : ""}
              </option>
              <option value="Land">
                Land {el?.property_type === "Land" ? "✔" : ""}
              </option>
              <option value="Mixed Use">
                Mixed Use {el?.property_type === "Mixed Use" ? "✔" : ""}
              </option>
              <option value="Mobile Home">
                Mobile Home {el?.property_type === "Mobile Home" ? "✔" : ""}
              </option>
              <option value="Multi Family +4">
                Multi Family +4{" "}
                {el?.property_type === "Multi Family +4" ? "✔" : ""}
              </option>
              <option value="Townhouse">
                Townhouse {el?.property_type === "Townhouse" ? "✔" : ""}
              </option>
            </select>
          </div>
          {fieldError?.property_type
            ? fieldError?.property_type.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}

          <div className="input-group mt-3">
            <span className="input-group-text mcx4044  rounded-0 w-25">
              Monthly Expenses
            </span>
            <input
              placeholder="Ins, Maint, Taxes, etc"
              aria-label="First name"
              className="form-control text-capitalize rounded-0"
              style={{ backgroundColor: " #0000ff00" }}
              name="monthly_expenses"
              onChange={(e) => handleChangeFormat(e, "monthly_expenses", ind)}
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${
                el?.monthly_expenses === undefined ||el?.monthly_expenses === null? 0 : el?.monthly_expenses
              }${editing === true ? ".00" : ""}`}
            />
          </div>
          {fieldError?.monthly_expenses
            ? fieldError?.monthly_expenses.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="mt-5" onClick={onAdd} style={{ cursor: "pointer" }}>
            <h6>Add Another Real State Property</h6>
          </div>
        </div>
      </div>
      {/* <div className="footerx4020" style={{marginTop:"245px"}}>
              <hr/>
              <img src={Footerx404} alt="" width="100%" height="50%" />
            </div> */}
    </>
  );
};
