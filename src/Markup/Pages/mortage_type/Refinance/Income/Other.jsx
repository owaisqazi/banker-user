/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../../Baseurl";
import Footerx404 from "../../../../../Images/Footerx404.png";

function Other({ setpanel, getIncome }) {
  // const history = useHistory();

  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();

  const Assign_id = localStorage.getItem("assignId");

  const [other_type_income, Set_other_type_income] = useState();
  const [amount, Setamount] = useState();
  const [amount_type, Set_amount_type] = useState();
  const [retirement_date, Setretirement_date] = useState();
  const [description, Setdescription] = useState();

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

  const AddOtherIncome = () => {
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
          setpanel("");
          getIncome();
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
          setpanel("");
          getIncome();
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
  const onCancel = () => {
    setpanel("");
    getIncome();
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
      <div className="w-74 maiN404">
        <span class="h5">Select Other Income Type</span>
        <form className="mt-4" onSubmit={handleSubmit}>
          <select
            className={`form-select form-select-lg mt-1 mb-5 rounded-0 ${other_type_income === undefined|| other_type_income === null ? "text-dark" : "text-success"}`}
            onChange={(e) => handleSelectChangeForIncomeType(e)}
          >
            <option value="" disabled selected className="text-dark">
              Select Any Type
            </option>
            <option value="Alimony">
              {" "}
              Alimony {other_type_income === "Alimony" && <span>✔</span>}
            </option>
            <option value="AutomobileAllowance">
              Automobile Allowance{" "}
              {other_type_income === "AutomobileAllowance" && <span>✔</span>}
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
              Disability {other_type_income === "Disability" && <span>✔</span>}
            </option>
            <option value="FosterCare">
              {" "}
              Foster Care {other_type_income === "FosterCare" && <span>✔</span>}
            </option>
            <option value="HousingAllowance">
              {" "}
              Housing or Parsonage{" "}
              {other_type_income === "HousingAllowance" && <span>✔</span>}
            </option>
            <option value="DividendsInterest">
              {" "}
              Interest and Dividends{" "}
              {other_type_income === "DividendsInterest" && <span>✔</span>}
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
              {other_type_income === "MortgageDifferential" && <span>✔</span>}
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
              Retirement {other_type_income === "Pension" && <span>✔</span>}
            </option>
            <option value="Royalties">
              {" "}
              Royalty Payments{" "}
              {other_type_income === "Royalties" && <span>✔</span>}
            </option>
            <option value="SeparateMaintenance">
              {" "}
              Separate Maintenance{" "}
              {other_type_income === "SeparateMaintenance" && <span>✔</span>}
            </option>
            <option value="SocialSecurity">
              {" "}
              Social Security{" "}
              {other_type_income === "SocialSecurity" && <span>✔</span>}
            </option>
            <option value="TipIncome">
              {" "}
              Tip Income {other_type_income === "TipIncome" && <span>✔</span>}
            </option>
            <option value="Trust">
              {" "}
              Trust Income {other_type_income === "Trust" && <span>✔</span>}
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
              {other_type_income === "MiscellaneousIncome" && <span>✔</span>}
            </option>
            <option value="Other">
              {" "}
              Other {other_type_income === "Other" && <span>✔</span>}
            </option>
            <option value="AccessoryUnitIincome">
              {" "}
              Accessory Unit Income{" "}
              {other_type_income === "AccessoryUnitIincome" && <span>✔</span>}
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
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 w-25" id="basic-addon1">
              Amount
            </span>
            <input
              onChange={(e) => {
                handleChange(
                  e,
                  Setamount,
                  "amount"
                );
              }}
              className="form-control123 m-0 ps-4 form-control"
              type="tel"
              step="0.1"
              // min='0'
              // max='20'
              onBlur={() => steediting(true)}
              onFocus={() => steediting(false)}
              value={`${
                amount === undefined
                  ? 2
                  : amount
              }${editing === true ? "" : ""}`}
              pattern="^[\d,]+$"
              name=""
              id=""
            />
             {amount?.length < 4 || amount === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "37%",
                  color:"green",
                  top: "10px",
                  zIndex: "123",
                }}
              >
                ✔
              </p>
            )}
            <select
              class={`form-select rounded-0 ${amount_type === undefined|| amount_type === null ? "text-dark" : "text-success"}`}
              id="inputGroupSelect02"
              onChange={(e) => handleSelectChangeForAmount_type(e)}
            >
              <option >SELECT</option>
              <option value="ANNUALLY">ANNUALLY{amount_type === "ANNUALLY" && <span>✔</span>}</option>
              <option value="MONTHLY">MONTHLY {amount_type === "MONTHLY" && <span>✔</span>}</option>
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

          <div className="input-group mb-3">
            <span
              style={{ width: "30%" }}
              className="input-group-text rounded-0"
              id="basic-addon1"
            >
              Retirement Date
            </span>
            <input
              style={{ width: "35%" }}
              type="date"
              className="form-control rounded-0 bg-white text-dark"
              placeholder="Required"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => Setretirement_date(e.target.value)}
            />
            {retirement_date?.length < 4 || retirement_date === undefined ? null : (
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
            {fieldsError?.retirement_date
                ? fieldsError?.retirement_date.map((e) => (
                    <p className="text-danger">{e}</p>
                  ))
                : null}
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0 w-25" id="basic-addon1">
              Description
            </span>
            <input
              style={{ width: "35%" }}
              type="text"
              className="form-control rounded-0 bg-white text-dark"
              placeholder="Optional"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => Setdescription(e.target.value)}
            />
            {description?.length < 4 || description === undefined ? null : (
              <p
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  position: "absolute",
                  right: "15px",
                  color:"green",
                  top: "10px",
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
          <div className="d-flex my-4 w-50">
            <button
              className="btn btn-primary mx-2 px-md-3 w-100 rounded-0"
              onClick={AddOtherIncome}
            >
              SAVE
            </button>
            <button
              className="btn btn-light mx-2 px-md-3 border w-100 rounded-0 bg-white text-dark"
              onClick={onCancel}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
      {/* <div className="naimImages" style={{width:"80%", paddingTop:"15px",bottom:"0px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" alt="" /> </div> */}
      <div className="Otherx4020" style={{ marginTop: "34px" }}>
        <hr />
        <img src={Footerx404} alt="" width="100%" height="50%" />
      </div>
    </>
  );
}

export default Other;
