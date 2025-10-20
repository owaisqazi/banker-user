/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Baseurl from '../../../../Baseurl'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';

const Conpensation = () => {

  const token = useSelector((state) => state.auth.auth.idToken);

  const [error, SetError] = useState("")

  const [has_compensation, setHas_compensation] = useState(false);
  const [originator_cm_plan, SetOriginator_cm_plan] = useState("")
  const [monthly_bonus_fr, Setmonthly_bonus_fr] = useState("")
  const [maximum_compensation, SetMaximum_compensation] = useState("")
  const [target_compensation, SetTarget_compensation] = useState("")
  const [Id, SetId] = useState(null)
  // console.log(ii_d,"ii_d")

  const HandleConpensation = () => {
    const formdata = new FormData()
    formdata.append('originator_cm_plan', originator_cm_plan)
    formdata.append('monthly_bonus_fr', monthly_bonus_fr)
    formdata.append('maximum_compensation', maximum_compensation)
    formdata.append('has_compensation', has_compensation ? 1 : 0)
    formdata.append('target_compensation', target_compensation)
    if (Id != null) {
      formdata.append('id', Id ? Id : null)
    }

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/compensation`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    axios(config)
      .then(function (response) {
        SetId(response?.data?.data?.id)
        SetError('')
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
        SetError(error.response.data.errors)
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.data.message,
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

  let user_id = localStorage.getItem('userDetail');
  user_id = JSON.parse(user_id);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handlgeteCon = () => {
    const formdata = new FormData();
    formdata.append("user_id", user_id.id)
    // formdata.append("id",ii_d.id?ii_d.id:null)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/compensation`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
    axios(config)
      .then(function (response) {
        console.log(response)
        SetOriginator_cm_plan(response?.data?.data?.originator_cm_plan)
        Setmonthly_bonus_fr(response?.data?.data?.monthly_bonus_fr)
        SetMaximum_compensation(response?.data?.data?.maximum_compensation)
        SetTarget_compensation(response?.data?.data?.target_compensation)
        setHas_compensation(response?.data?.data?.has_compensation)
        SetError('')
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
        console.log(error)
        SetError(error.response.data.errors)
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
  useEffect(() => { handlgeteCon() }, [])

  const
    AddConpensation = (SetState) => (e) => {
      SetState(e.target.value);
    }

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxes(prevState => ({
  //     ...prevState,
  //     [name]: checked
  //   }));
  // };
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      setHas_compensation(true);

    }
    else{
      setHas_compensation(false);
    }
    console.log(checked, "checked")
  };
  return (
    <>
      <div className='col-lg-12'>
        <span className='col-lg-4 d-flex'>
          <span className='text-bold'>Conpensation</span>
        </span>
        <div class="row mt-3 align-items-start">
          <div class="col-lg-4 text-lowercase ">
            originator_cm_plan<p className=' text-muted'>(optional)</p>
          </div>
          <div class="col-lg-8">
            <div class="input-group">
              <select class="form-select " id="inputGroupSelect04" aria-label="Example select with button addon" onChange={AddConpensation(SetOriginator_cm_plan)}>
                <option  value=''>{originator_cm_plan?originator_cm_plan:"Monthly bonus formula"}</option>
                <option value="originator">or</option>
                <option value="originator_cm_plan">originator_cm_plan</option>
                <option value="originator">originator</option>
              </select>
              <a href="/Createnewcom" class="btn btn-outline-light p-2 rounded-0" type="button">Preview</a>
            </div>
            {error?.originator_cm_plan && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.originator_cm_plan}
              </span>
            )}
          </div>
        </div>

        <div class="row mt-3 align-items-start">
          <div class="col-lg-4 text-lowercase ">
            Monthly bonus formula<p className=' text-muted'>(optional)</p>
          </div>
          <div class="col-lg-8">
            <div class="input-group">
              <select class="form-select" id="inputGroupSelect04" defaultValue={monthly_bonus_fr} aria-label="Example select with button addon" onChange={AddConpensation(Setmonthly_bonus_fr)}>
                <option  value=''>{monthly_bonus_fr?monthly_bonus_fr:"Monthly bonus formula"}</option>
                <option value="1">On</option>
                <option value="Monthlybonus">Monthly bonus</option>
                <option value="Monthlybonusformula">Monthly bonus formula</option>
              </select>
              <a href="/Createnewcom" class="btn btn-outline-light p-2 rounded-0" type="button">Preview</a>
            </div>
            {error?.monthly_bonus_fr && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.monthly_bonus_fr}
              </span>
            )}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize text-white">ddsddsd</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <div class="input-group w-100">
              <input class="form-check-input ms-2" type="checkbox" checked={has_compensation==1}
                onChange={handleCheckboxChange} name="has_compensation" id="flexCheckDefault" />

              <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
                Has compensation cap
              </label>
            </div>
            {error?.has_compensation && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.has_compensation}
              </span>
            )}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize">Maximum compensation</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <div class="input-group">
              <span className=" input-group-text rounded-0">%</span>
              <input type="number" className=" form-control rounded-0" defaultValue={maximum_compensation} onChange={AddConpensation(SetMaximum_compensation)} />
            </div>
            {error?.maximum_compensation && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.maximum_compensation}
              </span>
            )}
          </div>
        </div>
        <div className=" row ">
          <div className=" col-sm-12 d-flex">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize text-white">ddsddsd</label>
            <label class="form-check-label text-lowercase  text-muted" for="flexCheckDefault">
              Every loan officer must set a maximum compensation. The maximum compensation cannot be higher than Loan Factory's lender-paid compensation (150 bps in California and 250 bps in all other states).<Link className='text-primary'> More</Link>
            </label>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 py-4">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize">Target compensation</label>
          </div>
          <div class="col-lg-8 mb-4 py-4">
            <div class="input-group">
              <span className=" input-group-text rounded-0">%</span>
              <input type="number" className=" form-control rounded-0" defaultValue={target_compensation} placeholder="(231)324324" onChange={AddConpensation(SetTarget_compensation)} />
            </div>
            {error?.target_compensation && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.target_compensation}
              </span>
            )}
          </div>
        </div>
        <div className=" row ">
          <div className=" col-sm-12 d-flex">
            <label for="inputPassword" className=" col-sm-4 col-form-label text-capitalize text-white">ddsddsd</label>
            <label class="form-check-label text-lowercase  text-muted" for="flexCheckDefault">
              This is your target compensation for each transaction created. Also, this will affect the rates
              on your pricing engine (on your website)<Link className='text-primary'> More</Link>
            </label>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4 mx-auto">
            <button className='btn btn-primary rounded-0' onClick={HandleConpensation}>Submit </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Conpensation