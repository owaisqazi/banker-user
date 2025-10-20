/* eslint-disable jsx-a11y/anchor-is-valid */
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
// import { FaClipboard, FaLink, FaPaste, FaPlus } from "react-icons/fa";
// import { Button, Modal } from "react-bootstrap";
import Baseurl from "../../../Baseurl";
// import Imgbaseurl from "../../../Imgbaseurl";
import Select from 'react-select'
import { Button, Modal } from "react-bootstrap";
import Model1 from "./Model1";
import Model2 from "./Model2";
import { BiMessage } from "react-icons/bi";
import { HiExclamationCircle } from "react-icons/hi";
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
  const options1 = [
    { value: 'jarry', label: 'jarry' },
    { value: 'jeck', label: 'jeck' },
    { value: 'salman', label: 'salman' },
    { value: 'arsalan', label: 'arsalan' }
  ]
  const options2 = [
    { value: 'jarry', label: 'jarry' },
    { value: 'jeck', label: 'jeck' },
    { value: 'salman', label: 'salman' },
    { value: 'arsalan', label: 'arsalan' }
  ]
  const options3 = [
    { value: 'jarry', label: 'jarry' },
    { value: 'jeck', label: 'jeck' },
    { value: 'salman', label: 'salman' },
    { value: 'arsalan', label: 'arsalan' }
  ]
  const options4 = [
    { value: 'jarry', label: 'jarry' },
    { value: 'jeck', label: 'jeck' },
    { value: 'salman', label: 'salman' },
    { value: 'arsalan', label: 'arsalan' }
  ]

  return (
    <>
      <div className="row">
        {/* <div className="col-md-4 col-lg-2 p-1"> */}
          {/* <input
            className="ml-2 input-search form-control w-50 "
            value={filter || ""}
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          /> */}
          {/* <!-- Example single danger button --> */}
          {/* <div class="btn-group shadow">
            <button type="button" class="btn btn-dark dropdown-toggle usa-1 " data-bs-toggle="dropdown" aria-expanded="false">
              Action
            </button>
            <ul class="dropdown-menu rounded-0">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div> */}
        {/* </div> */}
        
        <div className="col-md-4 col-lg-4 p-1">
          {/* <Select options={options1} placeholder="lender-name" /> */}
          <input
            className="input-search form-control w-100 my-0"
            value={filter || ""}
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="col-md-4 col-lg-8 p-1 text-end">
          <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
            <label class="btn btn-primary text-white usa-2 shadow p-2" for="btncheck1"><Link to={'/program_finder'} className="text-white">resert filter more</Link></label>
          </div>
        </div>
        {/* <div className="col-md-4 col-lg-2 p-1">
          <Select options={options2} placeholder="product-offired" />
        </div>
        <div className="col-md-4 col-lg-2 p-1">
          <Select options={options3} placeholder="program" />
        </div>
        <div className="col-md-4 col-lg-2 p-1">
          <Select options={options4} placeholder="licensed-state" />
        </div> */}
      </div>
    </>
  );
};

export const Lender = () => {
  //   Filter: ColumnFilter,
  // const [rowdata, setRowget] = useState("");
  // const [type, setType] = useState("");
  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail);
  const [modalShow, setModalShow] = useState(false);
  const [secondModal, setSecondModal] = useState(false)
  const [Datass, SetDatass] = useState([])
  const [Error, setError] = useState({})
  const [Approveddata, setApproveddata] = useState({})
  const [id, setId] = useState('')


  const COLUMNS = [
    {
      Header: "Id",
      Footer: "Id",
      accessor: "id",
    },
    {
      Header: "Lender Name",
      Footer: "Name",
      accessor: "lender_name",
      Cell: ({ value, row }) => {
        console.log(value);
        console.log(row.original, "row.original");
        const rawData = row.original
        const token = useSelector((state) => state.auth.auth.idToken);
        const [modalShow, setModalShow] = useState(false);

        const DelCompanies = () => { };
        return (
          <>
            <Link to={`/Lender_Profile/${rawData.id}`}>
              <p>{value}</p>
            </Link>

          </>
        );
      },
    },
    {
      Header: "Lender Contact",
      Footer: "Info",
      accessor: "id",
      id: "Lender Contact",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <Link to={"/Lender_contact/" + value}>
              <button type="button" className="btn btn-dark rounded-0 usa-3 mt-0">contact</button>
            </Link>
          </>
        );
      },
    },
    ...(userDetail.type === "company admin"
      ? [
        {
          Header: "Approved",
          Footer: "Info",
          accessor: "is_approved",
          Cell: ({ row }) => {
            const handlestatus = (id, active) => {
              console.log(id, active, "handlestatus")
              const formdata = new FormData()
              formdata?.append("is_approved", active)
              formdata?.append("id", id)
              var config = {
                method: "post",
                url: `${Baseurl?.baseurl}update/lender/status`,
                data: formdata,
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${Token}`,
                },
              };
              axios(config)
                .then(function (response) {
                  console.log(response, "domain2")
                  // SetDatass(response?.data?.data)
                  // SetId(response?.data?.data?.id)
                  handlegetallelender()
                  setLoader(true);
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
                  setLoader(false);
                  setError('')
                })
                .catch((error => {
                  setError(error?.response?.data?.errors)
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
                }))
              setLoader(false);
            }

            return (
              <>
                <p>
                  {row?.original?.is_approved === 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-success rounded-0 usa-3 "
                      onClick={() => handlestatus(row?.original?.id, 0)}
                    >
                      active
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-0 usa-3 "
                      onClick={() => handlestatus(row?.original?.id, 1)}
                    >
                      deactive
                    </button>
                  )}
                </p>
              </>
            );
          },
        },
      ]
      : []),
    ...(userDetail.type === "company broker"
      ? [
        {
          Header: "Approved/Not Approved",
          Footer: "Info",
          accessor: "is_approved",
          Cell: ({ value }) => {
            console.log(value);
            return value !== 1 ? (
              <div
                className="curser"

              >
                <i className="fa fa-circle text-danger me-1 "></i>
                Not_approved
              </div>
            ) : (
              <div className="curser" >
                <i className="fa fa-circle text-success me-1  "></i>
                Approved
              </div>
            );
          },
        },
      ]
      : []),
    // {
    //   Header: "Not-Approved",
    //   Footer: "Info",
    //   accessor: "Not-Approved",
    // },
    {
      Header: "QuotaAble",
      Footer: "Info",
      accessor: "is_quotable",
      Cell: ({ value, row }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
           <p>
                  {row?.original?.is_approved === 1 ? (
                    <p>
                      is_quotable
                      </p>
                  ) : (
                    <p >
                      not_quotable
                    </p>
                  )}
                </p>
          </>
        );
      },
    },
    {
      Header: "TBD Underwriting",
      Footer: "Info",
      accessor: "tbd_underwriting",
    },
    {
      Header: "Lock & Shop",
      Footer: "Info",
      accessor: "lock_shop",
    },
    {
      Header: "Lock Cut-off",
      Footer: "Info",
      accessor: "lock_cut_off",
    },
    {
      Header: "Lender Type",
      Footer: "Info",
      accessor: "lender_type",
    },
    {
      Header: "Compensation",
      Footer: "Info",
      accessor: "Compensation",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <Link to={"/Lender/Compensation"}>
              <button type="button" className="btn shadow usa-2 usa-2-text">Compensation</button>
            </Link>
          </>
        );
      },
    },
    {
      Header: "Lender Tier/EPO",
      Footer: "Info",
      accessor: "Lender Tier/EPO",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <div className="input-group">
              <select class="form-select" aria-label="Trang Nguyen">
                <option>select..</option>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="there">Three</option>
              </select>
            </div>
          </>
        );
      },
    },
    {
      Header: "Note",
      Footer: "Info",
      accessor: "Note",
      // action: "id",
      Cell: ({ value }) => {
        console.log(value);
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <BiMessage />
          </>
        );
      },
      Filter: ColumnFilter,
    },
    {
      Header: "Alies/Website",
      Footer: "Info",
      Cell: (rowdata,) => {
        console.log(rowdata, "rowdata");
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <p>{rowdata?.row?.original?.lender_name}</p>
            <Link className="text-primary">{rowdata?.row?.original?.alias}</Link>
          </>
        );
      },
      Filter: ColumnFilter,
    },
    {
      Header: "Action felied",
      Footer: "Action",


      // action: "id",
      Cell: ({ value, row }) => {
        const rawData = row.original.id
        console.log(rawData, "value10");
        const token = useSelector((state) => state.auth.auth.idToken);
        const DelCompanies = () => { };
        return (
          <>
            <div class="btn-group">
              <button type="button" class="btn btn-dark dropdown-toggle rounded-0" data-bs-toggle="dropdown" aria-expanded="false">
                Action
              </button>
              <ul class="dropdown-menu rounded-0 p-3">
                <Link to="" >
                  <li onClick={() => handlemodel(row.original.id)} className="pt-2">Document</li>
                </Link>
                <Link to="">
                  <li onClick={() => secondModel(row.original.id)} className="pt-2">Audit log</li></Link>
              </ul>
            </div>
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
      data: Datass,
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



  const handlemodel = (id) => {
    setModalShow(true)
    setId(id)
    console.log('click')

  }
  const secondModel = (id) => {
    setSecondModal(true)
    setId(id)
    console.log(id, "`id23`")
  }


  // owais


  // const Token = useSelector((state) => state.auth.auth.idToken)


  const handleget = () => {
    const formdata = new FormData()
    formdata?.append("user_id", userDetail.id)
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/my/lenders`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "domain2")
        SetDatass(response?.data?.data)
        // setId(response?.data?.data?.id)
        console.log(response?.data?.data, "response?.data?.data?.lender_id")
        setError('')
      })
      .catch((error => {
        setError(error?.response?.data?.data?.errors)
      }))

  }
  useEffect(() => { handleget() }, [])

  const Token = useSelector((state) => state.auth.auth.idToken)
  const handlegetallelender = () => {
    const formdata = new FormData()
    formdata?.append("user_id", userDetail.id)
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/all/lenders`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "domain222")
        SetDatass(response?.data?.data)
        // handlegetWholsole()
        // SetId(response?.data?.data?.id)
        setError('')
      })
      .catch((error => {
        setError(error?.response?.data?.data?.errors)
      }))

  }

  useEffect(() => { handlegetallelender() }, [])

  const handlegetCoresponded = () => {
    const formdata = new FormData()
    formdata?.append("user_id", userDetail.id)
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/my/correspondent/lenders`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "domain222")
        setApproveddata(response?.data?.data)
        // handlegetCoresponding()
        setError('')
      })
      .catch((error => {
        setError(error?.response?.data?.data?.errors)
      }))

  }




  // get is_approved
  const handlegetWholsole = () => {
    const formdata = new FormData()
    formdata?.append("user_id", userDetail.id)
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/lenders/by/filter/wholesale`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "do")
        setApproveddata(response?.data?.data)
        setError('')
      })
      .catch((error => {
        setError(error?.response?.data?.data?.errors)
      }))

  }


  useEffect(() => { handlegetWholsole() }, [])

  // const handlegetCoresponding = () => {
  //   const formdata = new FormData()
  //   formdata?.append("user_id", userDetail.id)
  //   var config = {
  //     method: "get",
  //     url: `${Baseurl.baseurl}get/lenders/by/filter/correspondent`,
  //     data: formdata,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${Token}`,
  //     },
  //   };
  //   axios(config)
  //     .then(function (response) {
  //       console.log(response, "domain222")
  //       setApproveddata(response?.data?.data)
  //       setError('')
  //     })
  //     .catch((error => {
  //       setError(error?.response?.data?.data?.errors)
  //     }))

  //   }
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        <div className="card-header">
          {userDetail.type === "company broker" ?
            <div className="d-flex">
              <Link to={"/lender"}>
                <div className="btn btn-outline-primary active rounded-0" onClick={handlegetWholsole}>
                  Lender-WholeSale
                </div>
              </Link>
              <Link to={"/Lender_Corresponding"}>
                <div className="btn btn-outline-primary rounded-0" >
                  Lender-Corresponding</div>
              </Link>

            </div>
            : ''}
          {userDetail.type === "company broker" ?
            <div>
              <div className="col-lg-12 pt-2">
                <HiExclamationCircle />To include lender in Pricing Engine, please check Quotable column
              </div>
              <div className="col-lg-12 pt-2">
                <HiExclamationCircle />Many states do not require the broker/LO to have a license when processing DSCR loan. Please click here to see more detail about states and there is no state that requires a license from broker/LO when processing Private loan.
              </div>
              <div className="row">
                <div className="col-lg-2">Total- <span className="text-primary">{Approveddata?.total_unquotable}</span></div>
                {
                  console.log(Approveddata?.total_unquotable, 'Approveddata?.total_unquotable')
                }
                {/* <div className="col-lg-2">Total- <span className="text-primary">93</span></div>
              <div className="col-lg-2">Total- <span className="text-primary">93</span></div> */}
                <div className="col-lg-2">Approved- <span className="text-primary">{Approveddata?.approved}</span></div>
                <div className="col-lg-2">Not-Approved- <span className="text-primary">{Approveddata?.un_approved}</span></div>
              </div>
            </div>
            : ''}
          <div className="col-lg-12 pt-2">
            {userDetail.type === "company broker" ? (
              <div className="text-end">
                <Link to={"/Addlender"}>
                  <div className="btn btn-outline-primary rounded-0">
                    Add Lender
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className="card-body">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="table-responsive">
            <table {...getTableProps()} className="table  display cursor-pointer">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup?.headers.map((column) => (
                      <th {...column?.getHeaderProps()}>
                        {column.render("Header")}
                        {/* {column.canFilter ? column.render("Filter") : null} */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="cursor-pointer hover-light text-center">
                {page?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row?.getRowProps()}>
                      {row?.cells?.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {" "}
                            {cell?.render("Cell")}{" "}
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

        <Model2 show={secondModal} onHide={() => setSecondModal(false)} id={id} />
        <Model1 show={modalShow} onHide={() => setModalShow(false)} id={id} />
      </div>
    </>
  );
};
export default Lender;