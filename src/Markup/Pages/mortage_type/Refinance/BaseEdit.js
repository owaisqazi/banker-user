import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import Header from "../../../Layout/Header";
import RefSideBar from "./RefSideBar";
import { useParams, useHistory } from "react-router-dom";
import ReFooter from "./ReFooter";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const BaseEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  //   setIdFromParams(id);
  const [current, Setcurrent] = useState(0);

  const Assign_id = localStorage.getItem("assignId");
  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();

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
  const [primary, Setprimary] = useState(0);
  const [foreign_income, Set_foreign_income] = useState(0);
  const [month_profession, Set_month_profession] = useState("");
  const [ownership_share, Set_ownership_share] = useState("");
  const [seasonal_income, Set_seasonal_income] = useState(0);
  const [year_profession, Set_year_profession] = useState(0);

  const getBaseincome = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "Get",
      url: `${Baseurl.baseurl}mortgage/refinance/get/income/record/${id}`,
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
          setLoader(false);
          console.log(response?.data?.message, "response?.data?.message");
          console.log(response?.data?.data[0], "response?.data?.message");
          const {
            current,
            primary,
            self_employed,
            employee_name,
            start_date,
            current_emp,
            year_profession,
            month_profession,
            office_address,
            position,
            work_phone,
            ext,
            base,
            base_type,
            bonus,
            bonus_type,
            commission,
            commission_type,
            overtime,
            overtime_type,
            other,
            other_type,
            seasonal_income,
            foreign_income,
            employed_family_member,
            ownership_share,
          } = response?.data?.data[0];
          console.log(ownership_share, "response?.data?.ownership_share");
          console.log(bonus_type, bonus, "response?.data?.message");
          Setcurrent(current);
          Setprimary(primary);
          Setself_employed(self_employed);
          Set_seasonal_income(seasonal_income);
          Set_other(other);
          Set_other_type(other_type);
          Set_foreign_income(foreign_income);
          Setemployed_family_member(employed_family_member);
          SetEmployee_name(employee_name);
          SetStart_date(start_date);
          Set_current_emp(current_emp);
          Set_end_date(end_date);
          Set_office_address(office_address);
          Setposition(position);
          Set_work_phone(work_phone);
          Set_ext(ext);
          Setbase_type(base_type);
          Set_base(base);
          Setbonus(bonus);
          Set_bonus_type(bonus_type);
          Set_commission_type(commission_type);
          Set_overtime_type(overtime_type);
          Setcommission(commission);
          Set_overtime(overtime);
          Setcommission(commission);
          Setcommission(commission);
          Set_overtime(overtime);
          Set_ownership_share(ownership_share);
          Set_month_profession(month_profession);
          Set_year_profession(year_profession);

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
        console.log(error);
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

  useEffect(() => {
    getBaseincome();
  }, []);

  const Data = new FormData();
  const Year_profession =
    typeof year_profession === "string"
      ? year_profession.replace(/\D/g, "")
      : "";
  const Month_profession =
    typeof month_profession === "string"
      ? month_profession.replace(/\D/g, "")
      : "";
  Data.append("id", id);
  Data.append("base_employment_income", 1);
  Data.append("military_employment_income", 0);
  Data.append("other_income", 0);
  Data.append("application_id", Assign_id || "");
  Data.append("current", current);
  Data.append("employee_name", employee_name || "");
  Data.append("start_date", start_date || "");
  Data.append("current_emp", current_emp);
  Data.append("self_employed", self_employed);
  Data.append("end_date", end_date || "");
  Data.append("office_address", office_address || "");
  Data.append("position", position || "");
  Data.append("work_phone", work_phone || "");
  Data.append("ext", ext || "");
  Data.append("base_type", base_type || "");
  Data.append("base", base || "");
  Data.append("employed_family_member", employed_family_member ? 1 : 0);
  Data.append("bonus_type", bonus_type || "");
  Data.append("commission_type", commission_type || "");
  Data.append("overtime_type", overtime_type);
  Data.append("other_type", other_type || "");
  Data.append("bonus", bonus || "");
  Data.append("commission", commission || "");
  Data.append("overtime", overtime || "");
  Data.append("other", other || "");
  Data.append("primary", primary ? 1 : 0);
  Data.append("foreign_income", foreign_income ? 1 : 0);
  Data.append("month_profession", Month_profession || "");
  Data.append("ownership_share", ownership_share);
  Data.append("seasonal_income", seasonal_income ? 1 : 0);
  Data.append("year_profession", Year_profession || "");

  const EditBaseIncome = () => {
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
          setLoader(false);
          history.push("/ref/income");
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

  const handleChange = (event) => {
    if (event.target.checked) {
      Set_current_emp(1);
    } else {
      Set_current_emp(0);
    }
  };

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
      <Header />
      <div className="container-fluid">
        <div className="row">
          <RefSideBar />
          <div className="col-md-8 my-5 ps-lg-5 ">
            <div className="row">
              <div className="col-md-10">
                <h2 className="mt-4">Base Employment Income</h2>
                <div className="d-flex">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      checked={current === 1 ? true : false}
                      id="current"
                      onChange={handleChange1}
                    />
                    <label class="form-check-label" for="current">
                      Current
                    </label>
                  </div>
                  {current === 1 ? (
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-label"
                        id="primary"
                        onChange={handleChange0}
                        checked={primary === 1 ? true : false}
                      />
                      <label class="form-check-label" for="primary">
                        Primary
                      </label>
                    </div>
                  ) : null}

                  <div class="form-check ms-3 ms-md-5">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      checked={self_employed === 1 ? true : false}
                      onChange={handleChange2}
                      id="self employee"
                    />
                    <label class="form-check-label" for="self employee">
                      Self Employed
                    </label>
                  </div>
                </div>

                <h6 className="mt-5 mb-3">EMPLOYMENT DETAILS</h6>

                <form action="" onSubmit={handleSubmit}>
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Employer Name
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={employee_name}
                      onChange={(e) => SetEmployee_name(e.target.value)}
                    />
                    {employee_name?.length < 4 ||
                    employee_name === undefined ? null : (
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Start Date
                    </span>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={start_date}
                      onChange={(e) => SetStart_date(e.target.value)}
                    />
                    {start_date?.length < 4 ||
                    start_date === undefined ||
                    start_date === null ? null : (
                      <p
                        style={{
                          fontSize: "16px",
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
                  <div class="form-check my-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="CurrentEmployee"
                      checked={current_emp === 1 ? true : false}
                      onClick={handleChange}
                    />
                    <label
                      class="form-check-label"
                      style={{ width: "25%" }}
                      for="CurrentEmployee"
                    >
                      Current Employee?
                    </label>
                  </div>
                  {current === 1 ? (
                    <>
                      <div className="row">
                        <div class="input-group mb-3 col-lg-12">
                          <span
                            class="input-group-text"
                            style={{ maxWidth: "25%" }}
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
                            className="form-control123 m-0 ps-4 form-control rounded-0"
                            type="text"
                            onBlur={() => steediting(true)}
                            onFocus={() => steediting(false)}
                            value={`${
                              year_profession === undefined
                                ? 0
                                : year_profession
                            }${editing === true ? ".00" : ""}`}
                            // pattern="^[\d,]+$"

                            name=""
                            id=""
                          />
                          {year_profession?.length < 4 ||
                          year_profession === undefined ||
                          year_profession === null ? null : (
                            <p
                              style={{
                                fontSize: "17px",
                                fontWeight: "bold",
                                position: "absolute",
                                right: "25px",
                                top: "10px",
                                color: "green",
                                zIndex: "123",
                              }}
                            >
                              ✔
                            </p>
                          )}
                        </div>
                        {fieldsError?.month_profession
                          ? fieldsError?.month_profession.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}
                        <div class="input-group mb-3 col-lg-12">
                          <span
                            class="input-group-text col-lg-6"
                            style={{ maxWidth: "25%" }}
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
                            className="form-control123 m-0 ps-4 form-control rounded-0"
                            type="text"
                            onBlur={() => steediting(true)}
                            onFocus={() => steediting(false)}
                            value={`${
                              month_profession === undefined
                                ? 0
                                : month_profession
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
                                color: "green",
                                zIndex: "123",
                              }}
                            >
                              ✔
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        style={{ maxWidth: "25%" }}
                        id="basic-addon1"
                      >
                        End Date
                      </span>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Required"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={end_date}
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
                  )}
                  {fieldsError?.end_date
                    ? fieldsError?.end_date.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {/* <div class="input-group mb-3">
          <span class="input-group-text" style={{maxWidth:"25%"}} id="basic-addon1">
            End Date
          </span>
          <input
            type="date"
            class="form-control"
            placeholder="Required"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div> */}
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Official Address
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={office_address}
                      onChange={(e) => Set_office_address(e.target.value)}
                    />
                    {office_address?.length < 4 ||
                    office_address === undefined ||
                    office_address === null ? null : (
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Position
                    </span>
                    <input
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(e, Setposition, "position")
                      }
                      className="form-control123 m-0 ps-4 form-control rounded-0"
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
                    {position?.length < 4 ||
                    position === undefined ||
                    position === null ? null : (
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Work Phone
                    </span>
                    <input
                      type="tel"
                      pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                      className="form-control text-capitalize text-lowercase BgColors"
                      placeholder="(xxx) xxx-xxxx"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={work_phone}
                      onChange={(e) =>
                        handlePhoneNumberChange(e, Set_work_phone)
                      }
                    />
                    {work_phone?.length < 4 ||
                    work_phone === undefined ||
                    work_phone === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
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
                      className="form-control123 m-0 ps-4 form-control rounded-0"
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
                    {ext?.length < 4 ||
                    ext === undefined ||
                    ext === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "14px",
                          top: "10px",
                          color: "green",
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

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Base
                    </span>
                    <input
                      placeholder="Amount Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleFormatNumber(e, Set_base, "base")}
                      className="form-control123 m-0 ps-4 form-control rounded-0"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${base === undefined ? 0 : base}${
                        editing === true ? "" : ""
                      }`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {base?.length < 4 ||
                    base === undefined ||
                    base === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          zIndex: "123",
                          color: "green",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      class={`form-select rounded-0 ${
                        base_type === undefined || base_type === null
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={base_type}
                      onChange={(e) => handleSelectChange(e)}
                    >
                      {console.log(base_type, "base_type")}
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

                  {self_employed === 1 ? (
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        style={{ maxWidth: "25%" }}
                        id="basic-addon1"
                      >
                        Overnership Share
                      </span>
                      <select
                        class={`form-select rounded-0 ${
                          ownership_share === undefined || ownership_share === null
                            ? "text-dark"
                            : "text-success"
                        }`}
                        id="inputGroupSelect02"
                        onChange={(e) =>
                          handleSelectChangeForOwnership_share(e)
                        }
                        value={ownership_share}
                      >
                        <option value="25%ORMORE">
                          share 25% OR MORE{" "}
                          {ownership_share === "25%ORMORE" && (
                            <span className="tick-mark2">✔</span>
                          )}
                        </option>
                        <option value="LESSTHAN25%">
                          share LESS THAN 25%{" "}
                          {ownership_share === "LESSTHAN25%" && (
                            <span className="tick-mark2">✔</span>
                          )}
                        </option>
                      </select>
                    </div>
                  ) : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Bonus
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleFormatNumber(e, Setbonus, "bonus")}
                      className="form-control123 m-0 ps-4 form-control rounded-0"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${bonus === undefined ? 0 : bonus}${
                        editing === true ? "" : ""
                      }`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {bonus?.length < 4 ||
                    bonus === undefined ||
                    bonus === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          zIndex: "123",
                          color: "green",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      class={`form-select rounded-0 ${
                        bonus_type === undefined || bonus_type === null
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={bonus_type}
                      onChange={(e) => handleSelectChangeForBonus(e)}
                    >
                      <option value="ANNUALLY">
                        {" "}
                        ANNUALLY{" "}
                        {bonus_type === "ANNUALLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY
                        {bonus_type === "MONTHLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.bonus
                    ? fieldsError?.bonus.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {fieldsError?.bonus_type
                    ? fieldsError?.bonus_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Commissions
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(e, Setcommission, "commission")
                      }
                      className="form-control123 m-0 ps-4 form-control rounded-0"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${commission === undefined ? 0 : commission}${
                        editing === true ? "" : ""
                      }`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {commission?.length < 4 ||
                    commission === undefined ||
                    commission === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          zIndex: "123",
                          color: "green",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      class={`form-select rounded-0 ${
                        commission_type === undefined || commission_type === null
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={commission_type}
                      onChange={(e) => handleSelectChangeForCommision(e)}
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {commission_type === "ANNUALLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {commission_type === "MONTHLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Overtime
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(e, Set_overtime, "overtime")
                      }
                      className="form-control123 m-0 ps-4 form-control rounded-0"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${overtime === undefined ? 0 : overtime}${
                        editing === true ? "" : ""
                      }`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {overtime?.length < 4 ||
                    overtime === undefined ||
                    overtime === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          zIndex: "123",
                          color: "green",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      class={`form-select rounded-0 ${
                        overtime_type === undefined || overtime_type === null
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={overtime_type}
                      onChange={(e) => handleSelectChangeForOverTime(e)}
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {overtime_type === "ANNUALLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {overtime_type === "MONTHLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      style={{ maxWidth: "25%" }}
                      id="basic-addon1"
                    >
                      Other
                    </span>
                    <input
                      class="form-control"
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(e, Set_other, "other")
                      }
                      className="form-control123 m-0 ps-4 form-control rounded-0"
                      type="text"
                      // step="0.1"
                      // min='0'
                      // max='20'
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${other === undefined ? 0 : other}${
                        editing === true ? "" : ""
                      }`}
                      // pattern="^[\d,]+$"

                      name=""
                      id=""
                    />
                    {other?.length < 4 ||
                    other === undefined ||
                    other === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          zIndex: "123",
                          color: "green",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                       class={`form-select rounded-0 ${
                        other_type === undefined || other_type === null
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={other_type}
                      onChange={(e) => handleSelectChangeForOther(e)}
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {other_type === "ANNUALLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {other_type === "MONTHLY" && (
                          <span className="tick-mark2">✔</span>
                        )}
                      </option>
                    </select>
                  </div>
                  {current === 1 ? (
                    <div class="form-check mt-4 mx-2">
                      <input
                        type="checkbox"
                        class="form-check-label"
                        checked={seasonal_income === 1 ? true : false}
                        onChange={handleSelectChangeForSeasonal_income}
                      />
                      Seasonal Income
                      <input
                        type="checkbox"
                        class="form-check-label"
                        checked={foreign_income === 1 ? true : false}
                        onChange={handleSelectChangeForForiegnIncome}
                      />
                      Foreign Income
                    </div>
                  ) : null}

                  <div class="form-check mt-4 mx-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="Employed"
                      checked={employed_family_member === 1 ? true : false}
                      onChange={handleChangeforEmployFamily}
                    />
                    <label class="form-check-label" for="Employed">
                      Employed by a family member, property seller, real estate
                      agent, etc.
                    </label>
                  </div>
                  <div className="d-flex my-4">
                    <button
                      className="btn btn-primary mx-2 px-md-5 w-100"
                      onClick={EditBaseIncome}
                    >
                      EDIT
                    </button>
                    <Link
                      className="btn btn-light mx-2 px-md-5 w-100"
                      to={"/ref/income"}
                    >
                      Close
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            {/* <div>
              <hr/>
              <ReFooter />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseEdit;
