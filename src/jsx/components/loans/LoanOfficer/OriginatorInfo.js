/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import ButtonGlobal from "./GlobalComponent/Button";
import Swal from "sweetalert2";

const OriginatorInfo = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const history = useNavigate()
  const [showdata, setshowdata] = useState([]);
  const [showdataid, setshowdataid] = useState([]);
  const [Error, setError] = useState([]);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    address: "",
    organizationNmlsrId: "",
    stateLicenseId: "",
    stateLicenseIdorg: "",
    loanOriginatorName: "",
    loanOriginatorNmlsrId: "",
    email: "",
    phone: "",
    signature: "",
    date: "",
  });
  const Token = useSelector((state) => state.auth.auth.idToken);
  const { id } = useParams();
  console.log(id, "id");
  useEffect(() => {
    fatchdata();
  }, []);
  const fatchdata = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/loan/originator/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios(config)
      .then((res) => {
        if (res?.data?.status === true) {
          setLoader(false);
          setshowdata(res?.data?.data);
          setshowdataid(res?.data?.data?.id);
          setFormData({
            organizationName:
              res?.data?.data?.originator_organization_name || "",
            address: res?.data?.data?.address || "",
            organizationNmlsrId: res?.data?.data?.organisation_nmlsr_id || "",
            stateLicenseId: res?.data?.data?.originator_license_id || "",
            stateLicenseIdorg: res?.data?.data?.license_id || "",
            loanOriginatorName: res?.data?.data?.originator_name || "",
            loanOriginatorNmlsrId: res?.data?.data?.originator_nmlsr_id || "",
            email: res?.data?.data?.email || "",
            phone: res?.data?.data?.phone || "",
            signature: res?.data?.data?.signature || "",
            date: res?.data?.data?.date || "",
          });
        }
        console.log(res, "Originator");
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "errrererer");
        setError(error?.response?.data?.errors);
      });
  };

  // Handle input field changes and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log(formData, "dasdasdasdas");
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    formdata.append("originator_organization_name", formData.organizationName);
    formdata.append("address", formData.address);
    formdata.append("organisation_nmlsr_id", formData.organizationNmlsrId);
    formdata.append("license_id", formData.stateLicenseIdorg);
    formdata.append("originator_name", formData.loanOriginatorName);
    formdata.append("originator_nmlsr_id", formData.loanOriginatorNmlsrId);
    formdata.append("originator_license_id", formData.stateLicenseId);
    formdata.append("phone", formData.phone);
    formdata.append("signature", formData.signature);
    formdata.append("date", formData.date);
    formdata.append("email", formData.email);
    if (showdataid != null) {
      formdata.append("id", showdataid);
    }
    // formdata.append("email", formData.email);

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/loan/originator/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios(config)
      .then((res) => {
        if (res?.data?.status === true) {
          history(`/Documents/${id}`)
          // handleget()
          setError("");
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
          fatchdata();
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.errors);
        console.log(error, "error==>");
        setLoader(false);
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.message,
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

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="row">
        <h2 className="mt-1 mb-5">Loan Originator Information</h2>
        <div className="form-group col-md-12">
          <div className="row ps-1 pe-0">
            <div className="col-lg-12 my-2 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="text"
                name="organizationName"
                placeholder="Loan Originator Organization Name"
                defaultValue={showdata?.originator_organization_name}
                onChange={handleInputChange}
              />
              {Error?.originator_organization_name &&
              Error?.originator_organization_name?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.originator_organization_name[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-12 my-2 pt-2">
              <h5
                className="font266 my-3"
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                Address{" "}
              </h5>
              <input
                className="form-control rounded-0 shadow-sm"
                type="text"
                name="address"
                defaultValue={showdata?.address}
                placeholder="Address"
                onChange={handleInputChange}
              />
              {Error?.address && Error?.address?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.address[0]}
                </span>
              ) : null}
            </div>
          </div>
          <div className="row my-2 ps-3 pe-3">
            <div className="col-lg-8 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                defaultValue={showdata?.organisation_nmlsr_id}
                name="organizationNmlsrId"
                placeholder="Loan Originator Organization NMLSR ID#"
                onChange={handleInputChange}
              />
              {Error?.organisation_nmlsr_id &&
              Error?.organisation_nmlsr_id?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.organisation_nmlsr_id[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-4 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                defaultValue={showdata?.license_id}
                name="stateLicenseIdorg"
                placeholder="State License ID# "
                onChange={handleInputChange}
              />
              {Error?.license_id && Error?.license_id?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.license_id[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-12 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="name"
                defaultValue={showdata?.originator_name}
                name="loanOriginatorName"
                placeholder="Loan Originator Name "
                onChange={handleInputChange}
              />
              {Error?.originator_name && Error?.originator_name?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.originator_name[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-8 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                defaultValue={showdata?.originator_nmlsr_id}
                name="loanOriginatorNmlsrId"
                placeholder="Loan Originator NMLSR ID#"
                onChange={handleInputChange}
              />
              {Error?.originator_nmlsr_id &&
              Error?.originator_nmlsr_id?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.originator_nmlsr_id[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-4 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                defaultValue={showdata?.originator_license_id}
                name="stateLicenseId"
                placeholder="State License ID# "
                onChange={handleInputChange}
              />
              {Error?.originator_license_id &&
              Error?.originator_license_id?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.originator_license_id[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-8 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="text"
                defaultValue={showdata?.email}
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
              {Error?.email && Error?.email?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.email[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-4 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="number"
                defaultValue={showdata?.phone}
                placeholder="Phone"
                name="phone"
                onChange={handleInputChange}
              />
              {Error?.phone && Error?.phone?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.phone[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-8 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="text"
                defaultValue={showdata?.signature}
                name="signature"
                placeholder="Signature"
                onChange={handleInputChange}
              />
              {Error?.signature && Error?.signature?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.signature[0]}
                </span>
              ) : null}
            </div>
            <div className="col-lg-4 p-0 pt-2">
              <input
                className="form-control rounded-0 shadow-sm"
                type="date"
                Value={showdata?.date}
                name="date"
                onChange={handleInputChange}
              />
              {Error?.date && Error?.date?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error?.date[0]}
                </span>
              ) : null}
            </div>
            <div className=" ps-0">
             <ButtonGlobal handleSubmit={handleSubmit} btntext={"Submit"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OriginatorInfo;
