/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaDeezer,
  FaSortAmountUpAlt,
  FaStreetView,
} from "react-icons/fa";
import City from "./LoanProparty/City";
import Country from "./LoanProparty/Country";
import State from "./LoanProparty/State";
import ButtonGlobal from "./GlobalComponent/Button";

const LoanproInfo = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [bankruptcy, set_bankruptcy] = useState(0);
  const [loan_amount, setloan_amount] = useState();
  const [loan_purpose, setloan_purpose] = useState("");
  const [street, setstreet] = useState("");
  const [unit, setunit] = useState();
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [country, setcountry] = useState("");
  const [mixed_use_property, setmixed_use_property] = useState(0);
  const [manufactured_home, setmanufactured_home] = useState(0);
  const [
    new_mortgage_loan_does_not_apply,
    setnew_mortgage_loan_does_not_apply,
  ] = useState();
  const [first_create_name, setfirst_create_name] = useState("");
  const [first_lien, setfirst_lien] = useState();
  const [first_monthly_payment, setfirst_monthly_payment] = useState("");
  const [first_unpaid_blnc, setfirst_unpaid_blnc] = useState();
  const [rental_income_does_not_apply, setrental_income_does_not_apply] =
    useState();
  const [
    expected_net_monthly_rental_income,
    setexpected_net_monthly_rental_income,
  ] = useState();
  const [expected_monthly_rental_income, setexpected_monthly_rental_income] =
    useState();
  const [gifts_does_not_apply, setgifts_does_not_apply] = useState();
  const [first_asset_type, setfirst_asset_type] = useState("");
  const [first_deposited, setfirst_deposited] = useState();
  const [first_source, setfirst_source] = useState("");
  const [first_cash_market_val, setfirst_cash_market_val] = useState();
  const [ocupency, setocupency] = useState("Primary Residence");
  const [FHA_Secondary_Residence, setFHA_Secondary_Residence] = useState();
  const [PropertyInformation, setPropertyInformation] = useState([]);
  const [first_credit_limit, setfirst_credit_limit] = useState();
  const [MainId, setMainId] = useState(null);
  console.log(MainId, "MainId");
  const [data, setdata] = useState();
  const [Error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const [borrower_application_mortgage_info, setborrower_application_mortgage_info] = useState([]);
  const [borrower_application_asset, setborrower_application_asset] = useState();
  const [occupancy1, setoccupancy1] = useState();

  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleCheckboxChange = (event) => {
    setloan_purpose(event.target.value); // Update the state with the selected value
  };
  const handleCheckboxChange2 = (event) => {
    setocupency(event.target.value);
     // Update the state with the selected value
  };
  const handleget = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/loan/property/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response2121");
        setLoader(false);
        setError("");
          setborrower_application_mortgage_info(response.data.other_data.borrower_application_mortgage_info)
          setborrower_application_asset(response.data.other_data.borrower_application_asset)
          setoccupancy1(response.data.other_data.borrower_application_declaration?.primary_residence|| "")
        setMainId(response?.data?.data?.id || "");
        setPropertyInformation(response?.data?.data || "");
        setloan_amount(response?.data?.data?.loan_amount || "");
        setexpected_net_monthly_rental_income(
          response?.data?.data?.expected_net_monthly_rental_income || ""
        );
        setexpected_monthly_rental_income(
          response?.data?.data?.expected_monthly_rental_income || ""
        );
        setfirst_unpaid_blnc(response?.data?.data?.first_unpaid_blnc || "");
        setfirst_asset_type(response?.data?.data?.first_asset_type || "");
        setfirst_source(response?.data?.data?.first_source || "");
        setocupency(response?.data?.data?.occupancy || "Primary Residence");
        setcity(response?.data?.data?.city || "");
        setloan_purpose(response?.data?.data?.loan_purpose|| "Purchase");
        setfirst_create_name(response?.data?.data?.first_create_name || "");
        setstreet(response?.data?.data?.street || "");
        setfirst_cash_market_val(
          response?.data?.data?.first_cash_market_val || ""
        );
        setfirst_credit_limit(response?.data?.data?.first_credit_limit || "");
        setunit(response?.data?.data?.unit || "");
        setstate(response?.data?.data?.state || "");
        setzip(response?.data?.data?.zip || "");
        setfirst_monthly_payment(
          response?.data?.data?.first_monthly_payment || ""
        );
        setcountry(response?.data?.data?.country || "");
        setFHA_Secondary_Residence(
          response?.data?.data?.fha_Secondary_Residence ? 1 : 0 || ""
        );
        setfirst_deposited(response?.data?.data?.first_deposited ? 1 : 0 || "");
        setgifts_does_not_apply(
          response?.data?.data?.gifts_does_not_apply == 1 ? true : false || ""
        );
        setmanufactured_home(
          response?.data?.data?.manufactured_home == 1 ? true : false || ""
        );
        setmixed_use_property(
          response?.data?.data?.mixed_use_property == 1 ? true : false || ""
        );
        setnew_mortgage_loan_does_not_apply(
          response?.data?.data?.new_mortgage_loan_does_not_apply == 1
            ? true
            : false || ""
        );
        setrental_income_does_not_apply(
          response?.data?.data?.rental_income_does_not_apply == 1
            ? true
            : false || ""
        );
        setdata(response?.data?.data || "");
      })
      .catch((error) => {
        setLoader(false);
        // Swal.fire({
        //   showCloseButton: true,
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
    handleget();
  }, []);

  const handleadd = () => {
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    formdata.append("loan_amount", loan_amount?loan_amount:borrower_application_mortgage_info?.amount_of_loan);
    formdata.append("loan_purpose", loan_purpose);
    formdata.append("street", street);
    formdata.append("unit", unit);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("zip", zip);

    {
      MainId && formdata.append("id", MainId);
    }

    // formdata.append("id", MainId);
    formdata.append("country", country);
    formdata.append("no_of_units", unit);
    formdata.append("occupancy", ocupency);
    formdata.append(
      "fha_secondary_residence",
      FHA_Secondary_Residence === true ? 1 : 0
    );
    formdata.append("mixed_use_property", mixed_use_property ? 1 : 0);
    formdata.append("manufactured_home", manufactured_home ? 1 : 0);
    formdata.append(
      "new_mortgage_loan_does_not_apply",
      new_mortgage_loan_does_not_apply ? 1 : 0
    );
    formdata.append("first_create_name", first_create_name);
    formdata.append("first_lien", first_lien == "on" ? "on" : 0);
    formdata.append("first_monthly_payment", first_monthly_payment);
    formdata.append("first_unpaid_blnc", Number(first_unpaid_blnc));
    // formdata.append("second_credit_limit", second_credit_limit);
    formdata.append("first_credit_limit", first_credit_limit);
    formdata.append(
      "rental_income_does_not_apply",
      rental_income_does_not_apply ? 1 : 0
    );
    formdata.append(
      "expected_net_monthly_rental_income",
      expected_net_monthly_rental_income
    );
    formdata.append(
      "expected_monthly_rental_income",
      expected_monthly_rental_income
    );
    formdata.append("gifts_does_not_apply", gifts_does_not_apply ? 1 : 0);

    formdata.append("first_asset_type", first_asset_type?first_asset_type:borrower_application_asset[0]?.asset_type);
    formdata.append("first_deposited", first_deposited ? 1 : 0);
    formdata.append("first_cash_market_val", first_cash_market_val?first_cash_market_val:borrower_application_asset[0]?.cash_or_market);
    formdata.append("first_source", first_source);
    // formdata.append("second_deposited", second_deposited);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/loan/property/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setError("");
        console.log(response?.data, "###>>>");
        Swal.fire({
          showCloseButton: true,
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
        handleget();
      })
      .catch((error) => {
        setLoader(false);
        setError(error?.response?.data?.errors);
        console.log(Error, "errorsdasdsd");
        Swal.fire({
          showCloseButton: true,
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
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="row ps-2">
        <h2 className="mt-1 mb-5">4a. Loan and Property Information</h2>
        <div className="row">
          <h5
            className="font266"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Loan Amount
          </h5>
          <div className="col-lg-12 my-2 ps-0 pe-0">
            <div class="input-group mb-3">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                name=""
                defaultValue={PropertyInformation?.loan_amount?PropertyInformation?.loan_amount:borrower_application_mortgage_info?.amount_of_loan}
                id=""
                placeholder="Loan Amount"
                onChange={(e) => setloan_amount(e.target.value)}

                // value={down_payment}
                // onChange={(e) => {
                //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
                //     setDown_Payment(e.target.value)
                //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

                // }}
              />
              <span
                class="input-group-text rounded-0 bg-primary text-white"
                id="basic-addon2"
              >
                <FaSortAmountUpAlt fontSize={20} />
              </span>
            </div>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.loan_amount}
              </span>
            ) : null}
          </div>
          <h5
            className="font266"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Loan Purpose
          </h5>
          <div className="col-lg-12 my-2  ps-0 pe-0">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Purchase"
                id="flexCheckDefault1"
                onChange={handleCheckboxChange}
                checked={loan_purpose === "Purchase"}
                defaultChecked={
                  PropertyInformation?.loan_purpose == "purchase"
                    ? "btn btn-outline-primary"
                    : null? PropertyInformation?.loan_purpose == "purchase"
                    ? "btn btn-outline-primary"
                    : null:loan_purpose == ""
                    ? "btn btn-outline-primary"
                    : null
                }

                // Check if this option is selected
              />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                Purchase
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Refinance"
                id="flexCheckChecked1"
                onChange={handleCheckboxChange}
                defaultChecked={
                  PropertyInformation?.loan_purpose == "Refinance"
                    ? "btn btn-outline-primary"
                    : null
                }
                checked={loan_purpose === "Refinance"} // Check if this option is selected
              />

              <label className="form-check-label" htmlFor="flexCheckChecked1">
                Refinance
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Other"
                id="flexCheckChecked2"
                onChange={handleCheckboxChange}
                defaultChecked={
                  PropertyInformation?.loan_purpose == "Other"
                    ? "btn btn-outline-primary"
                    : null
                }
                checked={loan_purpose === "Other"} // Check if this option is selected
              />
              <label className="form-check-label" htmlFor="flexCheckChecked2">
                Other (specify)
              </label>
            </div>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.loan_purpose}
              </span>
            ) : null}
          </div>
          <h5
            className="font266"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Property Address
          </h5>
          <div className="col-lg-12 mt-2 ps-0 pe-0">
            <div class="input-group mb-3">
              <input
                className="form-control rounded-0 shadow-sm"
                type="text"
                name=""
                id=""
                onChange={(e) => setstreet(e.target.value)}
                defaultValue={PropertyInformation?.street}
                placeholder="Street  "
                // value={down_payment}
                // onChange={(e) => {
                //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
                //     setDown_Payment(e.target.value)
                //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

                // }}
              />
              <span
                class="input-group-text rounded-0 bg-primary text-white"
                id="basic-addon2"
              >
                <FaStreetView fontSize={18} />
              </span>
            </div>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.street}
              </span>
            ) : null}
          </div>
          <div className="col-lg-12 mt-2 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm"
              type="number"
              name=""
              id=""
              onChange={(e) => setunit(e.target.value)}
              defaultValue={PropertyInformation?.unit}
              placeholder="Unit "
              // value={down_payment}
              // onChange={(e) => {
              //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
              //     setDown_Payment(e.target.value)
              //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

              // }}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.unit}
              </span>
            ) : null}
          </div>
          <div className="col-lg-6 mt-2 ps-0 pe-0">
             <City className="shadow-sm mt-3" handleCityChange={handleCityChange} PropertyInformation={PropertyInformation}/>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.city}
              </span>
            ) : null}
          </div>
          <div className="col-lg-3 mt-2 ps-0 pe-0">
             <State className="mt-2" handleStateChange={handleStateChange} PropertyInformation={PropertyInformation}/>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.state}
              </span>
            ) : null}
          </div>
          <div className="col-lg-3 mt-2 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="number"
              name=""
              id=""
              onChange={(e) => setzip(e.target.value)}
              defaultValue={PropertyInformation?.zip}
              placeholder="Zip Code"
              // value={down_payment}
              // onChange={(e) => {
              //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
              //     setDown_Payment(e.target.value)
              //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

              // }}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.zip}
              </span>
            ) : null}
          </div>
          <div className="col-lg-4 mt-2 ps-0 pe-0">
             <Country className="mt-2" handlecountryChange={handlecountryChange} PropertyInformation={PropertyInformation}/>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.country}
              </span>
            ) : null}
          </div>
          <div className="col-lg-8 mt-2 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="number"
              name=""
              id=""
              onChange={(e) => setunit(e.target.value)}
              defaultValue={PropertyInformation?.no_of_units}
              placeholder="Number of Units "
              // value={down_payment}
              // onChange={(e) => {
              //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
              //     setDown_Payment(e.target.value)
              //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

              // }}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.no_of_units}
              </span>
            ) : null}
          </div>
          <h5
            className="font266"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Occupancy{" "}
          </h5>
          <div className="col-lg-12 my-2 ps-0 pe-0">
            <div class="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Primary Residence"
                id="flexCheckDefault1"
                onChange={handleCheckboxChange2}
                checked={ocupency === "Primary Residence"}
                // checked={ocupency === "Primary Residence" || occupancy1} // Check if this option is selected
              />
              <label class="form-check-label" for="flexCheckDefault1">
                Primary Residence
              </label>
            </div>
            <div class="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Second Home"
                id="flexCheckDefault1"
                defaultChecked={
                  PropertyInformation?.occupancy == "Second Home"
                    ? "btn btn-outline-primary"
                    : null
                }
                onChange={handleCheckboxChange2}
                checked={ocupency === "Second Home"} // Check if this option is selected
              />{" "}
              <label class="form-check-label" for="flexCheckChecked">
                Second Home
              </label>
            </div>
            <div class="form-check">
              <input
                className="form-check-input"
                type="radio"
                value="Investment Property"
                id="flexCheckDefault11s"
                onChange={handleCheckboxChange2}
                defaultChecked={
                  PropertyInformation?.occupancy == "Investment Property"
                    ? "btn btn-outline-primary"
                    : null
                }
                checked={ocupency === "Investment Property"} // Check if this option is selected
              />{" "}
              <label class="form-check-label" for="flexCheckDefault11s">
                Investment Property
              </label>
            </div>
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="FHA Secondary Residence"
                id="flexCheckDefault11"
                defaultChecked={FHA_Secondary_Residence == 1 ? true : false}
                onChange={(e) => setFHA_Secondary_Residence(e.target.checked)}
                // checked={FHA_Secondary_Residence}
              />
              <label class="form-check-label" for="flexCheckChecked">
                FHA Secondary Residence
              </label>
            </div>
          </div>
          {Error ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error.ocupency}
            </span>
          ) : null}
          <div className="col-lg-12 my-2 ps-0 pe-0">
            <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              1. Mixed-Use Property. If you will occupy the property, will you
              set aside space within the property to operate your own business?
              (e.g., daycare facility, medical office, beauty/barber shop)
            </h5>
            <div
              className="d-flex justify-content-between"
              style={{ width: "110px" }}
            >
              <div className="col-3 col-md-2 col-lg-1">
                <input
                  type="radio"
                  className="btn-check"
                  name="YES3"
                  id="YES3"
                  onChange={(e) => setmixed_use_property(1)}
                  autocomplete="off"
                  checked={
                    mixed_use_property == 1 ? "btn btn-outline-primary" : null
                  }

                  // checked={bankruptcy =1}
                  // onChange={() => set_bankruptcy(1)}
                />
                <label
                  className="btn btn-outline-primary rounded-0 "
                  for="YES3"
                >
                  Yes
                </label>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {Error.mixed_use_property}
                  </span>
                ) : null}
              </div>
              <div className="col-3 col-md-2 col-lg-1">
                <input
                  type="radio"
                  className="btn-check"
                  name="YES3"
                  id="No3"
                  onChange={(e) => setmixed_use_property(0)}
                  autocomplete="off"
                  checked={
                    mixed_use_property == 0 ? "btn btn-outline-primary" : null
                  }
                  // checked={bankruptcy == 0}
                  // onChange={() => set_bankruptcy(0)}
                />
                <label className="btn btn-outline-primary rounded-0 " for="No3">
                  No
                </label>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {Error.mixed_use_property}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-lg-12 my-2 ps-0 pe-0">
            <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              2. Manufactured Home. Is the property a manufactured home? (e.g.,
              a factory built dwelling built on a permanent chassis)
            </h5>
            <div className="col-lg-12 p-0 pt-2 pb-3">
              <div
                className="d-flex justify-content-between"
                style={{ width: "110px" }}
              >
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="YES4"
                    id="YES4"
                    checked={
                      manufactured_home == 1 ? "btn btn-outline-primary" : null
                    }
                    autocomplete="off"
                    onChange={(e) => setmanufactured_home(1)}
                  />

                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="YES4"
                  >
                    Yes
                  </label>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="YES4"
                    id="No4"
                    autocomplete="off"
                    checked={
                      manufactured_home == 0 ? "btn btn-outline-primary" : null
                    }
                    onChange={(e) => setmanufactured_home(0)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="No4"
                  >
                    No
                  </label>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.manufactured_home}
                    </span>
                  ) : null}
                </div>
              </div>
              <h5
                className="font266"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                3. New mortgage loan does not apply
              </h5>
              <div
                className="d-flex justify-content-between"
                style={{ width: "110px" }}
              >
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="YES5"
                    id="YES5"
                    checked={
                      new_mortgage_loan_does_not_apply == 1
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setnew_mortgage_loan_does_not_apply(1)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="YES5"
                  >
                    Yes
                  </label>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="YES5"
                    id="No5"
                    checked={
                      new_mortgage_loan_does_not_apply == 0
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setnew_mortgage_loan_does_not_apply(0)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="No5"
                  >
                    No
                  </label>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.mortgage_loan_does_not_apply}
                    </span>
                  ) : null}
                </div>
              </div>
              <h5
                className="font266"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                4. Gifts does not apply
              </h5>
              <div
                className="d-flex justify-content-between"
                style={{ width: "110px" }}
              >
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="abcds"
                    id="YES6s"
                    autocomplete="off"
                    checked={
                      gifts_does_not_apply == 1
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setgifts_does_not_apply(1)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="YES6s"
                  >
                    Yes
                  </label>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="abcds"
                    id="edsf"
                    autocomplete="off"
                    checked={
                      gifts_does_not_apply == 0
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setgifts_does_not_apply(0)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="edsf"
                  >
                    No
                  </label>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.gifts_does_not_apply}
                    </span>
                  ) : null}
                </div>
              </div>
              <h5
                className="font266"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                4. Rental income does not apply
              </h5>
              <div
                className="d-flex justify-content-between"
                style={{ width: "110px" }}
              >
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="gfgfgf"
                    id="YES7676"
                    autocomplete="off"
                    checked={
                      rental_income_does_not_apply == 1
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setrental_income_does_not_apply(1)}
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="YES7676"
                  >
                    Yes
                  </label>
                </div>
                <div className="col-3 col-md-2 col-lg-1">
                  <input
                    type="radio"
                    className="btn-check"
                    name="gfgfgf"
                    id="ghgh"
                    autocomplete="off"
                    onChange={(e) => setrental_income_does_not_apply(0)}
                    checked={
                      rental_income_does_not_apply == 0
                        ? "btn btn-outline-primary"
                        : null
                    }
                  />
                  <label
                    className="btn btn-outline-primary rounded-0 "
                    for="ghgh"
                  >
                    No
                  </label>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.rental_income_does_not_apply}
                    </span>
                  ) : null}
                </div>
              </div>

              {bankruptcy ? (
                <>
                  <label class="form-check-label" for="flexCheckChecked">
                    (e.g., daycare facility, medical office, beauty/barber shop)
                  </label>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {new_mortgage_loan_does_not_apply == 0 ? (
            <>
              <div className="col-lg-12 my-2 ps-0 pe-0">
                <input
                  className="form-control rounded-0 shadow-sm mt-2"
                  type="name"
                  placeholder="Credit Name"
                  onChange={(e) => setfirst_create_name(e.target.value)}
                  defaultValue={PropertyInformation?.first_create_name}
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {Error.first_create_name}
                  </span>
                ) : null}
              </div>
              <h5
                className="font266 mt-3"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Lien Type{" "}
              </h5>
              <div className="col-lg-12 my-2 ps-0 pe-0">
                <div class="form-check">
                  <input
                    defaultChecked={
                      PropertyInformation?.first_lien == "on"
                        ? "btn btn-outline-primary"
                        : null
                    }
                    onChange={(e) => setfirst_lien(e.target.value)}
                    class="form-check-input"
                    type="checkbox"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    First Lien
                  </label>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.first_lien}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-8 my-2 ps-0 pe-0">
                <input
                  onChange={(e) => setfirst_monthly_payment(e.target.value)}
                  className="form-control rounded-0 shadow-sm mt-2"
                  type="number"
                  defaultValue={PropertyInformation?.first_monthly_payment}
                  placeholder="Monthly Payment"
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {Error.first_monthly_payment}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 my-2 ps-0 pe-0">
                <input
                  className="form-control rounded-0 shadow-sm mt-2"
                  type="number"
                  onChange={(e) => setfirst_unpaid_blnc(e.target.value)}
                  defaultValue={PropertyInformation?.first_unpaid_blnc}
                  placeholder="unpaid balance"
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {Error.first_unpaid_blnc}
                  </span>
                ) : null}
              </div>
            </>
          ) : null}
         {gifts_does_not_apply == 0 ?(
          <>
          <h5
            className="font266 ps-0 pt-3"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Include all gifts and grants below. Under Source, choose from the
            sources listed here:
          </h5>
          <h5
            className="font266 mt-3 ps-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Deposited/Not Deposited
          </h5>
          <div className="col-lg-12 ps-0 pe-0">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                name="flexRadioDefault1"
                id="flexRadioDefault1"
                onChange={(e) => {
                  setfirst_deposited(!first_deposited);
                }}
                checked={first_deposited}
              />

              <label class="form-check-label" for="flexRadioDefault1">
                Deposited
              </label>
              {Error ? (
                <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error.first_deposited}
                </span>
              ) : null}
            </div>  
          </div>
          <div className="col-lg-12 mt-2 ps-0 pe-0">
            <div class="input-group mb-3">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                name=""
                id=""
                onChange={(e) => setfirst_cash_market_val(e.target.value)}
                defaultValue={PropertyInformation?.first_cash_market_val?PropertyInformation?.first_cash_market_val:borrower_application_asset[0]?.cash_or_market}
                placeholder="cash market val"
              />
              <span
                class="input-group-text rounded-0 bg-primary text-white"
                id="basic-addon2"
              >
                <FaDeezer fontSize={20} />
              </span>
            </div>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.first_cash_market_val}
              </span>
            ) : null}
          </div>
          <div className="col-lg-4 my-2 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="text"
              onChange={(e) => setfirst_asset_type(e.target.value)}
              defaultValue={PropertyInformation?.first_asset_type?PropertyInformation?.first_asset_type:borrower_application_asset[0]?.asset_type}
              placeholder="Asset Type"
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.first_asset_type}
              </span>
            ) : null}
          </div>
          <div className="col-lg-8 my-2 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="number"
              onChange={(e) => setfirst_source(e.target.value)}
              defaultValue={PropertyInformation?.first_source}
              placeholder=" source"
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.first_source}
              </span>
            ) : null}
          </div>
          </>
         ):null}
         {rental_income_does_not_apply == 0?(
          <>
          <div className="col-lg-12 ps-0 pe-0">
            <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Complete if the property is a 2-4 Unit Primary Residence or an
              Investment Property
            </h5>
            <label htmlFor="">Expected Monthly Rental Income </label>
            <div className="col-lg-12 ps-0 pe-0">
              <h5
                className="font266"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                expected monthly rental income
              </h5>
              <input
                className="form-control rounded-0 shadow-sm mt-2"
                type="number"
                name=""
                defaultValue={
                  PropertyInformation?.expected_monthly_rental_income
                }
                id=""
                onChange={(e) =>
                  setexpected_monthly_rental_income(e.target.value)
                }
                placeholder="$ expected monthly rental income"
                // value={down_payment}
                // onChange={(e) => {
                //     setDown_percent(Number(e.target.value) / Number(price_of_property.replaceAll(",", "")) * 100)
                //     setDown_Payment(e.target.value)
                //     console.log(Number((e.target.value / 100)) * Number(price_of_property.replaceAll(",", "")))

                // }}
              />
              {Error ? (
                <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error.expected_monthly_rental_income}
                </span>
              ) : null}
            </div>

            <label htmlFor="">
              For LENDER to calculate: Expected Net Monthly Rental Income{" "}
            </label>
          </div>
          <div className="col-lg-12 ps-0 pe-0">
            <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Amount
            </h5>
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="number"
              defaultValue={
                PropertyInformation?.expected_net_monthly_rental_income
              }
              onChange={(e) =>
                setexpected_net_monthly_rental_income(e.target.value)
              }
              placeholder="$ Amount"
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.expected_net_monthly_rental_income}
              </span>
            ) : null}
          </div>
          </>
         ):null}
          <div className="col-lg-4 ps-0 pe-0">
            <li>Community Nonprofit </li>
            <li> Employer </li>
            <li> Federal Agency </li>
            <li> Local Agency </li>
          </div>
          <div className="col-lg-4 ps-0 pe-0">
            <li>Federal Agency </li>
            <li> Religious Nonprofit</li>
            <li>State Agency </li>
          </div>
          <div className="col-lg-4 ps-0 pe-0">
            <li>Unmarried Partner </li>
            <li>Lender </li>
            <li> Other </li>
          </div>
          {/* <div className="col-lg-12 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="Asset_Type_Cash_Gift_Gift_of_Equity_Grant"
              name=""
              id=""
              placeholder="$"
            />
          </div> */}

          {/* <div className="col-lg-12 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="text"
              name=""
              id=""
              placeholder="Source use list above"
            />
          </div>
          <div className="col-lg-12 ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm mt-2"
              type="number"
              name=""
              id=""
              placeholder="Cash or Market Value"
            />
          </div> */}

          {/* <h5
            className="font26 mt-3"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Borrower Name
          </h5>
          <div className="col-lg-12 col-md-5  ps-0 pe-0">
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder=" Name"
              style={{ padding: "12px 10px", fontSize: "14px" }}
            // defaultValue={broker?.borrower_list_loan_first_name}
            // onChange={(e) => setborrower_list_loan_first_name(e.target.value)}
            />
          </div> */}
          <div className="mt-0 ps-0">
          <ButtonGlobal  handleSubmit={handleadd} btntext={"Submit"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanproInfo;
