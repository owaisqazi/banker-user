import React, { useCallback, useEffect, useState } from "react";
import loanProfileimg from "../../../../images/1.jpg";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./AppProfile.css";
import { MdLocationOn, MdOutlineMessage } from "react-icons/md";
// import { TbMessageCircle } from 'react-icons/tb';
import { BsFillTelephoneFill } from "react-icons/bs";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Baseurl from "../../../../Baseurl";
import { useSelector } from "react-redux";
import Select from "react-select";
// import { colourOptions } from '../data';
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import Avatar from "react-avatar-edit";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

const PersonalInformation = () => {
  const token = useSelector((state) => state.auth.auth.idToken);
  const [error, setError] = useState("");

  const options = [
    { value: "america", label: "america" },
    { value: "USA", label: "USA" },
    { value: "USD", label: "USD" },
    { value: "Austria", label: "Austria" },
  ];

  const [datas, SetDatas] = useState({});

  // parsonal_info_state

  const [name, SetName] = useState("");
  // const [lastname, SetLastname] = useState("")
  const [middle_name, SetMiddle_name] = useState("");
  const [peremail, SetPeremail] = useState("");
  const [perphone, SetPerphone] = useState("");
  const [legal, SetLegal] = useState("");
  const [legalName, SetLegalName] = useState("");
  const [marital_status, Setmarital_status] = useState("");
  const [citizenship, SetCitizenship] = useState([]);
  // const [bith, Setbith] = useState("")
  const [note, Setnote] = useState("");
  // const [marketingplan, SetMarketingplan] = useState('')
  const [unit, SetUnit] = useState("");
  const [code, SetCode] = useState("");
  const [city, SetCity] = useState("");
  const [text, SetText] = useState("");
  const [image, setImage] = useState();
  const [password, SetPassword] = useState("");
  const [id, SetId] = useState(null);
  // console.log(citizenship,"=====>")
  // const reff = useRef()
  // const setSmShow = (e) => {
  //   reff.current.click()
  // }
  const handleChange = (SetState) => (e) => {
    SetState(e.target.value);
  };
  const [imgcrop, setImgcrop] = useState("");
  const [smShow, setSmShow] = useState(false);
  // const [storeimg, setStoreimg] = useState([]);

  const Saveimg = (e) => {
    // setStoreimg([...storeimg, { imgcrop }])
    setSmShow(false);
    // const image = URL.createObjectURL(imgcrop);
    setImage(imgcrop);
  };

  const onCrop = (view) => {
    setImgcrop(view);
    setImage(view);
    fetch(view)
      .then((res) => res.blob())
      .then((blob) => {
        console.log("here is your binary: ", blob);

        // now upload it
      });
    console.log(view);
  };
  const onclose = () => {
    setImgcrop(null);
  };
  // const ProfileImg = storeimg.map(item=>item.imgcrop)

  const [value, setValue] = useState("");

  const handleAdd = () => {
    const formdata = new FormData();
    image && formdata.append("image", image);
    formdata.append("first_name", name ? name : datas?.first_name);
    formdata.append("last_name", legalName ? legalName : datas?.last_name);
    formdata.append(
      "middle_name",
      middle_name ? middle_name : datas?.middle_name
    );
    formdata.append(
      "personal_email",
      peremail ? peremail : datas?.personal_email
    );
    formdata.append(
      "personal_phone",
      perphone ? perphone : datas?.personal_phone
    );
    formdata.append(
      "legal_first_name",
      legal ? legal : datas?.legal_first_name
    );
    formdata.append(
      "legal_last_name",
      legalName ? legalName : datas?.legal_last_name
    );
    // console.log(tags)
    tags?.map((e, i) => formdata.append(`preferred_language[${i}]`, e));
    citizenship?.map((e, i) => formdata.append(`citizenship[${i}]`, e.value));
    console.log(citizenship);
    formdata.append("marital_status", marital_status);
    // formdata.append("bith", bith ? bith : datas?.bith)
    formdata.append("marketing_plan", value);
    formdata.append("note", note ? note : datas?.note);
    formdata.append("unit", unit ? unit : datas?.unit);
    formdata.append("zip_code", code ? code : datas?.zip_code);
    formdata.append("city", city ? city : datas?.city);
    formdata.append(
      "loan_officer_production",
      text ? text : datas?.loan_officer_production
    );
    formdata.append("password", password ? password : datas?.password);
    if (id != null) {
      formdata.append("id", id ? id : null);
    }

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/personal/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        window.location.reload();
        // SetId(response.data.data.id)
        console.log(response, "res12");
        setError("");
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
      })
      .catch((error) => {
        setError(error.response.data.errors);
        console.log(error, "errores");
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

  let userDetail = localStorage.getItem("userDetail");
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleget = useCallback(() => {
    const formdata = new FormData();
    formdata.append("user_id", userDetail.id);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/personal/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response?.data, "#########");
        SetId(response?.data?.data?.id);
        SetMiddle_name(response?.data?.data?.middle_name);
        SetName(response?.data?.data?.first_name);
        setValue(response?.data?.data?.marketing_plan);
        // Setmarital_status([...response?.data?.data?.marital_status?.split(",")])
        Setmarital_status(response?.data?.data?.marital_status);
        SetUnit(response?.data?.data?.unit);
        console.log(unit, "unit");
        SetPassword(response?.data?.data?.password);
        setValue(response?.data?.data?.marketing_plan);
        setTags([...response?.data?.data?.preferred_language?.split(",")]);
        // SetCitizenship([...response?.data?.data?.citizenship?.split(",")])

        const countries = response?.data?.data?.citizenship.split(",");
        const state = [];

        for (const country of countries) {
          const countryObject = {
            value: country,
            label: country,
          };
          state.push(countryObject);
        }
        console.log(state, "state");
        SetCitizenship(state);
        // console.log(response?.data?.data?.citizenship,"city")
        SetDatas(response?.data?.data);
        // SetCitizenship(...response?.data?.data?.citizenship?.value)

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
        setError("");
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
  }, [Token, unit, userDetail?.id]);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    handleget();
  }, [handleget]);

  const handleitput = (tags) => {
    setTags(tags);
  };

  const handleSelect = (citizenship) => {
    console.log(citizenship, "......>");
    SetCitizenship(citizenship);
  };
  console.log(citizenship, "......>ds");

  return (
    <>
      <div className="col-lg-12">
        <span className="col-lg-4 d-flex">
          <span>Profile</span>
          <span className="text-muted text-lowercase">
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </span>
        </span>
        <div className="row">
          <p className="col-lg-4 mt-3 text-lowercase text-muted">
            A professional portrait isrequired and must follow rules{" "}
            <Link to={"#"} className="text-primary">
              Here
            </Link>
          </p>
          <div className="col-lg-8">
            {/* <input type='file' ref={reff}  className='d-none' /> */}
            <img
              src={
                imgcrop !== ""
                  ? imgcrop
                  : datas !== null
                  ? `https://bankerbrokerapi.dev-mn.xyz/${datas?.image}`
                  : loanProfileimg
              }
              onClick={() => setSmShow(true)}
              alt=""
              type="file"
              width={150}
              height={150}
              className="profileInfoImg"
            />
            {error?.image && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.image}
              </span>
            )}
            <Modal show={smShow} onHide={() => setSmShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Upload Image
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Avatar
                  width={445}
                  height={400}
                  className="canvas"
                  onClose={onclose}
                  onCrop={onCrop}
                />
                <Button variant="primary" className="mt-3" onClick={Saveimg}>
                  Save
                </Button>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-8 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Full name
          </label>
        </div>

        <div class="col-lg-8 mb-4 pt-4">
          <input
            type="Lastname"
            className="form-control rounded-0"
            defaultValue={datas?.first_name}
            placeholder="full name"
            onChange={handleChange(SetName)}
          />
          {error?.first_name && (
            <div className="error-container text-danger fs-6 fw-normal">
              {error?.first_name}
            </div>
          )}
        </div>
      </div>
      {/* <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">middle name</label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">

          <input type="name" className="form-control rounded-0" defaultValue={datas?.middle_name} placeholder="middle name" onChange={handleChange(SetMiddle_name)} />
          {error?.middle_name && (
            <div className="error-container text-danger fs-6 fw-normal">
              {error?.middle_name}
            </div>
          )}
        </div>
        
      </div> */}
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Personal email
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="input-group mt-3">
            <span className="input-group-text rounded-0">
              <MdOutlineMessage className="fs-3" />{" "}
            </span>
            <input
              type="email"
              className="form-control rounded-0"
              defaultValue={datas?.personal_email}
              placeholder="enter your email"
              onChange={handleChange(SetPeremail)}
            />
            {/* <span className="input-group-text rounded-0">Change</span> */}
          </div>
          {error?.personal_email && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.personal_email}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Personal Phone
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="input-group mt-3">
            <span className="input-group-text rounded-0" id="basic-addon1">
              <BsFillTelephoneFill />{" "}
            </span>
            <input
              type="Number"
              className="form-control rounded-0"
              defaultValue={datas?.personal_phone}
              placeholder="(949)244-1880"
              aria-describedby="basic-addon1"
              onChange={handleChange(SetPerphone)}
            />
          </div>
          {error?.personal_phone && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.personal_phone}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Legal full name
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-3 mb-4 pt-4">
          <div className="input-group">
            <input
              type="name"
              className="form-control rounded-0 w-100"
              defaultValue={datas?.legal_first_name}
              placeholder="fist name"
              onChange={handleChange(SetLegal)}
            />
          </div>
          {error?.legal_first_name && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.legal_first_name}
            </span>
          )}
        </div>
        <div class="col-lg-2 mb-4 pt-4 px-0">
          <input
            type="name"
            className="form-control rounded-0 w-100"
            defaultValue={datas?.middle_name}
            placeholder="middle name"
            onChange={handleChange(SetMiddle_name)}
          />
          {error?.middle_name && (
            <div className="error-container text-danger fs-6 fw-normal">
              {error?.middle_name}
            </div>
          )}
        </div>
        <div class="col-lg-3 mb-4 pt-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-0 w-100"
              defaultValue={datas?.legal_last_name}
              placeholder="last name"
              onChange={handleChange(SetLegalName)}
            />
            {/* <span className="input-group-text rounded-0"><TbMessageCircle /></span> */}
          </div>
          {error?.legal_last_name && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.legal_last_name}
            </span>
          )}
        </div>
      </div>
      <div className="row ">
        <div className="col-sm-10 d-flex">
          <label
            for="inputPassword"
            className="col-sm-5 col-form-label text-capitalize text-white"
          >
            ddsddsd
          </label>
          <label
            for="inputPassword"
            className="col-sm-8 text-muted text-lowercase"
          >
            Based on your 1-94 Green Card
          </label>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label
            for="inputPassword"
            className=" col-form-label text-capitalize"
          >
            Preferred Languages
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className=" col-sm-5 input-group">
            <TagsInput
              value={tags}
              onChange={handleitput}
              className="form-control rounded-0 tagsInput2"
            />
          </div>
          {error?.preferred_language &&
          error?.preferred_language?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.preferred_language[0]}
            </span>
          ) : null}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4"></div>
        <div class="col-lg-8 mb-4 py-1">
          <label
            for="inputPassword"
            className="col-sm-8 text-muted text-lowercase"
          >
            List all languages that you can speak fluently
          </label>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Marital status
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <select
            class="form-select ms-2 rounded-0 p-2"
            aria-label="Kaylin Pham"
            onChange={handleChange(Setmarital_status)}
          >
            <option>{marital_status}</option>
            <option>Marital Status</option>
            <option value="single">single</option>
            <option value="married">married</option>
            <option value="i don't want to tell you">
              i don't want to tell you
            </option>
          </select>
          {error?.marital_status && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.marital_status}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Citizenship
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={options}
            onChange={handleSelect}
            value={citizenship?.map((e) => ({
              value: e.value,
              label: e.label,
            }))}
            // defaultValue={citizenship}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {error?.citizenship && error?.citizenship?.length >= 0 ? (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.citizenship[0]}
            </span>
          ) : null}
        </div>
      </div>
      {/* <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">Date of bith<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="col-sm-5 input-group">
            <input type="date" className="form-control rounded-0" defaultValue={datas?.first_name} placeholder="Server" onChange={handleChange(Setbith)} />
          </div>
        </div>
      </div> */}
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label
            for="inputPassword"
            className=" col-form-label text-capitalize"
          >
            note
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="col-sm-5 input-group">
            <input
              type="streetaddress"
              className="form-control rounded-0"
              defaultValue={datas?.note}
              placeholder="note"
              onChange={handleChange(Setnote)}
            />
          </div>
          {error?.note && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.note}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label
            for="inputPassword"
            className=" col-form-label text-capitalize"
          >
            Apt/Unit
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="col-sm-5 input-group">
            <input
              type="text"
              className="form-control rounded-0"
              defaultValue={datas?.unit}
              placeholder="Apt/Uni"
              onChange={handleChange(SetUnit)}
            />
          </div>
          {error?.unit && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.unit}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            Zip code
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="col-sm-5 input-group">
            <span className="input-group-text rounded-0">
              <MdLocationOn />{" "}
            </span>
            <input
              type="number"
              class="form-control rounded-0"
              id="validationCustom05"
              defaultValue={datas?.zip_code}
              required
              onChange={handleChange(SetCode)}
            />
          </div>
          {error?.zip_code && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.zip_code}
            </span>
          )}
        </div>
      </div>
      <div className="row ">
        <div className="col-sm-10 d-flex">
          <label
            for="inputPassword"
            className="col-sm-5 col-form-label text-capitalize text-white"
          >
            ddsddsd
          </label>
          <label
            for="inputPassword"
            className="col-sm-8 text-muted text-lowercase"
          >
            Rancho Cucamonga, CA
          </label>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className="col-form-label text-capitalize">
            City
            <span className="text-muted" style={{ fontSize: "10px" }}>
              (optional)
            </span>
          </label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className="col-sm-5 input-group">
            <input
              type="text"
              className="form-control rounded-0"
              id="validationCustom03"
              required
              defaultValue={datas?.city}
              placeholder="Rancho Cucamonga"
              onChange={handleChange(SetCity)}
            />
          </div>
          {error?.fname && (
            <span className="error-container text-danger fw-normal fs-6">
              {error?.fname}
            </span>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm-5 input-group">
          <div className="col-lg-12 p-3 TextEditer w-100">
            {/* <ReactQuill
              theme="snow"
              value={value}
              defaultValue={datas?.value}
              onChange={setValue}
            /> */}
            {/* <input type="text" className="form-control rounded-0" value={datas?.first_name} placeholder="Server" /> */}
          </div>
        </div>
        {error?.marketing_plan && (
          <span className="error-container text-danger fw-normal fs-6">
            {error?.marketing_plan}
          </span>
        )}
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <div className="input-group">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize pe-4"
            >
              Loan officer Production
            </label>
          </div>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 col-lg-8"
          >
            <Tab eventKey="home" title="fullTime">
              <textarea
                class="form-control"
                defaultValue={datas?.loan_officer_production}
                placeholder="Note (optipnal)"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                onChange={handleChange(SetText)}
              ></textarea>

              {error?.loan_officer_production && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.loan_officer_production}
                </span>
              )}
            </Tab>
            <Tab eventKey="profile" title="PartTime">
              <textarea
                class="form-control"
                defaultValue={datas?.loan_officer_production}
                placeholder="Note (optipnal)"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                onChange={handleChange(SetText)}
              ></textarea>

              {error?.loan_officer_production && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.loan_officer_production}
                </span>
              )}
            </Tab>
            <Tab eventKey="profiles" title="IdLe">
              <textarea
                class="form-control"
                defaultValue={datas?.loan_officer_production}
                placeholder="Note (optipnal)"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                onChange={handleChange(SetText)}
              ></textarea>

              {error?.loan_officer_production && (
                <span className="error-container text-danger fw-normal fs-6">
                  {error?.loan_officer_production}
                </span>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
      <span className="col-lg-4 d-flex mt-3">
        <span>Social links</span>
        <span className="text-muted text-lowercase">
          <span className="text-muted" style={{ fontSize: "10px" }}>
            (optional)
          </span>
        </span>
      </span>
      <div className="row">
        <p className="col-lg-3 mt-3 text-lowercase text-muted">
          Reconmment saving your facebook fan page, linkedin page, google my
          Bussiness (to collect rewiews), zillow, yelp, and tiktok
        </p>
        <div className="col-lg-8 col-md-7">
          <button type="button" class="btn btn-dark rounded-0">
            + Add
          </button>
          <table class="table">
            <div>
              <span className="d-flex">
                <p>x</p>
                <p className="col-lg-2 text-lowercase">facebook fanpage</p>
                <p className="col-lg-6 text-lowercase">
                  https://ww.facebook.com/bankerMassey/
                </p>
              </span>
              <span className="d-flex">
                <p>x</p>
                <p className="col-lg-2 text-lowercase">Youtube</p>
                {/* <td colspan="2">https://ww.Youtube.com/@bankerbrokercom/about</td> */}
                <p className="col-lg-6 text-lowercase">
                  https://ww.Youtube.com/@bankerbrokercom/about
                </p>
              </span>
              <span className="d-flex">
                <p>x</p>
                <p className="col-lg-2 text-lowercase">Others</p>
                <p className="col-lg-6 text-lowercase">
                  https://ww.twitter.com/bankerbroker
                </p>
              </span>
            </div>
          </table>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4">
            <label
              for="inputPassword"
              className="col-form-label text-capitalize"
            >
              Password
            </label>
          </div>
          <div class="col-lg-8 mb-4 pt-4">
            <div className="input-group mt-3">
              <input
                type="password"
                autoComplete="new-password"
                className="form-control rounded-0"
                defaultValue={datas?.password}
                placeholder="enter your password"
                onChange={handleChange(SetPassword)}
              />
              {/* <span className="input-group-text rounded-0">Change</span> */}
            </div>
            {error?.password && (
              <span className="error-container text-danger fw-normal fs-6">
                {error?.password}
              </span>
            )}
          </div>
        </div>

        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4 mx-auto">
            <button className="btn btn-primary rounded-0" onClick={handleAdd}>
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
