/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { useParams } from "react-router";


const DocumentUpload = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const Token = useSelector((state) => state.auth.auth.idToken);
  const [Loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [Error, setError] = useState("");
  const [Docu_id, setDocu_id] = useState("");
  const [Acknowledgement, setAcknowledgement] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };
  const handleadd = () => {
    const formdata = new FormData();
    setLoader(true)
    formdata.append("file", file || "");
    formdata.append("borrower_id", borrowerid || "");
    formdata.append("application_id", item.id || "");
    // formdata.append("id", Docu_id || "");
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/agreement/document`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false)
        console.log(response?.data?.data?.id, "###>>>");
        setError("");
        setDocu_id(response?.data?.data?.id);
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
        setLoader(false)
        setError(error?.response?.data?.errors);
        console.log(error);
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
  const handleget = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid|| "");
    formdata.append("application_id", item.id|| "");
    var config = {
      method:"post",
      url: `${Baseurl.baseurl}get/all/agreements`,
      data: formdata,
      headers: {
        Accept:"application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(async function (response) {
        setLoader(false)
        console.log(response?.data?.data,"responseDocupload");
        setAcknowledgement(response?.data?.data?.acknowledgement);
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon:"success",
          title: response?.data?.message,
          animation: true,
          position:"top-right",
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
          icon:"error",
          title: error?.response?.data?.message?error?.response?.data?.message:"conection error",
          animation: true,
          position:"top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        setLoader(false)

      });
  };
  useEffect(() => {
    handleget();
  }, []);
  const handleresponse =()=>{
    if(Acknowledgement===null){
      Swal.fire({
        showCloseButton: true,
        toast: true,
        icon:"error",
        title: "please fill the Acknowledgement form",
        animation: true,
        position:"top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }else{
      handleadd()
    }
  }
  return (
    <>
    {Loader ? <div className="loader"></div> : null}
      <div className="container2">
        <div className="card2">
          <h3>Upload Files</h3>
          <div className="drop_box2">
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: PDF, TEXT, DOC, DOCX</p>
            <input
              class="form-control form-control-lg p-2 rounded-0"
              id="formFileLg"
              multiple
              type="file"
              onChange={handleFileChange}
            />
            {Error?.file ? (
              <div className="text-danger">{Error?.file[0]}</div>
            ) : null}
            <button
              type="button"
              class="btn btn-primary rounded-0 m-2 text-end mt-4"
              style={{ float: "right;" }}
              onClick={handleresponse}
            >
              Upload_Documents
            </button>
          </div>
        </div>
      </div>
      {/* <h3 className='text-center '>Documents Details</h3>
      <div className='col-lg-12 '>
        <Table1 />
      </div> */}
    </>
  );
};

export default DocumentUpload;
