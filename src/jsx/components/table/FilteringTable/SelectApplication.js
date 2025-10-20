/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import Baseurl from "../../../../Baseurl";

const Model1 = () => {
  const { id } = useParams();
  const [appli_Purchase, setappli_Purchase] = useState([]);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.auth.auth.idToken);

  const GetBorroapplication_id = () => {
    setLoader(true)
    const formdata = new FormData();
    formdata?.append("borrower_id", id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}broker/get/borrowers/apps`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setLoader(false)
        setappli_Purchase(response?.data?.data);
        console.log(response, "Getting application1");
        localStorage.setItem("borrower_id",id)
        if (response?.data?.status === true) {
          Swal.fire({
            showCloseButton: true,
            toast: true,
            icon: "success",
            title: response?.data?.message,
            animation: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      })
      .catch(function (error) {
        setLoader(false)
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "error",
          title: error?.response?.data?.message,
          animation: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      });
  };

  useEffect(() => {
    GetBorroapplication_id();
  }, []);

  return (
    <>
        {loader ? <div className="loader"></div> : null}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Application Id</th>
            <th scope="col">Select Application</th>
            <th scope="col">Upload Document</th>
            <th scope="col">Document View</th>
          </tr>
        </thead>
        <tbody>
          {appli_Purchase?.mortgage_purchase&&
              (appli_Purchase?.mortgage_purchase?.map((item) => (
            <>
            <tr>
            <td> {item?.id} </td>
            <td>
            <Link to={`/LoanOfficer/${item.id}`}>
            {item.id?"Purchase":null}
            </Link>
            </td>
            <td>
            <div className="text-start px-5"><Link to={`/DocumentUpload/${item.id}`} >
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa fa-download"></i>
            </button>
            </Link></div>
            </td> 
            <td>
            <div className="text-start px-5"><Link to={`/Documents/${item.id}`}>
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa  fa-solid fa-file-invoice "></i>
            </button>
            </Link>
           </div>
            </td>
            </tr>
            </>
              )))
          }
          {appli_Purchase?.mortgage_refinance&&
              (appli_Purchase?.mortgage_refinance?.map((item) => (
            <>
            <tr>
            <td> {item?.id} </td>
            <td>
            <Link to={`/LoanOfficer/${item.id}`}>
            {item.id?"Refinance":null}
            </Link>
            </td>
            <td>
            <div className="text-start px-5"><Link to={`/DocumentUpload/${item.id}`} >
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa fa-download"></i>
            </button>
            </Link></div>
            </td> 
            <td>
            <div className="text-start px-5"><Link to={`/Documents/${item.id}`}>
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa  fa-solid fa-file-invoice "></i>
            </button>
            </Link>
           </div>
            </td>
            </tr>
            </>
              )))
          }
          {appli_Purchase?.real_estate_rent_tenant&&
              (appli_Purchase?.real_estate_rent_tenant?.map((item) => (
            <>
             <tr>
            <td> {item?.id} </td>
            <td>
            <Link to={`/LoanOfficer/${item.id}`}>
            {item.id?"Tenant":null}
            </Link>
            </td>
            <td>
            <div className="text-start px-5"><Link to={`/DocumentUpload/${item.id}`} >
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa fa-download"></i>
            </button>
            </Link></div>
            </td> 
            <td>
            <div className="text-start px-5"><Link to={`/Documents/${item.id}`}>
            <button className="btn btn-primary shadow btn-xs sharp">
            <i class="fa  fa-solid fa-file-invoice "></i>
            </button>
            </Link>
           </div>
            </td>
            </tr>
            </>
              )))
          }
        </tbody>
      </table>
    </>
  );
};

export default Model1;
