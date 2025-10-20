/* eslint-disable react-hooks/exhaustive-deps */
// import { config } from '@fullcalendar/core/internal';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Baseurl from '../../../../Baseurl';
import Swal from 'sweetalert2';

const Transactiondefaults = () => {
  const token = useSelector((state) => state.auth.auth.idToken);

  const [error, setError] = useState([]);
  // const [datas,SetDatas] = useState("")

  const [default_officer, SetDefaultofficer] = useState('')
  const [loan_officer_assistant_branch, Setloan_officer_assistant_branch] = useState('')
  const [default_loan_officer_assistant, Setdefault_loan_officer_assistant] = useState('')
  const [processor_branch, SetProcessor_brunch] = useState('')
  const [default_setup_processor, Setdefault_setup_processor] = useState('')
  const [Id,SetId] = useState(null)

  const AddTrasaction = () => {
    const formdata = new FormData();
    formdata.append('default_officer', default_officer)
    formdata.append('default_loan_officer_assistant', loan_officer_assistant_branch)
    formdata.append('loan_officer_assistant_branch', default_loan_officer_assistant)
    formdata.append('processor_branch', processor_branch)
    formdata.append('default_setup_processor', default_setup_processor)
    if(Id != null){
      formdata.append('id',Id ? Id : null)
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/transaction/default`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    axios(config)
    .then(function (response) {
      SetId(response?.data?.data?.id)
      console.log(response,"owaisa")
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
    .catch(function (error) {
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
    console.log(error ,"error")
  }

  let user_id = localStorage.getItem('userDetail');
  user_id = JSON.parse(user_id);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handlgeteTrans = () => {
    const formdata = new FormData();
    formdata.append("user_id", user_id.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/transaction/default`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
    axios(config)
    .then(function (response) {
      SetDefaultofficer(response?.data?.data?.default_officer)
      Setloan_officer_assistant_branch(response?.data?.data?.loan_officer_assistant_branch)
      Setdefault_loan_officer_assistant(response?.data?.data?.default_loan_officer_assistant)
      SetProcessor_brunch(response?.data?.data?.processor_branch)
      Setdefault_setup_processor(response?.data?.data?.default_setup_processor)
      setError('')
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
    .catch(function (error) {
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
    console.log(error ,"error")
  }
  useEffect(() => { handlgeteTrans() }, [])
  const handleChange = (SetState) => (e) => {
    SetState(e.target.value);
}

  return (
    <>
      <div className='col-lg-12'>
        <span className='col-lg-4 d-flex'>
          <span className='text-bold'>Transaction defaults</span>
        </span>
        <div className=" row mt-3">
          <span className='col-lg-12'>
            <span className='text-light text-lowercase'>Used when you create new transactions (lead/prospect/loan)</span>
          </span>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize" style={{ letterSpacing: "0px", fontSize: "13px" }}>Default Officer</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <select class="form-select p-2 ms-2 rounded-0 " aria-label="messey kouhsseri" onChange={handleChange(SetDefaultofficer)}>
              <option value="">{default_officer?default_officer:"select..."}</option>
              <option value="1">On</option>
              <option value="select">select option</option>
              <option value="DefaultOfficer">Default Officer</option>
            </select>
            {error?.default_officer && error?.default_officer?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.default_officer[0]}
            </span>

          ) : null}
          </div>
        </div>
        <div className=" row mt-3">
          <span className='col-lg-12'>
            <span className='text-light text-lowercase'>Loan Officer Assistant Default</span>
          </span>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize" style={{ letterSpacing: "0px", fontSize: "13px" }}>Loan Officer assistant brunch(optional)</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <select class="form-select p-2 ms-2 rounded-0" aria-label="CA_Garden Grove" onChange={handleChange(Setloan_officer_assistant_branch)}>
              <option value="">{loan_officer_assistant_branch?loan_officer_assistant_branch:"select..."}</option>
              <option value="1">On</option>
              <option value="option">select option</option>
              <option value="LoanOfficer">Loan Officer</option>
            </select>
            {error?.loan_officer_assistant_branch && error?.loan_officer_assistant_branch?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.loan_officer_assistant_branch[0]}
            </span>

          ) : null}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize" style={{ letterSpacing: "0px", fontSize: "13px" }}>Default Loan Officer assistant(optional)</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <select class="form-select p-2 ms-2 rounded-0" aria-label="Thanh Dao" onChange={handleChange(Setdefault_loan_officer_assistant)}>
              <option value="">{default_loan_officer_assistant?default_loan_officer_assistant:"select..."}</option>
              <option value="loan_ofiicer">loan_ofiicer</option>
              <option value="loan_ofiicers">loan_ofiicers</option>
              <option value="DefaultLoanOfficer">Default Loan Officer</option>
            </select>
            {error?.default_loan_officer_assistant && error?.default_loan_officer_assistant?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.default_loan_officer_assistant[0]}
            </span>

          ) : null}
          </div>
        </div>
        <div className=" row mt-3">
          <span className='col-lg-12'>
            <span className='text-light text-lowercase'>Processor Default\</span>
          </span>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize" style={{ letterSpacing: "0px", fontSize: "13px" }}>Processor brunch(optional)</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <select class="form-select p-2 ms-2 rounded-0" aria-label="CA_Garden Grove" onChange={handleChange(SetProcessor_brunch)}>
              <option value="1">{processor_branch?processor_branch:"select..."}</option>
              <option value="On">On</option>
              <option value="Processorbrunch">Processor brunch</option>
              <option value="selecttwo">two</option>
            </select>
            {error?.processor_branch && error?.processor_branch?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.processor_branch[0]}
            </span>

          ) : null}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize" style={{ letterSpacing: "0px", fontSize: "13px" }}>Default setup Processor(optional)</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <select class="form-select p-2 ms-2 rounded-0" aria-label="Kaylin Pham" onChange={handleChange(Setdefault_setup_processor)}>
              <option value="">{default_setup_processor?default_setup_processor:"select..."}</option>
              {/* <option value="1">On</option> */}
              <option value="setupProcessor">setup Processor</option>
              <option value="selectoption2">option2</option>
            </select>
            {error?.default_setup_processor && error?.default_setup_processor?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.default_setup_processor[0]}
            </span>

          ) : null}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4 mx-auto">
            <button className='btn btn-primary rounded-0' onClick={AddTrasaction}>Submit </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transactiondefaults