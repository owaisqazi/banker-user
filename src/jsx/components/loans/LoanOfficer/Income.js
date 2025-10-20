/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineFieldTime } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BsPhoneVibrateFill } from "react-icons/bs";
import {
  FaCity,
  FaFileCode,
  FaFileInvoiceDollar,
  FaStreetView,
} from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { BiPhoneCall } from "react-icons/bi";
import City from "./Income/City";
import State from "./Income/State";
import Country from "./Income/Country";
import City1 from "./Income/City1";
import State1 from "./Income/State1";
import Country1 from "./Income/Country1";
import Previouscity from "./Income/Previouscity";
import Previousstate from "./Income/Previousstate";
import Previouscountry from "./Income/Previouscountry";
import  ButtonGlobal  from "./GlobalComponent/Button";

const Income = () => {
  const Token = useSelector((state) => state.auth.auth.idToken);
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [Id, setId] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [currant, setcurrant] = useState(false);
  const [employer_name, setemployer_name] = useState("");
  const [error, setError] = useState("");
  const [phone, setphone] = useState("");
  const [unit, setunit] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [zip, setzip] = useState("");
  const [street, setstreet] = useState("");
  const [country, setcountry] = useState("");
  const [start_date, setstart_date] = useState("");
  const [position, setposition] = useState("");
  const [bonus, setbonus] = useState("");
  const [base, setbase] = useState("");
  const [commission, setcommission] = useState("");
  const [overtime, setovertime] = useState("");
  const [other, setother] = useState("");
  const [total, settotal] = useState("");
  const [ts, setts] = useState(0);
  const [have_ownership_less_25, sethave_ownership_less_25] = useState(false);
  const [have_ownership_more_25, sethave_ownership_more_25] = useState(false);
  const [monthly_income, setmonthly_income] = useState("");
  const [business_owner, setbusiness_owner] = useState(false);
  const [self_employed, setself_employed] = useState(false);
  const [employed_family_member, setemployed_family_member] = useState(false);
  const [doe_not_apply, setdoe_not_apply] = useState(false);
  const [additional_employer_name, setadditional_employer_name] = useState("");
  const [additional_phone, setadditional_phone] = useState("");
  const [additional_street, setadditional_street] = useState("");
  const [additional_unit, setadditional_unit] = useState("");
  const [additional_city, setadditional_city] = useState("");
  const [additional_state, setadditional_state] = useState("");
  const [additional_zip, setadditional_zip] = useState("");
  const [additional_country, setadditional_country] = useState("");
  const [additional_start_date, setadditional_start_date] = useState("");
  const [additional_position, setadditional_position] = useState("");
  const [additional_monthly_income, setadditional_monthly_income] =
    useState("");
  const [additional_does_not_apply, setadditional_does_not_apply] =
    useState(false);
  const [additional_how_long_in_line, setadditional_how_long_in_line] =
    useState("");
  const [previous_does_not_apply, setprevious_does_not_apply] = useState(false);
  const [previous_employer_name, setprevious_employer_name] = useState("");
  const [other_sources_does_not_apply, setother_sources_does_not_apply] =
    useState(false);
  const [additional_business_owner, setadditional_business_owner] =
    useState(false);
  const [additional_bonus, setadditional_bonus] = useState("");
  const [additional_base, setadditional_base] = useState("");
  const [additional_commission, setadditional_commission] = useState("");
  const [additional_overtime, setadditional_overtime] = useState("");
  const [additional_other, setadditional_other] = useState("");
  const [additional_total, setadditional_total] = useState("");
  const [additional_ts, setadditional_ts] = useState("");
  const [
    additional_have_ownership_less_25,
    setadditional_have_ownership_less_25,
  ] = useState(0);
  const [
    additional_have_ownership_more_25,
    setadditional_have_ownership_more_25,
  ] = useState(0);
  const [
    additional_employed_family_member,
    setadditional_employed_family_member,
  ] = useState(0);
  const [previous_phone, setprevious_phone] = useState("");
  const [previous_street, setprevious_street] = useState("");
  const [previous_unit, setprevious_unit] = useState("");
  const [previous_start_date, setprevious_start_date] = useState("");
  const [previous_city, setprevious_city] = useState("");
  const [previous_state, setprevious_state] = useState("");
  const [previous_country, setprevious_country] = useState("");
  const [previous_zip, setprevious_zip] = useState("");
  const [previous_position, setprevious_position] = useState("");
  const [previous_business_owner, setprevious_business_owner] = useState(0);
  const [previous_monthly_income, setprevious_monthly_income] = useState("");
  const [income_source, setincome_source] = useState("");
  const [how_long_in_line, sethow_long_in_line] = useState("");
  const [other_source_monthly_income, setother_source_monthly_income] =
    useState("");
  const [other_source_total, setother_source_total] = useState("");
  const [previous_how_long_in_line, setprevious_how_long_in_line] =
    useState("");
  const handleadd = () => {
    const formdata = new FormData();
    // formdata.append("employee_name", employee_name)
    formdata.append("borrower_id", borrowerid || "");
    formdata.append("application_id", item.id|| "");
    formdata.append(
      "employer_name",
      employer_name ? employer_name : agreement?.employee_name || ""
    );

    {
      broker?.id && formdata.append("id", broker?.id);
    }
    formdata.append("phone", phone?phone:agreement?.work_phone || "");
    formdata.append("how_long_in_line", how_long_in_line || "");
    formdata.append("unit", unit || "");
    formdata.append("city", city || "");
    formdata.append("state", state || "");
    formdata.append("zip", zip || "");
    formdata.append("phone", phone || "");
    formdata.append("street", street || "");
    formdata.append("country", country || "");
    formdata.append(
      "start_date",
      start_date ? start_date : agreement?.start_date || ""
    );
    formdata.append(
      "position",
      position ? position : agreement?.position || ""
    );
    formdata.append("base", base ? base : +agreement?.base || "");
    formdata.append("bonus", bonus ? bonus : agreement?.bonus || "");
    formdata.append(
      "commission",
      commission ? commission : +agreement?.commission || ""
    );
    formdata.append(
      "overtime",
      overtime ? overtime : +agreement?.overtime || ""
    );
    formdata.append("other", other ? other : agreement?.other || "");
    formdata.append("total", total || "");
    formdata.append("ts", ts || "");
    formdata.append(
      "have_ownership_less_25",
      have_ownership_less_25 ? 1 : 0
    );
    formdata.append(
      "have_ownership_more_25",
      have_ownership_more_25 ? 1 : 0
    );
    formdata.append("monthly_income", monthly_income || "");
    formdata.append("business_owner", business_owner ? 1 : 0);
    formdata.append(
      "employed_family_member",
      employed_family_member ? 1 : 0
    );
    formdata.append("doe_not_apply", doe_not_apply ? 1 : 0);
    formdata.append("additional_employer_name", additional_employer_name || "");
    formdata.append("additional_phone", additional_phone || "");
    formdata.append("additional_street", additional_street || "");
    formdata.append("additional_unit", additional_unit || "");
    formdata.append("additional_city", additional_city || "");
    formdata.append("additional_state", additional_state || "");
    formdata.append("additional_zip", additional_zip || "");
    formdata.append("additional_country", additional_country || "");
    formdata.append(
      "additional_start_date",
      additional_start_date
        ? additional_start_date
        : agreement?.retirement_date || ""
    );
    formdata.append("additional_position", additional_position || "");
    formdata.append(
      "additional_monthly_income",
      additional_monthly_income || ""
    );
    formdata.append(
      "additional_does_not_apply",
      additional_does_not_apply ? 1 : 0
    );

    formdata.append(
      "additional_how_long_in_line",
      additional_how_long_in_line || ""
    );
    formdata.append(
      "previous_does_not_apply",
      previous_does_not_apply ? 1 : 0 
    );
    formdata.append("previous_employer_name", previous_employer_name || "");
    formdata.append(
      "other_sources_does_not_apply",
      other_sources_does_not_apply ? 1 : 0 
    );
    formdata.append(
      "additional_business_owner",
      additional_business_owner ? 1 : 0
    );
    formdata.append("additional_bonus", additional_bonus || "");
    formdata.append("additional_base", additional_base || "");
    formdata.append("additional_commission", employer_name || "");
    formdata.append("additional_commission", additional_commission || "");
    formdata.append("additional_overtime", additional_overtime || "");
    formdata.append("additional_other", additional_other || "");
    formdata.append("additional_total", additional_total || "");
    formdata.append("additional_ts", additional_ts || "");
    formdata.append(
      "additional_have_ownership_less_25",
      additional_have_ownership_less_25 ? 1 : 0
    );
    formdata.append(
      "additional_have_ownership_more_25",
      additional_have_ownership_more_25 ? 1 : 0
    );
    formdata.append(
      "additional_employed_family_member",
      additional_employed_family_member ? 1 : 0
    );
    formdata.append("previous_phone", previous_phone || "");
    formdata.append("previous_street", previous_street || "");
    formdata.append("previous_unit", previous_unit || "");
    formdata.append("previous_start_date", previous_start_date || "");
    formdata.append("previous_city", previous_city || "");
    formdata.append("previous_state", previous_state || "");
    formdata.append("previous_country", previous_country || "");
    formdata.append("previous_zip", previous_zip || "");
    formdata.append("previous_position", previous_position || "");
    formdata.append(
      "previous_business_owner",
      previous_business_owner ? 1 : 0
    );
    formdata.append("income_source", income_source?income_source:agreementOther?.other_type_income || "");
    formdata.append(
      "other_source_monthly_income",
      other_source_monthly_income?other_source_monthly_income:agreementOther?.amount || ""
    );
    formdata.append("other_source_total", other_source_total || "");
    formdata.append("previous_monthly_income", previous_monthly_income || "");
    formdata.append(
      "previous_how_long_in_line",
      previous_how_long_in_line || ""
    );
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/agreement/income`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    console.log(config);
    axios(config)
      .then(function (response) {
        console.log(response?.data, "###>>>");
        setError("");
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
        console.log(error);
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
  const [agreement, setagreement] = useState('');
  const [agreementOther, setagreementOther] = useState('');
  const [base_employment_income, setbase_employment_income] = useState(false);
  const [broker, setbroker] = useState();
  const handleget = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid || "");
    formdata.append("application_id", item.id|| "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/inco/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
    setLoader(false)
        setagreement(
          response.data.data.borrower_application_base_employment_income || ""
        );
        sethave_ownership_less_25(
          response.data.data.broker_agreement_income===null?response.data.data.borrower_application_base_employment_income?.ownership_share_ratio==="LESS THAN 25%"?1:0:response.data.data.broker_agreement_income?.have_ownership_less_25 || ""
        );
        sethave_ownership_less_25(
          response.data.data.broker_agreement_income===null?response.data.data.borrower_application_base_employment_income?.ownership_share_ratio==="LESS_THAN_25%"?1:0:response.data.data.broker_agreement_income?.have_ownership_less_25 || ""
        );
        sethave_ownership_more_25(
          response.data.data.broker_agreement_income===null?response.data.data.borrower_application_base_employment_income?.ownership_share_ratio==="25%_OR_MORE"?true:false:response.data.data.broker_agreement_income?.have_ownership_more_25?true:false || ""
        );
        setagreementOther(
          response.data.data.borrower_application_other_income || ""
        );
        setdoe_not_apply(response.data.data.broker_agreement_income?.doe_not_apply===null? response.data.data.borrower_application_base_employment_income[0]?.not_income: response.data.data.broker_agreement_income?.doe_not_apply|| ""
        );
        setbase_employment_income(
          response.data.data.borrower_application_base_employment_income?.base_employment_income==1?true:false || ""
        );
        setself_employed(
          response.data.data.borrower_application_base_employment_income?.employed_family_member==1?true:false || ""
        );
        setbroker(response.data.data.broker_agreement_income || "");
        setphone(response.data.data.broker_agreement_income?.phone || "");
        setadditional_business_owner(
          response.data.data.broker_agreement_income
            ?.additional_business_owner == 1
            ? true
            : false || ""
        );
        setadditional_city(
          response.data.data.broker_agreement_income?.additional_city || ""
        );
        setadditional_commission(
          response.data.data.broker_agreement_income?.additional_commission ||
            ""
        );
        setadditional_country(
          response.data.data.broker_agreement_income?.additional_country || ""
        );
        setadditional_does_not_apply(
          response.data.data.broker_agreement_income
            ?.additional_does_not_apply == 1
            ? true
            : false || ""
        );
        setadditional_employed_family_member(
          response.data.data.broker_agreement_income
            ?.additional_employed_family_member == 1
            ? true
            : false || ""
        );
        setadditional_employer_name(
          response.data.data.broker_agreement_income
            ?.additional_employer_name || ""
        );
        setadditional_have_ownership_less_25(
          response.data.data.broker_agreement_income?.additional_have_ownership_less_25 == 1?true:false);
        setadditional_have_ownership_more_25(
          response.data.data.broker_agreement_income
            ?.additional_have_ownership_more_25 == 1
            ? true
            : false || ""
        );
        setadditional_how_long_in_line(
          response.data.data.broker_agreement_income
            ?.additional_how_long_in_line || ""
        );
        setadditional_monthly_income(
          response.data.data.broker_agreement_income
            ?.additional_monthly_income || ""
        );
        setadditional_other(
          response.data.data.broker_agreement_income?.additional_other || ""
        );
        setadditional_overtime(
          response.data.data.broker_agreement_income?.additional_overtime || ""
        );
        setadditional_phone(
          response.data.data.broker_agreement_income?.additional_phone || ""
        );
        setadditional_position(
          response.data.data.broker_agreement_income?.additional_position || ""
        );
        setadditional_start_date(
          response.data.data.broker_agreement_income?.additional_start_date ||
            ""
        );
        setadditional_state(
          response.data.data.broker_agreement_income?.additional_state || ""
        );
        setadditional_street(
          response.data.data.broker_agreement_income?.additional_street || ""
        );
        setstreet(response.data.data.broker_agreement_income?.street || "");
        setadditional_base(
          response.data.data.broker_agreement_income?.additional_base || ""
        );
        setadditional_bonus(
          response.data.data.broker_agreement_income?.additional_bonus || ""
        );
        setunit(response.data.data.broker_agreement_income?.unit || "");
        setadditional_total(
          response.data.data.broker_agreement_income?.additional_total || ""
        );
        setadditional_ts(
          response.data.data.broker_agreement_income?.additional_ts || ""
        );
        setadditional_unit(
          response.data.data.broker_agreement_income?.additional_unit || ""
        );
        setadditional_zip(
          response.data.data.broker_agreement_income?.additional_zip || ""
        );
        setbase(response.data.data.broker_agreement_income?.base || "");
        setbonus(response.data.data.broker_agreement_income?.bonus || "");
        setbusiness_owner(
          response.data.data.broker_agreement_income?.business_owner == 1
            ? true
            : false || ""
        );
        setcity(response.data.data.broker_agreement_income?.city || "");
        setcommission(
          response.data.data.broker_agreement_income?.commission || ""
        );
        setcountry(response.data.data.broker_agreement_income?.country || "");
        setstate(response.data.data.broker_agreement_income?.state || "");
        setzip(response.data.data.broker_agreement_income?.zip || "");
        setemployed_family_member(
          response.data.data.broker_agreement_income?.employed_family_member ==
            1
            ? true
            : false || ""
        );
        setemployer_name(
          response.data.data.broker_agreement_income?.employer_name || ""
        );
        // setadditional_how_long_in_line(response.data.data.broker_agreement_income?.how_long_in_line||'');
        setincome_source(
          response.data.data.broker_agreement_income?.income_source || ""
        );
        // setmonthly_income(
        //   response.data.data.broker_agreement_income?.monthly_income || ""
        // );
        setother_source_monthly_income(
          response.data.data.broker_agreement_income
            ?.other_source_monthly_income || ""
        );
        setother_source_total(
          response.data.data.broker_agreement_income?.other_source_total || ""
        );
        setother_sources_does_not_apply(
          response.data.data.broker_agreement_income
            ?.other_sources_does_not_apply == 1
            ? true
            : false || ""
        );
        setprevious_business_owner(
          response.data.data.broker_agreement_income?.previous_business_owner ||
            ""
        );
        setprevious_city(
          response.data.data.broker_agreement_income?.previous_city || ""
        );
        setprevious_country(
          response.data.data.broker_agreement_income?.previous_country || ""
        );
        setprevious_does_not_apply(
          response.data.data.broker_agreement_income?.previous_does_not_apply ==
            1
            ? true
            : false || ""
        );
        setprevious_employer_name(
          response.data.data.broker_agreement_income?.previous_employer_name ||
            ""
        );
        setprevious_how_long_in_line(
          response.data.data.broker_agreement_income
            ?.previous_how_long_in_line || ""
        );
        setprevious_monthly_income(
          response.data.data.broker_agreement_income?.previous_monthly_income ||
            ""
        );
        setprevious_phone(
          response.data.data.broker_agreement_income?.previous_phone || ""
        );
        setprevious_position(
          response.data.data.broker_agreement_income?.previous_position || ""
        );
        setprevious_start_date(
          response.data.data.broker_agreement_income?.previous_start_date || ""
        );
        setprevious_state(
          response.data.data.broker_agreement_income?.previous_state || ""
        );
        setprevious_street(
          response.data.data.broker_agreement_income?.previous_street || ""
        );
        setprevious_unit(
          response.data.data.broker_agreement_income?.previous_unit || ""
        );
        setprevious_zip(
          response.data.data.broker_agreement_income?.previous_zip || ""
        );
        setstart_date(
          response.data.data.broker_agreement_income?.start_date || ""
        );
        setposition(response.data.data.broker_agreement_income?.position || "");
        // setemployer_name(
        //   response.data.data.broker_agreement_income?.mployer_name
        // ||'');
        setmonthly_income(
          response.data.data.broker_agreement_income?.monthly_income || ""
        );
        setother(response.data.data.broker_agreement_income?.other || "");
        setovertime(response.data.data.broker_agreement_income?.overtime || "");
        settotal(response.data.data.broker_agreement_income?.total || "");
        setts(response.data.data.broker_agreement_income?.ts || "");
        //   setBroker_id(response.data.data.broker_agreement_income?.id)
        // setId(response.data.data.broker_agreement_income?.id||'');
        setError("");
        console.log(response, "response");
        // Swal.fire({
        //     showCloseButton: true,
        //     toast: true,
        //     icon: "success",
        //     title: response?.data?.message,
        //     animation: true,
        //     position: "top-right",
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: true,
        //     didOpen: (toast) => {
        //         toast.addEventListener("mouseenter", Swal.stopTimer);
        //         toast.addEventListener("mouseleave", Swal.resumeTimer);
        //     },
        // });
      })
      .catch((error) => {
        setLoader(false);
        // setError('')
        // Swal.fire({
        //     showCloseButton: true,
        //     toast: true,
        //     icon: "error",
        //     title: error?.response?.data?.message,
        //     animation: true,
        //     position: "top-right",
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: true,
        //     didOpen: (toast) => {
        //         toast.addEventListener("mouseenter", Swal.stopTimer);
        //         toast.addEventListener("mouseleave", Swal.resumeTimer);
        //     },
        // });
      });
  };

  useEffect(() => {
    handleget();
  }, []);

  const handleCheckboxChange3 = (event) => {
    const checked = event.target.checked;
    setbusiness_owner(checked);
    setbase_employment_income(checked);
  };
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;

      setemployed_family_member(checked);
      setself_employed(checked);
    
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
    const handleadditionalcityChange = (selectedValue) => {
      setadditional_city(selectedValue);
      // You can do additional logic here based on the selected state value
    };
    // state funtion 
    const handleadditionalstateChange = (selectedValue) => {
      setadditional_state(selectedValue);
      // You can do additional logic here based on the selected state value
    };
    // country funtion
    const handleadditionalcountryChange = (selectedValue) => {
      setadditional_country(selectedValue);
      // You can do additional logic here based on the selected state value
    };
    // city funtion 
    const handlepreviouscityChange = (selectedValue) => {
      setprevious_city(selectedValue);
      // You can do previous logic here based on the selected state value
    };
    // state funtion 
    const handlepreviousstateChange = (selectedValue) => {
      setprevious_state(selectedValue);
      // You can do previous logic here based on the selected state value
    };
    // country funtion
    const handlepreviouscountryChange = (selectedValue) => {
      setprevious_country(selectedValue);
      // You can do previous logic here based on the selected state value
    };
  return (
    <>
    {loader ? <div className="loader"></div> : null}
      <div className="row">
        <h2 className="mt-1">Income</h2>
        <div className="col-md-12">
          <h4 className="mt-5 text-black rounded-0">Base Employment Income</h4>
          <div className="row">
            <div className="form-check mt-1">
              <input
                type="checkbox"
                className="form-check-input ms-0"
                id="flexCheckDefault111"
                checked={doe_not_apply}
                onChange={() => setdoe_not_apply(!doe_not_apply)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                Income Does Not Apply
              </label>
            </div>
            {doe_not_apply == 0 && (
              <>
                <div className="col-lg-8 pt-2 ps-0 pe-0">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Employer or Business Name"
                      defaultValue={
                        broker?.employer_name
                          ? broker?.employer_name
                          : agreement?.employee_name
                      }
                      onChange={(e) => setemployer_name(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <MdDriveFileRenameOutline
                        fontSize={"25px"}
                        color="white"
                      />
                    </span>
                  </div>
                  {error?.employer_name && error?.employer_name?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.employer_name[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 ps-0 pe-0 pt-2">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Phone"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={broker?.phone?broker?.phone:agreement?.work_phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <BsPhoneVibrateFill fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.phone && error?.phone?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.phone[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 pt-2 ps-0 pe-0">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Street"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={broker?.street}
                      onChange={(e) => setstreet(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <FaStreetView fontSize={"25px"} color="white" />
                    </span>
                  </div>

                  {error?.street && error?.street?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.street[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 ps-0 pe-0 pt-2">
                  <input
                    type="number"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Unit"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={broker?.unit}
                    onChange={(e) => setunit(e.target.value)}
                  />
                  {error?.unit && error?.unit?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.unit[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-7 pt-2 ps-0 pe-0">
                  <div class="input-group mb-3">
                    <City  handleCityChange={handleCityChange} broker={broker} agreement={agreement}/>
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <FaCity fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.city && error?.city?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.city[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5 ps-0 pe-0 pt-2">
                    <State  handleStateChange={handleStateChange} broker={broker} agreement={agreement}/>
                  {error?.state &&
                  error?.state?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.state[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 pt-2 pb-2 ps-0 pe-0">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Zip"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={broker?.zip}
                      onChange={(e) => setzip(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <FaFileCode fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.zip && error?.zip?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.zip[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-8 ps-0 pe-0 pt-2 pb-2">
                  {/* <input
                    type="text"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Country"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={broker?.country}
                    onChange={(e) => setcountry(e.target.value)}
                  /> */}
                    <Country  handlecountryChange={handlecountryChange} broker={broker} agreement={agreement}/>
                  {error?.country && error?.country?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.country[0]}
                    </span>
                  ) : null}
                </div>
                <div class="input-group mb-3 ps-0 pe-0">
                  <span
                    style={{ fontWeight: "600", maxWidth: "25%" }}
                    class="input-group-text rounded-0 ps-3 fontSW27"
                    id="basic-addon1"
                  >
                    Position or Title
                  </span>
                  <input
                    style={{ fontSize: "14px", fontWeight: "600" }}
                    type="text"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Required"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    defaultValue={
                      broker?.position ? broker?.position : agreement?.position
                    }
                    onChange={(e) => setposition(e.target.value)}
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdDriveFileRenameOutline fontSize={"25px"} color="white" />
                  </span>
                  {error?.position && error?.position?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.position[0]}
                    </span>
                  ) : null}
                </div>
                <div class="input-group mb-3 ps-0 pe-0">
                  <span
                    style={{ fontWeight: "600", maxWidth: "25%" }}
                    class="input-group-text rounded-0 ps-3 fontSW27"
                    id="basic-addon1"
                  >
                    Start Date
                  </span>
                  <input
                    style={{ fontSize: "14px", fontWeight: "600" }}
                    type="date"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Required"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    defaultValue={
                      broker?.start_date
                        ? broker?.start_date
                        : agreement?.start_date
                    }
                    onChange={(e) => setstart_date(e.target.value)}
                  />
                  {error?.start_date && error?.start_date?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.start_date[0]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-12 pt-2 ps-0 pe-0 pb-2">
                      <input
                        type="number"
                        class="form-control shadow-sm rounded-0 fontSW28 "
                        placeholder="Monthly Income"
                        aria-label="Username"
                        aria-describedby=""
                        defaultValue={broker?.monthly_income}
                        onChange={(e) =>
                          setmonthly_income(e.target.value)
                        }
                      />
                      {error?.monthly_income &&
                      error?.monthly_income?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.monthly_income[0]}
                          {error?.monthly_income[1]}
                        </span>
                      ) : null}
                    </div>
                <div className="row w-100 ">
                  <h4 className="mt-4 text-black rounded-0">
                    Check if this statement applies
                  </h4>
                  <div className="col-lg-12 ps-0 pe-0 pt-2 pb-2">
                    <div class="form-check my-2">
                      <input
                        type="checkbox"
                        class="form-check-input ms-1"
                        // checked/
                        id="flexCheckDefault22"
                        checked={base_employment_income || business_owner}
                        onChange={handleCheckboxChange3}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault22"
                      >
                        {" "}
                        I am employed by a family member, property seller, real
                        estate agent, or other party to the transaction.
                      </label>
                    </div>
                  </div>
                  {error?.employed_family_member &&
                  error?.employed_family_member?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.employed_family_member[0]}
                    </span>
                  ) : null}
                  <div class="form-check my-2">
                    <input
                      type="checkbox"
                      class="form-check-input ms-1"
                      id="flexCheckDefault211"
                      checked={employed_family_member || self_employed}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault211"
                    >
                      Check if you are the Business Owner of Self-Employed
                    </label>
                  </div>
                  {error?.business_owner &&
                  error?.business_owner?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.business_owner[0]}
                    </span>
                  ) : null}
                  <div class="form-check my-2">
                    <input
                      type="checkbox"
                      class="form-check-input ms-1"
                      id="flexCheckDefault19"
                      checked={have_ownership_less_25}
                      onChange={() =>
                        sethave_ownership_less_25(
                          !have_ownership_less_25
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      I have an ownership share of less than 25%
                    </label>
                  </div>
                  <div class="form-check my-2">
                    <input
                      type="checkbox"
                      class="form-check-input ms-1"
                      id="flexCheckDefault22"
                      checked={have_ownership_more_25}
                      onChange={() =>
                        sethave_ownership_more_25(
                          !have_ownership_more_25
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault1"
                    >
                      {" "}
                      I have an ownership share of 25% or more
                    </label>
                  </div>
                  <div className="col-lg-12 ps-0 pe-0">
                          <h4 className="mt-4 text-black rounded-0">
                            how long in this line of work?
                          </h4>
                          <input
                            style={{ fontSize: "14px", fontWeight: "600" }}
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 w-100"
                            placeholder="Required"
                            defaultValue={how_long_in_line}
                            onChange={(e) =>
                              sethow_long_in_line(e.target.value)
                            }
                          />
                          {error?.how_long_in_line &&
                          error?.how_long_in_line?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.how_long_in_line[0]}
                            </span>
                          ) : null}
                          {error?.how_long_in_line &&
                          error?.how_long_in_line?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.how_long_in_line[1]}
                            </span>
                          ) : null}
                        </div>
                </div>
                <h4 className="mt-4 text-black rounded-0">
                  Gross Monthly Income
                </h4>
                <div className="col-lg-8 pt-2 ps-0 pe-0">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Base"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={
                        broker?.base ? broker?.base : agreement?.base
                      }
                      onChange={(e) => setbase(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <FaFileInvoiceDollar fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.base && error?.base?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.base[0]}
                    </span>
                  ) : null}
                  {error?.base && error?.base?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.base[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-4 ps-0 pe-0 pt-2">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="Overtime"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={
                        broker?.overtime
                          ? broker?.overtime
                          : agreement?.overtime
                      }
                      onChange={(e) => setovertime(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <AiOutlineFieldTime fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.overtime && error?.overtime?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.overtime[0]}
                    </span>
                  ) : null}
                  {error?.overtime && error?.overtime?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.overtime[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5 pt-2 ps-0 pe-0">
                  <input
                    type="number"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Bonus"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={bonus ? bonus : agreement?.bonus}
                    onChange={(e) => setbonus(e.target.value)}
                  />
                  {error?.bonus && error?.bonus?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.bonus[0]}
                    </span>
                  ) : null}
                  {error?.bonus && error?.bonus?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.bonus[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-7 ps-0 pe-0 pt-2">
                  <input
                    type="number"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Commission"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={
                      broker?.commission
                        ? broker?.commission
                        : agreement?.commission
                    }
                    onChange={(e) => setcommission(e.target.value)}
                  />
                  {error?.commission && error?.commission?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.commission[0]}
                    </span>
                  ) : null}
                  {error?.commission && error?.commission?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.commission[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-5 pt-2 ps-0 pe-0">
                  <input
                    type="number"
                    class="form-control shadow-sm rounded-0 p-2 fontSW28 "
                    placeholder="ts"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={broker?.ts}
                    onChange={(e) => setts(e.target.value)}
                  />
                  {error?.ts && error?.ts?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.ts[0]}
                    </span>
                  ) : null}
                  {error?.ts && error?.ts?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.ts[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-7 pt-2 ps-0 pe-0">
                  <input
                    type="number"
                    class="form-control shadow-sm rounded-0 fontSW28 "
                    placeholder="Other"
                    aria-label="Username"
                    aria-describedby=""
                    defaultValue={
                      broker?.other ? broker?.other : agreement?.other
                    }
                    onChange={(e) => setother(e.target.value)}
                  />
                  {error?.other && error?.other?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.other[0]}
                    </span>
                  ) : null}
                  {error?.other && error?.other?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.other[1]}
                    </span>
                  ) : null}
                </div>
                <div className="col-lg-12 pt-2 pe-0 ps-0 pb-2">
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      class="form-control shadow-sm rounded-0 fontSW28 "
                      placeholder="TOTAL"
                      aria-label="Username"
                      aria-describedby=""
                      defaultValue={broker?.total}
                      onChange={(e) => settotal(e.target.value)}
                    />
                    <span
                      className="input-group-text p-0 bg-primary rounded-0"
                      id="basic-addon1"
                    >
                      <FaFileInvoiceDollar fontSize={"25px"} color="white" />
                    </span>
                  </div>
                  {error?.total && error?.total?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.total[0]}
                    </span>
                  ) : null}
                  {error?.total && error?.total?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.total[1]}
                    </span>
                  ) : null}
                </div>

                <>
                  <div className="row">
                    <h4 className="mt-5 text-black rounded-0">
                      IF APPLICABLE, Complete information for Additional
                      Employment/Self-Employment and Income
                    </h4>
                    <div className="row w-100 ">
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input ms-2"
                          id="flexCheckDefault77"
                          checked={additional_employed_family_member}
                          onChange={() =>
                            setadditional_employed_family_member(
                              !additional_employed_family_member
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          additional employed family member
                        </label>
                      </div>
                      {error?.additional_employed_family_member &&
                      error?.additional_employed_family_member?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.additional_employed_family_member[0]}
                        </span>
                      ) : null}
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input ms-2"
                          id="flexCheckDefault66"
                          checked={additional_have_ownership_less_25}
                          onChange={() =>
                            setadditional_have_ownership_less_25(!additional_have_ownership_less_25)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          I have an ownership share of less than 25%
                        </label>
                      </div>
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input ms-2"
                          id="flexCheckDefault699"
                          checked={additional_have_ownership_more_25}
                          onChange={() =>
                            setadditional_have_ownership_more_25(
                              !additional_have_ownership_more_25
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          I have an ownership share of 25% or more
                        </label>
                      </div>
                    </div>
                    <div className="form-check mt-3">
                      <input
                        type="checkbox"
                        className="form-check-input ms-2"
                        id="flexCheckDefault6"
                        checked={additional_business_owner}
                        onChange={() =>
                          setadditional_business_owner(
                            !additional_business_owner
                          )
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault1"
                      >
                        additional business owner or self
                      </label>
                    </div>
                    {error?.additional_business_owner &&
                    error?.additional_business_owner?.length >= 0 ? (
                      <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                        {error?.additional_business_owner[0]}
                      </span>
                    ) : null}
                    <div className="col-lg-12 ps-0 pe-0">
                      <div className="form-check mt-3">
                        <input
                          type="checkbox"
                          className="form-check-input ms-2"
                          id="flexCheckDefault5"
                          checked={additional_does_not_apply}
                          onChange={() =>
                            setadditional_does_not_apply(
                              !additional_does_not_apply
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault1"
                        >
                          Additional does not apply
                        </label>
                      </div>
                      {error?.additional_does_not_apply &&
                      error?.additional_does_not_apply?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.additional_does_not_apply[0]}
                        </span>
                      ) : null}
                    </div>
                    {additional_does_not_apply == 0 && (
                      <>
                       
                        <div className="col-lg-8 pt-2 ps-0 pe-0">
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Employer or Business Name"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_employer_name}
                              onChange={(e) =>
                                setadditional_employer_name(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <MdDriveFileRenameOutline
                                fontSize={"25px"}
                                color="white"
                              />
                            </span>
                          </div>
                          {error?.additional_employer_name &&
                          error?.additional_employer_name?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_employer_name[0]}
                            </span>
                          ) : null}
                          {error?.additional_employer_name &&
                          error?.additional_employer_name?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_employer_name[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-4 ps-0 pe-0 pt-2">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Phone"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_phone}
                              onChange={(e) =>
                                setadditional_phone(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <BsPhoneVibrateFill
                                fontSize={"25px"}
                                color="white"
                              />
                            </span>
                          </div>
                          {error?.additional_phone &&
                          error?.additional_phone?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_phone[0]}
                            </span>
                          ) : null}
                          {error?.additional_phone &&
                          error?.additional_phone?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_phone[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-8 pt-2 ps-0 pe-0">
                          <div class="input-group mb-3">
                            <input
                              type="text"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Street"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_street}
                              onChange={(e) =>
                                setadditional_street(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FaStreetView fontSize={"25px"} color="white" />
                            </span>
                          </div>
                          {error?.additional_street &&
                          error?.additional_street?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_street[0]}
                            </span>
                          ) : null}
                          {error?.additional_street &&
                          error?.additional_street?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_street[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-4 ps-0 pe-0 pt-2">
                          <input
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Unit"
                            aria-label="Username"
                            aria-describedby=""
                            defaultValue={broker?.additional_unit}
                            onChange={(e) => setadditional_unit(e.target.value)}
                          />
                          {error?.additional_unit &&
                          error?.additional_unit?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_unit[0]}
                            </span>
                          ) : null}
                          {error?.additional_unit &&
                          error?.additional_unit?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_unit[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-7 ps-0 pe-0 pt-2">
                          <div class="input-group mb-3">
                            <City1  handleadditionalcityChange={handleadditionalcityChange} broker={broker} agreement={agreement}/>
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FaCity fontSize={"25px"} color="white" />
                            </span>
                          </div>
                          {error?.additional_city &&
                          error?.additional_city?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_city[0]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-5 ps-0 pe-0 pt-2">
                          <State1  handleadditionalstateChange={handleadditionalstateChange} broker={broker} agreement={agreement}/>
                          {error?.additional_state &&
                          error?.additional_state?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_state[0]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-4 pt-2 pb-2 ps-0 pe-0">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Zip"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_zip}
                              onChange={(e) =>
                                setadditional_zip(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FaFileCode fontSize={"25px"} color="white" />
                            </span>
                          </div>
                          {error?.additional_zip &&
                          error?.additional_zip?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_zip[0]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-8 ps-0 pe-0 pt-2 pb-2">
                        <Country1  handleadditionalcountryChange={handleadditionalcountryChange} broker={broker} agreement={agreement}/>
                          {error?.additional_country &&
                          error?.additional_country?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_country[0]}
                            </span>
                          ) : null}
                        </div>
                        <div class="input-group mb-3 ps-0 pe-0">
                          <span
                            style={{ fontWeight: "600", maxWidth: "25%" }}
                            class="input-group-text rounded-0 ps-3 fontSW27"
                            id="basic-addon1"
                          >
                            Position or Title
                          </span>
                          <input
                            style={{ fontSize: "14px", fontWeight: "600" }}
                            type="text"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Required"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            defaultValue={broker?.additional_position}
                            onChange={(e) =>
                              setadditional_position(e.target.value)
                            }
                          />
                          <span
                            className="input-group-text p-0 bg-primary rounded-0"
                            id="basic-addon1"
                          >
                            <MdDriveFileRenameOutline
                              fontSize={"25px"}
                              color="white"
                            />
                          </span>
                          {error?.additional_position &&
                          error?.additional_position?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_position[0]}
                            </span>
                          ) : null}
                        </div>
                        <div class="input-group mb-3 ps-0 pe-0">
                          <span
                            style={{ fontWeight: "600", maxWidth: "25%" }}
                            class="input-group-text rounded-0 ps-3 fontSW27"
                            id="basic-addon1"
                          >
                            Start Date
                          </span>
                          <input
                            style={{ fontSize: "14px", fontWeight: "600" }}
                            type="date"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Required"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            defaultValue={
                              broker?.additional_start_date
                                ? broker?.additional_start_date
                                : agreement?.retirement_date
                            }
                            onChange={(e) =>
                              setadditional_start_date(e.target.value)
                            }
                          />
                          {error?.additional_start_date &&
                          error?.additional_start_date?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_start_date[0]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-12 ps-0 pe-0">
                          <h4 className="mt-4 text-black rounded-0">
                            how long in this line of work?
                          </h4>
                          <input
                            style={{ fontSize: "14px", fontWeight: "600" }}
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 w-100"
                            placeholder="Required"
                            defaultValue={additional_how_long_in_line}
                            onChange={(e) =>
                              setadditional_how_long_in_line(e.target.value)
                            }
                          />
                          {error?.additional_how_long_in_line &&
                          error?.additional_how_long_in_line?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_how_long_in_line[0]}
                            </span>
                          ) : null}
                          {error?.additional_how_long_in_line &&
                          error?.additional_how_long_in_line?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_how_long_in_line[1]}
                            </span>
                          ) : null}
                        </div>
                        <h4 className="mt-4 text-black rounded-0">
                          Gross Monthly Income
                        </h4>
                        <div className="col-lg-12 pt-2 ps-0 pe-0">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="monthly income (or loss)"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_monthly_income}
                              onChange={(e) =>
                                setadditional_monthly_income(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FaFileInvoiceDollar
                                fontSize={"25px"}
                                color="white"
                              />
                            </span>
                          </div>
                          {error?.additional_monthly_income &&
                          error?.additional_monthly_income?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_monthly_income[0]}
                              {error?.additional_monthly_income[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-8 pt-2 ps-0 pe-0">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Base"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={
                                broker?.additional_base 
                              }
                              onChange={(e) =>
                                setadditional_base(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FaFileInvoiceDollar
                                fontSize={"25px"}
                                color="white"
                              />
                            </span>
                          </div>
                          {error?.additional_base &&
                          error?.additional_base?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_base[0]}
                              {error?.additional_base[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-4 ps-0 pe-0 pt-2">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="Overtime"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_overtime}
                              onChange={(e) =>
                                setadditional_overtime(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <AiOutlineFieldTime
                                fontSize={"25px"}
                                color="white"
                              />
                            </span>
                          </div>
                          {error?.additional_overtime &&
                          error?.additional_overtime?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_overtime[0]}
                              {error?.additional_overtime[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-5 pt-2 ps-0 pe-0">
                          <input
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Bonus"
                            aria-label="Username"
                            aria-describedby=""
                            defaultValue={broker?.additional_bonus}
                            onChange={(e) =>
                              setadditional_bonus(e.target.value)
                            }
                          />
                          {error?.additional_bonus &&
                          error?.additional_bonus?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_bonus[0]}
                              {error?.additional_bonus[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-7 ps-0 pe-0 pt-2">
                          <input
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Commission"
                            aria-label="Username"
                            aria-describedby=""
                            defaultValue={broker?.additional_commission}
                            onChange={(e) =>
                              setadditional_commission(e.target.value)
                            }
                          />
                          {error?.additional_commission &&
                          error?.additional_commission?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_commission[0]}
                              {error?.additional_commission[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-5 pt-2 ps-0 pe-0">
                          <input
                            type="number"
                            class="form-control shadow-sm rounded-0 p-2 fontSW28 "
                            placeholder="Military"
                            aria-label="Username"
                            aria-describedby=""
                            defaultValue={broker?.additional_ts}
                            onChange={(e) => setadditional_ts(e.target.value)}
                          />
                          {error?.additional_ts &&
                          error?.additional_ts?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_ts[0]}
                              {error?.additional_ts[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-7 pt-2 ps-0 pe-0">
                          <input
                            type="number"
                            class="form-control shadow-sm rounded-0 fontSW28 "
                            placeholder="Other"
                            aria-label="Username"
                            aria-describedby=""
                            defaultValue={
                              broker?.additional_other
                            }
                            onChange={(e) =>
                              setadditional_other(e.target.value)
                            }
                          />
                          {error?.additional_other &&
                          error?.additional_other?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_other[0]}
                              {error?.additional_other[1]}
                            </span>
                          ) : null}
                        </div>
                        <div className="col-lg-12 pt-2 pe-0 ps-0 pb-2">
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              class="form-control shadow-sm rounded-0 fontSW28 "
                              placeholder="TOTAL"
                              aria-label="Username"
                              aria-describedby=""
                              defaultValue={broker?.additional_total}
                              onChange={(e) =>
                                setadditional_total(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text p-0 bg-primary rounded-0"
                              id="basic-addon1"
                            >
                              <FiDollarSign fontSize={"25px"} color="white" />
                            </span>
                          </div>
                          {error?.additional_total &&
                          error?.additional_total?.length >= 0 ? (
                            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                              {error?.additional_total[0]}
                              {error?.additional_total[1]}
                            </span>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                </>
                <h4 className="mt-4 text-black rounded-0">
                  Provide al Least 2 years of current and previous employment
                  and income
                </h4>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault4"
                    checked={previous_does_not_apply}
                    onChange={() =>
                      setprevious_does_not_apply(!previous_does_not_apply)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault4"
                  >
                    previous does not apply
                  </label>
                </div>
                {error?.previous_does_not_apply &&
                error?.previous_does_not_apply?.length >= 0 ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {error?.previous_does_not_apply[0]}
                  </span>
                ) : null}
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault3"
                    checked={previous_business_owner}
                    onChange={() =>
                      setprevious_business_owner(!previous_business_owner)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault3"
                  >
                    previous business owner
                  </label>
                </div>
                {error?.previous_business_owner &&
                error?.previous_business_owner?.length >= 0 ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {error?.previous_business_owner[0]}
                  </span>
                ) : null}
                {previous_does_not_apply == 0 && (
                  <>
                    <div className="col-lg-12 py-2 ps-0 pe-0">
                      <input
                        type="number"
                        class="form-control shadow-sm rounded-0 fontSW28"
                        placeholder="previous how long in line"
                        defaultValue={previous_how_long_in_line}
                        onChange={(e) =>
                          setprevious_how_long_in_line(e.target.value)
                        }
                      />
                      {error?.previous_how_long_in_line &&
                      error?.previous_how_long_in_line?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_how_long_in_line[0]}
                          {error?.previous_how_long_in_line[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-4 pt-2 ps-0 pe-0">
                      <div class="input-group mb-3">
                        <input
                          type="number"
                          class="form-control shadow-sm rounded-0 fontSW28 "
                          placeholder="Phone"
                          aria-label="Username"
                          aria-describedby=""
                          defaultValue={previous_phone}
                          onChange={(e) => setprevious_phone(e.target.value)}
                        />
                        <span
                          className="input-group-text p-0 bg-primary rounded-0"
                          id="basic-addon1"
                        >
                          <BiPhoneCall fontSize={"25px"} color="white" />
                        </span>
                      </div>
                      {error?.previous_phone &&
                      error?.previous_phone?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_phone[0]}
                          {error?.previous_phone[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-8 pt-2 ps-0 pe-0">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control shadow-sm rounded-0 fontSW28 "
                          placeholder="Employer or Business Name"
                          aria-label="Username"
                          aria-describedby=""
                          defaultValue={previous_employer_name}
                          onChange={(e) =>
                            setprevious_employer_name(e.target.value)
                          }
                        />
                        <span
                          className="input-group-text p-0 bg-primary rounded-0"
                          id="basic-addon1"
                        >
                          <MdDriveFileRenameOutline
                            fontSize={"25px"}
                            color="white"
                          />
                        </span>
                      </div>
                      {error?.previous_employer_name &&
                      error?.previous_employer_name?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_employer_name[0]}
                          {error?.previous_employer_name[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-8 pt-2 ps-0 pe-0 pe-0">
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          class="form-control shadow-sm rounded-0 fontSW28 "
                          placeholder="Street"
                          aria-label="Username"
                          aria-describedby=""
                          defaultValue={previous_street}
                          onChange={(e) => setprevious_street(e.target.value)}
                        />
                        <span
                          className="input-group-text p-0 bg-primary rounded-0"
                          id="basic-addon1"
                        >
                          <FaStreetView fontSize={"25px"} color="white" />
                        </span>
                      </div>
                      {error?.previous_street &&
                      error?.previous_street?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_street[0]}
                          {error?.previous_street[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-4 ps-0 pe-0 pt-2">
                      <input
                        type="number"
                        class="form-control shadow-sm rounded-0 fontSW28 "
                        placeholder="Unit"
                        aria-label="Username"
                        aria-describedby=""
                        defaultValue={previous_unit}
                        onChange={(e) => setprevious_unit(e.target.value)}
                      />
                      {error?.previous_unit &&
                      error?.previous_unit?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_unit[0]} 
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-5 pt-2 ps-0 pe-0">
                      <div class="input-group mb-3">
                        <Previouscity  handlepreviouscityChange={handlepreviouscityChange} broker={broker} agreement={agreement}/>
                        <span
                          className="input-group-text p-0 bg-primary rounded-0"
                          id="basic-addon1"
                        >
                          <FaCity fontSize={"25px"} color="white" />
                        </span>
                      </div>
                      {error?.previous_city &&
                      error?.previous_city?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_city[0]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-7 ps-0 pe-0 pt-2">
                       <Previousstate  handlepreviousstateChange={handlepreviousstateChange} broker={broker} agreement={agreement}/>
                      {error?.previous_state &&
                      error?.previous_state?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_state[0]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-5 pt-2 ps-0 pe-0 pb-2">
                      <div class="input-group mb-3">
                        <input
                          type="number"
                          class="form-control shadow-sm rounded-0 p-2 fontSW28 "
                          placeholder="Zip"
                          aria-label="Username"
                          aria-describedby=""
                          defaultValue={previous_zip}
                          onChange={(e) => setprevious_zip(e.target.value)}
                        />
                        <span
                          className="input-group-text p-0 bg-primary rounded-0"
                          id="basic-addon1"
                        >
                          <FaFileCode fontSize={"25px"} color="white" />
                        </span>
                      </div>
                      {error?.previous_zip &&
                      error?.previous_zip?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_zip[0]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-7 pt-2 ps-0 pe-0 pb-2">
                    <Previouscountry  handlepreviouscountryChange={handlepreviouscountryChange} broker={broker} agreement={agreement}/>
                      {error?.previous_country &&
                      error?.previous_country?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_country[0]}
                        </span>
                      ) : null}
                    </div>

                    <div class="input-group mb-3 ps-0 pe-0">
                      <span
                        style={{ fontWeight: "600", maxWidth: "25%" }}
                        class="input-group-text rounded-0 fontSW27"
                        id="basic-addon1"
                      >
                        Position or Title
                      </span>
                      <input
                        type="text"
                        class="form-control shadow-sm fontSW28  rounded-0 input26clr"
                        placeholder="Required"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        defaultValue={previous_position}
                        onChange={(e) => setprevious_position(e.target.value)}
                      />
                      <span
                        className="input-group-text p-0 bg-primary rounded-0"
                        id="basic-addon1"
                      >
                        <MdDriveFileRenameOutline
                          fontSize={"25px"}
                          color="white"
                        />
                      </span>
                      {error?.previous_position &&
                      error?.previous_position?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_position[0]}
                        </span>
                      ) : null}
                    </div>
                    <div class="input-group mb-3 ps-0 pe-0">
                      <span
                        style={{ fontWeight: "600", maxWidth: "25%" }}
                        class="input-group-text rounded-0 fontSW27"
                        id="basic-addon1"
                      >
                        Start Date
                      </span>
                      <input
                        type="date"
                        class="form-control shadow-sm fontSW28  rounded-0 input26clr"
                        placeholder="Required"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        defaultValue={previous_start_date}
                        onChange={(e) => setprevious_start_date(e.target.value)}
                      />
                      {error?.previous_start_date &&
                      error?.previous_start_date?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_start_date[0]}
                        </span>
                      ) : null}
                    </div>
                    <h4 className="mt-4 text-black rounded-0">
                      Previous Gross Monthly{" "}
                    </h4>
                    <div class="input-group mb-3 ps-0 pe-0">
                      <span
                        style={{ fontWeight: "600", maxWidth: "25%" }}
                        class="input-group-text rounded-0 fontSW27"
                        id="basic-addon1"
                      >
                        Income
                      </span>
                      <input
                        type="number"
                        class="form-control shadow-sm fontSW28  rounded-0 input26clr"
                        placeholder="previous monthly income"
                        defaultValue={previous_monthly_income}
                        onChange={(e) =>
                          setprevious_monthly_income(e.target.value)
                        }
                      />
                      {error?.previous_monthly_income &&
                      error?.previous_monthly_income?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.previous_monthly_income[0]}
                          {error?.previous_monthly_income[1]}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
                <h4 className="mt-4 text-black rounded-0">
                  Include income from other sources below. Under Income Source,
                  choose from the sources listed here:
                </h4>
                {/* <div class="form-check my-2">
              <input
                type="checkbox"
                class="form-check-label"
                defaultValue={broker?.previous_monthly_income}
                onChange={(e) => setprevious_does_not_apply(1)}
              />
              &nbsp;other sources does not apply
              {/* </label> */}
                {/* </div> */}

                <div className="col-lg-12 pt-2">
                  <div className="form-check mt-1">
                    <input
                      className="form-check-input my-1"
                      type="checkbox"
                      id="flexCheckDefault2"
                      checked={other_sources_does_not_apply}
                      onChange={() =>
                        setother_sources_does_not_apply(
                          !other_sources_does_not_apply
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault2"
                    >
                      other sources does not apply
                    </label>
                  </div>
                  {error?.other_sources_does_not_apply &&
                  error?.other_sources_does_not_apply?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {error?.other_sources_does_not_apply[0]}
                      {error?.other_sources_does_not_apply[1]}
                    </span>
                  ) : null}
                </div>

                <div className="col-lg-4 pt-3">
                  <li>Alimony </li>
                  <li> Automobile Allowance </li>
                  <li> Boarder Income </li>
                  <li> Capital Gains </li>
                </div>
                <div className="col-lg-4 pt-3">
                  <li>Child Support </li>
                  <li> Disability </li>
                  <li>Foster Care </li>
                  <li> Housing or Parsonage</li>
                </div>
                <div className="col-lg-4 pt-3">
                  <li>Interest and Dividends </li>
                  <li>Mortgage Credit Certificate </li>
                  <li>Mortgage Differential </li>
                  <li>Payments </li>
                </div>
                <div className="col-lg-4 pt-3 pb-3">
                  <li>Notes Receivable</li>
                  <li> Public Assistance</li>
                  <li>Retirement </li>
                  <li>(e.g., Pension, IRA)</li>
                </div>
                <div className="col-lg-4 pt-3 pb-3">
                  <li> Royalty Payments </li>
                  <li>Separate Maintenance </li>
                  <li> Social Security </li>
                  <li>Tr u s t </li>
                </div>
                <div className="col-lg-4 pt-3 pb-3">
                  <li> Unemployment </li>
                  <li> Benefits </li>
                  <li> VA Compensation </li>
                  <li>Other </li>
                </div>
                <h4 className="mt-4 text-black rounded-0">
                  NOTE: Reveal alimony, child support, separate maintenance, or
                  other income ONLY IF you want it considered in determining
                  your qualification{" "}
                </h4>
                {other_sources_does_not_apply == 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ps-0 pe-0 pb-2">
                      <input
                        type="text"
                        class="form-control shadow-sm rounded-0 fontSW28 "
                        placeholder="Income Source  use list above"
                        aria-label="Username"
                        aria-describedby=""
                        defaultValue={broker?.income_source?broker?.income_source:agreementOther?.other_type_income}
                        onChange={(e) => setincome_source(e.target.value)}
                      />
                      {error?.income_source &&
                      error?.income_source?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.income_source[0]}
                          {error?.income_source[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-6 pt-2 ps-0 pe-0 pb-2">
                      <input
                        type="number"
                        class="form-control shadow-sm rounded-0 fontSW28 "
                        placeholder="Monthly Income"
                        aria-label="Username"
                        aria-describedby=""
                        defaultValue={broker?.other_source_monthly_income?broker?.other_source_monthly_income:agreementOther?.amount}
                        onChange={(e) =>
                          setother_source_monthly_income(e.target.value)
                        }
                      />
                      {error?.other_source_monthly_income &&
                      error?.other_source_monthly_income?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.other_source_monthly_income[0]}
                          {error?.other_source_monthly_income[1]}
                        </span>
                      ) : null}
                    </div>
                    <div className="col-lg-12 pt-2 ps-0 pe-0 pb-2">
                      <input
                        type="number"
                        class="form-control shadow-sm rounded-0 fontSW28 "
                        placeholder="Provide TOTAL Amount Here"
                        aria-label="Username"
                        aria-describedby=""
                        defaultValue={broker?.other_source_total?broker?.other_source_total:agreementOther?.description}
                        onChange={(e) => setother_source_total(e.target.value)}
                      />
                      {error?.other_source_total &&
                      error?.other_source_total?.length >= 0 ? (
                        <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                          {error?.other_source_total[0]}
                          {error?.other_source_total[1]}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="mt-0 ps-0">
            <ButtonGlobal  handleSubmit={handleadd} btntext={"Submit"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Income;
