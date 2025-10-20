/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Baseurl from "../../../../Baseurl";
import axios from "axios";
import Swal from "sweetalert2";
import SignaturePad from "react-signature-canvas";
import ButtonGlobal from "./GlobalComponent/Button";
import "../LoanOfficer/Document.css";

const Acknowledgments = () => {
  const [loader, setLoader] = useState(false);
  const [error, seterror] = useState([]);
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [showdata, setshowdata] = useState([]);
  const [borkerimge, setborkerimge] = useState("");
  const [borimge, setborimge] = useState("");
  const [showdataid, setshowdataid] = useState(null);
  const [formData, setFormData] = useState({
    broker_signature: "",
    broker_signature_date: "",
    borrower_signature: "",
    borrower_name: "",
    borrower_signature_date: "",
  });
  const Token = useSelector((state) => state.auth.auth.idToken);
 
  const fatchdata = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/acknowledgement/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios(config)
      .then((response) => {
        console.log(response, "ackasd");
        if (response?.data?.status === true) {
          setLoader(false);
          // setTrimmedDataURL(false)
          setTrimmedData(false)
          seterror("");
          setshowdata(response?.data?.data || "");
          setshowdataid(response?.data?.data?.id || "");
          setborkerimge(
            response?.data?.data?.broker_signature_image_path || ""
          );
          setborimge(response?.data?.data?.borrower_signature_image_path || "");
          setFormData({
            broker_signature: response?.data?.data?.broker_signature || "",
            broker_signature_date:
              response?.data?.data?.broker_signature_date || "",
            borrower_signature: response?.data?.data?.borrower_signature || "",
            borrower_name: response?.data?.data?.borrower_name || "",
            borrower_signature_date:
              response?.data?.data?.borrower_signature_date || "",
          });
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title:response?.data?.message,
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
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err, "errrererer");
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const datasubmit = new FormData();
    datasubmit.append("borrower_id", borrowerid);
    datasubmit.append("application_id", item.id);
    if (showdataid !== null) {
      datasubmit.append("id", showdataid);
    }
    // datasubmit.append("borrower_signature", trimmedDataURL|| "");
    datasubmit.append("broker_signature", trimmedData|| "");
    datasubmit.append("borrower_name", formData.borrower_name|| "");
    // datasubmit.append(
    //   "borrower_signature_date",
    //   formData.borrower_signature_date
    // || "");
    datasubmit.append("broker_signature_date", formData.broker_signature_date|| "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/acknowledgement/agreement`,
      data: datasubmit,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios(config)
      .then((res) => {
        console.log(res, "asdasdasdasdasdsad");
        if (res?.data?.status === true) {
          seterror("");
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: res?.data?.message,
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
    fatchdata()
        }
      })
      .catch((error) => {
        console.log(error, "adderr");
        seterror(error?.response?.data?.errors);
      });
  };
  // const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  // const sigPad = useRef(null);

  // const clear = () => {
  //   sigPad.current.clear();
  // };
  // const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  // const sigPads = useRef(null);

  // const clear = () => {
  //   sigPads.current.clear();
  // };

  // const save = () => {
  //   if (sigPads.current) {
  //     const dataURL = sigPads.current.getTrimmedCanvas().toDataURL("image/png");
  //     setTrimmedDataURL(dataURL);
  //   }
  // };

  const [trimmedData, setTrimmedData] = useState(null);
  const sigNAPad = useRef(null);

  const Clears = () => {
    sigNAPad.current.clear();
  };

  const Saves = () => {
    if (sigNAPad.current) {
      const data = sigNAPad.current.getTrimmedCanvas().toDataURL("image/png");
      setTrimmedData(data);
      console.log(trimmedData, "dataURL==");
    }
  };
  // var base64Icon = trimmedData
  useEffect(() => {
    fatchdata();
  }, []);
  return (
    <>
    {loader ? <div className="loader"></div> : null}
      <div className="row">
        <div className="form-group col-md-12">
          <h2 className="mt-1 mb-5">Acknowledgments and Agreements</h2>
          <div className="row ps-1 pe-0">
            <h5
              className="font266 my-3"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Defnitions:{" "}
            </h5>
            <div className="col-lg-12 my-2">
              <li>
                Lender includes the Lender’s agents, service providers, and any
                of their successors and assigns.{" "}
              </li>
              <li>
                Other Loan Participants includes (i) any actual or potential
                owners of a loan resulting from this application (the “Loan”),
                (ii) acquirers of any beneficial or other interest in the Loan,
                (iii) any mortgage insurer, (iv) any guarantor, (v) any servicer
                of the Loan, and (vi) any of these parties' service providers,
                successors or assigns.{" "}
              </li>
              <h5
                className="font266 my-3"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                I agree to, acknowledge, and represent the following:{" "}
              </h5>
              <label htmlFor="">
                (1) The Complete Information for this Application{" "}
              </label>
              <li>
                If the information I submitted changes or I have new information
                If the information I submitted changes or I have new information
                application, including providing any updated/supplemented real
                estate sales contract.{" "}
              </li>
              <li>
                For purchase transactions: The terms and conditions of any real
                estate sales contract signed by me in connection with this
                application are true, accurate, and complete to the best of my
                knowledge and belief. I have not entered into any other
                agreement, written or oral, in connection with this real estate
                transaction.{" "}
              </li>
              <li>
                The Lender and Other Loan Participants may rely on the
                information contained in the application before and after
                closing of the Loan.{" "}
              </li>
              <li>
                Any intentional or negligent misrepresentation of information
                may{" "}
              </li>
              <label htmlFor="">
                (a) civil liability on me, including monetary damages, if a
                person suffers any loss because the person relied on any
                misrepresentation that I have made on this application, and/or{" "}
              </label>
              <label htmlFor="">
                (b) criminal penalties on me including, but not limited to, fine
                or imprisonment or both under the provisions of Federal law (18
                U.S.C. §§ 1001 et seq.).{" "}
              </label>

              <h5
                className="font266 my-3"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                (2) The Property’s Security{" "}
              </h5>
              <li>
                The Loan I have applied for in this application will be secured
                by a mortgage or deed of trust which provides the Lender a
                security interest in the property described in this application.{" "}
              </li>
              <h5
                className="font266 my-3"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                (3)The Property’s Appraisal, Value, and Condition{" "}
              </h5>
              <li>
                Any appraisal or value of the property obtained by the Lender is
                for use by the Lender and Other Loan Participants.{" "}
              </li>
              <li>
                The Lender and Other Loan Participants have not made any
                representation or warranty, express or implied, to me about the
                property, its condition, or its value.{" "}
              </li>
              <h5
                className="font266 my-3"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                (4)Electronic Records and Signatures{" "}
              </h5>
              <li>
                The Lender and Other Loan Participants may keep any paper record
                and/or electronic record of this application, whether or not the
                Loan is approved.{" "}
              </li>
              <li>
                {" "}
                If this application is created as (or converted into) an
                “electronic application”, I consent to the use of “electronic
                records” and “electronic signatures” as the terms are defined in
                and governed by applicable Federal and/or state electronic
                transactions laws.{" "}
              </li>
              <li>
                I intend to sign and have signed this application either using
                my:
              </li>
              <label htmlFor="">(a) electronic signature; or</label>
              <label htmlFor="">
                (b) verify any data contained in my consumer credit report, my
                loan application and other information supporting my loan
                application;
              </label>
              <label htmlFor="">
                (c) inform credit and investment decisions by the Lender and
                Other Loan Participants;
              </label>
              <label htmlFor="">
                (d) perform audit, quality control, and legal compliance
                analysis
              </label>
              <label htmlFor="">
                (e) perform analysis and modeling for risk assessments; and
                reviews;
              </label>
              <label htmlFor="">
                (f) monitor the account for this loan for potential
                delinquencies and determine any assistance that may be available
                to me; and
              </label>
              <label htmlFor="">
                (g) other actions permissible under applicable law
              </label>
            </div>
            {/* <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Borrower Signature{" "}
            </h5>
            <div className="col-lg-12 mb-3">
              <input
                className="form-control rounded-0 shadow-sm"
                type="date"
                name="borrower_signature_date"
                onChange={handleInputChange}
                defaultValue={showdata?.borrower_signature_date}
                placeholder="Borrower Signature"
              />
            </div>
            {error?.borrower_signature_date &&
            error?.borrower_signature_date?.length >= 0 ? (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.borrower_signature_date[0]}
              </span>
            ) : null}
            <div className="col-lg-12">
              <div className="shadow-sm" id="sigContainer">
                <SignaturePad
                  canvasProps={{
                    width: 600,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  ref={sigPads}
                />
                 {error?.borrower_signature && error?.borrower_signature?.length >= 0 ? (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.borrower_signature[0]}
              </span>
            ) : null}
              </div>

              <div className="col-lg-12 my-5">
                {trimmedDataURL ? (
                  <img className="sigImage" src={trimmedDataURL} alt="Signature" />
                ) : null}
              </div>
            </div>
            <div className="col-lg-12 mb-3">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={clear}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={save}
                >
                  Save
                </button>
              </div>
              <div className="col-lg-12 my-2">
                <img
                  className="sigImagess"
                  src={
                    null
                      ? null
                      : `https://bankerbroker.dev-mn.xyz/${showdata?.borrower_signature_image_path}`
                  }
                  alt=""
                />
              </div>
            </div> */}

            <h5
              className="font266"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Broker Signature{" "}
            </h5>
            <div className="col-lg-12 mb-3">
              <input
                className="form-control rounded-0 shadow-sm"
                type="date"
                name="broker_signature_date"
                onChange={handleInputChange}
                defaultValue={showdata?.broker_signature_date}
                placeholder="Borrower Signature  "
              />
            </div>
            {error?.broker_signature_date && error?.broker_signature_date?.length >= 0 ? (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.broker_signature_date[0]}
              </span>
            ) : null}
            <div className="col-lg-12">
              <div className="shadow-sm" id="sigContainer">
                <SignaturePad
                  canvasProps={{
                    width: 600,
                    height: 110,
                    className: "sigCanvas",
                  }}
                  ref={sigNAPad}
                />
                 {error?.broker_signature && error?.broker_signature?.length >= 0 ? (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.broker_signature[0]}
              </span>
            ) : null}
              </div>
              <div className="col-lg-6 my-5">
                {trimmedData ? (
                  <img className="sigImage" src={trimmedData} alt="Signature" />
                ) : null}
              </div>
            </div>
            <div className="col-lg-12 mb-3">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={Clears}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-0"
                  onClick={Saves}
                >
                  Save
                </button>
              </div>

              <div className="col-lg-12 my-2">
                <img
                  className="sigImagess"
                  src={
                    null
                      ? null
                      : `https://bankerbrokerapi.dev-mn.xyz/${showdata?.broker_signature_image_path}`
                  }
                  alt=""
                />
              </div>
            </div>
            <h5
              className="font26 mt-3"
              style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
            >
              Borrower Name
            </h5>
            <div className="col-lg-12  ps-0 pe-0">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                placeholder=" Name"
                name="borrower_name"
                onChange={handleInputChange}
                defaultValue={showdata?.borrower_name}
                style={{ padding: "12px 10px", fontSize: "14px" }}
              />
            </div>
            {error?.borrower_name && error?.borrower_name?.length >= 0 ? (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {error?.borrower_name[0]}
              </span>
            ) : null}
            <div className="mt-0 ps-0">
              <ButtonGlobal handleSubmit={handleSubmit} btntext={"Submit"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acknowledgments;
