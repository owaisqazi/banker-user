/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../../../Layout/Header";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { useHistory, useParams } from "react-router-dom";
import RefSideBar from "./RefSideBar";
import ProfileInfo from "../Profile/ProfileInfo";
// import ReFooter from "./ReFooter";
import Footerx404 from "../../../../Images/Footerx404.png";
import { Link } from "react-router-dom/cjs/react-router-dom";

function RefCoBorroweredit() {
  const { id } = useParams();
  // Getting Default Value
  const [covalue, setCoValue] = useState();

  const Get_Borrower = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}mortgage/refinance/get/co/borrower/record/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data?.data, "Bearer");
        setCoValue(response?.data?.data);
        setSp_phone(response?.data?.data.map((e) => e.sp_phone));
        setCob_phone(response?.data?.data.map((e) => e.cob_phone));
        setCob_email(response?.data?.data.map((e) => e.cob_email));
        setSp_email(response?.data?.data.map((e) => e.sp_email));
        setCob_first_name(response?.data?.data.map((e) => e.cob_first_name));
        setCob_last_name(response?.data?.data.map((e) => e.co_last_name));
        setSp_first_name(response?.data?.data.map((e) => e.sp_first_name));
        setSp_last_name(response?.data?.data.map((e) => e.sp_last_name));
        setSpouse(response?.data?.data[0]?.spouse);
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
  }, []);
  // Getting Default Value End
  //   Posting Api
  const [loader, setLoader] = useState(false);
  const [bund, setBund] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [co_Borrower, setCo_Borrower] = useState(false);
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
  BorrowerData.append("spouse", spouse ? 1 : 0);
  BorrowerData.append("complete_task", complete_task ? 1 : 0);
  BorrowerData.append(
    "sp_first_name",
    sp_first_name ? sp_first_name : covalue?.map((e) => e?.cob_first_name)
  );
  BorrowerData.append(
    "sp_last_name",
    sp_last_name ? sp_last_name : covalue?.map((e) => e?.sp_last_name)
  );
  BorrowerData.append(
    "sp_email",
    sp_email ? sp_email : covalue?.map((e) => e?.sp_email)
  );
  BorrowerData.append(
    "sp_phone",
    sp_phone ? sp_phone : covalue?.map((e) => e?.sp_phone)
  );
  BorrowerData.append(
    "cob_first_name",
    cob_first_name ? cob_first_name : covalue?.map((e) => e?.cob_first_name)
  );
  BorrowerData.append("application_id", Assign_id);
  BorrowerData.append(
    "id",
    covalue?.map((e) => e?.id)
  );
  const Add_Borrower = () => {
    setLoader(true);
    let token = localStorage.getItem("usertoken");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}mortgage/refinance/invite/co-borrowers/info`,
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
          history.push("/ref/Co-Borrowers");
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
  const [complete_check, setComplete_check] = useState("");
  // const Check_completetask = (e) => {
  //   const value = e.target.value;
  //   const check = e.target.checked;

  //   if (check) {
  //     setComplete_check([...complete_check, value]);
  //     setComplete_task(1);
  //   } else {
  //     setComplete_check(complete_check?.filter((e) => e !== value));
  //     setComplete_task(0);
  //   }
  //   console.log(complete_task);
  // };
  // const Check_Spouse = (e) => {
  //   const check = e.target.checked;
  //   if (check) {
  //     setSpouse(1);
  //   } else {
  //     setSpouse(0);
  //   }
  //   console.log(spouse,'setSpouse');
  // };
  console.log(spouse, "setSpouse");
  console.log(
    covalue?.map((e) => e?.id),

    "Getting id"
  );
  //   Posting Api End

  const handlePhoneNumberChange = (event, state) => {
    let inputPhoneNumber = event.target.value.replace(/\D/g, ""); // remove non-numeric characters
    if (inputPhoneNumber.length > 10) {
      inputPhoneNumber = inputPhoneNumber?.slice(0, 10); // truncate to 10 digits
    }
    let formattedPhoneNumber = "";
    if (inputPhoneNumber.length > 3) {
      formattedPhoneNumber = `(${inputPhoneNumber?.substring(0, 3)})`;
      if (inputPhoneNumber.length > 6) {
        formattedPhoneNumber += ` ${inputPhoneNumber?.substring(
          3,
          6
        )}-${inputPhoneNumber.substring(6)}`;
      } else {
        formattedPhoneNumber += ` ${inputPhoneNumber?.substring(3)}`;
      }
    } else {
      formattedPhoneNumber = inputPhoneNumber;
    }
    state(formattedPhoneNumber);
  };
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <Header />
      <div className="container-fluid">
        <div className="row">
          <RefSideBar />
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
                        className="form-control text-capitalize"
                        onChange={(e) => setCob_first_name(e.target.value)}
                      />
                      {cob_first_name &&
                      Array.isArray(cob_first_name) &&
                      cob_first_name?.map((name) => name?.length > 0) ? (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      ) : cob_first_name?.length < 4 ||
                        cob_first_name === "" ? null : (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
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
                        className="form-control text-capitalize"
                        onChange={(e) => setCob_last_name(e.target.value)}
                      />
                     {cob_last_name &&
                      Array.isArray(cob_last_name) &&
                      cob_last_name?.map((name) => name?.length > 0) ? (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      ) : cob_last_name?.length < 4 ||
                        cob_last_name === "" ? null : (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
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
                        className="form-control text-capitalize"
                        placeholder="required"
                        onChange={(e) => setCob_email(e.target.value)}
                      />{" "}
                      {!cob_email ||
                      !/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
                        cob_email
                      ) ||
                      cob_email === undefined ? null : (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
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
                        type="tel"
                        className="form-control text-capitalize"
                        placeholder="required"
                        value={cob_phone}
                        onChange={(e) =>
                          handlePhoneNumberChange(e, setCob_phone)
                        }
                      />{" "}
                       {cob_phone &&
                      Array.isArray(cob_phone) &&
                      cob_phone?.map((name) => name?.length > 0) ? (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      ) : cob_phone?.length < 4 ||
                        cob_phone === "" ? null : (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
                    </div>

                    {bund?.cob_phone
                      ? bund?.cob_phone.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                      : null}

                    <div className="form-check my-3">
                      <input
                        className="form-check-input text-capitalize"
                        type="checkbox"
                        value=""
                        id="defaultCheck1"
                        onClick={() => setSpouse(!spouse)}
                        checked={spouse}
                      />
                      <label className="form-check-label" for="defaultCheck1">
                        {/* This borrower is applying with his/her spouse */}
                      </label>{" "}
                    </div>

                    {bund?.complete_task
                      ? bund?.complete_task.map((e) => (
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
                            className="form-control text-capitalize"
                            onChange={(e) => setSp_first_name(e.target.value)}
                          />{" "}
                           {sp_first_name &&
                      Array.isArray(sp_first_name) &&
                      sp_first_name?.map((name) => name?.length > 0) ? (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      ) : sp_first_name?.length < 4 ||
                        sp_first_name === "" ? null : (
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            position: "absolute",
                            right: "18px",
                            top: "8px",
                            color: "green",
                            zIndex: "123",
                          }}
                        >
                          ✔
                        </p>
                      )}
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
                            className="form-control text-capitalize"
                            onChange={(e) => setSp_last_name(e.target.value)}
                          />
                          {sp_last_name?.length < 4 ||
                          sp_last_name === "" ? null : (
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                position: "absolute",
                                right: "18px",
                                top: "8px",
                                color: "green",
                                zIndex: "123",
                              }}
                            >
                              ✔
                            </p>
                          )}
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
                            className="form-control text-capitalize"
                            type="email"
                            placeholder="required"
                            onChange={(e) => setSp_email(e.target.value)}
                          />
                          {!sp_email ||
                          !/^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/.test(
                            sp_email
                          ) ||
                          sp_email === undefined ? null : (
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                position: "absolute",
                                right: "18px",
                                top: "8px",
                                color: "green",
                                zIndex: "123",
                              }}
                            >
                              ✔
                            </p>
                          )}
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
                            value={sp_phone}
                            type="tel"
                            className="form-control text-capitalize"
                            placeholder="required"
                            onChange={(e) =>
                              handlePhoneNumberChange(e, setSp_phone)
                            }
                          />{" "}
                          {sp_phone?.length < 14 || sp_phone === "" ? null : (
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                position: "absolute",
                                right: "18px",
                                top: "8px",
                                color: "green",
                                zIndex: "123",
                              }}
                            >
                              ✔
                            </p>
                          )}
                        </div>

                        {bund?.sp_phone
                          ? bund?.sp_phone.map((e) => (
                              <p className="text-danger">{e}</p>
                            ))
                          : null}

                        <div className="form-check my-3">
                          <input
                            className="form-check-input text-capitalize"
                            type="checkbox"
                            value=""
                            id="defaultCheck2"
                            checked={complete_task}
                            onClick={(e) => setComplete_task(!complete_task)}
                          />
                          <label
                            className="form-check-label"
                            for="defaultCheck2"
                          >
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
                  ) : null}
                  <div className="d-flex mt-4">
                    <button
                      className="btn btn-primary mx-2 px-md-5 w-15"
                      onClick={() => Add_Borrower()}
                    >
                      INVITE
                    </button>
                    <Link
                      className="btn btn-light mx-2 px-md-5 border w-15"
                      to={"/ref/Co-Borrowers"}
                    >
                      CANCEL
                    </Link>
                  </div>
                </>
              </div>
            </div>
            {/* <div className="naimImages" style={{width:"80%", paddingTop:"15px", position:"absolute",bottom:"0px"}}><img src="https://bankerbroker.developer-oa.xyz/assets/img/footercity.svg" alt="" /> </div> */}
          </div>
          <ProfileInfo />
        </div>
        <div className="footerx4020" style={{ marginTop: "245px" }}>
          <hr />
          <img src={Footerx404} alt="" width="100%" height="50%" />
        </div>
      </div>
    </>
  );
}

export default RefCoBorroweredit;
