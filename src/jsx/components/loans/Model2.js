/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BsPersonFill } from 'react-icons/bs'
import Baseurl from '../../../Baseurl';
import { useSelector } from 'react-redux';
const Model2 = (props) => {
  // console.log(id,"modal2")
  const profileData = [
    {
      username: 'MosoDev',
      date: '6/25/2023 6:32:41',
    },
    // Add more profile data items as needed
  ];

  const changesData = [
    {
      title: 'Broker Compensation (1 record:)',
      records: [
        {
          licenseState: '[SC,MD,NC,ID,NH,TN,UT,DC,AZ,MI,OR,CA,CO,GA,IL,VA,PA,TX,FL]',
          compensationInAgreement: '2.5',
          compensation: '2.5',
          flatProcessingFee: '0.0',
          minimumCompensation: '2500.0',
          maximumCompensation: '20000.0',
        },
        // Add more records as needed
      ],
    },
    // Add more changes data items as needed
  ];
  // setLenderid(id)
  const lenderid = props.id;

  const [error, setError] = useState('');
  const [data, SetData] = useState([]);
  const [dataLenders, SetDataLenders] = useState([]);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handleget = () => {
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/lender/audit/file/${lenderid}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "response12122")
        SetData(response?.data?.data)
        SetDataLenders(response?.data?.data?.lender)
      })
      .catch((error) => {
        console.log(error)
        setError('')
      })
  }

  useEffect(() => {
    // Only call handleget if LenderId is available and not null/undefined
    if (lenderid !== null && lenderid !== undefined) {
      handleget();
    }
  }, [lenderid]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            HISTORY
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row ' style={{
            borderBottom: "1px solid lightgray"
          }}>
            <div className='col-lg-2 pb-2'>
                <button class="btn btn-outline-primary rounded-0 p-2 shadow" for="btncheck1">resert filter</button>
              </div>
              <div className="col-lg-10 pb-2">
              <div className="input-group shadow">
                <select class="form-select" aria-label="Trang Nguyen" >
                  <option> Lender Change to</option>
                  <option value="one">No</option>

                </select>
              </div>
              </div>
            </div>
          <div className='row p-2' style={{
            borderBottom: "1px solid lightgray"
          }} >
            <div className='col-md-6'>
              <h6>Update User Avater</h6>
             <p className='text-dark fw-bold'>company_id: {dataLenders?.lender_name}</p>
             {/* <p className='text-dark fw-bold'>company_id: {dataLenders?.company_id}</p> */}
             <p className='text-dark fw-bold'>is_approved: {dataLenders?.is_approved}</p>
             <p className='text-dark fw-bold'>is_quotable: {dataLenders?.is_quotable}</p>
             <p className='text-dark fw-bold'>tbd_underwriting: {dataLenders?.tbd_underwriting}</p>
             <p className='text-dark fw-bold'>lock_cut_off: {dataLenders?.lock_cut_off}</p>
             <p className='text-dark fw-bold'>lender_tier: {dataLenders?.lender_tier}</p>
             <p className='text-dark fw-bold'>alias: {dataLenders?.alias}</p>
             <p className='text-dark fw-bold'>note: {dataLenders?.note}</p>
             <p className='text-dark fw-bold'>lender_tier: {dataLenders?.lender_type}</p>
            </div>
            <div className='col-md-6'>
              <h6>Changes</h6>
              <p className='text-dark fw-bold'>minimum_compensation: {data?.minimum_compensation}</p>
              <p className='text-dark fw-bold'>maximum_compensation: {data?.maximum_compensation}</p>
              <p className='text-dark fw-bold'>flat_fee: {data?.flat_fee}</p>
            </div>
          </div>
         
        </Modal.Body>
      </Modal>


    </>
  )
}

export default Model2