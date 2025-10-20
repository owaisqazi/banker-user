/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../../Layout/Header";
import Financial from "./Assets/Financial";
import Funds from "./Assets/Funds";
import NumberShares from "./Assets/NumberShares";
import RefSideBar from "./RefSideBar";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import ProfileInfo from "../Profile/ProfileInfo";

function RefAssetsEdit() {
  const { id } = useParams();
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [itemId, setItemId] = useState(null);
  const Assign_id = localStorage.getItem("assignId");
  const [fieldsError, setFieldsError] = useState();

  const [assetType, setAssetType] = useState("");
  const [cashOrMarket, setcashOrMarket] = useState("");

  const [finalInstitute, setFinalInstitute] = useState({
    finalInstitute: "",
    accountNumber: "",
    numberOfShares: "",
    fundStoreType: "",
    fundStoreDescription: "",
    depositedOrNonDeposited: "",
  });

  const getRefAssetsInfo = async () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}mortgage/refinance/get/asset/record/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setLoader(false);
        const {
          id,
          asset_type,
          cash_or_market,
          financial_inst,
          account_number,
          no_of_shares,
          fund_store_type,
          Deposited_or_non_Deposited,
          funds_store_description,
        } = response?.data?.data[0];
        console.log(response.data.data[0].asset_type, "response");
        console.log(response.data.data[0], "response");
        setItemId(id);
        setAssetType(asset_type);
        setcashOrMarket(cash_or_market);
        setFinalInstitute({
          ...finalInstitute,
          finalInstitute: financial_inst,
          accountNumber: account_number,
          numberOfShares: no_of_shares,
          fundStoreType: fund_store_type,
          depositedOrNonDeposited: Deposited_or_non_Deposited,
          fundStoreDescription: funds_store_description,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    getRefAssetsInfo();
  }, []);
  console.log(cashOrMarket, "cash_or_market");
  const Data1 = new FormData();
  const financial_inst = finalInstitute.finalInstitute?.replace(/\D/g, "");
  const account_number = finalInstitute.accountNumber?.replace(/\D/g, "");
  Data1.append("application_id", Assign_id);
  Data1.append("asset_type", assetType);
  Data1.append("cash_or_market", cashOrMarket);
  if (assetType === "Checking") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "Savings") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "MoneyMarket") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "CertificateOfDeposit") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "MutualFund") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "Stocks") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
    Data1.append("no_of_shares", finalInstitute.numberOfShares);
  }

  if (assetType === "Bonds") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
    Data1.append("no_of_shares", finalInstitute.numberOfShares);
  }

  if (assetType === "Retirement") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "BridgeLoanProceeds") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "IndividualDevelopmentAccount") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "TrustAccount") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "LifeInsurance") {
    Data1.append("financial_inst", financial_inst);
    Data1.append("account_number", account_number);
  }

  if (assetType === "Grant") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType);
    Data1.append(
      "funds_store_description",
      finalInstitute.fundStoreDescription
    );
    Data1.append(
      "Deposited_or_Non_Deposited",
      finalInstitute.depositedOrNonDeposited
    );
  }

  if (assetType === "GiftCash") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType);
    Data1.append(
      "funds_store_description",
      finalInstitute.fundStoreDescription
    );
    Data1.append(
      "Deposited_or_Non_Deposited",
      finalInstitute.depositedOrNonDeposited
    );
  }

  if (assetType === "GiftOfEquity") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType);
    Data1.append(
      "funds_store_description",
      finalInstitute.fundStoreDescription
    );
    Data1.append(
      "Deposited_or_Non_Deposited",
      finalInstitute.depositedOrNonDeposited
    );
  }

  if (assetType === "ProceedsFromPropertySale") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }
  if (assetType === "ProceedsFromNonPropertySale") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }
  if (assetType === "SecuredBorrowedFunds") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }
  if (assetType === "UnsecuredBorrowedFunds") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }
  if (assetType === "checkingCashOnHand") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }
  if (assetType === "OtherAsset") {
    Data1.append("asset_type", assetType);
    Data1.append("cash_or_market", cashOrMarket);
  }

  if (id) {
    Data1.append("id", itemId);
  }

  const onEdit = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/add/asset`,
      data: Data1,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setLoader(true);
        console.log(response?.data?.data, "Data from Response");
        console.log("title:", response?.data?.data?.message);
        if (response.data.status === true) {
          setLoader(false);
          history.push("/ref/assets");
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
        setFieldsError(error?.response?.data?.errors, "errors");
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

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <Header />
      <div className="container-fluid">
        <div className="row">
          <RefSideBar />
          <div className="col-md-8 my-5 ps-lg-5 ">
            <div className="row">
              <div className="w-70 mt-5">
                <>
                  <h2 className="mt-4">Fill Asset detail</h2>
                  <div class="input-group mt-3">
                    <span class="input-group-label contact-info-label ">
                      Asset Type
                    </span>
                    <select
                      class={`form-control rounded-0 ${
                        assetType === "" ||
                        assetType?.length < 2 ||
                        assetType === undefined
                          ? "text-dark"
                          : "text-success"
                      }`}
                      onChange={(e) => {
                        setAssetType(e.target.value);
                      }}
                      value={assetType}
                    >
                      <option value="" selected disabled>
                        - Asset Type -
                      </option>
                      <option value="Checking">
                        Checking {assetType === "Checking" ? "✔" : ""}
                      </option>
                      <option value="Savings">
                        {" "}
                        Savings {assetType === "Savings" ? "✔" : ""}
                      </option>
                      <option value="MoneyMarket">
                        {" "}
                        Money Market {assetType === "MoneyMarket" ? "✔" : ""}
                      </option>
                      <option value="CertificateOfDeposit">
                        Certificate Of Deposit{" "}
                        {assetType === "CertificateOfDeposit" ? "✔" : ""}
                      </option>
                      <option value="MutualFund">
                        {" "}
                        Mutual Fund {assetType === "MutualFund" ? "✔" : ""}
                      </option>
                      <option value="Stocks">
                        {" "}
                        Stocks {assetType === "Stocks" ? "✔" : ""}
                      </option>
                      <option value="Bonds">
                        {" "}
                        Bonds {assetType === "Bonds" ? "✔" : ""}
                      </option>
                      <option value="Retirement">
                        {" "}
                        Retirement {assetType === "Retirement" ? "✔" : ""}
                      </option>
                      <option value="BridgeLoanProceeds">
                        Bridge Loan Proceeds{" "}
                        {assetType === "BridgeLoanProceeds" ? "✔" : ""}
                      </option>
                      <option value="IndividualDevelopmentAccount">
                        Individual Development Account{" "}
                        {assetType === "IndividualDevelopmentAccount"
                          ? "✔"
                          : ""}
                      </option>
                      <option value="LifeInsurance">
                        {" "}
                        Life Insurance{" "}
                        {assetType === "LifeInsurance" ? "✔" : ""}
                      </option>
                      <option value="TrustAccount">
                        {" "}
                        Trust Account {assetType === "TrustAccount" ? "✔" : ""}
                      </option>
                      <option value="Grant">
                        {" "}
                        Grant {assetType === "Grant" ? "✔" : ""}
                      </option>
                      <option value="GiftCash">
                        {" "}
                        Gift Cash {assetType === "GiftCash" ? "✔" : ""}
                      </option>
                      <option value="GiftOfEquity">
                        {" "}
                        Gift Of Equity {assetType === "GiftOfEquity" ? "✔" : ""}
                      </option>
                      <option value="ProceedsFromPropertySale">
                        Proceeds From Property Sale{" "}
                        {assetType === "ProceedsFromPropertySale" ? "✔" : ""}
                      </option>
                      <option value="ProceedsFromNonPropertySale">
                        Proceeds From Non Property Sale{" "}
                        {assetType === "ProceedsFromNonPropertySale" ? "✔" : ""}
                      </option>
                      <option value="SecuredBorrowedFunds">
                        Secured Borrowed Funds{" "}
                        {assetType === "SecuredBorrowedFunds" ? "✔" : ""}
                      </option>
                      <option value="UnsecuredBorrowedFunds">
                        Unsecured Borrowed Funds{" "}
                        {assetType === "UnsecuredBorrowedFunds" ? "✔" : ""}
                      </option>
                      <option value="checkingCashOnHand">
                        {" "}
                        Cash On Hand{" "}
                        {assetType === "checkingCashOnHand" ? "✔" : ""}
                      </option>
                      <option value="OtherAsset">
                        Other Asset {assetType === "OtherAsset" ? "✔" : ""}
                      </option>
                    </select>
                  </div>
                  <div class="input-group mt-2 position-relative">
                    <span class="input-group-label contact-info-label ">
                      Cash or Market Value
                    </span>
                    <input
                      placeholder="Required"
                      name="cashOrMarket"
                      inputmode="decimal"
                      onChange={(e) =>
                        handleChange(e, setcashOrMarket, "cashOrMarket")
                      }
                      className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${cashOrMarket === undefined ? 0 : cashOrMarket}${
                        editing === true ? ".00" : ""
                      }`}
                    />
                    {cashOrMarket?.length < 4 ||
                    cashOrMarket === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color: "green",
                          right: "3%",
                          top: "13px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                  </div>
                  <br />
                  <p>
                    {fieldsError?.cash_or_market?.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))}
                  </p>

                  {assetType === "Checking" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "Savings" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "MoneyMarket" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "CertificateOfDeposit" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "MutualFund" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "Stocks" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                      <NumberShares
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "Bonds" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                      <NumberShares
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "Retirement" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "BridgeLoanProceeds" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "IndividualDevelopmentAccount" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "TrustAccount" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "LifeInsurance" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "TrustAccount" ? (
                    <>
                      <Financial
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "Grant" ? (
                    <>
                      <Funds
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "GiftCash" ? (
                    <>
                      <Funds
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : assetType === "GiftOfEquity" ? (
                    <>
                      <Funds
                        setFinalInstitute={setFinalInstitute}
                        value={finalInstitute}
                        fieldsError={fieldsError}
                      />
                    </>
                  ) : null}

                  <div className="mt-4">
                    <button
                      className="btn btn-light text-dark w-40 border"
                      onClick={() => history.push("/ref/assets")}
                    >
                      Back
                    </button>
                    <button
                      className="btn btn-primary w-40 ms-2"
                      onClick={onEdit}
                    >
                      Edit
                    </button>
                  </div>
                </>
              </div>
            </div>
            {/* <div>
              <hr/>
              <ReFooter />
            </div> */}
          </div>
          <ProfileInfo/>
        </div>
        {/* <div id="naimImages4040" style={{width:"80%", paddingTop:"15px", position:"absolute",bottom:"0px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" alt="" /> </div> */}
      </div>
    </>
  );
}

export default RefAssetsEdit;
