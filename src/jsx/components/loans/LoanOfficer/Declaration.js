/* eslint-disable no-mixed-operators */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import  ButtonGlobal  from "./GlobalComponent/Button";

const Declaration = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  // const [application_id, setapplication_id] = useState('');
  // const [borrower_id, setborrower_id] = useState('');
  const [primary_residence, setprimary_residence] = useState(0);
  const [federal_debt, setfederal_debt] = useState(0);
  const [another_property, setanother_property] = useState(0);
  const [type_of_property, settype_of_property] = useState("");
  const [property_tile, setproperty_tile] = useState(0);
  const [purchase_transaction, setpurchase_transaction] = useState(0);
  const [borrowing, setborrowing] = useState(0);
  const [amount, setamount] = useState(0);
  const [mortgage_loan, setmortgage_loan] = useState(0);
  const [new_credit, setnew_credit] = useState(0);
  const [conveyed_title, setconveyed_title] = useState(0);
  const [first_mortgage_lien, setfirst_mortgage_lien] = useState(0);
  const [guarantor, setguarantor] = useState(0);
  const [judgements_against_you, setjudgements_against_you] = useState(0);
  const [financial_liability, setfinancial_liability] = useState(0);
  const [bankruptcy, setbankruptcy] = useState(0);
  const [Lender_agreed, setLender_agreed] = useState(0);
  const [foreclosed_upon, setforeclosed_upon] = useState(0);
  const [id, setid] = useState("");
  const [SelectedChapters1, setSelectedChapters1] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [type_of_bankruptcy, settype_of_bankruptcy] = useState([])

  const Token = useSelector((state) => state.auth.auth.idToken);
  const handleget = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/declaration/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false);
        console.log(response, "response-----");
        setData(response.data.data.broker_agreement_declaration === null ? response.data.data.borrower_application_declaration : response.data.data.broker_agreement_declaration || "");
        setid(response.data.data.broker_agreement_declaration?.id || "");
        setproperty_tile(
          response.data.data.broker_agreement_declaration?.property_tile || "");
        setprimary_residence(
          response.data.data.broker_agreement_declaration === null ? response.data.data.borrower_application_declaration?.primary_residence : response.data.data.broker_agreement_declaration?.primary_residence || "");
        setpurchase_transaction(
          response.data.data.broker_agreement_declaration
            ?.Purchase_Transaction || "");
        setfederal_debt(
          response.data.data.broker_agreement_declaration?.federal_debt || "");
        setborrowing(
          response.data.data.broker_agreement_declaration === null ? response.data.data.borrower_application_declaration?.borrowing : response.data.data.broker_agreement_declaration?.borrowing || "");
        setamount(
          response.data.data.broker_agreement_declaration?.amount || "");
        setmortgage_loan(
          response.data.data.broker_agreement_declaration?.mortgage_loan || "");
        setnew_credit(
          response.data.data.broker_agreement_declaration?.new_credit || "");
        setconveyed_title(
          response.data.data.broker_agreement_declaration?.conveyed_title || "");
        setfirst_mortgage_lien(
          response.data.data.broker_agreement_declaration?.first_mortgage_lien
            ? 1
            : 0 || "");
        setguarantor(
          response.data.data.broker_agreement_declaration?.guarantor || "");
        setanother_property(
          response.data.data.broker_agreement_declaration === null ? response.data.data.borrower_application_declaration?.another_property : response.data.data.broker_agreement_declaration?.another_property ||
            "");
        setjudgements_against_you(
          response.data.data.broker_agreement_declaration
            ?.judgements_against_you
            ? 1
            : 0 || "");
        setfinancial_liability(
          response.data.data.broker_agreement_declaration
            ?.financial_liability || "");
        setbankruptcy(response.data.data.broker_agreement_declaration === null ?
          response.data.data.borrower_application_declaration?.bankruptcy : response?.data?.data?.broker_agreement_declaration?.bankruptcy || "");
        setLender_agreed(
          response.data.data.broker_agreement_declaration?.Lender_agreed || "");
        setforeclosed_upon(
          response.data.data.broker_agreement_declaration?.foreclosed_upon || "");
        settype_of_property(
          response.data.data.broker_agreement_declaration?.type_of_property ||
          "primary residence");
        console.log(
          response?.data?.data?.broker_agreement_declaration
            .type_of_bankruptcy[0],
          "=======dsdsd"
        );
        setSelectedChapters1(
          response?.data?.data?.broker_agreement_declaration.type_of_bankruptcy[0]?.split("," || ""));
        setError("");
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
        // setError('')
        console.log(error, "error========>1");
      });
  };

  useEffect(() => {
    handleget();
  }, []);
  const handleadd = () => {
    const formdata = new FormData();
    formdata.append("primary_residence", primary_residence ? "1" : "0");
    // formdata.append("id", id)
    formdata.append("application_id", item.id);
    {
      id && formdata.append("id", id || "");
    }
    formdata.append("another_property", another_property ? "1" : "0");
    formdata.append(
      "type_of_property", type_of_property || "");
    formdata.append("property_tile", property_tile ? property_tile : data?.primary_residence ? "primary residence" : property_tile || "");
    formdata.append(
      "purchase_transaction",
      purchase_transaction === 1 ? "1" : data?.Purchase_Transaction ? "1" : "0" || "");
    formdata.append("borrowing", borrowing ? "1" : "0" || "");
    formdata.append("amount", amount ? amount : data?.amount || "");
    formdata.append("mortgage_loan", mortgage_loan ? "1" : data?.mortgage_loan ? "1" : "0" || "");
    formdata.append("new_credit", new_credit ? "1" : "0" || "");
    formdata.append("guarantor", guarantor ? "1" : data?.guarantor ? "1" : "0" || "");
    formdata.append(
      "judgements_against_you",
      judgements_against_you ? "1" : data?.judgements_against_you ? "1" : "0" || "");
    formdata.append("federal_debt", federal_debt ? "1" : data?.federal_debt ? "1" : "0" || "");
    formdata.append(
      "financial_liability",
      financial_liability ? "1" : data?.financial_liability ? "1" : "0" || "");
    formdata.append("conveyed_title", conveyed_title ? "1" : data?.conveyed_title ? "1" : "0" || "");
    formdata.append("foreclosed_upon", foreclosed_upon ? "1" : data?.foreclosed_upon ? "1" : "0" || "");
    // formdata.append("foreclosed_upon", foreclosed_upon ?"1" :data?.another_property? "1" :"0")
    formdata.append("bankruptcy", bankruptcy ? "1" : "0" || "");
    formdata.append(
      "first_mortgage_lien",
      first_mortgage_lien ? "1" : data?.first_mortgage_lien ? "1" : "0" || "");
    formdata.append("Lender_agreed", Lender_agreed ? "1" : data?.Lender_agreed ? "1" : "0" || "");
    formdata.append("borrower_id", borrowerid || "");
    formdata.append("type_of_bankruptcy[]", [selectedChapters?.join(",")] || "");
    // type_of_bankruptcy?.map((e, i)=>(formdata.append(`type_of_bankruptcy${i}`,e)))
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/declaration/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
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
        // setError('')
        setLoader(false);
        setError(error?.response?.data?.errors);
        console.log(error, "error========>");
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
  const [selectedChapters, setSelectedChapters] = useState([]);

const handleChapterChange = (e) => {
  const { value, checked } = e.target;
  console.log(selectedChapters ,"hello")
  if (checked) {
    // If checkbox is checked, add the value to the array
    setSelectedChapters((prevSelected) => [...prevSelected, value]);
  } else {
    // If checkbox is unchecked, remove the value from the array
    setSelectedChapters((prevSelected) =>
      prevSelected.filter((chapter) => chapter !== value)
    );
  }
};
  console.log(selectedChapters, "selectedChapters");

  // const handleCheckboxChange2 = (choice) => {
  //   setanother_property1(choice);
  //   setanother_property(choice === 1);
  // };


  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div style={{ width: "90%" }} className="row mx-3 pb-3">
        <h2 className="mt-1 mb-5">Declaration</h2>
        <div className="row" style={{ color: "black" }}>
          <p className="fontSW29">
            Will you occupy the property as your primary residence?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q1"
                id="YES"
                autoComplete="off"
                defaultChecked={data?.primary_residence === 1 ? "btn-primary" : null
                }
                onClick={() => setprimary_residence(1)}
              />
              <label
                className="btn btn-outline-primary rounded-0"
                htmlFor="YES"
              >
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q1"
                id="No"
                autoComplete="off"
                defaultChecked={data?.primary_residence == 0 ? "btn-primary" : null}
                onClick={() => setprimary_residence(0)}
              />
              <label className="btn btn-outline-primary rounded-0" htmlFor="No">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="row" style={{ color: "black" }}>
          <p className="fontSW29">
            If YES, have you had an ownership interest in another property in
            the last three years
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q11"
                id="owais"
                autocomplete="off"
                defaultChecked={another_property == 1 ? 'btn-primary' : null}
                onClick={() => setanother_property(1)}
              />
              <label className="btn btn-outline-primary rounded-0 " for="owais">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q11"
                id="Nov"
                autocomplete="off"
                defaultChecked={another_property == 0 ? 'btn-primary' : null}
                onClick={() => setanother_property(0)}
              />
              <label className="btn btn-outline-primary rounded-0 " for="Nov">
                No
              </label>
            </div>
            {error?.another_property && error?.another_property?.length >= 0 ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.another_property[0]}
              </span>
            ) : null}
          </div>
          {another_property == 1 && (
            <>
              <p className="mt-4 fontSW29">
                If YES, have you had an ownership interest in another property
                in the last three years? If YES, complete (1) and (2) below:
              </p>
              <p className="pt-2 fw-normal">
                1: What type of property did you own: primary residence (PR),
                FHA secondary residence (SR), second home (SH), or investment
                property (IP)?{" "}
              </p>
              <div className="col-lg-12 pt-2 ps-0 pe-0">
                <input
                  className="form-control rounded-0 shadow-sm inputFont26"
                  type="text"
                  placeholder=""
                  style={{ padding: "12px 10px", fontSize: "14px" }}
                  defaultValue={type_of_property || "primary residence"}
                  onChange={(e) => settype_of_property(e.target.value)}
                />
                {error?.type_of_property &&
                  error?.type_of_property?.length >= 0 ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {error?.type_of_property[0]}
                  </span>
                ) : null}
              </div>
              <p className="pt-2 fw-normal">
                2: How did you hold title to the property: by yourself (S),
                jointly with your spouse (SP), or jointly with another person
                (O)?{" "}
              </p>
              <div className="col-lg-12 pt-2 ps-0 pe-0">
                <input
                  className="form-control rounded-0 shadow-sm inputFont26"
                  type="text"
                  placeholder=""
                  style={{ padding: "12px 10px", fontSize: "14px" }}
                  defaultValue={property_tile}
                  onChange={(e) => setproperty_tile(e.target.value)}
                />
                {error?.property_tile && error?.property_tile?.length >= 0 ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {error?.property_tile[0]}
                  </span>
                ) : null}
              </div>
            </>
          )}
        </div>
        <div className="row my-4 mt-5">
          <p className="fontSW29">
            If this is a Purchase Transaction: Do you have a family relationship
            or business affiliation with the seller of the property?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q33"
                id="YES2"
                autocomplete="off"
                defaultChecked={data?.Purchase_Transaction === 1 ? "btn-primary" : null ? data?.Purchase_Transaction === 1 ? "btn-primary" : null : data?.Purchase_Transaction === 1 ? "btn-primary" : null}
                onChange={() => {
                  setpurchase_transaction(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES2">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q33"
                id="No2"
                autocomplete="off"
                defaultChecked={data?.Purchase_Transaction == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setpurchase_transaction(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No2">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Are you borrowing any money for this real estate transaction (e.g.,
            money for your closing costs or down payment) or obtaining any money
            from another party, such as the seller or realtor, that you have not
            disclosed on this loan application?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="33333"
                id="3333"
                autocomplete="off"
                defaultChecked={borrowing == 1 ? "btn-primary" : null}
                onClick={() => {
                  setborrowing(1)
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="3333">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="33333"
                id="333"
                autocomplete="off"
                defaultChecked={borrowing == 0 ? "btn-primary" : null}
                onClick={() => {
                  setborrowing(0)
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="333">
                No
              </label>
            </div>
            {error?.borrowing && (
              <div className="error-container text-danger fs-6 fw-normal col-lg-12">
                {error?.borrowing}
              </div>
            )}
          </div>
          {borrowing ? (
            <>
              <p className="fontSW29 mt-4">
                If yes What is the amount of this money?
              </p>
              <div className="col-md-12">
                <div className="input-group mb-3 mt-1 position-relative">
                  <span
                    style={{
                      fontSize: "17px",
                      top: "8px",
                      left: "5px",
                      zIndex: "123",
                    }}
                    className="position-absolute fw-bold"
                  >
                    $
                  </span>
                  <input
                    type="Number"
                    className="form-control ps-4  rounded-0 input266clr"
                    aria-label="Amount (to the nearest dollar)"
                    defaultValue={data?.amount}
                    onChange={(e) => setamount(e.target.value)}
                  />
                  {error?.amount && error?.amount?.length >= 0 ? (
                    <span className="error-container text-danger fw-normal fs-6 col-md-12">
                      {error?.amount[0]}
                    </span>
                  ) : null}
                </div>
              </div>
            </>
          ):null}
        </div>

        <div className="row  my-4">
          <p className="fontSW29">
            Have you or will you be applying for a mortgage loan on another
            property (not the property securing this loan) on or before closing
            this transaction that is not disclosed on this loan application?
          </p>

          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q3.3"
                id="YES44"
                autocomplete="off"
                defaultChecked={data?.mortgage_loan === 1 ? "btn-primary" : null
                }
                onChange={() => setmortgage_loan(1)}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES44">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q3.3"
                id="No44"
                autocomplete="off"
                defaultChecked={data?.mortgage_loan == 0 ? "btn-primary" : null
                }
                onChange={() => setmortgage_loan(0)}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No44">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Will this property be subject to a lien that could take priority
            over the first mortgage lien, such as a clean energy lien paid
            through your property taxes (e.g., the Property Assessed Clean
            Energy Program)?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                name="Q55"
                id="YES55"
                autocomplete="off"
                className={`btn-check`}
                defaultChecked={data?.first_mortgage_lien === 1 ? "btn-primary" : null
                }
                onChange={() => {
                  setfirst_mortgage_lien(1);
                }}
              />
              <label
                className={`btn btn-outline-primary rounded-0`}
                for="YES55"
              >
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q55"
                id="No55"
                autocomplete="off"
                defaultChecked={data?.first_mortgage_lien == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setfirst_mortgage_lien(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No55">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Are you a co-signer or guarantor on any debt or loan that is not
            disclosed on this application?
          </p>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ width: "110px" }}
        >
          <div className="col-3 col-md-2 col-lg-1">
            <input
              type="radio"
              className="btn-check"
              name="q44"
              id="YES33m"
              autocomplete="off"
              defaultChecked={data?.guarantor === 1 ? "btn-primary" : null}
              onChange={() => {
                setguarantor(1);
              }}
            />
            <label className="btn btn-outline-primary rounded-0 " for="YES33m">
              Yes
            </label>
          </div>
          <div className="col-3 col-md-2 col-lg-1">
            <input
              type="radio"
              className="btn-check"
              name="q44"
              id="No333m"
              autocomplete="off"
              defaultChecked={data?.guarantor == 0 ? "btn-primary" : null}
              onChange={() => {
                setguarantor(0);
              }}
            />
            <label className="btn btn-outline-primary rounded-0 " for="No333m">
              No
            </label>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Are there any outstanding judgments against you?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q77"
                id="YES77"
                autocomplete="off"
                defaultChecked={data?.judgements_against_you === 1 ? "btn-primary" : null
                }
                onChange={() => {
                  setjudgements_against_you(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES77">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q77"
                id="No77"
                autocomplete="off"
                defaultChecked={data?.judgements_against_you == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setjudgements_against_you(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No77">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Are you currently delinquent or in default on a Federal Debt?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q8"
                id="YES8"
                autocomplete="off"
                defaultChecked={data?.federal_debt === 1 ? "btn-primary" : null}
                onChange={() => {
                  setfederal_debt(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES8">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q8"
                id="No8"
                autocomplete="off"
                defaultChecked={data?.federal_debt == 0 ? "btn-primary" : null}
                onChange={() => {
                  setfederal_debt(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No8">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Are you a party to a lawsuit in which you potentially have any
            personal financial liability?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q9"
                id="YES9"
                autocomplete="off"
                defaultChecked={data?.federal_debt === 1 ? "btn-primary" : null}
                onChange={() => {
                  setfinancial_liability(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES9">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q9"
                id="No9"
                autocomplete="off"
                defaultChecked={data?.federal_debt == 0 ? "btn-primary" : null}
                onChange={() => {
                  setfinancial_liability(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No9">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Have you conveyed title to any property in lieu of foreclosure in
            the past 7 years?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q9XX"
                id="YES9S"
                autocomplete="off"
                defaultChecked={data?.conveyed_title === 1 ? "btn-primary" : null
                }
                onChange={() => {
                  setconveyed_title(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES9S">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q9XX"
                id="No9MM"
                autocomplete="off"
                defaultChecked={data?.conveyed_title == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setconveyed_title(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No9MM">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <p className="fontSW29">
            Have you or will you be applying for any new credit
            (e.g.,installment loan,credit card,etc.) on or before closing this
            loan that is not disclosed on this application?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q1211A"
                id="YES12sA"
                autocomplete="off"
                checked={new_credit === 1}
                onChange={() => {
                  setnew_credit(1);
                }}
              />
              <label
                className="btn btn-outline-primary rounded-0 "
                for="YES12sA"
              >
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q121£"
                id="No12x%"
                autocomplete="off"
                checked={new_credit == 0}
                onChange={() => {
                  setnew_credit(0);
                }}
              />
              <label
                className="btn btn-outline-primary rounded-0 "
                for="No12x%"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Within the past 7 years, have you completed a pre-foreclosure sale
            or short sale, whereby the property was sold to a third party and
            the Lender agreed to accept less than the outstanding mortgage
            balance due?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q1211"
                id="YES12sxs"
                autocomplete="off" _sale
                defaultChecked={data?.Lender_agreed == 1 ? true : data?.short_sale == 1 ? true : null}
                onChange={() => {
                  setLender_agreed(1);
                }}
              />
              <label
                className="btn btn-outline-primary rounded-0 "
                for="YES12sxs"
              >
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q1211"
                id="No12xxs"
                autocomplete="off"
                defaultChecked={data?.Lender_agreed == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setLender_agreed(0);
                }}
              />
              <label
                className="btn btn-outline-primary rounded-0 "
                for="No12xxs"
              >
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <p className="fontSW29">
            Have you had property foreclosed upon in the last 7 years?
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q12"
                id="YES12"
                autocomplete="off"
                defaultChecked={data?.foreclosed_upon === 1 ? "btn-primary" : null
                }
                onChange={() => {
                  setforeclosed_upon(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES12">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="Q12"
                id="No12"
                autocomplete="off"
                defaultChecked={data?.foreclosed_upon == 0 ? "btn-primary" : null
                }
                onChange={() => {
                  setforeclosed_upon(0);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="No12">
                No
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <p className="fontSW29">
            Have you declared bankruptcy within the past 7 years? If yes
            Identify the type of the bankruptcy
          </p>
          <div
            className="d-flex justify-content-between"
            style={{ width: "110px" }}
          >
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q4"
                id="YES33"
                autocomplete="off"
                defaultChecked={bankruptcy == 1 ? "btn-primary" : null}
                onClick={() => {
                  setbankruptcy(1);
                }}
              />
              <label className="btn btn-outline-primary rounded-0 " for="YES33">
                Yes
              </label>
            </div>
            <div className="col-3 col-md-2 col-lg-1">
              <input
                type="radio"
                className="btn-check"
                name="q4"
                id="No333"
                autocomplete="off"
                defaultChecked={bankruptcy == 0 ? "btn-primary" : null}
                onClick={() => {
                  setbankruptcy(0);
                }}
              />{console.log(bankruptcy, "bankruptcy11")}
              <label className="btn btn-outline-primary rounded-0 " for="No333">
                No
              </label>
            </div>
          </div>
          {bankruptcy ? (
            <>
              <div className="col-md-12">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck7"
                    defaultChecked={SelectedChapters1?.includes("Chapter7") ? SelectedChapters1?.includes("Chapter7") : data?.Chapter7 == 1 ? "Chapter7" : null}
                    onChange={(e)=>handleChapterChange(e)}
                    value="Chapter7"
                    name="Chapter7"
                  />
                  {/* {console.log(type_of_bankruptcy, "type_of_bankruptcy")?true:data?.Chapter13?true:false} */}
                  <label
                    className="btn btn-outline-primary rounded-0"
                    htmlFor="btncheck7"
                  >
                    Chapter 7
                  </label>

                  {/* Add similar input elements for other chapters */}
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck11"
                    defaultChecked={SelectedChapters1?.includes("Chapter11") ? SelectedChapters1?.includes("Chapter11") : data?.chapter11 == 1 ? "Chapter11" : null}
                    onChange={(e)=>handleChapterChange(e)}
                    value="Chapter11"
                    name="Chapter11"
                  />
                  <label
                    className="btn btn-outline-primary rounded-0"
                    htmlFor="btncheck11"
                  >
                    Chapter 11
                  </label>

                  {/* Add similar input elements for other chapters */}
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck12"
                    defaultChecked={SelectedChapters1?.includes("Chapter12") ? SelectedChapters1?.includes("Chapter12") : data?.chapter12 == 1 ? "Chapter12" : null}
                    onChange={(e)=>handleChapterChange(e)}
                    value="Chapter12"
                    name="Chapter12"
                  />
                  <label
                    className="btn btn-outline-primary rounded-0"
                    htmlFor="btncheck12"
                  >
                    Chapter 12
                  </label>

                  {/* Add similar input elements for other chapters */}
                </div>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck13"
                    defaultChecked={SelectedChapters1?.includes("Chapter13") ? SelectedChapters1?.includes("Chapter13") : data?.chapter13 == 1 ? "Chapter13" : null}
                    onChange={(e)=>handleChapterChange(e)}
                    value="Chapter13"
                    name="Chapter"
                  />
                  <label
                    className="btn btn-outline-primary rounded-0"
                    htmlFor="btncheck13"
                  >
                    Chapter 13
                  </label>

                  {/* Add similar input elements for other chapters */}
                </div>
                {error?.type_of_bankruptcy &&
                  error?.type_of_bankruptcy?.length >= 0 ? (
                  <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                    {error?.type_of_bankruptcy[0]}
                  </span>
                ) : null}
              </div>
            </>
          ):null}
          <div className="mt-0">
          <ButtonGlobal  handleSubmit={handleadd} btntext={"Submit"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Declaration;
