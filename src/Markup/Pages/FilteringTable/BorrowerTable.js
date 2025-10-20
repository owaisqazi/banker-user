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
// import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
// import Imgbaseurl from "../../../../Imgbaseurl";
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
                // onClick={Linkgen}
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
            <Tab eventKey="longer-tab" title="Refer a Loan Officer">
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 my-2">
                      <label>Borrower First Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Last Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Email:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Phone:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
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
                      {/* {fielderr?.link
                        ? fielderr?.link.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
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
                      {/* {fielderr?.link
                        ? fielderr?.link.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Name:</label>

                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Owais Aslam</label>
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Email:</label>

                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>ovsjhone@gmail.com</label>
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>Your Phone:</label>

                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-6 my-2">
                      <label>(714)444 9999</label>
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="secondary" >
                  Submit
                </Button>
              </Modal.Footer>
            </Tab>
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
                      {/* {fielderr?.link
                        ? fielderr?.link.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower's First Name:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setfirstname(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Email:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
                    </div>
                    <div className="col-md-12 my-2">
                      <label>Borrower Phone:</label>
                      <input
                        className="form-control"
                        type="email"
                        // onChange={(e) => setPhone(e.target.value)}
                      />
                      {/* {fielderr?.borrower_email
                        ? fielderr?.borrower_email.map((e) => (
                          <p className="text-danger">{e}</p>
                        ))
                        : null} */}
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
                <Button variant="secondary">
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

  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
      Filter: ColumnFilter,
      //disableFilters: true,
    },

    {
      Header: "Email Id",
      Footer: "Email Id",
      accessor: "borrower.email",
      Filter: ColumnFilter,
    },
    {
      Header: "First Name",
      Footer: "First Name",
      accessor: "borrower.first_name",

      Filter: ColumnFilter,
    },
    {
      Header: "Last Name",
      Footer: "Last Name",
      accessor: "borrower.last_name",
      Filter: ColumnFilter,
    },
    {
      Header: "phone",
      Footer: "phone",
      accessor: "borrower.phone",
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

  return (
    <>
      {/* {loader ? <div className="loader"></div> : null} */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Borrower</h4>
        </div>
        <div className="card-body">
          <GlobalFilter filter={GlobalFilter} setFilter={setGlobalFilter} />
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
                  {/* {pageIndex + 1} of {pageOptions.length} */}
                </strong>
                {""}
              </span>
              <span className="table-index">
                Go to page :{" "}
                <input
                  type="number"
                  className="ml-2"
                  // defaultValue={pageIndex + 1}
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
