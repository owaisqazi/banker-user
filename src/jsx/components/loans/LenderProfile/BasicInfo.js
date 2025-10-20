/* eslint-disable jsx-a11y/no-redundant-roles */

import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import BankerLogo from "../../../../images/Bankerlogo.png"
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs'
// import { useParams } from 'react-router-dom';
import Baseurl from '../../../../Baseurl';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Button from '../LoanOfficer/GlobalComponent/Button';

const BasicInfo = (props) => {
  const [name, setName] = useState('');
  // const [streetAddress, setStreetAddress] = useState('');
  // const [aptUnit, setAptUnit] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [url, setUrl] = useState('');
  const [approvedStates, setApprovedStates] = useState([]);
  const [types_of_rate, setTypesofRate] = useState('')
  const [manualunderwriting, setManualUnderwriting] = useState('')
  const [TbdUnderwriting, setTbdUnderwriting] = useState('')
  const [earlypaypenalty, setearlypaypenalty] = useState('')

  const [FHA, setFHA] = useState('')
  const [error, setError] = useState()
  const [loss_payee, setLossPayee] = useState('')
  const handletabChange = (key) => {
    setTypesofRate(key)
  }

  const handleInputChange = (event) => {
    // Get the name and value of the input field that triggered the event
    const { name, value } = event.target;

    // Update the respective state based on the input field name
    switch (name) {
      case 'name':
        setName(value);
        break;
      // case 'streetAddress':
      //   setStreetAddress(value);
      //   break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'url':
        setUrl(value);
        break;
      case 'approvedStates':
        setApprovedStates(value);
        break;
      case 'manual_underwriting':
        setManualUnderwriting(value)
        break;
      case 'tbd_underwriting':
        setTbdUnderwriting(value)
        break;
      case 'early_pay_penalty':
        setearlypaypenalty(value)
        break;
      case 'fha':
        setFHA(value)
        break;
      case 'loss_payee':
        setLossPayee(value)
        break
      // ... (other fields)
      default:
        break;
    }
  };

  const option = [
    { value: 'america', label: 'america' },
    { value: 'USA', label: 'USA' },
    { value: 'USD', label: 'USD' },
    { value: 'Austria', label: 'Austria' }
  ]
  const dataArray = [
    { "name": 'Acreage Loans' },
    { "name": 'Agricultural' },
    { "name": 'Appraisal Ok to Order on Brokers TIL' },
    { "name": "Appraisal transfer OK - Conv loans" },
    { "name": 'Appraisal transfer OK - Jumbo' },
    { "name": ' Appraisal Waiver maybe allowed' },
    { "name": 'Assisted Living' },
    { "name": 'AUS - DO free thru lender' },
    { "name": 'Auto-Pay Pricing Incentive' },
    { "name": 'AG 20 Zoning' },
    { "name": 'AirBNB income ok' },
    { "name": ' Appraisal transfer ok' },
    { "name": ' Appraisal transfer OK - Govt loans' },
    { "name": ' Appraisal transfer OK - NonQM' },
    { "name": ' Asset Depletion' },
    { "name": ' Assumable Loan' },
    { "name": ' AUS - LP free thru lender' },
    { "name": 'AVM only' },
    { "name": "Bank Statement Program" },
    { "name": "Barndominium" },
    { "name": "BK No Seasoning" },
    {
      "name": "Blanket Loans"
    },
    {
      "name": "BPC less than LPC ok"
    },
    {
      "name": "Bridge Loans"
    },
    {
      "name": "Builder Take Out"
    },
    {
      "name": "Business Loans"
    },
    {
      "name": "Buydown: 1-0"
    },
    {
      "name": "Buydown: 2-1"
    },
    {
      "name": "Buydown: 3-2-1"
    },
    { "name": "C2 LO as borrower ok" },
    { "name": "Cal Vet" },
    { "name": "CalHFA" },
    { "name": "CalHFA - Dream For All" },
    { "name": "CalHFA 100%" },
    { "name": "CALPERS" },
    { "name": "Calplus with Zip" },
    { "name": "CalSTRS" },
    { "name": "Cannabis Income Ok" },
    { "name": "CD - Lender issues CD only at CTC" },
    { "name": "CD - Lender issues CD prior to CTC" },
    { "name": "CHDAP" },
    { "name": "Chenoa" },
    { "name": "CHFA (Colorado Housing Finance Authority)" },
    { "name": "Church Loans" },
    { "name": "Co-Ops" },
    { "name": "Combo Piggy" },
    { "name": "Commercial" },
    { "name": "Condo - 95% w/MI (No FL)" },
    { "name": "Condo - 97% LTV (Conforming)" },
    { "name": "Condo - Cert OK with 'See Comments'" },
    { "name": "Condo - Limited Review" },
    { "name": "Condo - Litigation Pend OK" },
    { "name": "Condo - Live/Work" },
    { "name": "Condo - Manufactured" },
    { "name": "Condo - N/O/O" },
    { "name": "Condo - Non Warrantable" },
    { "name": "Condo 4 story +" },
    { "name": "Condo Conversions" },
    { "name": "Condo Friendly" },
    { "name": "Condo Spot Approvals" },
    { "name": "Condotels" },
    { "name": "Const. to Perm" },
    { "name": "Construction" },
    { "name": "Construction - USDA" },
    { "name": "Construction - VA" },
    { "name": "Construction – NOO, Spec or Investment" },
    { "name": "Construction Completion Loan" },
    { "name": "Construction for ADU - Investment" },
    { "name": "Construction for ADU - Primary" },
    { "name": "Construction Loan - OneTime Close" },
    { "name": "CRA" },
    { "name": "Credit - Lender pulls own credit report" },
    { "name": "Credit - Lender uses LO credit report" },
    { "name": "Credit Waiver w/ DO/LP Approval" },
    { "name": "Cross Collateralization" },
    { "name": "DACA" },
    { "name": "Deed Restrictions OK" },
    { "name": "Departing Residence" },
    { "name": "Digital Currency – OK for Downpayment (Fannie/Freddie)" },
    { "name": "Doctor Loan" },
    { "name": "Dome Homes" },
    { "name": "Down Payment Assistance (DPA)" },
    { "name": "Down Payment Assistance - Whithin Reach" },
    { "name": "DSCR" },
    { "name": "DSCR - No Ratio" },
    { "name": "DTI - 50%" },
    { "name": "DTI - 55%" },
    { "name": "DTI - No DTI program" },
    { "name": "DTI to 60%" },
    { "name": "DU - No overlays" },
    { "name": "DU Refi Plus" },
    { "name": "DU Refi Plus to 125%" },
    { "name": "E-Signatures Accepted" },
    { "name": "E-Signatures Accepted on ALL disclosures" },
    { "name": "E-Signatures Accepted on SOME disclosures, but not on 4506 and BSA" },
    { "name": "Email Disclosures" },
    { "name": "Empower Homebuyers (Santa Clara)" },
    { "name": "Energy Efficient Mortgage (EEM)" },
    { "name": "EPO 90 days" },
    { "name": "EPO - No Penalty if BPC" },
    { "name": "EPO - No penalty if C2 not involved in refi" },
    { "name": "EPO 120 days" },
    { "name": "EPO 150 days" },
    { "name": "EPO 180 days" },
    { "name": "Escrow Holdback on HUD REO" },
    { "name": "Fannie Mae - Family Opportunity Mortgage" },
    { "name": "Fannie Mae Day 1 Certainty" },
    { "name": "Fannie Mae Direct" },
    { "name": "Fannie Mae HomeStyle" },
    { "name": "Fannie Mae Lender" },
    { "name": "Farm" },
    { "name": "Fee-In Allowed (Lender Fee rolled into rate)" },
    { "name": "FHA" },
    { "name": "FHA - 30 day flip ok" },
    { "name": "FHA - 60 day flip ok" },
    { "name": "FHA - 90 day flip ok" },
    { "name": "FHA - DELRAP" },
    { "name": "FHA - No FICO OK" },
    { "name": "FHA - Spouse no FICO OK" },
    { "name": "FHA 203H" },
    { "name": "FHA 203K" },
    { "name": "FHA < 620 FICO ok" },
    { "name": "FHA Access" },
    { "name": "FHA Condo Spot Approvals" },
    { "name": "FHA Multi-family" },
    { "name": "FHA Secure" },
    { "name": "FHA Streamline - No Appraisal" },
    { "name": "FHA Streamline - No FICO" },
    { "name": "FHMLC HomeOne" },
    { "name": "FICO (None)" },
    { "name": "FICO - 1 Score Only" },
    { "name": "FICO < 620" },
    { "name": "FICO < 620 Only for DU REFI PLUS" },
    { "name": "FICO Fish" },
    { "name": "FICO Only" },
    { "name": "Firefighter Loans" },
    { "name": "Fix N Flip" },
    { "name": "Fixed Rate Balloon" },
    { "name": "Flipping - Property to be Flipped OK" },
    { "name": "Flipping - Recently Flipped OK" },
    { "name": "FNMA Flex" },
    { "name": "Foreclosure Bailout" },
    { "name": "Foreclosure No Seas." },
    { "name": "Foreign National" },
    { "name": "Fractional Ownership" },
    { "name": "Freddic Mac Lender" },
    { "name": "Freddic Relief Open Access" },
    { "name": "Freddie Relief to 125%" },
    { "name": "Gas Station" },
    { "name": "Ginnie Mae Direct" },
    { "name": " GFSA (Golden State Financing Authority)" },
    { "name": "Hard Money" },
    { "name": "HARP 2 - FNMA MI Transfer ok" },
    { "name": "HARP 2 - Fred MI Transfer ok" },
    { "name": "HARP 2 - EA I,II,III FNMA MI Tnfr Ok" },
    { "name": "HARP 2 - EA I,II,III FNMA ok" },
    { "name": "HARP 2 - FNMA Unlim CLTV" },
    { "name": "HARP 2 - FNMA Unlim LTV" },
    { "name": "HARP 2 - Fred Unlim CLTV" },
    { "name": "HARP 2 - Fred Unlim LTV" },
    { "name": "HARP 2 - Property Inspection Only" },
    { "name": "HARP 2 - Unlim CLTV, if same lender" },
    { "name": "HARP 2 - Unlim LTV, if same lender" },
    { "name": "HELOAN" },
    { "name": "HELOC" },
    { "name": "HELOC - Acreage" },
    { "name": "HELOC - Combo" },
    { "name": "HELOC - Condo, 1-4 Units" },
    { "name": "HELOC - Follows DU/LP" },
    { "name": "HELOC - Manufactured" },
    { "name": "HELOC - Piggy Back Non Occ Co-Borrower" },
    { "name": "HELOC - Stand Alone" },
    { "name": "HELOC 2nd Use Actual Pmt" },
    { "name": "HERO Ok - Conventional" },
    { "name": "HERO Ok - VA and FHA" },
    { "name": "High Rise Condo" },
    { "name": "Home Possible (LP)" },
    { "name": "Home Ready" },
    { "name": "HomeStyle" },
    { "name": "HUD - $100 down REO" },
    { "name": "Indian Leased Land" },
    { "name": "Interest Only" },
    { "name": "Interest-Only (90% No MI)" },
    { "name": "Investor Cash Flow" },
    { "name": "Investor owns more 10% units - OK" },
    { "name": "ITIN" },
    { "name": "Jumbo" },
    { "name": "Jumbo (Super)" },
    { "name": "Jumbo - 12 months reserves" },
    { "name": "Jumbo - 6 mo reserves" },
    { "name": "Jumbo - 80/1010 to $1.7" },
    { "name": "Jumbo - 90% LTV" },
    { "name": "Jumbo - Interest Only" },
    { "name": "JJumbo - Non Occ Co-B allowed" },
    { "name": "Jumbo - Non Occ Co-B allowed" },
    { "name": "Land Loans" },
    { "name": "LE - Broker must issue LE" },
    { "name": "LE - Broker OR Lender can issue LE" },
    { "name": "LE - If LO gets LE & CLEA, lender does NOT require MLDS" },
    { "name": "LE - Lender must issue LE" },
    { "name": "LE - Lender will issue LE and CLEA" },
    { "name": "LE - LO can download LE & CD from lender's website" },
    { "name": "Lease Option" },
    { "name": "Leasehold" },
    { "name": "Lender Paid MI" },
    { "name": "Lender Paid MI (Split)" },
    { "name": "LO can rep Buyer AND Seller on RE" },
    { "name": "LO can rep Buyer on RE" },
    { "name": "Loan Limits - 2022 Conf Loan Limits Accepted and Funding" },
    { "name": "Loan Limits - 2022 Hi Bal Loan Limits Accepted and Funding" },
    { "name": "Loan Mod - 0 year waiting period" },
    { "name": "Loan Mod - 1 year waiting period" },
    { "name": "Loan Mod - 2 year waiting period" },
    { "name": "Loan Mod - 3 year waiting period" }
  ];
  const options = dataArray.map(item => {
    return {
      value: item.name.toLowerCase().replace(/ /g, '-'),
      label: item.name
    };
  });
  const [product_offered, setProduct_offered] = useState([]);
  const handleSelect1 = (product_offered) => {
    console.log(product_offered, "......>")
    setProduct_offered(product_offered)
  }
  const { id } = props
  console.log(id)

  
  console.log(id)


  const [conventional_program, setconventional_program] = useState([]);
  const handleSelect2 = (conventional_program) => {
    setconventional_program(conventional_program)
  }
 
  const [non_qm, setnon_qm] = useState([]);
  const handleSelect3 = (non_qm) => {
    setnon_qm(non_qm)
  }
 

  // const [tags4, setTags4] = useState([]);

  // const handleitput4 = (tags4) => {
  //   setTags4(tags4);
  // };
  // const [tags5, setTags5] = useState([]);

  // const handleitput5 = (tags5) => {
  //   setTags(tags5);
  // };
  const Token = useSelector((state) => state.auth.auth.idToken);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const BasicInfo = new FormData(); // Get the form data
    BasicInfo.append("name", name);
    // BasicInfo.append("street_address", streetAddress);
    // BasicInfo.append("aptUnit", aptUnit);
    BasicInfo.append("zipCode", zipcode);
    BasicInfo.append("city", city);
    BasicInfo.append("phone", phone)
    BasicInfo.append("url", url)
    BasicInfo.append("lender_id", id)
    // BasicInfo.append("approved_states", approvedStates);
    approvedStates?.map((e, i) => (BasicInfo.append(`approved_states[${i}]`, e?.value)))
    product_offered?.map((e, i) => (BasicInfo.append(`product_offered[${i}]`, e?.value)))
    conventional_program?.map((e, i) => (BasicInfo.append(`conventional_program[${i}]`, e?.value)))
    non_qm?.map((e, i) => (BasicInfo.append(`non_qm[${i}]`, e?.value)))

    BasicInfo.append("types_of_rate", types_of_rate);
    BasicInfo.append(`manual_underwriting`, manualunderwriting)
    BasicInfo.append(`tbd_underwriting`, TbdUnderwriting)
    BasicInfo.append(`early_pay_penalty`, earlypaypenalty)
    // tags4.forEach((loss_payee,index)=>{
    //   BasicInfo.append(`loss_payee[${[index]}]`,loss_payee)

    // })
    BasicInfo.append(`loss_payee`, loss_payee)

    // const tags4AsString = tags4.join(',');

    // // Append the string value to the BasicInfo object
    // BasicInfo.append('loss_payee', tags4AsString);
    BasicInfo.append(`fha`, FHA)

    // Convert formData to an object
    // const data = {};


    // Make the POST request using Axios
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}add/basic/info`,
      data: BasicInfo,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log('response', response)

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
      }).catch((error) => {
        console.log(error)
        setError(error?.response?.data?.errors)
        console.log(error)
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
  const handleget = () => {

    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/lender/basic/info/${id}`,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response)
        // setApprovedStates(response?.data?.data?.approved_states)
        setCity(response?.data?.data?.city)
        const conventional_program = response?.data?.data?.conventional_program.split(",");
        const program = [];  
        for (const count of conventional_program) {
          const countryObject = {
            value: count,
            label: count,
          };
          program.push(countryObject);
        }
        setconventional_program(program)
        const product_offered = response?.data?.data?.product_offered.split(",");
        const offered = [];  
        for (const count of product_offered) {
          const countryObject = {
            value: count,
            label: count,
          };
          offered.push(countryObject);
        }
        setProduct_offered(offered)
        setearlypaypenalty(response?.data?.data?.early_pay_penalty)
        setFHA(response?.data?.data?.fha)
        setManualUnderwriting(response?.data?.data?.manual_underwriting)
        setName(response?.data?.data?.name)
        // setnon_qm([...response?.data?.data?.?.split(",")])
        const non_qm = response?.data?.data?.non_qm.split(",");
        const non = [];  
        for (const count of non_qm) {
          const countryObject = {
            value: count,
            label: count,
          };
          non.push(countryObject);
        }
        setnon_qm(non)
        setPhone(response?.data?.data?.phone)
        setTbdUnderwriting(response?.data?.data?.tbd_underwriting)
        setTypesofRate(response?.data?.data?.types_of_rate)
        setUrl(response?.data?.data?.url)
        setZipCode(response?.data?.data?.zipcode)
        setLossPayee(response?.data?.data?.loss_payee)
        const countries = response?.data?.data?.approved_states.split(",");
        const state = [];  
        for (const country of countries) {
          const countryObjects = {
            value: country,
            label: country,
          };
          state.push(countryObjects);
        }
        console.log(state, "state")
        setApprovedStates(state)
      }
      
      ).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    handleget()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSelect = (approved_states) => {
    console.log(approved_states, "......>")
    setApprovedStates(approved_states)
  }
  return (
    <div className="container ">

      <form className="form-horizontal" role="form">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Name
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <input
              type="text"
              name='name'
              className="form-control rounded-0 mb-2 rounded-0 shadow-sm"
              id="fieldone"
              placeholder="Enter text ..."
              onChange={handleInputChange}
              value={name}
            />
            {error?.name && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.name}
              </span>

            )}

          </div>
          <div className="col-lg-4 mb-3   ">
            <label className="control-label" htmlFor="fieldtwo">
              logo
            </label>
          </div>
          <div className="col-sm-8 mb-3">
            <img src={BankerLogo} alt="logo" className='text-center shadow-sm rounded' />
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Zip Code &nbsp; (optional)
            </label>
          </div>
          <div className="col-sm-12 col-lg-8 mb-3">

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text shadow-sm rounded-0 " style={{
                  padding: "13px"
                }} id="basic-addon1"><FaMapMarkerAlt /></span>
              </div>
              <input type="number" name='zipCode' onChange={handleInputChange} value={zipcode}
                class="form-control shadow-sm rounded- rounded-0 p-1" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
              {error?.zipCode && (
                <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                  {error?.zipCode}
                </span>

              )}


            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              City&nbsp;(optional)
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <input
              type="text"
              className="form-control shadow-sm rounded-0 mb-2 rounded-0"
              id="fieldone"
              onChange={handleInputChange}

              value={city}
              name='city'
              placeholder="Enter text ..."
            />
            {error?.city && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.city}
              </span>

            )}
          </div>
          {/* </div> */}
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Phone &nbsp; (optional)
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <div class="input-group ">
              <div class="input-group-prepend">
                <span class="input-group-text shadow-sm rounded-0 " style={{
                  padding: "13px"
                }} id="basic-addon1"><BsTelephoneFill /></span>
              </div>
              <input
                type="number"
                className="form-control shadow-sm rounded-0   "
                id="fieldone"
                onChange={handleInputChange}
                value={phone}
                placeholder="Enter text ..."
                name='phone'
              />
            </div>
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Url
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <input
              type="text"
              className="form-control shadow-sm rounded-0 "
              id="fieldone"
              placeholder="Enter text ..."
              value={url}
              name='url'
              onChange={handleInputChange}

            />
            {error?.url && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.url}
              </span>

            )}
          </div>

          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Approved States
            </label>
          </div>
          <div class="col-lg-8 mb-3 pt-4">
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={option}
              onChange={handleSelect}
              value={approvedStates?.map(e => ({ value: e.value, label: e.label }))}
              // defaultValue={citizenship}
              className="basic-multi-select shadow-sm"
              classNamePrefix="select"
            />
            {error?.approved_states
              && error?.approved_states
                ?.length >= 0 ? (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.approved_states
                [0]}
              </span>

            ) : null}
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Type of Rates Offered
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <Tabs
              defaultActiveKey="wholesale rates"
              id="uncontrolled-tab-example"
              className=" mb-3"
              onSelect={handletabChange}

            >
              <Tab
                eventKey="wholesale rates"
                title="wholesale rates"

              >



              </Tab>

              <Tab
                eventKey="wholesale rates"
                title="Correspondent rates"

              >



              </Tab>


            </Tabs>
            {error?.types_of_rate && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.types_of_rate}
              </span>

            )}
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Product offered
            </label>
          </div>

          <div className="col-lg-8 mb-3">
            {/* <TagsInput   onChange={handleitput}  value={product_offered} className='form-control shadow-sm rounded-0 rounded-0 tagsInput2' /> */}
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={options}
              onChange={handleSelect1}
              value={product_offered?.map(e => ({ value: e.value, label: e.label }))}
              // defaultValue={citizenship}
              className="basic-multi-select shadow-sm"
              classNamePrefix="select"
            />
            {/* <TagsInput  onChange={handleitput} className='form-control shadow-sm rounded-0 rounded-0 tagsInput2' /> */}
            {error?.product_offered && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.product_offered}
              </span>

            )}
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Conventional Program
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            {/* <TagsInput   onChange={handleitput2}  value={conventional_program} className='form-control shadow-sm rounded-0 rounded-0 tagsInput2' /> */}
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={options}
              onChange={handleSelect2}
              value={conventional_program?.map(e => ({ value: e.value, label: e.label }))}
              // defaultValue={citizenship}
              className="basic-multi-select shadow-sm"
              classNamePrefix="select"
            />
            {error?.conventional_program && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.conventional_program}
              </span>

            )}

          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              NON-QM program
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            {/* <TagsInput  onChange={handleitput3}  value={non_qm} className='form-control shadow-sm rounded-0 tagsInput2' /> */}
            {/* <TagsInput  onChange={handleitput} className='form-control shadow-sm rounded-0 rounded-0 tagsInput2' /> */}
            <Select
              // defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              name="colors"
              options={options}
              onChange={handleSelect3}
              value={non_qm?.map(e => ({ value: e.value, label: e.label }))}
              // defaultValue={citizenship}
              className="basic-multi-select shadow-sm"
              classNamePrefix="select"
            />
            {error?.non_qm && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.non_qm}
              </span>

            )}
          </div>

          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Manual Underwriting
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            {/* Select Input 1 */}
            <div className="input-group">
              <select class="form-select shadow-sm" aria-label="Trang Nguyen" name='manual_underwriting' onChange={handleInputChange} >
                <option value="yes"> Yes</option>
                <option value="No">No</option>

              </select>
            </div>
            {error?.manual_underwriting && (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.manual_underwriting}
              </span>

            )}
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              TBD Underwriting
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            {/* Select Input 1 */}
            <div className="input-group">
              <select class="form-select shadow-sm" aria-label="Trang Nguyen" name='tbd_underwriting' onChange={handleInputChange} defaultValue={TbdUnderwriting} >
                <option value="yes"> yes</option>
                <option value="No">No</option>

              </select>
            </div>
          </div>

          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Early Payoff Penalty
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <input
              type="number"
              className="form-control shadow-sm rounded-0"
              id="fieldone"
              value={earlypaypenalty}
              name='early_pay_penalty'
              onChange={handleInputChange}
              placeholder="Enter Pay Off ..."
            />
            {error?.early_pay_penalty && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.early_pay_penalty}
              </span>

            )}
          </div>
          <div className="col-lg-4 mb-3">
            <label className="control-label" htmlFor="fieldone">
              Loss Payee
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            {/* <TagsInput value={tags4} onChange={handleitput4} className='form-control shadow-sm rounded-0 rounded-0 tagsInput2' /> */}
            <input
              type="number"
              className="form-control shadow-sm rounded-0"
              id="fieldone"
              value={loss_payee}
              name='loss_payee'
              onChange={handleInputChange}
              placeholder="Enter Loss Payee ..."
            />

            {error?.early_pay_penalty && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.early_pay_penalty}
              </span>

            )}
          </div>

          <div className='col-lg-4 mb-3'>
            <label className="control-label" htmlFor="fieldone">
              CPL or Subordinate Clause &nbsp;(optional)
            </label>
          </div>
          <div className="col-lg-8 mb-3">
            <textarea
              className="form-control shadow-sm rounded-0"
              col={9}
              onChange={handleInputChange}

              name='cpl'
              placeholder="This is text area"
              defaultValue={""}
            />

          </div>
          <div className='col-lg-4 mb-3'>
            <label className="control-label" htmlFor="fieldone">
              FHA Lender ID
            </label>

          </div>
          <div className="col-lg-8 mb-3">
            <input
              type="number"
              className="form-control shadow-sm rounded-0"
              id="fieldone"
              onChange={handleInputChange}
              value={FHA}
              name='fha'
              placeholder="Enter FHA Number ..."
            />
            {error?.fha && (
              <span className='error-container text-danger fw-normal fs-6 col-lg-12'>
                {error?.fha}
              </span>

            )}

          </div>
                    <div className='col-md-12 mb-4'>
                        <div className='text-start'>
                       <Button handleSubmit={handleSubmit} btntext={"Submit"} />
                        </div>
                    </div>
        </div>
      </form>
    </div>



  )
}

export default BasicInfo