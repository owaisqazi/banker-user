import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import BussinessInformation from './BussinessInformation';
import PersonalInformation from './PersonalInformation';
import RolesLicenses from './Roles&Licenses';
import Transactiondefaults from './Transactiondefaults';
import Conpensation from './Conpensation';
import MyPage from './MyPage';
import QuateSattings from './QuateSattings';
import CeditReport from './CeditReport';
import RingCentralExtension from './RingCentralExtension';
import HRDocuments from './HRDocuments';
import ConpanyWebsite from './ConpanyWebsite';
import "./AppProfile.css"
import { FiAlignJustify } from 'react-icons/fi';


const ProfileSIdeBar = () => {
  const [showside, setShowside] = useState(true) 

  const handleShow = () => {
    setShowside(!showside)
  }
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="Personal_Information">
        <Row>
        <Col md={12}>

               <FiAlignJustify onClick={handleShow} className='BTNset'/>
                                      
        </Col>
          <Col sm={3} className={showside ? "ProSidebar" : "ShowSide"}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="Personal_Information"
                >Personal Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Bussiness">Bussiness Information</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Roles">Roles & Licenses</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Transaction">Transaction defaults</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Conpensation">Conpensation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ConpanyWebsite">Conpany Website</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="MyPage">My Page</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Quate">Quate Sattings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Cedit">Cedit Report</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="RingCentralExtension">RingCentral Extension</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="HRDocuments">HR Documents</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Personal_Information" >
                <PersonalInformation />
              </Tab.Pane>
              <Tab.Pane eventKey="Bussiness">
                <BussinessInformation />
              </Tab.Pane>
              <Tab.Pane eventKey="Roles">
                <RolesLicenses />
              </Tab.Pane>
              <Tab.Pane eventKey="Transaction">
                <Transactiondefaults />
              </Tab.Pane>
              <Tab.Pane eventKey="Conpensation">
                <Conpensation />
              </Tab.Pane>
              <Tab.Pane eventKey="ConpanyWebsite">
                <ConpanyWebsite />
              </Tab.Pane>
              <Tab.Pane eventKey="MyPage"> 
                <MyPage />
              </Tab.Pane>
              <Tab.Pane eventKey="Quate">
                <QuateSattings />
              </Tab.Pane>
              <Tab.Pane eventKey="Cedit">
                <CeditReport />
              </Tab.Pane>
              <Tab.Pane eventKey="RingCentralExtension">
                <RingCentralExtension />
              </Tab.Pane>
              <Tab.Pane eventKey="HRDocuments">
                <HRDocuments />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <style>

      </style>
    </>
  );
};

export default ProfileSIdeBar