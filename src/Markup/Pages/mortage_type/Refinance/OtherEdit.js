import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import RefSideBar from "./RefSideBar";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const OtherEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  //   setIdFromParams(id);
  const [current, Setcurrent] = useState(0);

  const Assign_id = localStorage.getItem("assignId");
  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();

  const [other_type_income, Set_other_type_income] = useState("");
  const [amount, Setamount] = useState("");
  const [amount_type, Set_amount_type] = useState("");
  const [retirement_date, Setretirement_date] = useState("");
  const [description, Setdescription] = useState("");

  const Data = new FormData();
  Data.append("base_employment_income", 0);
  Data.append("military_employment_income", 0);
  Data.append("other_income", 1);
  Data.append("other_type_income", other_type_income || "");
  Data.append("amount", amount || "");
  Data.append("amount_type", amount_type || "");
  Data.append("retirement_date", retirement_date || "");
  Data.append("description", description || "");
  Data.append("application_id", Assign_id || "");
  Data.append("id", id || "");

  const getOtherIncome = () => {
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
            other_type_income,
            amount,
            amount_type,
            retirement_date,
            description,
          } = response?.data?.data[0];
          Set_other_type_income(other_type_income);
          Setamount(amount);
          Set_amount_type(amount_type);
          Setretirement_date(retirement_date);
          Setdescription(description);

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
    getOtherIncome();
  }, []);

  const EditOtherIncome = () => {
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
        history.push("/ref/income");
        if (response?.data?.status === true) {
          console.log(response?.data?.message, "response?.data?.message");
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

  function handleSelectChangeForIncomeType(event) {
    Set_other_type_income(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  function handleSelectChangeForAmount_type(event) {
    Set_amount_type(event.target.value);
    console.log(event.target.value, "event.target.value");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const [editing, steediting] = useState(true);
  const handlePhoneNumberChanges = (event, state, type) => {
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
  };

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="container-fluid">
        <div className="row">
          <RefSideBar />
          <div className="col-md-10 my-5 ps-lg-5 ">
            <div className="row">
              <div className="col-md-6">
                <h2 className="my-3 mt-4">Other Employment Income</h2>
                <form action="" className="mt-5" onSubmit={handleSubmit}>
                  <span class="h5">Select Other Income Type</span>
                  <select
                    className={`form-select form-select-lg mt-1 mb-5 rounded-0 ${
                      other_type_income === undefined ||
                      other_type_income === null
                        ? "text-dark"
                        : "text-success"
                    }`}
                    value={other_type_income}
                    onChange={(e) => handleSelectChangeForIncomeType(e)}
                  >
                    <option value="" disabled selected className="text-dark">
                      Select Any Type
                    </option>
                    <option value="Alimony">
                      {" "}
                      Alimony{" "}
                      {other_type_income === "Alimony" && <span>✔</span>}
                    </option>
                    <option value="AutomobileAllowance">
                      Automobile Allowance{" "}
                      {other_type_income === "AutomobileAllowance" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="BoarderIncome">
                      {" "}
                      Boarder Income{" "}
                      {other_type_income === "BoarderIncome" && <span>✔</span>}
                    </option>
                    <option value="CapitalGains">
                      {" "}
                      Capital Gains{" "}
                      {other_type_income === "CapitalGains" && <span>✔</span>}
                    </option>
                    <option value="ChildSupport">
                      {" "}
                      Child Support{" "}
                      {other_type_income === "ChildSupport" && <span>✔</span>}
                    </option>
                    <option value="Disability">
                      {" "}
                      Disability{" "}
                      {other_type_income === "Disability" && <span>✔</span>}
                    </option>
                    <option value="FosterCare">
                      {" "}
                      Foster Care{" "}
                      {other_type_income === "FosterCare" && <span>✔</span>}
                    </option>
                    <option value="HousingAllowance">
                      {" "}
                      Housing or Parsonage{" "}
                      {other_type_income === "HousingAllowance" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="DividendsInterest">
                      {" "}
                      Interest and Dividends{" "}
                      {other_type_income === "DividendsInterest" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="MortgageCreditCertificate">
                      {" "}
                      Mortgage Credit Certificate{" "}
                      {other_type_income === "MortgageCreditCertificate" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="MortgageDifferential">
                      {" "}
                      Mortgage Differential Payments{" "}
                      {other_type_income === "MortgageDifferential" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="NotesReceivableInstallment">
                      {" "}
                      Notes Receivable{" "}
                      {other_type_income === "NotesReceivableInstallment" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="PublicAssistance">
                      {" "}
                      Public Assistance{" "}
                      {other_type_income === "MONTHLY" && <span>✔</span>}
                    </option>
                    <option value="Pension">
                      {" "}
                      Retirement{" "}
                      {other_type_income === "Pension" && <span>✔</span>}
                    </option>
                    <option value="Royalties">
                      {" "}
                      Royalty Payments{" "}
                      {other_type_income === "Royalties" && <span>✔</span>}
                    </option>
                    <option value="SeparateMaintenance">
                      {" "}
                      Separate Maintenance{" "}
                      {other_type_income === "SeparateMaintenance" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="SocialSecurity">
                      {" "}
                      Social Security{" "}
                      {other_type_income === "SocialSecurity" && <span>✔</span>}
                    </option>
                    <option value="TipIncome">
                      {" "}
                      Tip Income{" "}
                      {other_type_income === "TipIncome" && <span>✔</span>}
                    </option>
                    <option value="Trust">
                      {" "}
                      Trust Income{" "}
                      {other_type_income === "Trust" && <span>✔</span>}
                    </option>
                    <option value="Unemployment">
                      {" "}
                      Unemployment Benefits{" "}
                      {other_type_income === "Unemployment" && <span>✔</span>}
                    </option>
                    <option value="VABenefitsNonEducational">
                      {" "}
                      VA Compensation{" "}
                      {other_type_income === "MONTHLY" && <span>✔</span>}
                    </option>
                    <option value="TemporaryLeave">
                      {" "}
                      Temporary Leave{" "}
                      {other_type_income === "TemporaryLeave" && <span>✔</span>}
                    </option>
                    <option value="MiscellaneousIncome">
                      {" "}
                      Miscellaneous Income{" "}
                      {other_type_income === "MiscellaneousIncome" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="Other">
                      {" "}
                      Other {other_type_income === "Other" && <span>✔</span>}
                    </option>
                    <option value="AccessoryUnitIincome">
                      {" "}
                      Accessory Unit Income{" "}
                      {other_type_income === "AccessoryUnitIincome" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="DefinedContributionPlan">
                      {" "}
                      Defined Contribution Plan{" "}
                      {other_type_income === "DefinedContributionPlan" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="EmploymentRelatedAccount">
                      {" "}
                      Employment Related Account{" "}
                      {other_type_income === "EmploymentRelatedAccount" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="HousingChoiceVoucherProgram">
                      {" "}
                      Housing Choice Voucher Program{" "}
                      {other_type_income === "HousingChoiceVoucherProgram" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="NonBorrowerHouseholdIncome">
                      {" "}
                      Non Borrower Household Income{" "}
                      {other_type_income === "NonBorrowerHouseholdIncome" && (
                        <span>✔</span>
                      )}
                    </option>
                    <option value="ContractBasis">
                      {" "}
                      Contract Basis{" "}
                      {other_type_income === "ContractBasis" && <span>✔</span>}
                    </option>
                  </select>
                  {fieldsError?.other_type_income
                    ? fieldsError?.other_type_income.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Amount
                    </span>
                    <input
                      placeholder="Required"
                      name="cashOrMarket"
                      inputmode="decimal"
                      onChange={(e) =>
                        handlePhoneNumberChanges(e, Setamount, "amount")
                      }
                      className="form-control123 m-0 ps-4 rounded-0 form-control text-capitalize max-width-100  BgColors"
                      type="text"
                      onBlur={() => steediting(true)}
                      onFocus={() => steediting(false)}
                      value={`${amount === undefined ? 0 : amount}${
                        editing === true ? ".00" : ""
                      }`}
                    />
                    {amount?.length < 2 ||
                    amount === undefined ||
                    amount === null ? null : (
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          position: "absolute",
                          right: "40%",
                          top: "10px",
                          color: "green",
                          zIndex: "123",
                        }}
                      >
                        ✔
                      </p>
                    )}
                    <select
                      class={`form-select ${
                        amount_type === undefined ||
                        amount_type === null ||
                        amount_type === ""
                          ? "text-dark"
                          : "text-success"
                      }`}
                      id="inputGroupSelect02"
                      value={amount_type}
                      onChange={(e) => handleSelectChangeForAmount_type(e)}
                    >
                      <option value="" selected>
                        Select
                      </option>
                      <option value="ANNUALLY">
                        ANNUALLY{amount_type === "ANNUALLY" && <span>✔</span>}
                      </option>
                      <option value="MONTHLY">
                        MONTHLY {amount_type === "MONTHLY" && <span>✔</span>}
                      </option>
                    </select>
                  </div>
                  {fieldsError?.amount
                    ? fieldsError?.amount.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <br />
                  {fieldsError?.amount_type
                    ? fieldsError?.amount_type.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}

                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Retirement Date
                    </span>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Required"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={retirement_date}
                      onChange={(e) => Setretirement_date(e.target.value)}
                    />
                    {retirement_date?.length < 2 ||
                    retirement_date === undefined ||
                    retirement_date === null ? null : (
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
                  {fieldsError?.retirement_date
                    ? fieldsError?.retirement_date.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                      Description
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Optional"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={description}
                      onChange={(e) => Setdescription(e.target.value)}
                    />
                    {description?.length < 2 ||
                    description === undefined ||
                    description === null ? null : (
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
                  {fieldsError?.description
                    ? fieldsError?.description.map((e) => (
                        <p className="text-danger">{e}</p>
                      ))
                    : null}
                  <div className="d-flex my-4">
                    <button
                      className="btn btn-primary mx-2 px-md-5"
                      onClick={EditOtherIncome}
                    >
                      Edit
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

export default OtherEdit;
