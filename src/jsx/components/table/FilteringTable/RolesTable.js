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
import "./roles.css";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Userimg from "../../../../Userimg";
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

export const RolesTable = () => {
  const COLUMNS = [
    {
      Header: "Id",
      Footer: "id",
      accessor: "id",

      Filter: ColumnFilter,
    },
    {
      Header: "user id",
      Footer: "user_id",
      accessor: "user_id",
      Filter: ColumnFilter,
    },
    {
      Header: "file name",
      Footer: "filename",
      accessor: "filename",
      Filter: ColumnFilter,
    },
    {
      Header: "File",
      Footer: "file",
      Cell: ({ row }) => {
        const Documentsfiles = row.original;
        console.log(row.original, "row=====>");
        // const token = useSelector((state) => state.auth.auth.idToken);
        // const DelCompanies = () => {};
        return (
          <>
            <div className="d-flex">
              <Link
                to={
                  Baseurl.DocumentUrl +
                  `${Documentsfiles.image_path}/${Documentsfiles.file}`
                }
                target="_black"
              >
                <p
                  style={{
                    paddingTop: "10px",
                  }}
                >
                  {Baseurl.DocumentUrl +
                    `${Documentsfiles.image_path}/${Documentsfiles.file}`}
                </p>
              </Link>
            </div>
          </>
        );
      },
      Filter: ColumnFilter,
    },
    // {
    //   Header: "Logo",
    //   Footer: "Logo",
    //   accessor: "user",
    //   Cell: ({ value }) => {
    //     return (
    //       <img
    //         src={Userimg.Profilebaseurl + value?.image}
    //         style={{ width: 50,height:50, borderRadius: "50%" , objectFit:"contain"}}
    //       />
    //     );
    //   },
    //   Filter: ColumnFilter,
    // },
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
      url: `${Baseurl.baseurl}get/allowed/documents`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data, "get/allowed/documents");
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
        {/* Existing code... */}
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="cards-list12">
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <div className={`card12`} key={index}>
                    <div className="card_image12">
                      <iframe
                        title={`Card ${index + 1}`}
                        src={
                          Baseurl.DocumentUrl +
                          `${row.original.image_path}/${row.original.file}`
                        }
                      ></iframe>
                    </div>
                    <div className="card_title12 title-black12">
                      <p>{row.original.filename}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-between">
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
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
                {/* Existing pagination buttons... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RolesTable;
