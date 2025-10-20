/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./AppProfile.css"
import Swal from 'sweetalert2';
import axios from 'axios';
import Baseurl from '../../../../Baseurl';
import { useSelector } from 'react-redux';


const RingCentralExtension = () => {
useEffect(() => { handleget() }, [])

  const [error, setError] = useState([])
  const [show, hide] = useState(false);
  const [inputcheckbox, setInputcheckbox] = useState(false);

  const [Id, setId] = useState(null);
  const token = useSelector((state) => state.auth.auth.idToken);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setInputcheckbox(true);

    }
    else{
      setInputcheckbox(false);
    }
    console.log(checked, "checked")
  };
  
  const handleChangeadd = () =>{
  const formdata = new FormData()
  formdata.append('ring_ext',inputcheckbox ? 1 : 0)
  if(Id != null){
    formdata.append('id', Id ? Id : null)
  }
  var config = {
    method: "post",
    url: `${Baseurl.baseurl}store/profile/ring/central`,
    data: formdata,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  axios(config)
  .then(function (response) {
    setId(response.data.data.id)
    setError('')
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
    setError(error.response.data.errors)
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
    url: `${Baseurl.baseurl}get/profile/ring/central`,
    data: formdata,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  axios(config)
    .then(function (response) {
      console.log(response,'response?.data?.ring_ext')
      setInputcheckbox(response?.data?.data?.ring_ext)
      setId(response?.data?.data?.id)
      
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
      setError(error.response.data.errors)
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
console.log(inputcheckbox,'inputcheckbox')
  // const Setinput = (e) => {
  //   const input = e.target.checked;
  //   console.log(input)
  //   if (input === true) {
  //     hide(true)
  //   }
  //   else {
  //     hide(false)
  //   }
  // }
  // const Setinput = (e) => {
  //   // const input = e.target.checked;
  //   // console.log(input)
  //   // if (input === true) {
  //   //   hide(true)
  //   // }
  //   // else {
  //   //   hide(false)
  //   // }
  // }
  return (
    <>
    
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4">
          <span className='text-bold text-upercase'>RingCentral Extension</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4 py-4" style={{ background: "aliceblue" }}>
          <span className='text-muted  text-lowercase'>©1f you are getting trouble logging into your extension, please contact it @loanfactory.com for assistance. The correct credentials and your extension must be
            verified before you can access RingCentral features from here.</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4 py-4 bg-light">
          {/* <div class="form-check form-switch"> */}
            <input class="form-check-input" type="checkbox"   checked={inputcheckbox == 1}  onChange={handleCheckboxChange}/>
            <label class="form-check-label text-lowercase text-muted" for="flexSwitchCheckDefault">Using RingCentral Extension</label>
          {/* </div> */}
        </div>
      </div>

      {(show) ? <div class="row align-items-start my-4">
        <div class="row align-items-start mt-3">
          <div class="col-lg-4">
            <label for="inputPassword" className=" col-form-label text-capitalize " style={{ fontSize: "13px" }}>RingCentral Phone number</label>
          </div>
          <div class="col-lg-8">
            <div class="input-group">
              <span class="input-group-text rounded-0" id="basic-addon1">@</span>
              <input type="text" class="form-control rounded-0" placeholder="(949) 244-1880" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
        <div class="row align-items-start mt-3">
          <div class="col-lg-4">
            <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>RingCentral Extension number</label>
          </div>
          <div class="col-lg-8">
            <div class="input-group">
              <input type="text" class="form-control rounded-0" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
        <div class="row align-items-start mt-3">
          <div class="col-lg-4">
            <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>RingCentral Extension Password<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
          </div>
          <div class="col-lg-8">
            <div class="input-group">
              <input type="text" class="form-control rounded-0" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
              <span class="input-group-text rounded-0" id="basic-addon1">@</span>
            </div>
          </div>
        </div>
        <div class="row align-items-start mt-3">
          <div class="col-lg-4 pt-3">
            <label for="inputPassword" className=" col-form-label text-capitalize " style={{ fontSize: "13px", letterSpacing: "1px" }}>RingCentral Extension status</label>
          </div>
          <div class="col-lg-8 mt-4">
            <span className='text-bold text-lowercase text-muted'>need to varify</span>
          </div>
        </div>
      </div> : null}
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4 mx-auto">
          <button className='btn btn-primary rounded-0' onClick={handleChangeadd}>Submit </button>
        </div>
      </div>
    </>
  )
}

export default RingCentralExtension