
import React, { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import { AiOutlineArrowRight, AiOutlineDollar } from "react-icons/ai";
import ProfileInfo from "../Profile/ProfileInfo";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import axios from "axios";
import { FaBars, FaCheckCircle, FaPen } from "react-icons/fa";
import { Progress } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Footerx404 from "../../../../Images/Footerx404.png";

const RefPersonalInfo = () => {
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

  // other neccessay state and methods

  const history = useHistory();
  const [fieldsError, setFieldsError] = useState();
  const [loader, setLoader] = useState(false);

  // form Field State

  const [id, setId] = useState(null);
  const Assign_id = localStorage.getItem("assignId");
  const [firstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [alternateName, setAlternateName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [extension, setExtension] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [address, setAddress] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [ownOrRent, setOwnOrRent] = useState("Own");
  const [monthlyRent, setMonthlyRent] = useState(null);
  const [durationOfLivingYear, setDurationOfLivingYear] = useState("");
  const [durationOfLivingMonth, setDurationOfLivingMonth] = useState("");
  const [numberOfDepends, setNumberOfDepends] = useState("");
  const [dependentsAges, setDependentsAges] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("Married");
  const [militaryStatus, setMilitaryStatus] = useState("");
  const [residenceType, setResidenceType] = useState("US Citizen");
  // const [haveMilitaryAddress , setHaveMilitaryAddress] = useState("")

  //  for dynamic fields

  const [altname, setAltname] = useState(false);
  const [nicName, setNicName] = useState(false);
  const [rent, setRent] = useState(false);
  const [military_or_veteran, setmilitary_or_veteran] = useState(0);
  const [military, setMilitary] = useState(
    military_or_veteran === "1" ? true : false
  );
  const [unmarried, setUnMarried] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [depend, setDepend] = useState(false);

  const getRefPersonalInfo = async () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/get/personal/info`,
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
          ages,
          address,
          // application_id,
          alternate_names,
          cell_phone,
          current_military_status,
          dependents_ages,
          ext,
          email,
          // first_name,
          home_phone,
          have_nick_name,
          have_any_dependent,
          have_alternate_names,
          have_mailing_address,
          how_long_live_m_there,
          how_long_live_y_there,
          id,
          // is_draft,
          // last_name,
          mailing_address,
          marital_status,
          middle_name,
          military_or_veteran,
          nick_name,
          own_or_rent,
          residency_type,
          suffix,
          // unmarried_partner,
          // user_id,
          whats_monthly_rent,
          work_phone,
          user_profile,
        } = response?.data?.data;
        console.log(user_profile, "response");
        console.log(typeof military_or_veteran, "military_or_veteran");
        setId(id);
        setFirstName(user_profile?.first_name);
        setMiddleName(middle_name);
        setLastName(user_profile?.last_name);
        setSuffix(suffix);
        setEmail(email?email:user_profile?.email);
        setPhoneNumber(cell_phone);
        setWorkPhone(user_profile?.phone);
        setExtension(ext);
        setHomePhone(home_phone);
        setAddress(address);
        setMailingAddress(have_mailing_address);
        setMailing(mailing_address === 1 ? true : false);
        setOwnOrRent(own_or_rent||"Own");
        setMonthlyRent(whats_monthly_rent);
        setDurationOfLivingYear(how_long_live_y_there);
        setDurationOfLivingMonth(how_long_live_m_there);
        setMilitaryStatus(current_military_status);
        setResidenceType(residency_type||"US Citizen");
        setMaritialStatus(marital_status||"Married");
        setNumberOfDepends(dependents_ages);
        setDependentsAges(ages);
        setAlternateName(have_alternate_names);
        setNickName(have_nick_name);
        setmilitary_or_veteran(military_or_veteran === "1" ? true : false);
        setDepend(have_any_dependent == "1" ? true : false);
        setNicName(nick_name === 1 ? true : false);
        setAltname(alternate_names === 1 ? true : false);
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

  useEffect(() => {
    getRefPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Form Data for add and update
console.log(maritialStatus,'Whats your marital status?');
  const Data = new FormData();
  const PhoneNumber = phoneNumber?.replace(/\D/g, '');
  const HomePhone = homePhone?.replace(/\D/g, '');
  const WorkPhone = workPhone?.replace(/\D/g, '');
  const Extension = extension?.replace(/\D/g, '');
  Data.append("application_id", Assign_id || "");
  Data.append("first_name", firstName || "");
  Data.append("middle_name", MiddleName || "");
  Data.append("last_name", lastName || "");
  Data.append("suffix", suffix || "");
  Data.append("alternate_names", altname === true ? 1 : 0);
  if (altname) {
    Data.append("have_alternate_names", alternateName || "");
  }
  Data.append("nick_name", nicName === true ? 1 : 0);
  if (nicName) {
    Data.append("have_nick_name", nickName || "");
  }
  Data.append("email", email || "");
  Data.append("cell_phone", PhoneNumber || "");
  Data.append("work_phone", WorkPhone || "");
  Data.append("ext", Extension || "");
  Data.append("home_phone", HomePhone || "");
  Data.append("address", address || "");
  Data.append("mailing_address", mailing === true ? "1" : "0");
  if (!mailing) {
    Data.append("have_mailing_address", mailingAddress || "");
  }
  Data.append("own_or_rent", ownOrRent || "");
  if (ownOrRent === "rent") {
    Data.append("whats_monthly_rent", monthlyRent || "");
  }
  Data.append("how_long_live_y_there", durationOfLivingYear || "");
  Data.append("how_long_live_m_there", durationOfLivingMonth || "");
  Data.append("military_or_veteran", military === true ? "1" : "0");
  if (military) {
    Data.append("current_military_status", militaryStatus || "");
  }
  Data.append("residency_type", residenceType || "");
  Data.append("marital_status", maritialStatus || "");
  Data.append("have_any_dependent", depend === true ? "1" : "0");
  if (depend) {
    Data.append("dependents_ages", numberOfDepends || "");
    Data.append("ages", dependentsAges || "");
  }
  if (id) {
    Data.append("id", id || "");
  }

  // on Submit for add and update

  const onSubmit = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/store/personal/info`,
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

          history.push("/ref/Co-Borrowers");
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

    for (var pair of Data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };

  // const [mailingaddress_check, setMailingadress_check] = useState("");
  // // const Check_altname = (e) => {
  //   const value = e.target.value;
  //   const check = e.target.checked;

  //   if (check) {
  //     setMailingadress_check([...mailingaddress_check, value]);
  //     setAltname(1);
  //   } else {
  //     setMailingadress_check(mailingaddress_check.filter((e) => e !== value));
  //     setAltname(0);
  //   }
  //   console.log(altname, "Checking Aly anme");
  // };

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
  }

  console.log(military, "military_or_veteran");
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
                  <div className="mort grey_color fw-500 ">
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
                ? "col-md-8 open  mt-5 mb-2 ps-lg-5"
                : isOpen === false
                ? "col-md-10 open nhi+ mt-5 mb-2 ps-lg-5"
                : ""
            }
          >
            <div className="row col-lg-10" id="PErson">
              <h5 className="mb-3 p-md-0 Heading00 col-lg-12">
                Please fill your full, legal name
              </h5>
              <div className="col-lg-3 p-md-0 position-relative">
                <input
                  className="form-control text-capitalize rounded-0 inPut1"
                  type="text"
                  placeholder="First Name"
                  style={{ padding: "18px 12px" }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {firstName?.length < 4 || firstName === null ? null : (
                  <p
                    style={{
                      fontSize: "16px",
                      color:"green",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "18px",
                      top: "8px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              <div className="col-lg-3 p-md-0 position-relative">
                <input
                  className="form-control text-capitalize rounded-0 inPut1"
                  type="text"
                  placeholder="Middle Name"
                  style={{ padding: "18px 12px" }}
                  value={MiddleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />{console.log(MiddleName,"Please fill your full, legal name")}
                {MiddleName?.length < 4 || MiddleName === undefined ? null : (
                  <p
                    style={{
                      fontSize: "16px",
                      color:"green",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "18px",
                      top: "8px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              <div className="col-lg-3 p-md-0 position-relative">
                <input
                  className="form-control text-capitalize rounded-0 inPut1"
                  type="text"
                  placeholder="Last Name"
                  style={{ padding: "18px 12px" }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {lastName?.length < 4 || lastName === undefined ? null : (
                  <p
                    style={{
                      fontSize: "16px",
                      color:"green",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "18px",
                      top: "8px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              <div className="col-lg-3 p-md-0 position-relative">
                <input
                  className="form-control text-capitalize rounded-0 inPut1"
                  type="text"
                  placeholder="Suffix"
                  style={{ padding: "18px 12px" }}
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                />
                {suffix?.length < 4 || suffix === undefined ? null : (
                  <p
                    style={{
                      fontSize: "16px",
                      color:"green",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "18px",
                      top: "8px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              {fieldsError?.first_name
                ? fieldsError?.first_name.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
              {fieldsError?.middle_name
                ? fieldsError?.middle_name.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
              {fieldsError?.last_name
                ? fieldsError?.last_name.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
              {fieldsError?.suffix
                ? fieldsError?.suffix.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}

              <div className="mt-3 d-flex align-items-baseline">
                &nbsp; &nbsp;
                <input
                  type="checkbox"
                  checked={altname}
                  onChange={() => setAltname(!altname)}
                />
                &nbsp; &nbsp;
                <label className="h6 text-muted">I have alternate names</label>
                <br />
              </div>

              {altname === true ? (
                <div className="position-relative col-lg-6">
                  <input
                    style={{ padding: "12px 10px" }}
                    type="text"
                    className="form-control text-capitalize my-3 mx-5"
                    placeholder="Enter all names here sperated by commas"
                    value={alternateName}
                    onChange={(e) => setAlternateName(e.target.value)}
                  />
                  {alternateName?.length < 4 ||
                  alternateName === undefined ? null : (
                    <p
                      style={{
                        fontSize: "16px",
                        color:"green",
                        fontWeight: "bold",
                        position: "absolute",
                        right: "1px",
                        top: "23px",
                        zIndex: "123",
                      }}
                    >
                      ✔
                    </p>
                  )}
                </div>
              ) : null}

              <div className="mt-3 d-flex align-items-baseline">
                &nbsp; &nbsp;
                <input
                  type="checkbox"
                  checked={nicName}
                  onChange={() => setNicName(!nicName)}
                />
                &nbsp; &nbsp;
                <label className="h6 text-muted">I have a nickname</label>
              </div>

              {nicName === true ? (
                <div className="position-relative col-lg-6">
                  <input
                    style={{ padding: "12px 10px" }}
                    type="text"
                    className="form-control text-capitalize my-3 mx-5"
                    placeholder="Enter all names here sperated by commas"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                  {nickName?.length < 4 || nickName === undefined ? null : (
                    <p
                      style={{
                        fontSize: "16px",
                        color:"green",
                        fontWeight: "bold",
                        position: "absolute",
                        right: "1px",
                        top: "23px",
                        zIndex: "123",
                      }}
                    >
                      ✔
                    </p>
                  )}
                </div>
              ) : null}

              <div className="mt-5 personalinfo_maxwidth minWidxx">
                <h5 className="Heading00">
                  Please fill your contact information
                </h5>
                <div className="mt-2 contact_max">
                  <div className="input-group">
                    <span className="input-group-label contact-info-label Intext">
                      Email ID
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Required"
                      formcontrolname="email"
                      class="form-control text-capitalize text-lowercase BgColors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {!email ||
                    !/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
                      email
                    )|| email === undefined  ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          color:"green",
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
                  </div>
                  {fieldsError?.email
                    ? fieldsError?.email.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mt-2">
                    <span class="input-group-label contact-info-label Intext">
                      Cell Phone
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      formcontrolname="email"
                      class="form-control text-capitalize text-lowercase BgColors"
                      value={phoneNumber}
                      onChange={(e) =>
                        handlePhoneNumberChange(e, setPhoneNumber)
                      }
                    />
                    {phoneNumber?.length < 14 ||
                    phoneNumber === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          color:"green",
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
                  </div>
                  {fieldsError?.cell_phone
                    ? fieldsError?.cell_phone.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mt-2">
                    <span class="input-group-label contact-info-label">
                      Work Phone
                    </span>
                    <input
                      type="tel"
                      formcontrolname="workPhoneNumber "
                      name="work_phone"
                      inputmode="decimal"
                      autocomplete="nope"
                      className="form-control text-capitalize BgColors"
                      id="workphone_input"
                      value={workPhone}
                      onChange={(e) => handlePhoneNumberChange(e, setWorkPhone)}
                    />
                    {workPhone?.length < 14 || workPhone === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          color:"green",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "35%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <input
                      placeholder="Ext."
                      formcontrolname="workExt"
                      name="ext"
                      inputmode="decimal"
                      className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                      type="text"
                      onChange={(e) =>
                        handleChange(e, setExtension, "extension")
                      }
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${extension === undefined ? 0 : extension}${
                        editing === true ? ".00" : ""
                      }`}
                      id=""
                    />
                    {extension?.length < 4 || extension === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          color:"green",
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
                  </div>
                  {fieldsError?.work_phone
                    ? fieldsError?.work_phone.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {fieldsError?.ext
                    ? fieldsError?.ext.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div className="input-group mt-2">
                    <span className="input-group-label contact-info-label Intext">
                      Home Phone
                    </span>
                    <input
                      type="tel"
                      formcontrolname="homePhoneNumber"
                      name="home_phone"
                      inputmode="decimal"
                      autocomplete="nope"
                      class="form-control text-capitalize BgColors"
                      value={homePhone}
                      onChange={(e) => handlePhoneNumberChange(e, setHomePhone)}
                    />
                    {homePhone?.length < 4 || homePhone === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          color:"green",
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
                  </div>
                  {fieldsError?.home_phone
                    ? fieldsError?.home_phone.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <p
                    className="mt-2"
                    style={{
                      color: "#49545c",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    I confirm that I have read and agree to the Consent to
                    contact
                  </p>
                  <div className="row mt-5 ms-1">
                    <h5 className="p-md-0 Heading00">
                      Where do you live currently?
                    </h5>
                    <div className="posi_rela">
                      <input
                        className="form-control text-capitalize mt-2  ps-4 InputText11"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {address?.length < 4 ||
                        address === null ||
                        address === undefined? null :(
                        <p
                          style={{
                            fontSize: "16px",
                            color:"green",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "8%",
                            top: "15px",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
                      <CiSearch className="search_svg11" />
                      <FaPen className="search_svgEdit" />
                    </div>
                    {fieldsError?.address
                      ? fieldsError?.address.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                    <div className="mt-4 d-flex align-items-baseline ">
                      &nbsp; &nbsp;
                      <input
                        type="checkbox"
                        checked={mailing}
                        onClick={() => setMailing(!mailing)}
                      />
                      &nbsp; &nbsp;
                      <label className="h6 text-muted">
                        My mailing address is the same as my current address
                      </label>
                    </div>

                    <div className="mt-3 p-3`">
                      <div className="posi_rela">
                        <input
                          className="form-control text-capitalize mt-1 ps-4 InputText11"
                          type="text"
                          placeholder="Enter Mailing Address"
                          disabled={mailing}
                          value={mailingAddress}
                          onChange={(e) => setMailingAddress(e.target.value)}
                        />
                        {mailingAddress?.length < 4 ||
                        mailingAddress === null ||
                        mailingAddress === undefined? null : (
                          <p
                            style={{
                              fontSize: "16px",
                              color:"green",
                              fontWeight: "bold",
                              position: "absolute",
                              right: "8%",
                              top: "12px",
                              zIndex: "123",
                            }}
                          >
                            ✔
                          </p>
                        )}
                        <CiSearch className="search_svg1n" />
                      </div>
                      {fieldsError?.have_mailing_address
                        ? fieldsError?.have_mailing_address.map((e) => (
                            <p className="text-danger">{e}</p>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div
                  className="radiogroup mt-5"
                  style={{
                    borderLeft: "1px solid rgba(194, 197, 217, 1)",
                    padding: "2rem",
                  }}
                >
                  <h5 className="Heading00">
                    Do you own this property or do you rent?
                  </h5>

                  <div className="row">
                    <div className="personalinfo_property mx-auto pdng404">
                      <input
                        label={`Own ${ownOrRent === "Own"?"✔":""}`}
                        type="radio"
                        id="male"
                        name="Own"
                        className={`marrx404 ${ownOrRent==="Own"?"text-success":""}`}
                        value="Own"
                        checked={ownOrRent === "Own" ? true : false}
                        onClick={(e) => setRent(e.target.value)}
                        onChange={(e) => setOwnOrRent(e.target.value)}
                      />
                      {/* </div>
                    <div className="personalinfo_property mx-auto"> */}
                      <input
                        label={`Rent ${ownOrRent === "rent"?"✔":""}`}
                        type="radio"
                        id="female"
                        name="Own"
                        className={`marrx404 ${ownOrRent==="rent"?"text-success":""}`}
                        value="rent"
                        checked={ownOrRent === "rent" ? true : false}
                        onClick={(e) => setRent(e.target.value)}
                        onChange={(e) => setOwnOrRent(e.target.value)}
                      />

                      <input
                        className={`NewTxt marrx404 ${ownOrRent==="Living Rent Free"?"text-success":""}`}
                        label={`Living Rent Free ${
                          ownOrRent === "Living Rent Free"?"✔":""
                        }`}
                        type="radio"
                        id="other"
                        name="Own"
                        value="Living Rent Free"
                        checked={
                          ownOrRent === "Living Rent Free" ? true : false
                        }
                        onClick={(e) => setRent(e.target.value)}
                        onChange={(e) => setOwnOrRent(e.target.value)}
                      />
                    </div>
                    {fieldsError?.own_or_rent
                      ? fieldsError?.own_or_rent.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                    {rent === "rent" ? (
                      <div className="row">
                        <h5 className="mt-3 Heading00">
                          What is the monthly rent??
                        </h5>

                        <div className="col-md-8">
                          <div className="input-group mt-2">
                            <span
                              className="input-group-label contact-info-label "
                              style={{ minWidth: 0, width: "max-content" }}
                            >
                              <AiOutlineDollar />
                            </span>
                            <input
                              type="number"
                              autocomplete="nope"
                              class="form-control text-capitalize "
                              value={monthlyRent}
                              onChange={(e) => setMonthlyRent(e.target.value)}
                            />
                            {monthlyRent === "0" ||
                            monthlyRent === null ? null : (
                              <p
                                style={{
                                  fontSize: "16px",
                                  color:"green",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  right: "8%",
                                  top: "12px",
                                  zIndex: "123",
                                }}
                              >
                                ✔
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            <div className="input-group mt-2">
                              <input
                                autocomplete="nope"
                                class="form-control text-capitalize "
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    setDurationOfLivingYear,
                                    "durationOfLivingYear"
                                  )
                                }
                                className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                                type="text"
                                // step="0.1"
                                // min='0'
                                // max='20'
                                onBlur={() => steediting(true)}
                                onFocus={() => steediting(false)}
                                value={`${
                                  durationOfLivingYear === undefined
                                    ? 0
                                    : durationOfLivingYear
                                }${editing === true ? "" : ""}`}
                                // pattern="^[\d,]+$"
                                id=""
                              />
                              <span
                                className="input-group-label contact-info-label "
                                style={{ minWidth: 0, width: "max-content" }}
                              >
                                Years
                                <span style={{ paddingLeft: "110px" }}>
                                  {durationOfLivingYear === undefined || durationOfLivingYear === null|| durationOfLivingYear === "0" ? "" :"✔"}
                                </span>
                              </span>
                            </div>
                            {fieldsError?.how_long_live_y_there
                              ? fieldsError?.how_long_live_y_there.map((e) => (
                                  <p className="text-danger">{e}</p>
                                ))
                              : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 RedioDiv">
                            <div class="input-group mt-2">
                              <select
                                autocomplete="nope"
                                class="form-control text-capitalize "
                                value={durationOfLivingMonth}
                                onChange={(e) =>
                                  setDurationOfLivingMonth(e.target.value)
                                }
                              >
                                <option selected>
                                  Select Month
                                </option>
                                <option value={"1"}>1 </option>
                                <option value={"2"}>2 </option>
                                <option value={"3"}>3 </option>
                                <option value={"4"}>4 </option>
                                <option value={"5"}>5 </option>
                                <option value={"6"}>6 </option>
                                <option value={"7"}>7 </option>
                                <option value={"8"}>8 </option>
                                <option value={"9"}>9 </option>
                                <option value={"10"}>10</option>
                                <option value={"11"}>11 </option>
                              </select>

                              <span
                                className="input-group-label contact-info-label "
                                style={{ minWidth: 0, width: "max-content" }}
                              >
                                months{" "}
                                <span style={{ paddingLeft: "50px" }}>
                                  {durationOfLivingMonth === undefined || durationOfLivingMonth  === null|| durationOfLivingMonth === "0" ? null : "✔"}
                                </span>
                              </span>
                            </div>
                          </div>
                          {fieldsError?.how_long_live_m_there
                            ? fieldsError?.how_long_live_m_there.map((e) => (
                                <p className="text-danger">{e}</p>
                              ))
                            : null}
                        </div>
                      </div>
                    ) : (
                      <>
                        <h5 className="mt-3 Heading00">
                          How long did you live there?
                        </h5>

                        <div className="row">
                          <div className="">
                            <div className="input-group mt-2">
                              <input
                                autocomplete="nope"
                                class="form-control text-capitalize "
                                onChange={(e) =>
                                  handleChange(
                                    e,
                                    setDurationOfLivingYear,
                                    "durationOfLivingYear"
                                  )
                                }
                                className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                                type="text"
                                // step="0.1"
                                // min='0'
                                // max='20'
                                onBlur={() => steediting(true)}
                                onFocus={() => steediting(false)}
                                value={`${
                                  durationOfLivingYear === undefined
                                    ? 0
                                    : durationOfLivingYear
                                }${editing === true ? "" : ""}`}
                                // pattern="^[\d,]+$"
                                id=""
                              />
                              <span
                                className="input-group-label contact-info-label"
                                style={{ minWidth: 0, width: "max-content" }}
                              >
                                Years
                                <span style={{ paddingLeft: "110px" }} className={`${durationOfLivingYear === undefined || durationOfLivingYear === null|| durationOfLivingYear === "" ? "" :"text-success"}`}>
                                  {durationOfLivingYear === undefined || durationOfLivingYear === null ? "" :"✔"}
                                </span>
                              </span>
                            </div>
                            {fieldsError?.how_long_live_y_there
                              ? fieldsError?.how_long_live_y_there.map((e) => (
                                  <p className="text-danger">{e}</p>
                                ))
                              : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className=" ">
                            <div class="input-group mt-2">
                              <select
                                autocomplete="nope"
                                class="form-control text-capitalize "
                                value={durationOfLivingMonth}
                                onChange={(e) =>
                                  setDurationOfLivingMonth(e.target.value)
                                }
                              >
                                <option selected>
                                  Select Month
                                </option>
                                <option value={"1"}>1 </option>
                                <option value={"2"}>2 </option>
                                <option value={"3"}>3 </option>
                                <option value={"4"}>4 </option>
                                <option value={"5"}>5 </option>
                                <option value={"6"}>6 </option>
                                <option value={"7"}>7 </option>
                                <option value={"8"}>8 </option>
                                <option value={"9"}>9 </option>
                                <option value={"10"}>10</option>
                                <option value={"11"}>11 </option>
                              </select>

                              <span
                                className="input-group-label contact-info-label "
                                style={{ minWidth: 0, width: "max-content" }}
                              >
                                months{" "}
                                <span style={{ paddingLeft: "50px" }} className={`${durationOfLivingMonth === undefined || durationOfLivingMonth === null|| durationOfLivingMonth === "" ? "" :"text-success"}`}>
                                  {durationOfLivingMonth === undefined || durationOfLivingMonth  === null ? null : "✔"}
                                </span>
                              </span>
                            </div>
                          </div>
                          {fieldsError?.how_long_live_m_there
                            ? fieldsError?.how_long_live_m_there.map((e) => (
                                <p className="text-danger">{e}</p>
                              ))
                            : null}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="stateagent mt-3">
                    <h5 className="mt-3 Heading00">
                      Are you currently active in the military or a veteran?
                    </h5>
                    <div className="d-flex">
                      <div className="personalinfo_property">
                        <input
                          label="Yes"
                          type="radio"
                          id="male"
                          name="agent"
                          className={military? "border border-primary" : ""}
                          value={"yes"}
                          checked={military}
                          onClick={() => setMilitary(true)}
                        />
                        {console.log(military,'military')}
                      </div>
                      <div className="personalinfo_property">
                        <input
                          label="No"
                          type="radio"
                          id="male"
                          name="agent"
                          className={
                            !military? "border border-primary" : ""
                          }
                          value={"no"}
                          checked={!military}
                          onClick={() => setMilitary(false)}
                        />
                      </div>
                    </div>

                    {military === true ? (
                      <div className="row">
                        <h5 className="mt-3 Heading00">
                          What is your current military status?
                        </h5>
                        <select
                          name="current_military_status"
                          className={`form-select mt-3 w-50 ms-4 ${
                            militaryStatus === undefined ||
                            militaryStatus === null
                              ? "text-dark"
                              : "text-success"
                          }`}
                          value={militaryStatus}
                          onChange={(e) => setMilitaryStatus(e.target.value)}
                        >
                          <option selected>Select Military Status</option>
                          <option value={"Active Service"}>
                            {" "}
                            Active Service{" "}
                            {militaryStatus === "Active Service"?"✔":""}
                          </option>
                          <option value={"Veteran"}>
                            {" "}
                            Veteran {militaryStatus === "Veteran"?"✔":""}
                          </option>
                          <option value={"Non Active Reserve National Guard"}>
                            {" "}
                            Non Active Reserve National Guard{" "}
                            {militaryStatus ===
                              "Non Active Reserve National Guard"?"✔":""}
                          </option>
                        </select>
                      </div>
                    ) : null}

                    <h5 className="mt-4 Heading00">
                      What's your residency type?
                    </h5>
                    <div className="row mt-3">
                      <div className="d-flex flex-column flex-md-row ">
                        <div>
                          <div className="personalinfo_property mx-2">
                            <input
                              label={`US Citizen ${
                                residenceType === "US Citizen"?"✔":""
                              }`}
                              type="radio"
                              id="male"
                              name="type"
                              className={`marrx404 ${residenceType==="US Citizen"?"text-success":""}`}
                              value="US Citizen"
                              checked={
                                residenceType === "US Citizen" ? true : false
                              }
                              onChange={(e) => setResidenceType(e.target.value)}
                            />

                            <input
                              label={`Permanent Resident Alien ${
                                residenceType === "Permanent Resident Alien" &&
                                "✔"
                              }`}
                              type="radio"
                              id="female"
                              name="type"
                              className={`marrx404 ${residenceType==="Permanent Resident Alien"?"text-success":""}`}
                              value="Permanent Resident Alien"
                              checked={
                                residenceType === "Permanent Resident Alien"
                                  ? true
                                  : false
                              }
                              onChange={(e) => setResidenceType(e.target.value)}
                            />

                            <input
                              className={`DivInpt21 marrx404 ${residenceType==="Non Permanent Resident Alien"?"text-success":null}`}
                              label={`Non Permanent Resident Alien ${
                                residenceType ===
                                  "Non Permanent Resident Alien"?"✔":""
                              }`}
                              type="radio"
                              id="other"
                              name="type"
                              value="Non Permanent Resident Alien"
                              checked={
                                residenceType === "Non Permanent Resident Alien"
                                  ? true
                                  : false
                              }
                              onChange={(e) => setResidenceType(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {fieldsError?.residency_type
                        ? fieldsError?.residency_type.map((e) => (
                            <p className="text-danger">{e}</p>
                          ))
                        : null}

                      <h5 className="mt-3 Heading00">
                        What's your marital status?
                      </h5>

                      <div className="d-flex  flex-md-row mt-2 mxz404">
                        <div>
                          <div className="personalinfo_property ">
                            <input
                              label={`Married ${
                                maritialStatus === "Married"?"✔":""
                              }`}
                              type="radio"
                              id="married"
                              name="gender"
                              value="Married"
                              className={`marrx404 ${maritialStatus==="Married"?"text-success":""}`}
                              checked={
                                maritialStatus === "Married" ? true : false
                              }
                              onChange={(e) =>
                                setMaritialStatus(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <div className="personalinfo_property ">
                            <input
                              label={`Unmarried ${
                                maritialStatus === "Unmarried"?"✔":""
                              }`}
                              type="radio"
                              id="unmarried"
                              name="gender"
                              className={`marrx404 ${maritialStatus==="Unmarried"?"text-success":""}`}
                              value="Unmarried"
                              checked={
                                maritialStatus === "Unmarried" ? true : false
                              }
                              onChange={(e) =>
                                setMaritialStatus(e.target.value)
                              }
                              onClick={() => setUnMarried(!unmarried)}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="personalinfo_property ">
                            <input
                              label={`Separated ${
                                maritialStatus === "Separated"?"✔":""
                              }`}
                              type="radio"
                              id="separated"
                              name="gender"
                              className={`marrx404 ${maritialStatus==="Separated"?"text-success":""}`}
                              value="Separated"
                              checked={
                                maritialStatus === "Separated" ? true : false
                              }
                              onChange={(e) =>
                                setMaritialStatus(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <div className="personalinfo_property ">
                            <input
                              label={`Do Not Wish To Provide ${
                                maritialStatus === "Do Not Wish To Provide" &&
                                "✔"
                              }`}
                              type="radio"
                              id="Dont wish"
                              name="gender"
                              className={`marrx404 ${maritialStatus === "Do Not Wish To Provide"?"text-success":""}`}
                              value="Do Not Wish To Provide"
                              checked={
                                maritialStatus === "Do Not Wish To Provide"
                                  ? true
                                  : false
                              }
                              onChange={(e) =>
                                setMaritialStatus(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {fieldsError?.marital_status
                        ? fieldsError?.marital_status.map((e) => (
                            <p className="text-danger">{e}</p>
                          ))
                        : null}
                      {unmarried === true ? (
                        <div className="mt-3 d-flex align-items-baseline">
                          &nbsp; &nbsp;
                          <input type="checkbox" />
                          &nbsp; &nbsp;
                          <label className="h6 text-muted">
                            Do you have any unmarried partner with real property
                            rights similar to those of a legal spouse?
                          </label>
                        </div>
                      ) : null}
                    </div>
                    <h5 className="mt-4 Heading00">
                      Do you have any dependents?
                    </h5>
                    <div className="d-flex mt-3">
                      <div className="personalinfo_property">
                        <input
                          label="Yes"
                          type="radio"
                          id="male"
                          name="agent"
                          className={`marrx404 ${
                            depend === true ? "border border-primary" : null
                          }`}
                          checked={depend === true ? "border border-primary" : null}
                          onClick={() => setDepend(true)}
                        />
                      </div>
                      <div className="personalinfo_property">
                        <input
                          label="No"
                          type="radio"
                          id="male"
                          name="agent"
                          className={`marrx404 ${
                            depend === false ? "border border-primary" : null
                          }`}
                          checked={
                            depend === false ? "border border-primary" : null
                          }
                          onClick={() => setDepend(false)}
                        />
                      </div>
                    </div>

                    {depend === true ? (
                      <div className="mt-3 col-md-10">
                        <h5 className="Heading00">
                          How many dependents and what are their ages?
                        </h5>

                        <div class="row">
                          <div className="position-relative col-lg-6 pe-0">
                            <input
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  setNumberOfDepends,
                                  "numberOfDepends"
                                )
                              }
                              className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                              type="text"
                              placeholder="Enter dependents ages"
                              onBlur={() => steediting(true)}
                              onFocus={() => steediting(false)}
                              value={`${
                                numberOfDepends === undefined
                                  ? 0
                                  : numberOfDepends
                              }${editing === true ? "" : ""}`}
                              // pattern="^[\d,]+$"
                              id=""
                            />
                            {numberOfDepends === undefined ||
                            numberOfDepends === null ||
                            numberOfDepends === "0" ? null : (
                              <p
                                style={{
                                  fontSize: "16px",
                                  color:"green",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  right: "8%",
                                  top: "10px",
                                  zIndex: "123",
                                }}
                              >
                                ✔
                              </p>
                            )}
                          </div>
                          <div className="position-relative col-lg-6 px-0">
                            <input
                              name="email"
                              placeholder="Enter ages separated by commas"
                              class="form-control"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  setDependentsAges,
                                  "dependentsAges"
                                )
                              }
                              className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                              type="text"
                              // step="0.1"
                              // min='0'
                              // max='20'
                              onBlur={() => steediting(true)}
                              onFocus={() => steediting(false)}
                              value={`${
                                dependentsAges === undefined
                                  ? 0
                                  : dependentsAges
                              }${editing === true ? "" : ""}`}
                              // pattern="^[\d,]+$"
                              id=""
                            />
                            {dependentsAges === undefined ||
                            dependentsAges === null ||
                            fieldsError?.dependents_ages?.map(
                              (e) => e?.middle_name === ""
                            ) ? null : (
                              <p
                                style={{
                                  fontSize: "16px",
                                  color:"green",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  right: "8%",
                                  top: "10px",
                                  zIndex: "123",
                                }}
                              >
                                ✔
                              </p>
                            )}
                          </div>
                        </div>
                        {fieldsError?.dependents_ages
                          ? fieldsError?.dependents_ages.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}
                        <p
                          className="mt-2"
                          style={{
                            color: "#49545c",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          If the child is less than 1 year old, enter 1
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-secondary h6">
                    Next is <span className="text-dark">Co-Borrowers</span>
                  </label>
                  <br />
                  <button
                    className="btn btn-primary rounded-0 mt-2"
                    onClick={onSubmit}
                  >
                    Save And Continue &nbsp;
                    <AiOutlineArrowRight />
                  </button>
                </div>

                {/*  */}
              </div>
            </div>
            <div>
              <hr />
              <img src={Footerx404} alt="" width="100%" height="50%" />
            </div>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </>
  );
};

export default RefPersonalInfo;
