/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Header from "../../../Layout/Header";
import ProfileInfo from "../Profile/ProfileInfo";
import Financial from "./Assets/Financial";
import Funds from "./Assets/Funds";
import NumberShares from "./Assets/NumberShares";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import Swal from "sweetalert2";
import { FaAngleLeft, FaBars, FaCheckCircle } from "react-icons/fa";
import { Progress } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
// import ReFooter from "./ReFooter";
import Footerx404 from "../../../../Images/Footerx404.png";


function RefAssets() {

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

  const history = useHistory();

  const [allAssets, setAllAssets] = useState([]);
  const [loader, setLoader] = useState(false);
  const [doNotHaveAsset, setDoNotHaveAssets] = useState(null);
  const [fieldsError, setFieldsError] = useState();

  const Assign_id = localStorage.getItem("assignId"); // also on condition for add and update

  const [assetType, setAssetType] = useState("");
  const [addAsset, setAddAsset] = useState(false);
  const [noAssets, setNoAssts] = useState(false);
  const [id, setId] = useState(null);

  const [cashOrMarket, setcashOrMarket] = useState("");
  const [finalInstitute, setFinalInstitute] = useState({
    finalInstitute: "",
    accountNumber: "",
    numberOfShares: "",
    fundStoreType: "",
    fundStoreDescription: "",
    depositedOrNonDeposited: "",
  });
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

  const getRefAssetsInfo = async () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/get/all/asset`,
      data: Data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setLoader(false);
        const { id } = response?.data?.data;
        setAllAssets(response?.data?.data);
        const { not_asset } = response?.data?.data[0];
        console.log(response.data.data, "response");
        setId(id);
        setNoAssts(not_asset);
        setDoNotHaveAssets(not_asset);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const Data = new FormData();
  Data.append("application_id", Assign_id || "");
  Data.append("no_asset", noAssets ? 1 : 0);

  const Data1 = new FormData();
  const financial_inst = finalInstitute.finalInstitute?.replace(/\D/g, '');
  const account_number = finalInstitute.accountNumber?.replace(/\D/g, '');
  Data1.append("application_id", Assign_id || "");
  Data1.append("asset_type", assetType || "");
  Data1.append("cash_or_market", cashOrMarket || "");
  if (assetType === "Checking") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }
  if (assetType === "Savings") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "MoneyMarket") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "CertificateOfDeposit") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "MutualFund") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "Stocks") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
    Data1.append("no_of_shares", finalInstitute.numberOfShares || "");
  }

  if (assetType === "Bonds") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
    Data1.append("no_of_shares", finalInstitute.numberOfShares || "");
  }

  if (assetType === "Retirement") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "BridgeLoanProceeds") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "IndividualDevelopmentAccount") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "TrustAccount") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "LifeInsurance") {
    Data1.append("financial_inst", financial_inst || "");
    Data1.append("account_number", account_number || "");
  }

  if (assetType === "Grant") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType || "");
    Data1.append("funds_store_description", finalInstitute.fundStoreDescription || "");
    Data1.append("Deposited_or_Non_Deposited", finalInstitute.depositedOrNonDeposited || "");
  }

  if (assetType === "GiftCash") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType || "");
    Data1.append("funds_store_description", finalInstitute.fundStoreDescription || "");
    Data1.append("Deposited_or_Non_Deposited", finalInstitute.depositedOrNonDeposited || "");
  }

  if (assetType === "GiftOfEquity") {
    Data1.append("fund_store_type", finalInstitute.fundStoreType || "");
    Data1.append("funds_store_description", finalInstitute.fundStoreDescription || "");
    Data1.append("Deposited_or_Non_Deposited", finalInstitute.depositedOrNonDeposited || "");
  }

  if (assetType === "ProceedsFromPropertySale") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
  }
  if (assetType === "ProceedsFromNonPropertySale") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
  }
  if (assetType === "SecuredBorrowedFunds") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
  }
  if (assetType === "UnsecuredBorrowedFunds") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
  }
  if (assetType === "checkingCashOnHand") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
  }
  if (assetType === "OtherAsset") {
    Data1.append("asset_type", assetType || "");
    Data1.append("cash_or_market", cashOrMarket || "");
    Data1.append("other_description", "anything")
  }

  if (id) {
    Data.append("id", id || "");
  }

  useEffect(() => {
    getRefAssetsInfo();
  }, []);

  const onAddAsset = () => {
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
        setAddAsset(false);
        setLoader(true);
        console.log(response?.data?.data, "Data from Response");
        console.log("title:", response?.data?.data?.message);
        if (response.data.status === true) {
          setLoader(false);
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
          getRefAssetsInfo();
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
      });
    };
    
    console.log(fieldsError,'FieldsError=====');
  // onSubmit Function

  const onSubmit = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/store/asset`,
      data: Data,
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
          history.push("/ref/realstate");
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
  };

  // for Deleting an Asset with id

  const deleteItem = (id) => {
    setLoader(true);
    const Assign_id = localStorage.getItem("assignId");

    const ForDelete = new FormData();
    ForDelete.append("application_id", Assign_id);
    ForDelete.append("id", id);

    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/del/asset`,
      data: ForDelete,
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
          getRefAssetsInfo();
          setLoader(false);
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

  console.log("setFinalInstitute",finalInstitute)
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
                  <div className="mort grey_color fw-500">
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

          <div style={{position:"relative"}} className={
              isOpen === true
                ? "col-md-8 open he mt-5 mb-2 ps-lg-5"
                : isOpen === false
                ? "col-md-10 open nhi he mt-5 mb-2 ps-lg-5"
                : ""
            }>
            <div>
            {allAssets && allAssets.length > 0 ? (
                allAssets?.map((e) => {
                  if (
                    e &&
                    (e.asset_type ||
                      e.cash_or_market ||
                      e.financial_inst ||
                      e.account_number)
                  ) {
                    return (
                      <>
                        {e.length !== 0 ? (
                          <>
                            <div
                              className="px-5 py-3 mb-3 d-flex"
                              style={{
                                width: "80%",
                                backgroundColor: "lightblue",
                                justifyContent: "space-between",
                                alignItem: "center",
                              }}
                            >
                              <div>
                                <h4>{e.asset_type}</h4>
                                <div className="px-3">
                                  <p>$ {e.cash_or_market}</p>
                                  <p>
                                    {e.financial_inst ? (
                                      <p>
                                        Financial-Tnstitute : {e.financial_inst}
                                      </p>
                                    ) : null}
                                  </p>
                                  <p>
                                    {e.account_number ? (
                                      <p>Account No .{e.account_number}</p>
                                    ) : null}
                                  </p>
                                  {/* <p>Account No . {e.account_number}</p> */}
                                </div>
                              </div>
                              <div className="mt-5">
                                <button
                                  className="mb-3 px-3 py-1"
                                  style={{ border: "none" }}
                                  onClick={() =>
                                    history.push(`/ref/AssetsEdit/${e.id}`)
                                  }
                                >
                                  Edit
                                </button>
                                <br />
                                <button
                                  className="px-3 py-1"
                                  style={{ border: "none" }}
                                  onClick={() => deleteItem(e.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </>
                    );
                  } else {
                    return null; // Filtered out null or 0 income data
                  }
                })
              ) : (
                null
              )}
            </div>
            <div className="row ">
              <div className="mt- 4 ps-4 mainxs404">
                {addAsset === false ? (
                  <>
                    <h6>Total Assets</h6>
                    <button
                      className="btn btn-outline-primary rounded-0" id="Hoverbtn"
                      onClick={() => {setAddAsset(true)
                        setAllAssets("")
                      }}
                    >
                      Add Asset
                    </button>
                    <br />
                    <br />
                    <input
                      type="checkbox"
                      checked={noAssets}
                      onClick={() => setNoAssts(!noAssets)}
                    />
                    &nbsp;<span>Don't have any asset</span>
                    <div className="row mt-3 ">
                      <div className="col-md-6 col-lg-10 pb-4" id="mxaauto">
                        <label className="text-secondary h6 mt-4">
                          Next is <span className="text-dark">Real State</span>
                        </label>
                        <br />
                        <button
                          className="btn btn-primary rounded-0 mt-2 "
                          onClick={onSubmit}
                        >
                          Save And Continue &nbsp;
                          <AiOutlineArrowRight />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 Hfs404 ps-2 pb-4">Fill Asset detail</h2>
                    <div class="input-group mt-4 p-2">
                      <span class="input-group-label contact-info-label textX404">
                        Asset Type
                      </span>
                      <select
                        class={`form-control rounded-0 ${assetType==="" || assetType ===null ||
                        assetType === undefined ?"text-dark":"text-success"}`}
                        onChange={(e) => {
                          setAssetType(e.target.value);
                        }}
                      >
                        {console.log(assetType , 'assetType')}
                        <option value="" selected disabled>
                          - Asset Type -
                        </option>
                        <option value="Checking">Checking {assetType === "Checking" ? "✔":""}</option>
                        <option value="Savings"> Savings {assetType === "Savings" ? "✔":""}</option>
                        <option value="MoneyMarket"> Money Market {assetType === "MoneyMarket" ? "✔":""}</option>
                        <option value="CertificateOfDeposit">
                          Certificate Of Deposit {assetType === "CertificateOfDeposit" ? "✔":""}
                        </option>
                        <option value="MutualFund"> Mutual Fund {assetType === "MutualFund" ? "✔":""}</option>
                        <option value="Stocks"> Stocks {assetType === "Stocks" ? "✔":""}</option>
                        <option value="Bonds"> Bonds {assetType === "Bonds" ? "✔":""}</option>
                        <option value="Retirement"> Retirement {assetType === "Retirement" ? "✔":""}</option>
                        <option value="BridgeLoanProceeds">
                          Bridge Loan Proceeds {assetType === "BridgeLoanProceeds" ? "✔":""}
                        </option>
                        <option value="IndividualDevelopmentAccount">
                          Individual Development Account {assetType === "IndividualDevelopmentAccount" ? "✔":""}
                        </option>
                        <option value="LifeInsurance"> Life Insurance {assetType === "LifeInsurance" ? "✔":""}</option>
                        <option value="TrustAccount"> Trust Account {assetType === "TrustAccount" ? "✔":""}</option>
                        <option value="Grant"> Grant {assetType === "Grant" ? "✔":""}</option>
                        <option value="GiftCash"> Gift Cash {assetType === "GiftCash" ? "✔":""}</option>
                        <option value="GiftOfEquity"> Gift Of Equity {assetType === "GiftOfEquity" ? "✔":""}</option>
                        <option value="ProceedsFromPropertySale">
                          Proceeds From Property Sale {assetType === "ProceedsFromPropertySale" ? "✔":""}
                        </option>
                        <option value="ProceedsFromNonPropertySale">
                          Proceeds From Non Property Sale {assetType === "ProceedsFromNonPropertySale" ? "✔":""}
                        </option>
                        <option value="SecuredBorrowedFunds">
                          Secured Borrowed Funds {assetType === "SecuredBorrowedFunds" ? "✔":""}
                        </option>
                        <option value="UnsecuredBorrowedFunds">
                          Unsecured Borrowed Funds {assetType === "UnsecuredBorrowedFunds" ? "✔":""}
                        </option>
                        <option value="checkingCashOnHand">
                          {" "}
                          Cash On Hand{" "}{assetType === "checkingCashOnHand" ? "✔":""}
                        </option>
                        <option value="OtherAsset">Other Asset {assetType === "OtherAsset" ? "✔":""}</option>
                      </select>
                    </div>
                      <br/>
                      <p>
                      {fieldsError?.asset_type?.map((e)=>(
                        <p className="text-danger">{e}</p>
                      ))}
                      </p>
                    <div class="input-group mt-3 p-2">
                      <span class="input-group-label contact-info-label textX404">
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
                       {cashOrMarket?.length < 4 || cashOrMarket === undefined ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          color:"green",
                          right: "3%",
                          top: "18px",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    </div>
                    <br/>
                      <p>
                      {fieldsError?.cash_or_market?.map((e)=>(
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

                    <div className="mt-4 ps-2 w-50 d-flex pb-5             ">
                      <div className="position-relative"> 
                      <FaAngleLeft className="ArowIcon"/>
                      <button
                        className="btn btn-light text-dark w-35 border rounded-0 px-4"
                        onClick={() => setAddAsset(false)}
                      >
                        Back                        
                      </button>
                      </div>
                      <button
                        className="btn btn-primary w-35 ms-2 rounded-0"
                        onClick={onAddAsset}
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="Assetx4020" style={{marginTop:"260px"}}>
              <hr/>
              <img src={Footerx404} alt="" width="100%" height="50%" />
            </div>
          </div>
          <ProfileInfo/>
        </div>
        {/* <div>
              <hr/>
              <ReFooter />
            </div> */}
      </div>
    </>
  );
}

export default RefAssets;
