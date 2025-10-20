/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import Header from "../../../Layout/Header";
import RefSideBar from "./RefSideBar";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MilitaryEdit = () => {
  const history = useHistory();

  const { id } = useParams();

  const Assign_id = localStorage.getItem("assignId");
  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();
  const [primary, Setprimary] = useState(0);
  const [employee_name, SetEmployee_name] = useState("");
  const [start_date, SetStart_date] = useState("");
  const [current_emp, Set_current_emp] = useState(0);
  const [end_date, Set_end_date] = useState("");
  const [office_address, Set_office_address] = useState("");
  const [position, Setposition] = useState("");
  const [work_phone, Set_work_phone] = useState("");
  const [ext, Set_ext] = useState("");
  const [military_base_type, Setmilitary_base_type] = useState("");
  const [military_base, Setmilitary_base] = useState("");
  const [military_clothe_allowance_type, Set_military_clothe_allowance_type] =
    useState("");
  const [military_combat_pay_type, Set_military_combat_pay_type] = useState("");
  const [military_flight_pay_type, Set_military_flight_pay_type] = useState("");
  const [military_hazard_pay_type, Set_military_hazard_pay_type] = useState("");
  const [military_overseas_pay_type, Set_military_overseas_pay_type] =
    useState("");
  const [military_prop_pay_type, Set_military_prop_pay_type] = useState("");
  const [military_quarter_allowance_type, Set_military_quarter_allowance_type] =
    useState("");
  const [military_ration_allowance_type, Set_military_ration_allowance_type] =
    useState("");
  const [
    military_variable_housing_allowance_type,
    Set_military_variable_housing_allowance_type,
  ] = useState("");

  const [military_clothe_allowance, Set_military_clothe_allowance] =
    useState("");
  const [military_combat_pay, Set_military_combat_pay] = useState("");
  const [military_flight_pay, Set_military_flight_pay] = useState("");
  const [military_hazard_pay, Set_military_hazard_pay] = useState("");
  const [military_overseas_pay, Set_military_overseas_pay] = useState("");
  const [military_prop_pay, Set_military_prop_pay] = useState("");
  const [military_quarter_allowance, Set_military_quarter_allowance] =
    useState("");
  const [military_ration_allowance, Set_military_ration_allowance] =
    useState("");
  const [
    military_variable_housing_allowance,
    Set_military_variable_housing_allowance,
  ] = useState("");
  const [year_profession, Set_year_profession] = useState("");
  const [month_profession, Set_month_profession] = useState("");
  const [seasonal_income, Set_seasonal_income] = useState(0);
  const [foreign_income, Set_foreign_income] = useState(0);
  const [employed_family_member, Set_employed_family_member] = useState(0);

  const getMilitaryIncome = () => {
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
          const {
            current,
            primary,
            start_date,
            employed_family_member,
            seasonal_income,
            foreign_income,
            military_variable_housing_allowance,
            military_variable_housing_allowance_type,
            military_ration_allowance_type,
            military_ration_allowance,
            military_quarter_allowance_type,
            military_quarter_allowance,
            military_prop_pay_type,
            military_prop_pay,
            military_overseas_pay,
            military_overseas_pay_type,
            military_hazard_pay,
            military_hazard_pay_type,
            military_flight_pay,
            military_flight_pay_type,
            military_combat_pay,
            military_combat_pay_type,
            military_clothe_allowance,
            military_clothe_allowance_type,
            military_base,
            military_base_type,
            year_profession,
            work_phone,
            ext,
            position,
            employee_name,
            month_profession,
            office_address,
          } = response?.data?.data[0];

          Setprimary(primary);
          Set_current_emp(current);
          SetEmployee_name(employee_name);
          Set_seasonal_income(seasonal_income);
          Set_foreign_income(foreign_income);
          Set_employed_family_member(employed_family_member);
          SetStart_date(start_date);
          Set_end_date(end_date);
          Set_office_address(office_address);
          Setposition(position);
          Set_work_phone(work_phone);
          Set_ext(ext);
          Set_month_profession(month_profession);
          Set_year_profession(year_profession);
          Setmilitary_base_type(military_base_type);
          Setmilitary_base(military_base);

          Set_military_clothe_allowance_type(military_clothe_allowance_type);
          Set_military_clothe_allowance(military_clothe_allowance);
          Set_military_combat_pay(military_combat_pay);
          Set_military_combat_pay_type(military_combat_pay_type);
          Set_military_hazard_pay(military_hazard_pay);
          Set_military_hazard_pay_type(military_hazard_pay_type);
          Set_military_overseas_pay(military_overseas_pay);
          Set_military_overseas_pay_type(military_overseas_pay_type);
          Set_military_prop_pay_type(military_prop_pay_type);
          Set_military_prop_pay(military_prop_pay);
          Set_military_quarter_allowance(military_quarter_allowance);
          Set_military_quarter_allowance_type(military_quarter_allowance_type);
          Set_military_ration_allowance(military_ration_allowance);
          Set_military_ration_allowance_type(military_ration_allowance_type);
          Set_military_variable_housing_allowance(
            military_variable_housing_allowance
          );
          Set_military_flight_pay_type(military_flight_pay_type);
          Set_military_flight_pay(military_flight_pay);

          Set_ext(ext);
          Set_military_variable_housing_allowance_type(
            military_variable_housing_allowance_type
          );

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

        // setLoader(false);
        // window.scrollTo({
        //   top: 0,
        //   behavior: "smooth",
        // });
        // setFieldsError(error?.response?.data?.errors);
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
      });
  };

  useEffect(() => {
    getMilitaryIncome();
  }, []);

  const Data = new FormData();
  const Month_profession = ("" + month_profession).replace(/\D/g, "");
  const Year_profession = ("" + year_profession).replace(/\D/g, "");
  Data.append("base_employment_income", 0);
  Data.append("military_employment_income", 1);
  Data.append("other_income", 0);
  Data.append("application_id", Assign_id || "");
  Data.append("current", current_emp || "");
  // Data.append("current_emp", current_emp || "");
  Data.append("employee_name", employee_name || "");
  Data.append("start_date", start_date || "");
  Data.append("end_date", end_date || "");
  Data.append("office_address", office_address || "");
  Data.append("position", position || "")
  Data.append("work_phone", work_phone || "");
  Data.append("ext", ext || "");
  Data.append("military_base_type", military_base_type || "");
  Data.append("military_base", military_base || "");
  Data.append(
    "military_clothe_allowance_type",
    military_clothe_allowance_type || ""
  );
  Data.append("military_combat_pay_type", military_combat_pay_type || "");
  Data.append("primary", primary || "");

  Data.append("military_flight_pay_type", military_flight_pay_type || "");
  Data.append("military_hazard_pay_type", military_hazard_pay_type || "");
  Data.append("military_overseas_pay_type", military_overseas_pay_type || "");
  Data.append("military_prop_pay_type", military_prop_pay_type || "");
  Data.append(
    "military_quarter_allowance_type",
    military_quarter_allowance_type || ""
  );
  Data.append(
    "military_quarter_allowance_type",
    military_quarter_allowance_type || ""
  );
  Data.append(
    "military_ration_allowance_type",
    military_ration_allowance_type || ""
  );
  Data.append(
    "military_variable_housing_allowance_type",
    military_variable_housing_allowance_type || ""
  );
  Data.append("employed_family_member", employed_family_member?1:0);
  Data.append("military_clothe_allowance", military_clothe_allowance || "");

  Data.append("military_combat_pay", military_combat_pay || "");
  Data.append("military_flight_pay", military_flight_pay || "");
  Data.append("military_hazard_pay", military_hazard_pay || "");
  Data.append("military_overseas_pay", military_overseas_pay || "");
  Data.append("military_prop_pay", military_prop_pay || "");
  Data.append("military_quarter_allowance", military_quarter_allowance || "");
  Data.append("military_ration_allowance", military_ration_allowance || "");
  Data.append(
    "military_variable_housing_allowance",
    military_variable_housing_allowance || ""
  );
  Data.append("year_profession", Year_profession || "");
  Data.append("month_profession", Month_profession || "");
  Data.append("seasonal_income", seasonal_income?1:0);
  Data.append("foreign_income", foreign_income?1:0);
  Data.append("id", id || "");

  const EditMilitryIncome = () => {
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

  const handleChange = (event) => {
    if (event.target.checked) {
      Set_current_emp(1);
    } else {
      Set_current_emp(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function handleSelectChangeForMilitryBase(event) {
    Setmilitary_base_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_clothe_allowance_type(event) {
    Set_military_clothe_allowance_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_combat_pay_type(event) {
    Set_military_combat_pay_type(event.target.value);
    console.log(event.target.value, "event.target.value combbat pay");
  }

  function handleSelectChangeForMilitary_flight_pay_type(event) {
    Set_military_flight_pay_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_hazard_pay_type(event) {
    Set_military_hazard_pay_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_overseas_pay_type(event) {
    Set_military_overseas_pay_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_prop_pay_type(event) {
    Set_military_prop_pay_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_quarter_allowance_type(event) {
    Set_military_quarter_allowance_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_ration_allowance_type(event) {
    Set_military_ration_allowance_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForMilitary_variable_housing_allowance_type(
    event
  ) {
    Set_military_variable_housing_allowance_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  const handleChangeforEmployFamily = (event) => {
    if (event.target.checked) {
      Set_employed_family_member(1);
    } else {
      Set_employed_family_member(0);
    }
  };

  const handleChange0 = (event) => {
    if (event.target.checked) {
      Setprimary(1);
    } else {
      Setprimary(0);
    }
  };

  const handleChange2 = (event) => {
    if (event.target.checked) {
      Set_seasonal_income(1);
    } else {
      Set_seasonal_income(0);
    }
  };

  const handleChange3 = (event) => {
    if (event.target.checked) {
      Set_foreign_income(1);
    } else {
      Set_foreign_income(0);
    }
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
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    // Format the numeric value using toLocaleString
    const formattedValue = Number(numericValue).toLocaleString();
    state(formattedValue);
  }
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
      {loader ? <div className="loader"></div> : null}
      <Header />
      <div className="container-fluid">
        <div className="row">
          <RefSideBar />
          <div className="col-md-8 my-5 ps-lg-5 ">
            <div className="row">
              <div className="col-md-10">
                <h2 className="mt-4">Military Employment Income</h2>
                <div className="d-flex">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="current"
                      checked={current_emp === 1 ? true : false}
                      onChange={handleChange}
                    />
                    <label class="form-check-label" for="current">
                      Current
                    </label>
                  </div>

                  <div class="form-check ms-3 ms-md-5">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="primary"
                      checked={primary === 1 ? true : false}
                      onChange={handleChange0}
                    />
                    <label class="form-check-label" for="primary">
                      Primary
                    </label>
                  </div>
                </div>

                <h6 className="mt-5">EMPLOYMENT DETAILS</h6>

                <form action="" onSubmit={handleSubmit}>
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
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
                    employee_name === undefined ||
                    employee_name === null ? null : (
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
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
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
                  {current_emp === 1 ? null : (
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="basic-addon1"
                        style={{ maxWidth: "30%" }}
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
                      {end_date?.length < 4 ||
                      end_date === undefined ||
                      end_date === null ? null : (
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
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
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Position
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={position}
                      onChange={(e) => Setposition(e.target.value)}
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
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
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
                          right: "37%",
                          top: "10px",
                          color: "green",
                          zIndex: "123",
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
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${ext === undefined ? 0 : ext}${
                        editing === true ? "" : ""
                      }`}
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
                  {fieldsError?.ext
                    ? fieldsError?.ext.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {current_emp === 1 ? (
                    <>
                      <div class="input-group mb-3">
                        <span
                          class="input-group-text"
                          id="basic-addon1"
                          style={{ maxWidth: "30%" }}
                        >
                          Year profession
                        </span>{" "}
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
                          }${editing === true ? "" : ""}`}
                          // pattern="^[\d,]+$"

                          name=""
                          id=""
                        />{" "}
                        {year_profession?.length < 8 ||
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
                              color: "green",
                            }}
                          >
                            ✔
                          </p>
                        )}
                      </div>{" "}
                      {fieldsError?.year_profession
                        ? fieldsError?.year_profession.map((e) => (
                            <p className="text-danger">{e}</p>
                          ))
                        : null}
                      <div class="input-group mb-3">
                        <span
                          class="input-group-text"
                          id="basic-addon1"
                          style={{ maxWidth: "30%" }}
                        >
                          Month profession
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
                            month_profession === undefined
                              ? 0
                              : month_profession
                          }${editing === true ? "" : ""}`}
                        />{" "}
                        {month_profession?.length < 8 ||
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
                              color: "green",
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
                    </>
                  ) : (
                    <div class="input-group mb-3">
                      <span
                        class="input-group-text"
                        id="basic-addon1"
                        style={{ maxWidth: "30%" }}
                      >
                        Work Phone
                      </span>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Required"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={work_phone}
                        onChange={(e) => Set_work_phone(e.target.value)}
                      />
                    </div>
                  )}
                  {fieldsError?.work_phone
                    ? fieldsError?.work_phone.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <h6 className="my-5">EMPLOYMENT DETAILS</h6>

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Militry Base
                    </span>
                    <input
                      placeholder="Amount Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(e, Setmilitary_base, "military_base")
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_base === undefined ? 0 : military_base
                      }${editing === true ? "" : ""}`}
                    />
                    {military_base?.length < 4 ||
                    military_base === undefined ||
                    military_base === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_base_type === undefined || military_base_type === null||
                        military_base_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_base_type}
                      onChange={(e) => handleSelectChangeForMilitryBase(e)}
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY {military_base_type === "ANNUALLY" && <span className="tick-mark2">✔</span>}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {military_base_type === "MONTHLY" &&<span className="tick-mark2">✔</span>}</option>
                    </select>
                  </div>
                  {fieldsError?.military_base
                    ? fieldsError?.military_base.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  {fieldsError?.military_base_type
                    ? fieldsError?.military_base_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Clothes Allowance
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_clothe_allowance,
                          "military_clothe_allowance"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_clothe_allowance === undefined
                          ? 0
                          : military_clothe_allowance
                      }${editing === true ? "" : ""}`}
                    />
                    {military_clothe_allowance?.length < 4 ||
                    military_clothe_allowance === undefined ||
                    military_clothe_allowance === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_clothe_allowance_type === undefined || military_clothe_allowance_type === null||
                        military_clothe_allowance_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_clothe_allowance_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_clothe_allowance_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_clothe_allowance_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {military_clothe_allowance_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_clothe_allowance_type
                    ? fieldsError?.military_clothe_allowance_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Combat Pay
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_combat_pay,
                          "military_combat_pay"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_combat_pay === undefined
                          ? 0
                          : military_combat_pay
                      }${editing === true ? "" : ""}`}
                    />
                    {military_combat_pay?.length < 4 ||
                    military_combat_pay === undefined ||
                    military_combat_pay === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_combat_pay_type === undefined || military_combat_pay_type === null||
                        military_combat_pay_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_combat_pay_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_combat_pay_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_combat_pay_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {military_combat_pay_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_combat_pay_type
                    ? fieldsError?.military_combat_pay_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Flight Pay
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_flight_pay,
                          "military_flight_pay"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_flight_pay === undefined
                          ? 0
                          : military_flight_pay
                      }${editing === true ? "" : ""}`}
                    />
                    {military_flight_pay?.length < 4 ||
                    military_flight_pay === undefined ||
                    military_flight_pay === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_flight_pay_type === undefined || military_flight_pay_type === null||
                        military_flight_pay_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_flight_pay_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_flight_pay_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_flight_pay_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {military_flight_pay_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_flight_pay_type
                    ? fieldsError?.military_flight_pay_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Hazard Pay
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_hazard_pay,
                          "military_hazard_pay"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_hazard_pay === undefined
                          ? 0
                          : military_hazard_pay
                      }${editing === true ? "" : ""}`}
                    />
                    {military_hazard_pay?.length < 4 ||
                    military_hazard_pay === undefined ||
                    military_hazard_pay === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_hazard_pay_type === undefined || military_hazard_pay_type === null||
                        military_hazard_pay_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_hazard_pay_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_hazard_pay_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_hazard_pay_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {military_hazard_pay_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_hazard_pay_type
                    ? fieldsError?.military_hazard_pay_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Overseas Pay
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_overseas_pay,
                          "military_overseas_pay"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_overseas_pay === undefined
                          ? 0
                          : military_overseas_pay
                      }${editing === true ? "" : ""}`}
                    />
                    {military_overseas_pay?.length < 4 ||
                    military_overseas_pay === undefined ||
                    military_overseas_pay === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_overseas_pay_type === undefined || military_overseas_pay_type === null||
                        military_overseas_pay_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_overseas_pay_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_overseas_pay_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_overseas_pay_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {military_overseas_pay_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_overseas_pay_type
                    ? fieldsError?.military_overseas_pay_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Prop Pay
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_prop_pay,
                          "military_prop_pay"
                        )
                      }
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_prop_pay === undefined ? 0 : military_prop_pay
                      }${editing === true ? "" : ""}`}
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                    />
                    <select
                      className={`form-select rounded-0 ${
                        military_prop_pay_type === undefined || military_prop_pay_type === null||
                        military_prop_pay_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_prop_pay_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_prop_pay_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY {military_prop_pay_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {military_prop_pay_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_prop_pay_type
                    ? fieldsError?.military_prop_pay_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Quarters Allowance
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_quarter_allowance,
                          "military_quarter_allowance"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_quarter_allowance === undefined
                          ? 0
                          : military_quarter_allowance
                      }${editing === true ? "" : ""}`}
                    />
                    {military_quarter_allowance?.length < 4 ||
                    military_quarter_allowance === undefined ||
                    military_quarter_allowance === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_quarter_allowance_type === undefined || military_quarter_allowance_type === null||
                        military_quarter_allowance_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_quarter_allowance_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_quarter_allowance_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_quarter_allowance_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {military_quarter_allowance_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_quarter_allowance_type
                    ? fieldsError?.military_quarter_allowance_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Rations Allowance
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_ration_allowance,
                          "military_ration_allowance"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_ration_allowance === undefined
                          ? 0
                          : military_ration_allowance
                      }${editing === true ? "" : ""}`}
                    />
                    {military_ration_allowance?.length < 4 ||
                    military_ration_allowance === undefined ||
                    military_ration_allowance === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_ration_allowance_type === undefined || military_ration_allowance_type === null||
                        military_ration_allowance_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_ration_allowance_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_ration_allowance_type(e)
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_ration_allowance_type === "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {military_ration_allowance_type === "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_ration_allowance_type
                    ? fieldsError?.military_ration_allowance_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span
                      class="input-group-text"
                      id="basic-addon1"
                      style={{ maxWidth: "30%" }}
                    >
                      Military Variable Housing Allowance
                    </span>
                    <input
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        handleFormatNumber(
                          e,
                          Set_military_variable_housing_allowance,
                          "military_variable_housing_allowance"
                        )
                      }
                      className="form-control text-capitalize123 m-0 ps-4 form-control text-capitalize rounded-0"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${
                        military_variable_housing_allowance === undefined
                          ? 0
                          : military_variable_housing_allowance
                      }${editing === true ? "" : ""}`}
                    />
                    {military_variable_housing_allowance?.length < 4 ||
                    military_variable_housing_allowance === undefined ||
                    military_variable_housing_allowance === null ? null : (
                      <p
                        style={{
                          fontSize: "17px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "38%",
                          top: "10px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      className={`form-select rounded-0 ${
                        military_variable_housing_allowance_type === undefined || military_variable_housing_allowance_type === null||
                        military_variable_housing_allowance_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={military_variable_housing_allowance_type}
                      onChange={(e) =>
                        handleSelectChangeForMilitary_variable_housing_allowance_type(
                          e
                        )
                      }
                    >
                      <option value="Select">Select</option>
                      <option value="ANNUALLY">
                        ANNUALLY{" "}
                        {military_variable_housing_allowance_type ===
                          "ANNUALLY" && "✔"}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY{" "}
                        {military_variable_housing_allowance_type ===
                          "MONTHLY" && "✔"}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.military_variable_housing_allowance_type
                    ? fieldsError?.military_variable_housing_allowance_type.map(
                        (e) => <p className="text-danger">{e}</p>
                      )
                    : null}

                  <div className="d-flex mt-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="Seasonal"
                        checked={seasonal_income === 1 ? true : false}
                        onChange={handleChange2}
                      />
                      <label class="form-check-label" for="Seasonal">
                        Seasonal Income
                      </label>
                    </div>

                    <div class="form-check ms-3 ms-md-5">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="Foreign"
                        checked={foreign_income === 1 ? true : false}
                        onChange={handleChange3}
                      />
                      <label class="form-check-label" for="Foreign">
                        Foreign Income
                      </label>
                    </div>
                  </div>

                  <div class="form-check mt-4">
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
                      className="btn btn-primary mx-2 px-md-5"
                      onClick={EditMilitryIncome}
                    >
                      EDIT
                    </button>
                    <Link
                      className="btn btn-light mx-2 px-md-5"
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

export default MilitaryEdit;
