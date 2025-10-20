/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import Swal from 'sweetalert2'
import Baseurl from '../../../../Baseurl'
import { useSelector } from 'react-redux'
import Button from '../LoanOfficer/GlobalComponent/Button'

const AdditionalInfo = (props) => {
  const [approved,setApproved]=useState("1")
  const [expiryDate,setExpiryDate]=useState("")
  const[overlay,setOverlay]=useState("")

  const TabChange=(key)=>{
    setApproved(key)
}
const Token = useSelector((state) => state.auth.auth.idToken);
const Change=(event,state)=>{
const {name,value}=event.target
state(value)
}
const handleSubmitMain = (event) => {
event.preventDefault(); 

const  {id}=props
console.log(id)


const Compensation=new FormData()
Compensation.append("approved",approved?1:0)
Compensation.append("expiry_date",expiryDate)
Compensation.append("overlay",overlay)
Compensation.append("lender_id",id)



var config = {
  method: "post",
  url: `${Baseurl.baseurl}add/lender/additional/information`,
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
}).catch((error)=>{
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
    <div className='container'>
          <form className="form-horizontal" role="form">

         <label className="control-label rounded-0 col-lg-4 col-sm-12" htmlFor="fieldone">
Approved
            </label>
      <div className="col-lg-8 col-sm-12">
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
    <div className="form-group row align-items-center   mb-3">
            <label className="control-label rounded-0 col-lg-4 col-sm-12" htmlFor="fieldone">
    Expiration Date (optional)
            </label>
            <div className="col-lg-8 col-sm-12">
            <input
              type="text"
              onChange={(e)=>Change(e,setExpiryDate)}
              className="form-control shadow-sm rounded-0 mb-2 rounded-0  rounded-0 "
              id="fieldone"
              required
              name=''
              placeholder="Enter text ..."
            />
          </div>
          </div>
          <div className="form-group row   mb-3">
            <label className="control-label rounded-0 col-sm-4" htmlFor="fieldone">
     Overlay Requirement (optional)
            </label>
            <div className="col-lg-8 col-sm-12">
              {/* <textarea
                className="form-control shadow-sm rounded-0"
                col={9}
                
                placeholder="This is text area"
                defaultValue={""}
              /> */}
                 <ReactQuill theme="snow" name="overlay" required="true" className='shadow-sm' onChange={(e)=>Change(e,setOverlay)}/>
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
 

 
    
  )
}

export default AdditionalInfo