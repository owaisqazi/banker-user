import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import Documents from "./Documents";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

const MainDocument = () => {
  const {id}= useParams()
  const [Loader, setLoader] = useState(false);
  const convertToPdf = async () => {
    setLoader(true);
    const element = document.getElementById("my-component");
    const options = {
        margin: 10,
        filename: "my-component",
        image: { type: "jpeg", quality: 100 },
        html2canvas: {
            letterRendering: true,
            allowTaint: true,
            useCORS: true,
            logging: false,
            scale: 3,
        },
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
    };

    await html2pdf().from(element).set(options).save("my-component");
    setLoader(false);
};


  console.log(id, "loader");
  return (
    <>
      <div className="d-flex justify-content-end pe-auto">
        {Loader ? <div className="loader"></div> : null}
        <Link to={`/LoanOfficer/${id}`}
          style={{
            fontSize: "15px",
            fontWeight: "600",
            borderRadius: "6px",
            color: "white",
            float: "right;",
          }}
          className="btn btn-primary mb-2 rounded mx-2"
          
        >
           &nbsp; Back
          <AiOutlineArrowRight
            style={{ fontSize: "15px", fontWeight: "600", color: "white" }}
          />
          &nbsp;&nbsp;
          <div class="transition"></div>
        </Link>
        <button
          style={{
            fontSize: "15px",
            fontWeight: "600",
            borderRadius: "6px",
            color: "white",
            float: "right;",
          }}
          className="btn btn-primary mb-2 rounded"
          onClick={convertToPdf}
        >
          Download to PDF &nbsp;
          <AiOutlineArrowRight
            style={{ fontSize: "15px", fontWeight: "600", color: "white" }}
          />
          </button>
        </div>
      
      <div id="my-component">
        <Documents />
      </div>
    </>
  );
};

export default MainDocument;