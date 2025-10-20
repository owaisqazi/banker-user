/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { FaClipboard, FaLink, FaPaste, FaPlus } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Baseurl from "../../../Baseurl";
import Imgbaseurl from "../../../Imgbaseurl";
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

export const GlobalFilter = ({ filter, setFilter }) => {
  const token = useSelector((state) => state.auth.auth.idToken);
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
            className="btn btn-primary btn-md shadow"
            style={{ float: "right" }}
            onClick={handleShow}
          >
            <FaPlus size={18} /> Add Hotlead
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="example-modal-sizes-title-lg" className="d-block">
          <Modal.Title></Modal.Title>
          <div className="row">
            <div className="col-md-6">
              <h4 className="mt-3">Add Hotlead</h4>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 my-2">
                <label>Frist Name:</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-md-6 my-2">
                <label>Last Name:</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div className="col-md-6 my-2">
                <label>Email:</label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-md-6 my-2">
                <label>Phone Number:</label>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const HotLead = () => {
  //   Filter: ColumnFilter,

  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
    },
    {
      Header: "Full Name",
      Footer: "Name",
    },
    {
      Header: "Linked transction",
      Footer: "Info",
    },
    {
      Header: "Source",
      Footer: "Info",
    },
    {
      Header: "Status",
      Footer: "Info",
    },
    {
      Header: "Note",
      Footer: "Info",
    },

    {
      Header: "Action",
      Footer: "Action",
      // action: "id",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => {};
        return (
          <>
            <div className="d-flex">
              <button
                to="#"
                className="btn btn-danger shadow btn-xs sharp"
                // onClick={() => DelCompanies(value)}
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
      Header: "Loan Officer assistant",
      Footer: "Info",
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
  const [getcompany, setGetCompany] = useState([]);
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

  const [rowdata, setRowget] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Hot Leads</h4>
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
export default HotLead;
