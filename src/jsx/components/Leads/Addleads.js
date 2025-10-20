/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import Swal from "sweetalert2";
import Baseurl from "../../../Baseurl";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const Addleads = () => {
  const { id } = useParams();
  const Token = useSelector((state) => state.auth.auth.idToken);
  const [property_address, set_property_address] = useState("");
  const [property_city, setproperty_city] = useState("");
  const [property_state, setproperty_state] = useState("");
  const [property_zip, setproperty_zip] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [phone_2, setphone_2] = useState("");
  const [phone_3, setphone_3] = useState("");
  const [phone_4, setphone_4] = useState("");
  const [phone_2_status, setphone_2_status] = useState("");
  const [phone_3_status, setphone_3_status] = useState("");
  const [phone_4_status, setphone_4_status] = useState("");
  const [phone_status, setphone_status] = useState("");
  const [email, setemail] = useState("");
  const [email_2, setemail_2] = useState("");
  const [address, setaddress] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [mailing_street, setmailing_street] = useState("");
  const [mailing_city, setmailing_city] = useState("");
  const [mailing_state, setmailing_state] = useState("");
  const [mailing_zip, setmailing_zip] = useState("");
  const [Error, setError] = useState(null);
  const [data, setData] = useState(null);
  // const [realestate, setrealestateData] = useState([]);
  const handleadd = () => {
    const formdata = new FormData();
    {
      id && formdata.append("id", id);
    }
    formdata.append("property_address", property_address);
    formdata.append("property_city", property_city);
    formdata.append("property_state", property_state);
    formdata.append("property_zip", property_zip);
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("phone_2", phone_2);
    formdata.append("phone_3", phone_3);
    formdata.append("phone_4", phone_4);
    formdata.append("phone_4", phone_4);
    formdata.append("phone_2_status", phone_2_status);
    formdata.append("phone_3_status", phone_3_status);
    formdata.append("phone_4_status", phone_4_status);
    formdata.append("phone_status", phone_status);
    formdata.append("email", email);
    formdata.append("email_2", email_2);
    formdata.append("address", address);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("mailing_street", mailing_street);
    formdata.append("mailing_city", mailing_city);
    formdata.append("mailing_state", mailing_state);
    formdata.append("mailing_zip", mailing_zip);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/leads`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setError("");
        console.log(response?.data, "Leads");
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
        setError(error?.response?.data?.errors);
        console.log(error, "errorsda");
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

  const handleget = () => {
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/single/lead/${id}`,
      // data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data?.data, "response real");
        set_property_address(response?.data?.data?.property_address || "");
        setproperty_city(response?.data?.data?.property_city || "");
        setproperty_state(response?.data?.data?.property_state || "");
        setproperty_zip(response?.data?.data?.property_zip || "");
        setname(response?.data?.data?.name || "");
        setphone(response?.data?.data?.phone || "");
        setphone_2(response?.data?.data?.phone_2 || "");
        setphone_3(response?.data?.data?.phone_3 || "");
        setphone_4(response?.data?.data?.phone_4 || "");
        setphone_2_status(response?.data?.data?.phone_2_status || "");
        setphone_3_status(response?.data?.data?.phone_3_status || "");
        setphone_4_status(response?.data?.data?.phone_4_status || "");
        setphone_status(response?.data?.data?.phone_status || "");
        setemail(response?.data?.data?.email || "");
        setemail_2(response?.data?.data?.email_2 || "");
        setaddress(response?.data?.data?.address || "");
        setfirst_name(response?.data?.data?.first_name || "");
        setlast_name(response?.data?.data?.last_name || "");
        setmailing_street(response?.data?.data?.mailing_street || "");
        setmailing_city(response?.data?.data?.mailing_city || "");
        setmailing_state(response?.data?.data?.mailing_state || "");
        setmailing_zip(response?.data?.data?.mailing_zip || "");
        setData(response?.data?.data || "");
        if (response === true) {
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
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    handleget();
  }, []);

  const handlechange = (setState) => (e) => {
    setState(e.target.value);
  };

  return (
    <div className="container">
      <h1>Add Leads</h1>
      <div className="row ps-3">
        <div className="col-lg-8 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your  name"
            defaultValue={data?.name}
            onChange={handlechange(setname)}
            required
          />

          {Error?.name && Error?.name?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.name[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-4 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your property_city"
              defaultValue={data?.property_city}
              onChange={handlechange(setproperty_city)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-city"></i>
            </span>
          </div>
          {Error?.property_city && Error?.property_city?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.property_city[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-3 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your property_state"
            defaultValue={data?.property_state}
            onChange={handlechange(setproperty_state)}
            required
          />
          {Error?.property_state && Error?.property_state?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.property_state[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-3 p-0 pt-3">
          <input
            type="number"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your property_zip"
            defaultValue={data?.property_zip}
            onChange={handlechange(setproperty_zip)}
            required
          />
          {Error?.property_zip && Error?.property_zip?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.property_zip[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your property_address"
              defaultValue={data?.property_address}
              onChange={handlechange(set_property_address)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-address-card"></i>
            </span>
          </div>
          {Error?.property_address && Error?.property_address?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.property_address[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your phone"
              defaultValue={data?.phone}
              onChange={handlechange(setphone)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-phone"></i>
            </span>
          </div>
          {Error?.phone && Error?.phone?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your phone_2"
              defaultValue={data?.phone_2}
              onChange={handlechange(setphone_2)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-phone"></i>
            </span>
          </div>
          {Error?.phone_2 && Error?.phone_2?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_2[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your phone_3"
              defaultValue={data?.phone_3}
              onChange={handlechange(setphone_3)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-phone"></i>
            </span>
          </div>
          {Error?.phone_3 && Error?.phone_3?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_3[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="number"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your phone_4"
              defaultValue={data?.phone_4}
              onChange={handlechange(setphone_4)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-phone"></i>
            </span>
          </div>
          {Error?.phone_4 && Error?.phone_4?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_4[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-8 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your phone_2_status"
            defaultValue={data?.phone_2_status}
            onChange={handlechange(setphone_2_status)}
            required
          />
          {Error?.phone_2_status && Error?.phone_2_status?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_2_status[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-4 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your phone_3_status"
            defaultValue={data?.phone_3_status}
            onChange={handlechange(setphone_3_status)}
            required
          />
          {Error?.phone_3_status && Error?.phone_3_status?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_3_status[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-8 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your phone_4_status"
            defaultValue={data?.phone_4_status}
            onChange={handlechange(setphone_4_status)}
            required
          />
          {Error?.phone_4_status && Error?.phone_4_status?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_4_status[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-4 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your phone_status"
            defaultValue={data?.phone_status}
            onChange={handlechange(setphone_status)}
            required
          />
          {Error?.phone_status && Error?.phone_status?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.phone_status[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your email"
              defaultValue={data?.email}
              onChange={handlechange(setemail)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-solid fa-envelope"></i>
            </span>
          </div>
          {Error?.email && Error?.email?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.email[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="email"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your email_2"
              defaultValue={data?.email_2}
              onChange={handlechange(setemail_2)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-solid fa-envelope"></i>
            </span>
          </div>
          {Error?.email_2 && Error?.email_2?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.email_2[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-12 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your address"
              defaultValue={data?.address}
              onChange={handlechange(setaddress)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-address-card"></i>
            </span>
          </div>
          {Error?.address && Error?.address?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.address[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your first_name"
              defaultValue={data?.first_name}
              onChange={handlechange(setfirst_name)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-file-signature"></i>
            </span>
          </div>
          {Error?.first_name && Error?.first_name?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.first_name[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-6 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your last_name"
              defaultValue={data?.last_name}
              onChange={handlechange(setlast_name)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-file-signature"></i>
            </span>
          </div>
          {Error?.last_name && Error?.last_name?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.last_name[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-8 p-0 pt-3">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control rounded-0 shadow-sm"
              id="floatingInput"
              placeholder="enter your mailing_street"
              defaultValue={data?.mailing_street}
              onChange={handlechange(setmailing_street)}
              required
            />
            <span
              class="input-group-text rounded-0 bg-icone"
              style={{ backgroundColor: "#1362fc", color: "white" }}
              id="basic-addon1"
            >
              <i class="fa fa-archway"></i>
            </span>
          </div>
          {Error?.mailing_street && Error?.mailing_street?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.mailing_street[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-4 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your  mailing_city"
            defaultValue={data?.mailing_city}
            onChange={handlechange(setmailing_city)}
            required
          />
          {Error?.mailing_city && Error?.mailing_city?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.mailing_city[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-8 p-0 pt-3">
          <input
            type="number"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your mailing_zip"
            defaultValue={data?.mailing_zip}
            onChange={handlechange(setmailing_zip)}
            required
          />
          {Error?.mailing_zip && Error?.mailing_zip?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.mailing_zip[0]}
            </span>
          ) : null}
        </div>
        <div className="col-lg-4 p-0 pt-3">
          <input
            type="text"
            class="form-control rounded-0 shadow-sm"
            id="floatingInput"
            placeholder="enter your mailing_state"
            defaultValue={data?.mailing_state}
            onChange={handlechange(setmailing_state)}
            required
          />
          {Error?.mailing_state && Error?.mailing_state?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error?.mailing_state[0]}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-3 ps-0">
        <button
          style={{ fontSize: "15px", fontWeight: "600", borderRadius: "6px" }}
          className="btn btn-primary  mt-2"
          onClick={handleadd}
        >
          Submit &nbsp;
          <AiOutlineArrowRight
            style={{ fontSize: "15px", fontWeight: "600" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Addleads;
