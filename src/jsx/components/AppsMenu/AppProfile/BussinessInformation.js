/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { BsArrowBarDown, BsTelephoneFill } from 'react-icons/bs'
import { MdOutlineMessage } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'quill/dist/quill.snow.css';
// import Quill from 'quill';
import { TbMessageCircle } from 'react-icons/tb';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
import Baseurl from '../../../../Baseurl';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { config } from '@fullcalendar/core/internal';

const BussinessInformation = () => {

  // const editorRef = useRef(null); 
  const token = useSelector((state) => state.auth.auth.idToken);
  console.log(token)

  const [error, setError] = useState('');
  const [datas, SetDatas] = useState("");


  // parsonal_info_state
  const [date, SetDate] = useState('')
  const [title, SetTitle] = useState("")
  const [email, SetEmail] = useState("")
  const [phone, SetPhone] = useState("")
  const [employment_type, SetEmployment_type] = useState("")
  const [business_name, SetBusiness_name] = useState("")
  const [team_name, SetTeam_name] = useState("")
  const [assistant_branches, SetAssistant_branches] = useState([])
  const [loan_officer_assistant, SetLoan_officer_assistant] = useState([])
  const [social_security, SetSocial_security] = useState([])
  const [business_tax_id, SetBusiness_tax_id] = useState("")
  const [payroll_id, SetPayroll_id] = useState("")
  const [branch, SetBranch] = useState("")
  const [assembly_line, SetAssembly_line] = useState("")
  const [manager, SetManager] = useState("")
  const [up_line_loan_officer, SetUp_line_loan_officer] = useState([])
  const [recruiter, SetRecruiter] = useState([])
  const [refer_email, setRefer_email] = useState("")
  const [physical_location, SetPhysical_location] = useState("")
  const [down_line_loan_officer, SetDown_line_loan_officer] = useState("")
  const [Id, SetId] = useState(null)


  const handleStore = () => {
    const formdata = new FormData()
    formdata.append('date', date)
    formdata.append('title', title)
    formdata.append('email', email)
    formdata.append('phone', phone)
    formdata.append('employment_type', employment_type)
    formdata.append('down_line_loan_officer', down_line_loan_officer)
    formdata.append('business_name', business_name)
    formdata.append('team_name', team_name)
    assistant_branches.map((e, i) => (formdata.append(`assistant_branches[${i}]`, e.value)))
    console.log(assistant_branches)
    // formdata.append('loan_officer_assistant',loan_officer_assistant)
    formdata.append('social_security', social_security)
    formdata.append('business_tax_id', business_tax_id)
    formdata.append('payroll_id', payroll_id)
    formdata.append('branch', branch)
    formdata.append('assembly_line', assembly_line)
    formdata.append('manager', manager)
    formdata.append('up_line_loan_officer', up_line_loan_officer)
    formdata.append('refer_email', refer_email)
    tags.map((e, i) => (formdata.append(`email_group_membership[${i}]`, e)))
    // formdata.append('email_group_membership',tags)
    loan_officer_assistant.map((e, i) => (formdata.append(`loan_officer_assistant[${i}]`, e.value)))
    console.log(loan_officer_assistant)
    formdata.append('physical_location', physical_location)
    formdata.append('recruiter', recruiter)
    if (Id != null) {
      formdata.append('id', Id ? Id : null)
    }

    console.log(formdata, "formdatas")
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/business/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    axios(config)
      .then(function (response) {
        console.log(response, "hyyyhyy");
        // SetId(response?.data?.data?.id)
        setError('')
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
        console.log(error)
        setError(error?.response?.data?.errors)
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
      })
  }

  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handleupdate = () => {
    const formdata = new FormData()
    formdata.append("user_id", userDetail.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/business/info`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response,"rrrr")
        SetId(response?.data?.data?.id)
        setTags([...response?.data?.data?.email_group_membership?.split(",")])
        SetDatas(response?.data?.data)
        SetDate(response?.data?.data?.date)
        SetTitle(response?.data?.data?.title)
        SetEmail(response?.data?.data?.email)
        SetPhone(response?.data?.data?.phone)
        SetTeam_name(response?.data?.data?.team_name)
        SetEmployment_type(response?.data?.data?.employment_type)
        SetBusiness_name(response?.data?.data?.business_name)
        SetSocial_security(response?.data?.data?.social_security)
        SetBusiness_tax_id(response?.data?.data?.business_tax_id)
        SetAssembly_line(response?.data?.data?.assembly_line)
        SetBranch(response?.data?.data?.branch)
        SetManager(response?.data?.data?.manager)
        SetUp_line_loan_officer(response?.data?.data?.up_line_loan_officer)
        setRefer_email(response?.data?.data?.refer_email)
        SetPayroll_id(response?.data?.data?.payroll_id)
        const loan = response?.data?.data?.loan_officer_assistant.split(",");
        const states = [];

        for (const loanoff of loan) {
          const loan_officerObject = {
            value: loanoff,
            label: loanoff,
          };
          states.push(loan_officerObject);
        }
        SetLoan_officer_assistant(states)
        const assistant = response?.data?.data?.assistant_branches.split(",");
        const state = [];

        for (const assistan of assistant) {
          const assistanObject = {
            value: assistan,
            label: assistan,
          };
          state.push(assistanObject);
        }
        console.log(state, "state")
        SetAssistant_branches(state)
      })
      .catch((error) => {
        console.log(error)
        setError('')
      })
  }

  useEffect(() => { handleupdate() }, [])
  const [tags, setTags] = useState([]);

  const handleitput = (tags) => {
    setTags(tags);
  };



  const handleChange = (SetState) => (e) => {
    SetState(e.target.value);
  }

  const options1 = [
    { value: 'america', label: 'america' },
    { value: 'USA', label: 'USA' },
    { value: 'USD', label: 'USD' },
    { value: 'Austria', label: 'Austria' }
  ]


  console.log(error.branch, "shoes")


  const handleSelects = (assistant_branches) => {
    console.log(assistant_branches, "......>")
    SetAssistant_branches(assistant_branches)
  }
  console.log(assistant_branches, "......>d")

  const handleSelectget = (loan_officer_assistant) => {
    console.log(loan_officer_assistant, "......>")
    SetLoan_officer_assistant(loan_officer_assistant)
  }
  console.log(loan_officer_assistant, "......>ds")

  const option = [
    { value: 'america', label: 'america' },
    { value: 'USA', label: 'USA' },
    { value: 'USD', label: 'USD' },
    { value: 'Austria', label: 'Austria' }
  ]
  return (
    <>
      <div className='col-lg-12'>
        <span className='text-bold'>BUSINESS INFORMATION</span>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Associate Start date</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group ">
            <input type="date" className=" form-control rounded-0 rounded-0" defaultValue={datas?.date} onChange={handleChange(SetDate)} placeholder="4/34/23" aria-label="Massey" />
          </div>
          {error?.date && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.date}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Title</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <input type="text" className=" form-control rounded-0 rounded-0" defaultValue={datas?.title} onChange={handleChange(SetTitle)} placeholder="Loan officer" />
            <span className=" input-group-text rounded-0"><BsArrowBarDown className=' fs-3' />Signature</span>
          </div>
          {error?.title && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.title}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
        </div>
        <div className="col-lg-8 mb-4 py-1">
          <label for="inputPassword" className="text-muted text-lowercase">once the "title" information and "Picture" are avaible, click on "Signature" to get your Signature tamplate, them pasete it into the Signature setting section of your company email, <Link className=' text-primary'>Here</Link> is the instruction</label>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Company email</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <span className=" input-group-text rounded-0"><MdOutlineMessage className=' fs-3' /> </span>
            <input type="email" className=" form-control rounded-0" defaultValue={datas?.email} aria-label="Amount (to the nearest dollar)" onChange={handleChange(SetEmail)} />
          </div>
          {error?.email && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.email}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Company phone</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <span className="input-group-text rounded-0"><BsTelephoneFill className=' fs-3' /></span>
            <input type="number" className=" form-control rounded-0 rounded-0" defaultValue={datas?.phone} onChange={handleChange(SetPhone)} placeholder="(231)324324" aria-label="missiha" />
          </div>
          {error?.phone && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.phone}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4 py-4">
          <label for="inputPassword" className="col-form-label text-capitalize ">Employment type</label>
        </div>
        <div className='col-lg-12'>
          <Tabs
            defaultActiveKey="Employee W-2"
            id="uncontrolled-tab-example"
            className="col-lg-12 mb-3"
          >
            <Tab eventKey="Employee W-2" title="Employee W-2">
              <div class="col-lg-12 mb-4 py-4">
                <textarea class="form-control rounded-0" defaultValue={datas?.employment_type} placeholder="Note (optipnal)" id="floatingTextarea2" style={{ height: "100px" }} onChange={handleChange(SetEmployment_type)}></textarea>
                {error?.employment_type && (
                  <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
                    {error?.employment_type}
                  </span>
                )}
              </div>
            </Tab>
            <Tab eventKey="independed Contractor W-9" title="independed Contractor W-9">
              <div class="col-lg-12 mb-4 py-4">
                <textarea class="form-control rounded-0" defaultValue={datas?.employment_type} placeholder="Note (optipnal)" id="floatingTextarea2" style={{ height: "100px" }} onChange={handleChange(SetEmployment_type)}></textarea>
                {error?.employment_type && (
                  <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
                    {error?.employment_type}
                  </span>
                )}
              </div>
            </Tab>
            <Tab eventKey="Outside Salesperson w-2" title="Outside Salesperson w-2">
              <div class="col-lg-12 mb-4 py-4">
                <textarea class="form-control rounded-0" defaultValue={datas?.employment_type} placeholder="Note (optipnal)" id="floatingTextarea2" style={{ height: "100px" }} onChange={handleChange(SetEmployment_type)}></textarea>
                {error?.employment_type && (
                  <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
                    {error?.employment_type}
                  </span>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Business tex ID<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <input type="number" className="form-control rounded-0 rounded-0" defaultValue={datas?.business_tax_id} onChange={handleChange(SetBusiness_tax_id)} placeholder="" aria-label="" />
          </div>
          {error?.business_tax_id && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.business_tax_id}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Business Name<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <input type="text" className="form-control rounded-0 rounded-0" defaultValue={datas?.business_name} onChange={handleChange(SetBusiness_name)} placeholder="Username" />
            <span className=" input-group-text rounded-0"><TbMessageCircle className=' fs-3' /></span>
          </div>
          {error?.business_name && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.business_name}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Payroll id<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <input type="number" className=" form-control rounded-0 rounded-0" defaultValue={payroll_id} onChange={handleChange(SetPayroll_id)} placeholder="" />
          </div>
          {error?.payroll_id && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.payroll_id}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">email group membership</label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <div className=" col-sm-5 input-group">
            {/* <TagsInput value={tags} onChange={handleitput} className='form-control rounded-0 rounded-0 tagsInput2' /> */}
            <TagsInput value={tags} onChange={handleitput} defaultValue={datas?.email_group_membership} className='form-control rounded-0 rounded-0 tagsInput2' />
          </div>
          {error?.email_group_membership && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.email_group_membership}
            </span>
          )}
        </div>
      </div>
      <div className="col-sm-12 d-flex">
        <label for="inputPassword" className="text-muted text-lowercase">Some important email groups: lo@loanfactory.com,processor@loanfactory.com</label>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Branch</label>
        </div>
        <div class="col-lg-8 mb-4 py-2">
          <div className="input-group">
            <input type="text" className="form-control rounded-0 rounded-0" defaultValue={datas?.branch} onChange={handleChange(SetBranch)} placeholder="" aria-label="Server" />
          </div>
          {error?.branch && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.branch}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">Team name</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <input type="text" className=" form-control rounded-0 rounded-0" defaultValue={datas?.team_name} onChange={handleChange(SetTeam_name)} placeholder="" aria-label="Server" />
          {error?.team_name && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.team_name}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">Assembly Line<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-2">
          <div className="input-group">
            <input type="text" className=" form-control rounded-0 rounded-0" defaultValue={datas?.assembly_line} onChange={handleChange(SetAssembly_line)} placeholder="" aria-label="Server" />
          </div>
          {error?.assembly_line && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.assembly_line}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Assistant branches<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            name="colors"
            options={option}
            onChange={handleSelects}
            value={assistant_branches?.map(e => ({ value: e.value, label: e.label }))}
            // defaultValue={citizenship}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {error?.assistant_branches && error?.assistant_branches?.length >= 0 ? (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.assistant_branches[0]}
            </span>

          ) : null}
        </div>
        {/* <div class="col-lg-8 mb-4 py-4">
          <Select
            isMulti
            name="colors"
            options={options}
            onChange={handleSelect}
            value={assistant_branches?.map(e => ({ value: e.value, label: e.label }))}
            // defaultValue={datas?.assistant_branches}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {error?.assistant_branches && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.assistant_branches}
            </span>
          )}
        </div> */}
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Manager<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <textarea class="form-control rounded-0" defaultValue={datas?.manager} placeholder="" id="floatingTextarea2" style={{ height: "100px" }} onChange={handleChange(SetManager)}></textarea>
          </div>
          {error?.manager && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.manager}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Upline loan officer<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <textarea class="form-control rounded-0" defaultValue={datas?.up_line_loan_officer} placeholder="" id="floatingTextarea2" style={{ height: "100px" }} onChange={handleChange(SetUp_line_loan_officer)}></textarea>
          </div>
          {error?.up_line_loan_officer && (
            <span className='error-container text-danger fw-normal fs-6'>
              {error?.up_line_loan_officer}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">loan officer assistant<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 pt-4">
          <Select
            isMulti
            name="colors"
            options={options1}
            onChange={handleSelectget}
            value={loan_officer_assistant?.map(e=>({value:e.value , label:e.label}))}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {error?.loan_officer_assistant && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.loan_officer_assistant}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-2">
          <label for="inputPassword" className=" col-form-label text-capitalize">social security<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-2">
          <div className="input-group">
            <input type="number" className=" form-control rounded-0 rounded-0" defaultValue={datas?.social_security} onChange={handleChange(SetSocial_security)} placeholder="" aria-label="Server" />
          </div>
          {error?.social_security && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.social_security}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Recruiter<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <select class="form-select" aria-label="Trang Nguyen" onChange={handleChange(SetRecruiter)}>
              <option>{datas?.recruiter ? datas?.recruiter : "select Recruiter"}</option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="there">Three</option>
            </select>
          </div>
          {error?.recruiter && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.recruiter}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Referrer's email<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <span className=" input-group-text rounded-0"><TbMessageCircle className=' fs-3' /></span>
            <input type="text" className=" form-control rounded-0 rounded-0" defaultValue={datas?.refer_email} onChange={handleChange(setRefer_email)} placeholder="Username" />
          </div>
          {error?.refer_email && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.refer_email}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Downline loan officer</label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            {/* <input type='file' ref={reff}  onChange={handlefile} className='d-none' defaultValue={datas?.down_line_loan_officer}/> */}
            <button type="button" class="btn btn-secondary rounded-0" >View</button>
            {/* <input type="text" className=" form-control rounded-0 rounded-0" defaultValue={datas?.refer_email} onChange={handleChange(setRefer_email)} placeholder="Username"/> */}
          </div>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 py-4">
          <label for="inputPassword" className=" col-form-label text-capitalize">Physical Location<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8 mb-4 py-4">
          <div className="input-group">
            <select class="form-select" aria-label="Trang Nguyen" onChange={handleChange(SetPhysical_location)}>
              <option >{datas?.physical_location ? datas?.physical_location : "select Physical Location"}</option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="there">Three</option>
            </select>
          </div>
          {error?.physical_location && (
            <span className='col-lg-12 error-container text-danger fw-normal fs-6'>
              {error?.physical_location}
            </span>
          )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4 mx-auto">
          <button className='btn btn-primary rounded-0' onClick={handleStore}>Submit </button>
        </div>
      </div>
    </>
  );
};

export default BussinessInformation