/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import {AiFillPlusCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Baseurl from '../../../../Baseurl';
import { useSelector } from 'react-redux';
import ButtonGlobal from '../LoanOfficer/GlobalComponent/Button';
import Swal from 'sweetalert2';
const LockPolicies = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [modalData, setModalData] = useState({}); // Initialize modalData as an empty object
  const [tableData, setTableData] = useState([ 
 

  // Add more table data here...
]);
const [formData, setFormData] = useState({}); // State to handle form data

const [editingData, setEditingData] = useState({}); // To keep track of the currently edited data

const [lockCutOff1,setLockCutOff]=useState('')
const [lockCutOff2,setLockCutOff2]=useState('')
const [lockCutOff3,setLockCutOff3]=useState('')
const[lockShop,setLockShop]=useState('')
const[lockExtenstion,setLockExtension]=useState('')
const[relock,setRelock]=useState('')
const [name,setName]=useState('')
const [loantype,setLoanType]=useState('')
const [value,setValue]=useState('')
const[error,setError]=useState()


const handleChange2=(e)=>{
  const { name, value } = e.target;
  switch (name) {
    case 'lock_cut_of[0]':
    setLockCutOff(value)
      break;
    case 'lock_cut_of[1]':
 setLockCutOff2(value)
      break;
    case 'lock_cut_of[2]':
    setLockCutOff3(value)
      break;
    case 'lock_shop':
    setLockShop(value)
      break;
    case 'lock_extension':
    setLockExtension(value)
      break;
    case 're_lock':
    setRelock(value)
      break;

      default:
        break;
    }
  };


const handleChange = (event,state) => {
  // Update form data state when form inputs change
  const {name,value}=event.target
  state(value)
  
//   switch (name) {
//     case 'name':
//     setName(value)
//       break;
//     case 'loan_type':
//  setLoanType(value)
//       break;
//     case 'value':
//     setValue(value)
//       break;
  
//       default:
//         break;
//     }

  setFormData({ ...formData, [event.target.name]: event.target.value });

};


const handleTableRowClick = (rowData) => {
  setModalData(rowData);
  setEditingData(rowData); // Set editingData state when clicking on a row to edit
  setShow(true);
};


const handleModalSubmit = (formData) => {


  const newRow = {
    ...formData,
    id: Date.now(), 
  };
  setTableData((prevTableData) => [...prevTableData, newRow]);

  // Close the modal
  setShow(false);
};
const Token = useSelector((state) => state.auth.auth.idToken);


const handleSubmit = (e) => {
  e.preventDefault();
  // Call the handleModalSubmit function with the form data
  handleModalSubmit(formData);
};

  // Update the tableData state by adding the new row

  const handleSubmitMain = (event) => {
    event.preventDefault(); 

    const  {id}=props
console.log(id)
    const lockpolicy = new FormData(); // Get the form data
  lockpolicy.append("lock_cut_of[0]",lockCutOff1)
  lockpolicy.append("lock_cut_of[1]",lockCutOff2)
  lockpolicy.append("lock_cut_of[2]",lockCutOff3)
  lockpolicy.append("lender_id",id)
  lockpolicy.append("lock_shop",lockShop)
lockpolicy.append("lock_extension",lockExtenstion)
  lockpolicy.append("re_lock",relock)


    var config = {
      method: "post",
      url: `${Baseurl.baseurl}add/lender/lock/policy`,
      data: lockpolicy,
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
    }).catch((err)=>{
      console.log(err)
      setError(err?.response?.data?.errors)
      console.log(error+"error")

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
  const handleget = () => {
const {id} =props
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/lender/lock/policy/${id}`,
     
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
    .then(function (response) {
setLockCutOff(response?.data?.data?.lock_cut_of)
setLockExtension(response?.data?.data?.lock_extension)
setLockShop(response?.data?.data?.lock_shop)
setRelock(response?.data?.data?.re_lock)



    }).catch((err)=>{
      setError(err)
    })
  }
  const SubmitFee=(event)=>{
 
    event.preventDefault(); 
    const  {id}=props
    const lockFee=new FormData();
    lockFee.append("name",name)
    lockFee.append("loan_type",loantype)
    lockFee.append("value",value)
    lockFee.append("lender_id",id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}add/lender/lock/policy/fee`,
      data: lockFee,
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
  useEffect(()=>{
    handleget()
  },[])



  
  return (


    <div className="container">

    <form className="form-horizontal" role="form">
      <div className="row">
      <div className="form-group row align-items-center mb-3">
      <label className="control-label rounded-0 col-sm-12 col-lg-3" htmlFor="fieldone">
Lock Cut-off
      </label>
      <div className="col-sm-3">
        {/* Select Input 1 */}
        <div className="input-group">
            <select class="form-select shadow-sm" name='lock_cut_of[0]' onChange={handleChange2} aria-label="Trang Nguyen" >
              <option> yes</option>
              <option value="one">No</option>
         
            </select>
            <div>
      {error &&
        Object.keys(error).map((key) => (
          <span key={key} className='error-container text-danger fw-normal fs-6 col-lg-12'>
            {error[key][0]}
          </span>
        ))}
    </div>
            {/* {error?.lock_cut_of[0]&& (
            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
              {error?.lock_cut_of[0]}
            </span>

          )} */}
          </div>
   </div>
        <div className="col-sm-3">
        <div className="input-group">
            <select class="form-select shadow-sm" name='lock_cut_of[1]' onChange={handleChange2} aria-label="Trang Nguyen" >
              <option> yes</option>
              <option value="one">No</option>
         
            </select>
            <div>
      {error &&
        Object.keys(error).map((key) => (
          <span key={key} className='error-container text-danger fw-normal fs-6 col-lg-12'>
            {error[key][0]}
          </span>
        ))}
    </div>
          </div>
        </div>
       
        <div className="col-sm-3" style={{
            borderRadius:"0px"
        }}>
        <div className="input-group">
            <select class="form-select shadow-sm" name='lock_cut_of[2]' onChange={handleChange2} aria-label="Trang Nguyen" >
              <option> yes</option>
              <option value="one">No</option>
         
            </select>
            {/* {error?.lock_cut_of[2]&& (
            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
              {error?.lock_cut_of[2]}
            </span>

          )} */}
                <div>
      {error &&
        Object.keys(error).map((key) => (
          <span key={key} className='error-container text-danger fw-normal fs-6 col-lg-12'>
            {error[key][0]}
          </span>
        ))}
    </div>
          </div>
        </div>
     
            
            </div>
            <div className="form-group row align-items-center   mb-3">
            <label className="control-label rounded-0 col-lg-4 col-sm-12" htmlFor="fieldone">
              Lock extension (optional)
            </label>
            <div className="col-lg-8 col-sm-12">
              <textarea
                className="form-control rounded-0 shadow-sm"
                col={30}
                placeholder="This is text area"
                name='lock_extension'
                value={lockExtenstion}
                onChange={handleChange2}
                defaultValue={""}
                // onChange={handleChange2(setLock_extension)}
              />
            </div>
          </div>
          <div className="form-group row align-items-center   mb-3">
            <label className="control-label rounded-0 col-lg-4 col-sm-12" htmlFor="fieldone">
              Relock(optional)
            </label>
            <div className="col-lg-8 col-sm-12">
              <textarea
                className="form-control rounded-0 shadow-sm"
                col={30}
                placeholder="This is text area"
                onChange={handleChange2}
                value={relock}
                name='re_lock'
                defaultValue={""}
                // onChange={handleChange2(setRe_lock)}
              />
            </div>
      </div>
      <div className="form-group row align-items-center mb-3">
      <label className="control-label rounded-0 col-lg-4 col-sm-12" htmlFor="fieldone">
Lock & Shop
      </label>
      <div className="col-lg-8 col-sm-12">
        {/* Select Input 1 */}
        <div className="input-group">
            <select class="form-select shadow-sm" name='lock_shop' onChange={handleChange2} value={lockShop} aria-label="Trang Nguyen" >
              <option value="yes"> yes</option>
              <option value="No">No</option>
         
            </select>
          </div>
        </div>
        </div>
        <h3>LENDERFEES</h3>
        <p>Fees (optional)</p>
        <table class="table">
  <thead>
    <tr>
    <Link onClick={handleShow}> <th scope="col" ><AiFillPlusCircle/> Add</th></Link> 
      <th scope="col">Name</th>
      <th scope="col">Loan Type</th>
      <th scope="col">Size</th>
      <th scope="col">value</th>


    </tr>
  </thead>
  <tbody>
  {tableData.map((rowData) => (
            <tr key={rowData.id} onClick={() => handleTableRowClick(rowData)}>
            <th scope="row">{rowData.id}</th>
              <td>{rowData.name}</td>
              <td>{rowData.loanType}</td>
              <td>{rowData.size}</td>
              <td>{rowData.value}</td>
            </tr>
          ))}


        </tbody>
    </table>
 

    <Modal show={show} onHide={handleClose}        
>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name" // Add the name attribute to identify the form field
                placeholder="name"
                autoFocus
                className="rounded-0"
                 // Set the value based on the form data state
                onChange={(e)=>(handleChange(e,setName))} // Handle form input changes
              />

            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Loan Type</Form.Label>
              <Form.Control
                as="textarea"
                name="loan_type" // Add the name attribute to identify the form field
                placeholder="Loan Type"
                className="rounded-0"
              // Set the value based on the form data state
              onChange={(e)=>(handleChange(e,setLoanType))} // Handle form input changes

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Size</Form.Label>
              <Form.Control
                as="textarea"
                name="size" // Add the name attribute to identify the form field
                placeholder="Size"
                className="rounded-0"
                // Set the value based on the form data state
                // onChange={(e)=>(handleChange(e,set))} // Handle form input changes

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Value</Form.Label>
              <Form.Control
                as="textarea"
                name="value" // Add the name attribute to identify the form field
                placeholder="Value"
                className="rounded-0"
              // Set the value based on the form data state
               //andle form input changes
                onChange={(e)=>(handleChange(e,setValue))} // Handle form input changes

              />
              
            </Form.Group>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div className='col-md-4'>
            <Button
              type="submit"
              className="btn btn-secondary"
              onClick={()=>SubmitFee()}
              
            >
              Submit
            </Button>
         
   </div>
        </Modal.Footer>
      </Modal>
            </div>
                    <div className='col-md-8 mb-4'>
                        <div className='text-start'>
                       <ButtonGlobal handleSubmit={handleSubmitMain} btntext={"Submit"} />
                        </div>
                    </div>
   </form>
            </div>
        
       
  )
}

export default LockPolicies