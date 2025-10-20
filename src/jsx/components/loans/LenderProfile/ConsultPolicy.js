/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from 'axios'
import React, { useState } from 'react'
import { Tabs } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Baseurl from '../../../../Baseurl'
import { useSelector } from 'react-redux'
import Button from '../LoanOfficer/GlobalComponent/Button'
// import { FaMapMarkerAlt } from 'react-icons/fa'

const ConsultPolicy = (props) => {
  const [Tab, setTab] = useState("yes")
  const [maxCompensation, setMaxCompensation] = useState('')
  const [minCompensation, setMinCompensation] = useState('')
  const [error, setError] = useState()


  const TabChange = (key) => {
    setTab(key)
  }
  const Token = useSelector((state) => state.auth.auth.idToken);
  const Change = (event, state) => {
    const { value } = event.target
    state(value)
  }
  const handleSubmitMain = (event) => {
    event.preventDefault();

    const { id } = props
    console.log(id)


    const Compensation = new FormData()
    Compensation.append("minimum_compensation", minCompensation)
    Compensation.append("maximum_compensation", maxCompensation)
    Compensation.append("flat_fee", Tab)
    Compensation.append("lender_id", id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}add/lender/compensation/policy`,
      data: Compensation,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response)
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
      }).catch((error) => {
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

  return (
    <>
      <div className="container ">
        <form className="form-horizontal" role="form">
          <div className="row">
            <div className="col-lg-4">
              <label className="control-label" htmlFor="fieldone">
                Minimum Compension
              </label>
            </div>
            <div class="col-lg-8 ">
              <div class="input-group mb-3">
                <span class="input-group-text rounded-0" id="basic-addon1" >$</span>
                <input type="number" class="form-control rounded-0 shadow-sm" placeholder="enter yuor Minimum Compension" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {
                  Change(e, setMinCompensation)
                }} />
              </div>
              {error?.minimum_compensation && (
                <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                  {error?.minimum_compensation}
                </span>

              )}
            </div>
            <div className="col-lg-4">
              <label className="control-label" htmlFor="fieldone">
                Maximum Compension
              </label>
            </div>
            <div class="col-lg-8">
            <div class="input-group mb-3">
                <span class="input-group-text rounded-0 shadow-sm" id="basic-addon1" >$</span>
                <input type="number" class="form-control rounded-0 shadow-sm" placeholder="enter yuor  Maximum Compension" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {
                  Change(e, setMaxCompensation)
                }}/>
              </div>
                {error?.maximum_compensation && (
                  <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                    {error?.maximum_compensation}
                  </span>

                )}
              </div>
            <div className="col-lg-5">
              <label className="control-label" htmlFor="fieldone">
                Allow Flat Fire in Broker Compensation
              </label>
            </div>
            <div className="col-lg-7">
              <Tabs
                defaultActiveKey="yes"
                id="uncontrolled-tab-example"
                className=" mb-3"
                onSelect={TabChange}
              >
                <Tab
                  eventKey="yes"
                  title="yes"

                >



                </Tab>

                <Tab
                  eventKey="No  "
                  title="No"

                >



                </Tab>


              </Tabs>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
                    </div>
                    <div className='col-md-8  mb-4'>
                        <div className='text-start'>
                       <Button handleSubmit={handleSubmitMain} btntext={"Submit"} />
                        </div>
                    </div>
        </form>
      </div>
    </>
  )
}

export default ConsultPolicy