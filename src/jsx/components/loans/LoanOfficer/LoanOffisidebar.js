/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "../../AppsMenu/AppProfile/AppProfile.css"
import { FiAlignJustify } from 'react-icons/fi';
import PersonalInfo from './PersonalInfo';
import Acknowledgments from './Acknowledgments';
import Income from './Income';
import Assets from './Assets';
import RealState from './RealState';
import LoanproInfo from './LoanproInfo';
import Declaration from './Declaration';
import MilitaryService from './MilitaryService';
import Demographic from './Demographic';
import OriginatorInfo from './OriginatorInfo';
import './Document.css'

const LoanOffisidebar = () => {
  const [showside, setShowside] = useState(true) 
  // const [appli_id, setappli_id] = useState('') 
  const handleShow = () => {
    setShowside(!showside)
  }
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="PersonalInfo">
        <Row>
        <Col md={12}>

               <FiAlignJustify onClick={handleShow} className='BTNset'/>
                                      
        </Col>
          <Col sm={3} className={showside ? "ProSidebar" : "ShowSide"} >
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="PersonalInfo">Personal Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Income">Income</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Assets">Assets</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="RealState">Real State</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="LoanproInfo">Loan Property Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Declaration">Declaration</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Acknowledgments">Acknowledgments</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="MilitaryService">MilitaryService</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Demographic">Demographic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="OriginationInfo">Loan Originator Info</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="Documents">Document</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col lg={9} md={12} sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="Acknowledgments" >
                <Acknowledgments  />
              </Tab.Pane>  
              <Tab.Pane eventKey="PersonalInfo">
                <PersonalInfo  />
              </Tab.Pane>
              <Tab.Pane eventKey="Income">
                <Income  />
              </Tab.Pane>
              <Tab.Pane eventKey="Assets">
                <Assets  />
              </Tab.Pane>
               <Tab.Pane eventKey="RealState">
                <RealState  />
              </Tab.Pane>
               <Tab.Pane eventKey="LoanproInfo">
                <LoanproInfo  />
              </Tab.Pane>
             <Tab.Pane eventKey="Declaration">
                <Declaration  />
              </Tab.Pane>
               <Tab.Pane eventKey="MilitaryService"> 
                <MilitaryService  />
              </Tab.Pane>
            <Tab.Pane eventKey="Demographic">
                <Demographic  />
              </Tab.Pane>
             <Tab.Pane eventKey="OriginationInfo">
                <OriginatorInfo  />
              </Tab.Pane>
             {/* <Tab.Pane eventKey="Documents">
                <MainDocument />
              </Tab.Pane> */}
            </Tab.Content> 
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default LoanOffisidebar