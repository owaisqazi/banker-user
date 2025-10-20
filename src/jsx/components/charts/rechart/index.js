/* eslint-disable react/jsx-pascal-case */
import React from "react";
// import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import AdminCreation from "./AdminCreation";
import Agent_MloCreation from "./Agent_MloCreation";
import BrokerCreation from "./BrokerCreation";
import CompanyCreation from "./CompanyCreation";
import TeamsCreation from "./TeamsCreation";

function RechartJs({activeTab}) {
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  const counter = useSelector((state) => state);
  console.log(counter, "counter====>");
  return (
    <>
      {Details?.role_id === 1 ? <CompanyCreation activeTab={activeTab}/> : null}
      {Details?.role_id === 2 ? <AdminCreation activeTab={activeTab}/> : null}
      {Details?.role_id === 3 ? <BrokerCreation activeTab={activeTab}/> : null}
      {Details?.role_id === 4 ? <TeamsCreation activeTab={activeTab}/> : null}
      {Details?.role_id === 5 ? <Agent_MloCreation activeTab={activeTab}/> : null}
    </>
  );
}

export default RechartJs;
