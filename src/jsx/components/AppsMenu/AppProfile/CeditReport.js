/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-self-compare */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./AppProfile.css"
import Swal from 'sweetalert2';
import Baseurl from '../../../../Baseurl';
import axios from 'axios';
import { useSelector } from 'react-redux';
const CeditReport = () => {
  // eslint-disable-next-line no-unused-vars
  const [show, hide] = useState(false);
  const Token = useSelector((state) => state.auth.auth.idToken)

  // eslint-disable-next-line no-unused-vars
  const Setinput = (e) => {
    const input = e.target.checked;
    console.log(input)
    if (input === true) {
      hide(true)
    }
    else {
      hide(false)
    }
  }


// usestate
// const [typeimage,setTypeimage] = useState=('');
const [credit_credental, setCredit_credental] = useState('Meridianlink');
const [credit_vendor, SetCredit_vendor] = useState('')
const [default_credental, SetDefault_credental] = useState('')
const [borrower_to_pay, SetBorrower_to_pay] = useState('')
const [processor_to_user_trans, SetProcessor_to_user_trans] = useState('')
const [soft_credit, SetSoft_credit] = useState('')
const [advan_credit, SetAdvan_credit] = useState('')
const [soft_credit_detail, SetSoft_credit_detail] = useState("")
const [client_review, SetClient_review] = useState("")
const [display_review, SetDisplay_review] = useState("")
const [error, SetError] = useState("")
const [datas, SetSetDatas] = useState("")
const [Id, SetId] = useState(null)

const handleTabChange = (key) => {
  setCredit_credental(key); // Update the active tab when a tab is clicked
};


const Handladd = () => {
  const formdata = new FormData()
  formdata.append('credit_credental', credit_credental)
  formdata.append('credit_vendor', credit_vendor? 1 : 0)
  formdata.append('default_credental', default_credental? 1 : 0)
  console.log(soft_credit)
  formdata.append('borrower_to_pay', borrower_to_pay ? 1 : 0)
  formdata.append('processor_to_user_trans', processor_to_user_trans? 1 : 0)
  formdata.append('soft_credit', soft_credit? 1 : 0)
  formdata.append('advan_credit', advan_credit? 1 : 0)
  formdata.append('soft_credit_detail', soft_credit_detail)
  formdata.append('client_review', client_review)
  formdata.append('display_review', display_review)
  if (Id != null) {
    formdata.append('id', Id ? Id : null)
  }
  var config = {
    method: "post",
    url: `${Baseurl.baseurl}store/credit/report`,
    data: formdata,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  }
  axios(config)
    .then(function (response) {
      // SetId(response?.data?.data?.id)
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



let userDetail = localStorage.getItem('userDetail');
userDetail = JSON.parse(userDetail);
const handleget = () => {
  const formdata = new FormData()
  formdata.append("user_id", userDetail.id)
  var config = {
    method: "post",
    url: `${Baseurl.baseurl}get/credit/report`,
    data: formdata,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  };
  axios(config)
    .then(function (response) {
 console.log(response, "creadit",)
      SetSetDatas(response?.data?.data)
      SetId(response?.data?.data?.id)
      setCredit_credental(response?.data?.data?.credit_credental)
      console.log(credit_vendor,"credit_credental")
      SetCredit_vendor(response?.data?.data?.credit_vendor)
      SetDefault_credental(response?.data?.data?.default_credental)
      SetBorrower_to_pay(response?.data?.data?.borrower_to_pay)
      SetProcessor_to_user_trans(response?.data?.data?.processor_to_user_trans)
      SetSoft_credit(response?.data?.data?.soft_credit)
      SetAdvan_credit(response?.data?.data?.advan_credit)
      SetClient_review(response?.data?.data?.client_review)
      SetDisplay_review(response?.data?.data?.display_review)
      SetSoft_credit_detail(response?.data?.data?.soft_credit_detail)
      SetError('')
      // var defaultCheked=response?.data?.data?.id;
    })
    .catch((error => {
      SetError(error?.response?.data?.data?.errors)
    }))

  
}


useEffect(() => { handleget() }, [])

const handleChange = (SetState) => (e) => {
  SetState(e.target.value);

}



  return (
    <>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4">
          <span className='text-bold text-upercase'>Cedit credental for hard pull</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-1">
          <Tabs
            defaultActiveKey={credit_credental}
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabChange}
          >
            <Tab eventKey="Meridianlink" title="Meridianlink" onSelect={handleTabChange}>
              <div class="col-lg-12 mb-4" style={{ background: "aliceblue" }}>
                <span className='text-muted  text-lowercase'>Below is the list of lenders that will be displayed on your page. If you choose not to add any lenders (RECOMMENDED), your pricing engine will show the same lenders as https://www.loanfactory.com's website. You can customize the pricing compensation for each state of each selected lender.</span>
              </div>
            </Tab>
            <Tab eventKey="Do Credit Report" title="Do Credit Report" onSelect={handleTabChange}>
              <div class="col-lg-12 mb-4" style={{ background: "aliceblue" }}>
                <span className='text-muted  text-lowercase'>Below is the list of lenders that will be displayed on your page. If you choose not to add any lenders (RECOMMENDED), your pricing engine will show the same lenders as https://www.loanfactory.com's website. You can customize the pricing compensation for each state of each selected lender.</span>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div class="col-lg-12 mb-4">
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn btn-dark rounded-0">@</button>
          <button type="button" class="btn btn-primary rounded-0">Add</button>
          <button type="button" class="btn btn-danger rounded-0">Delete</button>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-2 mb-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name='CreditVender' id="flexCheckDefault1" checked={credit_vendor ==1 }  onChange={(e)=>SetCredit_vendor(e.target.checked)}/>
            <label for="inputPassword" className=" ps-2 col-form-label text-capitalize ">credit vender</label>
          </div>
        </div>
        <div class="col-lg-1 mb-2 px-2">
          <label for="inputPassword" className=" col-form-label text-capitalize ">credit report free</label>
        </div>
        <div class="col-lg-2 mb-2 px-2">
          <label for="inputPassword" className=" col-form-label text-capitalize ">your default credential</label>
        </div>
        <div class="col-lg-3 px-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">allow the borrower to pull and pay for own credit reports</label>
        </div>
        <div class="col-lg-4 px-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">allow your processor to use this credential to pull credit report for your transactions</label>
        </div>
        <hr />
      </div>
      <div class="row align-items-start mt-1">
        <div class="col-lg-2 mb-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" onChange={(e)=>SetAdvan_credit(e.target.checked)} name='advancredit' checked={advan_credit == 1} id="flexCheckDefault2" />
            <label for="inputPassword" className=" ps-2 col-form-label text-capitalize text-dark p-0">advantage credit.inc.</label>
          </div>
        </div>
        <div class="col-lg-1 mb-2 px-1">
          <label for="inputPassword" className=" col-form-label text-capitalize text-muted">$60</label>
        </div>
        <div class="col-lg-2 mb-2 px-2">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" onChange={(e)=>SetDefault_credental(e.target.checked)} name='defaultcredental' checked={default_credental == 1} id="flexCheckDefault3" />
          </div>
        </div>
        <div class="col-lg-3 px-1">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" onChange={(e)=>SetBorrower_to_pay(e.target.checked)} name='borrowerto_pay' checked={borrower_to_pay == 1} id="flexCheckDefault4" />
          </div>
        </div>
        <div class="col-lg-3 px-1">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" onChange={(e)=>SetProcessor_to_user_trans(e.target.checked)} name='processortousertrans' checked={processor_to_user_trans == 1} id="flexCheckDefault5" />
          </div>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-12">
          <label for="inputPassword" className=" ls-0 col-form-label text-capitalize">credit credential for soft pull(Meridianlink)</label>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
        </div>
        <div class="col-lg-8">
          <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault6" name='UsingSoftCreditPull' 
        checked={soft_credit==1}
         onChange={(e)=>SetSoft_credit(e.target.checked)} />
            <label class="form-check-label text-muted" for="flexCheckDefault">
              Using Soft Credit Pull?
            </label>
          </div>
          {soft_credit?<span className='text-muted  text-lowercase'><Link className='text-primary'>of lenders</Link> of lenders that will be displayed<Link className='text-primary'>of lenders</Link> If you choose not to add any lenders (RECOMMENDED),</span>:null}
        </div>
        </div>

      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
        </div>
        <div class="col-lg-8">
          <select class="form-select p-2 rounded-0" aria-label="Default select example" onChange={handleChange(SetSoft_credit_detail)}>
            <option >{soft_credit_detail?soft_credit_detail:"Open this select menu"}</option>
            <option name="One">One</option>
            <option name="Two">Two</option>
            <option name="Three">Three</option>
          </select>
          <span className='text-muted  text-lowercase'><Link className='text-primary'>of lenders</Link> of lenders that will be displayed<Link className='text-primary'>of lenders</Link> If you choose not to add any lenders (RECOMMENDED),</span>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Client's reviews</label>
        </div>
        <div class="col-lg-8">
          <select class="form-select p-2 rounded-0" aria-label="Default select example" onChange={handleChange(SetClient_review)}>
            <option >{soft_credit_detail?soft_credit_detail:"Open this select menu"}</option>
            <option name="One">One</option>
            <option name="Two">Two</option>
            <option name="Three">Three</option>
          </select>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">display reviews
          </label>
        </div>
        <div class="col-lg-8">
        <input type="text" class="form-control rounded-0" placeholder="enter display reviews" defaultValue={datas?.display_review} aria-label="Username" aria-describedby="addon-wrapping"onChange={handleChange(SetDisplay_review)}/>
        </div>
      </div>
      <div class="row align-items-start">
            <div class="col-lg-4 mb-4 pt-4 mx-auto">
              <button className='btn btn-primary rounded-0' onClick={Handladd}>Submit </button>
            </div>
          </div>
    </>
  )
}

export default CeditReport