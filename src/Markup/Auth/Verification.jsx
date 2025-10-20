/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Baseurl from "../../Baseurl";
import Footer from "../Layout/Footer";

const Verification = () => {
  const [loader, setLoader] = useState(false);
  let { id, subid } = useParams();
  console.log(subid, id, "key");
  const [Status, setStatus] = useState([]);
  const Verfiycode = () => {
    const Data = new FormData();
    Data.append("code", subid);
    Data.append("user_id", id);
    setLoader(true);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}borrower/verification`,
      data: Data,
    };
    axios(config)
      .then(function (response) {
        setLoader(true);
        console.log(response);
        setStatus(response.data.status);
        localStorage.clear();
        console.log(response?.data?.data);
        if (response.data.status === true) {
          setLoader(false);
          Swal.fire({
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
        } else {
          setLoader(false);
          Swal.fire({
            toast: true,
            icon: "error",
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
        }
      })
      .catch(function (error) {
        setLoader(false);
        Swal.fire({
          toast: true,
          icon: "error",
          title: error?.response?.data?.errors.code.map((e) => e),
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
    Verfiycode();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <>{loader ? <div className="loader"></div> : null}</>

      <section
        className="bg-light h-auto"
        style={{ height: window.screen.height }}
      >
        <div className="container-fluid " style={{ maxWidth: "80%" }}>
          <div className="row">
            <div className="card custom_card bg-white my-5 ">
              <div className="row">
                {/* ) : ( */}
                <div className="col-md-12">
                  <div className="my-3 ">
                    <div className="row mt-3">
                      {Status === true ? (
                        <div className="col-md-6">
                          <img
                            className="mx-5 mt-3 w-auto"
                            width={"100%"}
                            height={400}
                            src="https://cdn-icons-png.flaticon.com/512/2808/2808284.png"
                            alt="ok"
                          />
                        </div>
                      ) : (
                        <div className="col-md-6">
                          <img
                            className="mx-5 mt-3 w-auto"
                            width={"100%"}
                            height={400}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyBTgNEdEnwUq1X87VIoECa5aBcvUVVxOqBQ&s"
                            alt="ok"
                          />
                        </div>
                      )}
                      <div className="col-lg-6 my-auto">
                        <h3>
                          User {" "}
                          <strong className={`${Status===true ?"text-success":"text-danger"}`}>{Status === true ? "verified ✔" : "Unverified" }</strong>
                        </h3>
                        <h3>Your Email hes been {Status === true ? "verified" : "Unverified please check email and try again" }</h3>
                        <Link
                          to={"/Borrower/Login"}
                          className="btn btn-primary w-auto ms-3"
                        >
                          Back to Login &nbsp;
                          {/* <i className="fa fa-arrow-right"></i>*/}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Verification;
