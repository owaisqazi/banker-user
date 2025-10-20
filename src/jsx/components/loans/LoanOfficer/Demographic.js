/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Baseurl from "../../../../Baseurl";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import  ButtonGlobal  from "./GlobalComponent/Button";

const Demographic = () => {
  const item = useParams();
  const borrowerid = localStorage.getItem("borrower_id")
  const [loader, setLoader] = useState(false);
  const [American_indian_or_Alaska_native, setAmerican_indian_or_Alaska_native] = useState(0);
  const [asian, setasian] = useState("");
  const [asian_indian, setasian_indian] = useState("");
  const [chinese, setchinese] = useState("");
  const [gender, setGender] = useState(0);
  const [filipino, setfilipino] = useState(0);
  const [japanese, setjapanese] = useState(0);
  const [korean, setkorean] = useState(0);
  const [vietnamese, setvietnamese] = useState("");
  const [other_asian, setother_asian] = useState("");
  const [black_or_african_american, setblack_or_african_american] = useState("");
  const [native_hawaiian_or_pacific_islander, setnative_hawaiian_or_pacific_islander] = useState();
  const [native_hawaiian, setnative_hawaiian] = useState("");
  const [samoan, setsamoan] = useState("");
  const [other_hispanic_or_latino_details, setother_hispanic_or_latino_details] = useState("");
  const [guamanian_or_chamorro, setguamanian_or_chamorro] = useState("");
  const [other_pacific_islander, setother_pacific_islander] = useState("");
  const [white, setwhite] = useState("");
  const [do_not_wish_to_provide_race, setdo_not_wish_to_provide_race] = useState("");
  const [hispanic_or_latino, sethispanic_or_latino] = useState("");
  const [cuban, setcuban] = useState("");
  const [mexican, setmexican] = useState("");
  const [puerto_rican, setpuerto_rican] = useState("");
  const [not_hispanic_or_latino, setnot_hispanic_or_latino] = useState("");
  const [do_not_wish_to_provide_ethnicity, setdo_not_wish_to_provide_ethnicity] = useState("");
  const [other_Hispanic, setother_Hispanic] = useState("");
  const [principal_tribe, setprincipal_tribe] = useState("");
  const [ethivity_on_observation, setethivity_on_observation] = useState("");
  const [race_on_observation, setrace_on_observation] = useState("");
  const [gender_on_observation, setgender_on_observation] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [middle_name, setmiddle_name] = useState("");
  const [face, setface] = useState("");
  const [fax, setfax] = useState("");
  const [telephone, settelephone] = useState("");
  const [Email, setEmail] = useState("");
  const [suffix, setsuffix] = useState("");
  const [other_asian_details, set_other_asian_details] = useState("");
  const [other_pacific_islander_details, setother_pacific_islander_details] = useState("");
  const [Error, setError] = useState();
  const [MainId, setMainId] = useState();
  const Token = useSelector((state) => state.auth.auth.idToken);
  const [borrowerData, setBorrowerData] = useState([]);

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("borrower_id", borrowerid);
    formdata.append("application_id", item.id);
    formdata.append("ethivity_on_observation", ethivity_on_observation? 1 : 0);
    formdata.append("American_indian_or_Alaska_native", American_indian_or_Alaska_native? 1 : 0);
    formdata.append("other_pacific_islander_details", other_pacific_islander_details);
    formdata.append("asian", asian? 1 : 0);
    formdata.append("asian_indian", asian_indian? 1 : 0);
    formdata.append("chinese", chinese? 1 : 0);
    formdata.append("filipino", filipino? 1 : 0); 
    formdata.append("japanese", japanese? 1 : 0);
    formdata.append("korean", korean? 1 : 0);
    formdata.append("vietnamese", vietnamese? 1 : 0);
    formdata.append("other_asian", other_asian? 1 : 0);
    formdata.append("black_or_african_american", black_or_african_american? 1 : 0);
    formdata.append("native_hawaiian_or_pacific_islander", native_hawaiian_or_pacific_islander? 1 : 0);
    formdata.append("native_hawaiian", native_hawaiian? 1 : 0);
    formdata.append("samoan", samoan? 1 : 0);
    formdata.append("guamanian_or_chamorro", guamanian_or_chamorro? 1 : 0);
    formdata.append("other_pacific_islander", other_pacific_islander? 1 : 0);
    formdata.append("white", white? 1 : 0);
    formdata.append("do_not_wish_to_provide_race", do_not_wish_to_provide_race? 1 : 0);
    formdata.append("hispanic_or_latino", hispanic_or_latino? 1 : 0);
    formdata.append("cuban", cuban? 1 : 0);
    formdata.append("mexican", mexican? 1 : 0);
    formdata.append("puerto_rican", puerto_rican? 1 : 0);
    formdata.append("not_hispanic_or_latino", not_hispanic_or_latino? 1 : 0);
    formdata.append("do_not_wish_to_provide_ethnicity", do_not_wish_to_provide_ethnicity? 1 : 0);
    formdata.append("other_Hispanic", other_Hispanic? 1 : 0);
    formdata.append("gender", gender);
    formdata.append("ethivity_on_observation", ethivity_on_observation? 1 : 0);
    formdata.append("race_on_observation", race_on_observation? 1 : 0);
    formdata.append("gender_on_observation", gender_on_observation? 1 : 0);
    formdata.append("principal_tribe", principal_tribe);
    formdata.append("other_asian_details", other_asian_details);
    formdata.append("other_hispanic_or_latino_details", other_hispanic_or_latino_details);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("middle_name", middle_name);
    formdata.append("suffix", suffix);
    formdata.append("face", face? 1 : 0);
    formdata.append("fax", fax? 1 : 0);
    formdata.append("telephone", telephone? 1 : 0);
    formdata.append("Email", Email? 1 : 0);
    {
      MainId && formdata.append("id", MainId);
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/demographic/agreement`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setError("");
        console.log(response?.data, "###>>>");
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
        handleget()
      })
      .catch((error) => {
        setError(error?.response?.data?.errors);
        console.log(Error, "-----------errorsda");

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

  const handleget = () => {
    setLoader(true)
    const fomdata = new FormData();
    fomdata.append("borrower_id", borrowerid);
    fomdata.append("application_id", item.id);
    var config = {
      method: "Post",
      url: `https://bankerbrokerapi.dev-mn.xyz/api/get/demographic/agreement`,
      data: fomdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data?.data?.broker_agreement_demographic,'resdemographic')
        setBorrowerData(
          response?.data?.data?.broker_agreement_demographic === null
            ? response?.data?.data?.borrower_application_demographic
            : response?.data?.data?.broker_agreement_demographic
        );
        setAmerican_indian_or_Alaska_native(response?.data?.data?.broker_agreement_demographic === null
            ? response?.data?.data?.borrower_application_demographic?.American_indian_or_Alaska_native
            : response?.data?.data?.broker_agreement_demographic?.American_indian_or_Alaska_native || "")
        setEmail(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.Email:response.data.data.broker_agreement_demographic?.Email || "")
        setMainId(response?.data?.data?.broker_agreement_demographic?.id || "")
        setasian(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.asian:response.data.data.broker_agreement_demographic?.asian || "")
        setasian_indian(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.asian_indian:response.data.data.broker_agreement_demographic?.asian_indian || "")
        setblack_or_african_american(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic
          ?.black_or_african_american:response.data.data.broker_agreement_demographic?.black_or_african_american || "")
        setchinese(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.chinese:response.data.data.broker_agreement_demographic?.chinese || "")

        setcuban(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.cuban:response.data.data.broker_agreement_demographic?.cuban || "")
          
        setdo_not_wish_to_provide_ethnicity(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.do_not_wish_to_provide_ethnicity
          :response.data.data.broker_agreement_demographic?.do_not_wish_to_provide_ethnicity || "")

        setdo_not_wish_to_provide_race(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.do_not_wish_to_provide_race
          :response.data.data.broker_agreement_demographic?.do_not_wish_to_provide_race || "")

        setethivity_on_observation(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic
          ?.ethivity_on_observation:response.data.data.broker_agreement_demographic?.ethivity_on_observation || "")
          
        setface(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.face:response.data.data.broker_agreement_demographic?.face || "")

        setfax(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.fax:response.data.data.broker_agreement_demographic?.fax || "")
        setfilipino(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.filipino:response.data.data.broker_agreement_demographic?.filipino || "")

        setfirst_name(response?.data?.data?.broker_agreement_demographic?.first_name || "")
        setGender(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.gender:response.data.data.broker_agreement_demographic?.gender || "")

        setgender_on_observation(response?.data?.data?.broker_agreement_demographic?.gender_on_observation?1:0 || "")
        setguamanian_or_chamorro(response?.data?.data?.broker_agreement_demographic?.guamanian_or_chamorro?1:0|| "")

        sethispanic_or_latino(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.hispanic_or_latino:response.data.data.broker_agreement_demographic?.hispanic_or_latino || "")

        setjapanese(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.japanese:response.data.data.broker_agreement_demographic?.japanese || "")
        setkorean(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.korean:response.data.data.broker_agreement_demographic?.korean || "")

        setlast_name(response?.data?.data?.broker_agreement_demographic?.last_name || "")

        setmexican(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.mexican:response.data.data.broker_agreement_demographic?.mexican || "")

        setmiddle_name(response?.data?.data?.broker_agreement_demographic?.middle_name || "")
        setnative_hawaiian(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.native_hawaiian:response.data.data.broker_agreement_demographic?.native_hawaiian || "")
        setnative_hawaiian_or_pacific_islander(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.native_hawaiian_or_pacific_islander
          :response.data.data.broker_agreement_demographic?.native_hawaiian_or_pacific_islander || "")
        setnot_hispanic_or_latino(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.not_hispanic_or_latino:response.data.data.broker_agreement_demographic?.not_hispanic_or_latino || "")
        setother_Hispanic(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.other_Hispanic:response.data.data.broker_agreement_demographic?.other_Hispanic || "")
        setother_asian(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.borrowing:response.data.data.broker_agreement_demographic?.borrowing || "")
        setpuerto_rican(response?.data?.data?.broker_agreement_demographic===null?response.data.data.borrower_application_demographic?.puerto_rican:response.data.data.broker_agreement_demographic?.puerto_rican || "")
        setrace_on_observation(response?.data?.data?.broker_agreement_demographic?.race_on_observation?1:0 || "")

        setsamoan(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.samoan:response.data.data.broker_agreement_demographic?.samoan || "")

        settelephone(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.telephone:response.data.data.broker_agreement_demographic?.telephone || "")
        setwhite(response?.data?.data?.broker_agreement_demographic===null?response.data.data
          .borrower_application_demographic?.white:response.data.data.broker_agreement_demographic?.white || "")
        setvietnamese(response?.data?.data?.broker_agreement_demographic?.vietnamese===null?response.data.data
          .borrower_application_demographic?.vietnamese:response.data.data.broker_agreement_demographic?.vietnamese || "")

        setsuffix(response?.data?.data?.broker_agreement_demographic?.suffix || "")

        set_other_asian_details(response?.data?.data?.broker_agreement_demographic?.other_asian_details || "")
        setother_hispanic_or_latino_details(response?.data?.data?.broker_agreement_demographic?.other_hispanic_or_latino_details || "")

        setother_pacific_islander(response?.data?.data?.broker_agreement_demographic?.other_pacific_islander || "")
        setother_pacific_islander_details(response?.data?.data?.broker_agreement_demographic?.other_pacific_islander_details || "")

        setprincipal_tribe(response?.data?.data?.broker_agreement_demographic?.principal_tribe || "")
        setLoader(false)
        console.log(response, "RESPONSE121212121");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleget();
  }, []);
  return (
    <>
    {loader ? <div className="loader"></div> : null}
      <div className="row mx-3">
        <div className="col-lg-12">
          <h2 className="mt-4">Demographic Information of Borrower</h2>
          <p
            style={{ fontSize: "13px", fontWeight: "400" }}
            className=" lh-base mt-1"
          >
            The purpose of collecting this information is to help ensure that
            all applicants are treated fairly and that the housing needs of
            communities and neighborhoods are being fulfilled. For residential
            mortgage lending, Federal law requires that we ask applicants for
            their demographic information (ethnicity, sex, and race) in order to
            monitor our compliance with equal credit opportunity, fair housing,
            and home mortgage disclosure laws. You are not required to provide
            this information, but are encouraged to do so. You may select one or
            more designations for "Ethnicity" and one or more designations for
            "Race." The law{" "}
            <span className="text-black">
              provides that we may not discriminate
            </span>{" "}
            on the basis of this information, or on whether you choose to
            provide it. However, if you choose not to provide the information
            and you have made this application in person, Federal regulations
            require us to note your ethnicity, sex, and race on the basis of
            visual observation or surname. The law also provides that we may not
            discriminate on the basis of age or marital status information you
            provide in this application. If you do not wish to provide some or
            all of this information, please check below.
          </p>
          <p className="h5 fw-bold mt-5">Ethnicity: Check one or more </p>
          <div class="form-check mb-2 ms-2">
            <input
              class="form-check-input"
              type="checkbox"
            checked={hispanic_or_latino}
              onChange={(e) =>sethispanic_or_latino(!hispanic_or_latino)}
            />

            <label
              style={{ marginLeft: "10px" }}
              class="form-check-label"
              for="American Indian / Alaska Native"
            >
              Hispanic or Latino
            </label>
          </div>

          <div className="row">
            <div className="col-lg-3">
              <div class="form-check mb-2 ms-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={mexican}
                  onChange={(e) =>setmexican(!mexican)}
                />
                <label
                  style={{ marginLeft: "10px" }}
                  class="form-check-label"
                  for="American Indian / Alaska Native"
                >
                  Mexican
                </label>
              </div>
            </div>
            <div className="col-lg-3">
              <div class="form-check mb-2 ms-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={puerto_rican}
                  onChange={(e) =>setpuerto_rican(!puerto_rican)}
                />
                <label
                  style={{ marginLeft: "10px" }}
                  class="form-check-label"
                  for="American Indian / Alaska Native"
                >
                  Puerto Rican
                </label>
              </div>
            </div>
            <div className="col-lg-3">
              <div class="form-check mb-2 ms-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={cuban}
                  onChange={(e) =>setcuban(!cuban)}
                />
                <label
                  style={{ marginLeft: "10px" }}
                  class="form-check-label"
                  for="American Indian / Alaska Native"
                >
                  Cuban
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-check mb-2 ms-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={other_Hispanic}
                  onChange={(e) =>setother_Hispanic(!other_Hispanic)}
                />
                <label
                  style={{ marginLeft: "10px" }}
                  class="form-check-label"
                  for="American Indian / Alaska Native"
                >
                  Other Hispanic or Latino Ã¢â‚¬â€œ Print origin:
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                name="inputField"
                style={{ padding: "12px 10px" }}
                defaultValue={other_hispanic_or_latino_details?other_hispanic_or_latino_details:borrowerData?.other_hispanic_or_latino_details}
                onChange={(e) => setother_hispanic_or_latino_details(e.target.value)}
              />
              <label class="form-check-label" for="exampleRadios1">
                For example: Argentinean, Colombian, Dominican, Nicaraguan,
                Salvadoran, Spaniard, and so o
              </label>
            </div>
              {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.other_hispanic_or_latino_details}
                    </span>
                  ) : null}
            {Error?.["ethnicity.0"] && (
              <span className="Error-container text-danger fw-normal fs-6 col-lg-12">
                {Error?.[`ethnicity.0`][0].replace(/0/g, "")}
              </span>
            )}
            <div className="col-lg-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios11"
                  id="exampleRadios1"
                  checked={not_hispanic_or_latino}
                  onChange={(e) =>setnot_hispanic_or_latino(!not_hispanic_or_latino)}
                />
                <label class="form-check-label" for="exampleRadios1">
                  Not Hispanic or Latino
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios11"
                  id="exampleRadios1"
                  checked={do_not_wish_to_provide_ethnicity}
                  onChange={(e) =>setdo_not_wish_to_provide_ethnicity(!do_not_wish_to_provide_ethnicity)}
                />
                <label class="form-check-label" for="exampleRadios1">
                  I do not wish to provide this information
                </label>
              </div>
            </div>
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.ethnicity}
              </span>
            ) : null}
            <p className="h5 fw-bold mt-5">Sex</p>

            <div className="col-lg-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="Male"
                  onChange={(e) => setGender(1)}
                  checked={gender==1}
                />
                <label class="form-check-label" for="exampleRadios1">
                  Male
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios2"
                  value="Female"
                  checked={gender==2}
                  onChange={(e) => setGender(2)}
                />
                <label class="form-check-label" for="exampleRadios2">
                  Female
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios3"
                  checked={gender==3}
                  onChange={(e) => setGender(3)}
                />
                <label class="form-check-label" for="exampleRadios3">
                  I do not wish to provide this information
                </label>
              </div>
            </div>
            {Error?.gender ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.gender}
              </span>
            ) : null}
            <p className="">
              For example: Argentinean, Colombian, Dominican, Nicaraguan,
              Salvadoran, Spaniard, and so on.{" "}
            </p>
          </div>
          <p className="h5 fw-bold mt-5">Race</p>

          {Error?.race ? (
            <span className="error-container text-danger fw-normal fs-6 col-lg-12">
              {Error.race}
            </span>
          ) : null}
          <div className="row my-3 mx-0 align-items-center">
            <div class="form-check mb-2 ms-2">
              <input
                class="form-check-input"
                type="checkbox"
                id="American Indian or Alaska Native Ã¢â‚¬â€œ Print name of enrolled or principal tribe"
                checked={American_indian_or_Alaska_native?true:false}
                onChange={(e) =>setAmerican_indian_or_Alaska_native(!American_indian_or_Alaska_native)}
              />{console.log(American_indian_or_Alaska_native,'American_indian_or_Alaska_native')}
              <label
                style={{ marginLeft: "10px" }}
                class="form-check-label"
                for="American Indian or Alaska Native Ã¢â‚¬â€œ Print name of enrolled or principal tribe"
              >
                American Indian or Alaska Native Ã¢â‚¬â€œ Print name of enrolled or
                principal tribe
              </label>
            </div>
            <div className="col-lg-12">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                name="inputField"
                style={{ padding: "12px 10px" }}
                onChange={(e) => setprincipal_tribe(e.target.value)}
                defaultValue={principal_tribe}
              />
                {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.principal_tribe}
                    </span>
                  ) : null}
            </div>
            {/*      */}

            <div className="col-lg-6 my-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="Asian"
                  checked={asian}
                  onChange={(e) =>setasian(!asian)}
                />
                &nbsp;
                <label class="form-check-label" for="Asian">
                  Asian
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="Asian Indian"
                  checked={asian_indian}
                  onChange={(e) =>setasian_indian(!asian_indian)}
                
                />
                &nbsp;
                <label class="form-check-label" for="Asian Indian">
                  Asian Indian
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={filipino}
                  onChange={(e) =>setfilipino(!filipino)}
                  id="Filipino"
                />
                &nbsp;
                <label class="form-check-label" for="Filipino">
                  Filipino
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Korean"
                  checked={korean}
                  onChange={(e) =>setkorean(!korean)}
                />
                &nbsp;
                <label class="form-check-label" for="Korean">
                  Korean
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={other_asian}
                  onChange={(e) =>setother_asian(!other_asian)}
                  id="Other Asian"
                />
                &nbsp;
                <label class="form-check-label" for="Other Asian">
                  Other Asian{" "}
                </label>
              </div>
            </div>
            <div className="col-lg-6 my-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Chinese"
                  checked={chinese}
                  onChange={(e) =>setchinese(!chinese)}
                />
                &nbsp;
                <label class="form-check-label" for="Chinese">
                  Chinese
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Japanese"
                  checked={japanese}
                  onChange={(e) =>setjapanese(!japanese)}
                />
                &nbsp;
                <label class="form-check-label" for="Japanese">
                  Japanese
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Vietnamese"
                  checked={vietnamese}
                  onChange={(e) =>setvietnamese(!vietnamese)}
                />
                &nbsp;
                <label class="form-check-label" for="Vietnamese">
                  Vietnamese
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                name="inputField3"
                style={{ padding: "12px 10px" }}
               onChange={(e)=>set_other_asian_details(e.target.value)}
               defaultValue={other_asian_details}
              />
              <label class="form-check-label" for="Other Asian">
                For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so
                on.{" "}
              </label>
            </div>
              {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.other_asian_details}
                    </span>
                  ) : null}
            <div className="col-lg-12 my-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Black Or African American"
                  checked={black_or_african_american}
                  onChange={(e) =>setblack_or_african_american(!black_or_african_american)}
                />
                &nbsp;
                <label class="form-check-label" for="Black Or African American">
                  Black Or African American
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Native Hawaiian or Other Pacific Islander"
                  checked={native_hawaiian_or_pacific_islander}
                  onChange={(e) =>setnative_hawaiian_or_pacific_islander(!native_hawaiian_or_pacific_islander)}
                />
                &nbsp;
                <label
                  class="form-check-label"
                  for="Native Hawaiian or Other Pacific Islander"
                >
                  Native Hawaiian or Other Pacific Islander
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="Native Hawaiian"
                  checked={native_hawaiian}
                  onChange={(e) =>setnative_hawaiian(!native_hawaiian)}
                />
                &nbsp;
                <label class="form-check-label" for="Native Hawaiian">
                  Native Hawaiian
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={guamanian_or_chamorro}
                  onChange={(e) =>setguamanian_or_chamorro(!guamanian_or_chamorro)}
                />
                <label class="form-check-label" for="Guamanian Or Chamorro">
                  Guamanian Or Chamorro{" "}
                </label>
              </div>
            </div>

            <div className="col-lg-12 mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={samoan}
                  onChange={(e) =>setsamoan(!samoan)}
                />
                &nbsp;
                <label class="form-check-label" for="Samoan">
                  Samoan
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id=" Other Pacific Islander Ã¢â‚¬â€œ Print race:"
                  checked={other_pacific_islander}
                  onChange={(e) =>setother_pacific_islander(!other_pacific_islander)}
                />
                &nbsp;
                <label
                  class="form-check-label"
                  for=" Other Pacific Islander Ã¢â‚¬â€œ Print race:"
                >
                  Other Pacific Islander Ã¢â‚¬â€œ Print race:
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <input
                className="form-control rounded-0 shadow-sm inputFont26"
                type="text"
                style={{ padding: "12px 10px" }}
                name="inputField4" // Use "inputField4" instead of "inputfield4"
                onChange={(e) => setother_pacific_islander_details(e.target.value)}
                defaultValue={other_pacific_islander_details}
              />
              <label class="form-check-label" for="Oth">
                For example: Fijian, Tongan, and so on.{" "}
              </label>
            </div>
              {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.other_pacific_islander_details}
                    </span>
                  ) : null}
            <div className="col-lg-12 my-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={white}
                  onChange={(e) =>setwhite(!white)}
                  id="White"
                />
                &nbsp;
                <label class="form-check-label" for="White">
                  White
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="I do not wish to provide this information"
                  checked={do_not_wish_to_provide_race}
                  onChange={(e) =>setdo_not_wish_to_provide_race(!do_not_wish_to_provide_race)}
                />
                &nbsp;
                <label
                  class="form-check-label"
                  for="I do not wish to provide this information"
                >
                  I do not wish to provide this information
                </label>
              </div>
            </div>

            <p className="h5 fw-bold mb-2 mt-3">
              To Be Completed by Financial Institution (for application taken in
              person):
            </p>
            <div className="row">
              <div className="col-lg-9 mt-3">
                Was the ethnicity of the Borrower collected on the basis of
                visual observation or surname?
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-between">
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEwe"
                      id="YEwe"
                      autocomplete="off"
                      onChange={(e) => setethivity_on_observation(1)}
                      defaultChecked={ethivity_on_observation == 1
                          ? "btn btn-outline-primary"
                          : null
                      }
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="YEwe"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEwe"
                      id="Now3s"
                      autocomplete="off"
                      onChange={(e) => setethivity_on_observation(0)}
                      defaultChecked={ethivity_on_observation == 0
                          ? "btn btn-outline-primary"
                          : null
                      }
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="Now3s"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.ethivity_on_observation}
                    </span>
                  ) : null}
              <div className="col-lg-9 mt-3">
                Was the sex of the Borrower collected on the basis of visual
                observation or surname?
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-between">
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEw"
                      id="YEw"
                      defaultChecked={gender_on_observation == 1
                          ? "btn btn-outline-primary"
                          : null
                      }
                      autocomplete="off"
                      onChange={(e) => setgender_on_observation(1)}
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="YEw"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEw"
                      id="Now3"
                      autocomplete="off"
                      onChange={(e) => setgender_on_observation(0)}
                      defaultChecked={gender_on_observation == 0
                        ? "btn btn-outline-primary"
                        : null
                    }
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="Now3"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.gender_on_observation}
                    </span>
                  ) : null}
                  <div className="col-lg-9 mt-3">
                Was the race of the Borrower collected on the basis of visual
                observation or surname?
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-between">
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEwee"
                      id="YEwee"
                      autocomplete="off"
                      onChange={(e) => setrace_on_observation(1)}
                      defaultChecked={race_on_observation == 1
                        ? "btn btn-outline-primary"
                        : null
                    }
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="YEwee"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="col-3 col-md-2 col-lg-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="YEwee"
                      id="Now33"
                      autocomplete="off"
                      onChange={(e) => setrace_on_observation(0)}
                      defaultChecked={race_on_observation == 0
                        ? "btn btn-outline-primary"
                        : null
                    }
                    />
                    <label
                      className="btn btn-outline-primary rounded-0 "
                      for="Now33"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
                  {Error ? (
                    <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                      {Error.race_on_observation}
                    </span>
                  ) : null}
            </div>
            <p className="h5 fw-bold mb-2 mt-3">
              The Demographic Information was provided through:{" "}
            </p>
            <div className="col-lg-8 mt-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="Face-to-Face Interview (includes Electronic Media w/ Video Component"
                  id="Face-to-Face Interview (includes Electronic Media w/ Video Component"
                  checked={face}
                  onChange={(e) =>setface(!face)
                  }
                />
                <label
                  class="form-check-label"
                  for="Face-to-Face Interview (includes Electronic Media w/ Video Component)"
                >
                  Face-to-Face Interview (includes Electronic Media w/ Video
                  Component)
                </label>
              </div>
            </div>
            <div className="col-lg-4 mt-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="Telephone Interview"
                  id="Telephone Interview"
                  checked={telephone}
                  onChange={(e) =>settelephone(!telephone)}
                />
                <label class="form-check-label" for="Telephone Interview">
                  Telephone Interview
                </label>
              </div>
            </div>
            <div className="col-lg-12 mt-2">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name=" Fax or Mail "
                  id=" Fax or Mail "
                  checked={fax}
                  onChange={(e) =>setfax(!fax)}
                />
                <label class="form-check-label" for=" Fax or Mail ">
                  Fax or Mail
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="Email or Internet"
                  id="Email or Internet"
                  checked={Email}
                  onChange={(e) =>setEmail(!Email)}
                />
                <label class="form-check-label" for="Email or Internet">
                  Email or Internet
                </label>
              </div>

              {Error?.information ? (
                <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                  {Error.information}
                </span>
              ) : null}
            </div>
            <span class="input-group-label contact-info-label mt-2 border-0">
              Uniform Residential Loan Application Freddie Mac Form 65 Ã¢â‚¬Â¢
              Fannie Mae Form 1003 Effective 1/2021
            </span>
            <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
              First Name:{" "}
            </h4>
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="first Name"
              style={{ padding: "12px 10px" }}
              onChange={(e) => setfirst_name(e.target.value)} // Simplified onChange handler
              defaultValue={first_name}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.first_name}
              </span>
            ) : null}
            <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
              Last Name:{" "}
            </h4>
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="Last Name"
              style={{ padding: "12px 10px" }}
              onChange={(e) => setlast_name(e.target.value)} // Simplified onChange handler
              defaultValue={last_name}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.last_name}
              </span>
            ) : null}

            <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
              Middile Name:{" "}
            </h4>
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="text"
              placeholder="Middile Name"
              style={{ padding: "12px 10px" }}
              onChange={(e) => setmiddle_name(e.target.value)}
              defaultValue={middle_name}
            />
            {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.middle_name}
              </span>
            ) : null}
            <h4 style={{ fontSize: "20" }} className="mt-4 textdark">
              Suffix:{" "}
            </h4>
            <input
              className="form-control rounded-0 shadow-sm inputFont26"
              type="number"
              placeholder="Suffix"
              style={{ padding: "12px 10px" }}
              onChange={(e) => setsuffix(e.target.value)}
              defaultValue={suffix}
          
            />
             {Error ? (
              <span className="error-container text-danger fw-normal fs-6 col-lg-12">
                {Error.suffix}
              </span>
            ) : null}
            <div className="mt-0 ps-0">
              <ButtonGlobal handleSubmit={handleSubmit} btntext={"Submit"}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demographic;