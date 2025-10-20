import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Baseurl from '../../../../Baseurl';
import Button from '../LoanOfficer/GlobalComponent/Button';

const AddLender = () => {
    const token = useSelector((state) => state.auth.auth.idToken);


    const [error, setError] = useState('')
    // const [Id, setId] = useState('')
    const [lender_name, setLender_name] = useState([])
    const [is_quotable, setIs_quotable] = useState('')
    const [lender_tier, setLender_tier] = useState('')
    const [lender_Type, setLender_Type] = useState('')
    const [alias, setalias] = useState('')


    const handleStore = () => {
        const formdata = new FormData()
        formdata.append('lender_name', lender_name)
        formdata.append('is_quotable', is_quotable ? 1 : 0)
        formdata.append('lender_type', lender_Type)
        formdata.append('lender_tier', lender_tier)
        formdata.append('alias', alias)
        var config = {
            method: "post",
            url: `${Baseurl.baseurl}add/lender`,
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


    const handleCheckbox = (event) => {
        const { checked } = event.target;
        if (checked) {
            setIs_quotable(true);
        }
        else {
            setIs_quotable(false);
        }
    }
    const handleChange = (SetState) => (e) => {
        SetState(e.target.value);
    }

    const handleLink = () => {
        setalias(`https://${alias}.com`)
    }
    return (
        <>
            <div class="container">
                <div class="row mt-4 ">
                    <div class="col-lg-4 mt-5">
                        <label for="inputPassword6" class="col-form-label">lender name</label>
                    </div>
                    <div class="col-lg-8 mt-5">
                        <input type="text" class="form-control rounded-0  bg-white" id="exampleFormControlInput1" placeholder="enter your lender_name" onChange={handleChange(setLender_name)} />
                        {error?.lender_name && (
                            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                                {error?.lender_name}
                            </span>
                        )}
                    </div>
                    <div class="col-lg-4 mt-5">
                        <label for="inputPassword6" class="col-form-label">lender Type</label>
                    </div>
                    <div class="col-lg-8 mt-5">
                        <select class="form-select rounded-0 p-3" aria-label="Default select example" onChange={handleChange(setLender_Type)} >
                            <option value="">Open this select menu</option>
                            <option value="wholesale">wholesale</option>
                            <option value="correspondent">correspondent</option>
                        </select>
                        {error?.lender_type && (
                            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                                {error?.lender_type}
                            </span>

                        )}
                    </div>
                    <div class="col-lg-4 mt-5">
                        <label for="inputPassword6" class="col-form-label"></label>
                    </div>
                    <div class="col-lg-8 mt-5">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleCheckbox} />
                            <label class="form-check-label" for="flexCheckDefault">
                                is quotable
                            </label>
                        </div>
                        {error?.lender_type && (
                            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                                {error?.lender_type}
                            </span>

                        )}
                    </div>
                    <div class="col-lg-4 mt-5">
                        <label for="inputPassword6" class="col-form-label">lender tier</label>
                    </div>
                    <div class="col-lg-8 mt-5">
                        <input type="number" class="form-control rounded-0 " id="exampleFormControlInput1" placeholder="enter your lender_tier" onChange={handleChange(setLender_tier)} />
                        {error?.lender_tier && (
                            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                                {error?.lender_tier}
                            </span>

                        )}
                    </div>
                    <div class="col-lg-4 mt-5">
                        <label for="inputPassword6" class="col-form-label">alias</label>
                    </div>
                    <div class="col-lg-8 mt-5">
                        <div class="input-group">
                            <span class="input-group-text text-lowercase p-2 rounded-0 shadow-sm" type="button" style={{ fontSize: "10px" }} id="basic-addon3" onClick={handleLink}>type name and ganerate Link</span>
                            <input type="text" value={alias} class="form-control rounded-0" onChange={handleChange(setalias)} id="basic-url" placeholder="enter your alias" />
                        </div>
                        {error?.alias && (
                            <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                                {error?.alias}
                            </span>

                        )}
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

        </>
    )
}

export default AddLender