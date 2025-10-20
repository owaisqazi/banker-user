/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";

//import './table.css';
import "../table/FilteringTable/filtering.css";
import { useSelector } from "react-redux";
import { FaGoogleDrive } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import Dropzone from "react-dropzone-uploader";
import swal from "sweetalert";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../Baseurl";
import { Link, useNavigate } from "react-router-dom";
import { IoDocumentLockSharp } from "react-icons/io5";
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

export const GlobalFilter = ({ filter, setFilter, handleget }) => {
  const dropzoneRef = useRef(null);
  const borrowerId = localStorage.getItem("nodeIds");
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  //   const handleChangeStatus = ({ meta, file }, status) => { console.log(file ,'mypdf=>') }
  // const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
  const token = useSelector((state) => state.auth.auth.idToken);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState(false);

  const handleChange = () => {
    setLoader(true);
    let allImages = [
      ...dropzoneRef.current.files.map((e) => ({ ...e, type: "Passport" })),
    ];
    console.log(allImages, "217_17041050576592946165c18.png");
    console.log(allImages, "217_17041050576592946165c18.png");
    const formdata = new FormData();
    allImages?.map((e, i) => {
      formdata.append(`file[${i}]`, e?.file);
    });
    formdata.append("user_id", borrowerId);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/library/documents`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        handleClose(false);
        handleget();
        setLoader(false);
        console.log(response, "response12");
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
        handleClose(false);
        setLoader(false);
        console.log(error, "eres");
        swal("Oops", error?.response?.data?.errors?.files[0], "error", {
          button: "Try Again!",
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
        });
      });
  };

  return (
    <>
      {loader ? <div className="loader"></div> : null}
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
            <FaGoogleDrive size={18} /> Add
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header id="example-modal-sizes-title-lg" className="d-block">
          <Modal.Title></Modal.Title>
          <div className="row">
            <div className="col-md-6">
              <h4 className="mt-3">Add Files</h4>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12 my-2">
                <Dropzone
                  ref={dropzoneRef}
                  getUploadParams={getUploadParams}

                  //   onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleChange}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Index = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.auth.auth.idToken);
  const handleget = () => {
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/library/documents`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setData(response?.data?.data);
        console.log(response, "getresponse12get");
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
        console.log(error);
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
      Header: "File name",
      Footer: "filename",
      accessor: "filename",
    },
    {
      Header: "Permission",
      Footer: "file",
      Cell: ({ row }) => {
        const [DataRole, setDataRole] = useState([]);
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [selectedRoleId, setSelectedRoleId] = useState(null);
        const handleSelectChange = (event) => {
          const selectedId = event.target.value;
          setSelectedRoleId(selectedId);
        };
        const Documentsfiles = row.original;
        console.log(Documentsfiles, "Documentsfiles");
        const token = useSelector((state) => state.auth.auth.idToken);
        const handleSubmit = () => {
          setLoader(true);
          const formdata = new FormData();
          formdata.append("user_id", Documentsfiles.user_id);
          formdata.append("document_id", Documentsfiles.id);
          formdata.append("role_id", selectedRoleId);
          var config = {
            method: "post",
            url: `${Baseurl.baseurl}assign/library/permission`,
            data: formdata,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          axios(config)
            .then(function (response) {
              handleClose(false);
              Navigate("/Permission-Documents");
              handleget();
              setLoader(false);
              console.log(response, "assign/library/permission");
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
              handleClose(false);
              console.log(error, "eres");
              setLoader(false);
              swal("Oops", error?.response?.data?.errors?.files[0], "error", {
                button: "Try Again!",
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
              });
            });
        };
        const handlegetRole = () => {
          var config = {
            method: "get",
            url: `${Baseurl.baseurl}get/all/roles`,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          axios(config)
            .then(function (response) {
              setDataRole(response.data.data);
              console.log(response.data.data, "email_verified_at");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        useEffect(() => {
          handlegetRole();
        }, []);
        const DelCompanies = () => {};
        return (
          <>
            <div className="d-flex w-100">
              <Link>
                <button
                  className="btn btn-primary shadow me-1"
                  style={{
                    paddingTop: "10px",
                    width: 150,
                  }}
                  onClick={handleShow}
                >
                  {"Add Permission"}
                </button>
              </Link>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header
                  id="example-modal-sizes-title-lg"
                  className="d-block"
                >
                  <Modal.Title></Modal.Title>
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mt-3">Add Files</h4>
                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 my-2">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={handleSelectChange}
                          value={selectedRoleId}
                        >
                          <option selected>Open this select menu</option>
                          {DataRole?.map((data, index) => (
                            <>
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="secondary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </>
        );
      },
      Filter: ColumnFilter,
    },
    {
      Header: "View Documents",
      Footer: "file",
      Cell: ({ row }) => {
        const Documentsfiles = row.original;
        console.log(row.original, "row=====>");
        // const token = useSelector((state) => state.auth.auth.idToken);
        // const DelCompanies = () => {};
        return (
          <>
            <div className="d-flex px-5">
              <Link to={`/Permission-Documents`}>
                <button className="btn btn-primary shadow btn-xs sharp">
                  <IoDocumentLockSharp />
                </button>
              </Link>
            </div>
          </>
        );
      },
      Filter: ColumnFilter,
    },
  ]; //   const data = useMemo(() => MOCK_DATA, []);
  const [columns, setColums] = useState(COLUMNS);
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
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  return (
    <>
      {loader ? <div className="loader"></div> : null}
      <div className="card">
        {/* Existing code... */}
        <div className="card-body">
          <div className="table-responsive">
            <GlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              handleget={handleget}
            />
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
                      <div className="center-button">
                        <Link  to={
                        Baseurl.DocumentUrl +
                        `${row.original.image_path}/${row.original.file}`
                      } className="hover-button rounded" target="_blank">
                          Click Me
                        </Link>
                      </div>
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
export default Index;
