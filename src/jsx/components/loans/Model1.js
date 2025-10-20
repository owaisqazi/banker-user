/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { AiOutlineReload } from 'react-icons/ai'
// import document from '../../../images/document.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Baseurl from '../../../Baseurl'
const Model1 = (props) => {

  const [DocumentData, setDocumentData] = useState({})

  const LenId=props.id;
  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleget = () => {

    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/lender/document/${LenId}`,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {

        console.log(response)
        setDocumentData(response?.data?.data)
        console.log(DocumentData + "DocumentDa")
      }
      ).catch((err) => {
        console.log(err)
      })
  }


  useEffect(() => {
    // Only call handleget if LenderId is available and not null/undefined
    if (LenId !== null && LenId !== undefined) {
      handleget();
    }
  }, [LenId]); 
  // Your component rendering and other logic here...

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Link to={`/Adddocument/${LenId}`}><Button variant="primary" className='rounded-0'>
            +Add Dcocument
          </Button>
          </Link>
        </Modal.Header>
        <Modal.Body>

          <div className='col-lg-12' >
            <div class="row">
              <div class="col-lg-1 col-md-1 col-sm-1">
                <span class="input-group-text rounded-0 " style={{
                  padding: "13px"
                }} id="basic-addon1"><AiOutlineReload /></span>
              </div>
              <div class="col-lg-11">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2" className='rounded-0 text-primary p-0 shadow'><Button variant="primary" className='rounded-0 p-2 shadow'>resert filter</Button></InputGroup.Text>
                  <Form.Control
                    placeholder=""
                    className='rounded-0 shadow'
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </div>
            </div>
            </div>
            <div className='row'>
            <div className="col-lg-2">
            <div className="text-start pt-3 text-white">sdsdd</div>
              <div className="text-start pt-3">type</div>
              <div className="text-start pt-3">Name:</div>
              <div className="text-start pt-3">Modified date:</div>
              </div>
            <div className="col-lg-8">
            <div className="text-start pt-3"><input
                className="form-check-input"
                type="checkbox"
              /></div>
              <div className="text-start pt-3">{DocumentData?.type}</div>
              <span className='modalsspan'>
              <div className="text-start pt-3">{DocumentData?.image_path}</div>
              <div className="text-start pt-3">{DocumentData?.file}</div>
              </span>
              <div className="text-start pt-3">{DocumentData?.updated_at}</div>
            </div>
            </div>
            
        </Modal.Body>
      </Modal>


    </>
  )
}

export default Model1