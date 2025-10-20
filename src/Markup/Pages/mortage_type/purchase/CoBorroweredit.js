/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import Mortageside from "./Mortageside";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { useHistory, useParams } from "react-router-dom";
import ProfileInfo from "../Profile/ProfileInfo";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function CoBorroweredit() {
  const { id } = useParams();
  // Getting Default Value
  const [covalue, setCoValue] = useState();
  const [loader, setLoader] = useState(false);
  const [editing, steediting] = useState(false);
  const [bund, setBund] = useState("");
  const [co_Borrower, setCo_Borrower] = useState(false);
  const [nadeem1111, setNadeem1111] = useState("");
  const [cob_last_name, setCob_last_name] = useState("");
  const [cob_email, setCob_email] = useState("");
  const [cob_phone, setCob_phone] = useState("");
  const [spouse, setSpouse] = useState(0);
  const [complete_task, setComplete_task] = useState(0);
  const [sp_first_name, setSp_first_name] = useState("");
  const [sp_last_name, setSp_last_name] = useState("");
  const [sp_email, setSp_email] = useState("");
  const [sp_phone, setSp_phone] = useState("");
  const [cob_first_name, setCob_first_name] = useState("");
  const [application_id, setApplication_id] = useState("");
  const [ides, setIdes] = useState("");
  const Get_Borrower = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/co/borrower/record/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response,'Getting ids');
        setCoValue(response?.data?.data);
        setSp_email(response?.data?.data[0]?.sp_email);
        setSp_first_name(response?.data?.data[0]?.sp_first_name);
        setSp_last_name(response?.data?.data[0]?.sp_last_name);
        setSp_phone(response?.data?.data[0]?.sp_phone);
        setSpouse(response?.data?.data[0]?.spouse);
        setCob_phone(response?.data?.data[0]?.cob_phone);
        setComplete_task(response?.data?.data[0]?.complete_task);

        if (response?.data?.status === true) {
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
        setBund(error?.response?.data?.errors);
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
    Get_Borrower();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Getting Default Value End
  //   Posting Api
 

  const BorrowerData = new FormData();
  const Assign_id = localStorage.getItem("assignId");
  const history = useHistory();
  BorrowerData.append(
    "cob_last_name",
    cob_last_name ? cob_last_name : covalue?.map((e) => e?.cob_last_name)
  );
  BorrowerData.append(
    "cob_email",
    cob_email ? cob_email : covalue?.map((e) => e?.cob_email)
  );
  BorrowerData.append(
    "cob_phone",
    cob_phone ? cob_phone : covalue?.map((e) => e?.cob_phone)
  );
  BorrowerData.append(
    "cob_first_name",
    cob_first_name ? cob_first_name : covalue?.map((e) => e?.cob_first_name)
  );
  BorrowerData.append("spouse", spouse?1:0);
  BorrowerData.append("complete_task", complete_task?1:0);
  BorrowerData.append("sp_first_name", sp_first_name);
  BorrowerData.append("sp_last_name", sp_last_name);
  BorrowerData.append("sp_email", sp_email);
  BorrowerData.append("sp_phone", sp_phone);
  // BorrowerData.append("cob_first_name", cob_first_name);
  BorrowerData.append("application_id", Assign_id);
  BorrowerData.append(
    "id",
    covalue?.map((e) => e?.id)
  );
  console.log(cob_first_name,"cob_first_name")
  console.log(cob_phone,"cob_phone")
  console.log(cob_email,"cob_email")

  const Add_Borrower = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}invite/co-borrowers/info`,
      data: BorrowerData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        setCo_Borrower(response?.data?.message);
        if (response?.data?.status === true) {
          setLoader(false);
          history.push("/Co-Borrowers");
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
        setBund(error?.response?.data?.errors);
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


  const handlePhoneNumberChanges=(event, state, type)=> {
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
          <Mortageside />
          <div className="col-md-8 my-5 ps-lg-5 ">
            <div className="row">
              <div className="mt-3 divwidth26">
                <>
                  <h4>Fill Co-Borrower's information</h4>
                  <div className="mt-4 contact_max">
                    <div className="input-group ">
                      <span className="input-group-label contact-info-label ">
                        FIRST NAME
                      </span>
                      <input
                        type="text"
                        defaultValue={covalue?.map((e) => e?.cob_first_name)}
                        placeholder="Required"
                        className="form-control text-lowercase"
                        onChange={(e) => setCob_first_name(e.target.value)}
                      />
                    </div>

                    {bund?.cob_first_name
                      ? bund?.cob_first_name.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                    <div className="input-group mt-2">
                      <span className="input-group-label contact-info-label ">
                        LAST NAME
                      </span>
                      <input
                        defaultValue={covalue?.map((e) => e?.cob_last_name)}
                        type="text"
                        placeholder="required"
                        className="form-control text-lowercase"
                        onChange={(e) => setCob_last_name(e.target.value)}
                      />
                    </div>

                    {bund?.cob_last_name
                      ? bund?.cob_last_name.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                    <div className="input-group mt-2">
                      <span className="input-group-label contact-info-label ">
                        EMAIL ID
                      </span>
                      <input
                        defaultValue={covalue?.map((e) => e?.cob_email)}
                        type="email"
                        className="form-control"
                        placeholder="required"
                        onChange={(e) => setCob_email(e.target.value)}
                      />{" "}
                    </div>

                    {bund?.cob_email
                      ? bund?.cob_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                    <div className="input-group mt-2">
                      <span className="input-group-label contact-info-label ">
                        PHONE
                      </span>
                      <input
                        type="number"
                        className="form-control "
                        placeholder="required"
                        defaultValue={covalue?.map((e) => e?.cob_phone)}
                        onChange={(e) =>
                            handlePhoneNumberChanges(e, setCob_phone)
                          }  
                      />{" "} 
                       <input
                          type="text"
                          class="form-control rounded-0 input26clr"
                          placeholder="required"
                          onChange={(e) =>
                            handlePhoneNumberChanges(e, setCob_phone)
                          }
                        defaultValue={covalue?.map((e) => e?.cob_phone)}
                        value={cob_phone}
                        />{" "}
                    </div>

                    {bund?.cob_phone
                      ? bund?.cob_phone.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}

                    <div className="form-check my-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        onClick={(e)=>setSpouse(!spouse)}
                        checked={spouse}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        This borrower is applying with his/her spouse
                      </label>{" "}
                    </div>

                    {bund?.spouse
                      ? bund?.spouse.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}
                  </div>
                  {spouse ? (
                    <>
                      <h4 className="mt-5">
                        Fill his/her spouse's information
                      </h4>
                      <div className="mt-4 contact_max">
                        <div className="input-group ">
                          <span className="input-group-label contact-info-label ">
                            FIRST NAME
                          </span>
                          <input
                            type="text"
                            defaultValue={covalue?.map((e) => e?.sp_first_name)}
                            placeholder="Required"
                            className="form-control text-lowercase"
                            onChange={(e) => setSp_first_name(e.target.value)}
                          />{" "}
                        </div>

                        {bund?.sp_first_name
                          ? bund?.sp_first_name.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}
                        <div className="input-group mt-2">
                          <span className="input-group-label contact-info-label ">
                            LAST NAME
                          </span>
                          <input
                            type="text"
                            defaultValue={covalue?.map((e) => e?.sp_last_name)}
                            formcontrolname="email"
                            placeholder="required"
                            className="form-control text-lowercase"
                            onChange={(e) => setSp_last_name(e.target.value)}
                          />
                        </div>

                        {bund?.sp_last_name
                          ? bund?.sp_last_name.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}
                        <div className="input-group mt-2">
                          <span className="input-group-label contact-info-label ">
                            EMAIL ID
                          </span>
                          <input
                            defaultValue={covalue?.map((e) => e?.sp_email)}
                            className="form-control"
                            type="email"
                            placeholder="required"
                            onChange={(e) => setSp_email(e.target.value)}
                          />
                        </div>

                        {bund?.sp_email
                          ? bund?.sp_email.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}
                        <div className="input-group mt-2">
                          <span className="input-group-label contact-info-label ">
                            PHONE
                          </span>
                          <input
                            defaultValue={covalue?.map((e) => e?.sp_phone)}
                            type="number"
                            className="form-control "
                            placeholder="required"
                            // onChange={(e) => setSp_phone(e.target.value)}
                            onChange={(e) =>handlePhoneNumberChanges(e, setSp_phone)}
                          />{" "}
                        </div>

                        {bund?.sp_phone
                          ? bund?.sp_phone.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}

                        <div className="form-check my-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={complete_task}
                            id="defaultCheck2"
                            onClick={(e)=> setComplete_task(!complete_task)}
                          />
                          <label className="form-check-label" for="defaultCheck2">
                            This borrower's spouse can complete tasks on his/her
                            behalf Invite
                          </label>
                        </div>

                        {bund?.spouse
                          ? bund?.spouse.map((e) => (
                              <p className="text-danger">{e}</p> 
                            ))
                          : null}
                      </div>
                    </>
                  ) :null}
                  <div className="d-flex mt-4">
                    <button
                      className="btn btn-primary mx-2 px-md-5 w-100"
                      onClick={() => Add_Borrower()}
                    >
                      INVITE
                    </button>
                    <NavLink to={'/Co-Borrowers'} style={{Background:"white"}} className="btn btn-outline w-100 mx-2 px-md-2 border rounded-0 w-5"
                    >
                      CANCEL
                    </NavLink>
                  </div>
                </>
              </div>
            </div>
          </div>
          <ProfileInfo/>
        </div>
      </div>
    </>
  );
}

export default CoBorroweredit;
