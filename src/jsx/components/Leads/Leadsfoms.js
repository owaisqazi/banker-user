/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

//import './table.css';
import "../loans/filtering.css";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../Baseurl";
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
          <Link to='/AddLeads'
            className="btn btn-primary btn-md rounded-0"
            style={{ float: "right" }}
            // onClick={handleShow}
          >
            <FaPlus size={18} /> Add Leads
          </Link>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="example-modal-sizes-title-lg" className="d-block">
          <Modal.Title></Modal.Title>
          <div className="row">
            <div className="col-md-6">
              <h4 className="mt-3">Add Loan</h4>
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

export const Prospects = () => {
  // GetLeads
  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleget = () => {
    const formdata = new FormData();
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/leads`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
          // setId(response.data.data.id)
        console.log(response, "responseget/leads");
        setData(response?.data?.data);
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
    handleget();
  }, []);

  //   Filter: ColumnFilter,

  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
    },
    {
      Header: "first name",
      Footer: "first_name",
      Cell: ({ value, row }) => {
        console.log(value);
        console.log(row.original, "row.originalleads");
        const rawData = row.original
        const token = useSelector((state) => state.auth.auth.idToken);
        const [modalShow, setModalShow] = useState(false);

        const DelCompanies = () => { };
        return (
          <>
            <Link to={`/AddLeads/${rawData.id}`}>
              <p className="pt-3">{rawData?.first_name}</p>
            </Link>

          </>
        );
      },
    },
    {
      Header: "last name",
      Footer: "last_name",
      accessor: "last_name",

    },
    {
      Header: "phone",
      Footer: "phone",
      accessor: "phone",
    },
    {
      Header: "phone 2",
      Footer: "phone_2",
      accessor: `phone_2`,
    },
    {
      Header: "phone 2 status",
      Footer: "phone_2_status",
      accessor: "phone_2_status",
    },
    {
      Header: "phone 3",
      Footer: "phone_3",
      accessor: "phone_3",
    },
    {
      Header: "phone 3 status",
      Footer: "phone_3_status",
      accessor: "phone_3_status",

    },
    {
      Header: "phone 4",
      Footer: "phone_4",
      accessor: "phone_4",

    },
    
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
    },
    {
      Header: "phone 4 status",
      Footer: "phone_4_status",
      accessor: "phone_4_status",

    },
    {
      Header: "property address",
      Footer: "property_address",
      accessor: "property_address",

    },
    {
      Header: "property city",
      Footer: "property_city",
      accessor: "property_city",

    },
    {
      Header: "property state",
      Footer: "property_state",
      accessor: "property_state",

    },
    {
      Header: "property zip",
      Footer: "property_zip",
      accessor: "property_zip",

    },
    {
      Header: "address",
      Footer: "address",
      accessor: "address",

    },
    {
      Header: "email",
      Footer: "email",
      accessor: "email",

    },
    {
      Header: "email 2",
      Footer: "email_2",
      accessor: "email_2",

    },
    {
      Header: "mailing city",
      Footer: "mailing_city",
      accessor: "mailing_city",

    },
    {
      Header: "mailing state",
      Footer: "mailing_state",
      accessor: "mailing_state",

    },
    {
      Header: "mailing street",
      Footer: "mailing_street",
      accessor: "mailing_street",

    },
    {
      Header: "mailing zip",
      Footer: "mailing_zip",
      accessor: "mailing_zip",

    },
    {
      Header: "Action",
      Footer: "Action",
      // action: "id",
      Cell: ({ row }) => {
        console.log(row.original, "row.originalleads");
        const rawData = row?.original
        const Token = useSelector((state) => state.auth.auth.idToken);
        const handledel = (id) => {
          setLoader(true)
          const formdata = new FormData();
          formdata?.append('id',id)
          var config = {
            method: "post",
            url: `${Baseurl.baseurl}del/lead`,
            data: formdata,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Token}`,
            },
          };
          axios(config)
            .then(function (response) {
              console.log(response?.data?.data, "response real");
              // setData(response?.data?.data);
              handleget()
              setLoader(false)
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
        const DelCompanies = () => {};
        return (
          <>
            <div className="d-flex">
              <button
                to="#"
                className="btn btn-danger shadow btn-xs sharp"
                onClick={() => handledel(rawData?.id)}
              >
               {loader ? <div className="loader"></div> : null}
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </>
        );
      },
      Filter: ColumnFilter,
    },
  ]; //   const data = useMemo(() => MOCK_DATA, []);
  const [columns, setColums] = useState(COLUMNS);
  const [data, setData] = useState([
  ]);
  console.log(data,'-----------------------api data')

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
  const loansdata = [
    { title: "Active", no: 4 },
    { title: "Purchase", no: 4 },
    { title: "Refinance", no: 4 },
    { title: "InCompelete Pre-approval", no: 4 },
    { title: "Approved Pre-approval", no: 4 },
    { title: "New", no: 4 },
    { title: "Incomplete", no: 4 },
    { title: "Inprogress", no: 4 },
    { title: "Active Past-due flags ", no: 4 },
    { title: "Inactive Past-due flags ", no: 4 },
  ];
  const path = window.location.pathname;
  const newpath = path?.split("/");
  console.log(newpath, "path");
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{newpath[1]}</h4>
        </div>
        {newpath[1] === "Prospects" ? (
          <div className="px-4 mt-3">
            {loansdata.map((e, i) => (
              <h5 className="btn btn-outline-primary mx-2 ">
                {e?.title} - {e.no + i + 1}
              </h5>
            ))}
          </div>
        ) : null}
        <div className="card-body">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="table-responsive">
            <table {...getTableProps()} className="table  display">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup?.getHeaderGroupProps()}>
                    {headerGroup?.headers?.map((column) => (
                      <th {...column?.getHeaderProps()}>
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
export default Prospects;
