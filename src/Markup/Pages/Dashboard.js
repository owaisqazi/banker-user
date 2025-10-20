/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Header from "../Layout/Header";
import Table from "react-bootstrap/Table";
import ProfileInfo from "./mortage_type/Profile/ProfileInfo";
import { FaArrowRight, FaEye, FaFileInvoice } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../Baseurl";
// import TanSideBar from "./mortage_type/heloc/Tanent/TanSideBar";
import SignaturePad from "react-signature-canvas";
import { useHistory } from "react-router-dom";
import SidebarDash from "./mortage_type/heloc/Tanent/SidebarDash";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { Fab } from "@mui/material";
import { LuClipboardSignature } from "react-icons/lu";

function Dashboard() {
  const history = useHistory();
  const [modalShow, setModalShow] = React.useState(false);
  const Assign_id = localStorage.getItem("borreower_id");
  const [loader, setLoader] = useState(false);
  const [fieldsError, setFieldsError] = useState();
  const [error, seterror] = React.useState(false);
  const [dataFromREsponse, setDataFromResponse] = useState({});
  const [borrID, setborrID] = useState("");
  const [showdata, setshowdata] = React.useState("");
  const [borrower_signature_date, setborrower_signature_date] =
    React.useState("");

  const { mortgage_purchase, mortgage_refinance, real_estate_rent__tenant } =
    dataFromREsponse;
  const [Document_id, setDocument_id] = useState([]);
  const handleCheckbox = (id) => {
    if (id !== null && id !== undefined) {
      const isIdInArray = Document_id.includes(id);

      if (isIdInArray) {
        // If id is in the array, remove it
        setDocument_id(Document_id.filter((documentId) => documentId !== id));
      } else {
        // If id is not in the array, add it
        setDocument_id([...Document_id, id]);
      }
    } else {
      // If id is null or undefined, log a message or handle it as needed
      console.log("Invalid id:", id);
    }
  };

  if (Document_id !== undefined && Document_id !== null) {
    localStorage.setItem("Document_id", JSON.stringify(Document_id));
    console.log(Document_id, "Document_id");
  } else {
    console.log(
      "Document_id is undefined or null, not setting in localStorage"
    );
  }
  let token = localStorage.getItem("usertoken");
  const getData = () => {
    setLoader(true);
    // formdata.append('application_id',)
    var config = {
      method: "Get",
      url: `${Baseurl.baseurl}all/completed/applications`,
      data: Data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response?.dat");
        if (response?.data?.status === true) {
          Get_Profile();
          setLoader(false);
          console.log(response?.data?.message, "response?.data?.message");
          setDataFromResponse(response?.data?.data);
          // Swal.fire({
          //   toast: true,
          //   icon: "success",
          //   title: response?.data?.message,
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
        // Swal.fire({
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

  const Get_Profile = () => {
    setLoader(true);
    // console.log(bund2?.map((e)=>e),"bund2")
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/borrower/profile/data`,
      // data: BorrowerData2,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data?.data, "resprofile");
        localStorage.setItem("image_path", response?.data?.data?.image_path);
        localStorage.setItem("image", response?.data?.data?.image);
        if (response?.data?.status === true) {
          setLoader(false);
          // Swal.fire({
          //   toast: true,
          //   icon: "success",
          //   title: response?.data?.message,
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
        // setBund(error?.response?.data?.errors);
        console.log(error, "error");

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
    Get_Profile();
    getData();
  }, []);
  const Data = new FormData();
  Data.append("Application_id", Assign_id);

  console.log(mortgage_purchase, "data");
  console.log(mortgage_refinance, "datamortgage_refinance");
  console.log(Assign_id, "data===>");

  // SignaturePad
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPads = useRef(null);

  const clear = () => {
    sigPads.current.clear();
  };

  const save = () => {
    if (sigPads.current) {
      const dataURL = sigPads.current.getTrimmedCanvas().toDataURL("image/png");
      setTrimmedDataURL(dataURL);
    }
  };
  const handleSubmit = async () => {
    setLoader(true);
    const datasubmit = new FormData();
    Document_id.map((id, index) =>
      datasubmit.append(`document_id[${index}]`, id)
    );
    datasubmit.append(
      "borrower_signature",
      trimmedDataURL ? trimmedDataURL : showdata || ""
    );
    datasubmit.append("borrower_signature_date", borrower_signature_date || "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/acknowledgement/signature`,
      data: datasubmit,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios(config)
      .then((res) => {
        setLoader(false);
        setModalShow(false);
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
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "adderr");
        seterror(error?.response?.data?.errors);
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

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <Header />
      <hr />
      <div
        className="container-fluid ps-4"
        style={{ position: "fixed", zIndex: "-9999" }}
      >
        <div className="row">
          <SidebarDash />
          <div className="col-md-8 new-mr1">
            <div className="row">
              <div className="col-md-8">
                <a href="/selectType" className="btn btn-primary px-4">  
                  New <FaArrowRight />
                </a>
              </div>
              <div className="col-md-4 text-end">
                <Fab
                  variant="extended"
                  className="m-3"
                  style={{ float: "right" }}
                  onClick={() => setModalShow(true)}
                >
                  <LuClipboardSignature
                    sx={{ mr: 1 }}
                    style={{ fontSize: "30px" }}
                  />
                  Signature
                </Fab>
              </div>
            </div>
            <div className="row" style={{ overflow: "auto", width: "100%" }}>
              <Table striped bordered hover className="m-2">
                <thead>
                  <tr>
                    <th className="text-center" style={{ minWidth: "100px" }}>
                      #
                    </th>
                    <th className="text-center" style={{ minWidth: "100px" }}>
                      Type
                    </th>
                    <th className="text-center" style={{ minWidth: "200px" }}>
                      Date
                    </th>
                    <th className="text-center" style={{ minWidth: "100px" }}>
                      Action
                    </th>
                    <th className="text-center" style={{ minWidth: "200px" }}>
                      Document Signed
                    </th>
                    <th className="text-center" style={{ minWidth: "300px" }}>
                      Document Uploaded By Broker
                    </th>
                    <th className="text-center" style={{ minWidth: "200px" }}>
                      Application Reviewed
                    </th>
                    <th className="text-center" style={{ minWidth: "200px" }}>
                      Signature
                    </th>
                    <th className="text-center" style={{ minWidth: "200px" }}>
                      Documents
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* for map */}
                  {/* purchase */}
                  {mortgage_purchase
                    ? mortgage_purchase?.map((e, i) => {
                        const date = new Date(e?.created_at.toString());
                        const options = {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        };
                        const formattedDate = date.toLocaleString(
                          "en-US",
                          options
                        );
                        return (
                          <>
                            <tr>
                              <td className="text-center">{e?.id}</td>
                              <td className="text-center">Purchase</td>
                              <td className="text-center">{formattedDate}</td>
                              <td>
                                <p
                                  className="text-center"
                                  style={{ cursor: "pointer"}}
                                  onClick={() =>
                                    history.push(
                                      `/reviewapplication/review/${e.id}/mpa`
                                    )
                                  }
                                >
                                  View <FaEye />
                                </p>
                              </td>
                              <td className="text-center">
                                {e?.documentation?.borrower_signature === null
                                  ? "No"
                                  : "yes"}
                              </td>
                              <td>
                                <div className="text-center">
                                  {e?.documentation?.broker_doc_id
                                    ? "Yes"
                                    : "No"}
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  {e?.documentation?.broker_doc_id
                                    ? "Yes"
                                    : "No"}
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Form.Check
                                    inline
                                    label="Add Signature"
                                    onClick={() =>
                                      handleCheckbox(
                                        e?.documentation?.broker_doc_id
                                      )
                                    }
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Link to={`/Borrower/Documents/${e?.id}`}>
                                    <button className="btn btn-primary shadow btn-xs sharp">
                                      <FaFileInvoice />
                                    </button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : null}
                  {/* refinance */}
                  {/* for map */}
                  {mortgage_refinance
                    ? mortgage_refinance?.map((e, i) => {
                        const date = new Date(e?.created_at.toString());
                        const options = {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        };
                        const formattedDate = date.toLocaleString(
                          "en-US",
                          options
                        );
                        return (
                          <>
                            <tr>
                              <td className="text-center">{e?.id}</td>
                              <td className="text-center">Refinance</td>
                              <td className="text-center">{formattedDate}</td>
                              <td>
                                <p
                                  className="text-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    history.push(
                                      `/reviewapplication/review/${e.id}/mra`
                                    )
                                  }
                                >
                                  View <FaEye />
                                </p>
                              </td>
                              <td className="text-center">
                                {e?.documentation?.borrower_signature === null
                                  ? "No"
                                  : "yes"}
                              </td>
                              <td>
                                <div className="text-center">
                                  {e?.documentation?.broker_doc_id === null
                                    ? "No"
                                    : "Yes"}
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  {e?.documentation?.broker_doc_id === null
                                    ? "No"
                                    : "Yes"}
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Form.Check
                                    inline
                                    label="Add Signature"
                                    onClick={() =>
                                      handleCheckbox(
                                        e?.documentation?.broker_doc_id
                                      )
                                    }
                                    type="checkbox"
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <Link to={`/Borrower/Documents/${e?.id}`}>
                                    <button className="btn btn-primary shadow btn-xs sharp">
                                      <FaFileInvoice />
                                    </button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : null}
                  {real_estate_rent__tenant
                    ? real_estate_rent__tenant?.map((e, i) => {
                        const date = new Date(e?.created_at.toString());
                        const options = {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        };
                        const formattedDate = date.toLocaleString(
                          "en-US",
                          options
                        );
                        return (
                          <>
                            <tr>
                              <td className="text-center">{e?.id}</td>
                              <td className="text-center">Tenant</td>
                              <td className="text-center">{formattedDate}</td>
                              <td>
                                <p
                                  className="text-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    history.push(
                                      `/reviewapplication/review/${e.id}/new`
                                    )
                                  }
                                >
                                  View <FaEye />
                                </p>
                              </td>
                              <td className="text-center">
                                {e?.documentation?.borrower_signature === null
                                  ? "No"
                                  : "yes"}
                              </td>
                              <td>
                                <td>
                                  <div className="text-center">
                                    {e?.documentation?.broker_doc_id === null
                                      ? "No"
                                      : "Yes"}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-center">
                                    {e?.documentation?.broker_doc_id === null
                                      ? "No"
                                      : "Yes"}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-center">
                                    <Form.Check
                                      inline
                                      label="Add Signature"
                                      onClick={() =>
                                        handleCheckbox(
                                          e?.documentation?.broker_doc_id
                                        )
                                      }
                                      type="checkbox"
                                    />
                                  </div>
                                </td>
                                <div className="text-center">
                                  <Link to={`/Borrower/Documents/${e?.id}`}>
                                    <button className="btn btn-primary shadow btn-xs sharp">
                                      <FaFileInvoice />
                                    </button>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </div>
          </div>
          {/* <div className="col-md-2"></div> */}
          <ProfileInfo />
        </div>
      </div>
      {/* Signature modal  */}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            clear();
            setModalShow(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Borrower Signature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5
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
              onChange={(e) => setborrower_signature_date(e.target.value)}
              defaultValue={borrower_signature_date}
              placeholder="Borrower Signature"
            />
          </div>
          {error?.borrower_signature_date &&
          error?.borrower_signature_date?.length >= 0 ? (
            <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
              {error?.borrower_signature_date[0]}
              <br />
              {error?.borrower_signature_date[1]}
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
              {error?.borrower_signature &&
              error?.borrower_signature?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {error?.borrower_signature[0]}
                </span>
              ) : null}
            </div>

            <div className="col-lg-12 my-5">
              {trimmedDataURL ? (
                <img
                  className="sigImage"
                  src={trimmedDataURL}
                  alt="Signature"
                />
              ) : null}
            </div>
          </div>
          <div className="col-lg-12 mb-3">
            <div className="btn-group" role="group" aria-label="Basic example">
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
                src={null ? null : `data:image/png;base64,${showdata}`}
                alt=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>submit</Button>
        </Modal.Footer>
      </Modal>
      {/* Signature modal  */}
    </>
  );
}

export default Dashboard;
 