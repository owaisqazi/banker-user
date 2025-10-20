import React from "react";
import loadable from "@loadable/component";
// import { Link } from 'react-router-dom';
// import { Row, Col, Card } from "react-bootstrap";

import pMinDelay from "p-min-delay";

// import PageTitle from "../../../layouts/PageTitle";

const ApexBar2 = loadable(() => pMinDelay(import("./Bar2"), 1000));

function ApexChart() {
  return (
    <div className="h-80">
      {/* <PageTitle motherMenu="Charts" activeMenu="ApexChart" /> */}

      <ApexBar2 />
    </div>
  );
}

export default ApexChart;
