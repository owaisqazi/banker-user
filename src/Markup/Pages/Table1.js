/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { useParams } from "react-router-dom";
import { Fab } from "@material-ui/core";
import { LuClipboardSignature } from "react-icons/lu";
import Baseurl from "../../Baseurl";
import { GrDocumentImage } from "react-icons/gr";

export default function DenseTable() {
  const { id } = useParams();
  // const [borrID, setborrID] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [error, seterror] = React.useState(false);
  const [showdata, setshowdata] = React.useState("");
  const [borrower_signature_date, setborrower_signature_date] =
    React.useState("");
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(false);
  const Token = localStorage.getItem("usertoken");
  const borrower_id = localStorage.getItem("borreower_id");
  const Document_id = JSON.parse(localStorage.getItem("Document_id"));
  console.log(Document_id, "Document_id====>");
  
  const handleget = () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("borrower_id", borrower_id);
    formdata.append("application_id", id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/document/for/borrower`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false);
        console.log(response, "salamn");
        setDatas(response?.data?.data);
        // setborrID(response?.data?.data?.borrower_id);
        setModalShow(false);
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
        setLoader(false);
        // setError('')
        console.log(error, "errorsds>1");
        // setError(error.response.data.errors)
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
    handlegetsinature();
  }, []);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPads = useRef(null);

  const clear = () => {
    sigPads.current.clear();
  };

  const save = () => {
    if (sigPads.current) {
      const dataURL = sigPads.current.getTrimmedCanvas().toDataURL("image/png");
      setTrimmedDataURL(dataURL);
    }
  };

  const handleSubmit = async () => {
    setLoader(true);
    const datasubmit = new FormData();
    // if (borrID !== null) {
    //   datasubmit.append("borrower_id", borrower_id);
    // }
    // datasubmit.append("application_id", id);
    Document_id.map((id, index) =>
      datasubmit.append(`document_id[${index}]`, id)
    );
    datasubmit.append(
      "borrower_signature",
      trimmedDataURL ? trimmedDataURL : showdata || ""
    );
    datasubmit.append("borrower_signature_date", borrower_signature_date || "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/acknowledgement/signature`,
      data: datasubmit,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    await axios(config)
      .then((res) => {
        setLoader(false);
        setModalShow(false);
        console.log(res, "asdasdasdasdasdsad");
        if (res?.data?.status === true) {
          seterror("");
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: res?.data?.message,
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
          // handlegetsinature()
        }
        handlegetsinature();
      })
      .catch((error) => {
        setLoader(false);
        console.log(error, "adderr");
        seterror(error?.response?.data?.errors);
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

  const handlegetsinature = () => {
    const formdata = new FormData();
    formdata.append("borrower_id", borrower_id);
    formdata.append("application_id", id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/acknowledgement/agreement/signature`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "handlegetsinature");
        setshowdata(response?.data?.data);
        setTrimmedDataURL(false);
      })
      .catch((error) => {
        // setError('')
        console.log(error, "error========>1");
        // setError(error.response.data.errors)
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
      {loader ? <div className="loader"></div> : null}
      <TableContainer component={Paper} className="mb-3">
        <Fab
          variant="extended"
          className="m-3"
          style={{ float: "right" }}
          onClick={() => setModalShow(true)}
        >
          <LuClipboardSignature sx={{ mr: 1 }} style={{ fontSize: "30px" }} />
          Signature
        </Fab>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="shadow bg-primary" style={{ height: "50px" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>id </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                Document View
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                File name{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.id}
                </TableCell>
                <TableCell align="center">
                  <a
                    href={`${Baseurl?.imgurl}uploads/broker/agreement/documents/${data?.file}`}
                    target="_blank"
                  >
                    {/* {data?.file} */}
                    <Fab
                      variant="extended"
                      className="m-3"
                      roundedCircle
                      // style={{ float: "right" }}
                      // onClick={() => setModalShow(true)}
                    >
                      <GrDocumentImage 
                        sx={{ mr: 1 }}
                        style={{ fontSize: "30px" }}
                      />
                    </Fab>
                  </a>
                </TableCell>
                <TableCell align="center">{data?.filename}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => {
          clear(); 
          setModalShow(false)}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Borrower Signature
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5
            className="font266"
            style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
          >
            Borrower Signature{" "}
          </h5>
          <div className="col-lg-12 mb-3">
            <input
              className="form-control rounded-0 shadow-sm"
              type="date"
              name="borrower_signature_date"
              onChange={(e) => setborrower_signature_date(e.target.value)}
              defaultValue={borrower_signature_date}
              placeholder="Borrower Signature"
            />
          </div>
          {error?.borrower_signature_date &&
          error?.borrower_signature_date?.length >= 0 ? (
            <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
              {error?.borrower_signature_date[0]}
              <br />
              {error?.borrower_signature_date[1]}
            </span>
          ) : null}
          <div className="col-lg-12">
            <div className="shadow-sm" id="sigContainer">
              <SignaturePad
                canvasProps={{
                  width: 600,
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={sigPads}
              />
              {error?.borrower_signature &&
              error?.borrower_signature?.length >= 0 ? (
                <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                  {error?.borrower_signature[0]}
                </span>
              ) : null}
            </div>

            <div className="col-lg-12 my-5">
              {trimmedDataURL ? (
                <img
                  className="sigImage"
                  src={trimmedDataURL}
                  alt="Signature"
                />
              ) : null}
            </div>
          </div>
          <div className="col-lg-12 mb-3">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={clear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary rounded-0"
                onClick={save}
              >
                Save
              </button>
            </div>
            <div className="col-lg-12 my-2">
              <img
                className="sigImagess"
                src={null ? null : `data:image/png;base64,${showdata}`}
                alt=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
