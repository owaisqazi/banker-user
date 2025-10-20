/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-self-compare */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaHouseUser, FaStreetView, FaUserNurse } from "react-icons/fa";
import {
  MdContactPhone,
  MdOutgoingMail,
  MdOutlineLocationCity,
  MdPhonelinkRing,
} from "react-icons/md";
import Californiastate from "./Californiastate";
import Californiacountry from "./Californiacountry";
import CaliforniaCities from "./CaliforniaCities";
import CaliforniaCities1 from "./CaliforniaCities1";
import Californiastate1 from "./Californiastate1";
import CaliforniaCities2 from "./CaliforniaCities2";
import Californiastate2 from "./Californiastate2";
import Californiacountry2 from "./Californiacountry2";
import Buttonglobal from "./GlobalComponent/Button";
import Swal from "sweetalert2";

const PersonalInfo = ({california}) => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  console.log(borrowerid, 'borrowerid')
  const handleget = () => {
    console.log(item.id, "collinghandleget");
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/personal/info/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false);
        console.log(response, "salamn==>");
        setError("");
        setalternate_names(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.alternate_names : response.data.data.broker_agreement_personal_info?.alternate_names || ""
        );
        setborrower_application_credit(
          response.data.data.borrower_application_credit
        );
        setno_mailing_address(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.mailing_address : response.data.data.broker_agreement_personal_info?.no_mailing_address || "");
        sethave_any_dependent(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.have_any_dependent : response.data.data.broker_agreement_personal_info?.have_any_dependent);
        setagreement(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info : response.data.data.broker_agreement_personal_info);
        setstate(response.data.data.broker_agreement_personal_info.state || "");
        setformer_country(
          response.data.data.broker_agreement_personal_info.former_country || ""
        );
        setformer_city(
          response.data.data.broker_agreement_personal_info.former_city || ""
        );
        setformer_unit(
          response.data.data.broker_agreement_personal_info.former_unit || ""
        );
        setformer_state(
          response.data.data.broker_agreement_personal_info.former_state || ""
        );
        setformer_zip(
          response.data.data.broker_agreement_personal_info.former_zip || ""
        );
        setformer_months_at_current_address(
          response.data.data.broker_agreement_personal_info
            .former_months_at_current_address || ""
        );
        setformer_years_at_current_address(
          response.data.data.broker_agreement_personal_info
            .former_years_at_current_address || ""
        );
        setmailing_address_street(
          response.data.data.broker_agreement_personal_info
            .mailing_address_street || ""
        );
        setno_list_former_address(
          response.data.data.broker_agreement_personal_info
            .no_list_former_address ||
          "" ||
          ""
        );
        setyears_at_current_address(
          response.data.data.broker_agreement_personal_info
            .years_at_current_address ||
          "" ||
          ""
        );
        setbroker_Id(
          response.data.data.broker_agreement_personal_info?.id || "" || ""
        );
        setbroker(response.data.data.broker_agreement_personal_info || "");
        sethousing(
          response.data.data.broker_agreement_personal_info.housing || "" || ""
        );
        setmonths_at_current_address(
          response.data.data.broker_agreement_personal_info
            .months_at_current_address ||
          "" ||
          ""
        );
        setapplication_id(
          response.data.data.borrower_application_personal_info
            ?.application_id ||
          "" ||
          ""
        );
        console.log(
          response.data.data.borrower_application_personal_info?.application_id,
          "res==" || ""
        );
        // setborrower_id(response.data.data.broker_agreement_personal_info?.borrower_id)
        setfirst_name(
          response.data.data.broker_agreement_personal_info?.first_name || ""
        );
        setMiddle_name(
          response.data.data.broker_agreement_personal_info?.middle_name || ""
        );
        setlast_name(
          response.data.data.borrower_application_personal_info?.last_name || ""
        );
        setsuffix(
          response.data.data.broker_agreement_personal_info?.suffix || ""
        );
        setalternate_first_name(
          response.data.data.broker_agreement_personal_info
            ?.alternate_first_name || ""
        );
        setalternate_suffix(
          response.data.data.broker_agreement_personal_info?.alternate_suffix ||
          ""
        );
        setsocial_security_number(
          response.data.data.broker_agreement_personal_info
            ?.social_security_number || ""
        );
        setdob(response.data.data.broker_agreement_personal_info?.dob || "");
        setemail(
          response.data.data.broker_agreement_personal_info?.email || ""
        );

        setdependent_ages(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.dependents_ages :
          response.data.data.broker_agreement_personal_info?.dependent_ages ||
          ""
        );
        setdependents_number(response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.ages :
          response.data.data.broker_agreement_personal_info?.dependents_number || ""
        );
        setcitizenship(
          response.data.data.broker_agreement_personal_info === null ? response.data.data.borrower_application_personal_info?.residency_type : response.data.data.broker_agreement_personal_info?.citizenship);
        setstate(response.data.data.broker_agreement_personal_info?.state || ""
        );
        settype_of_credit(
          response.data.data.broker_agreement_personal_info?.type_of_credit ||
          ""
        );
        setborrower_list_loan_first_name(
          response.data.data.broker_agreement_personal_info
            ?.borrower_list_loan_first_name || ""
        );
        setborrower_list_loan_middle_name(
          response.data.data.broker_agreement_personal_info
            ?.borrower_list_loan_middle_name || ""
        );
        setborrower_list_loan_last_name(
          response.data.data.broker_agreement_personal_info
            ?.borrower_list_loan_last_name || ""
        );
        setborrower_list_loan_suffix(
          response.data.data.broker_agreement_personal_info
            ?.borrower_list_loan_suffix || ""
        );
        setcell_phone(
          response.data.data.broker_agreement_personal_info?.cell_phone || ""
        );
        setmarital_status(
          response.data.data.broker_agreement_personal_info?.marital_status ||
          ""
        );
        sethome_phone(
          response.data.data.broker_agreement_personal_info?.home_phone || ""
        );
        setwork_phone(
          response.data.data.broker_agreement_personal_info?.work_phone || ""
        );
        setalternate_last_name(
          response.data.data.broker_agreement_personal_info
            ?.alternate_last_name || ""
        );
        setalternate_middle_name(
          response.data.data.broker_agreement_personal_info
            ?.alternate_middle_name || ""
        );
        setformer_housing(
          response.data.data.broker_agreement_personal_info?.former_housing ||
          ""
        );
        setformer_street(
          response.data.data.broker_agreement_personal_info?.former_street || ""
        );
        setunit(response.data.data.broker_agreement_personal_info?.unit || "");
        setmailing_address_zip(
          response.data.data.broker_agreement_personal_info
            ?.mailing_address_zip || ""
        );
        setmailing_address_state(
          response.data.data.broker_agreement_personal_info
            ?.mailing_address_state || ""
        );
        setmailing_address_country(
          response.data.data.broker_agreement_personal_info
            ?.mailing_address_country || ""
        );
        setformer_street(
          response.data.data.broker_agreement_personal_info?.former_street || ""
        );
        setzip(response.data.data.broker_agreement_personal_info?.zip || "");
        setformer_city(
          response.data.data.broker_agreement_personal_info?.former_city || ""
        );
        setcity(response.data.data.broker_agreement_personal_info?.city || "");
        setmailing_address_city(
          response.data.data.broker_agreement_personal_info
            ?.mailing_address_city || ""
        );
        setmailing_address_unit(
          response.data.data.broker_agreement_personal_info
            ?.mailing_address_unit || ""
        );
        setcountry(
          response.data.data.broker_agreement_personal_info?.country || ""
        );
        setstreet(
          response.data.data.broker_agreement_personal_info?.street || ""
        );
      })
      .catch((error) => {
        setLoader(false);
        // setError(''));
        // setError(error.response.data.errors)
      });
  };

  const [loader, setLoader] = useState(false);
  const [broker_Id, setbroker_Id] = useState(null);
  const [borrower_application_credit, setborrower_application_credit] =
    useState(null);
  const [alternate_names, setalternate_names] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [Middle_name, setMiddle_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [suffix, setsuffix] = useState("");
  const [alternate_first_name, setalternate_first_name] = useState("");
  const [alternate_last_name, setalternate_last_name] = useState("");
  const [alternate_middle_name, setalternate_middle_name] = useState("");
  const [alternate_suffix, setalternate_suffix] = useState("");
  const [social_security_number, setsocial_security_number] = useState("");
  const [dob, setdob] = useState("");
  const [dependent_ages, setdependent_ages] = useState("");
  const [dependents_number, setdependents_number] = useState("");
  const [citizenship, setcitizenship] = useState("");
  const [type_of_credit, settype_of_credit] = useState("");
  const [borrower_list_loan_first_name, setborrower_list_loan_first_name] =
    useState("");
  const [borrower_list_loan_middle_name, setborrower_list_loan_middle_name] =
    useState("");
  const [borrower_list_loan_last_name, setborrower_list_loan_last_name] =
    useState("");
  const [borrower_list_loan_suffix, setborrower_list_loan_suffix] =
    useState("");
  const [home_phone, sethome_phone] = useState("");
  const [cell_phone, setcell_phone] = useState("");
  const [work_phone, setwork_phone] = useState("");
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [unit, setunit] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [email, setemail] = useState("");
  const [country, setcountry] = useState("");
  const [years_at_current_address, setyears_at_current_address] = useState("");
  const [former_years_at_current_address, setformer_years_at_current_address] =
    useState("");
  const [months_at_current_address, setmonths_at_current_address] =
    useState("");
  const [no_list_former_address, setno_list_former_address] = useState(0);
  const [former_street, setformer_street] = useState("");
  const [former_city, setformer_city] = useState("");
  const [former_unit, setformer_unit] = useState("");
  const [former_state, setformer_state] = useState("");
  const [former_zip, setformer_zip] = useState("");
  const [former_country, setformer_country] = useState("");

  const [
    former_months_at_current_address,
    setformer_months_at_current_address,
  ] = useState("");
  const [former_housing, setformer_housing] = useState("");
  const [no_mailing_address, setno_mailing_address] = useState(0);
  const [mailing_address_street, setmailing_address_street] = useState("");
  const [mailing_address_city, setmailing_address_city] = useState("");
  const [mailing_address_unit, setmailing_address_unit] = useState("");
  const [mailing_address_state, setmailing_address_state] = useState("");
  const [mailing_address_zip, setmailing_address_zip] = useState("");
  const [mailing_address_country, setmailing_address_country] = useState("");
  const [housing, sethousing] = useState("");
  const [marital_status, setmarital_status] = useState("");
  const [have_any_dependent, sethave_any_dependent] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [application_id, setapplication_id] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const Token = useSelector((state) => state.auth.auth.idToken);
  const handleadd = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("application_id", item.id);
    formdata.append("alternate_names", alternate_names ? 1 : 0);
    formdata.append("alternate_first_name", alternate_first_name ? alternate_first_name : agreement?.alternate_first_name);
    formdata.append("alternate_last_name", alternate_last_name ? alternate_last_name : agreement?.alternate_last_name);
    formdata.append("alternate_middle_name", alternate_middle_name ? alternate_middle_name : agreement?.alternate_middle_name);
    formdata.append("alternate_suffix", alternate_suffix ? alternate_suffix : agreement?.alternate_suffix);
    formdata.append("former_years_at_current_address", former_years_at_current_address ? former_years_at_current_address : agreement?.former_years_at_current_address);

    {
      broker?.id && formdata.append("id", broker.id || "");
    }

    formdata.append(
      "first_name",
      first_name ? first_name : agreement?.first_name || ""
    );
    formdata.append(
      "middle_name",
      Middle_name ? Middle_name : agreement?.middle_name || ""
    );
    formdata.append(
      "last_name",
      last_name ? last_name : agreement?.last_name || ""
    );
    formdata.append("suffix", suffix ? suffix : agreement?.suffix || "");

    formdata.append(
      "social_security_number",
      social_security_number
        ? social_security_number
        : borrower_application_credit?.social_security_no || ""
    );
    formdata.append("dob", dob ? dob : agreement?.dob || "");
    formdata.append("email", email ? email : agreement?.email || "");
    formdata.append(
      "dependent_ages",
      dependent_ages ? dependent_ages : agreement?.ages || ""
    );
    formdata.append(
      "dependents_number",
      dependents_number ? dependents_number : agreement?.dependents_ages || ""
    );
    formdata.append(
      "citizenship",
      citizenship ? citizenship : agreement?.residency_type || ""
    );
    formdata.append(
      "type_of_credit",
      type_of_credit ? type_of_credit : agreement?.type_of_credit || ""
    );
    formdata.append(
      "borrower_list_loan_first_name",
      borrower_list_loan_first_name
        ? borrower_list_loan_first_name
        : agreement?.borrower_list_loan_first_name || ""
    );
    formdata.append(
      "borrower_list_loan_middle_name",
      borrower_list_loan_middle_name
        ? borrower_list_loan_middle_name
        : agreement?.borrower_list_loan_middle_name || ""
    );
    formdata.append(
      "borrower_list_loan_last_name",
      borrower_list_loan_last_name
        ? borrower_list_loan_last_name
        : agreement?.borrower_list_loan_last_name || ""
    );
    formdata.append(
      "borrower_list_loan_suffix",
      borrower_list_loan_suffix || ""
    );
    formdata.append(
      "home_phone",
      home_phone ? home_phone : agreement?.home_phone || ""
    );
    formdata.append(
      "cell_phone",
      cell_phone ? cell_phone : agreement?.cell_phone || ""
    );
    formdata.append(
      "work_phone",
      work_phone ? work_phone : agreement?.work_phone || ""
    );
    formdata.append("street", street ? street : agreement?.street || "");
    formdata.append("city", city ? city : agreement?.city || "");
    // formdata.append("ext",ext)
    formdata.append("no_mailing_address", no_mailing_address ? 1 : 0);
    formdata.append(
      "no_list_former_address",
      no_list_former_address == 1 ? 1 : 0
    );
    formdata.append("have_any_dependent", have_any_dependent ? 1 : 0);
    formdata.append("unit", unit ? unit : agreement?.unit || "");
    formdata.append("state", state ? state : agreement?.state || "");
    formdata.append("zip", zip ? zip : agreement?.zip || "");
    formdata.append("country", country ? country : agreement?.country || "");
    formdata.append(
      "years_at_current_address",
      years_at_current_address
        ? years_at_current_address
        : agreement?.how_long_live_y_there || ""
    );
    formdata.append(
      "months_at_current_address",
      months_at_current_address
        ? months_at_current_address
        : agreement?.how_long_live_m_there || ""
    );
    formdata.append("former_street", former_street || "");
    formdata.append("former_city", former_city || "");
    formdata.append("former_unit", former_unit || "");
    formdata.append("former_state", former_state || "");
    formdata.append("former_zip", former_zip || "");
    formdata.append("former_country", former_country || "");
    // formdata.append("former_whats_monthly_rent", former_whats_monthly_rent|| "");
    formdata.append(
      "former_months_at_current_address",
      former_months_at_current_address || ""
    );
    formdata.append(
      "former_housing",
      former_housing ? former_housing : agreement?.former_housing || ""
    );
    formdata.append("mailing_address_street", mailing_address_street || "");
    formdata.append("mailing_address_city", mailing_address_city || "");
    formdata.append("mailing_address_unit", mailing_address_unit || "");
    formdata.append("mailing_address_state", mailing_address_state || "");
    formdata.append("mailing_address_zip", mailing_address_zip || "");
    formdata.append("mailing_address_country", mailing_address_country || "");
    formdata.append("housing", housing ? housing : agreement?.housing || "");
    formdata.append(
      "marital_status",
      marital_status ? marital_status : agreement?.marital_status || ""
    );
    // formdata.append("broker_id",broker_Id)
    formdata.append("borrower_id", borrowerid || "");
    // formdata.append("application_id", application_id|| "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/agreement/personal/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false);
        console.log(response?.data, "###>>>");
        setError("");
        setalternate_first_name("");
        setalternate_last_name("");
        setalternate_middle_name("");
        setalternate_suffix("");
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "success",
          title: response?.data?.message,
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        // handleget();
        // navigate("/Income")
      })
      .catch((error) => {
        // setError('')
        setLoader(false);
        setError(error.response.data.errors);
        console.log(error, "error========>");
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message,
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };
  console.log(broker_Id, "marital_status");
  const [agreement, setagreement] = useState();
  const [alternate_names1, setalternate_names1] = useState();
  const [broker, setbroker] = useState();


  useEffect(() => {
    handleget();
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setno_list_former_address(true);
    } else {
      setno_list_former_address(false);
    }
    console.log(checked, "checked");
  };

  // city funtion 
  const handleCityChange = (selectedValue) => {
    setcity(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // state funtion 
  const handleStateChange = (selectedValue) => {
    setstate(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // country funtion
  const handlecountryChange = (selectedValue) => {
    setcountry(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // city funtion 
  const handleaddresscityChange = (selectedValue) => {
    setmailing_address_city(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // state funtion 
  const handleaddressStateChange = (selectedValue) => {
    setmailing_address_state(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // country funtion
  const handleaddresscountryChange = (selectedValue) => {
    setmailing_address_country(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // city funtion 
  const handleformercityChange = (selectedValue) => {
    setformer_city(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // state funtion 
  const handleformerStateChange = (selectedValue) => {
    setformer_state(selectedValue);
    // You can do additional logic here based on the selected state value
  };
  // country funtion
  const handleformercountryChange = (selectedValue) => {
    setformer_country(selectedValue);
    // You can do additional logic here based on the selected state value
  };
console.log(former_country,'former_country');
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <h2 className="mt-1 mb-4 ps-3">Personal Information</h2>
      <div style={{ width: "100%" }} className="row mx-4">
        <h5
          className="font26 mb-3 p-md-0"
          style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
        >
          Please fill your full, legal name
        </h5>
        <div className="col-lg-3  p-md-0">
          <input
            className="form-control rounded-0 shadow-sm inputFont26"
            type="text"
            placeholder="First Name"
            style={{ padding: "12px 10px", fontSize: "14px" }}
            defaultValue={
              broker?.first_name ? broker?.first_name : agreement?.first_name
            }
            // value={agreement?.first_name}
            onChange={(e) => setfirst_name(e.target.value)}
          />
          {error?.first_name && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.first_name}
            </div>
          )}
        </div>
        <div className="col-lg-3  p-md-0">
          <input
            className="form-control rounded-0 shadow-sm inputFont26"
            type="text"
            placeholder="Middle Name"
            style={{ padding: "12px 10px" }}
            defaultValue={Middle_name ? Middle_name : agreement?.middle_name}
            // value={agreement?.middle_name}
            onChange={(e) => setMiddle_name(e.target.value)}
          />
          {error?.middle_name && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.middle_name}
            </div>
          )}
        </div>
        <div className="col-lg-3  p-md-0">
          <input
            className="form-control rounded-0 shadow-sm inputFont26"
            type="text"
            placeholder="Last Name"
            style={{ padding: "12px 10px" }}
            defaultValue={
              broker?.last_name ? broker?.last_name : agreement?.last_name
            }
            onChange={(e) => setlast_name(e.target.value)}
          />
          {error?.last_name && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.last_name}
            </div>
          )}
        </div>
        <div className="col-lg-3  p-md-0">
          <input
            className="form-control rounded-0 shadow-sm inputFont26"
            type="number"
            placeholder="Suffix"
            style={{ padding: "12px 10px" }}
            defaultValue={broker?.suffix ? broker?.suffix : agreement?.suffix}
            onChange={(e) => setsuffix(e.target.value)}
          />
          {error?.suffix && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.suffix}
            </div>
          )}
        </div>

        <div className="input-group w-100">
          <input
            className="form-check-input ms-2"
            type="checkbox"
            checked={alternate_names}
            onChange={() => setalternate_names(!alternate_names)}
            name="alternate_names"
            id="flexCheckDefault"
          />
          {console.log(alternate_names1, "sasasas")}

          <label
            className="form-check-label text-lowercase  text-muted ms-2"
            for="flexCheckDefault"
          >
            alternate names
          </label>
          {error?.alternate_names && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.alternate_names}
            </div>
          )}
        </div>

        {alternate_names == 1 ? (
          <>
            {/* <input
                  style={{ padding: "12px 10px", width: "50%" }}
                  type="text"
                  className="form-control rounded-0 shadow-sm m-3  input26clr"
                  placeholder="Enter all names here sperated by commas"
                  defaultValue={alternateName}
                  onChange={(e) => setAlternateName(e.target.value)}
                /> */}
            <div className="col-lg-3  p-md-0">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                placeholder="First Name"
                style={{ padding: "12px 10px", fontSize: "14px" }}
                defaultValue={alternate_first_name}
                onChange={(e) => setalternate_first_name(e.target.value)}
              />
              {error?.alternate_first_name && (
                <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                  {error?.alternate_first_name}
                </div>
              )}
            </div>
            <div className="col-lg-3  p-md-0">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                placeholder="Middle Name"
                style={{ padding: "12px 10px" }}
                defaultValue={alternate_middle_name}
                onChange={(e) => setalternate_middle_name(e.target.value)}
              />
              {error?.alternate_middle_name && (
                <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                  {error?.alternate_middle_name}
                </div>
              )}
            </div>
            <div className="col-lg-3  p-md-0">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                placeholder="Last Name"
                style={{ padding: "12px 10px" }}
                defaultValue={alternate_last_name}
                onChange={(e) => setalternate_last_name(e.target.value)}
              />
              {error?.alternate_last_name && (
                <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                  {error?.alternate_last_name}
                </div>
              )}
            </div>
            <div className="col-lg-3  p-md-0">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="number"
                placeholder="Suffix"
                style={{ padding: "12px 10px" }}
                defaultValue={alternate_suffix}
                onChange={(e) => setalternate_suffix(e.target.value)}
              />
              {error?.alternate_suffix && (
                <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                  {error?.alternate_suffix}
                </div>
              )}
            </div>
          </>
        ) : null}
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <div className="input-group w-100">
            <input
              className="form-check-input ms-2"
              type="checkbox"
              checked={have_any_dependent}
              onChange={() => sethave_any_dependent(!have_any_dependent)}
              name="have_any_dependent"
              id="flexCheckDefault23"
            />
            <label
              className="form-check-label text-lowercase  text-muted ms-2"
              for="flexCheckDefault23"
            >
              have any dependent
            </label>
          </div>
          {error?.have_any_dependent && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.have_any_dependent}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Social Security Number
          </h5>
          <div className="input-group mb-3">
            <input
              style={{ padding: "12px 10px" }}
              type="number"
              className="form-control rounded-0 shadow-sm"
              placeholder="Enter all names here sperated by commas"
              defaultValue={
                broker?.social_security_number
                  ? broker?.social_security_number
                  : borrower_application_credit?.social_security_no
              }
              onChange={(e) => setsocial_security_number(e.target.value)}
            />
            <span
              className="input-group-text bg-primary rounded-0"
              id="basic-addon1"
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-phone text-white"
              ></i>
            </span>
          </div>
          {error?.social_security_number && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.social_security_number}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Date of Birth
          </h5>
          <input
            style={{ padding: "12px 10px" }}
            type="date"
            className="form-control rounded-0 shadow-sm"
            placeholder="Enter Date of Birth"
            defaultValue={broker?.dob ? broker?.dob : agreement?.dob}
            onChange={(e) => setdob(e.target.value)}
          />
          {error?.dob && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.dob}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Citizenship
          </h5>
          <select
            style={{ padding: "20px" }}
            autocomplete="nope"
            // className="form-control  input26clr text-muted"
            className="form-select p-2 rounded-0 shadow-sm"
            aria-label="Default select example"
            // defaultValue={durationOfLivingMonth}
            // onChange={(e) =>
            //   setDurationOfLivingMonth(e.target.value)
            // }
            onChange={(e) => setcitizenship(e.target.value)}
          >
            <option selected>
              {citizenship ? citizenship : agreement?.residency_type}
            </option>
            <option>U.S. Citizen</option>
            <option>Permanent Resident Alien</option>
            <option>Non-Permanent Resident Alien</option>
          </select>
          {error?.citizenship && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.citizenship}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Type of Credit
          </h5>
          <input
            className="form-control rounded-0 shadow-sm inputFont26"
            type="number"
            placeholder="Type of Credit"
            style={{ padding: "12px 10px", fontSize: "14px" }}
            defaultValue={
              broker?.type_of_credit
                ? broker?.type_of_credit
                : agreement?.type_of_credit
            }
            onChange={(e) => settype_of_credit(e.target.value)}
          />
          {error?.type_of_credit && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.type_of_credit}
            </div>
          )}
        </div>
        <div className="row p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            {" "}
            List Name(s) of Other Borrower(s) Applying for this Loan{" "}
          </h5>
          <div className="col-lg-3  p-md-0">
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="First Name"
              style={{ padding: "12px 10px", fontSize: "14px" }}
              defaultValue={
                broker?.borrower_list_loan_first_name
                  ? broker?.borrower_list_loan_first_name
                  : agreement?.borrower_list_loan_first_name
              }
              onChange={(e) => setborrower_list_loan_first_name(e.target.value)}
            />
            {error?.borrower_list_loan_first_name && (
              <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                {error?.borrower_list_loan_first_name}
              </div>
            )}
          </div>
          <div className="col-lg-3  p-md-0">
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="Middle Name"
              style={{ padding: "12px 10px" }}
              defaultValue={
                broker?.borrower_list_loan_last_name
                  ? broker?.borrower_list_loan_last_name
                  : agreement?.borrower_list_loan_last_name
              }
              onChange={(e) => setborrower_list_loan_last_name(e.target.value)}
            />
            {error?.borrower_list_loan_last_name && (
              <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                {error?.borrower_list_loan_last_name}
              </div>
            )}
          </div>
          <div className="col-lg-3  p-md-0">
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="Last Name"
              style={{ padding: "12px 10px" }}
              defaultValue={
                broker?.borrower_list_loan_middle_name
                  ? broker?.borrower_list_loan_middle_name
                  : agreement?.borrower_list_loan_middle_name
              }
              onChange={(e) =>
                setborrower_list_loan_middle_name(e.target.value)
              }
            />
            {error?.borrower_list_loan_middle_name && (
              <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                {error?.borrower_list_loan_middle_name}
              </div>
            )}
          </div>
          <div className="col-lg-3  p-md-0">
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="number"
              placeholder="Suffix"
              style={{ padding: "12px 10px" }}
              defaultValue={broker?.borrower_list_loan_suffix}
              onChange={(e) => setborrower_list_loan_suffix(e.target.value)}
            />
            {error?.borrower_list_loan_suffix && (
              <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                {error?.borrower_list_loan_suffix}
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Number
          </h5>
          <div className="input-group mb-3">
            <input
              style={{ padding: "12px 10px" }}
              type="number"
              className="form-control rounded-0 shadow-sm"
              placeholder="Enter number"
              defaultValue={
                broker?.dependents_number
                  ? broker?.dependents_number
                  : agreement?.dependents_ages
              }
              onChange={(e) => setdependents_number(e.target.value)}
            />
            <span
              className="input-group-text bg-primary text-white rounded-0"
              id="basic-addon1"
            >
              <i style={{ fontSize: "20px" }} className="fa fa-phone"></i>
            </span>
          </div>
          {error?.dependents_number && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.dependents_number}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Age
          </h5>
          <input
            style={{ padding: "12px 10px" }}
            type="number"
            className="form-control rounded-0 shadow-sm"
            placeholder="Enter Age"
            defaultValue={
              broker?.dependent_ages ? broker?.dependent_ages : agreement?.ages
            }
            onChange={(e) => setdependent_ages(e.target.value)}
          />
          {error?.dependent_ages && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.dependent_ages}
            </div>
          )}
        </div>
        <div className="col-lg-12 p-md-0 mt-4 ms-2">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Marital Status{" "}
          </h5>
          <select
            onChange={(e) => setmarital_status(e.target.value)}
            style={{ padding: "20px" }}
            autocomplete="nope"
            // className="form-control  input26clr text-muted"
            className="form-select p-2 rounded-0 shadow-sm"
            aria-label="Default select example"
          // defaultValue={durationOfLivingMonth}
          // value={broker?.marital_status?broker?.marital_status:agreement?.marital_status}
          >
            <option selected>
              {broker?.marital_status
                ? broker?.marital_status
                : agreement?.marital_status}{" "}
            </option>
            <option value="Married"> Married </option>
            <option value="Separated">Separated </option>
            <option value="Unmarried">Unmarried</option>
          </select>
          {error?.marital_status && (
            <div className="error-container text-danger fs-6 fw-normal col-lg-12">
              {error?.marital_status}
            </div>
          )}
        </div>
        <div className="mt-5 personalinfo_maxwidth">
          {/* <h5 className="font26" style={{ fontSize: "20px", fontWeight: "500", color: "black" }}>Please fill your contact information</h5> */}
          <div className="mt-4 contact_max ps-1">
            <div className="row mt-5 ">
              <h5
                className="font26 mb-3 p-md-0"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Current Address
              </h5>
              <div className="col-lg-12 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="text"
                    placeholder="Street"
                    defaultValue={
                      broker?.street ? broker?.street : agreement?.street
                    }
                    onChange={(e) => setstreet(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-street-view"
                    ></i>
                  </span>
                </div>
                {error?.street && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.street}
                  </div>
                )}
              </div>
              <div className="col-lg-4 p-1">
                <input
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    padding: "0 28px",
                  }}
                  className="form-control rounded-0 shadow-sm input26clr"
                  type="number"
                  placeholder="Unit"
                  defaultValue={broker?.unit ? broker?.unit : agreement?.unit}
                  onChange={(e) => setunit(e.target.value)}
                />
                {error?.unit && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.unit}
                  </div>
                )}
              </div>
              <div className="col-lg-8 p-1">
                <div className="input-group mb-3">
                <CaliforniaCities  handleCityChange={handleCityChange} broker={broker} agreement={agreement}/>
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i style={{ fontSize: "20px" }} className="fa fa-city"></i>
                  </span>
                </div>
                {error?.city && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.city}
                  </div>
                )}
              </div>
              <div className="col-lg-6 p-1">
                <div className="input-group mb-3">
                  <Californiastate  handleStateChange={handleStateChange} broker={broker} agreement={agreement}/>
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i style={{ fontSize: "20px" }} className="fa fa-flag-usa"></i>
                  </span>
                </div>
                {error?.state && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.state}
                  </div>
                )}
              </div>
              <div className="col-lg-6 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="number"
                    placeholder="Zip"
                    defaultValue={zip ? zip : agreement?.zip}
                    onChange={(e) => setzip(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i style={{ fontSize: "20px" }} className="fa fa-code"></i>
                  </span>
                </div>
                {error?.zip && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.zip}
                  </div>
                )}
              </div>
              <div className="col-lg-12 p-1">
                <Californiacountry  handlecountryChange={handlecountryChange}  broker={broker} agreement={agreement}/>
                {error?.country && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.country}
                  </div>
                )}
              </div>
              <div className="col-lg-12 p-1 mt-3">
                <h5
                  className="font26 mb-3 p-md-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  How Long year at Current Address?
                </h5>
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="number"
                    placeholder="How Long year at Current Address?"
                    defaultValue={
                      broker?.years_at_current_address
                        ? broker?.years_at_current_address
                        : agreement?.how_long_live_m_there
                    }
                    onChange={(e) =>
                      setyears_at_current_address(e.target.value)
                    }
                  />
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-address-card"
                    ></i>
                  </span>
                </div>
                {error?.years_at_current_address && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.years_at_current_address}
                  </div>
                )}
              </div>
              <div className="col-lg-12 p-1 mt-3">
                <h5
                  className="font26 mb-3 p-md-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Months at current address
                </h5>
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="number"
                    placeholder="months at current address"
                    defaultValue={broker?.months_at_current_address ? broker?.months_at_current_address : agreement?.how_long_live_y_there}
                    onChange={(e) =>
                      setmonths_at_current_address(e.target.value)
                    }
                  />
                  <span
                    className="input-group-text bg-primary text-white rounded-0"
                    id="basic-addon1"
                  >
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-address-book"
                    ></i>
                  </span>
                </div>

                {error?.months_at_current_address && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.months_at_current_address}
                  </div>
                )}
              </div>
              <div className="col-lg-12 p-1 mt-3">
                <h5
                  className="font26 p-md-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Housing
                </h5>
                <select
                  style={{ padding: "20px" }}
                  autocomplete="nope"
                  // className="form-control  input26clr text-muted"
                  className="form-select p-2 rounded-0 shadow-sm"
                  aria-label="Default select example"
                  defaultValue={broker?.housing}
                  onChange={(e) => sethousing(e.target.value)}
                >
                  <option selected disabled>
                    {broker?.housing ? broker?.housing : "Select..."}
                  </option>
                  <option>No primary housing expense</option>
                  <option> Own</option>
                  <option> Rent</option>
                </select>
                {error?.housing && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.housing}
                  </div>
                )}
              </div>
              <h5
                className="font26 p-md-0"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                If at Current Address for LESS than 2 years, list Former Address
              </h5>

              <div className="col-lg-12 p-1 mt-3">
                <div className="input-group w-100">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={no_list_former_address == 1}
                    onChange={handleCheckboxChange}
                    name="no_list_former_address"
                    id="flexCheckDefault"
                  />

                  <label
                    className="form-check-label text-lowercase  text-muted ms-2"
                    for="flexCheckDefault"
                  >
                    no list former address
                  </label>
                </div>
              </div>
              {no_list_former_address == 0 && (
                <>
                  <div className="col-lg-12 p-1 mt-3">
                    <h5
                      className="font26 mb-3 p-md-0"
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      former years at current address
                    </h5>
                    <div className="input-group mb-3">
                      <input
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "0 28px",
                        }}
                        className="form-control rounded-0 shadow-sm input26clr"
                        type="number"
                        placeholder="forme years at current address"
                        defaultValue={
                          broker?.former_years_at_current_address
                            ? broker?.former_years_at_current_address
                            : agreement?.former_years_at_current_address
                        }
                        onChange={(e) =>
                          setformer_years_at_current_address(e.target.value)
                        }
                      />
                      <span
                        className="input-group-text bg-primary text-white rounded-0"
                        id="basic-addon1"
                      >
                        <i
                          style={{ fontSize: "20px" }}
                          className="fa fa-address-book"
                        ></i>
                      </span>
                    </div>
                    {error?.former_years_at_current_address && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_years_at_current_address}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 p-1 mt-3">
                    <h5
                      className="font26 mb-3 p-md-0"
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      Former months at current address
                    </h5>
                    <div className="input-group mb-3">
                      <input
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "0 28px",
                        }}
                        className="form-control rounded-0 shadow-sm input26clr"
                        type="month"
                        placeholder="former months at current address"
                        defaultValue={
                          broker?.former_months_at_current_address
                            ? broker?.former_months_at_current_address
                            : agreement?.former_months_at_current_address
                        }
                        onChange={(e) =>
                          setformer_months_at_current_address(e.target.value)
                        }
                      />
                      <span
                        className="input-group-text bg-primary text-white rounded-0"
                        id="basic-addon1"
                      >
                        <i
                          style={{ fontSize: "20px" }}
                          className="fa fa-address-card"
                        ></i>
                      </span>
                    </div>
                    {error?.former_months_at_current_address && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_months_at_current_address}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 p-1 mt-3">
                    <h5
                      className="font26 mb-3 p-md-0"
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      Former housing
                    </h5>
                    <div className="input-group mb-3">
                      <input
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "0 28px",
                        }}
                        className="form-control rounded-0 shadow-sm input26clr"
                        type="number"
                        placeholder="former housing"
                        defaultValue={broker?.former_housing}
                        onChange={(e) => setformer_housing(e.target.value)}
                      />
                      <span
                        className="input-group-text bg-primary text-white rounded-0"
                        id="basic-addon1"
                      >
                        <FaHouseUser fontSize="22px" />
                      </span>
                    </div>
                    {error?.former_housing && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_housing}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-8 p-1">
                    <div className="input-group mb-3">
                      <input
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "0 28px",
                        }}
                        className="form-control rounded-0 shadow-sm input26clr"
                        type="text"
                        placeholder="Street"
                        defaultValue={broker?.former_street}
                        onChange={(e) => setformer_street(e.target.value)}
                      />
                      <span
                        className="input-group-text bg-primary rounded-0 text-white"
                        id="basic-addon1"
                      >
                        <i
                          className="fa fa-street-view"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </span>
                    </div>
                    {error?.former_street && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_street}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 p-1">
                    <input
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "0 28px",
                      }}
                      className="form-control rounded-0 shadow-sm input26clr"
                      type="number"
                      placeholder="Unit"
                      defaultValue={broker?.former_unit}
                      onChange={(e) => setformer_unit(e.target.value)}
                    />
                    {error?.former_unit && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_unit}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-8 p-1">
                    <div className="input-group mb-3">
                      <CaliforniaCities2  handleformercityChange={handleformercityChange} broker={broker} agreement={agreement}/>
                      <span
                        className="input-group-text bg-primary rounded-0 text-white"
                        id="basic-addon1"
                      >
                        <i className="fa fa-city"></i>
                      </span>
                    </div>
                    {error?.former_city && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_city}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-4 p-1">
                    <div className="input-group mb-3">
                      <Californiastate2  handleformerStateChange={handleformerStateChange} broker={broker} agreement={agreement}/>
                      <span
                        className="input-group-text bg-primary rounded-0 text-white"
                        id="basic-addon1"
                      >
                        <i className="fa fa-flag-usa"></i>
                      </span>
                    </div>
                    {error?.former_state && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_state}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-5 p-1">
                    <div className="input-group mb-3">
                      <input
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          padding: "0 28px",
                        }}
                        className="form-control rounded-0 shadow-sm input26clr"
                        type="number"
                        placeholder="Zip"
                        defaultValue={broker?.former_zip}
                        onChange={(e) => setformer_zip(e.target.value)}
                      />
                      <span
                        className="input-group-text bg-primary rounded-0 text-white"
                        id="basic-addon1"
                      >
                        <i className="fa fa-code"></i>
                      </span>
                    </div>
                    {error?.former_zip && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_zip}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-7 p-1">
                    <Californiacountry2  handleformercountryChange={handleformercountryChange} broker={broker} agreement={agreement}/>
                    {error?.former_country && (
                      <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                        {error?.former_country}
                      </div>
                    )}
                  </div>
                </>
              )}
              <h5
                className="font26 mb-3 p-md-0"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Contact Information
              </h5>
              <div className="col-lg-12 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="text"
                    placeholder="Home Phone"
                    defaultValue={
                      broker?.home_phone
                        ? broker?.home_phone
                        : agreement?.home_phone
                    }
                    onChange={(e) => sethome_phone(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary rounded-0 text-white"
                    id="basic-addon2"
                  >
                    <MdContactPhone fontSize={23} />
                  </span>
                </div>
                {error?.home_phone && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.home_phone}
                  </div>
                )}
              </div>
              <div className="col-lg-12 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="text"
                    placeholder="Cell Phone "
                    defaultValue={
                      broker?.cell_phone
                        ? broker?.cell_phone
                        : agreement?.cell_phone
                    }
                    onChange={(e) => setcell_phone(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary rounded-0 text-white"
                    id="basic-addon2"
                  >
                    <MdPhonelinkRing fontSize={23} />
                  </span>
                </div>
                {error?.cell_phone && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.cell_phone}
                  </div>
                )}
              </div>
              <div className="col-lg-6 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="text"
                    placeholder="Work Phone"
                    defaultValue={
                      broker?.work_phone
                        ? broker?.work_phone
                        : agreement?.home_phone
                    }
                    onChange={(e) => setwork_phone(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary rounded-0 text-white"
                    id="basic-addon2"
                  >
                    <FaUserNurse fontSize={22} />
                  </span>
                </div>
                {error?.work_phone && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.work_phone}
                  </div>
                )}
              </div>
              <div className="col-lg-6 p-1">
                <div className="input-group mb-3">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="email"
                    placeholder="Email"
                    defaultValue={
                      broker?.email ? broker?.email : agreement?.email
                    }
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <span
                    className="input-group-text bg-primary rounded-0 text-white"
                    id="basic-addon2"
                  >
                    <MdOutgoingMail fontSize={22} />
                  </span>
                </div>
                {error?.email && (
                  <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                    {error?.email}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-5 ">
            <h5
              className="font26 p-md-0"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Mailing Address if different from Current Address{" "}
            </h5>
            <div className="col-lg-12 p-1 mt-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="no mailing address"
                  checked={no_mailing_address}
                  onChange={() => setno_mailing_address(!no_mailing_address)}
                  name="no mailing address"
                />
                <label className="form-check-label" for="no mailing address">
                  no mailing address
                </label>
              </div>
              {error?.no_mailing_address && (
                <div className="error-container tno_mailing_address-danger fs-6 fw-normal col-lg-12">
                  {error?.no_mailing_address}
                </div>
              )}
            </div>
            {no_mailing_address == 0 ? (
              <>
                <div className="col-lg-8 p-1">
                  <div className="input-group mb-3">
                    <input
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "0 28px",
                      }}
                      className="form-control rounded-0 shadow-sm input26clr"
                      type="text"
                      placeholder="Street"
                      defaultValue={
                        broker?.mailing_address_street
                          ? broker?.mailing_address_street
                          : agreement?.mailing_address_street
                      }
                      onChange={(e) =>
                        setmailing_address_street(e.target.value)
                      }
                    />
                    <span
                      className="input-group-text bg-primary rounded-0 text-white"
                      id="basic-addon2"
                    >
                      <FaStreetView fontSize={22} />
                    </span>
                  </div>
                  {error?.mailing_address_street && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_street}
                    </div>
                  )}
                </div>
                <div className="col-lg-4 p-1">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="number"
                    placeholder="Unit"
                    defaultValue={
                      broker?.mailing_address_unit
                        ? broker?.mailing_address_unit
                        : agreement?.mailing_address_unit
                    }
                    onChange={(e) => setmailing_address_unit(e.target.value)}
                  />
                  {error?.mailing_address_unit && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_unit}
                    </div>
                  )}
                </div>
                <div className="col-lg-8 p-1">
                  <div className="input-group mb-3">
                    <CaliforniaCities1  handleaddresscityChange={handleaddresscityChange} broker={broker} agreement={agreement}/>
                    <span
                      className="input-group-text bg-primary rounded-0 text-white"
                      id="basic-addon2"
                    >
                      <MdOutlineLocationCity fontSize={22} />
                    </span>
                  </div>
                  {error?.mailing_address_city && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_city}
                    </div>
                  )}
                </div>
                <div className="col-lg-4 p-1">
                  <Californiastate1  handleaddressStateChange={handleaddressStateChange} broker={broker} agreement={agreement}/>
                  {error?.mailing_address_state && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_state}
                    </div>
                  )}
                </div>
                <div className="col-lg-5 p-1">
                  <input
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      padding: "0 28px",
                    }}
                    className="form-control rounded-0 shadow-sm input26clr"
                    type="number"
                    placeholder="Zip"
                    defaultValue={
                      broker?.mailing_address_zip
                        ? broker?.mailing_address_zip
                        : agreement?.mailing_address_zip
                    }
                    onChange={(e) => setmailing_address_zip(e.target.value)}
                  />
                  {error?.mailing_address_zip && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_zip}
                    </div>
                  )}
                </div>
                <div className="col-lg-7 p-1">
                 <Californiacountry2  handleaddresscountryChange={handleaddresscountryChange} broker={broker} agreement={agreement}/>
                  {error?.mailing_address_country && (
                    <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                      {error?.mailing_address_country}
                    </div>
                  )}
                </div>
              </>
            ) : null}
            <div className="mt-0 ps-0">
            <Buttonglobal handleSubmit={handleadd} btntext={"Submit"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
