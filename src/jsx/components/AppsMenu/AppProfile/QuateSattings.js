/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { BiMessageMinus } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import "./AppProfile.css"
import Swal from 'sweetalert2'
import axios from 'axios'
import Baseurl from '../../../../Baseurl'
import { useSelector } from 'react-redux'
import './AppProfile.css'
const QuateSattings = () => {



    const token = useSelector((state) => state.auth.auth.idToken);
    const [error, setError] = useState()
    const [datas, setDatas] = useState()

    const [lender, SetLender] = useState()
    const [price_compensation, SetPrice_compensation] = useState()
    const [contact_info, SetContact_info] = useState()
    const [maximum_compensation, SetMaximum_compensation] = useState()
    const [disclaimer, SetDisclaimer] = useState()
    const [loan_type, SetLoan_type] = useState()
    const [purpose, SetPurpose] = useState()
    const [loan_amount, SetLoan_amount] = useState()
    const [property_value, SetProperty_value] = useState()
    const [zip_code, SetZip_code] = useState()
    const [number_of_rate, Setnumber_of_rate] = useState()
    const [display_lender, SetDisplay_lender] = useState(0)
    const [create_alert, Setcreate_alert] = useState(0)
    const [apply_button, SetApply_button] = useState(0)
    const [qualify_button, SetQualify_button] = useState(0)
    const [Id, SetId] = useState(null)


    const HandleChangeCompen = (SetState) => (e) => {
      SetState(e.target.value);
    }


    const handleQuate = () => {
      const formdata = new FormData()
      formdata.append('lender', lender)
      formdata.append('price_compensation', price_compensation)
      formdata.append('maximum_compensation', maximum_compensation)
      formdata.append('contact_info', contact_info === 1 ? 1 : 0)
      formdata.append('disclaimer', disclaimer)
      formdata.append('loan_type', loan_type)
      formdata.append('purpose', purpose)
      formdata.append('loan_amount', loan_amount)
      formdata.append('property_value', property_value)
      formdata.append('zip_code', zip_code)
      formdata.append('number_of_rate', number_of_rate)
      formdata.append('display_lender', display_lender === 1 ? 1 : 0)
      formdata.append('create_alert', create_alert === 1 ? 1 : 0)
      formdata.append('apply_button', apply_button === 1 ? 1 : 0)
      formdata.append('qualify_button', qualify_button === 1 ? 1 : 0)
      if (Id != null) {
        formdata.append('id', Id ? Id : null)
      }
      var config = {
        method: "post",
        url: `${Baseurl.baseurl}store/profile/quote/setting`,
        data: formdata,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      axios(config)
        .then(function (response) {
          console.log(response, "hyyyhyy12");
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
          console.log(error, "errrrrr")
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
        })
    }
  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handlegetQuates = () => {
    const formdata = new FormData()
    formdata.append("user_id", userDetail.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/quote/setting`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setDatas(response?.data?.data)
        console.log(response, "setDatas")
        SetLender(response?.data?.data?.lender)
        SetPrice_compensation(response?.data?.data?.price_compensation)
        SetMaximum_compensation(response?.data?.data?.maximum_compensation)
        SetContact_info(response?.data?.data?.qualify_button)
        SetDisplay_lender(response?.data?.data?.display_lender)
        Setcreate_alert(response?.data?.data?.create_alert)
        SetApply_button(response?.data?.data?.apply_button)
        SetQualify_button(response?.data?.data?.qualify_button)
        SetLoan_amount(response?.data?.data?.loan_amount)
        Setnumber_of_rate(response?.data?.data?.number_of_rate)
        SetProperty_value(response?.data?.data?.property_value)
        SetZip_code(response?.data?.data?.zip_code)
        SetId(response?.data?.data?.id)
        setError('')
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title:response?.data?.message,
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
      .catch((error => {
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
      }))

  }
  useEffect(() => { handlegetQuates() }, [])

  return (
    <>
      <div className="row align-items-start">
        <div className="col-lg-12 mb-4">
          <span className='text-bold text-upercase'>Quate Sattings</span>
        </div>
      </div>
      <div className="row align-items-start pt-4" style={{ background: "aliceblue" }}>
        <div className="col-lg-12 mb-1">
          <span className='text-muted  text-lowercase'>Please NOTE that your Target Compensation for each transaction is currently set at 1%. It cannot exceed the Maximum Compensation of 1%, which can be modified every quarter upon request. If you wish to adjust your maximum compensation, please contact Human Resources before the end of the quarter.</span>
        </div>
        <div className="col-lg-12 mb-4">
          <button className="btn btn-dark text-white p-2 rounded-0" type="button" id="button-addon2">Edit compensation</button>
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-lg-12 mb-1">
          <label for="inputPassword" className=" col-form-label text-capitalize ">lenders on your pricing enginge <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>

        </div>
        <div className="col-lg-12 mb-4">
          <span className='text-muted  text-lowercase'>Below is the list of lenders that will be displayed on your page. If you choose not to add any lenders (RECOMMENDED), your pricing engine will show the same lenders as https://www.loanfactory.com's website. You can customize the pricing compensation for each state of each selected lender.</span>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-2 mb-2">
          <button type="button" className="btn btn-primary rounded-0"><BiMessageMinus />Add</button>
        </div>
        <div className="col-lg-2 mb-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">lenders</label>
        </div>
        <div className="col-lg-4 mb-2">
          <label for="inputPassword" className=" col-form-label text-capitalize ">pricing compensations</label>
        </div>
        <div className="col-lg-4 mb-2">
          <label for="inputPassword" className=" col-form-label text-capitalize ">Maximum compensations</label>
        </div>
        <hr />
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-2 mb-2">
        </div>
        <div className="col-lg-2 mb-2">
          <input type="text" className="form-control rounded-0 p-2" placeholder="Lenders" value={datas?.lender} onChange={HandleChangeCompen(SetLender)} aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        <div className="col-lg-4 mb-2">
          <input type="number" className="form-control rounded-0 p-2" placeholder="enter pricing compensations" defaultValue={datas?.price_compensation} onChange={HandleChangeCompen(SetPrice_compensation)} aria-label="number" aria-describedby="basic-addon1" />
        </div>
        <div className="col-lg-4 mb-2">
          <input type="number" className="form-control rounded-0 p-2" placeholder="enter Maximum compensations" defaultValue={datas?.maximum_compensation} onChange={HandleChangeCompen(SetMaximum_compensation)} aria-label="number" aria-describedby="basic-addon1" />
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">content information required to get price</label>
        </div>
        <div className="col-lg-8">
          <div className="d-flex">
            <button className={`btn ${contact_info === 1 ? 'bac_bg' : 'btn-primary'} rounded-0 w-50`} type="button" onClick={() => SetContact_info(1)}>Yes</button>
            <button className="btn btn-light rounded-0 w-50" style={{ background: "black" }} type="button" onClick={() => SetContact_info(0)}>No</button>
            {/* {isActive ? 'Active' : 'Inactive'} */}
          </div>
          <span className='text-muted  text-lowercase'>Borrower's information will be imported to <Link to="#" className='text-primary'>Leads page</Link></span>
        </div>
      </div>

      <div className="row align-items-start mt-3">
        <div className="col-lg-4 mb-4">
          <label for="inputPassword" className=" col-form-label text-capitalize" style={{ fontSize: "13px", letterSpacing: "1px" }}>Disclaier<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted  text-capitalize'>customer Disclaier on the bottom of  the Quote result</span>
        </div>
        <div className="col-lg-8">
          <div className="form-floating">
            <textarea className="form-control rounded-0" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: " 100px" }} defaultValue={datas?.disclaimer} onChange={HandleChangeCompen(SetDisclaimer)}></textarea>
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-12">
          <label for="inputPassword" className=" col-form-label text-capitalize">Default values in the  Quate form</label>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Loan tpye</label>
        </div>
        <div className="col-lg-8">
          <select className="form-select p-2 rounded-0" onChange={HandleChangeCompen(SetLoan_type)} aria-label="Conventional">
            <option selected>{datas?.loan_type ? datas?.loan_type : "Open this select menu"}</option>
            <option value="One">One</option>
            <option value="One">One</option>
            <option value="Three">Three</option>
          </select>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Purpose<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div className="col-lg-8">
          <select className="form-select p-2 rounded-0" onChange={HandleChangeCompen(SetPurpose)} aria-label="Purchase">
            <option value=''>{datas?.purpose ? datas?.purpose : "Open this select menu"}</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
          </select>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">loan amount
            <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0" id="basic-addon1">$</span>
            <input type="number" className="form-control rounded-0" placeholder="loan amount" defaultValue={datas?.loan_amount} onChange={HandleChangeCompen(SetLoan_amount)} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Porperty value
            <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <span className="input-group-text rounded-0" id="basic-addon1">$</span>
            <input type="number" className="form-control rounded-0" placeholder="Porperty value7" defaultValue={datas?.property_value} onChange={HandleChangeCompen(SetProperty_value)} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">zip code
            <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <input type="number" className="form-control rounded-0  rounded-0" placeholder="" defaultValue={datas?.zip_code} onChange={HandleChangeCompen(SetZip_code)} aria-label="Recipient's username" aria-describedby="button-addon2" />
          </div>
        </div>
      </div>
      <div className="row align-items-start m3-3">
        <div className="col-lg-12">
          <label for="inputPassword" className=" col-form-label text-capitalize">item to display in the Quote Result
          </label>
        </div>
        <div className="col-lg-12">
          <label for="inputPassword" className=" col-form-label text-capitalize">these Sattings affect the information displayed in the price table
          </label>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">number of rates to display
            <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div className="col-lg-8">
          <div className="input-group mb-3">
            <input type="number" className="form-control rounded-0  rounded-0" placeholder="number of rates to display" defaultValue={datas?.number_of_rate} onChange={HandleChangeCompen(Setnumber_of_rate)} aria-label="Recipient's username" aria-describedby="button-addon2" />
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">display lender name</label>
        </div>
        <div className="col-lg-8">
          <div className="d-flex">
            <button className={`btn ${display_lender === 1 ? 'bac_bg' : 'btn-primary'} rounded-0 w-50`} onClick={() => SetDisplay_lender(1)}>Yes</button>
            <button className="btn btn-light rounded-0 w-50" style={{ background: "black" }} type="button" onClick={() => SetDisplay_lender(0)}>No</button>
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">display create alert button</label>
        </div>
        <div className="col-lg-8">
          <div className="d-flex">
            <button className={`btn ${create_alert === 1 ? 'bac_bg' : 'btn-primary'} rounded-0 w-50`} type="button2" onClick={() => Setcreate_alert(1)}>Yes</button>
            <button className="btn btn-light rounded-0 w-50" style={{ background: "black" }} type="button2" onClick={() => Setcreate_alert(0)}>No</button>
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">display apple button</label>
        </div>
        <div className="col-lg-8">
          <div className="d-flex">
            <button className={`btn ${apply_button === 1 ? 'bac_bg' : 'btn-primary'} rounded-0 w-50`} type="button3" onClick={() => SetApply_button(1)}>Yes</button>
            <button className="btn btn-light rounded-0 w-50" style={{ background: "black" }} type="button3" onClick={() => SetApply_button(0)}>No</button>
          </div>
        </div>
      </div>
      <div className="row align-items-start mt-3">
        <div className="col-lg-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">display qualify button</label>
        </div>
        <div className="col-lg-8 mt-3">
          <div className="d-flex">
            <button className={`btn ${qualify_button === 1 ? 'bac_bg' : 'btn-primary'} rounded-0 w-50`} type="button" onClick={() => SetQualify_button(1)}>Yes</button>
            <button className="btn btn-light rounded-0 w-50" style={{ background: "black" }} type="button" onClick={() => SetQualify_button(0)}>No</button>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col-lg-4 mb-4 pt-4 mx-auto">
            <button className='btn btn-primary rounded-0' onClick={handleQuate}>Submit </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuateSattings