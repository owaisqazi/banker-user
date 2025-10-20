/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import {
  FaLandmark,
  FaMoneyCheckAlt,
  FaFunnelDollar,
  FaCreditCard,
} from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import ButtonGlobal from "./GlobalComponent/Button";


const Assets = () => {
  // const [id, setid] = useState('')
  const [loader, setLoader] = useState(false);
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [income_source, setincome_source] = useState("");
  const [borrowerdata, setborrowerdata] = useState([]);
  const [financial_institution, setfinancial_institution] = useState("");
  const [account_number, setaccount_number] = useState("");
  const [market_value, setmarket_value] = useState("");
  const [total_amount, settotal_amount] = useState("");
  const [other_asset_credit_not_apply, setother_asset_credit_not_apply] =
    useState(0);
  const [asset, setasset] = useState("");
  const [other_market_value, setother_market_value] = useState("");
  const [other_total_amount, setother_total_amount] = useState("");
  const [liabilities_not_apply, setliabilities_not_apply] = useState(0);
  const [account_type, setaccount_type] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [liabilities_account_number, setliabilities_account_number] =
    useState("");
  const [to_be_paid_of, setto_be_paid_of] = useState(0);
  const [other_liabilities, setother_liabilities] = useState("");
  const [other_liabilities_not_apply, setother_liabilities_not_apply] =
    useState(0);
  const [other_liabilities_market_value, setother_liabilities_market_value] =
    useState("");
  const [borrower_name, setborrower_name] = useState("");
  const [id, setid] = useState(null);

  const Token = useSelector((state) => state.auth.auth.idToken);
  // const [agreement, setagreement] = useState()
  // const [broker, setbroker] = useState()
  // const [application_id, setapplication_id] = useState()
  const [error, seterror] = useState();
  const handleget = () => {
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    console.log(borrowerid.id, "formdata");
    setLoader(true)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/asset/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
    setLoader(false)
        // setbroker(response.data.data.broker_agreement_asset)
        setid(response.data.data.broker_agreement_asset?.id || "");
        setborrowerdata(response.data.data.broker_agreement_asset===null?response.data.data.borrower_application_asset:response.data.data.broker_agreement_asset);
        // setborrower_id(response.data.data.broker_agreement_personal_info?.borrower_id)S

        console.log(response?.data?.data, "response123");
        // setid(response?.data?.data?.broker_agreement_asset?.id)
        setincome_source(
          response?.data?.data?.broker_agreement_asset?.income_source || ""
        );
        setfinancial_institution(
          response?.data?.data?.broker_agreement_asset?.financial_institution ||
            ""
        );
        setaccount_number(
          response?.data?.data?.broker_agreement_asset?.account_number || ""
        );
        setmarket_value(
          response?.data?.data?.broker_agreement_asset?.market_value || ""
        );
        settotal_amount(
          response?.data?.data?.broker_agreement_asset?.total_amount || ""
        );
        setother_asset_credit_not_apply(
          response?.data?.data?.broker_agreement_asset
            ?.other_asset_credit_not_apply || ""
        );
        setasset(response?.data?.data?.broker_agreement_asset?.asset || "");
        setother_market_value(
          response?.data?.data?.broker_agreement_asset?.other_market_value || ""
        );
        setother_total_amount(
          response?.data?.data?.broker_agreement_asset?.other_total_amount || ""
        );
        setliabilities_not_apply(
          response?.data?.data?.broker_agreement_asset?.liabilities_not_apply ||
            ""
        );
        setaccount_type(
          response?.data?.data?.broker_agreement_asset?.account_type || ""
        );
        setcompany_name(
          response?.data?.data?.broker_agreement_asset?.company_name || ""
        );
        setliabilities_account_number(
          response?.data?.data?.broker_agreement_asset
            ?.liabilities_account_number || ""
        );
        setto_be_paid_of(
          response?.data?.data?.broker_agreement_asset?.to_be_paid_of || ""
        );
        setother_liabilities(
          response?.data?.data?.broker_agreement_asset?.other_liabilities || ""
        );
        setother_liabilities_not_apply(
          response?.data?.data?.broker_agreement_asset
            ?.other_liabilities_not_apply || ""
        );
        setother_liabilities_market_value(
          response?.data?.data?.broker_agreement_asset
            ?.other_liabilities_market_value || ""
        );
        setborrower_name(
          response?.data?.data?.broker_agreement_asset?.borrower_name || ""
        );
      })
      .catch((error) => {
        console.log(error, "error");
      });
      
  };

  useEffect(() => {
    handleget();
  }, []);

  const handleadd = () => {
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid|| "");
    formdata.append("application_id", item.id|| "");
    {
      id && formdata.append("id", id|| "");
    }
    formdata.append("income_source", income_source?income_source:borrowerdata?.asset_type|| "");
    formdata.append("financial_institution", financial_institution?financial_institution:borrowerdata?.financial_inst|| "");
    formdata.append("account_number", account_number?account_number:borrowerdata?.account_number|| "");
    formdata.append("market_value", market_value?market_value:borrowerdata?.cash_or_market|| "");
    formdata.append("total_amount", total_amount?total_amount:borrowerdata?.no_of_shares|| "");
    formdata.append("asset", asset|| "");
    formdata.append("other_market_value", other_market_value|| "");
    formdata.append("other_total_amount", other_total_amount|| "");
    formdata.append("liabilities_not_apply", liabilities_not_apply ? 1 : 0);
    formdata.append("account_type", account_type|| "");
    formdata.append("company_name", company_name|| "");
    formdata.append("liabilities_account_number", liabilities_account_number|| "");
    formdata.append("to_be_paid_of", to_be_paid_of ? 1 : 0);
    formdata.append(
      "other_asset_credit_not_apply",
      other_asset_credit_not_apply == true ? 1 : 0);
    formdata.append("other_liabilities", other_liabilities|| "");
    formdata.append(
      "other_liabilities_market_value",
      other_liabilities_market_value
    || "");
    formdata.append(
      "other_liabilities_not_apply",
      other_liabilities_not_apply ? 1 : 0);
    formdata.append("borrower_name", borrower_name|| "");

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/asset/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
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
        seterror("");

        // setincome_source("");
        // setfinancial_institution("");
        // setaccount_number("");
        // setmarket_value("");
        // settotal_amount("");
        // setother_asset_credit_not_apply(0);
        // setasset("");
        // setother_market_value("");
        // setother_total_amount("");
        // setliabilities_not_apply(0);
        // setaccount_type("");
        // setcompany_name("");
        // setliabilities_account_number("");
        // setto_be_paid_of(0);
        // setother_liabilities("");
        // setother_liabilities_not_apply(0);
        // setother_liabilities_market_value("");
        // setborrower_name("");
      })
      .catch((error) => {
        seterror(error?.response?.data?.errors);
        setLoader(false);

        // setincome_source('')
        // setfinancial_institution('')
        // setaccount_number('')
        // setmarket_value('')
        // settotal_amount('')
        // setother_asset_credit_not_apply('')
        // setasset('')
        // setother_market_value('')
        // setother_total_amount('')
        // setliabilities_not_apply('')
        // setaccount_type('')
        // setcompany_name('')
        // setliabilities_account_number('')
        // setto_be_paid_of('')
        // setother_liabilities('')
        // setother_liabilities_not_apply('')
        // setother_liabilities_market_value('')
        // setborrower_name('')

        console.log(error, "errorrr123");
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

  console.log(to_be_paid_of, "to_be_paid_of");
  return (
    <>
    {loader ? <div className="loader"></div> : null}
      <div className="row">
        <h2 className="mt-1">Assets</h2>
        <div className="mx-3" style={{ width: "98%" }}>
          <>
            <div className="d-flex">
              <h6 className="fontSW26">Total Assets</h6>
              <h6 className="fontSW26 ms-2">$22.0</h6>
            </div>
            <div className="col-lg-12">
              <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
                2a. Assets- Bank Accounts, Retirement, and Other Accounts You
                Have
              </h4>
              <span class="input-group-label contact-info-label border-0">
                Include all accounts below. Under Account Type, choose from the
                types listed here
              </span>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <li className="text-dark mt-4">Checking</li>
                <li className="text-dark mt-2">Savings</li>
                <li className="text-dark mt-2">Money Market</li>
              </div>
              <div className="col-lg-4">
                <li className="text-dark mt-4">Certificate of Deposit</li>
                <li className="text-dark mt-2">mutual found</li>
                <li className="text-dark mt-2">Stocks</li>
              </div>
              <div className="col-lg-4">
                <li className="text-dark mt-4">Stocks Option</li>
                <li className="text-dark mt-2">Bonds</li>
                <li className="text-dark mt-2">Retirement (e.g., 401k, IRA)</li>
              </div>
              <div className="col-lg-4">
                <li className="text-dark mt-4">Bridge Loan Proceeds</li>
                <li className="text-dark mt-2">
                  Individual Development Account
                </li>
              </div>
              <div className="col-lg-5">
                <li className="text-dark mt-4">
                  Trust Account Cash Value of Life Insurance
                </li>
              </div>
              <div className="col-lg-8 pt-3 ps-0 pe-0">
                <input
                  type="text"
                  class="form-control shadow rounded-0 fontSW28 "
                  placeholder="Account Source use list above"
                  aria-label="Username"
                  defaultValue={borrowerdata?.income_source?borrowerdata?.income_source:borrowerdata?.asset_type}
                  aria-describedby=""
                  onChange={(e) => setincome_source(e.target.value)}
                />
                {error?.income_source ? (
                  <div className="text-danger">
                  {error?.income_source[0]}
                  {error?.income_source[1]}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-4 ps-0 pe-0 pt-3">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control shadow rounded-0 fontSW28 "
                    placeholder="Financial Institution "
                    aria-label="Username"
                    defaultValue={ financial_institution
                      ?financial_institution
                        : borrowerdata?.financial_inst
                    }
                    aria-describedby=""
                    onChange={(e) => setfinancial_institution(e.target.value)}
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <FaLandmark fontSize={"32px"} color="white" />
                  </span>
                </div>
                {error?.financial_institution ? (
                  <div className="text-danger">
                    {error?.financial_institution[0]}
                    {error?.financial_institution[1]}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-8 pt-2 ps-0 pe-0">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control shadow rounded-0 fontSW28 "
                    placeholder="Account Number"
                    aria-label="Username"
                    defaultValue={borrowerdata?.account_number}
                    aria-describedby=""
                    onChange={(e) => setaccount_number(e.target.value)}
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <FaMoneyCheckAlt fontSize={"30px"} color="white" />
                  </span>
                </div>
                {error?.account_number ? (
                  <div className="text-danger">
                  {error?.account_number[0]}
                  {error?.account_number[1]}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-4 ps-0 pe-0 pt-2">
                <input
                  type="number"
                  class="form-control shadow rounded-0 fontSW28 "
                  placeholder="Cash or Market Value"
                  aria-label="Username"
                  defaultValue={market_value? market_value
                   : borrowerdata?.cash_or_market  
                  }
                  aria-describedby=""
                  onChange={(e) => setmarket_value(e.target.value)}
                />
                {error?.market_value ? (
                  <div className="text-danger">
                  {error?.market_value[0]}
                  {error?.market_value[1]}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-12 pt-2 ps-0 pe-0">
                <div class="input-group mb-3">
                  <input
                    type="number"
                    class="form-control shadow rounded-0 fontSW28 "
                    placeholder="Provide TOTA L  Amount Here "
                    aria-label="Username"
                    defaultValue={ total_amount?
                      total_amount :borrowerdata?.no_of_shares
                    }
                    aria-describedby=""
                    onChange={(e) => settotal_amount(e.target.value)}
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <FaFunnelDollar fontSize={"30px"} color="white" />
                  </span>
                </div>
                {error?.total_amount ? (
                  <div className="text-danger">
                  {error?.total_amount[0]}
                  {error?.total_amount[1]}
                  </div>
                ) : null}
              </div>
              <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
                2b. Other Assets Credits you have
              </h4>
              <div className="col-lg-8">
                <div class="form-check my-2">
                  <input
                    type="checkbox"
                    class="form-check-label pt-3"
                    checked={
                      other_asset_credit_not_apply
                    }
                    onChange={(e) =>
                      setother_asset_credit_not_apply(!other_asset_credit_not_apply)
                    }
                  />
                  &nbsp;
                  {/* </label> */}
                  <span class="input-group-label contact-info-label border-0 pt-3">
                    Other Assets Credits Not Apply
                  </span>
                </div>

                <li className="text-dark mt-4">
                  Proceeds from Real Estate Property to be sold on or before
                  closing
                </li>
                <li className="text-dark mt-2">
                  Proceeds from Sale of Non-Real Estate Asset
                </li>
                <li className="text-dark mt-2">Secured Borrowed Funds</li>
                <li className="text-dark mt-2">Unsecured Borrowed Funds</li>
                <li className="text-dark mt-4">Other</li>
              </div>
              <div className="col-lg-4">
                <span class="input-group-label contact-info-label border-0 pt-3">
                  Credits
                </span>
                <li className="text-dark mt-4">Earnest Money</li>
                <li className="text-dark mt-2">Lot Equity</li>
                <li className="text-dark mt-2">Employer Assistance</li>
                <li className="text-dark mt-2">Relocation Funds</li>
                <li className="text-dark mt-2">Rent Credit</li>
                <li className="text-dark mt-4">Sweat Equity</li>
                <li className="text-dark mt-4">Trade Equity</li>
              </div>
              {other_asset_credit_not_apply == 0 && (
                <>
                  <div className="col-lg-8 pt-3 ps-0 pe-0">
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        class="form-control shadow rounded-0 fontSW28 "
                        placeholder="Asset or Credit Type use list above"
                        aria-label="Username"
                        defaultValue={asset ? asset : borrowerdata?.asset}
                        aria-describedby=""
                        onChange={(e) => setasset(e.target.value)}
                      />
                      <span
                        className="input-group-text p-0 bg-primary rounded-0"
                        id="basic-addon1"
                      >
                        <FaCreditCard fontSize={"30px"} color="white" />
                      </span>
                    </div>
                    {error?.asset ? (
                      <div className="text-danger">
                      {error?.asset[0]}
                      {error?.asset[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-4 ps-0 pe-0 pt-3">
                    <input
                      type="number"
                      class="form-control shadow rounded-0 fontSW28 "
                      placeholder="Cash or Market Value "
                      aria-label="Username"
                      defaultValue={
                        other_market_value
                          ? other_market_value
                          : borrowerdata?.other_market_value
                      }
                      aria-describedby=""
                      onChange={(e) => setother_market_value(e.target.value)}
                    />
                    {error?.other_market_value ? (
                      <div className="text-danger">
                        {error?.other_market_value[0]}
                        {error?.other_market_value[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-12 pt-2 ps-0 pe-0">
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        class="form-control shadow rounded-0 fontSW28 "
                        placeholder="Provide TOTAL Amount Here"
                        aria-label="Username"
                        defaultValue={
                          other_total_amount
                            ? other_total_amount
                            : borrowerdata?.other_total_amount
                        }
                        aria-describedby=""
                        onChange={(e) => setother_total_amount(e.target.value)}
                      />
                      <span
                        className="input-group-text p-0 bg-primary rounded-0"
                        id="basic-addon1"
                      >
                        <FaFunnelDollar fontSize={"30px"} color="white" />
                      </span>
                    </div>
                    {error?.other_total_amount ? (
                      <div className="text-danger">
                        {error?.other_total_amount[0]}
                        {error?.other_total_amount[1]}
                      </div>
                    ) : null}
                  </div>
                </>
              )}
              <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
                2c. liabilities Credits Cards,Other Debts, and Leases that you
                Owe{" "}
              </h4>

              <div class="form-check my-2">
                <input
                  type="checkbox"
                  class="form-check-label pt-3"
                  checked={
                    liabilities_not_apply 
                  }
                  onChange={(e) => setliabilities_not_apply(e.target.checked)}
                />
                &nbsp;
                {/* </label> */}
                <span class="input-group-label contact-info-label border-0 pt-3">
                  liabilities not apply
                </span>
              </div>
              <div className="col-lg-5">
                <li className="text-dark mt-4">
                  Revolving (e.g., credit cards)
                </li>
                <li className="text-dark mt-4">
                  Installment (e.g., car, student, personal loans)
                </li>
              </div>
              <div className="col-lg-5">
                <li className="text-dark mt-4">
                  Open 30-Day (balance paid monthly)
                </li>
                <li className="text-dark mt-4">Lease (not real estate)</li>
              </div>
              <div className="col-lg-2">
                <li className="text-dark mt-4">Other</li>
              </div>
              {liabilities_not_apply == 0 && (
                <>
                  <div className="col-lg-8 pt-3 ps-0 pe-0">
                    <input
                      type="number"
                      class="form-control shadow rounded-0 fontSW28 "
                      placeholder="Account Type use list above "
                      aria-label="Username"
                      defaultValue={
                        account_type ? account_type : borrowerdata?.account_type
                      }
                      aria-describedby=""
                      onChange={(e) => setaccount_type(e.target.value)}
                    />
                    {error?.account_type ? (
                      <div className="text-danger">
                        {error?.account_type[0]}
                        {error?.account_type[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-4 ps-0 pe-0 pt-3">
                    <input
                      type="text"
                      class="form-control shadow rounded-0 fontSW28 "
                      placeholder="Company Name "
                      aria-label="Username"
                      defaultValue={
                        company_name ? company_name : borrowerdata?.company_name
                      }
                      aria-describedby=""
                      onChange={(e) => setcompany_name(e.target.value)}
                    />
                    {error?.company_name ? (
                      <div className="text-danger">
                        {error?.company_name[0]}
                        {error?.company_name[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-12 pt-2 ps-0 pe-0">
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        class="form-control shadow rounded-0 fontSW28 "
                        placeholder="Account Number "
                        aria-label="Username"
                        defaultValue={
                          liabilities_account_number
                            ? liabilities_account_number
                            : borrowerdata?.liabilities_account_number
                        }
                        aria-describedby=""
                        onChange={(e) =>
                          setliabilities_account_number(e.target.value)
                        }
                      />
                      <span
                        className="input-group-text p-0 bg-primary rounded-0"
                        id="basic-addon1"
                      >
                        <FaMoneyCheckAlt fontSize={"30px"} color="white" />
                      </span>
                    </div>
                    {error?.liabilities_account_number ? (
                      <div className="text-danger">
                        {error?.liabilities_account_number[0]}
                        {error?.liabilities_account_number[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-check my-2">
                <input
                  type="checkbox"
                  className="form-check-label pt-3"
                  checked={
                    to_be_paid_of == 1
                      ? to_be_paid_of == 1
                      : borrowerdata?.to_be_paid_of == 1
                  }
                  onChange={() => setto_be_paid_of(1)}
                />
                &nbsp; To be paid off at or before closing
              </div>
                </>
              )}
              
              <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
                2c. Loibilities- and Expenses{" "}
              </h4>
              <div className="form-check my-2">
                <input
                  type="checkbox"
                  className="form-check-label pt-3"
                  checked={
                    other_liabilities_not_apply == 1
                      ? other_liabilities_not_apply == 1
                      : borrowerdata?.ther_liabilities_not_apply == 1
                  }
                  onChange={(e) => setother_liabilities_not_apply(!other_liabilities_not_apply)}
                />
                &nbsp;
                <span class="input-group-label contact-info-label border-0">
                  Include all other liabilities not apply and expenses below.
                  Choose from the types listed here:
                </span>
              </div>
              {other_liabilities_not_apply == 0 && (
                <>
                  <div className="col-lg-6 pt-2 ps-0 pe-0">
                    <input
                      className="form-control rounded-0 shadow inputFont26"
                      type="number"
                      placeholder="other liabilities"
                      style={{ padding: "12px 10px", fontSize: "14px" }}
                      defaultValue={
                        other_liabilities
                          ? other_liabilities
                          : borrowerdata?.other_liabilities
                      }
                      onChange={(e) => setother_liabilities(e.target.value)}
                    />
                    {error?.other_liabilities ? (
                      <div className="text-danger">
                        {error?.other_liabilities[0]}
                        {error?.other_liabilities[1]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-6 pt-2 ps-0 pe-0">
                    <input
                      className="form-control rounded-0 shadow inputFont26"
                      type="number"
                      placeholder="other liabilities market value"
                      style={{ padding: "12px 10px", fontSize: "14px" }}
                      defaultValue={
                        other_liabilities_market_value
                          ? other_liabilities_market_value
                          : borrowerdata?.other_liabilities_market_value
                      }
                      onChange={(e) =>
                        setother_liabilities_market_value(e.target.value)
                      }
                    />
                    {error?.other_liabilities_market_value ? (
                      <div className="text-danger">
                        {error?.other_liabilities_market_value[0]}
                        {error?.other_liabilities_market_value[1]}
                      </div>
                    ) : null}
                  </div>
                </>
              )}
              <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
                Borrower Name:{" "}
              </h4>
              <div className="col-lg-12 col-md-12  ps-0 pe-0">
                <div class="input-group mb-3">
                  <input
                    className="form-control rounded-0 shadow inputFont26"
                    type="text"
                    placeholder="Name"
                    style={{ padding: "12px 10px", fontSize: "14px" }}
                    defaultValue={
                      borrower_name
                        ? borrower_name
                        : borrowerdata?.borrower_name
                    }
                    onChange={(e) => setborrower_name(e.target.value)}
                  />
                  <span
                    className="input-group-text p-0 bg-primary rounded-0"
                    id="basic-addon1"
                  >
                    <MdDriveFileRenameOutline fontSize={"30px"} color="white" />
                  </span>
                </div>

                {error?.borrower_name ? (
                  <div className="text-danger">
                  {error?.borrower_name[0]}
                  {error?.borrower_name[1]}
                  </div>
                ) : null}
              </div>
              <span class="input-group-label contact-info-label mt-2 border-0">
                Uniform Residential Loan Application Freddie Mac Form 65 •
                Fannie Mae Form 1003 Effective 1/2021
              </span>
              <div></div>
              <div className="mt-0 ps-0">
                <ButtonGlobal  handleSubmit={handleadd} btntext={"Submit"}/>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Assets;
