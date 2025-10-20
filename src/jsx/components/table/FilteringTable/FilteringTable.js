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
import "./filtering.css";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import Imgbaseurl from "../../../../Imgbaseurl";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import DashboardDark from "../../Dashboard/DashboardDark";
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <input
        className="form-control input-search"
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
  return (
    <div>
      Search :{" "}
      <input
        className="ml-2 input-search form-control"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: "20%" }}
      />
    </div>
  );
};

export const FilteringTable = () => {
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
      Footer: "user.email",
      accessor: "user.email",
      Filter: ColumnFilter,
    },
    {
      Header: "Company Name",
      Footer: "Company Name",
      accessor: "label",

      Filter: ColumnFilter,
    },
    {
      Header: "Type",
      Footer: "Type",
      accessor: "user.type",
      Filter: ColumnFilter,
    },
    {
      Header: "Logo",
      Footer: "Logo",
      accessor: "company_details",
      Cell: ({ value }) => {
        return (
          <img
            src={Imgbaseurl.imgbaseurl + value?.file}
            style={{ width: 50, borderRadius: "50%" }}
          />
        );
      },
      Filter: ColumnFilter,
    },

    {
      Header: "View",
      Footer: "View",
      id: "view",
      accessor: "company_details",
      Cell: ({ value }) => {
        console.log(value, "company_details");
        const [rowdata, setRowData] = useState("");
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
          <>
            <div className="d-flex">
              <Link
                to={"#"}
                className="btn btn-primary shadow btn-xs sharp me-1"
                onClick={() => {
                  handleShow();
                  setRowData(value);
                }}
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header id="example-modal-sizes-title-lg">
                <Modal.Title>View</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <>
                      <div className="col-md-6 my-2">
                        <label>Company Name:</label>
                        <input
                          className="form-control"
                          value={rowdata?.label}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Company Phone:</label>
                        <input
                          type="number"
                          className="form-control"
                          value={rowdata?.phone}
                          readOnly
                        />
                      </div>
                      <div className="col-md-12 my-2">
                        <label>Company Address:</label>
                        <input
                          className="form-control"
                          value={rowdata?.address}
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
                          value={rowdata?.fax}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Company Admin:</label>
                        <input
                          className="form-control"
                          value={rowdata?.admins}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Company Brokers:</label>
                        <input
                          className="form-control"
                          value={rowdata?.brokers}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 my-2">
                        <label>Company Logo:</label>
                        <img
                          src={Imgbaseurl.imgbaseurl + rowdata?.file}
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
              </Modal.Footer>
            </Modal>
          </>
        );
      },
      Filter: ColumnFilter,
    },
    {
      Header: "Delete",
      Footer: "Delete",
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
                window.location.reload();
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
  ];
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
    GetCompanies();
  }, []);

  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <DashboardDark />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{Details?.type}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
export default FilteringTable;
