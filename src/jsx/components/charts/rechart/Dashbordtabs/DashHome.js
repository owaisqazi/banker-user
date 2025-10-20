import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RechartJs from '..';
import User from '../../../table/FilteringTable/User';

const DashHome = () => {
  const [activeTab, setActiveTab] = useState("Charts");

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  return (
    <>
    <Tabs
      activeKey={activeTab}
      onSelect={handleTabSelect}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Charts" title="Charts">
        <RechartJs activeTab={activeTab}/>
      </Tab>
      <Tab eventKey="List" title="List">
        <User />
      </Tab>
    </Tabs>
    </>
  )
}

export default DashHome