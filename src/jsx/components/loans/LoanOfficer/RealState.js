/* eslint-disable react/jsx-pascal-case */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiFillFileZip, AiOutlineArrowRight } from "react-icons/ai";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import {
  MdAccountBalanceWallet,
  MdDriveFileRenameOutline,
  MdPayment,
} from "react-icons/md";
import { FaCity } from "react-icons/fa";
import City from "./RealState/City";
import Country from "./RealState/Country";
import State from "./RealState/State";
import Additional_city from "./RealState/Additional_city";
import Additional_state from "./RealState/Additional_state";
import Additional_country from "./RealState/Additional_country";
import Buttonglobal from "./GlobalComponent/Button";


const RealState = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [updatedinfo, setupdatedinfo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [borrowerdata, setborrowerdata] = useState(false);
  const [application_id, setapplication_id] = useState(null);
  const [does_not_own_real_estate, set_does_not_own_real_estate] =
    useState(0);
  const [street, set_street] = useState("");
  const [unit, set_unit] = useState("");
  const [city, set_city] = useState("");
  const [state, set_state] = useState("");
  const [zip, set_zip] = useState("");
  const [country, set_country] = useState("");
  const [property_value, set_property_value] = useState();
  const [occupancy, set_occupancy] = useState("");
  const [monthly_dues, set_monthly_dues] = useState();
  const [monthly_rental_income, set_monthly_rental_income] = useState();
  const [monthly_net_rental_income, set_monthly_net_rental_income] = useState();

  const [first_creditor_name, set_first_creditor_name] = useState("");
  const [account_number, set_account_number] = useState();
  const [monthly_mortgage_payment, set_monthly_mortgage_payment] = useState();
  const [first_to_be_paid, set_first_to_be_paid] = useState(0);
  const [first_type, set_first_type] = useState("");
  const [first_credit_limit, set_first_credit_limit] = useState();
  const [
    additional_property_does_not_apply,
    set_additional_property_does_not_apply,
  ] = useState(0);
  const [additional_street, set_additional_street] = useState("");
  const [additional_unit, set_additional_unit] = useState("");
  const [additional_city, set_additional_city] = useState("");
  const [additional_state, set_additional_state] = useState("");
  const [additional_zip, set_additional_zip] = useState("");
  const [additional_country, set_additional_country] = useState("");
  const [additional_property_value, set_additional_property_value] = useState();
  const [status, set_status] = useState("");
  const [additional_occupancy, set_additional_occupancy] = useState("");
  const [additional_monthly_dues, set_additional_monthly_dues] = useState();
  const [
    additional_monthly_rental_income,
    set_additional_monthly_rental_income,
  ] = useState();
  const [
    additional_monthly_net_rental_income,
    set_additional_monthly_net_rental_income,
  ] = useState();
  const [
    loan_on_additional_property_does_not_apply,
    set_loan_on_additional_property_does_not_apply,
  ] = useState(false); // Initialize with false
  const [additional_first_creditor_name, set_additional_first_creditor_name] =
    useState("");
  const [additional_account_number, set_additional_account_number] = useState();
  const [
    additional_monthly_mortgage_payment,
    set_additional_monthly_mortgage_payment,
  ] = useState();
  const [additional_first_to_be_paid, set_additional_first_to_be_paid] =
    useState();
  const [additional_first_type, set_additional_first_type] = useState("");
  const [additional_first_credit_limit, set_additional_first_credit_limit] =
    useState("");
  const [additional_second_creditor_name, set_additional_second_creditor_name] =
    useState("");
  const [
    additional_second_account_number,
    set_additional_second_account_number,
  ] = useState("");
  const [
    additional_second_monthly_mortgage_payment,
    set_additional_second_monthly_mortgage_payment,
  ] = useState("");
  const [additional_second_to_be_paid, set_additional_second_to_be_paid] =
    useState("");
  const [loan_on_property_does_not_apply, set_loan_on_property_does_not_apply] =
    useState("");
  const [additional_second_credit_limit, set_additional_second_credit_limit] =
    useState("");
  const [borrower_name, set_borrower_name] = useState("");
  const [Error, setError] = useState(null);
  const [realestate, setrealestateData] = useState([]);
  const Token = useSelector((state) => state.auth.auth.idToken);

  const { id } = useParams();
  const handleget = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/real/estate/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
    .then(function (response) {
      setLoader(false)
      set_does_not_own_real_estate(
        response.data.data.broker_agreement_real_estate
          ?.does_not_own_real_estate===null?response.data.data.borrower_application_real_estate
          ?.does_not_own_real_estate:response.data.data.broker_agreement_real_estate
          ?.does_not_own_real_estate || ""
      );
        setapplication_id(
          response.data.data.broker_agreement_real_estate?.id || ""
        );
        setborrowerdata(
          response.data.data.borrower_application_real_estate || ""
        );
        set_additional_country(
          response.data.data.broker_agreement_real_estate?.additional_country ||
            ""
        );
        set_status(
          response.data.data.broker_agreement_real_estate?.status ||
            ""
        );
        // set_additional_property_does_not_apply(response.data.data.broker_agreement_real_estate?.additional_property_does_not_apply||'')
        set_additional_city(
          response.data.data.broker_agreement_real_estate?.additional_city || ""
        );
        set_first_to_be_paid(
          response.data.data.broker_agreement_real_estate?.first_to_be_paid ||
            ""
        );
        set_additional_monthly_dues(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_dues || ""
        );
        set_additional_monthly_net_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_net_rental_income || ""
        );
        set_additional_monthly_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_rental_income || ""
        );
        set_additional_occupancy(
          response.data.data.broker_agreement_real_estate
            ?.additional_occupancy || ""
        );
        set_property_value(
          response.data.data.broker_agreement_real_estate?.property_value || ""
        );
        set_monthly_dues(
          response.data.data.broker_agreement_real_estate?.monthly_dues || ""
        );
        set_first_credit_limit(
          response.data.data.broker_agreement_real_estate?.first_credit_limit ||
            ""
        );
        set_monthly_mortgage_payment(
          response.data.data.broker_agreement_real_estate
            ?.monthly_mortgage_payment || ""
        );
        set_monthly_net_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.monthly_net_rental_income || ""
        );
        set_monthly_net_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.monthly_net_rental_income || ""
        );
        set_additional_state(
          response.data.data.broker_agreement_real_estate?.additional_state ||
            ""
        );
        set_additional_street(
          response.data.data.broker_agreement_real_estate?.additional_street ||
            ""
        );
        set_additional_unit(
          response.data.data.broker_agreement_real_estate?.additional_unit || ""
        );
        set_additional_zip(
          response.data.data.broker_agreement_real_estate?.additional_zip || ""
        );
        set_loan_on_additional_property_does_not_apply(
          response.data.data.broker_agreement_real_estate
            ?.loan_on_additional_property_does_not_apply || ""
        );
        set_state(
          response.data.data.broker_agreement_real_estate?.state || ""
        );
        set_account_number(
          response.data.data.broker_agreement_real_estate?.account_number || ""
        );
        set_additional_account_number(
          response.data.data.broker_agreement_real_estate
            ?.additional_account_number || ""
        );
        set_additional_first_credit_limit(
          response.data.data.broker_agreement_real_estate
            ?.additional_first_credit_limit || ""
        );
        set_additional_first_creditor_name(
          response.data.data.broker_agreement_real_estate
            ?.additional_first_creditor_name || ""
        );
        set_additional_first_to_be_paid(
          response.data.data.broker_agreement_real_estate
            ?.additional_first_to_be_paid || ""
        );
        set_monthly_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.monthly_rental_income || ""
        );
        set_additional_first_type(
          response.data.data.broker_agreement_real_estate
            ?.additional_first_type || ""
        );
        set_additional_monthly_mortgage_payment(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_mortgage_payment || ""
        );
        set_additional_monthly_net_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_net_rental_income || ""
        );
        set_additional_monthly_rental_income(
          response.data.data.broker_agreement_real_estate
            ?.additional_monthly_rental_income || ""
        );
        set_additional_occupancy(
          response.data.data.broker_agreement_real_estate
            ?.additional_occupancy || ""
        );
        set_additional_property_does_not_apply(
          response.data.data.broker_agreement_real_estate
            ?.additional_property_does_not_apply || ""
        );
        set_additional_property_value(
          response.data.data.broker_agreement_real_estate
            ?.additional_property_value || ""
        );
        set_additional_second_account_number(
          response.data.data.broker_agreement_real_estate
            ?.additional_second_account_number || ""
        );
        set_additional_state(
          response.data.data.broker_agreement_real_estate?.additional_state ||
            ""
        );
        set_borrower_name(
          response.data.data.broker_agreement_real_estate?.borrower_name || ""
        );
        set_city(response.data.data.broker_agreement_real_estate?.city || "");
        set_country(
          response.data.data.broker_agreement_real_estate?.country || ""
        );
        set_first_creditor_name(
          response.data.data.broker_agreement_real_estate
            ?.first_creditor_name || ""
        );
        set_first_type(
          response.data.data.broker_agreement_real_estate?.first_type || ""
        );
        set_loan_on_property_does_not_apply(
          response.data.data.broker_agreement_real_estate
            ?.loan_on_property_does_not_apply || ""
        );
        set_occupancy(
          response.data.data.broker_agreement_real_estate?.occupancy || ""
        );
        set_street(
          response.data.data.broker_agreement_real_estate?.street || ""
        );
        set_unit(response.data.data.broker_agreement_real_estate?.unit || "");
        set_zip(response.data.data.broker_agreement_real_estate?.zip || "");
        //   setborrower_id(response.data.data.broker_agreement_personal_info?.borrower_id)
        console.log(response, "response real estate");
        setrealestateData(response?.data?.data?.broker_agreement_real_estate);
        console.log(realestate, "realestate");
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title: response?.data?.message,
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
      })
      .catch((error) => {
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
  console.log(loan_on_additional_property_does_not_apply);
  const handleadd = () => {
    const formdata = new FormData();
    // alert(additional_property_does_not_apply,'additional_property_does_not_apply')
    // formdata.append("second_deposited", second_deposited ? 1 : 0);
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);;
    if (application_id !== null) {
      formdata.append("id", application_id);
    }
    formdata.append("street", street);
    formdata.append("unit", unit);
    formdata.append("city", city);
    formdata.append("zip", zip);
    formdata.append("country", country);
    formdata.append("property_value", property_value?property_value:borrowerdata?.property_value);
    formdata.append("status", status?status:borrowerdata?.property_status);
    formdata.append("occupancy", occupancy);
    formdata.append("monthly_dues", monthly_dues);
    formdata.append("monthly_rental_income", monthly_rental_income);
    formdata.append("monthly_net_rental_income", monthly_net_rental_income);
      formdata.append(
        "loan_on_property_does_not_apply",
        loan_on_property_does_not_apply ? 1 : 0
      );
    formdata.append("first_creditor_name", first_creditor_name);
    formdata.append("account_number", account_number);
    formdata.append("monthly_mortgage_payment", monthly_mortgage_payment);
    formdata.append("first_to_be_paid", first_to_be_paid == 1 ? 1 : 0);
    formdata.append("first_type", first_type);
    formdata.append("first_credit_limit", first_credit_limit);
    formdata.append("additional_country", additional_country);
    formdata.append("additional_monthly_dues", additional_monthly_dues);
    formdata.append(
      "additional_monthly_net_rental_income",
      additional_monthly_net_rental_income
    );
    formdata.append(
      "additional_monthly_rental_income",
      additional_monthly_rental_income
    );
    formdata.append("additional_occupancy", additional_occupancy);
    // formdata.append("additional_property_does_not_apply", additional_property_does_not_apply);
    formdata.append("additional_property_value", additional_property_value);
    formdata.append("additional_street", additional_street);
    formdata.append("additional_unit", additional_unit);
    formdata.append("additional_zip", additional_zip);
    // formdata.append("state", state);
    formdata.append("additional_city", additional_city);

    formdata.append("additional_status", updatedinfo === true ? 1 : 0);
    formdata.append(
      "does_not_own_real_estate",
      does_not_own_real_estate == true ? 1 : 0
    );

    formdata.append("borrower_name", borrower_name);
    formdata.append(
      "loan_on_additional_property_does_not_apply",
      loan_on_additional_property_does_not_apply === true ? 1 : 0
    );

    formdata.append("additional_street", additional_street);
    formdata.append("additional_unit", additional_unit);
    formdata.append("additional_state", additional_state);
    formdata.append("additional_zip", additional_zip);
    formdata.append("additional_property_value", additional_property_value);
    formdata.append("additional_occupancy", additional_occupancy);
    formdata.append(
      "additional_property_does_not_apply",
      additional_property_does_not_apply? 1 : 0
    );

    formdata.append("additional_monthly_dues", additional_monthly_dues);
    formdata.append(
      "additional_monthly_rental_income",
      additional_monthly_rental_income
    );
    formdata.append(
      "additional_monthly_net_rental_income",
      additional_monthly_net_rental_income
    );

    formdata.append(
      "additional_first_creditor_name",
      additional_first_creditor_name
    );
    formdata.append(
      "additional_monthly_mortgage_payment",
      additional_monthly_mortgage_payment
    );
    formdata.append(
      "additional_first_to_be_paid",
      additional_first_to_be_paid == 1 ? 1 : 0
    );
    formdata.append("additional_first_type", additional_first_type);
    formdata.append(
      "additional_first_credit_limit",
      additional_first_credit_limit
    );
    formdata.append("additional_account_number", additional_account_number);
    formdata.append("state", state);
    // formdata.append("additional_second_creditor_name", additional_second_creditor_name);
    // formdata.append("additional_second_account_number", additional_second_account_number);
    // formdata.append("additional_second_monthly_mortgage_payment", additional_second_monthly_mortgage_payment);
    // formdata.append("additional_second_to_be_paid", additional_second_to_be_paid);
    // formdata.append("additional_second_credit_limit", additional_second_credit_limit);

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/real/estate/agreement`,
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
        handleget()
      })
      .catch((error) => {
        setError(error?.response?.data?.errors);
        console.log(Error, "-----------errorsda");

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

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      set_first_to_be_paid(true);
    } else {
      set_first_to_be_paid(false);
    }
    console.log(checked, "checked");
  };
  const handleCheckboxChange1 = (event) => {
    const { checked } = event.target;
    if (checked) {
      set_additional_first_to_be_paid(true);
    } else {
      set_additional_first_to_be_paid(false);
    }
    console.log(checked, "checked");
  };

   // city funtion
   const handlecityChange = (selectedValue) => {
    set_city(selectedValue);
    // You can do previous logic here based on the selected state value
  };
   // state funtion
   const handlestateChange = (selectedValue) => {
    set_state(selectedValue);
    // You can do previous logic here based on the selected state value
  };
   // country funtion
   const handlecountryChange = (selectedValue) => {
    set_country(selectedValue);
    // You can do previous logic here based on the selected state value
  };
   // city funtion
   const handleadditionalcityChange = (selectedValue) => {
    set_additional_city(selectedValue);
    // You can do previous logic here based on the selected state value
  };
   // state funtion
   const handleadditionalstateChange = (selectedValue) => {
    set_additional_state(selectedValue);
    // You can do previous logic here based on the selected state value
  };
   // country funtion
   const handleadditionalcountryChange = (selectedValue) => {
    set_additional_country(selectedValue);
    // You can do previous logic here based on the selected state value
  };
  return (
    <>
    {loader ? <div className="loader"></div> : null}
        <div className="col-lg-9">
          <h2 className="mt-1 ps-3">Real State</h2>
        </div>
        <div className="row mx-3 pb-3">
          <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            3a. Property You Own{" "}
          </h5>
              <div className="col-lg-12">
                <div class="form-check my-3 pt-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    // defaultChecked={
                    //   does_not_own_real_estate == 1
                    //     ? does_not_own_real_estate == 1
                    //     : borrowerdata?.does_not_own_real_estate == 1
                    // }
                    checked={
                      does_not_own_real_estate
                    }
                    onChange={(e) =>
                      set_does_not_own_real_estate(e.target.checked)
                    }
                  />
                  &nbsp; does not own real estate
                </div>
                  <lebal>
                    {" "}
                   
                    {Error ? (
                      <span className="error-container text-danger fw-normal fs-6">
                        {Error.does_not_own_real_estate}
                      </span>
                    ) : null}
                  </lebal>
              </div>
            {does_not_own_real_estate==0 &&(
              <>
              <div className="col-lg-8 pb-2 p-0 ">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="text"
                    name="Street"
                    placeholder="Street"
                    aria-label="Street"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    onChange={(e) => set_street(e.target.value)}
                    defaultValue={street ? street : borrowerdata?.street}
                    // }
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdDriveFileRenameOutline fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.street}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  name="Unit #"
                  placeholder="Unit "
                  aria-label="Unit #"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  onChange={(e) => set_unit(e.target.value)}
                  defaultValue={unit ? unit : borrowerdata?.unit}
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.unit}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0 ">
                <div class="input-group mb-3">
                   <City  handlecityChange={handlecityChange} city={city}/>
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <FaCity fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.city}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0">
              <State handlestateChange={handlestateChange} state={state}/>
              {console.log(state,"state===>")}
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.state}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="text"
                  placeholder="status"
                  aria-label="status"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  onChange={(e) => set_status(e.target.value)}
                  defaultValue={status ?status:borrowerdata?.property_status}
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.status}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-8 pb-2 p-0 pb-4">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    placeholder="Zip Code"
                    aria-label="Zip Code"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    onChange={(e) => set_zip(e.target.value)}
                    defaultValue={zip ? zip : borrowerdata?.zip}
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <AiFillFileZip fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.zip}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0 pb-4">
              <Country  handlecountryChange={handlecountryChange} country={country}/>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.country}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  placeholder="Property Value"
                  onChange={(e) => set_property_value(e.target.value)}
                  defaultValue={
                    property_value
                      ? property_value
                      : borrowerdata?.property_value
                  }
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.property_value}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-8 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  onChange={(e) => set_occupancy(e.target.value)}
                  defaultValue={occupancy ? occupancy : borrowerdata?.occupancy}
                  placeholder="Intended Occupancy Investment"
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.occupancy}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-4 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  defaultValue={
                    monthly_dues ? monthly_dues : borrowerdata?.monthly_dues
                  }
                  placeholder="monthly dues"
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  // }
                  onChange={(e) => set_monthly_dues(e.target.value)}
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.monthly_dues}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-8 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  placeholder="Monthly Rental Income"
                  defaultValue={
                    monthly_rental_income
                      ? monthly_rental_income
                      : borrowerdata?.whats_monthly_rent
                  }
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  onChange={(e) => set_monthly_rental_income(e.target.value)}
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.monthly_rental_income}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-12 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  placeholder="monthly net rental income"
                  defaultValue={
                    monthly_net_rental_income
                      ? monthly_net_rental_income
                      : borrowerdata?.monthly_net_rental_income
                  }
                  // value={e?.address}
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  onChange={(e) =>
                    set_monthly_net_rental_income(e.target.value)
                  }
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.monthly_net_rental_income}
                  </span>
                ) : null}
              </div>
              <h5
                className="font26 mb-3 p-md-0"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Mortgage Loan on this property
              </h5>
              <div className="col-lg-12 pb-2 p-0 pb-2 ms-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={()=>set_loan_on_property_does_not_apply(!loan_on_property_does_not_apply)}
                    checked={loan_on_property_does_not_apply}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                  loan on property does not apply
                  </label>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.first_to_be_paid}
                  </span>
                ) : null}
              </div>
              {loan_on_property_does_not_apply==0 &&(
                <>
              <div className="col-lg-4 pb-2 p-0 pb-2">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="text"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Creditor Name"
                    defaultValue={
                      first_creditor_name
                        ? first_creditor_name
                        : borrowerdata?.first_creditor_name
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    onChange={(e) => set_first_creditor_name(e.target.value)}
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdDriveFileRenameOutline fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.first_creditor_name}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-8 pb-2 p-0 pb-2">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    onChange={(e) => set_account_number(e.target.value)}
                    defaultValue={
                      account_number
                        ? account_number
                        : borrowerdata?.account_number
                    }
                    placeholder="Account Number"
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdAccountBalanceWallet fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.account_number}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-12 pb-2 p-0 pb-2">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Monthly Mortgage Payment"
                    onChange={(e) =>
                      set_monthly_mortgage_payment(e.target.value)
                    }
                    defaultValue={
                      monthly_mortgage_payment
                        ? monthly_mortgage_payment
                        : borrowerdata?.monthly_mortgage_payment
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdPayment fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.monthly_mortgage_payment}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-12 pb-2 p-0 pb-2 ms-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleCheckboxChange}
                    checked={
                      first_to_be_paid
                        ? first_to_be_paid
                        : borrowerdata?.first_to_be_paid
                    }
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    To be paid off at or before closing
                  </label>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.first_to_be_paid}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-12 pb-2 p-0 ">
                <div class="input-group mb-3">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="text"
                    name="first_type"
                    placeholder="type"
                    aria-label="type"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    onChange={(e) => set_first_type(e.target.value)}
                    defaultValue={
                      first_type ? first_type : borrowerdata?.first_type
                    }
                    // }
                    required
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdDriveFileRenameOutline fontSize={"25px"} color="white" />
                  </span>
                </div>
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.first_type}
                  </span>
                ) : null}
              </div>
              <div className="col-lg-12 pb-2 p-0 pb-2">
                <input
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  type="number"
                  class="form-control shadow-sm fontSW28 rounded-0"
                  placeholder="Credit Limit if applicable"
                  // value={e?.address}
                  defaultValue={
                    first_credit_limit
                      ? first_credit_limit
                      : borrowerdata?.first_credit_limit
                  }
                  // onChange={(event) =>
                  //   handleFormChange(event, i)
                  onChange={(e) => set_first_credit_limit(e.target.value)}
                  // }
                  required
                />
                {Error ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.first_credit_limit}
                  </span>
                ) : null}
              </div>
                </>
              )}
              
            {/* </div> */}
            <h5
                  className="font26 my-3 p-md-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  3b. IF Applicable Complete Information For Additional Property
                </h5>
            <div className="col-lg-12 ps-0 pe-0">
              <div class="form-check my-3 pt-1">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={
                    additional_property_does_not_apply
                      ? additional_property_does_not_apply
                      : borrowerdata?.additional_property_does_not_apply
                  }
                  onChange={(e) =>
                    set_additional_property_does_not_apply(!additional_property_does_not_apply)
                  }
                />
                &nbsp;
                <lebal>additional property does not apply</lebal>
                {Error?.additional_property_does_not_apply ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.additional_property_does_not_apply}
                  </span>
                ) : null}
              </div>
            </div>
          {/* </div> */}
          {additional_property_does_not_apply == 0 && (
            <>
                <div className="col-lg-12 pb-2 p-0 ">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="text"
                    name="Address"
                    placeholder="Street"
                    aria-label="Street"
                    defaultValue={
                      additional_street
                        ? additional_street
                        : borrowerdata?.additional_street
                    }
                    onChange={(e) => set_additional_street(e.target.value)}
                    class="form-control shadow-sm fontSW28 rounded-0"
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_street}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 pb-2 p-0 ">
                  <Additional_city  handleadditionalcityChange={handleadditionalcityChange} additional_city={additional_city} borrowerdata={borrowerdata}/>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_city}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    name="Unit #"
                    placeholder="unit "
                    onChange={(e) => set_additional_unit(e.target.value)}
                    defaultValue={
                      additional_unit
                        ? additional_unit
                        : borrowerdata?.additional_unit
                    }
                    aria-label="Unit #"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_unit}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 pb-2 p-0">
                  <Additional_state  handleadditionalstateChange={handleadditionalstateChange} additional_state={additional_state} borrowerdata={borrowerdata}/>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_state}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0 pb-4">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    placeholder="Zip Code"
                    aria-label="Zip Code"
                    defaultValue={
                      additional_zip
                        ? additional_zip
                        : borrowerdata?.additional_zip
                    }
                    onChange={(e) => set_additional_zip(e.target.value)}
                    class="form-control shadow-sm fontSW28 rounded-0"
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_zip}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0 pb-4">
                  <Additional_country  handleadditionalcountryChange={handleadditionalcountryChange} additional_country={additional_country} borrowerdata={borrowerdata}/>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_country}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder=" Property Value"
                    // value={e?.address}
                    onChange={(e) =>
                      set_additional_property_value(e.target.value)
                    }
                    defaultValue={
                      additional_property_value
                        ? additional_property_value
                        : borrowerdata?.additional_property_value
                    }
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_property_value}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Intended Occupancy Investment"
                    onChange={(e) => set_additional_occupancy(e.target.value)}
                    defaultValue={
                      additional_occupancy
                        ? additional_occupancy
                        : borrowerdata?.additional_occupancy
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_occupancy}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder=" monthly rental income"
                    // value={e?.address}
                    onChange={(e) =>
                      set_additional_monthly_rental_income(e.target.value)
                    }
                    defaultValue={
                      additional_monthly_rental_income
                        ? additional_monthly_rental_income
                        : borrowerdata?.additional_monthly_rental_income
                    }
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_monthly_rental_income}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder=" monthly dues"
                    onChange={(e) =>
                      set_additional_monthly_dues(e.target.value)
                    }
                    defaultValue={
                      additional_monthly_dues
                        ? additional_monthly_dues
                        : borrowerdata?.additional_monthly_dues
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }

                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_monthly_dues}
                    </span>
                  ) : null}
                </div>
              <div className="col-lg-8 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="For LENDER to calculate"
                    onChange={(e) =>
                      set_additional_monthly_net_rental_income(e.target.value)
                    }
                    defaultValue={
                      additional_monthly_net_rental_income
                        ? additional_monthly_net_rental_income
                        : borrowerdata?.additional_monthly_net_rental_income
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_monthly_net_rental_income}
                    </span>
                  ) : null}
                </div>
</>
          )}
                <h5
                  className="font26 mb-3 p-md-0"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Mortgage Loan on this property
                </h5>
                <div className="col-lg-12 ps-0 pe-0">
              <div class="form-check my-3 pt-1">
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={loan_on_additional_property_does_not_apply}
                  onChange={(e) =>
                    set_loan_on_additional_property_does_not_apply(!loan_on_additional_property_does_not_apply)
                  }
                />
                &nbsp;
                <lebal>loan on additional property does not apply</lebal>
                {Error?.loan_on_additional_property_does_not_apply ? (
                  <span className="error-container text-danger fw-normal fs-6">
                    {Error.loan_on_additional_property_does_not_apply}
                  </span>
                ) : null}
              </div>
            </div>
                
            {loan_on_additional_property_does_not_apply == 0 &&(
              <>
              <div className="col-lg-3 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="text"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Creditor Name"
                    onChange={(e) =>
                      set_additional_first_creditor_name(e.target.value)
                    }
                    defaultValue={
                      additional_first_creditor_name
                        ? additional_first_creditor_name
                        : borrowerdata?.additional_first_creditor_name
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_first_creditor_name}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Account Number"
                    onChange={(e) =>
                      set_additional_account_number(e.target.value)
                    }
                    defaultValue={
                      additional_first_credit_limit
                        ? additional_first_credit_limit
                        : borrowerdata?.additional_first_credit_limit
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_first_credit_limit}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Monthly Mortgage Payment"
                    onChange={(e) =>
                      set_additional_monthly_mortgage_payment(e.target.value)
                    }
                    defaultValue={
                      additional_monthly_mortgage_payment
                        ? additional_monthly_mortgage_payment
                        : borrowerdata?.additional_monthly_mortgage_payment
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_monthly_mortgage_payment}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-12 pb-2 p-0 pb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckIndeterminate"
                      onChange={handleCheckboxChange1}
                      checked={
                        additional_first_to_be_paid
                          ? additional_first_to_be_paid
                          : borrowerdata?.additional_first_to_be_paid
                      }
                    />
                    <label
                      class="form-check-label"
                      for="flexCheckIndeterminate"
                    >
                      additional To be paid off at or before closing
                    </label>
                  </div>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_first_to_be_paid}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-7 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Type FHA VA Conventional USDA RD Other"
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    onChange={(e) => set_additional_first_type(e.target.value)}
                    defaultValue={
                      additional_first_type
                        ? additional_first_type
                        : borrowerdata?.additional_first_type
                    }
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_first_type}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5 pb-2 p-0 pb-2">
                  <input
                    style={{ fontSize: "12px", fontWeight: "500" }}
                    type="number"
                    class="form-control shadow-sm fontSW28 rounded-0"
                    placeholder="Credit Limit if applicable"
                    onChange={(e) =>
                      set_additional_first_credit_limit(e.target.value)
                    }
                    defaultValue={
                      additional_first_credit_limit
                        ? additional_first_credit_limit
                        : borrowerdata?.additional_first_credit_limit
                    }
                    // value={e?.address}
                    // onChange={(event) =>
                    //   handleFormChange(event, i)
                    // }
                    required
                  />
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.additional_first_credit_limit}
                    </span>
                  ) : null}
                </div>
              </>
            )}
            </>
            )}
                <h5
            className="font26 mb-3 p-md-0"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Other Borrower Name
          </h5>
          <div className="col-lg-12  ps-0 pe-0">
            <div class="input-group mb-3">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                placeholder=" Name"
                style={{ padding: "12px 10px", fontSize: "14px" }}
                defaultValue={
                  borrower_name ? borrower_name : borrowerdata?.borrower_name
                }
                onChange={(e) => set_borrower_name(e.target.value)}

                // defaultValue={:borrowerdata?.broker?.borrower_list_loan_first_name}
                // onChange={(e) => setborrower_list_loan_first_name(e.target.value)}
              />
              <span
                className="input-group-text p-0 bg-primary rounded-0"
                id="basic-addon1"
              >
                <MdDriveFileRenameOutline fontSize={"25px"} color="white" />
              </span>
            </div>
            {Error ? (
                    <span className="error-container text-danger fw-normal fs-6">
                      {Error.borrower_name}
                    </span>
                  ) : null}
            </div>
            <div className="mt-0">
          <Buttonglobal  handleSubmit={handleadd} btntext={"Submit"}/>
            </div>
          </div>
      {/* </div> */}
    </>
  );
};

export default RealState;
