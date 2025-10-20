/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Baseurl from '../../../../Baseurl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../LoanOfficer/GlobalComponent/Button';

const LenderContact = () => {
    const token = useSelector((state) => state.auth.auth.idToken);
    const {id}=useParams()
        console.log(id)

    const [error, setError] = useState('')
    // const [Id, setId] = useState('')
    const [full_name, setFull_name] = useState([])
    const [title, setTitle] = useState('')
    const [company_phone, setCompany_phone] = useState('')
    const [email, setEmail] = useState('')
    // const [lender_id, setLender_id] = useState('')


    const handleStore = () => {
        const formdata = new FormData()
        formdata.append('full_name', full_name)
        formdata.append('title', title)
        formdata.append('company_phone', company_phone)
        formdata.append('email', email)
        formdata.append('lender_id', id)
        // if (Id != null) {
        //     formdata.append('id', Id ? Id : null)
        // }
        var config = {
            method: "post",
            url: `${Baseurl.baseurl}add/lender/contact/information`,
            data: formdata,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
        axios(config)
            .then(function (response) {
                console.log(response, "hyyyhyy");
                // setId(response?.data?.data?.id)
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
                console.log(error)
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
 const handleChange=(setstate)=>(e)=>{
    setstate(e.target.value);
 }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='row'>
                        <div className='col-lg-4 pt-5'>
                        <label for="exampleFormControlInput1" class="form-label">Full name</label>
                        </div>
                        <div className='col-lg-8 pt-5'>
                        <input type="text" class="form-control rounded-0" placeholder="enter your Full name" aria-label="enter your" aria-describedby="addon-wrapping" onChange={handleChange(setFull_name)}/>
                        </div>
                        <div className='col-lg-4 pt-5'>
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        </div>
                        <div className='col-lg-8 pt-5'>
                        <input type="text" class="form-control rounded-0" placeholder="enter your Title" aria-label="enter your" aria-describedby="addon-wrapping" onChange={handleChange(setTitle)}/>
                        </div>
                        <div className='col-lg-4 pt-5'>
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        </div>
                        <div className='col-lg-8 pt-5'>
                        <input type="email" class="form-control rounded-0" placeholder="enter your Email address" aria-label="enter your" aria-describedby="addon-wrapping" onChange={handleChange(setEmail)}/>
                        </div>
                        <div className='col-lg-4 pt-5'>
                        <label for="exampleFormControlInput1" class="form-label">Company Phone</label>
                        </div>
                        <div className='col-lg-8 pt-5'>
                        <input type="number" class="form-control rounded-0" placeholder="enter your Company Phone" aria-label="enter your" aria-describedby="addon-wrapping" onChange={handleChange(setCompany_phone)}/>
                        </div>
                    <div className='col-md-4 mb-4'>
                    </div>
                    <div className='col-md-8  mb-4'>
                        <div className='text-start'>
                       <Button handleSubmit={handleStore} btntext={"Submit"} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LenderContact