/* eslint-disable react/style-prop-object */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Documents = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id");
  const [personInfo, setPersonInfo] = useState(null);
  const [Income, setIncome] = useState(null);
  const [realstate, setrealstate] = useState(null);
  const [loaninfo, setloaninfo] = useState(null);
  const [demographic, setdemographic] = useState(null);
  const [orginatorinfo, setorginatorinfo] = useState(null);
  const [assets, setAssets] = useState(null);
  const [declaration, setDeclaration] = useState(null);
  const [acknowledgement, setAcknowledgement] = useState(null);
  const [military, setMilitary] = useState(null);
  const [loader, setLoader] = useState(false);
  const [borrowerImage, setborrowerImage] = useState("");
  const [brokerImage, setbrokerImage] = useState("");
  const Token = useSelector((state) => state.auth.auth.idToken);
  const imageUrlToBase64 = async (url) => {
    const data = await fetch(url);
    console.log(data);
    const blob = await data.blob();
    console.log(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const base64data = reader.result;
      return base64data;
    };
  };
  const handleget = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid || "");
    formdata.append("application_id", item.id || "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/all/agreements`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(async function (response) {
        setLoader(false);
        console.log(
          acknowledgement?.borrower_signature_image_path,
          "responseDocu"
        );
        setPersonInfo(response?.data?.data?.personal_info);
        setIncome(response?.data?.data?.income);
        setrealstate(response?.data?.data?.real_estate);
        setloaninfo(response?.data?.data?.loan_property);
        setdemographic(response?.data?.data?.demographic);
        setorginatorinfo(response?.data?.data?.originator_info);
        setAssets(response?.data?.data?.asset);
        setDeclaration(response?.data?.data?.declaration);
        setAcknowledgement(response?.data?.data?.acknowledgement);
        setborrowerImage(
          response?.data?.data?.acknowledgement?.borrower_signature_image_path
        );
        imageUrlToBase64(
          "response?.data?.data?.acknowledgement?.broker_signature_image_path"
        );
        setbrokerImage(
          response?.data?.data?.acknowledgement?.broker_signature_image_path
        );
        console.log(
          response?.data?.data?.acknowledgement?.broker_signature_image_path,
          "sssss=>>>>>>>>>>"
        );
        setMilitary(response?.data?.data?.military);
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
      })
      .catch((error) => {
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message
            ? error?.response?.data?.message
            : "conection error",
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
      });
  };
  useEffect(() => {
    handleget();
  }, []);

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div
        className="col-lg-12"
        style={{
          // margin:"50px auto 10px",
          backgroundColor: "#fff",
          // padding:"50px",
          webkitBorderRadius: "3px",
          mozBorderRadius: "3px",
          borderRadius: "3px",
          webkitBoxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
          mozBoxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
          color: "black",
        }}
      >
        <div className="row px-5 py-3">
        <br />
        <br />
          <div
            className="col-lg-12"
            style={{ backgroundColor: "rgb(196, 196, 196)", padding: 10 }}
          >
            <div
              style={{
                fontSize: 15,
                fontFamily: "Arial",
                fontStyle: "italic",
              }}
            >
              To be completed by the{" "}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Arial",
              }}
            >
              Lender:
            </div>
            <br />
            <div
              className="col-lg-12"
              style={{
                fontSize: 15,
                fontFamily: "Arial",
                display: "flex",
                marginTop: 5,
              }}
            >
              Lender Loan No./Universal Loan Identifier&nbsp;
              <div
                className="col-lg-5"
                style={{
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >
              
              </div>
              Agency Case No.
              <div
                className="col-lg-2"
                style={{
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >
              </div>
            </div>
          </div>
          <div
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial",marginTop:'20px' }}
          >
            Uniform Residential Loan Application
          </div>
          <br />
          <div
            style={{ fontSize: 15, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Verify and complete the information on this application.
          </div>
          <div style={{ fontSize: 15, fontFamily: "Arial" }}>
            . If you are applying for this loan with others, each additional
            Borrower must provide information as directed by your Lender.{" "}
          </div>
          <br />
          <div
            style={{ border: "3px solid black" }}
            className="col-lg-12"
          ></div>
          <div
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
              marginTop:'20px'
            }}
          >
            Section 1: Borrower Information.
          </div>
          <div style={{ fontSize: 15, fontFamily: "Arial" }}>
            This section asks about your personal information and your
            income from employment and other sources, such as retirement,
            that you want considered to qualify for this loan.
          </div>
          <h1 className="mt-5 fs-4 p-2 mb-0 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>1a. Personal Information</h1>
          {/* <div
              style={{ border: "2px solid black",width:"97%"}}
              className="col-lg-12 m-0"
            ></div> */}
          <div className="row">
            <div className="col-lg-6 fw-bold" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div className="row">
                <div className="col-lg-12">
                  Names:
                </div>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.first_name}
                </p>
                <p className="col-lg-2" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.middle_name}
                </p>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.last_name}
                </p>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.suffix}
                  </p>
                <br />
                <br />
                <div className="col-lg-12">
                  Alternate Names – List any names by which you are known or any names
                  under which credit was previously received:
                </div>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.alternate_first_name}
                </p>
                <p className="col-lg-2" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.alternate_middle_name}
                </p>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.alternate_last_name}
                </p>
                <p className="col-lg-3" style={{ color: "#969ba0", fontStyle: "italic" }}>
                  {personInfo?.alternate_suffix}
                  </p>
              </div>

            </div>
            <div className="col-lg-6" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div
                className="row ps-2 basicStyleDm"
              > Social Security Number&nbsp;:
                <div
                  className="col"
                  respnsecss
                >{personInfo?.social_security_number}
                </div>
                <div
                  className="col-lg-12"
                  style={{
                    color: "#969ba0", fontStyle: "italic",
                    fontSize: 12,
                    fontFamily: "Arial",
                    borderBottom: "1px solid",
                  }}
                >or Individual Taxpayer Identification Number
                </div>
              </div>
              <div
                className="row basicStyleDm"
              >
                <p
                  className="col-lg-4"
                  style={{
                    fontSize: 15,
                    fontFamily: "Arial",
                  }}
                > Date of Birth&nbsp;:
                  <br />
                  <div
                    className="col-lg-12"
                    style={{
                      color: "#969ba0", fontStyle: "italic",
                      fontSize: 15,
                      fontFamily: "Arial",
                      borderBottom: "1px solid",
                    }}
                  >{personInfo?.dob}
                  </div>
                </p>
                <p
                  className="col-lg-8"
                  style={{
                    fontSize: 15,
                    fontFamily: "Arial",
                  }}
                >Citizenship:
                  <br />
                  <div>
                    <input type="radio" className="p-2" checked={personInfo?.citizenship == "US Citizen"} />
                    <label for="radio-2" class="radio-custom-label ps-2">U.S. Citizen</label>
                  </div>
                  <div>
                    <input type="radio" checked={personInfo?.citizenship == "Permanent Resident Alien"} />
                    <label for="radio-2" class="radio-custom-label  ps-2">Permanent Resident Alien</label>
                  </div>
                  <div>
                    <input type="radio" checked={personInfo?.citizenship == "Non-Permanent Resident Alien"} />
                    <label for="radio-2" class="radio-custom-label  ps-2" >Non-Permanent Resident Alien</label>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div
            className="row fw-bold"
            style={{
              fontSize: 15,
              fontFamily: "Arial",
              marginTop: 20,
              lineHeight: "normal;"
            }}
          >
            <p
              className="col-lg-3"
              style={{
                fontSize: 15,
                fontFamily: "Arial",
              }}
            >Type of Credit:

              <div
                className="col-lg-12"
                style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >{personInfo?.type_of_credit}</div>
            </p>
            <p
              className="col-lg-9"
              style={{
                fontSize: 15,
                fontFamily: "Arial",
              }}
            > List Name(s) of Other Borrower(s) Applying for this Loan:
              <div className="row">
              <div className="col-lg-2">
              first name:
              </div>
              <div
                className="col-lg-4"
                style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >{personInfo?.borrower_list_loan_first_name}</div>
             <div className="col-lg-2">
             last name:
              </div>
              <div
                className="col-lg-4"
                style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >{personInfo?.borrower_list_loan_last_name}</div>
              <div className="col-lg-3">
              middle name:
              </div>
              <div
                className="col-lg-3"
                style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >{personInfo?.borrower_list_loan_middle_name}</div>
               <div className="col-lg-2">
               suffix:
              </div>
              <div
                className="col-lg-4"
                style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 15,
                  fontFamily: "Arial",
                  borderBottom: "1px solid",
                }}
              >{personInfo?.borrower_list_loan_suffix}</div>
              </div>
            </p>
          </div>
          <div className="row pt-5">
            <div className="col-lg-7 fw-bold" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row">
                <div
                  className="row basicStyleDm"
                >
                  <p
                    className="col-lg-4 mb-0"
                    style={{
                      fontSize: 15,
                      fontFamily: "Arial",
                    }}
                  > Marital Status:
                    <br />
                    <div>
                      <input  type="radio" checked={personInfo?.marital_status == "Married"} />
                      <label for="radio-2" class="radio-custom-label ps-2">Married</label>
                    </div>
                    <div>
                      <input  type="radio" checked={personInfo?.marital_status == "Separated"} />
                      <label for="radio-2" class="radio-custom-label ps-2">Separated</label>
                    </div>
                    <div>
                      <input  type="radio" checked={personInfo?.marital_status == "Unmarried"} />
                      <label for="radio-2" class="radio-custom-label ps-2" >Unmarried</label>
                    </div>
                  </p>
                  <p
                    className="col-lg-8 mb-0"
                    style={{
                      fontSize: 15,
                      fontFamily: "Arial",
                    }}
                  > Dependents
                    <div
                      className="col-lg-12"
                      style={{
                        color: "#969ba0", fontStyle: "italic",
                        fontSize: 13,
                        fontFamily: "Arial",
                        borderBottom: "1px solid",
                      }}
                    >not listed by another Borrower
                    </div>
                    <div className="row">
                     <div className="col-lg-4">
                     Number:
                     </div>
                     <div
                      className="col-lg-6"
                      style={{
                        color: "#969ba0", fontStyle: "italic",
                        fontSize: 15,
                        fontFamily: "Arial",
                        borderBottom: "1px solid",
                      }}
                    >{personInfo?.dependents_number}
                    </div>
                    <div className="col-lg-4">
                    Ages:
                     </div>
                    <div
                      className="col-lg-6"
                      style={{
                        color: "#969ba0", fontStyle: "italic",
                        fontSize: 15,
                        fontFamily: "Arial",
                        borderBottom: "1px solid",
                      }}
                    >{personInfo?.dependent_ages}
                    </div>
                    </div>
                  </p>

                </div>
                <br />
                <br />
                <div className="col-lg-12" style={{
                  color: "#969ba0", fontStyle: "italic",
                  fontSize: 13,
                  fontFamily: "Arial",
                }}>
                  Single, Divorced, Widowed, Civil Union, Domestic Partnership, Registered
                  Reciprocal Beneficiary Relationship
                </div>
              </div>

            </div>
            <div className="col-lg-5" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div style={{
                fontSize: 15,
                fontFamily: "Arial",
                marginTop: 5,
                fontWeight: 800,
                marginLeft: "-7px"
              }}>Contact Information</div>
              <div
                className="row ps-2 basicStyleDm pt-3"
              > Home Phone&nbsp;:
                <div
                  className="col respnsecss"
                  respnsecss
                >{personInfo?.home_phone}
                </div>
              </div>
              <div
                className="row ps-2 basicStyleDm"
              > Cell Phone&nbsp;:
                <div
                  className="col respnsecss"
                  respnsecss
                >{personInfo?.cell_phone}
                </div>
              </div>
              <div
                className="row ps-2 basicStyleDm"
              > Work Phone&nbsp;:
                <div
                  className="col respnsecss"
                  respnsecss
                >{personInfo?.work_phone}
                </div>
              </div>
              <div
                className="row ps-2 basicStyleDm"
              > Email&nbsp;:
                <div
                  className="col respnsecss"
                  respnsecss
                >{personInfo?.email}
                </div>
              </div>
            </div>
          </div>
          {/* <h4 className="col-lg-6 pt-2">
            have any dependent
            <div style={{ color: "#969ba0",fontStyle:"italic", paddingLeft: "5px" }}>
              {personInfo?.have_any_dependent === 1 ? "Yes" : "No"}
            </div>
          </h4> */}
          <div
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
              marginTop:'40px'
            }}
          >
            Current Address
          </div>
          <div className="row">
            <div className="col-lg-1 basicStyleDm">Street</div>
            <div className="col-lg-8 respnsecss">{personInfo?.street}</div>
            <div className="col-lg-1 basicStyleDm">Unit #</div>
            <div className="col-lg-2 respnsecss">{personInfo?.unit}</div>
            <div className="col-lg-1 basicStyleDm">City</div>
            <div className="col-lg-3 respnsecss">{personInfo?.city}</div>
            <div className="col-lg-1 basicStyleDm">State</div>
            <div className="col-lg-1 respnsecss ps-0">{personInfo?.state}</div>
            <div className="col-lg-1 basicStyleDm">ZIP</div>
            <div className="col-lg-2 respnsecss">{personInfo?.zip}</div>
            <div className="col-lg-1 basicStyleDm">Country</div>
            <div className="col-lg-2 respnsecss">{personInfo?.country}</div>
            <div className="basicStyleDm col-lg-3">How Long at Current Address?</div>
            <div className="col-lg-3 respnsecss">{personInfo?.years_at_current_address}</div>
            <div className="basicStyleDm col-lg-1">Years</div>
            <div className="col-lg-2 respnsecss">{personInfo?.months_at_current_address}</div>
            {/* <div className="basicStyleDm col-lg-1">months</div>
            <div className="basicStyleDm col-lg-1">Housing</div> */}
            <div className="col-lg-4">
              <input  type="radio" checked={personInfo?.housing === "No primary housing expense"} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No primary housing expense</label>
            </div>
            <div className="col-lg-2">
              <input  type="radio" checked={personInfo?.housing === "Own"} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Own</label>
            </div>
            <div className="col-lg-2">
              <input  type="radio" checked={personInfo?.housing === "Rent"} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Rent</label>
            </div>
            <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 col-lg-1" >$/month</label>
            <div className="col-lg-3 basicStyleDm respnsecss">{personInfo?.former_years_at_current_address}</div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="col-lg-8 m-0 mt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
              marginTop:'20px'
            }}
          >
            If at Current Address for LESS than 2 years, list Former Address
          </div>
          <div className="col-lg-4 m-0 mt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={personInfo?.no_list_former_address === 1} />
            Does not apply
          </div>
          <div className="row">
            <div className="col-lg-1 basicStyleDm">Street</div>
            <div className="col-lg-8 respnsecss">{personInfo?.former_street}</div>
            <div className="col-lg-1 basicStyleDm">Unit #</div>
            <div className="col-lg-2 respnsecss">{personInfo?.former_unit}</div>
            <div className="col-lg-1 basicStyleDm">City</div>
            <div className="col-lg-3 respnsecss">{personInfo?.former_city}</div>
            <div className="col-lg-1 basicStyleDm">State</div>
            <div className="col-lg-1 respnsecss">{personInfo?.former_state}</div>
            <div className="col-lg-1 basicStyleDm">ZIP</div>
            <div className="col-lg-2 respnsecss">{personInfo?.former_zip}</div>
            <div className="col-lg-1 basicStyleDm">Country</div>
            <div className="col-lg-2 respnsecss">{personInfo?.former_country}</div>
            <div className="basicStyleDm col-lg-3">How Long at Current Address?</div>
            <div className="col-lg-3 respnsecss">{personInfo?.former_years_at_current_address}</div>
            <div className="basicStyleDm col-lg-1">Years</div>
            <div className="col-lg-2 respnsecss">{personInfo?.former_months_at_current_address}</div>
            <div className="col-lg-4">
              <input  type="radio" checked={personInfo?.housing === "No primary housing expense"} />
              <label for="3" class="radio-custom-label basicStyleDm ps-2" >No primary housing expense</label>
            </div>
            <div className="col-lg-2">
              <input  type="radio" checked={personInfo?.housing === "Own"} />
              <label for="radio-4" class="radio-custom-label basicStyleDm ps-2" >Own</label>
            </div>
            <div className="col-lg-2">
              <input  type="radio" checked={personInfo?.housing === "Rent"} />
              <label for="radio-5" class="radio-custom-label basicStyleDm ps-2" >Rent</label>
            </div>
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 col-lg-1" >$/month</label>
            <div className="col-lg-3 basicStyleDm respnsecss">{personInfo?.former_years_at_current_address}</div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="col-lg-8 m-0 mt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            Mailing Address – if different from Current Address
          </div>
          <div className="col-lg-4 m-0 mt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={personInfo?.no_mailing_address === 1} />
            Does not apply
          </div>
          <div className="row">
            <div className="col-lg-1 basicStyleDm">Street</div>
            <div className="col-lg-8 respnsecss">{personInfo?.mailing_address_street}</div>
            <div className="col-lg-1 basicStyleDm">Unit #</div>
            <div className="col-lg-2 respnsecss">{personInfo?.mailing_address_unit}</div>
            <div className="col-lg-1 basicStyleDm">City</div>
            <div className="col-lg-3 respnsecss">{personInfo?.mailing_address_city}</div>
            <div className="col-lg-1 basicStyleDm">State</div>
            <div className="col-lg-1 respnsecss">{personInfo?.mailing_address_state}</div>
            <div className="col-lg-1 basicStyleDm">ZIP</div>
            <div className="col-lg-2 respnsecss">{personInfo?.mailing_address_zip}</div>
            <div className="col-lg-1 basicStyleDm">Country</div>
            <div className="col-lg-2 respnsecss">{personInfo?.mailing_address_country}</div>
            {console.log(personInfo?.mailing_address_country,"mailing_address_country")}
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5 mb-5"
          ></div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>1b. Current Employment/Self-Employment and Income</h1>
          <div className="col-lg-4 m-0 pt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={Income?.doe_not_apply === 1} />
            Does not apply
          </div>
          <div className="row">
            <div className="col-lg-8 fw-bold" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div className="row pt-3">
                <div className="col-lg-4 basicStyleDm">Employer or Business Name</div>
                <div className="col-lg-4 respnsecss">{Income?.employer_name}</div>
                <div className="col-lg-1 basicStyleDm">Phone</div>
                <div className="col-lg-3 respnsecss">{Income?.phone}</div>
                <div className="col-lg-1 basicStyleDm">street</div>
                <div className="col-lg-8 respnsecss">{Income?.street}</div>
                <div className="col-lg-1 basicStyleDm">Unit#</div>
                <div className="col-lg-2 respnsecss">{Income?.unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{Income?.city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss">{Income?.state}</div>
                <div className="col-lg-1 basicStyleDm" style={{ paddingLeft: "25px" }}>ZIP</div>
                <div className="col-lg-2 respnsecss">{Income?.zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{Income?.country}</div>
              </div>
              <div className="row pt-2">
                <div className="col-lg-8" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div className="row">
                    <div className="col-lg-4 basicStyleDm">Position or Title</div>
                    <div className="col-lg-8 respnsecss">{Income?.position}</div>
                    <div className="col-lg-3 basicStyleDm">Start Date</div>
                    <div className="col-lg-6 respnsecss">{Income?.start_date}</div>
                    <div className="col-lg-3 basicStyleDm">(mm/dd/yyyy)</div>
                    <div className="col-lg-7 basicStyleDm">How long in this line of work?</div>
                    <div className="col-lg-5 respnsecss">{Income?.how_long_in_line}</div>
                    {/* <div className="col-lg-2 basicStyleDm">Years</div>
                 <div className="col-lg-2 basicStyleDm mb-2">Months</div>
                 <div className="col-lg-5 respnsecss mb-2">{Income?.years}</div>
                 <div className="col-lg-5 respnsecss mb-2">{Income?.months}</div> */}
                  </div>
                </div>
                <div className="col-lg-4" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div style={{
                    fontSize: 13,
                    fontFamily: "Arial",
                    marginTop: 5,
                    fontWeight: 800,
                    marginLeft: "-7px"
                  }}>Check if this statement applies:</div>
                  <div className="pt-2" style={{ fontSize: "12px" }}>
                    <input id="radio-2" name="I am employed by a family" type="checkbox" checked={Income?.employed_family_member === 1} />I am employed by a family member,
                    property seller, real estate agent, or other
                    party to the transaction.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pt-2 col-lg-3">
                  <input id="radio-2" name="Check if you are" type="checkbox" checked={Income?.business_owner === 1} />Check if you are the Business
                  Owner or Self-Employed
                </div>
                <div className="col-lg-6">
                  <div className="pt-2 col-lg-12">
                    <input id="radio-2" name="less than 25%." type="radio" checked={Income?.have_ownership_less_25 === 1} /> &nbsp;I have an ownership share of less than 25%.
                  </div>
                  <div className="pt-2 col-lg-12">
                    <input id="radio-2" name="of 25% or more" type="radio" checked={Income?.have_ownership_more_25 === 1} />&nbsp;I have an ownership share of 25% or more
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div className="col-lg-12 fw-bolder" style={{ fontSize: "10px" }}> Monthly Income (or Loss)</div>
                  <div className="col-lg-12 respnsecss mb-2">${Income?.monthly_income}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div style={{
                fontSize: 15,
                fontFamily: "Arial",
                marginTop: "20px",
                fontWeight: 800,
              }}>Gross Monthly Income</div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Base$</div>
                <div className="w-50 respnsecss">{Income?.base}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Overtime$</div>
                <div className="w-50 respnsecss">{Income?.overtime}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Bonus$</div>
                <div className="w-50 respnsecss">{Income?.bonus}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Commission$</div>
                <div className="w-50 respnsecss"> &nbsp;&nbsp;&nbsp;{Income?.commission}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Military Entitlements$</div>
                <div className="w-50 respnsecss">{Income?.ts}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Other$</div>
                <div className="w-50 respnsecss">{Income?.other}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm fw-bold">TOTAL$</div>
                <div className="w-50 respnsecss">{Income?.total}</div>
                <div className="w-25 basicStyleDm fw-bold mb-2">/month</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", marginTop:"10px"}}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="col-lg-12 m-0">
          Uniform Residential Loan Application
          Freddie Mac Form 65 • Fannie Mae Form 1003
          Effective 1/2021
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>1c. IF APPLICABLE, Complete Information for Additional Employment/Self-Employment and Income </h1>
          <div className="col-lg-3 m-0 pt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={Income?.additional_does_not_apply === 1} />
            Does not apply
          </div>
          <div className="row">
            <div className="col-lg-8 fw-bold" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div className="row pt-3">
                <div className="col-lg-4 basicStyleDm">Employer or Business Name</div>
                <div className="col-lg-4 respnsecss">{Income?.additional_employer_name}</div>
                <div className="col-lg-1 basicStyleDm">Phone</div>
                <div className="col-lg-3 respnsecss">{Income?.additional_phone}</div>
                <div className="col-lg-1 basicStyleDm">street</div>
                <div className="col-lg-8 respnsecss">{Income?.additional_street}</div>
                <div className="col-lg-1 basicStyleDm">Unit#</div>
                <div className="col-lg-2 respnsecss">{Income?.additional_unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{Income?.additional_city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss ps-0">{Income?.additional_state}</div>
                <div className="col-lg-1 basicStyleDm" style={{ paddingLeft: "25px" }}>ZIP</div>
                <div className="col-lg-2 respnsecss">{Income?.additional_zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{Income?.additional_country}</div>
              </div>
              <div className="row pt-2">
                <div className="col-lg-8" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div className="row">
                    <div className="col-lg-4 basicStyleDm">Position or Title</div>
                    <div className="col-lg-8 respnsecss">{Income?.additional_position}</div>
                    <div className="col-lg-3 basicStyleDm">Start Date</div>
                    <div className="col-lg-6 respnsecss">{Income?.additional_start_date}</div>
                    <div className="col-lg-3 basicStyleDm">(mm/dd/yyyy)</div>
                    <div className="col-lg-7 basicStyleDm">How long in this line of work?</div>
                    <div className="col-lg-5 respnsecss">{Income?.additional_how_long_in_line}</div>
                    {/* <div className="col-lg-2 basicStyleDm">Years</div>
                 <div className="col-lg-2 basicStyleDm mb-2">Months</div>
                 <div className="col-lg-10 respnsecss mb-2">{Income?.additional_country}</div> */}
                  </div>
                </div>
                <div className="col-lg-4" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div style={{
                    fontSize: 15,
                    fontFamily: "Arial",
                    marginTop: 5,
                    fontWeight: 800,
                    marginLeft: "-7px"
                  }}>Check if this statement applies:</div>
                  <div className="pt-2">
                    <input id="radio-2" name="I am employed by a family" type="checkbox" checked={Income?.additional_employed_family_member === 1} />I am employed by a family member,
                    property seller, real estate agent, or other
                    party to the transaction.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pt-2 col-lg-3">
                  <input id="radio-2" name="Check if you are" type="checkbox" checked={Income?.additional_business_owner === 1} />Check if you are the Business
                  Owner or Self-Employed
                </div>
                <div className="col-lg-6">
                  <div className="pt-2 col-lg-12">
                    <input id="radio-2" name="of less than 25%1" type="radio" checked={Income?.additional_have_ownership_less_25 === 1} />I have an ownership share of less than 25%.
                  </div>
                  <div className="pt-2 col-lg-12">
                    <input id="radio-2" name="share of 25%1" type="radio" checked={Income?.additional_have_ownership_more_25 === 1} />I have an ownership share of 25% or more
                  </div>
                </div>
                <div className="col-lg-3 pt-2">
                  <div className="col-lg-12 fw-bolder" style={{ fontSize: "10px" }}> Monthly Income (or Loss)</div>
                  <div className="col-lg-12 respnsecss mb-2">${Income?.additional_monthly_income}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" style={{ border: "3px solid #969ba0", borderTop: "5px solid black" }}>
              <div style={{
                fontSize: 15,
                fontFamily: "Arial",
                marginTop: "20px",
                fontWeight: 800,
              }}>Gross Monthly Income</div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Base$</div>
                <div className="w-50 respnsecss">{Income?.additional_base}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Overtime$</div>
                <div className="w-50 respnsecss">{Income?.additional_overtime}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Bonus$</div>
                <div className="w-50 respnsecss">{Income?.additional_bonus}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Commission$</div>
                <div className="w-50 respnsecss"> &nbsp;&nbsp;&nbsp;{Income?.additional_commission}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Military Entitlements$</div>
                <div className="w-50 respnsecss">{Income?.additional_ts}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm">Other$</div>
                <div className="w-50 respnsecss">{Income?.additional_other}</div>
                <div className="w-25 basicStyleDm">/month</div>
              </div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm fw-bold">TOTAL$</div>
                <div className="w-50 respnsecss">{Income?.additional_total}</div>
                <div className="w-25 basicStyleDm fw-bold mb-2">/month</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>1d. IF APPLICABLE, Complete Information for Previous Employment/Self-Employment and Income</h1>
          <div className="col-lg-3 m-0 pt-5"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={Income?.previous_does_not_apply === 1} />
            Does not apply
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 5,
            fontWeight: 800,
            marginLeft: "-7px"
          }}>Provide at least 2 years of current and previous employment and income. </div>
          <div className="row">
            <div className="col-lg-8 fw-bold" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-3">
                <div className="col-lg-4 basicStyleDm">Employer or Business Name</div>
                <div className="col-lg-4 respnsecss">{Income?.previous_employer_name}</div>
                <div className="col-lg-1 basicStyleDm">Phone</div>
                <div className="col-lg-3 respnsecss">{Income?.previous_phone}</div>
                <div className="col-lg-1 basicStyleDm">street</div>
                <div className="col-lg-8 respnsecss">{Income?.previous_street}</div>
                <div className="col-lg-1 basicStyleDm">Unit#</div>
                <div className="col-lg-2 respnsecss">{Income?.previous_unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{Income?.previous_city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss ps-0">{Income?.previous_state}</div>
                <div className="col-lg-1 basicStyleDm" style={{ paddingLeft: "25px" }}>ZIP</div>
                <div className="col-lg-2 respnsecss">{Income?.previous_zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{Income?.previous_country}</div>
              </div>
              <div className="row pt-2">
                <div className="col-lg-8" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div className="row">
                    <div className="col-lg-4 basicStyleDm">Position or Title</div>
                    <div className="col-lg-8 respnsecss">{Income?.previous_position}</div>
                    <div className="col-lg-3 basicStyleDm">Start Date</div>
                    <div className="col-lg-6 respnsecss">{Income?.previous_start_date}</div>
                    <div className="col-lg-3 basicStyleDm">(mm/dd/yyyy)</div>
                  </div>
                </div>
                <div className="col-lg-4" style={{ border: "1px solid #969ba0", borderTop: "2px solid" }}>
                  <div className="pt-2">
                    <input id="radio-2" name="Check if you are" type="checkbox" checked={Income?.previous_business_owner === 1} />Check if you are the Business
                    Owner or Self-Employed
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div style={{
                fontSize: 15,
                fontFamily: "Arial",
                marginTop: "20px",
                fontWeight: 800,
              }}>Previous Gross Monthly</div>
              <div className="w-100 row pt-2">
                <div className="w-25 basicStyleDm fw-bold">Income$</div>
                <div className="w-50 respnsecss">{Income?.previous_monthly_income}</div>
                <div className="w-25 basicStyleDm fw-bold mb-2">/month</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-2 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>1e. Income from Other Sources</h1>
          <div className="col-lg-3 m-0 pt-2"
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            <input class="form-check-input" type="checkbox" checked={Income?.previous_does_not_apply === 1} />
            Does not apply
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 5,
            fontWeight: 800,
            marginLeft: "-7px"
          }}>Include income from other sources below. Under Income Source, choose from the sources listed here:</div>
          <div className="row">
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Alimony</div>
              <div className="col-lg-12 text-muted">• Automobile Allowance</div>
              <div className="col-lg-12 text-muted">• Boarder Income</div>
              <div className="col-lg-12 text-muted">• Capital Gains</div>
              <div className="col-lg-12 text-muted">• Royalty Payments</div>
              <div className="col-lg-12 text-muted">• Separate Maintenance</div>
            </div>
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Child Support</div>
              <div className="col-lg-12 text-muted">• Disability</div>
              <div className="col-lg-12 text-muted">• Foster Care</div>
              <div className="col-lg-12 text-muted">• Housing or Parsonage</div>
              <div className="col-lg-12 text-muted">• Social Security</div>
              <div className="col-lg-12 text-muted">• Trus</div>
            </div>
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Interest and Dividends</div>
              <div className="col-lg-12 text-muted">• Mortgage Credit Certificate</div>
              <div className="col-lg-12 text-muted">• Mortgage Differentia Payments</div>
              <div className="col-lg-12 text-muted">• Notes Receivable</div>
              <div className="col-lg-12 text-muted">• Unemployment Benefits</div>
              <div className="col-lg-12 text-muted">•  Other</div>
            </div>
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Public Assistance</div>
              <div className="col-lg-12 text-muted">• Public Assistance</div>
              <div className="col-lg-12 text-muted">• Retirement(e.g., Pension, IRA)</div>
              <div className="col-lg-12 text-muted">• Capital Gains</div>
              <div className="col-lg-12 text-muted">• VA Compensation</div>
            </div>
            <div style={{
              fontSize: 15,
              fontFamily: "Arial",
              marginTop: 5,
              fontWeight: 800,
              marginLeft: "-7px"
            }}>NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY IF you want it considered in determining your qualification
              for this loan.</div>
          </div>
          <div className="row">
            <div className="col-lg-9 fw-bold py-4" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-2">
                <div className="col-lg-2 basicStyleDm fw-bold">Income$</div>
                <div className="col-lg-10 respnsecss">{Income?.other}</div>
                <div className="col-lg-4 basicStyleDm fw-bold">Provide TOTAL Amount Here$</div>
                <div className="col-lg-8 respnsecss">{Income?.other_source_total}</div>
              </div>
            </div>
            <div className="col-lg-3 py-4" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div style={{
                fontSize: 15,
                fontFamily: "Arial",
                marginTop: "20px",
                fontWeight: 800,
              }}>Monthly Income</div>
              <div className="row pt-2">
                <div className="col-lg-4 basicStyleDm fw-bold">Income$</div>
                <div className="col-lg-8 respnsecss">{Income?.other_source_monthly_income}</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-1"
          ></div>
          <div className="row mb-5 pt-2">
            <div className="col-lg-2 basicStyleDm fw-bold">Borrower Name:</div>
            <div className="col-lg-10 respnsecss pt-2"> </div>
            <div className="col-lg-12 text-muted">Uniform Residential Loan Application
              Freddie Mac Form 65 • Fannie Mae Form 1003
              Effective 1/2021</div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 2: Financial Information — Assets and Liabilities.
          </div>
          <div className="col-lg-12 text-muted pt-2">. This section asks about things you own that
            are worth money and that you want considered to qualify for this loan. It then asks about your liabilities (or debts) that you pay
            each month, such as credit cards, alimony, or other expenses</div>
          <h1 className="fs-4 p-2 mb-0 mt-4 bg-black text-white w-auto" id="macsize2" style={{ borderRadius: "15px 15px 0px 0px" }}>2a. Assets – Bank Accounts, Retirement, and Other Accounts You Have</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 10,
            fontWeight: 800,
            marginLeft: "-7px"
          }}>Include all accounts below. Under Account Type, choose from the types listed here:</div>
          <div className="row pb-3">
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Checking</div>
              <div className="col-lg-12 text-muted">• Savings</div>
              <div className="col-lg-12 text-muted">• Money Market</div>
              <div className="col-lg-12 text-muted">• Certificate of Deposit</div>
              <div className="col-lg-12 text-muted">• Retirement (e.g., 401k, IRA)</div>
            </div>
            <div className="col-lg-3">
              <div className="col-lg-12 text-muted">• Mutual Fund</div>
              <div className="col-lg-12 text-muted">• Stocks</div>
              <div className="col-lg-12 text-muted">• Stock Options</div>
              <div className="col-lg-12 text-muted">• Bonds</div>
            </div>
            <div className="col-lg-6">
              <div className="col-lg-12 text-muted">• Bridge Loan Proceeds</div>
              <div className="col-lg-12 text-muted">• Individual Development Account</div>
              <div className="col-lg-12 text-muted">• Trust Account</div>
              <div className="col-lg-12 text-muted">• Cash Value of Life Insurance(used for the transaction)</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 fw-bold py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-2">
                <div className="col-lg-4 basicStyleDm fw-bold">Account Type – use list above$</div>
                <div className="col-lg-8 respnsecss">{assets?.income_source}</div>
                <div className="col-lg-4 basicStyleDm fw-bold">Financial Institution$</div>
                <div className="col-lg-8 respnsecss">{assets?.financial_institution}</div>
                <div className="col-lg-4 basicStyleDm fw-bold">Account Number$</div>
                <div className="col-lg-8 respnsecss">{assets?.account_number}</div>
                <div className="col-lg-5" style={{
                  fontSize: 15,
                  fontFamily: "Arial",
                  marginTop: "20px",
                  fontWeight: 800,
                }}>Provide TOTAL Amount Here$</div>
                <div className="col-lg-7 respnsecss mt-3">{assets?.total_amount}</div>
              </div>
            </div>
            <div className="col-lg-3 py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="basicStyleDm fw-bold"> Cash or Market Value</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{assets?.market_value}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>2b. Other Assets and Credits You Have</h1>
          <div className="col-lg-4 fw-bold pt-5 fs-3"> <input class="form-check-input" type="checkbox" checked={assets?.other_asset_credit_not_apply === 1} />
            Does not apply</div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 5,
            fontWeight: 800,
            marginLeft: "-7px"
          }}>Include all other assets and credits below. Under Asset or Credit Type, choose from the types listed here:</div>
          <div className="row">
            <div className="col-lg-6 pb-2">
              <div className="col-lg-12 text-muted">Assets</div>
              <div className="col-lg-12 text-muted">•  Proceeds from Real Estate
                Property to be sold on or before closing </div>
              <div className="col-lg-12 text-muted">• Proceeds from Sale of
                Non-Real Estate Asset</div>
              <div className="col-lg-12 text-muted">• Secured Borrowed Funds</div>
              <div className="col-lg-12 text-muted">• Unsecured Borrowed Funds</div>
              <div className="col-lg-12 text-muted">• Other</div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="col-lg-12 text-muted">Credits</div>
              <div className="col-lg-12 text-muted">• Earnest Money</div>
              <div className="col-lg-12 text-muted">• Employer Assistance</div>
              <div className="col-lg-12 text-muted">• Lot Equity</div>
              <div className="col-lg-12 text-muted">• Relocation Funds</div>
              <div className="col-lg-12 text-muted">• Rent Credit </div>
            </div>
            <div className="col-lg-3 pb-2 pt-3">
              <div className="col-lg-12 text-muted">• Sweat Equity</div>
              <div className="col-lg-12 text-muted">• Trade Equity</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 fw-bold py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-2">
                <div className="col-lg-5 basicStyleDm fw-bold">Account Type – use list abovsse$</div>
                <div className="col-lg-7 respnsecss">{assets?.asset}</div>
                <div className="col-lg-5" style={{
                  fontSize: 15,
                  fontFamily: "Arial",
                  marginTop: "20px",
                  fontWeight: 800,
                }}>Provide TOTAL Amount Here$</div>
                <div className="col-lg-7 respnsecss mt-3">{assets?.other_total_amount}</div>
              </div>
            </div>
            <div className="col-lg-3 py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="basicStyleDm fw-bold"> Cash or Market Value</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{assets?.other_market_value}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-3 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>2c. Liabilities – Credit Cards, Other Debts, and Leases that You Owe </h1>
          <div className="col-lg-4 fw-bold pt-3 fs-3"> <input class="form-check-input" type="checkbox" checked={personInfo?.no_list_former_address === 1} />
            Does not apply</div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 5,
            fontWeight: 800,
            marginLeft: "-7px"
          }}>List all liabilities below (except real estate) and include deferred payments. Under Account Type, choose from the types listed here:</div>
          <div className="row">
            <div className="col-lg-3 pb-2">
              <div className="col-lg-12 text-muted">• Revolving (e.g., credit cards)</div>
            </div>
            <div className="col-lg-4 pb-2">
              <div className="col-lg-12 text-muted">• Installment (e.g., car, student, personal loans) </div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="col-lg-12 text-muted">• Lease (not real estate)</div>
            </div>
            <div className="col-lg-2 pb-2">
              <div className="col-lg-12 text-muted">• Other</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 fw-bold py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-2">
                <div className="col-lg-4 basicStyleDm fw-bold">Account Type – use list above$</div>
                <div className="col-lg-8 respnsecss">{assets?.account_type}</div>
                <div className="col-lg-4 basicStyleDm fw-bold">Company Name</div>
                <div className="col-lg-8 respnsecss">{assets?.company_name}</div>
                <div className="col-lg-4 basicStyleDm fw-bold">Account Number$</div>
                <div className="col-lg-8 respnsecss">{assets?.liabilities_account_number}</div>
                {/* <div className="col-lg-4 basicStyleDm fw-bold">Unpaid Balance$</div>
               <div className="col-lg-8 respnsecss">{assets?.other}</div> */}
                <div className="col-lg-12 fs-4">
                  <input class="form-check-input" type="checkbox" checked={assets?.to_be_paid_of === 1} />
                  &nbsp;&nbsp; To be paid off at or before closing</div>
              </div>
            </div>
            <div className="col-lg-3 py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="basicStyleDm fw-bold"> Monthly Payment</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{assets?.other_market_value}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-3 bg-black text-white w-auto" id="mac-size3" style={{ borderRadius: "15px 15px 0px 0px" }}>2d. Other Liabilities and Expenses </h1>
          <div className="col-lg-4 fw-bold pt-3 fs-3" id="mac-size10"> <input class="form-check-input" type="checkbox" checked={assets?.other_liabilities_not_apply === 1} />
            Does not apply</div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div style={{
            fontSize: 15,
            fontFamily: "Arial",
            marginTop: 5,
            fontWeight: 800,
            marginLeft: "-7px"
          }} id="mac-size16">Include all other liabilities and expenses below. Choose from the types listed here:</div>
          <div className="row">
            <div className="col-lg-2 pb-2">
              <div className="col-lg-12 text-muted">• Alimony</div>
            </div>
            <div className="col-lg-2 pb-2">
              <div className="col-lg-12 text-muted">• Child Support</div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="col-lg-12 text-muted">• Separate Maintenance</div>
            </div>
            <div className="col-lg-3 pb-2">
              <div className="col-lg-12 text-muted">• Job Related Expenses </div>
            </div>
            <div className="col-lg-2 pb-2">
              <div className="col-lg-12 text-muted">• Other </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 fw-bold py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="row pt-2">
                <div className="col-lg-3 basicStyleDm mt-3">other liabilities</div>
                <div className="col-lg-9 respnsecss mt-3">{assets?.other_liabilities}</div>
              </div>
            </div>
            <div className="col-lg-3 py-3" style={{ border: "3px solid #969ba0", borderTop: "5px solid" }}>
              <div className="basicStyleDm fw-bold"> Monthly Payment</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{assets?.other_liabilities_market_value}</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="row pt-2">
            <div className="col-lg-2 basicStyleDm fw-bold">Borrower Name:</div>
            <div className="col-lg-10 respnsecss pt-2">{assets?.borrower_name}</div>
            <div className="col-lg-12 text-muted">Uniform Residential Loan Application
              Freddie Mac Form 65 • Fannie Mae Form 1003
              Effective 1/2021</div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5" id="mac-size1"
          ></div>
          <div
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 3: Financial Information — Real Estate.
          </div>
          <div className="col-lg-8 text-muted mb-3">This section asks you to list all properties you currently own
            and what you owe on them. </div>
          <div className="col-lg-4 fw-bold pt-1 mb-3 fs-4"> <input class="form-check-input" type="checkbox" checked={realstate?.does_not_own_real_estate === 1} />
            &nbsp; I do not own any real estate</div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" id="mac-size4" style={{ borderRadius: "15px 15px 0px 0px" }}>3a. Property You Own</h1>
          <div className="col-lg-7 fs-4 fw-bold pt-5" id="mac-size5">If you are refinancing, list the property you are refinancing FIRST.</div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row py-2">
            <div className="col-lg-2 basicStyleDm fw-bold">Address</div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-1 basicStyleDm">Street</div>
                <div className="col-lg-8 respnsecss">{realstate?.street}</div>
                <div className="col-lg-1 basicStyleDm">Unit #</div>
                <div className="col-lg-2 respnsecss">{realstate?.unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{realstate?.city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss ps-0">{realstate?.state}</div>
                <div className="col-lg-1 basicStyleDm">ZIP</div>
                <div className="col-lg-2 respnsecss">{realstate?.zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{realstate?.country}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Property Value</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss pt-4">{realstate?.property_value}</div>
              </div>
              <div className="row pt-2">
                <div className="basicStyleDm fw-bold"> Monthly Rental Income</div>
                <div className="col-lg-12 respnsecss pt-4">{realstate?.monthly_rental_income}</div>
              </div>
            </div>
            <div className="col-lg-9 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Intended Occupancy:
                Investment, Primary
                Residence, Second Home, Other</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{realstate?.occupancy}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold"> For LENDER to calculate:
                  Net Monthly Rental Income</div>
                <div className="col-lg-12 respnsecss">{realstate?.monthly_net_rental_income}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold"> Monthly Insurance,Taxes,
                  Association Dues, etc. if not included in Monthly Mortgage Payment</div>
                <div className="col-lg-12 respnsecss">{realstate?.monthly_dues}</div>
              </div>
            </div>
            <div className="col-lg-12 py-1 pt-5" id="mac-size6">
              <div className="basicStyleDm fw-bold fs-4 pt-4">Mortgage Loans on this Property</div>
              <div className="col-lg-12 fw-bold pt-3 fs-4 pt-2"> <input class="form-check-input" type="checkbox" checked={realstate?.other_liabilities_not_apply === 1} />
                &nbsp; Does not apply</div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Creditor Name</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.first_creditor_name}</div>
              </div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Account Number</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss ">{realstate?.account_number}</div>
              </div>
            </div>
            <div className="col-lg-6 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Monthly Mortgage Payment</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.monthly_mortgage_payment}</div>
              </div>
            </div>
            <div className="col-lg-5 py-1" style={{ border: "3px solid #969ba0", }}>
              <div className="basicStyleDm fw-bold"><div className="col-lg-12 fw-bold pt-3 fs-4"> <input class="form-check-input" type="checkbox" checked={realstate?.first_to_be_paid === 1} />
                &nbsp; To be paid off at or before closing </div></div>
            </div>
            <div className="col-lg-5 py-1" style={{ border: "3px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Type: FHA, VA,Conventional,
                USDA-RD, Other</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.first_type}</div>
              </div>
            </div>
            <div className="col-lg-2 py-1" style={{ border: "3px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Credit Limit </div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss ">{realstate?.first_credit_limit}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>3b. IF APPLICABLE, Complete Information for Additional Property</h1>
          <div className="col-lg-5 fw-bold pt-5 fs-4"> <input class="form-check-input" type="checkbox" checked={assets?.other_liabilities_not_apply === 1} />
            &nbsp; Does not apply </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row py-4">
            <div className="col-lg-2 basicStyleDm fw-bold">Address</div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-1 basicStyleDm">Street</div>
                <div className="col-lg-8 respnsecss">{realstate?.additional_street}</div>
                <div className="col-lg-1 basicStyleDm">Unit #</div>
                <div className="col-lg-2 respnsecss">{realstate?.additional_unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{realstate?.additional_city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss ps-0">{realstate?.additional_state}</div>
                <div className="col-lg-1 basicStyleDm">ZIP</div>
                <div className="col-lg-2 respnsecss">{realstate?.additional_zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{realstate?.additional_country}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Property Value</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss pt-4">{realstate?.additional_property_value}</div>
              </div>
              <div className="row pt-2">
                <div className="basicStyleDm fw-bold"> Monthly Rental Income</div>
                <div className="col-lg-12 respnsecss pt-4">{realstate?.additional_monthly_rental_income}</div>
              </div>
            </div>
            <div className="col-lg-9 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Intended Occupancy:
                Investment, Primary
                Residence, Second Home, Other</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{realstate?.additional_occupancy}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold"> For LENDER to calculate:
                  Net Monthly Rental Income</div>
                <div className="col-lg-12 respnsecss">{realstate?.additional_monthly_net_rental_income}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold"> Monthly Insurance,Taxes,
                  Association Dues, etc. if not included in Monthly Mortgage Payment</div>
                <div className="col-lg-12 respnsecss">{realstate?.additional_monthly_dues}</div>
              </div>
            </div>
            <div className="col-lg-12 py-1">
              <div className="basicStyleDm fw-bold fs-4">Mortgage Loans on this Property</div>
              <div className="col-lg-12 fw-bold pt-3 fs-4"> <input class="form-check-input" type="checkbox" checked={realstate?.loan_on_additional_property_does_not_apply === 1} />
                &nbsp; Does not apply</div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Creditor Name</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.additional_first_creditor_name}</div>
              </div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Account Number</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss ">{realstate?.additional_account_number}</div>
              </div>
            </div>
            <div className="col-lg-6 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Monthly Mortgage Payment</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.additional_monthly_mortgage_payment}</div>
              </div>
            </div>
            <div className="col-lg-5 py-1" style={{ border: "3px solid #969ba0", }}>
              <div className="basicStyleDm fw-bold"><div className="col-lg-12 fw-bold pt-3 fs-4"> <input class="form-check-input" type="checkbox" checked={realstate?.additional_first_to_be_paid === 1} />
                &nbsp; To be paid off at or before closing </div></div>
            </div>
            <div className="col-lg-5 py-1" style={{ border: "3px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold"> Type: FHA, VA,Conventional,
                USDA-RD, Other</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss">{realstate?.additional_first_type}</div>
              </div>
            </div>
            <div className="col-lg-2 py-1" style={{ border: "3px solid #969ba0" }}>
              <div className="basicStyleDm fw-bold">Credit Limit </div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss ">{realstate?.additional_first_credit_limit}</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="row pt-2">
            <div className="col-lg-2 basicStyleDm fw-bold">Borrower Name:</div>
            <div className="col-lg-10 respnsecss pt-2">{realstate?.borrower_name}</div>
            <div className="col-lg-12 text-muted">Uniform Residential Loan Application
              Freddie Mac Form 65 • Fannie Mae Form 1003
              Effective 1/2021</div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-3 mb-2"
          ></div>
          <div
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 4: Loan and Property Information.
          </div>
          <div className="col-lg-12 text-muted">This section asks about the loan’s purpose and the property you
            want to purchase or refinance.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-4 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>4a. Loan and Property Information</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row py-2 mb-1">
            <div className="col-lg-2 basicStyleDm fw-bold">Loan Amount $</div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-2 respnsecss">{loaninfo?.loan_amount}</div>
                <div className="col-lg-2 basicStyleDm fw-bold">Loan Purpose</div>
                <div className="col-lg-2">
                  <input id="radio-2"  name="Purchase1" type="radio" checked={loaninfo?.loan_purpose === "Purchase"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Purchase</label>
                </div>
                <div className="col-lg-2">
                  <input id="radio-2"  name="Purchase1" type="radio" checked={loaninfo?.loan_purpose === "Refinance"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Refinance</label>
                </div>
                <div className="col-lg-3">
                  <input id="radio-2"  name="Purchase1" type="radio" checked={loaninfo?.loan_purpose === "Other"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Other (specify)</label>
                </div>
                <div className="col-lg-1 respnsecss">{loaninfo?.street}</div>
                <div className="col-lg-1 basicStyleDm">Street</div>
                <div className="col-lg-8 respnsecss">{loaninfo?.street}</div>
                <div className="col-lg-1 basicStyleDm">Unit #</div>
                <div className="col-lg-2 respnsecss">{loaninfo?.unit}</div>
                <div className="col-lg-1 basicStyleDm">City</div>
                <div className="col-lg-3 respnsecss">{loaninfo?.city}</div>
                <div className="col-lg-1 basicStyleDm">State</div>
                <div className="col-lg-1 respnsecss ps-0">{loaninfo?.state}</div>
                <div className="col-lg-1 basicStyleDm">ZIP</div>
                <div className="col-lg-2 respnsecss">{loaninfo?.zip}</div>
                <div className="col-lg-1 basicStyleDm">Country</div>
                <div className="col-lg-2 respnsecss">{loaninfo?.country}</div>
              </div>
            </div>
          </div>
          <div className="row py-2 mb-5" id="mac-size7">
            <div className="col-lg-2 basicStyleDm fw-bold">Occupancy</div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-4">
                  <input id="radio-2"  name="Primary Residence" type="radio" checked={loaninfo?.occupancy === "Primary Residence"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Primary Residence</label>
                </div>
                <div className="col-lg-4">
                  <input id="radio-2"  name="Primary Residence" type="radio" checked={loaninfo?.occupancy === "Second Home"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Second Home</label>
                </div>
                <div className="col-lg-4">
                  <input id="radio-2"  name="Primary Residence" type="radio" checked={loaninfo?.occupancy === "Investment Property"} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Investment Property</label>
                </div>
                <div className="col-lg-2 basicStyleDm">Number of Units</div>
                <div className="col-lg-4 respnsecss">{loaninfo?.no_of_units}</div>
                <div className="col-lg-6 fw-bold pt-1 fs-4"> <input class="form-check-input" type="checkbox" checked={loaninfo?.fha_secondary_residence === 1} />
                  &nbsp; To be paid off at or before closing </div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0  bg-black text-white w-auto" id="Otherb4"  style={{ borderRadius: "15px 15px 0px 0px"}}>4b. Other New Mortgage Loans on the Property You are Buying or Refinancing</h1>
          <div className="col-lg-4 fw-bold  fs-4" style={{marginTop:"50px"}}> <input class="form-check-input" type="checkbox" checked={loaninfo?.other_liabilities_not_apply === 1} />
            &nbsp; Does not apply </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row">
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Creditor Name</div>
              <div className="row pt-2">
                <div className="col-lg-12 respnsecss pt-4">{loaninfo?.first_create_name}</div>
              </div>
              <div className="row pt-2">
                <div className="col-lg-12 pt-4"><div className="col-lg-12 fw-bold pt-3 fs-4"> <input class="form-check-input" type="checkbox" checked={loaninfo?.first_lien === "on"} />
                  &nbsp;Lien Type</div></div>
              </div>
            </div>
            <div className="col-lg-9 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Monthly Payment</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{loaninfo?.first_monthly_payment}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold">Loan Amount/
                  Amount to be Drawn</div>
                <div className="col-lg-12 respnsecss">{loaninfo?.first_unpaid_blnc}</div>
              </div>
              <div className="row pt-1">
                <div className="basicStyleDm fw-bold">cash market value</div>
                <div className="col-lg-12 respnsecss">{loaninfo?.first_cash_market_val}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-2 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>4c. Rental Income on the Property You Want to Purchase</h1>
          <div className="col-lg-3 fw-bold pt-3 fs-4"> For Purchase Only</div>
          <div className="col-lg-3 fw-bold pt-3 fs-4"> <input class="form-check-input" type="checkbox" checked={loaninfo?.rental_income_does_not_apply === 1} />
            &nbsp; Does not apply </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row">
            <div className="col-lg-9 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold col-lg-12 pt-2">Complete if the property is a 2-4 Unit Primary Residence or an Investment Property</div>
              <div className="respnsecss fw-bold col-lg-12 pt-2">Expected Monthly Rental Income</div>
              <div className="basicStyleDm fw-bold col-lg-12 pt-2">For LENDER to calculate: Expected Net Monthly Rental Income</div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Amount</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{loaninfo?.expected_monthly_rental_income}</div>
              </div>
              <div className="basicStyleDm fw-bold">Amount</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{loaninfo?.expected_net_monthly_rental_income}</div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-2 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>4d. Gifts or Grants You Have Been Given or Will Receive for this Loan</h1>
          <div className="col-lg-3 fw-bold pt-2 fs-4"> <input class="form-check-input" type="checkbox" checked={loaninfo?.gifts_does_not_apply === 1} />
            &nbsp; Does not apply </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="col-lg-12 fw-bold pt-2 fs-4">
            Include all gifts and grants below. Under Source, choose from the sources listed here:
          </div>
          <div className="row pt-2">
            <div className="col-lg-3">
              <div className="col-lg-12">• Community Nonprofit </div>
              <div className="col-lg-12">• Religious Nonprofit</div>
            </div>
            <div className="col-lg-2">
              <div className="col-lg-12">• Local Agency </div>
              <div className="col-lg-12">• State Agency </div>
            </div>
            <div className="col-lg-2">
              <div className="col-lg-12">• Employer</div>
              <div className="col-lg-12">• Relative </div>
            </div>
            <div className="col-lg-3">
              <div className="col-lg-12">• Federal Agency </div>
              <div className="col-lg-12">• Unmarried Partner </div>
            </div>
            <div className="col-lg-2">
              <div className="col-lg-12">• Lender </div>
              <div className="col-lg-12">• Other </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-lg-4 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Asset Type: Cash Gift, Gift of Equity, Grant</div>
              <div className="row ">
                <div className="col-lg-12 respnsecss ">{loaninfo?.first_asset_type}</div>
              </div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Deposited/Not Deposited</div>
              <div className="row pt-1">
                <div className="col-lg-12 fw-bold  fs-4">
                  <input class="form-check-input" type="checkbox" checked={loaninfo?.first_deposited === 1} />
                  &nbsp; Deposited </div>
              </div>
            </div>
            <div className="col-lg-2 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Source list</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{loaninfo?.first_source}</div>
              </div>
            </div>
            <div className="col-lg-3 py-1" style={{ border: "3px solid #969ba0", borderTop: "2px solid black" }}>
              <div className="basicStyleDm fw-bold">Cash or Market Value</div>
              <div className="row pt-1">
                <div className="col-lg-12 respnsecss">{loaninfo?.first_cash_market_val}</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-2"
          ></div>
          <div
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 5: Declarations.
          </div>
          <div className="col-lg-12 text-muted">This section asks you specific questions about the property, your funding, and your past financial history.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-3 bg-black text-white w-auto" id="mac-size11" style={{ borderRadius: "15px 15px 0px 0px" }}>5a. About this Property and Your Money for this Loan</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">A.</b>Will you occupy the property as your primary residence?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="property" type="radio" checked={declaration?.primary_residence === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="property" type="radio" checked={declaration?.primary_residence === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">If.</b> YES, have you had an ownership interest in another property in the last three years?
              </div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary21" type="radio" checked={declaration?.another_property === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary21" type="radio" checked={declaration?.another_property === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">(1)</b> What type of property did you own: Primary2 (PR), FHA secondary residence (SR), second home (SH),
                or investment property (IP)? </div>
            </div>
            <div className="col-lg-2 respnsecss">
              <div className="col-lg-12">{declaration?.type_of_property}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">(2)</b> How did you hold title to the property: by yourself (S), jointly with yourspouse (SP), or jointly with another person (O)?
                or investment property (IP)? </div>
            </div>
            <div className="col-lg-2 respnsecss">
              <div className="col-lg-12">{declaration?.property_tile}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">B.</b>If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary3" type="radio" checked={declaration?.Purchase_Transaction === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary3" type="radio" checked={declaration?.Purchase_Transaction === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">C.</b>Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or
                obtaining any money from another party, such as the seller or realtor, that you have not disclosed on this loan application?
              </div>
              <div className="col-lg-12">If YES, what is the amount of this money?
              </div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary4" type="radio" checked={declaration?.borrowing === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary4" type="radio" checked={declaration?.borrowing === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
                <div className="col-lg-12 respnsecss">
                  <div className="col-lg-12">{declaration?.amount}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10" id='mac-size15'>
              <div className="col-lg-12"><b className="fs-3">D.</b>1. Have you or will you be applying for a mortgage loan on another property (not the property securing this loan) on or
                before closing this transaction that is not disclosed on this loan application?
                2. Have you or will you be applying for any new credit (e.g., installmentloan, credit card, etc.) on or before  closing thisloan that
                is not disclosed on this application?</div>
            </div>
            <div className="col-lg-2" id='mac-size15'>
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary2" type="radio" checked={declaration?.mortgage_loan === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary2" type="radio" checked={declaration?.mortgage_loan === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">E.</b>Will this property be subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid
                through your property taxes (e.g., the Property Assessed Clean Energy Program)?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary5" type="radio" checked={declaration?.first_mortgage_lien === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary5" type="radio" checked={declaration?.first_mortgage_lien === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-1 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>5b. About Your Finances</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">F.</b>Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary6" type="radio" checked={declaration?.guarantor === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary6" type="radio" checked={declaration?.guarantor === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">G.</b>Are there any outstanding judgments against you?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary7" type="radio" checked={declaration?.judgements_against_you === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary7" type="radio" checked={declaration?.judgements_against_you === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">H.</b>. Are you currently delinquent or in default on a Federal debt?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary8" type="radio" checked={declaration?.federal_debt === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary8" type="radio" checked={declaration?.federal_debt === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">I.</b>Are you a party to a lawsuit in which you potentially have any personal financial liability?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary9" type="radio" checked={declaration?.financial_liability === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary9" type="radio" checked={declaration?.financial_liability === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">J.</b>Have you conveyed title to any property in lieu of foreclosure in the past 7 years?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary10" type="radio" checked={declaration?.conveyed_title === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary10" type="radio" checked={declaration?.conveyed_title === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">A.</b>Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby the property was sold to a
                third party and the Lender agreed to accept less than the outstanding mortgage balance due?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary11" type="radio" checked={declaration?.Lender_agreed === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary11" type="radio" checked={declaration?.Lender_agreed === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10">
              <div className="col-lg-12"><b className="fs-3">L.</b>Have you had property foreclosed upon in the last 7 years?</div>
            </div>
            <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary12" type="radio" checked={declaration?.foreclosed_upon === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="Primary12" type="radio" checked={declaration?.foreclosed_upon === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">If YES, identify the type(s) of bankruptcy: </div>
            <div className="col-lg-2">
              <input type="checkbox" defaultChecked={declaration?.type_of_bankruptcy?.includes("Chapter7")} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Chapter 7</label>
            </div>
            <div className="col-lg-2">
              <input type="checkbox" defaultChecked={declaration?.type_of_bankruptcy?.includes("Chapter11")} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Chapter 11</label>
            </div>
            <div className="col-lg-2">
              <input type="checkbox" defaultChecked={declaration?.type_of_bankruptcy?.includes("Chapter12")} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Chapter 12</label>
            </div>
            <div className="col-lg-2">
              <input type="checkbox" defaultChecked={declaration?.type_of_bankruptcy?.includes("Chapter13")} />
              <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Chapter 13</label>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-0 mb-2"
          ></div>
          <div className="col-lg-3"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Borrower Name:
          </div>
          <div className="col-lg-9 respnsecss pt-4"></div>
          <div className="col-lg-12 text-muted mb-5">This section asks you specific questions about the property, your funding, and your past financial history.
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="col-lg-12 pt-2"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 6: Acknowledgments and Agreements.
          </div>
          <div className="col-lg-12 text-muted">This section tells you about your legal obligations when
            you sign this application.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>Acknowledgments and Agreements</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="row pt-3">
            <div className="col-lg-6">
              <div className="col-lg-12"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
              >
                Definitions:
              </div>
              <p className="col-lg-12">
                • "Lender" includes the Lender’s agents, service providers, and any of
                their successors and assigns.
              </p>
              <p className="col-lg-12">
                • "Other Loan Participants" includes (i) any actual or potential owners of
                a loan resulting from this application (the “Loan”), (ii) acquirers of
                any 
                <p className="col-lg-12 pt-2">
                beneficial or other interest in the Loan, (iii) any mortgage insurer,
                (iv) any guarantor, (v) any servicer of the Loan, and (vi) any of these
                parties' service providers, successors or assigns.
              </p>
              </p>
              <p className="col-lg-12">
                <div className="col-lg-12"
                  style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
                >
                  I agree to, acknowledge, and represent the following:
                </div>
                <div className="col-lg-12"
                  style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
                >
                  (1) The Complete Information for this Application
                </div>
                • The information I have provided in this application is true, accurate,
                and complete as of the date I signed this application
              </p>
              <p className="col-lg-12">
                • If the information I submitted changes or I have new information
                before closing of the Loan, I must change and supplement this
                application, including providing any updated/supplemented real
                estate sales contract.
              </p>
              <p className="col-lg-12">
                • For purchase transactions: The terms and conditions of any real
                estate sales contract signed by me in connection with this application
                are true, accurate, and complete to the best of my knowledge and
                belief. I have not entered into any other agreement, written or oral, in
                connection with this real estate transaction.
              </p>
              <p className="col-lg-12">
                • Any intentional or negligent misrepresentation of information may
                result in the imposition of:
              </p>
              <p className="col-lg-12">
                (a) civil liability on me, including monetary damages, if a
                person suffers any loss because the person relied on any
              </p>
              <p className="col-lg-12">
                (b) criminal penalties on me including, but not limited to, fine or
                imprisonment or both unde
              </p>
              <div className="col-lg-12" id="mac-size13"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
              >
                (2) The Property’s Security
              </div>
              <p className="col-lg-12">
                The Loan I have applied for in this application will be secured by
                a mortgage or deed of trust which provides the Lender a security
                interest in the property described in this application.
              </p>
              <div className="col-lg-12"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
              >
                (3) The Property’s Appraisal, Value, and Condition
              </div>
              <p className="col-lg-12">
                • Any appraisal or value of the property obtained by the Lender is
                for use by the Lender and Other Loan Participants.
              </p>
              <p className="col-lg-12">
                • The Lender and Other Loan Participants have not made any
                representation or warranty, express or implied, to me about the
                property, its condition, or its value.
              </p>
              <div className="col-lg-12"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
              >
                (4) Electronic Records and Signatures
              </div>
              <p className="col-lg-12">
                • The Lender and Other Loan Participants may keep any paper record
                and/or electronic record of this application, whether or not the Loan
                is approved.
              </p>
            </div>
            <div className="col-lg-6 pt-2">
              <p className="col-lg-12">
                • If this application is created as (or converted into) an “electronic
                application”, I consent to the use of “electronic records” and “electronic signatures” as the terms are defined in and governed by
                applicable Federal and/or state electronic transactions laws.
              </p>
              <p className="col-lg-12 pt-2">
                • I intend to sign and have signed this application either using my:
              </p>
              <p className="col-lg-12">
                (a) electronic signature; or
              </p>
              <p className="col-lg-12">
                (b) a written signature and agree that if a paper version of this
                application is converted into an electronic application, the
                application will be an electronic record, and the representation
                of my written signature on this application will be my binding
                electronic signature
              </p>
              <p className="col-lg-12 mb-2">
                • I agree that the application, if delivered or transmitted to the Lender
                or Other Loan Participants as an electronic record with my electronic
                signature, will be as effective and enforceable as a paper application
                signed by me in writing
              </p>
              <div className="col-lg-12"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial", marginBottom:"3px"}}
              >
                (5) Delinquency
              </div>
              <p className="col-lg-12">
                • The Lender and Other Loan Participants may report information about
                my account to credit bureaus. Late payments, missed payments, or
                other defaults on my account may be reflected in my credit report and
                will likely affect my credit score
              </p>
              <p className="col-lg-12">
                • The Lender and Other Loan Participants may report information about
                my account to credit bureaus. Late payments, missed payments, or
                other defaults on my account may be reflected in my credit report and
                will likely affect my credit score
              </p>
              <p className="col-lg-12">
                • If I have trouble making my payments I understand that I may contact
                a HUD-approved housing counseling organization for advice about
                actions I can take to meet my mortgage obligations.
              </p>
              <div className="col-lg-12"
                style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
              >
                (6) Authorization for Use and Sharing of Information
              </div>
              <p className="col-lg-12">
                By signing below, in addition to the representations and agreements
                made above, I expressly authorize the Lender and Other Loan
                Participants to obtain, use, and share with each other (i) the loan
                application and related loan information and documentation, (ii) a
                consumer credit report on me, and (iii) my tax return information, as
                necessary to perform the actions listed below, for so long as they have
                an interest in my loan or its servicing:
              </p>
              <p className="col-lg-12">
                (a) process and underwrite my loan;
              </p>
              <p className="col-lg-12">
                (b) verify any data contained in my consumer credit report, my
                loan application and other information supporting my loan
                application;
              </p>
              <p className="col-lg-12">
                (c) inform credit and investment decisions by the Lender
                and Other Loan Participants;

              </p>
              <p className="col-lg-12">
                (d) perform audit, quality control, and legal compliance analysis
                and reviews;

              </p>
              <p className="col-lg-12">
                (e) perform analysis and modeling for risk assessments;
              </p>
              <p className="col-lg-12">
                (d) perform audit, quality control, and legal compliance analysis
                and reviews;

              </p>
              <p className="col-lg-12">
                (f) monitor the account for this loan for potential delinquencies and
                determine any assistance that may be available to me; and
              </p>
              <p className="col-lg-12">
                (g) other actions permissible under applicable law.
              </p>
            </div>
            <div className="col-lg-7 pt-5">
              <div className="row">
                <div className="col-lg-4 fw-bold fs-5 pt-3">Borrower Signature</div>
                <div className="col-lg-8 respnsecss">
                  <img
                    src={`data:image/png;base64,${borrowerImage}`}
                    alt="no Signature"
                    style={{ width: "100%", height: "50px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 pt-5">
              <div className="row pt-3">
                <div className="col-lg-6 fw-bold fs-5">Date (mm/dd/yyyy)</div>
                <div className="col-lg-6 respnsecss">{acknowledgement?.borrower_signature_date}</div>
              </div>
            </div>
            <div className="col-lg-7 pt-5">
              <div className="row">
                <div className="col-lg-4 fw-bold fs-5 pt-3">Broker Signature</div>
                <div className="col-lg-8 respnsecss">
                  <img
                    src={`data:image/png;base64,${brokerImage}`}
                    alt="no Signature"
                    style={{ width: "100%", height: "50px", objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 pt-5">
              <div className="row pt-3">
                <div className="col-lg-6 fw-bold fs-5">Date (mm/dd/yyyy)</div>
                <div className="col-lg-6 respnsecss">{acknowledgement?.broker_signature_date}</div>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="col-lg-3"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Borrower Name:
          </div>
          <div className="col-lg-9 respnsecss pt-2">{acknowledgement?.borrower_name}</div>
          <div className="col-lg-12 text-muted">This section asks you specific questions about the property, your funding, and your past financial history.
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5" id="mac-size14"
          ></div>
          <div className="col-lg-12 pt-3"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 7: Military Service.
          </div>
          <div className="col-lg-12 text-muted">This section asks questions about your (or your deceased spouse's) military service.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-5 bg-black text-white w-auto" id="mac-size12" style={{ borderRadius: "15px 15px 0px 0px" }}>Military Service of Borrower</h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="col-lg-12"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Military Service
          </div>
          <div className="col-lg-12 text-muted"> Did you (or your deceased spouse) ever serve, or are you currently serving, in the United States Armed Forces?
          </div>
          <div className="col-lg-3">
            If YES, check all that apply:
          </div>
          <div className="col-lg-9 text-muted">
            <div className="row pt-4">
              <div className="col-lg-9">
                <input type="checkbox" checked={military?.active_duty === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Currently serving on active duty with projected expiration date of service/tour</label>
              </div>
              <div className="col-lg-3 respnsecss">{military?.expiray_date}</div>
              <div className="col-lg-12">
                <input type="checkbox" checked={military?.retired_from_service === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Currently retired, discharged, or separated from service</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={military?.ever_serve === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Only period of service was as a non-activated member of the Reserve or National Guard</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={military?.surviving_spouse === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Surviving spouse</label>
              </div>
            </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-3" id="mac-size16"
          ></div>
          <div className="col-lg-12"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Section 8: Demographic Information.
          </div>
          <div className="col-lg-12 text-muted">. This section asks about your ethnicity, sex, and race.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-3 bg-black text-white w-auto" id="mac-size8" style={{ borderRadius: "15px 15px 0px 0px" }}>Demographic Information of Borrower </h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
          <div className="col-lg-12"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            The purpose of collecting this information
          </div>
          <div className="col-lg-12 text-muted"> is to help ensure that all applicants are treated fairly and that the housing needs of communities
            and neighborhoods are being fulfilled. For residential mortgage lending, Federal law requires that we ask applicants for their demographic
            information (ethnicity, sex, and race) in order to monitor our compliance with equal credit opportunity, fair housing, and home mortgage
            disclosure laws. You are not required to provide this information, but are encouraged to do so. You may select one or more designations for
            "Ethnicity" and one or more designations for "Race."<b className="text-dark"> The law provides that we may not discriminate </b>on the basis of this information, or on
            whether you choose to provide it. However, if you choose not to provide the information and you have made this application in person, Federal
            regulations require us to note your ethnicity, sex, and race on the basis of visual observation or surname. The law also provides that we may not
            discriminate on the basis of age or marital status information you provide in this application. If you do not wish to provide some or all of this
            information, please check below.
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 mt-3"
          ></div>
          <div className="row pt-2">
          <div className="col-lg-6">
           <div className="row">
             <div className="col-lg-12"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Ethnicity: Check one or more
          </div>
           <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.hidivic_or_latino === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Hidivic or Latino</label>
              </div>
              <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.mexican === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Mexican</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.puerto_rican === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Puerto Rican</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.cuban === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Cuban</label>
              </div>
              <div className="col-lg-8">
                <input type="checkbox" checked={demographic?.other_Hidivic === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Other Hidivic or Latino</label>
              </div>
              <div className="col-lg-12 respnsecss">{demographic?.other_hidivic_or_latino_details}</div>
              <div className="col-lg-12">For example: Argentinean, Colombian, Dominican, Nicaraguan,
             Salvadoran, diviard, and so on.</div>
              <div className="col-lg-6">
                <input type="checkbox" checked={demographic?.not_hidivic_or_latino === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Not Hidivic or Latino</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.do_not_wish_to_provide_ethnicity === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >I do not wish to provide this information</label>
              </div>
              <div className="col-lg-12"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Sex
          </div>
          <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.gender == 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Female</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.gender == 2} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Male</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.gender == 3} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >I do not wish to provide this information</label>
              </div>
           </div>
          </div>
          <div className="col-lg-6">
           <div className="row">
             <div className="col-lg-12"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Race: Check one or more
          </div>
           <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.American_indian_or_Alaska_native === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >American Indian or Alaska Native – Print name of enrolled 
              </label>
              </div>
              <div className="col-lg-4 basicStyleDm">or principal tribe : </div>
              <div className="col-lg-8 respnsecss">{demographic?.principal_tribe}</div>
              <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.asian === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Asian</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.asian_indian === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Asian Indian</label>
              </div>
              <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.japanese === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Japanese</label>
              </div>
              <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.chinese === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Chinese </label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.korean === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Korean</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.filipino === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Filipino</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.vietnamese === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Vietnamese</label>
              </div>
              <div className="col-lg-8">
                <input type="checkbox" checked={demographic?.other_asian} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Other Asian – Print race:</label>
              </div>
              <div className="col-lg-12 respnsecss">{demographic?.other_asian_details}</div>
              <div className="col-lg-12">For example: Argentinean, Colombian, Dominican, Nicaraguan,
             Salvadoran, diviard, and so on.</div>
              <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.black_or_african_american === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Black or African American</label>
              </div>
              <div className="col-lg-8">
                <input type="checkbox" checked={demographic?.native_hawaiian_or_pacific_islander === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Native Hawaiian or Other Pacific Islander</label>
              </div>
          <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.native_hawaiian === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Native Hawaiian </label>
              </div>
              <div className="col-lg-8">
                <input type="checkbox" checked={demographic?.guamanian_or_chamorro === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Guamanian or Chamorro</label>
              </div>
              <div className="col-lg-4">
                <input type="checkbox" checked={demographic?.samoan === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Samoan</label>
              </div>
              <div className="col-lg-12">
                <input type="checkbox" checked={demographic?.other_pacific_islander === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Other Pacific Islander – Print race:</label>
              </div>
              <div className="col-lg-12 respnsecss">{demographic?.other_pacific_islander_details}</div>
              <div className="col-lg-12">For example: Fijian, Tongan, and so on.</div>
              <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.white === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >White</label>
              </div>
              <div className="col-lg-9">
                <input type="checkbox" checked={demographic?.do_not_wish_to_provide_race === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >I do not wish to provide this information</label>
              </div>
           </div>
          </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 mt-2"
          ></div>
          <div className="col-lg-12 pt-3"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            To Be Completed by Financial Institution (for application taken in person):
          </div>
          <div className="col-lg-10 pt-3"
          >
            Was the ethnicity of the Borrower collected on the basis of visual observation or surname?
          </div>
          <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="ethivity_on_observation" type="radio" checked={demographic?.ethivity_on_observation === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="ethivity_on_observation" type="radio" checked={demographic?.ethivity_on_observation === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          <div className="col-lg-10 pt-3"
          >
           Was the sex of the Borrower collected on the basis of visual observation or surname?
          </div>
          <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="gender12" type="radio" checked={demographic?.gender_on_observation === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="gender12" type="radio" checked={demographic?.gender_on_observation === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          <div className="col-lg-10 pt-3"
          >
            Was the race of the Borrower collected on the basis of visual observation or surname?
          </div>
          <div className="col-lg-2">
              <div className="row pt-2">
                <div className="col-lg-6">
                  <input id="radio-2"  name="race12" type="radio" checked={demographic?.race_on_observation === 0} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >No</label>
                </div>
                <div className="col-lg-6">
                  <input id="radio-2"  name="race12" type="radio" checked={demographic?.race_on_observation === 1} />
                  <label for="radio-2" class="radio-custom-label basicStyleDm ps-2" >Yes</label>
                </div>
              </div>
            </div>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 mt-2 mb-4"
          ></div>
          <div className="col-lg-12 mt-5"
            style={{ fontSize: 16, fontWeight: "bold", fontFamily: "Arial" }}
          >
            The Demographic Information was provided through: 
          </div>
          <div className="col-lg-7">
                <input type="checkbox" checked={demographic?.face === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Face-to-Face Interview (includes Electronic Media w/ Video Component)</label>
              </div>
          <div className="col-lg-3">
                <input type="checkbox" checked={demographic?.telephone === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Telephone Interview</label>
              </div>
          <div className="col-lg-2">
                <input type="checkbox" checked={demographic?.fax === 1} />
                <label for="radio-2" class="radio-custom-label basicStyleDm ps-2 ps-2" >Fax or Mail</label>
              </div>
              <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="col-lg-3"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
            Borrower Name:
          </div>
          <div className="col-lg-9 respnsecss pt-2">{acknowledgement?.borrower_name}</div>
          <div className="col-lg-12 text-muted pb-3">To be completed by your Loan Originator.
          </div>
              <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0 mt-5"
          ></div>
          <div className="col-lg-12"
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Arial" }}
          >
             Section 9: Loan Originator Information. 
          </div>
          <div className="col-lg-12 text-muted">To be completed by your Loan Originator.
          </div>
          <h1 className="fs-4 p-2 mb-0 mt-3 bg-black text-white w-auto" style={{ borderRadius: "15px 15px 0px 0px" }}>Loan Originator Information </h1>
          <div
            style={{ border: "2px solid black", }}
            className="col-lg-12 m-0"
          ></div>
           <div className="row py-2">
                <div className="col-lg-4 pt-2 basicStyleDm">Loan Originator Organization Name</div>
                <div className="col-lg-8 pt-2 respnsecss">{orginatorinfo?.originator_organization_name}</div>
                <div className="col-lg-1 pt-2 basicStyleDm">Address</div>
                <div className="col-lg-11 pt-2 respnsecss">{orginatorinfo?.address}</div>
                <div className="col-lg-4 pt-2 basicStyleDm">Loan Originator Organization NMLSR ID#</div>
                <div className="col-lg-4 pt-2 respnsecss">{orginatorinfo?.organisation_nmlsr_id}</div>
                <div className="col-lg-2 pt-2 basicStyleDm">State License ID#</div>
                <div className="col-lg-2 pt-2 respnsecss">{orginatorinfo?.license_id}</div>
                <div className="col-lg-3 pt-2 basicStyleDm">Loan Originator Name </div>
                <div className="col-lg-9 pt-2 respnsecss">{orginatorinfo?.originator_name}</div>
                <div className="col-lg-4 pt-2 basicStyleDm">Loan Originator Organization NMLSR ID#</div>
                <div className="col-lg-4 pt-2 respnsecss">{orginatorinfo?.originator_nmlsr_id}</div>
                <div className="col-lg-2 pt-2 basicStyleDm">State License ID#</div>
                <div className="col-lg-2 pt-2 respnsecss">{orginatorinfo?.originator_license_id}</div>
                <div className="col-lg-1 pt-2 basicStyleDm">Email</div>
                <div className="col-lg-7 pt-2 respnsecss">{orginatorinfo?.email}</div>
                <div className="col-lg-1 pt-2 basicStyleDm">Phone</div>
                <div className="col-lg-3 pt-2 respnsecss">{orginatorinfo?.phone}"</div>
                <div className="col-lg-2 pt-2 basicStyleDm">Signature</div>
                <div className="col-lg-4 pt-2 respnsecss">{orginatorinfo?.signature}</div>
                <div className="col-lg-2 pt-2 basicStyleDm">Date (mm/dd/yyyy)</div>
                <div className="col-lg-4 pt-2 respnsecss">{orginatorinfo?.date}</div>
          </div>
          </div>
        </div>
      </div>
      {/* <OriginatorInfo className="d-none" handleget={handleget}/> */}
    </>
  );
};

export default Documents;
