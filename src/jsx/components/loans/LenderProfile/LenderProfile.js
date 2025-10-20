import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { FiAlignJustify } from 'react-icons/fi';
import BasicInfo from './BasicInfo';
import LockPolicies from './LockPolicies';
import ConsultPolicy from './ConsultPolicy';
import AdditionalInfo from './AdditionalInfo';
import { useParams } from 'react-router-dom';

const LenderProfile = () => {
    const [showside, setShowside] = useState(true) 
    const {id}=useParams()
        console.log(id)

    const handleShow = () => {
      setShowside(!showside)
    }
  return (
    <>
     <Tab.Container id="left-tabs-example" defaultActiveKey="Basic_Information">
        <Row>
        <Col md={12}>

               <FiAlignJustify onClick={handleShow} className='BTNset'/>
                                      
        </Col>
          <Col sm={3} className={showside ? "ProSidebar" : "ShowSide"}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="Basic_Information"
                >Basic Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Lock_Policies & Fees">Lock Policies & Fees</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Compensation Policy">Compensation Policy </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Additional_info">Additional info</Nav.Link>
              </Nav.Item>
             
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Basic_Information" >
             <BasicInfo id={id}/>
              </Tab.Pane>
              <Tab.Pane eventKey="Lock_Policies & Fees">
              <LockPolicies id={id}/>
              </Tab.Pane>
              <Tab.Pane eventKey="Compensation Policy">
        <ConsultPolicy id={id}/>
              </Tab.Pane>
              <Tab.Pane eventKey="Additional_info">
        <AdditionalInfo id={id}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <style>

      </style>
 

              </>
  )
}

export default LenderProfile