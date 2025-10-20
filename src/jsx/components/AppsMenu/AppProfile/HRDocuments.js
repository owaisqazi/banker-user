/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useRef, useState } from 'react'
import './AppProfile.css'
import { Link } from 'react-router-dom'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { RxCrossCircled } from "react-icons/rx";
import swal from 'sweetalert'
import Baseurl from '../../../../Baseurl'


const HRDocuments = () => {
  const [datas,setDatas] = useState([]);
  const dropzoneRef = useRef(null);
  const dropzoneRef1 = useRef(null);
  const dropzoneRef2 = useRef(null);
  const dropzoneRef3= useRef(null);
  const dropzoneRef4= useRef(null);
  const dropzoneRef5= useRef(null);

  const [Id, SetId] = useState(null)
  const token = useSelector((state) => state.auth.auth.idToken);

  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }



  const handleChange = () => {

    let allImages=[...dropzoneRef.current.files.map(e=>({...e,type:"Passport"})),...dropzoneRef1.current.files.map(e=>({...e,type:"Deposit From,signed copy"})),...dropzoneRef2.current.files.map(e=>({...e,type:"screenshort"})),...dropzoneRef3.current.files.map(e=>({...e,type:"nda. upload a signed copy"})),...dropzoneRef4.current.files.map(e=>({...e,type:"signed copy"})),...dropzoneRef5.current.files.map(e=>({...e,type:"cyber security acknowledgement and ztf policy, sign it. and upload"}))]
    console.log(allImages,'217_17041050576592946165c18.png')
    const formdata = new FormData()
    allImages?.map((e, i) => {
    formdata.append(`files[${i}][image]`, e?.file) 
    formdata.append(`files[${i}][type]`, e?.type)})
    
    if (Id != null) {
      formdata.append('id', Id ? Id : null)
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/hr/document`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response12")
        SetId(response?.data?.data?.id)
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
        console.log(error,'eres')
        swal("Oops", error?.response?.data?.errors?.files[0], "error", { button: "Try Again!" });
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
      })
  }


  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail)
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handleget = () => {
    const formdata = new FormData()
    formdata.append("user_id", userDetail.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/hr/document`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(`https://bankerbrokerapi.dev-mn.xyz/api/${response?.data?.data[0]?.path+response?.data?.data[0]?.file}`,'response?.data?.data')
        setDatas(response?.data?.data)
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title: response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });

      })
      .catch((error) => {
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "error",
        //   title: error?.response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      })
  }

  useEffect(() => { handleget() }, [])


  const handledel = (id) => {
    const formdata = new FormData()
    formdata.append("id", id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}del/profile/hr/document`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title: response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
        handleget()
      })
      .catch((error) => {
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "error",
        //   title: error?.response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      })
  }

  return (
    <>
      <div class="row align-items-start my-4">
        <div class="col-lg-12 mb-4 py-4 bg-light">
          <span className='text-capitalize'>HR Documents</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4 py-4">
          <span className='text-muted  text-lowercase'>the Associate is required to complate all of the Documents listed below for Hr records</span>
        </div>
      </div>
      <div class="row align-items-start my-4">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>a01_A copy of [passposrt] or [SSN+ ID card]<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>Upload 1-9 supporting documents to the portal (for US Citizen).</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
           ref={dropzoneRef}
            getUploadParams={getUploadParams}
            accept="pdf"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "Passport").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="row align-items-start my-4">
        <div class="col-lg-5 mb-4 py-4" style={{ background: "aliceblue" }}>
          <span className='text-muted  text-lowercase'><u>if you are loan Officer please make sure your SSN is Uploaded so HR can use it to soft pull on your credit.</u></span>
        </div>
        <div class="col-lg-7 mb-4">
        </div>
      </div>
      <div class="row align-items-start my-4">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>a02_direct deposit from<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>download and complete the <Link className="text-primary">direct  deposit from.</Link>Upload a signed copy to the portal,</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
            getUploadParams={getUploadParams}
           ref={dropzoneRef1}
            accept="image/*jpeg/*,png/*screenshort"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "Deposit From,signed copy").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl?.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              {console.log(Image + data.file,'files=====>')}
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="col-lg-12 my-5">
      </div>
      <div class="row align-items-start my-4">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>IC01 W-9 form<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>Download and complete this W-9 form. Upload a signed copy to the portal.If you fill out the W-9 Form with your business name, please upload additional docs that show you are the owner and the company must be in good standing. Acceptable docs: a copy of the current active record, any letter from IRS/state to show you are the owner of the business; any current document showing your mailing address, your business name/your name, and business tax ID (match with all info on your W-9 Form).</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
            getUploadParams={getUploadParams}
           ref={dropzoneRef2}
            accept="image/*jpeg/*,png/*screenshort"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "screenshort").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="col-lg-12 my-5">
      </div>
      <div class="row align-items-start mb-4">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>IC02 Non-Disclosure Agreement (1099) <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>Download and complete this NDA. Upload a signed copy to the portal.</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
            getUploadParams={getUploadParams}
           ref={dropzoneRef3}
            accept="image/*onescreen/*,png/*screenshort"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "nda. upload a signed copy").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="col-lg-12 my-5">
      </div>
      <div class="row align-items-start mb-4">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>IC03_LO Agreement (1099)<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>You have received an LO Agreement during the onboarding process. Please sign and upload a signed copy to the portal.</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
            getUploadParams={getUploadParams}
           ref={dropzoneRef4}
            accept="image/*Screenshot/*,png/*screenshort"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "signed copy").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="col-lg-12 my-5">
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>LO6_Cyber Security
            Acknowledgement and ZTF Policy<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-lowercase'>Both W-2 and W-9 Loan Officer:
            Download this Cyber Security Acknowledgement and ZTF Policy, sign it.
            and upload it to the portal.</span>
        </div>
        <div class="col-lg-8">
          <Dropzone
            getUploadParams={getUploadParams}
           ref={dropzoneRef5}
            accept="image/*threenscreen/*,png/*/*screenshort"
          />
        </div>
        <div className="row">
          {datas?.filter(e=>e.type=== "cyber security acknowledgement and ztf policy, sign it. and upload").map((data, index) => (
            <div key={index} className="col-lg-2 position-relative">
              <img src={Baseurl.Image + data.file} alt="No Img Found" className="img-fluid mt-2 img-thumbnail show_Images" />
              <button className='rounded position-absolute icons-del border-0' onClick={() => handledel(data.id)}><RxCrossCircled fontSize={20} /></button>
            </div>
          ))}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4 mx-auto">
          <button className='btn btn-primary rounded-0' onClick={handleChange}>Submit </button>
        </div>
      </div>
    </>
  )
}

export default HRDocuments