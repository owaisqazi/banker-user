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
import Userimg from "../../../../Userimg";
import { Dropdown } from "react-bootstrap";
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

export const User = () => {
  const COLUMNS = [
    {
      Header: "User Id",
      Footer: "User Id",
      accessor: "user.id",
      Filter: ColumnFilter,
    },
    {
      Header: "Name",
      Footer: "Company Name",
      accessor: "label",
      Filter: ColumnFilter,
    },
    {
      Header: "Email",
      Footer: "Email",
      accessor: "user.email",
      Filter: ColumnFilter,
    },
    {
      Header: "phone",
      Footer: "phone",
      accessor: "company_details.phone",
      Filter: ColumnFilter,
    },
    {
      Header: "address",
      Footer: "address",
      accessor: "company_details.address",
      Filter: ColumnFilter,
    },
    {
      Header: "status",
      Footer: "status",
      Cell: ({ row }) => {
        const token = useSelector((state) => state.auth.auth.idToken);
        const LoggedUser = localStorage.getItem("nodeIds");
        const handlestatus = (userId, active) => {
          console.log(userId, "userId====>");
          const userIdStatus = Number(LoggedUser) === 1 ? userId : Number(LoggedUser);
          console.log(userIdStatus, "userIdStatus====>");
          setLoader(true);
          const formdata = new FormData();
          formdata.append("id", userId);
          formdata.append(
            "status",
            active === "inactive" ? "active" : "inactive"
          );
          var config = {
            method: "post",
            url: `${Baseurl?.baseurl}change/user/status`,
            data: formdata,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          axios(config)
            .then(function (response) {
              console.log(response, "domain2");
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
            })
            .catch((error) => {
              console.log(error,'error===>')
              setLoader(false);
              Swal.fire({
                showCloseButton: true,
                toast: true,
                icon: "error",
                title: error?.response?.data?.errors.errors[0]?error?.response?.data?.errors.errors[0]:error?.response?.data?.message,
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

          setLoader(false);
        };
        return (
          <>
            {loader ? <div className="loader"></div> : null}
            {row.original.user?.status === "active" && row.original.user?.last_login_at != null && Number(LoggedUser) === row.original?.user.id ?
            <Dropdown
             as="li"
             className="nav-item dropdown notification_dropdown p-2"
           >
             <Dropdown.Toggle
               className={`nav-link i-false c-pointer ai-icon btn text-white ${
                 row.original.last_login_at === null
                   ? "bg-danger text-white"
                   : "bg-success text-white"
               } shadow`}
               onClick={() => {
                 const userId = row.original?.user.id;
                 const active = row?.original?.user?.status;
                 handlestatus(userId, active);
               }}
               variant=""
               as="a"
             >
               {" "}
               {row.original.user?.last_login_at === null
                 ? row?.original?.user?.status
                 : "Online"}
               {row?.original?.user?.last_login_at === null ? (
                 ""
               ) : (
                 <div className="pulse-css" id="pulse-css1"></div>
               )}
             </Dropdown.Toggle>
           </Dropdown>:
           <div className="d-flex">
             <button
               className={`btn shadow ${row?.original?.user?.status==="inactive"?"bg-light text-white":"bg-danger text-white"}`}
               onClick={() => {
                 const userId = row.original?.user.id;
                 const active = row?.original?.user?.status;
                 handlestatus(userId, active);
               }}
             >
               {row?.original?.user?.status}
             </button>
           </div>
            }
          </>
        );
      },
      Filter: ColumnFilter,
    },
    {
      Header: "Logo",
      Footer: "Logo",
      accessor: "user",
      Cell: ({ value }) => {
        return (
          <img
            src={Userimg.Profilebaseurl + value?.image}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "contain",
            }}
          />
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
      url: `${Baseurl.baseurl}get/all/user/roles`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data, "Getting roles");
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
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Users</h4>
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
export default User;
