/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-sparse-arrays */
/* eslint-disable eqeqeq */
/* eslint-disable no-self-compare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";

const RolesLicenses = () => {
  const [error, setError] = useState(0);

  const [datas, SetSetDatas] = useState("");
  const token = useSelector((state) => state.auth.auth.idToken)

  const [checkboxes, setCheckboxes] = useState({
    loan_officer: false,
    loan_officer_assistant: false,
    home_state: false,
    processor: false,
    escrow_assistant: false,
    escrow_Officer: false,
    officer_Assistant: false,
    estate_agent: false,
    loa_officer_type: false,
    transaction_coordinato: false,
    trans_cordinater: false,
    realtor_specialist: false,
    human_Resources: false,
    outside_recruiter: false,
    real_estate_agent: false,
  });

  // eslint-disable-next-line no-unused-vars
  const [processor_type, Setprocessor_type] = useState({});
  const [Process_type_deep, SetProcess_type_deep] = useState([]);
  const [activeTab, setActiveTab] = useState("In-house processor");
  const [employment_type_type, setEmployment_type_type] = useState("independet loan Officer(1099)");

  const handleTabChange2 = (key) => {
    setEmployment_type_type(key);
    console.log(key, "employment_type_type")

  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    SetProcess_type_deep([]);
  };


  useEffect(() => {
    handleget();
  }, []);

  const handleChecks = (event) => {
    const { checked, name } = event?.target;
    console.log(checked, name);
    if (Process_type_deep.includes(name) && checked) {
      return;
    } else if (Process_type_deep.includes(name) && checked === false) {
      const val = Process_type_deep.filter((e) => e !== name);
      SetProcess_type_deep(val);
    } else {
      SetProcess_type_deep((prevValues) => [...prevValues, name]);
    }
  };
  // const ProcessTypeDeepArray = Object.entries(Process_type_deep).forEach(
  //   (acc, value) => acc
  // );
  // console.log(Process_type_deep, "Process_type_deep");

  // const handlecheckget = (event) => {
  //   const { checked, name } = event?.target;
  //   // Get the value and checked state of the checkbox that was clicked.

  //   // if (checked) {
  //   // If the checkbox is checked, add its value to the list of selected roles.
  //   Setprocessor_type((prevValues) => {
  //     const updatedValues = { ...prevValues, [name]: checked };
  //     console.log(updatedValues); // Check if the state is updated correctly
  //     return updatedValues;
  //   });
  // };

  // console.log(Object.keys(processor_type)+"process_type")
  const ProcessTypeArray = Object.keys(processor_type).reduce(
    (acc, value) => acc.concat(value),
    []
  );
  console.log(ProcessTypeArray + "ProcessTypeArray");

  const [nmls_number, SetNmls_number] = useState("");
  const [nmls_number_opt, SetNmls_number_opt] = useState(null);
  const [user_type, SetUser_type] = useState("");
  // const [employment_type, Setemployment_type] = useState("");
  // const [realtor_specialist, SetRealtor_specialist] = useState("")
  const [loan_process_feature, SetLoan_process_feature] = useState("");
  const [purchase_process_charge, Setpurchase_process_charge] = useState("");
  const [refinance_process_charge, SetRefinance_process_charge] = useState("");
  const [maximum_loan, SetMaximum_loan] = useState("");
  const [state, SetState] = useState("");
  const [license_name, SetLicense_name] = useState("");
  const [license_number, SetLicense_number] = useState("");
  const [issue_date, SetIssue_date] = useState("");
  const [expiration_date, SetExpiration_date] = useState("");
  const [maximum_loan2, SetMaximum_loan2] = useState("");
  const [capacity, SetCapacity] = useState("");
  const [introduction_email, SetIntroduction_email] = useState("");
  const [employment_type_detail, Setemployment_type_detail] = useState("");
  const [Id, SetId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [AdditionalChecked, setAdditionalChecked] = useState([]);
  const [Additional, setAdditional] = useState([]);
  // const [trueChecked, settrueChecked] = useState({
  //   accounting:false
  // });



  const [selectedValues, setSelectedValues] = useState(
    []
    // {
    // Lock_desk: true,
    // Quote_desk: false,
    // processor_assist: false,
    // processor: false,
    // escalation_manager: false,
    // under_writer: false,
    // pre_approval_Underwriter: false,
    // client_advocate: false,
    // follow_up: false,
    // accounting: false,
    // inside_recruiter: false,
    // outside_recruiter: false,
    // marketing: false,
    // hR_Human_Resources: false,
    //  } )

  );
  const selectedValuesArray = useMemo(() => {
    return Object.keys(selectedValues).reduce(
      (acc, value) => acc.concat(value),
      []
    );
  }, [selectedValues]);

  const handleAdd = () => {
    const formdata = new FormData();
    formdata.append(
      "loa_officer_type",
      checkboxes.loa_officer_type ? true : false
    );
    formdata.append("nmls_number", nmls_number);
    formdata.append("nmls_number_opt", nmls_number_opt);
    // formdata.append('processor_type', checkboxes.processor_type ? 1 : 0)
    formdata.append("user_type", user_type);
    formdata.append("processor_type", activeTab);

    //   const processorType = "in-house-processor"
    // formdata.append('processor_type', processorType.toString())

    selectedValuesArray.map((value, key) => {
      formdata.append(`additional_roles[${key}]`, value);
    });

    const keys = Object.keys(processor_type);
    console.log(keys + "keys and process");

    Process_type_deep.map((value, key) => {
      formdata.append(`processor_type_deep[${key}]`, value.toString());
    });

    formdata.append("loan_officer", checkboxes.loan_officer ? 1 : 0);
    formdata.append(
      "realtor_specialist",
      checkboxes.realtor_specialist ? 1 : 0
    );
    formdata.append("loan_process_feature", loan_process_feature ? 1 : 0);
    formdata.append("purchase_process_charge", purchase_process_charge);
    formdata.append("refinance_process_charge", refinance_process_charge);
    formdata.append(
      "loan_officer_assistant",
      checkboxes.loan_officer_assistant ? 1 : 0
    );
    formdata.append("home_state", checkboxes.home_state ? 1 : 0);
    formdata.append("real_estate_agent", checkboxes.real_estate_agent ? 1 : 0);
    formdata.append("processor", checkboxes.processor ? 1 : 0);
    formdata.append("trans_cordinater", checkboxes.trans_cordinater ? 1 : 0);
    formdata.append("escrow_officer", checkboxes.escrow_Officer ? 1 : 0);
    formdata.append("escrow_assistant", checkboxes.escrow_assistant ? 1 : 0);
    formdata.append("maximum_loan", maximum_loan);
    formdata.append("state", state);
    formdata.append("license_name", license_name);
    formdata.append("license_number", license_number);
    formdata.append("issue_date", issue_date);
    formdata.append("expiration_date", expiration_date);
    formdata.append("maximum_loan2", maximum_loan2);
    formdata.append("capacity", capacity);
    formdata.append("introduction_email", introduction_email);

    formdata.append("employment_type", employment_type_type);

    formdata.append("employment_type_detail", employment_type_detail);
    if (Id !== null) {
      formdata.append("id", Id ? Id : null);
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/roles/license`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(Process_type_deep, "fgfggf");
    axios(config)
      .then(function (response) {
        console.log(response, "response1sdsd");
        SetId(response?.data?.data?.id);
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
        setError("");
      })
      .catch((error) => {
        setError(error.response.data.errors);
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

  let userDetail = localStorage.getItem("userDetail");
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleget = () => {
    const formdata = new FormData();
    formdata.append("user_id", userDetail.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/roles/license`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "lice");
        // console.log(response?.data?.data?.additional_roles?.split(","), "additional_roles");
        setAdditional(response?.data?.data?.additional_roles?.split(","))

        SetSetDatas(response?.data?.data);
        SetId(response?.data?.data?.id);
        SetLicense_number(response?.data?.data?.license_number);
        SetNmls_number(response?.data?.data?.nmls_number);
        SetNmls_number_opt(response?.data?.data?.nmls_number_opt);
        SetUser_type(response?.data?.data?.user_type);
        SetLoan_process_feature(response?.data?.data?.loan_process_feature);
        Setpurchase_process_charge(
          response?.data?.data?.purchase_process_charge
        );
        refinance_process_charge(
          response?.data?.data?.refinance_process_charge
        );
        SetMaximum_loan(response?.data?.data?.maximum_loan);
        SetMaximum_loan2(response?.data?.data?.maximum_loan2);
        SetState(response?.data?.data?.state);
        SetLicense_name(response?.data?.data?.license_name);
        SetIssue_date(response?.data?.data?.issue_date);
        SetExpiration_date(response?.data?.data?.expiration_date);
        SetCapacity(response?.data?.data?.capacity);
        introduction_email(response?.data?.data?.introduction_email);
        // setSelectedValues(response?.data?.data?.additional_roles)
        SetProcess_type_deep(response?.data?.data?.processor_type_deep);
        setEmployment_type_type(response?.data?.data?.employment_type);
        // SetAdditional_roles(response?.data?.data?.additional_roles)
        // setSelectedValues(response?.data?.data?.additional_roles);

        
        // Setemployment_type_detail(response?.data?.data?.employment_type_detail)
        setError("");
      })
      .catch((error) => {
        setError(error?.response?.data?.data?.errors);
      });
  };

  const handleChange = (SetState) => (e) => {
    SetState(e.target.value);
  };
  console.log(selectedValues , "additional_roles")

  useEffect(() => {

    console.log(selectedValues, "selectedValues");
  }, [selectedValues]);
  const handleCheckbox = (event) => {
    const { value, checked, name } = event?.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: checked == true
    }));

    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: checked };
      console.log(updatedValues); // Check if the state is updated correctly
      return updatedValues;
    });

    // } else {
    //   // If the checkbox is not checked, remove its value from the list of selected roles.
    //   setSelectedValues((prevValues) =>
    //     prevValues.filter((val) => val !== value)
    //   );
    // }
  };
  // setAdditionalChecked(
  //   selectedValues.map((val,i)=>{
  //     return{
  //       val
  //     }
  //   })
  // )
  // console.log(AdditionalChecked+"setAdditionalChecked")
  const AddiitionChecked = (event) => {
    if (selectedValues) {
      setAdditionalChecked(true);
    }
  };

  // console.log(selectedValuesArray);
  // useEffect(() => {
  //   const storedCheckboxes = localStorage.getItem("checkboxes");
  //   if (storedCheckboxes) {
  //     setCheckboxes(JSON.parse(storedCheckboxes));
  //   }
  // }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked === true
    }));
  };

  useEffect(() => {
    localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
  }, [checkboxes]);
  console.log(selectedValues + "selected values");
  // console.log(checkboxes?.loan_officer === 1 ? true : false, 'ooooooooooooooooooooo')

  // console.log(checkes,"======>>>>>>>>>>>>>>>>>ss")



  const handleChecked = (checkboxKey) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxKey]: !checkboxes[checkboxKey],
    });
  };





  return (
    <>
      <div className="col-lg-12">
        <span className="col-lg-4 bg-gray">
          <span className="text-bold">Roles & Licenses</span>
        </span>
        <div className=" row mt-3">
          <span className="col-lg-12">
            <span className="text-light text-lowercase">
              Click <Link className="text-primary">here</Link>to add more
              licensed states for the company first and then add them to the
              licensed states in the Branch's settings page.
            </span>
          </span>
        </div>
        <div className=" row mt-3 bg-warning p-2">
          <span className="col-lg-12 ">
            <span className="text-normal text-lowercase">
              To update the roles,please content{" "}
              <Link className="text-primary">hr@loanfactory.com</Link>or someone
              with thw Owner permission
            </span>
          </span>
        </div>
        <div className=" row mt-3">
          <div className=" col-lg-12 d-flex">
            <label
              for="inputPassword"
              className="col-lg-4 col-form-label text-capitalize text-white"
            >
              ddsddsd
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="loan_officer"
                onChange={handleCheckboxChange}
                // onClick={() =>}
                checked={datas?.loan_officer==1?true:false}
                id="flexCheckDefaultss"
              />
              <label
                className="form-check-label text-muted  text-lowercase"
                for="flexCheckDefault"
              >
              </label>
            </div>
            {error?.loan_officer && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.loan_officer}
              </span>
            )}
          </div>
        </div>
        <div className=" d-flex mt-3">
          <label
            for="inputPassword"
            className=" col-lg-3 col-form-label text-capitalize me-5"
          >
            Employment type
          </label>
          <div className="">
            <Tabs
              defaultActiveKey="independet loan Officer(1099)"
              id="uncontrolled-tab-example"
              className=" mb-3"
              onSelect={handleTabChange2}
            >
              <Tab
                eventKey="independet loan Officer(1099)"
                title="independet loan Officer(1099)"

              >
                {/* <Tabs
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
                className=" mb-3"
                onSelect={handleTabChange}
              >
                <Tab
                  eventKey="In-house processor"
                  title="In-house processor"
                  onSelect={handleTabChange}
                > */}
                <div className=" row mt-3">
                  <div className=" col-lg-5 input-group">
                    <label
                      for="inputPassword"
                      className=" col-sm-10 text-muted text-lowercase col-form-label text-capitalize"
                    >
                      Outside loan Officer generally receive-W-2 payments and
                      Indepandent loan officers generally receive 1099 payment.
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  className="col-sm-10 form-control rounded-0"
                  style={{ marginLeft: "20px", width: "96%" }}
                  onChange={handleChange(Setemployment_type_detail)}
                  placeholder="Employment type"
                  aria-label="Username"
                />
              </Tab>
              <Tab
                eventKey="Outside Loan Officer (W-2)"
                title="Outside Loan Officer (W-2)"

              >
                <div className=" row mt-3">
                  <div className=" col-lg-10 input-group">
                    <label
                      for="inputPassword"
                      className="col-sm-8 text-muted  col-form-label text-capitalize"
                    >
                      Outside loan Officer generally receive-W-2 payments and
                      Indepandent loan officers generally receive 1099 payment.
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  className="col-sm-8 form-control rounded-0"
                  onChange={handleChange(Setemployment_type_detail)}
                  checked={datas?.employment_type_detail}

                  placeholder="Employment type detail"
                  aria-label="Username"
                />
               
              </Tab>
            </Tabs>
           ` {error?.employment_type_detail && (
            <span className="error-container text-danger fw-normal fs-6 col-12">
              {error?.employment_type_detail}
            </span>
          )}`
          </div>
        </div>
        <div className=" row mt-3 text-align-center">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              NMLS Number
            </label>
          </div>
          <div className="col-lg-8">
            <input
              type="number"
              className="form-control rounded-0"
              onChange={handleChange(SetNmls_number)}
              checked={datas?.nmls_number==1?true:false}
              placeholder="enter your NMLS Number 4554554"
              aria-label="Username"
            />
          </div>
          {error?.nmls_number && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.nmls_number}
            </span>
          )}
        </div>
        <div className="row mt-3">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className=" col-sm-4 col-form-label text-capitalize text-white"
            >
              ddsddsd
            </label>
          </div>
          <div className="col-lg-4">
            <div className="form-check">
              <input
                className="form-check-input"
                name="loan_officer_assistant"
                type="checkbox"
                checked={datas?.loan_officer_assistant==1?true:false}
                onChange={handleCheckboxChange}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-muted  text-lowercase  text-muted text-lowercase"
                for="flexCheckDefault"
              >
                Loan Officer assistant
              </label>
            </div>
          </div>
          {error?.processor && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.processor}
            </span>
          )}
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              NMLS Number (optional)
            </label>
          </div>
          <div class="col-lg-8 mb-2 pt-4">
            <div className=" input-group mt-3">
              <input
                type="number"
                className="form-control rounded-0"
                checked={datas?.nmls_number_opt==1?true:false}
                onChange={handleChange(SetNmls_number_opt)}
                placeholder=""
                aria-label="Username"
              />
            </div>
            {error?.nmls_number_opt && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.nmls_number_opt}
              </span>
            )}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Maximum Loan
            </label>
          </div>
          <div class="col-lg-8 mb-4 pt-4">
            <div className=" input-group mt-3">
              <input
                type="number"
                className="form-control rounded-0"
                checked={datas?.maximum_loan==1?true:false}
                onChange={handleChange(SetMaximum_loan)}
                placeholder="0"
              />
            </div>
            {error?.maximum_loan && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.maximum_loan}
              </span>
            )}
          </div>
        </div>
        <div className=" row mt-3">
          <div className=" col-sm-12 d-flex">
            <label
              for="inputPassword"
              className=" col-sm-4 col-form-label text-capitalize text-white"
            >
              ddsddsd
            </label>
            <div className="form-check">
              <label
                className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                for="flexCheckDefault"
              >
                The Maximum Number of loans you can process at a time
              </label>
            </div>
          </div>
        </div>
        <div className=" row mt-4">
          <div className=" col-sm-5 input-group">
            <label
              for="inputPassword"
              className=" col-sm-4 col-form-label text-capitalize"
            >
              License(s) (optional)
            </label>
            <p className="text-capitalize text-muted">
              These states require MLO to be paid in
              W-2:NL,IL,SC,NC,MA,ME,MS,VT,NV,GA
            </p>
          </div>
        </div>
        <div className="container mt-0">
          <div className="row justify-content-start">
            <div className="col-1 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                Home state
              </p>
            </div>
            <div className="col-2 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                state
              </p>
            </div>
            <div className="col-3 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                License name
              </p>
            </div>
            <div className="col-2 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                License Number
              </p>
            </div>
            <div className="col-2 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                Issued date
              </p>
            </div>
            <div className="col-2 p-0">
              <p
                className="text-lowercase fs-6 "
                style={{ letterSpacing: "0px" }}
              >
                Expiration date
              </p>
            </div>
            <div className="row justify-content-start">
              <div className="col-1 w-auto p-0 pe-3 pt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="home_state"
                  checked={datas?.home_state===1?true:false}
                  onChange={handleCheckboxChange}
                />
              </div>
              {error?.home_state && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.home_state}
                </span>
              )}
              <div className="col-2 p-0 pt-2">
                <select
                  className="form-select p-2 rounded-0 w-100"
                  aria-label="California"
                  onChange={handleChange(SetState)}
                >
                  <option>{datas?.state
 ? datas?.state
 : "select home"}</option>
                  <option name="One">One</option>
                  <option name="Two">Two</option>
                  <option name="Three">Three</option>
                </select>
                {error?.state && (
                  <span className="error-container text-danger fw-normal fs-6">
                    {error?.state}
                  </span>
                )}
              </div>
              <div className="col-3 p-1 pt-2">
                <select
                  className="form-select me-1 p-2 rounded-0 w-100"
                  aria-label="[DFPI]Mortgage Loan Originator"
                  ange={handleChange(SetLicense_name)}
                >
                  <option>
                    {datas?.license_name
                      ? datas?.license_name
                      : "select icense name"}
                  </option>
                  <option name="One">One</option>
                  <option name="Two">Two</option>
                  <option name="Three">Three</option>
                </select>
                {error?.license_name && (
                  <span className="error-container text-danger fw-normal fs-6">
                    {error?.license_name}
                  </span>
                )}
              </div>
              <div className="col-2 p-1">
                <input
                  type="number"
                  class="form-control rounded-0 w-100 bg-light text-white"
                  aceholder="CA-DFPI2"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  defaultValue={datas?.license_number}
                  onChange={handleChange(SetLicense_number)}
                />
                {error?.license_number && (
                  <span className="error-container text-danger fw-normal fs-6">
                    {error?.license_number}
                  </span>
                )}
              </div>
              <div className="col-2 p-1">
                <input
                  type="date"
                  class="form-control rounded-0 w-100 bg-light text-white"
                  placeholder=""
                  escribedby="basic-addon1"
                  defaultValue={datas?.issue_date}
                  onChange={handleChange(SetIssue_date)}
                />
                {error?.issue_date && (
                  <span className="error-container text-danger fw-normal fs-6">
                    {error?.issue_date}
                  </span>
                )}
              </div>
              <div className="col-2 p-1">
                <input
                  type="date"
                  class="form-control rounded-0 w-100 bg-light"
                  placeholder=""
                  ria-describedby="basic-addon1"
                  defaultValue={datas?.expiration_date
                  }
                  onChange={handleChange(SetExpiration_date)}
                />
                {error?.expiration_date && (
                  <span className="error-container text-danger fw-normal fs-6">
                    {error?.expiration_date}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className=" row mt-3">
            <div className="col-lg-10 form-check py-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="processor"
                checked={datas?.processor==1?true:false}
                // checked={checkboxes?.loan_officer === 1 ? true : false}
                onChange={handleCheckboxChange}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                for="flexCheckDefault"
              >
                Processor
              </label>
            </div>
            {error?.processor && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.processor}
              </span>
            )}
          </div>
          <div className=" d-flex mt-3">
            <label
              for="inputPassword"
              className=" col-sm-3 col-form-label text-capitalize me-5"
            >
              {" "}
              Processor type
            </label>
            <div className="">
              <Tabs
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
                className=" mb-3"
                onSelect={handleTabChange}
              >
                <Tab
                  eventKey="In-house processor"
                  title="In-house processor"
                  onSelect={handleTabChange}
                >
                  <div className=" row mt-3">
                    <div className=" col-sm-5 input-group">
                      <div className=" form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="setup processor"
                          d="flexCheckDefault"
                          value={Process_type_deep.includes("setup processor")}
                          id="flexCheckDefault"
                          onChange={handleChecks}
                          checked={
                            activeTab === "In-house processor" &&
                            Process_type_deep.includes("setup processor")
                          }
                        />
                        <label
                          className="form-check-label text-muted text-lowercase"
                          for="flexCheckDefault"
                        >
                          Setup Processor
                        </label>
                      </div>
                      {error?.Setup_Processor && (
                        <span className="error-container text-danger fw-normal fs-6">
                          {error?.Setup_Processor}
                        </span>
                      )}
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="submission processor"
                          value={Process_type_deep.includes(
                            "submission processor"
                          )}
                          id="flexCheckDefault"
                          onChange={handleChecks}
                          checked={
                            activeTab === "In-house processor" &&
                            Process_type_deep.includes("submission processor")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Submission Processor
                        </label>
                      </div>
                      {error?.Submission_Processor && (
                        <span className="error-container text-danger fw-normal fs-6">
                          {error?.Submission_Processor}
                        </span>
                      )}
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Condition Processor"
                          id="flexCheckDefault"
                          value={Process_type_deep.includes(
                            " Condition Processor"
                          )}
                          onChange={handleChecks}
                          checked={
                            activeTab === "In-house processor" &&
                            Process_type_deep.includes("Condition Processor")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Condition Processor
                        </label>
                      </div>
                      {error?.Closing_Processor && (
                        <span className="error-container text-danger fw-normal fs-6">
                          {error?.Closing_Processor}
                        </span>
                      )}
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          name=" Closing Processor"
                          value={Process_type_deep.includes(
                            " Closing Processor"
                          )}
                          onChange={handleChecks}
                          checked={
                            activeTab === "In-house processor" &&
                            Process_type_deep.includes(" Closing Processor")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Closing Processor
                        </label>
                      </div>
                      {error?.Closing_Processor && (
                        <span className="error-container text-danger fw-normal fs-6">
                          {error?.Closing_Processor}
                        </span>
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey="Independet Processor"
                  title="Independet Processor"
                  onSelect={handleTabChange}
                >
                  <div className=" row mt-3">
                    <div className=" col-sm-5 input-group">
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          name="setup pro"
                          value={Process_type_deep.includes("setup pro")}
                          onChange={handleChecks}
                          checked={
                            activeTab === "Independet Processor" &&
                            Process_type_deep.includes("setup pro")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Setup Proces
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={Process_type_deep.includes("Submission_Pro")}
                          name="Submission_Pro"
                          id="flexCheckDefault"
                          onChange={handleChecks}
                          checked={
                            activeTab === "Independet Processor" &&
                            Process_type_deep.includes("Submission_Pro")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Submission Proces
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={Process_type_deep.includes(
                            "Submission_Proces"
                          )}
                          name="Condition_Proces"
                          id="flexCheckDefault"
                          onChange={handleChecks}
                          checked={
                            activeTab === "Independet Processor" &&
                            Process_type_deep.includes("Condition_Proces")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Condition Proces
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={Process_type_deep.includes(" Closing_Proces")}
                          name="Closing_Proces"
                          id="flexCheckDefault"
                          onChange={handleChecks}
                          checked={
                            activeTab === "Independet Processor" &&
                            Process_type_deep.includes("Closing_Proces")
                          }
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Closing Proces
                        </label>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey="Self-Processor"
                  title="Self-Processor"
                  onSelect={handleTabChange}
                >
                  <div className=" row mt-3">
                    <div className=" col-lg-4 input-group">
                      <div className="col-lg-8 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Setup"
                          value={Process_type_deep.includes("Setup")}
                          onChange={handleChecks}
                          checked={
                            activeTab === "Self-Processor" &&
                            Process_type_deep.includes("Setup")
                          }
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Setup Proc
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Submission3 Proc"
                          checked={
                            activeTab === "Self-Processor" &&
                            Process_type_deep.includes("Submission3 Proc")
                          }
                          onChange={handleChecks}
                          value={Process_type_deep.includes("Submission3 Proc")}
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Submission Proc
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Condition"
                          checked={
                            activeTab === "Self-Processor" &&
                            Process_type_deep.includes("Condition")
                          }
                          onChange={handleChecks}
                          value={Process_type_deep.includes("Condition")}
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase"
                          for="flexCheckDefault"
                        >
                          Condition Proc
                        </label>
                      </div>
                      <div className="col-lg-10 form-check py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Closing"
                          onChange={handleChecks}
                          value={Process_type_deep.includes("Closing")}
                          checked={
                            activeTab === "Self-Processor" &&
                            Process_type_deep.includes("Closing")
                          }
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                          for="flexCheckDefault"
                        >
                          Closing Proc
                        </label>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col-lg-4 mb-4 py-4">
              <label
                for="inputPassword"
                className="col-form-label text-capitalize"
              >
                Maximum Loan(optional)
              </label>
            </div>
            <div class="col-lg-8 mb-4 py-4">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control rounded-0"
                  checked={datas?.maximum_loan2}
                  onChange={handleChange(SetMaximum_loan2)}
                  placeholder="20"
                  aria-label="Server"
                />
              </div>
              {error?.maximum_loan2 && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.maximum_loan2}
                </span>
              )}
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col-lg-4 mb-4 py-4">
              <label
                for="inputPassword"
                className="col-form-label text-capitalize"
              ></label>
            </div>
            <div class="col-lg-8 mb-4 py-4">
              <div className="input-group">
                <input
                  className="form-check-input rounded-0"
                  type="checkbox"
                  checked={datas?.loa_officer_type?true:false}
                  onChange={handleCheckboxChange}
                  name="loa_officer_type"
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted ms-2 text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  loan officer type
                </label>
              </div>
              {error?.loa_officer_type && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.loa_officer_type}
                </span>
              )}
            </div>
          </div>
          <div class="row align-items-start">
            <div class="col-lg-4 mb-4 py-4">
              <label
                for="inputPassword"
                className="col-form-label text-capitalize"
              >
                User type
              </label>
            </div>
            <div class="col-lg-8 mb-4 py-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-0"
                  lebel="0"
                  defaultValue={datas?.user_type}
                  onChange={handleChange(SetUser_type)}
                  placeholder="0"
                />
              </div>
              {error?.user_type && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.user_type}
                </span>
              )}
            </div>
          </div>
          <div class="row align-items-start">
            <div className="col-lg-4">
              <label
                for="inputPassword"
                className=" col-sm-4 col-form-label text-lowercase text-white"
              >
                ddsddsd
              </label>
            </div>
            <label
              for="inputPassword"
              className=" col-sm-8 text-muted text-lowercase"
            >
              The Maximum Number of transaction you can process at a time
            </label>
          </div>
        </div>
        <div class="row align-items-start">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Purchase Processing charge
            </label>
          </div>
          <div className="col-lg-8">
            <div className="input-group">
              <input
                type="number"
                class="form-control rounded-0"
                placeholder="$500"
                aria-describedby="basic-addon1"
                defaultValue={datas?.purchase_process_charge}
                onChange={handleChange(Setpurchase_process_charge)}
              />
            </div>
            {error?.purchase_process_charge && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.purchase_process_charge}
              </span>
            )}
          </div>
        </div>
        <div class="row align-items-start mt-4">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Refinance Processing charge
            </label>
          </div>
          <div className="col-lg-8">
            <div className="input-group">
              <input
                type="number"
                class="form-control rounded-0"
                placeholder="$500"
                aria-describedby="basic-addon1"
                defaultValue={datas?.refinance_process_charge}
                onChange={handleChange(SetRefinance_process_charge)}
              />
            </div>
          </div>
          {error?.purchase_process_charge && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.purchase_process_charge}
            </span>
          )}
        </div>
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-4"></div>
            <div className="col">
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="escrow_officer"
                  checked={datas?.escrow_officer==1?true:false}
                  onChange={handleCheckboxChange}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Escrow Officer
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={datas?.escrow_assistant==1?true:false}
                  onChange={handleCheckboxChange}
                  name="escrow_assistant"
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Escrow Officer Assistant
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={datas?.real_estate_agent==1?true:false}
                  onChange={handleCheckboxChange}
                  name="real_estate_agent"
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Real estate agent
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={datas?.trans_cordinater==1?true:false}
                  onChange={handleCheckboxChange}
                  name="trans_cordinater"
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  transaction coordinator
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  name="trans_coordinato"
                  type="checkbox"
                  checked={checkboxes?.trans_cordinater}
                  onChange={handleCheckboxChange}
                  id="flexSwitchCheckChecked"
                />
                <label
                  className="form-check-label text-muted  text-lowercase"
                  for="flexSwitchCheckChecked"
                >
                  Use loan Processing feature?
                </label>
                <label
                  className="form-check-label text-muted  text-lowercase "
                  for="flexSwitchCheckChecked"
                >
                  if unchecked will not go Out to borrowers
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={datas?.realtor_specialist==1?true:false}
                  onChange={handleCheckboxChange}
                  name="realtor_specialist"
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Realtor specialist
                </label>
              </div>
              {error?.realtor_specialist && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.realtor_specialist}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Capacity (optional)
            </label>
          </div>
          <div className="col-lg-8">
            <div className=" col-sm-5 input-group">
              <input
                type="number"
                className="form-control rounded-0"
                checked={datas?.capacity}
                onChange={handleChange(SetCapacity)}
                placeholder="0"
                aria-label="Username"
              />
            </div>
            {error?.capacity && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.capacity}
              </span>
            )}
          </div>
        </div>
        <div className=" row ">
          <div className=" col-sm-12 d-flex">
            <label
              for="inputPassword"
              className=" col-sm-4 col-form-label text-lowercase text-white"
            >
              ddsddsd
            </label>
            <label
              for="inputPassword"
              className=" col-sm-8 text-muted text-lowercase"
            >
              The Maximum Number of transaction you can process at a time
            </label>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col-lg-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Introduction email(optional)
            </label>
          </div>
          <div className="col-lg-8">
            <div className="input-group">
              <input
                className="form-control rounded-0 w-100"
                type="email"
                placeholder="enter email"
                checked={datas?.introduction_email}
                onChange={handleChange(SetIntroduction_email)}
              />
            </div>
            {error?.introduction_email && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.introduction_email}
              </span>
            )}
          </div>
        </div>
        <div className=" row ">
          <div className=" col-sm-12 d-flex">
            <label
              for="inputPassword"
              className=" col-sm-4 col-form-label text-lowercase text-white"
            >
              ddsddsd
            </label>
            <label
              for="inputPassword"
              className=" col-sm-8 text-muted text-lowercase"
            >
              As a reaitor specialist,you are supposed to work closely with your
              realtors,<Link className="text-primary">More</Link>
            </label>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-4 text-capitalize ">Additional Roles</div>
            <div className="col">
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="Lock_desk"
                  // eslint-disable-next-line eqeqeq
                  onChange={handleCheckbox}
                  checked={selectedValues?.Lock_desk}
                  value={datas?.Lock_desk}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Lock desk
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input" 
                  type="checkbox"
                  name="Quote_desk"
                  onChange={handleCheckbox}
                  // checked={selectedValues?.includes('Lock_desk') ? true : false}
                  value={selectedValues?.Quote_desk}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Quote desk
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="processor_assist"
                  onChange={handleCheckbox}
                  checked={selectedValues?.processor_assist}
                  value={selectedValues?.processor_assist}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  processor assist
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="escalation_manager"
                  onChange={handleCheckbox}
                  checked={selectedValues?.escalation_manager}
                  value={selectedValues?.escalation_manager}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Escalation manager
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="under_writer"
                  checked={selectedValues?.under_write}
                  onChange={handleCheckbox}
                  value={selectedValues?.under_writer}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Underwriter
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="pre_approval_Underwriter"
                  checked={
                    selectedValues?.pre_approval_Underwriter
                  }
                  value={selectedValues?.pre_approval_Underwriter}
                  onChange={handleCheckbox}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Pre-approval Underwriter
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="client_advocate"
                  onChange={handleCheckbox}
                  checked={
                    selectedValues?.pre_approval_Underwriter
                  }
                  value={selectedValues?.client_advocate}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Client advocate
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="follow_up"
                  onChange={handleCheckbox}
                  checked={selectedValues?.follow_up}
                  value={selectedValues?.follow_up}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Follow up
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="accounting"
                  value={Additional?.accounting}
                  onChange={handleCheckbox}
                  checked={Additional?.accounting?true:false}
                  onClick={()=>handleChecked("accounting")}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Accounting
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                {console.log(selectedValues?.inside_recruiter, "selectedValues?.inside_recruiter")}

                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={selectedValues && selectedValues.inside_recruiter}
                  name="inside_recruiter"
                  value={selectedValues?.inside_recruiter}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  inside recruiter
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="outside_recruiter"
                  onChange={handleCheckbox}
                  checked={selectedValues?.outside_recruiter === "outside_recruiter"}
                  value={selectedValues?.outside_recruiter}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Outside recruiter
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleCheckbox}
                  checked={
                    selectedValues?.marketing === "marketing"
                  }
                  name="marketing"
                  value={selectedValues?.marketing}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  Marketing
                </label>
              </div>
              <div className="col-lg-8 form-check py-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hR_Human_Resources"
                  onChange={handleCheckbox}
                  checked={
                    selectedValues?.hR_Human_Resources
                  }
                  value={selectedValues?.hR_Human_Resources}
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-muted  text-lowercase text-muted text-lowercase"
                  for="flexCheckDefault"
                >
                  HR (Human Resources)
                </label>
              </div>
              {error?.additional_roles && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.additional_roles}
                </span>
              )}
            </div>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4 mx-auto">
            <button className="btn btn-primary rounded-0" onClick={handleAdd}>
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolesLicenses;
