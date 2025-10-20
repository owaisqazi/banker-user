/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import  Buttonglobal  from "./GlobalComponent/Button";

const MilitaryService = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [loader, setLoader] = useState(false);
  const [error, seterror] = useState(0);
  const Token = useSelector((state) => state.auth.auth.idToken);

  const [ever_serve, setever_serve] = useState(false);
  const [id, setid] = useState(null);
  const [active_duty, setactive_duty] = useState(false);
  const [retired_from_service, setretired_from_service] = useState(false);
  const [non_activated, setnon_activated] = useState(false);
  const [surviving_spouse, setsurviving_spouse] = useState(false);
  const [expiray_date, setexpiray_date] = useState('');

  const handleadded = () => {
    const formdata = new FormData();
    formdata.append("application_id", item.id);
    formdata.append("borrower_id", borrowerid);
    formdata.append("ever_serve", ever_serve ? 1 : 0);
    {
      id && formdata.append("id", id);
    }

    formdata.append("active_duty", active_duty ? 1 : 0);
    formdata.append("retired_from_service", retired_from_service ? 1 : 0);
    formdata.append("non_activated", non_activated ? 1 : 0);
    formdata.append("surviving_spouse", surviving_spouse ? 1 : 0);
    formdata.append("expiray_date", expiray_date || "");

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/military/service/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data, "###>>>11222");
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
        handlegett()

        seterror("");

        // setever_serve(0);
        // setactive_duty(0);
        // setretired_from_service(0);
        // setnon_activated(0);
        // setsurviving_spouse(0);
        // setexpiray_date("");
      })
      .catch((error) => {
        seterror(error?.response?.data?.errors);
        console.log(error, "###>>>1122");
        setLoader(false);
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

  const handlegett = () => {

    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    console.log(borrowerid.id, "formdata");
    setLoader(true)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/military/service/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setLoader(false)
        console.log(response?.data, ">>>11222");
        setever_serve(response?.data?.data?.ever_serve == 1 ? true : false || "");
        setid(response?.data?.data?.id || "");
        setactive_duty(response?.data?.data.active_duty == 1 ? true : false || "");
        setretired_from_service(
          response?.data?.data?.retired_from_service == 1 ? true : false
         || "");
        setnon_activated(
          response?.data?.data?.non_activated == 1 ? true : false
         || "");
        setsurviving_spouse(
          response?.data?.data?.surviving_spouse == 1 ? true : false
         || "");
        setexpiray_date(response?.data?.data?.expiray_date || "");

        // setbroker(response.data.data.broker_agreement_asset)
        // setapplication_id(response.data.data.broker_agreement_personal_info?.application_id)
        // setborrower_id(response.data.data.broker_agreement_personal_info?.borrower_id)S

        console.log(response?.data?.data, "response12333");

        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title: response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      })
      .catch((error) => {
        console.log(error, "error122");
        seterror(error?.response?.data?.errors);
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "error",
        //   title: error?.response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      });
  };

  useEffect(() => {
    handlegett();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    {loader ? <div className="loader"></div> : null}
      <div className="row">
        <h2 className="mt-1 mb-5">Military Service</h2>
        <h5
          className="font266 my-3"
          style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
        >
          {" "}
          Did you (or your deceased spouse) ever serve, or are you currently
          serving, in the United States Armed Forces?{" "}
        </h5>
        <div className="row mt-4">
          <p className="fontSW29">If you yes check all the apply</p>
          <label class="form-check-label" for="flexCheckDefault">
            Currently serving on active duty with projected expiration date of
            service/tour
          </label>
          <div
            class="btn-group col-lg-2"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="Chapter7"
              autocomplete="off"
              checked={active_duty == 1}
              onChange={() => setactive_duty(1)}
            />
            <label class="btn btn-outline-primary rounded-0 " for="Chapter7">
              Yes
            </label>
            <input
              type="radio"
              class="btn-check"
              name="btnradio"
              id="Chapter12"
              autocomplete="off"
              checked={active_duty == 0}
              onChange={() => setactive_duty(0)}
            />
            <label class="btn btn-outline-primary rounded-0" for="Chapter12">
              No
            </label>
          </div>
          <>
            {/* 
                            <div class="form-check mt-3">
                                <input
                                    class="form-check-input ms-2"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    defaultChecked={active_duty==1}
                                    onChange={() => setactive_duty(1)}
                                />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Currently serving on active duty with projected expiration date of service/tour
                                </label>
                            </div> */}

            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input ms-2"
                id="flexCheckDefault1"
                checked={ever_serve}
                onChange={() => setever_serve(!ever_serve)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                ever serve
              </label>
            </div>

            <div className="form-check mt-3">
              <input
                className="form-check-input ms-2"
                type="checkbox"
                id="flexCheckDefault2"
                checked={retired_from_service}
                onChange={() => setretired_from_service(!retired_from_service)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault2">
                Currently retired, discharged, or separated from service
              </label>
            </div>

            <div className="form-check mt-3">
              <input
                className="form-check-input ms-2"
                type="checkbox"
                id="flexCheckDefault3"
                checked={non_activated}
                onChange={() => setnon_activated(!non_activated)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault3">
                Only period of service was as a non-activated member of the
                Reserve or National Guard
              </label>
            </div>

            <div className="form-check mt-3">
              <input
                className="form-check-input ms-2"
                type="checkbox"
                id="flexCheckDefault4"
                checked={surviving_spouse}
                onChange={() => setsurviving_spouse(!surviving_spouse)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault4">
                Surviving spouse
              </label>
            </div>

            <div class="form-check mt-3">
              <input
                class="form-control ms-2"
                type="date"
                defaultValue={expiray_date}
                onChange={(e) => setexpiray_date(e.target.value)}
              />
              {error?.expiray_date ? (
                <div
                  class="form-check-label text-danger"
                  for="flexCheckDefault"
                >
                  {error?.expiray_date[0]}
                </div>
              ) : null}
            </div>
          </>

          <div className="mt-0">
            <Buttonglobal  handleSubmit={handleadded} btntext={"Submit"}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MilitaryService;
