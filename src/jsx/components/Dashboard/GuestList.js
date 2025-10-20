import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Tab, Nav, Button, Modal } from "react-bootstrap";

///Import
import PendingBlog from "./Guest/PendingBlog";
import BookedBlog from "./Guest/BookedBlog";
import CanceledBlog from "./Guest/CanceledBlog";
import RefundBlog from "./Guest/RefundBlog";

//Images
import pic1 from "./../../../images/avatar/1.jpg";
import pic2 from "./../../../images/avatar/2.jpg";
import pic3 from "./../../../images/avatar/3.jpg";
import pic4 from "./../../../images/avatar/4.jpg";
import pic5 from "./../../../images/avatar/5.jpg";
import pic6 from "./../../../images/avatar/6.jpg";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../Baseurl";
import { useSelector } from "react-redux";
import Imgbaseurl from "../../../Imgbaseurl";

const GuestList = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#example2_wrapper tbody tr")
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#example2_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const chackbox = document.querySelectorAll(".sorting_1 input");
  const motherChackBox = document.querySelector(".sorting_asc input");
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const [getcompany, setGetCompany] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.auth.idToken);
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  const GetCompanies = () => {
    setLoader(true);
    var config = {
      method: "get",
      url:
        Details?.role_id === 1
          ? `${Baseurl.baseurl}get/all/companies`
          : Details?.role_id === 2
          ? `${Baseurl.baseurl}get/all/company/admins`
          : Details?.role_id === 3
          ? `${Baseurl.baseurl}get/all/company/brokers`
          : Details?.role_id === 4
          ? `${Baseurl.baseurl}get/all/teams`
          : Details?.role_id === 5
          ? `${Baseurl.baseurl}get/all/agent/mlo`
          : null,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data, "Getting Compaines");
        setGetCompany(response?.data?.data);
        if (response?.data?.status === true) {
          setLoader(false);
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

  useEffect(() => {
    GetCompanies();
  }, []);
  const DelCompanies = (id) => {
    const DelData = new FormData();
    DelData.append("id", id);
    setLoader(true);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}del/user/role`,
      data: DelData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting Compaines");
        if (response?.data?.status === true) {
          setLoader(false);
          GetCompanies();
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rowget, setRowget] = useState("");
  const [type, setType] = useState("");
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <Tab.Container defaultActiveKey="All">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex mb-4 justify-content-between align-items-center flex-wrap">
              <div className="card-tabs mt-3 mt-sm-0 mb-xxl-0 mb-4">
                <Nav as="ul" className="nav nav-tabs">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link
                      className="nav-link text-capitalize"
                      eventKey="All"
                    >
                      All {type} {"(" + getcompany.length + ")"}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="table-search">
                <div className="input-group search-area mb-xxl-0 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                  />
                  <span className="input-group-text">
                    <Link to={"#"}>
                      <i className="flaticon-381-search-2"></i>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="table-responsive">
                  <div
                    id="example2_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="example2"
                      className="table card-table default-table display mb-4 dataTablesCard dataTable no-footer"
                    >
                      <thead>
                        <tr role="row">
                          <th className="sorting_1">Id</th>
                          <th className="sorting_asc">Logo</th>
                          <th className="sorting">Email</th>
                          <th className="sorting">Company Name</th>
                          <th className="sorting">Type</th>
                          <th className="sorting bg-none"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {getcompany
                          ? getcompany?.map((e) => {
                              setTimeout(() => {
                                setType(e?.user?.type);
                              }, [1000]);
                              return (
                                <>
                                  <tr role="row" className="odd">
                                    <td className="sorting_1">
                                      <h5>{e?.id}</h5>
                                    </td>
                                    <td>
                                      <div className="media-bx">
                                        <img
                                          className="me-3 rounded"
                                          src={
                                            Imgbaseurl.imgbaseurl +
                                            e?.company_details?.file
                                          }
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <h5>{e?.user?.email}</h5>
                                      </div>
                                    </td>
                                    <td>
                                      <div>
                                        <h5 className="text-capitalize">
                                          {e?.label}
                                        </h5>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="text-capitalize">
                                        {e?.user?.type}
                                      </div>
                                    </td>
                                    <td>
                                      <Dropdown className="dropdown">
                                        <Dropdown.Toggle
                                          as="div"
                                          className="btn-link i-false"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                              stroke="#262626"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                                              stroke="#262626"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                            <path
                                              d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                                              stroke="#262626"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu">
                                          <Dropdown.Item
                                            className="dropdown-item"
                                            onClick={() => {
                                              handleShow(e.id);
                                              setRowget(e);
                                            }}
                                          >
                                            View
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            className="dropdown-item"
                                            onClick={() => {
                                              DelCompanies(e?.user?.id);
                                            }}
                                          >
                                            Delete
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          : null}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
                      </div>
                      {/* <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/guest-list"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/guest-list"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>

                        <Link
                          className="paginate_button next"
                          to="/guest-list"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Pending">
                <PendingBlog />
              </Tab.Pane>
              <Tab.Pane eventKey="Booked">
                <BookedBlog />
              </Tab.Pane>
              <Tab.Pane eventKey="Canceled">
                <CanceledBlog />
              </Tab.Pane>
              <Tab.Pane eventKey="Refund">
                <RefundBlog />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="example-modal-sizes-title-lg">
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <>
                <div className="col-md-6 my-2">
                  <label>Company Name:</label>
                  <input
                    className="form-control"
                    value={rowget?.label}
                    readOnly
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Company Phone:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={rowget?.company_details?.phone}
                    readOnly
                  />
                </div>
                <div className="col-md-12 my-2">
                  <label>Company Address:</label>
                  <input
                    className="form-control"
                    value={rowget?.company_details?.address}
                    readOnly
                    autoCapitalize
                    autoFocus
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Company Fax no:</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={rowget?.company_details?.fax}
                    readOnly
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Company Admin:</label>
                  <input
                    className="form-control"
                    value={rowget?.company_details?.admins}
                    readOnly
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Company Brokers:</label>
                  <input
                    className="form-control"
                    value={rowget?.company_details?.brokers}
                    readOnly
                  />
                </div>
                <div className="col-md-6 my-2">
                  <label>Company Logo:</label>
                  <img
                    src={Imgbaseurl.imgbaseurl + rowget?.company_details?.file}
                    className="w-100 rounded"
                  />
                </div>
              </>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button
            variant="primary"
            onClick={(e) => {
              handleClose();
            }}
          >
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default GuestList;
