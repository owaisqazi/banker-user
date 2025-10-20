/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react'
import Baseurl from '../../../Baseurl';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import Button from './LoanOfficer/GlobalComponent/Button';


const Adddocument = () => {
const [file,setFile]=useState(null)
const [type, setType] = useState('');

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  setFile(selectedFile);
};
const handleTypeChange = (event) => {
  setType(event.target.value);
};
const Token = useSelector((state) => state.auth.auth.idToken);
const {id}=useParams();
const handleSubmit=(event)=>{
  event.preventDefault(); // Prevent the default form submission behavior

const DocumentData = new FormData();
DocumentData.append('file', file); // Add the file to the FormData
DocumentData.append('type', type);
DocumentData.append('lender_id', id); // Add the 'type' value to the FormData

// Add the 'type' value to the FormData

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}add/lender/document`,
      data: DocumentData,
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
    <>
 <div className="container">
 <form className="form-horizontal" onSubmit={handleSubmit} role="form">
    <div className="row">
  
        <div className="col-lg-4 col-md-4 pt-5">
        <label for="exampleFormControlInput1"  className="form-label">file</label>
        </div>
        <div className="col-lg-8 col-md-8 pt-5">
        <div>
  {/* <label for="formFileLg" class="form-label">Large file input example</label> */}
  <input class="form-control form-control-lg rounded-0" onChange={handleFileChange} name='file' id="formFileLg" type="file"/>
</div>
        </div>
        <div className="col-lg-4 col-md-4 pt-5">
        <label for="exampleFormControlInput1"className="form-label">type</label>
        </div>
        <div className="col-lg-8 col-md-8 pt-5">
        <select class="form-select p-3" name='type'  onChange={handleTypeChange}  aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="ordinary">ordinary </option>
  <option value="document">document</option>
</select>
        </div>
        <div class="row align-items-start pt-5">
          <div className='col-lg-4 mb-4 pt-4 mx-auto'>
                        <div className='text-start'>
                       <Button btntext={"Submit"} />
                        </div>
                    </div>
        </div>
   
    </div>
    </form>
 </div>
    </>
  )
}

export default Adddocument  