/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../../Baseurl";
import Footerx404 from "../../../../../Images/Footerx404.png";

function Base({ setpanel, getIncome }) {
  const history = useHistory();
  const [fieldsError, setFieldsError] = useState();
  const Assign_id = localStorage.getItem("assignId");
  const [loader, setLoader] = useState(false);
  const [editing, steediting] = useState(true);

  // const [currentEmployee, setcurrentEmployee] = useState(false);
  const [current, Setcurrent] = useState(0);
  const [employee_name, SetEmployee_name] = useState("");
  const [start_date, SetStart_date] = useState("");
  const [current_emp, Set_current_emp] = useState(0);
  const [end_date, Set_end_date] = useState("");
  const [office_address, Set_office_address] = useState("");
  const [position, Setposition] = useState("");
  const [work_phone, Set_work_phone] = useState("");
  const [ext, Set_ext] = useState("");
  const [base_type, Setbase_type] = useState("");
  const [base, Set_base] = useState("");
  const [employed_family_member, Setemployed_family_member] = useState(0);
  const [bonus_type, Set_bonus_type] = useState("");
  const [commission_type, Set_commission_type] = useState("");
  const [overtime_type, Set_overtime_type] = useState("");
  const [other_type, Set_other_type] = useState("");
  const [bonus, Setbonus] = useState("");
  const [commission, Setcommission] = useState("");
  const [overtime, Set_overtime] = useState("");
  const [other, Set_other] = useState("");
  const [self_employed, Setself_employed] = useState(0);
  // const [co_Borrower, setCo_Borrower] = useState(false);
  // const [showfirstform, setshowfirstform] = useState(false);
  const [primary, Setprimary] = useState(0);
  const [foreign_income, Set_foreign_income] = useState(0);
  const [month_profession, Set_month_profession] = useState("");
  const [ownership_share, Set_ownership_share] = useState(0);
  const [seasonal_income, Set_seasonal_income] = useState(0);
  const [year_profession, Set_year_profession] = useState("");

  const Data = new FormData();
  const workphone = ("" + work_phone).replace(/\D/g, "");
  const ext_number = ("" + ext).replace(/\D/g, "");
  const Month_profession = ("" + month_profession).replace(/\D/g, "");
  const Year_profession = ("" + year_profession).replace(/\D/g, "");
  console.log(workphone);
  Data.append("base_employment_income", 1);
  Data.append("military_employment_income", 0);
  Data.append("other_income", 0);
  Data.append("application_id", Assign_id || "");
  Data.append("current", current ? 1 : 0);
  Data.append("employee_name", employee_name || "");
  Data.append("start_date", start_date || "");
  Data.append("current_emp", current_emp ? 1 : 0);
  Data.append("self_employed", self_employed ? 1 : 0);
  Data.append("end_date", end_date || "");
  Data.append("office_address", office_address || "");
  Data.append("position", position || "");
  Data.append("work_phone", work_phone || "");
  Data.append("ext", ext_number || "");
  Data.append("base_type", base_type || "");
  Data.append("base", base || "");
  Data.append("employed_family_member", employed_family_member ? 1 : 0);
  Data.append("bonus_type", bonus_type || "");
  Data.append("commission_type", commission_type || "");
  Data.append("overtime_type", overtime_type || "");
  Data.append("other_type", other_type || "");
  Data.append("bonus", bonus || "");
  Data.append("commission", commission || "");
  Data.append("overtime", overtime || "");
  Data.append("other", other || "");
  Data.append("primary", primary ? 1 : 0);
  Data.append("foreign_income", foreign_income ? 1 : 0);
  Data.append("month_profession", Month_profession || "");
  Data.append("ownership_share", ownership_share ? 1 : 0);
  Data.append("seasonal_income", seasonal_income ? 1 : 0);
  Data.append("year_profession", Year_profession || "");

  const AddBaseIncome = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/add/income`,
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
          // history.push("/ref/assets");
          setLoader(false);
          setpanel("");
          getIncome();
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
      });
  };

  function handleSelectChange(event) {
    Setbase_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }
  function handleSelectChangeForBonus(event) {
    Set_bonus_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }
  function handleSelectChangeForCommision(event) {
    Set_commission_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }
  function handleSelectChangeForOwnership_share(event) {
    Set_ownership_share(event.target.value);
    console.log(event.target.value, "event.target.value");
  }
  function handleSelectChangeForOverTime(event) {
    Set_overtime_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }
  function handleSelectChangeForOther(event) {
    Set_other_type(event.target.value);
    console.log(event.target.value, "event.target.value other");
  }
  function handleSelectChangeForSeasonal_income(event) {
    {
      event.target.checked ? Set_seasonal_income(1) : Set_seasonal_income(0);
    }
  }
  console.log(foreign_income, "foreign_income(");
  function handleSelectChangeForForiegnIncome(event) {
    {
      event.target.checked ? Set_foreign_income(1) : Set_foreign_income(0);
    }
    console.log(event.target.value, "event.target.value");
  }
  console.log(current_emp, "current_emp if");

  const handleChange1 = (event) => {
    if (event.target.checked) {
      Setcurrent(1);
    } else {
      Setcurrent(0);
    }
  };
  const handleChange2 = (event) => {
    if (event.target.checked) {
      Setself_employed(1);
    } else {
      Setself_employed(0);
    }
  };

  const handleChangeforEmployFamily = (event) => {
    if (event.target.checked) {
      Setemployed_family_member(1);
    } else {
      Setemployed_family_member(0);
    }
  };
  const handleChange0 = (event) => {
    if (event.target.checked) {
      Setprimary(1);
    } else {
      Setprimary(0);
    }
  };

  console.log(base_type, "base_type");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onCancel = () => {
    setpanel("");
    getIncome();
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
  console.log(work_phone, "work_phone");

  function handleFormatNumber(event, state, type) {
    if (type === "ext") {
      steediting(false);
    } else {
      steediting(false);
    }
    const inputValue = event.target.value;
    // Remove all non-numeric characters from the input value
    const numericValue = inputValue?.replace(/[^0-9]/g, "");
    // Format the numeric value using toLocaleString
    const formattedValue = Number(numericValue)?.toLocaleString();
    state(formattedValue);
  }
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div style={{ position: "relative" }} className="w-74 maiN404">
        <h2 className="mt-4 Midle404">
          <b>Base Employment Income</b>
        </h2>
        <div className="d-flex">
          <div className="form-check">
            <input
              className="form-check-input rounded-0"
              type="checkbox"
              value=""
              id="current"
              onChange={handleChange1}
            />
            <label className="form-check-label" for="current">
              Current
            </label>
          </div>
          {current === 1 ? (
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-label rounded-0"
                id="primary"
                onChange={handleChange0}
                checked={primary === 1 ? true : false}
              />
              <label className="form-check-label" for="primary">
                Primary
              </label>
            </div>
          ) : null}

          <div className="form-check ms-1 ms-md-3">
            <input
              className="form-check-input rounded-0"
              type="checkbox"
              value=""
              onChange={handleChange2}
              id="self employee"
            />
            <label className="form-check-label" for="self employee">
              Self Employed
            </label>
          </div>
        </div>

        <h6 className="mt-5 mb-3">EMPLOYMENT DETAILS</h6>

        <form action="" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Employer Name
            </span>
            <input
              type="text"
              className="form-control text-capitalize Color404  rounded-0"
              placeholder="Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => SetEmployee_name(e.target.value)}
            />
            {employee_name?.length < 4 || employee_name === undefined ? null : (
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "15px",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
          </div>
          {fieldsError?.employee_name
            ? fieldsError?.employee_name.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Start Date
            </span>
            <input
              type="date"
              className="form-control text-capitalize Color404  rounded-0"
              placeholder="Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => SetStart_date(e.target.value)}
            />
            {start_date?.length < 4 || start_date === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "30px",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
          </div>
          {fieldsError?.start_date
            ? fieldsError?.start_date.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          {/* <div className="form-check my-2">
          <input
            className="form-check-input rounded-0"
            type="checkbox"
            value=""
            id="CurrentEmployee"
            onClick={handleChange}
          /> */}
          {/* <label className="form-check-label rounded-0" for="CurrentEmployee">
            Current Employee?
          </label> */}
          {/* </div> */}
          {current === 1 ? (
            <>
              <div
                className="input-group mb-3"
                style={{ height: "fit-content" }}
              >
                <span
                  className="input-group-text rounded-0 hinpt mcx404"
                  id="basic-addon1"
                >
                  Year in Profession
                </span>
                <input
                  placeholder="Required"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) =>
                    handleFormatNumber(
                      e,
                      Set_year_profession,
                      "year_profession"
                    )
                  }
                  className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                  type="text"
                  onBlur={() => steediting(true)}
                  onFocus={() => steediting(false)}
                  value={`${
                    year_profession === undefined ? 0 : year_profession
                  }${editing === true ? ".00" : ""}`}
                  // pattern="^[\d,]+$"

                  name=""
                  id=""
                />
                {year_profession?.length < 7 ||
                year_profession === undefined ||
                year_profession === null ? null : (
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "25px",
                      top: "10px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              {fieldsError?.year_profession
                ? fieldsError?.year_profession.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
              <div className="input-group mb-3">
                <span
                  style={{ maxWidth: "30%" }}
                  className="input-group-text fontSW27"
                  id="basic-addon1"
                >
                  Month in Profession
                </span>
                <input
                  placeholder="Required"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) =>
                    handleFormatNumber(
                      e,
                      Set_month_profession,
                      "month_profession"
                    )
                  }
                  className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                  type="text"
                  onBlur={() => steediting(true)}
                  onFocus={() => steediting(false)}
                  value={`${
                    month_profession === undefined ? 0 : month_profession
                  }${editing === true ? ".00" : ""}`}
                  // pattern="^[\d,]+$"

                  name=""
                  id=""
                />
                {month_profession?.length < 7 ||
                month_profession === undefined ||
                month_profession === null ? null : (
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "25px",
                      top: "10px",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              {fieldsError?.month_profession
                ? fieldsError?.month_profession.map((e) => (
                    <p className="text-danger col-lg-12">{e}</p>
                  ))
                : null}
            </>
          ) : (
            <>
              <div className="input-group mb-3">
                <span
                  className="input-group-text rounded-0 mcx404"
                  id="basic-addon1"
                >
                  End Date
                </span>
                <input
                  type="date"
                  className="form-control text-capitalize Color404  rounded-0"
                  placeholder="Required"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => Set_end_date(e.target.value)}
                />
                {end_date?.length < 4 || end_date === undefined ? null : (
                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      position: "absolute",
                      right: "30px",
                      top: "10px",
                      color: "green",
                      zIndex: "123",
                    }}
                  >
                    ✔
                  </p>
                )}
              </div>
              {fieldsError?.end_date
                ? fieldsError?.end_date.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
            </>
          )}
          {/* <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            End Date
          </span>
          <input
            type="date"
            className="form-control text-capitalize Color404 "
            placeholder="Required"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div> */}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Official Address
            </span>
            <input
              type="text"
              className="form-control text-capitalize Color404  rounded-0"
              placeholder="Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => Set_office_address(e.target.value)}
            />
            {office_address?.length < 4 ||
            office_address === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "15px",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
          </div>
          {fieldsError?.office_address
            ? fieldsError?.office_address.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Position
            </span>
            <input
              placeholder="Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Setposition, "position")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${position === undefined ? 0 : position}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {position?.length < 4 || position === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "15px",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
          </div>
          {fieldsError?.position
            ? fieldsError?.position.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Work Phone
            </span>
            <input
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              className="form-control text-capitalize text-capitalize text-lowercase BgColors"
              placeholder="(xxx) xxx-xxxx"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={work_phone}
              onChange={(e) => handlePhoneNumberChange(e, Set_work_phone)}
            />
            {work_phone?.length < 4 || work_phone === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  zIndex: "123",
                  color: "green",
                }}
              >
                ✔
              </p>
            )}
            <input
              placeholder="Ext."
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Set_ext, "ext")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${ext === undefined ? 0 : ext}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {ext?.length < 4 || ext === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "14px",
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

          <h6 className="mt-5 mb-3">INCOME DETAILS</h6>

          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Base
            </span>
            <input
              placeholder="Amount Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Set_base, "ext")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${base === undefined ? 0 : base}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"
              name=""
              id=""
            />
            {base?.length < 4 || base === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  zIndex: "123",
                  color: "green",
                }}
              >
                ✔
              </p>
            )}
            <select
              className={`form-select rounded-0 ${
                base_type === undefined ||
                base_type === null ||
                base_type === ""
                  ? "text-dark"
                  : "text-success"
              }`}
              id="inputGroupSelect02"
              value={base_type}
              onChange={(e) => handleSelectChange(e)}
            >
              <option value="Select">Select</option>
              <option value="ANNUALLY">
                ANNUALLY{" "}
                {base_type === "ANNUALLY" && (
                  <span className="tick-mark2">✔</span>
                )}
              </option>
              <option value="MONTHLY">
                MONTHLY{" "}
                {base_type === "MONTHLY" && (
                  <span className="tick-mark2">✔</span>
                )}
              </option>
            </select>
          </div>
          <div className="col-lg-">
            {fieldsError?.base
              ? fieldsError?.base.map((e) => <p className="text-danger">{e}</p>)
              : null}
            {fieldsError?.base_type
              ? fieldsError?.base_type.map((e) => (
                  <p className="text-danger">{e}</p>
                ))
              : null}
          </div>
          {self_employed === 1 ? (
            <>
              <div className="input-group mb-3">
                <span
                  className="input-group-text rounded-0 mcx404"
                  id="basic-addon1"
                >
                  ownership share
                </span>
                <select
                  className={`form-select rounded-0 ${
                    ownership_share === undefined ||
                    ownership_share === null ||
                    ownership_share === ""
                      ? "text-dark"
                      : "text-success"
                  }`}
                  id="inputGroupSelect02"
                  onChange={(e) => handleSelectChangeForOwnership_share(e)}
                >
                  <option>select ownership share</option>
                  <option value="25%ORMORE">
                    share 25% OR MORE{" "}
                    {ownership_share === "25%ORMORE" && <span>✔</span>}
                  </option>
                  <option value="LESSTHAN25%">
                    share LESS THAN 25%{" "}
                    {ownership_share === "LESSTHAN25%" && <span>✔</span>}
                  </option>
                </select>
                {console.log(ownership_share, "ownership_share")}
              </div>
              {fieldsError?.ownership_share
                ? fieldsError?.ownership_share.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
            </>
          ) : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Bonus
            </span>
            <input
              placeholder="Optional"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Setbonus, "ext")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${bonus === undefined ? 0 : bonus}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {bonus?.length < 4 || bonus === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  zIndex: "123",
                  color: "green",
                }}
              >
                ✔
              </p>
            )}
            <select
              className={`form-select rounded-0 ${
                bonus_type === undefined ||
                bonus_type === null ||
                bonus_type === ""
                  ? "text-dark"
                  : "text-success"
              }`}
              id="inputGroupSelect02"
              onChange={(e) => handleSelectChangeForBonus(e)}
            >
              <option value="Select">Select</option>
              <option value="ANNUALLY">
                ANNUALLY {bonus_type === "ANNUALLY" && <span>✔</span>}
              </option>
              <option value="MONTHLY">
                MONTHLY {bonus_type === "MONTHLY" && <span>✔</span>}
              </option>
            </select>
          </div>
          {fieldsError?.bonus
            ? fieldsError?.bonus.map((e) => <p className="text-danger">{e}</p>)
            : null}
          {fieldsError?.bonus_type
            ? fieldsError?.bonus_type.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Commissions
            </span>
            <input
              placeholder="Optional"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Setcommission, "ext")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${commission === undefined ? 0 : commission}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {commission?.length < 4 || commission === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  zIndex: "123",
                  color: "green",
                }}
              >
                ✔
              </p>
            )}
            <select
              className={`form-select rounded-0 ${
                commission_type === undefined ||
                commission_type === null ||
                commission_type === ""
                  ? "text-dark"
                  : "text-success"
              }`}
              id="inputGroupSelect02"
              onChange={(e) => handleSelectChangeForCommision(e)}
            >
              <option value="Select">Select</option>
              <option value="ANNUALLY">
                ANNUALLY {commission_type === "ANNUALLY" && <span>✔</span>}
              </option>
              <option value="MONTHLY">
                MONTHLY {commission_type === "MONTHLY" && <span>✔</span>}
              </option>
            </select>
          </div>
          {fieldsError?.commission
            ? fieldsError?.commission.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          {fieldsError?.commission_type
            ? fieldsError?.commission_type.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Overtime
            </span>
            <input
              placeholder="Optional"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Set_overtime, "overtime")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${overtime === undefined ? 0 : overtime}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {overtime?.length < 4 || overtime === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  color: "green",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
            <select
              className={`form-select rounded-0 ${
                overtime_type === undefined ||
                overtime_type === null ||
                overtime_type === ""
                  ? "text-dark"
                  : "text-success"
              }`}
              id="inputGroupSelect02"
              onChange={(e) => handleSelectChangeForOverTime(e)}
            >
              <option value="Select">Select</option>
              <option value="ANNUALLY">
                ANNUALLY {overtime_type === "ANNUALLY" && <span>✔</span>}
              </option>
              <option value="MONTHLY">
                MONTHLY {overtime_type === "MONTHLY" && <span>✔</span>}
              </option>
            </select>
          </div>
          {fieldsError?.overtime
            ? fieldsError?.overtime.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          {fieldsError?.overtime_type
            ? fieldsError?.overtime_type.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          <div className="input-group mb-3">
            <span
              className="input-group-text rounded-0 mcx404"
              id="basic-addon1"
            >
              Other
            </span>
            <input
              placeholder="Optional"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleFormatNumber(e, Set_other, "ext")}
              className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
              type="text"
              // step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${other === undefined ? 0 : other}${
                editing === true ? ".00" : ""
              }`}
              // pattern="^[\d,]+$"

              name=""
              id=""
            />
            {other?.length < 4 || other === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  top: "10px",
                  zIndex: "123",
                  color: "green",
                }}
              >
                ✔
              </p>
            )}
            <select
              className={`form-select rounded-0 ${
                other_type === undefined ||
                other_type === null ||
                other_type === ""
                  ? "text-dark"
                  : "text-success"
              }`}
              id="inputGroupSelect02"
              onChange={(e) => handleSelectChangeForOther(e)}
            >
              <option value="Select">Select</option>
              <option value="ANNUALLY">
                ANNUALLY {other_type === "ANNUALLY" && <span>✔</span>}
              </option>
              <option value="MONTHLY">
                MONTHLY {other_type === "MONTHLY" && <span>✔</span>}
              </option>
            </select>
          </div>
          {fieldsError?.other
            ? fieldsError?.other.map((e) => <p className="text-danger">{e}</p>)
            : null}
          {fieldsError?.other_type
            ? fieldsError?.other_type.map((e) => (
                <p className="text-danger">{e}</p>
              ))
            : null}
          {current === 1 ? (
            <div className="form-check mt-4 mx-2">
              <input
                type="checkbox"
                className="form-check-label rounded-0"
                onChange={handleSelectChangeForSeasonal_income}
              />
              Seasonal Income
              <input
                type="checkbox"
                className="form-check-label rounded-0"
                onChange={handleSelectChangeForForiegnIncome}
              />
              Foreign Income
            </div>
          ) : null}

          <div className="form-check mt-4 mx-2">
            <input
              className="form-check-input rounded-0"
              type="checkbox"
              value=""
              id="Employed"
              onChange={handleChangeforEmployFamily}
            />
            <label
              className="form-check-label rounded-0"
              id="EmployText"
              for="Employed"
            >
              Employed by a family member, property seller, real estate agent,
              etc.
            </label>
          </div>
          <div className="d-flex my-4 w-25                                    ">
            <button
              className="btn btn-primary mx-2 px-md-2 w-100 rounded-0"
              onClick={AddBaseIncome}
            >
              SAVE
            </button>
            <button
              className="btn btn-light mx-2 px-md-1 border rounded-0 w-100"
              onClick={onCancel}
            >
              CLOSE
            </button>
          </div>
        </form>
      </div>
      {/* <div className="naimImages" style={{width:"80%", paddingTop:"15px",bottom:"0px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" alt="" /> </div> */}
      <div className="footerx4020" style={{ marginTop: "66px" }}>
        <hr />
        <img src={Footerx404} alt="" width="100%" height="50%" />
      </div>
    </>
  );
}

export default Base;
