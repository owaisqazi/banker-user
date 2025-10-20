/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

//import './table.css';
import "./filtering.css";

import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { FaLink, FaPaste, FaPlus } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div className="d-flex">
      <input
        className="form-control input-search "
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of  Birth",
        Footer: "Date of  Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      },
    ],
  },
];
export const GlobalFilter = ({ filter, setFilter }) => {
  const token = useSelector((state) => state.auth.auth.idToken);
  const [paste, setPaste] = useState("");
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");

  const Linkgen = () => {
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}broker/generate/link`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting Compaines");
        if (response?.data?.status === true) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setPaste(response?.data?.data?.link);
          setKey(response?.data?.data?.key);
          navigator.clipboard
            .writeText(response?.data?.data?.link)
            .then(() => {
              Swal.fire({
                showCloseButton: true,
                toast: true,
                icon: "success",
                title: "Link copied successfully!",
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
                icon: "success",
                title: `Failed to copy link:` + error,
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
              console.error("Failed to copy link: ", error);
            });
        } else {
        }
      })
      .catch(function (error) {
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
  const [firstname, setfirstname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [fielderr, setFielderr] = useState();
  
  const SendLink = () => {
    const Link = new FormData();
    Link.append("link", url);
    Link.append("borrower_email", email);
    Link.append("name", firstname);
    Link.append("phone", phone);
    Link.append("key", key);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}broker/send/invitation/link`,
      data: Link,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "Getting Compaines");
        if (response?.data?.status === true) {
          handleClose();
          setUrl("");
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "Success",
            title: "Link Sent SuccessFully",
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
        } else {
        }
      })
      .catch(function (error) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setFielderr(error?.response?.data?.errors);
        console.log(error?.response?.data?.errors);
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




  return (
    <>
      <div className="row">
        <div className="col-md-6 ">
          <input
            className="ml-2 input-search form-control w-50 "
            value={filter || ""}
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-primary btn-md "
            style={{ float: "right" }}
            onClick={handleShow}
          >
            <FaPlus size={18} /> Add Borrower
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="example-modal-sizes-title-lg" className="d-block">
          <Modal.Title></Modal.Title>
          <div className="row">
            <div className="col-md-6">
              <h4 className="mt-3">Add Borrower</h4>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-primary btn-md "
                style={{ float: "right" }}
                onClick={Linkgen}
              >
                <FaLink size={18} />
                &nbsp; Generate Link
              </button>
            </div>
          </div>
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3 d-inline-flex"
            fill
          >
            {/* <Tab eventKey="home" title="Home">
        <Sonnet />
      </Tab> */}
            {/* <Tab eventKey="longer-tab" title="Refer a Loan Officer">
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 my-2">
                      <label>Borrower First Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Last Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Email:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Phone:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <label>Doen the Loans Officer Have a License:</label>
                    <div className="col-md-6 my-2">
                      <div class="input-group mb-3">
                        <button
                          class="btn  btn-primary w-100"
                          type="button"
                          onClick={() => setUrl(paste)}
                        >
                          Yes
                        </button>
                      </div>
                      {fielderr?.link
                        ? fielderr?.link.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <div class="input-group mb-3">
                        <button
                          class="btn  btn-danger w-100"
                          type="button"
                          onClick={() => setUrl(paste)}
                        >
                          No
                        </button>
                      </div>
                      {fielderr?.link
                        ? fielderr?.link.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Name:</label>

                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Owais Aslam</label>
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Email:</label>

                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>ovsjhone@gmail.com</label>
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Phone:</label>

                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>(714)444 9999</label>
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="secondary" onClick={SendLink}>
                  Submit
                </Button>
              </Modal.Footer>
            </Tab> */}
            <Tab eventKey="profile" title="Refer a Borrower">
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 my-2">
                      <label>Link:</label>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" value={url} />
                        <button
                          class="btn  btn-success"
                          type="button"
                          onClick={() => setUrl(paste)}
                        >
                          <FaPaste />
                        </button>
                      </div>
                      
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower's First Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setfirstname(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Email:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Phone:</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null}
                    </div>
                    {/* <div className="col-md-6 my-2">
                <label>Your Name:</label>
                
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <label>Owais Aslam</label>
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <label>Your Email:</label>
                
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <label>ovsjhone@gmail.com</label>
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <label>Your Phone:</label>
                
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <label>(714)444 9999</label>
                {fielderr?.borrower_email
                  ? fielderr?.borrower_email.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 my-2">
                <div class="input-group mb-3">
                  <button
                    class="btn btn-primary w-100"
                    type="button"
                    onClick={() => setUrl(paste)}
                  >
                    Sand Email
                  </button>
                </div>
                {fielderr?.link
                  ? fielderr?.link.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-6 col-sm-8 my-2">
                <div class="input-group mb-3">
                  <button
                    class="btn  btn-primary w-100"
                    type="button"
                    onClick={() => setUrl(paste)}
                  >
                     Sand Text Massage
                  </button>
                </div>
                {fielderr?.link
                  ? fielderr?.link.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div>
              <div className="col-md-8 col-sm-12 my-2">
                <div class="input-group mb-3">
                  <button
                    class="btn  btn-primary w-100"
                    type="button"
                    onClick={() => setUrl(paste)}
                  >
                   Sand and Create Load
                  </button>
                </div>
                {fielderr?.link
                  ? fielderr?.link.map((e) => (
                      <p className="text-danger">{e}</p>
                    ))
                  : null}
              </div> */}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="secondary" onClick={SendLink}>
                  Submit
                </Button>
              </Modal.Footer>
            </Tab>

            {/* <Tab eventKey="contact" title="Contact" disabled>
        <Sonnet />
      </Tab> */}
          </Tabs>

        </Modal.Header>

      </Modal>
    </>
  );
};

export const BorrowerTable = () => {
  const [Application_id, setApplication_id] = useState("");

  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "borrower.id",
      Filter: ColumnFilter,
      //disableFilters: true,
    },
    {
      Header: "First Name",
      Footer: "Name",
      accessor: "borrower.first_name",
      Cell: ({ value, row }) => {
        const rawData = row.original
        setApplication_id(rawData.borrower.id)
        console.log(rawData,'rawData===>')
        const DelCompanies = () => { };
        return (
          <>
              <p style={{
                paddingTop:'10px',
              }}>{value}</p>
            </>
        );
      },
    },
    {
      Header: "Last Name",
      Footer: "Last Name",
      accessor: "borrower.last_name",
      Filter: ColumnFilter,
    },
    {
      Header: "Email Id",
      Footer: "Email Id",
      accessor: "borrower.email",
      Filter: ColumnFilter,
    },
    {
      Header: "phone",
      Footer: "phone",
      accessor: "borrower.phone",
      Filter: ColumnFilter,
    },
    {
      Header: "Delete",
      Footer: "Delete",
      // action: "id",
      accessor: "user_id",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = (delid) => {
          const DelData = new FormData();
          DelData.append("id", delid);
          setLoader(true);
          var config = {
            method: "post",
            url: `${Baseurl.baseurl}broker/del/borrower/record`,
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
                GetBorrower();
                // window.location.reload();
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
        return (
          <>
            <div className="d-flex">
              <button
                to="#"
                className="btn btn-danger shadow btn-xs sharp"
                onClick={() => DelCompanies(value)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </>
        );
      },
      Filter: ColumnFilter,
    },

    {
      Header: "Edit",
      Footer: "Edit",

      Cell: ({ row }) => {
        row = row.original.borrower
        const [first_name, SetFirst_name] = useState("");
        const [last_name, SetLast_name] = useState("");
        const [phone, SetPhone] = useState("");
        const [email, SetEmail] = useState("");
        console.log(row, "roes");
        console.log(row.email, "roesemail");
        const token = useSelector((state) => state.auth.auth.idToken);
        let IDuser = localStorage.getItem('userDetail');
        IDuser = JSON.parse(IDuser)
        console.log(IDuser, ">========")
        const EditCompanies = () => {
          const EditData = new FormData();
          EditData.append("id", IDuser?.id);
          EditData.append("first_name", first_name);
          EditData.append("last_name", last_name);
          EditData.append("phone", phone);
          EditData.append("email", email);

          setLoader(true);
          var config = {
            method: "post",
            url: `${Baseurl.baseurl}update/borrower/by/broker/profile/data`,
            data: EditData,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          axios(config)
            .then(function (response) {

              if (response?.data?.status === true) {
                console.log(response, "Getting<===");
                SetFirst_name(row?.original?.first_name)
                SetLast_name(row?.original?.last_name)
                SetPhone(row?.original?.phone)
                SetEmail(row?.original?.email)
                setLoader(false);
                GetBorrower();
                // window.location.reload();
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
        const [handleshow, sethandleShow] = useState(false);

        const modalsClose = () => sethandleShow(false);
        const handle1Show = () => sethandleShow(true);
        return (
          <>
            <div className="d-flex">
              <button
                to="#"
                className="btn btn-primary shadow btn-xs sharp"
                // onClick={() => handle1Show(row.original.user_id)}
                onClick={handle1Show}
              >
                <i class="fa fa-pen"></i>
              </button>
            </div>
            <Modal show={handleshow} onHide={modalsClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter your email"
                      defaultValue={row?.email}
                      onChange={(e) => SetEmail(e.target.value)}
                      autoFocus
                    />
                    <Form.Label>first name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="enter your first name"
                      defaultValue={row?.first_name}
                      onChange={(e) => SetFirst_name(e.target.value)}
                      autoFocus
                    />
                    <Form.Label>last name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="enter your last name"
                      defaultValue={row?.last_name}
                      onChange={(e) => SetLast_name(e.target.value)}
                      autoFocus
                    />
                    <Form.Label>phone</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="enter your phone"
                      defaultValue={row?.phone}
                      onChange={(e) => SetPhone(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={EditCompanies}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      },
      Filter: ColumnFilter,
    },


  ]; //   const data = useMemo(() => MOCK_DATA, []);


  const [columns, setColums] = useState(COLUMNS);
  const [data, setData] = useState([]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.auth.idToken);
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  const GetBorrower = () => {
    setLoader(true);
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}broker/get/borrowers/list`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data, "Getting Compaines");
        setData(response?.data?.data);
        localStorage.setItem("Application_id",Application_id)
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
    GetBorrower();
  }, []);

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Borrower</h4>
        </div>
        <div className="card-body">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="table-responsive">
            <table {...getTableProps()} className="table  display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        {/* {column.canFilter ? column.render("Filter") : null} */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {" "}
                            {cell.render("Cell")}{" "}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className="text-center">
              <div className="filter-pagination  mt-3">
                <button
                  className=" previous-button"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {"<<"}
                </button>

                <button
                  className="previous-button"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  className=" next-button"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BorrowerTable;
