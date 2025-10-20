import React from 'react'
import Purchase from './Purchase'
import { Tab, Tabs } from 'react-bootstrap'
import './filtering.css'


const Quots = () => {
    return (
        <>
        <div className='col-lg-11 col-md-5 col-sm-5 border p-3 text-dark'>
         <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 w-100"
    >
      <Tab eventKey="home" title="Quots">
        <Purchase />
      </Tab>
      <Tab eventKey="profile" title="Purchase">
      <Purchase />
      </Tab>
    </Tabs>
    </div>
            
        </>
    )
}

export default Quots