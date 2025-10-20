/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Col, Row, Card } from "react-bootstrap";
import Baseurl from "../../../../Baseurl";
import axios from "axios";
import { useSelector } from "react-redux";

const ApexBar2 = () => {
  const [status, setStatus] = useState();
  const token = useSelector((state) => state.auth.auth.idToken);
  console.log(token, "token");
  useEffect(() => {
    // setLoader(true);
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/applications/list/info`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data), "Bar=====>");
        console.log(response, "Bar=====");
        setStatus(response.data.data);
      })
      .catch(function (error) {
        console.log(error, "Getting Compainesss");
      });
  }, []);

  const options = {
    chart: {
      type: "bar",
      height: 230,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#216fed"],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["red"],
      },
    },
    stroke: {
      show: false,
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      categories: [
        "Mortgage Application",
        "Refinance Application",
        "Real Estate Application",
      ],
    },
  };
  const series = [
    {
      name: `Total Application`,
      data: [
        status?.complete_mortgage_purchase_applications,
        status?.complete_mortgage_refinance_applications,
        status?.complete_real_estate_rental_tenant_applications,
      ],
    },
  ];
  return (
    <Row>
      <Col sm={6} xl={6}>
        <Card>
          <Card.Body>
            {" "}
            <div id="chart" className="bar-chart">
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
              />
              {console.log(series,"first")}
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} xl={6}>
        <Card>
          <Card.Body>
            {" "}
            <div id="chart" className="bar-chart">
              <ReactApexChart
                options={options}
                series={series}
                type="radar"
                height={350}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
      <style>
        {`  .apexcharts-menu.apexcharts-menu-open {
    width: max-content;
}`}
      </style>
    </Row>


  );
};

export default ApexBar2;
