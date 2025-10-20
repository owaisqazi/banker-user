/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Baseurl from '../../../Baseurl';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';



const Programfinder = () => {
  const navigate = useNavigate()
    const dataArray = [
        { name: 'Acreage Loans' },
        { name: 'Agricultural' },
        { name: 'Appraisal Ok to Order on Brokers TIL' },
        { name: "Appraisal transfer OK Conv loans" },
        { name: 'Appraisal transfer OK Jumbo' },
        { name: ' Appraisal Waiver maybe allowed' },
        { name: 'Assisted Living' },
        { name: 'AUS DO free thru lender' },
        { name: 'Auto-Pay Pricing Incentive' },
        { name: 'AG 20 Zoning' },
        { name: 'AirBNB income ok' },
        { name: ' Appraisal transfer ok' },
        { name: ' Appraisal transfer OK Govt loans' },
        { name: ' Appraisal transfer OK NonQM' },
        { name: ' Asset Depletion' },
        { name: ' Assumable Loan' },
        { name: ' AUS LP free thru lender' },
        { name: 'AVM only' },
    ];
    const dataArrayB = [
        {
            "name": "Bank Statement Program"
        },
        {
            "name": "Barndominium"
        },
        {
            "name": "BK No Seasoning"
        },
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
            "name": "Buydown: 10"
        },
        {
            "name": "Buydown: 21"
        },
        {
            "name": "Buydown: 321"
        }
    ]

    const dataArrayC = [
        { "name": "C2 LO as borrower ok" },
        { "name": "Cal Vet" },
        { "name": "CalHFA" },
        { "name": "CalHFA Dream For All" },
        { "name": "CalHFA 100%" },
        { "name": "CALPERS" },
        { "name": "Calplus with Zip" },
        { "name": "CalSTRS" },
        { "name": "Cannabis Income Ok" },
        { "name": "CD Lender issues CD only at CTC" },
        { "name": "CD Lender issues CD prior to CTC" },
        { "name": "CHDAP" },
        { "name": "Chenoa" },
        { "name": "CHFA (Colorado Housing Finance Authority)" },
        { "name": "Church Loans" },
        { "name": "Co_Ops" },
        { "name": "Combo Piggy" },
        { "name": "Commercial" },
        { "name": "Condo 95% w/MI (No FL)" },
        { "name": "Condo 97% LTV (Conforming)" },
        { "name": "Condo Cert OK with See Comments" },
        { "name": "Condo Limited Review" },
        { "name": "Condo Litigation Pend OK" },
        { "name": "Condo Live/Work" },
        { "name": "Condo Manufactured" },
        { "name": "Condo N/O/O" },
        { "name": "Condo Non Warrantable" },
        { "name": "Condo 4 story +" },
        { "name": "Condo Conversions" },
        { "name": "Condo Friendly" },
        { "name": "Condo Spot Approvals" },
        { "name": "Condotels" },
        { "name": "Const. to Perm" },
        { "name": "Construction" },
        { "name": "Construction USDA" },
        { "name": "Construction VA" },
        { "name": "Construction – NOO, Spec or Investment" },
        { "name": "Construction Completion Loan" },
        { "name": "Construction for ADU Investment" },
        { "name": "Construction for ADU Primary" },
        { "name": "Construction Loan OneTime Close" },
        { "name": "CRA" },
        { "name": "Credit Lender pulls own credit report" },
        { "name": "Credit Lender uses LO credit report" },
        { "name": "Credit Waiver w/ DO/LP Approval" },
        { "name": "Cross Collateralization" }
    ]

    const dataArrayD = [
        { "name": "DACA" },
        { "name": "Deed Restrictions OK" },
        { "name": "Departing Residence" },
        { "name": "Digital Currency – OK for Downpayment (Fannie/Freddie)" },
        { "name": "Doctor Loan" },
        { "name": "Dome Homes" },
        { "name": "Down Payment Assistance (DPA)" },
        { "name": "Down Payment Assistance Whithin Reach" },
        { "name": "DSCR" },
        { "name": "DSCR No Ratio" },
        { "name": "DTI 50%" },
        { "name": "DTI 55%" },
        { "name": "DTI No DTI program" },
        { "name": "DTI to 60%" },
        { "name": "DU No overlays" },
        { "name": "DU Refi Plus" },
        { "name": "DU Refi Plus to 125%" }
    ]

    const dataArrayE = [
        { "name": "E_Signatures Accepted" },
        { "name": "E_Signatures Accepted on ALL disclosures" },
        { "name": "E_Signatures Accepted on SOME disclosures, but not on 4506 and BSA" },
        { "name": "Email Disclosures" },
        { "name": "Empower Homebuyers (Santa Clara)" },
        { "name": "Energy Efficient Mortgage (EEM)" },
        { "name": "EPO 90 days" },
        { "name": "EPO No Penalty if BPC" },
        { "name": "EPO No penalty if C2 not involved in refi" },
        { "name": "EPO 120 days" },
        { "name": "EPO 150 days" },
        { "name": "EPO 180 days" },
        { "name": "Escrow Holdback on HUD REO" }
    ]

    const dataArrayF = [
        { "name": "Fannie Mae Family Opportunity Mortgage" },
        { "name": "Fannie Mae Day 1 Certainty" },
        { "name": "Fannie Mae Direct" },
        { "name": "Fannie Mae HomeStyle" },
        { "name": "Fannie Mae Lender" },
        { "name": "Farm" },
        { "name": "Fee In Allowed (Lender Fee rolled into rate)" },
        { "name": "FHA" },
        { "name": "FHA 30 day flip ok" },
        { "name": "FHA 60 day flip ok" },
        { "name": "FHA 90 day flip ok" },
        { "name": "FHA DELRAP" },
        { "name": "FHA No FICO OK" },
        { "name": "FHA Spouse no FICO OK" },
        { "name": "FHA 203H" },
        { "name": "FHA 203K" },
        { "name": "FHA < 620 FICO ok" },
        { "name": "FHA Access" },
        { "name": "FHA Condo Spot Approvals" },
        { "name": "FHA Multi-family" },
        { "name": "FHA Secure" },
        { "name": "FHA Streamline No Appraisal" },
        { "name": "FHA Streamline No FICO" },
        { "name": "FHMLC HomeOne" },
        { "name": "FICO (None)" },
        { "name": "FICO 1 Score Only" },
        { "name": "FICO < 620" },
        { "name": "FICO < 620 Only for DU REFI PLUS" },
        { "name": "FICO Fish" },
        { "name": "FICO Only" },
        { "name": "Firefighter Loans" },
        { "name": "Fix N Flip" },
        { "name": "Fixed Rate Balloon" },
        { "name": "Flipping Property to be Flipped OK" },
        { "name": "Flipping Recently Flipped OK" },
        { "name": "FNMA Flex" },
        { "name": "Foreclosure Bailout" },
        { "name": "Foreclosure No Seas." },
        { "name": "Foreign National" },
        { "name": "Fractional Ownership" },
        { "name": "Freddic Mac Lender" },
        { "name": "Freddic Relief Open Access" },
        { "name": "Freddie Relief to 125%" }
    ]

    const dataArrayG = [
        { "name": "Gas Station" },
        { "name": "Ginnie Mae Direct" },
        { "name": " GFSA (Golden State Financing Authority)" },

    ]

    const dataArrayH = [
        { "name": "Hard Money" },
        { "name": "HARP 2 FNMA MI Transfer ok" },
        { "name": "HARP 2 Fred MI Transfer ok" },
        { "name": "HARP 2 EA I,II,III FNMA MI Tnfr Ok" },
        { "name": "HARP 2 EA I,II,III FNMA ok" },
        { "name": "HARP 2 FNMA Unlim CLTV" },
        { "name": "HARP 2 FNMA Unlim LTV" },
        { "name": "HARP 2 Fred Unlim CLTV" },
        { "name": "HARP 2 Fred Unlim LTV" },
        { "name": "HARP 2 Property Inspection Only" },
        { "name": "HARP 2 Unlim CLTV, if same lender" },
        { "name": "HARP 2 Unlim LTV, if same lender" },
        { "name": "HELOAN" },
        { "name": "HELOC" },
        { "name": "HELOC Acreage" },
        { "name": "HELOC Combo" },
        { "name": "HELOC Condo, 14 Units" },
        { "name": "HELOC Follows DU/LP" },
        { "name": "HELOC Manufactured" },
        { "name": "HELOC Piggy Back Non Occ Co Borrower" },
        { "name": "HELOC Stand Alone" },
        { "name": "HELOC 2nd Use Actual Pmt" },
        { "name": "HERO Ok Conventional" },
        { "name": "HERO Ok VA and FHA" },
        { "name": "High Rise Condo" },
        { "name": "Home Possible (LP)" },
        { "name": "Home Ready" },
        { "name": "HomeStyle" },
        { "name": "HUD $100 down REO" }
    ]

    const dataArrayI = [
        { "name": "Indian Leased Land" },
        { "name": "Interest Only" },
        { "name": "Interest Only (90% No MI)" },
        { "name": "Investor Cash Flow" },
        { "name": "Investor owns more 10% units OK" },
        { "name": "ITIN" }
    ]

    const dataArrayJ = [
        { "name": "Jumbo" },
        { "name": "Jumbo (Super)" },
        { "name": "Jumbo 12 months reserves" },
        { "name": "Jumbo 6 mo reserves" },
        { "name": "Jumbo 80/1010 to $1.7" },
        { "name": "Jumbo 90% LTV" },
        { "name": "Jumbo Interest Only" },
        { "name": "JJumbo Non Occ CoB allowed" },
        { "name": "Jumbo Non Occ CoB allowed" }
    ]

    const dataArrayL = [
        { "name": "Land Loans" },
        { "name": "LE Broker must issue LE" },
        { "name": "LE Broker OR Lender can issue LE" },
        { "name": "LE If LO gets LE & CLEA, lender does NOT require MLDS" },
        { "name": "LE Lender must issue LE" },
        { "name": "LE Lender will issue LE and CLEA" },
        { "name": "LE LO can download LE & CD from lenders website" },
        { "name": "Lease Option" },
        { "name": "Leasehold" },
        { "name": "Lender Paid MI" },
        { "name": "Lender Paid MI (Split)" },
        { "name": "LO can rep Buyer AND Seller on RE" },
        { "name": "LO can rep Buyer on RE" },
        { "name": "Loan Limits 2022 Conf Loan Limits Accepted and Funding" },
        { "name": "Loan Limits 2022 Hi Bal Loan Limits Accepted and Funding" },
        { "name": "Loan Mod 0 year waiting period" },
        { "name": "Loan Mod 1 year waiting period" },
        { "name": "Loan Mod 2 year waiting period" },
        { "name": "Loan Mod 3 year waiting period" }
    ]

    const combinedArray = [
        ...dataArray,
        ...dataArrayB,
        ...dataArrayC,
        ...dataArrayD,
        ...dataArrayE,
        ...dataArrayF,
        ...dataArrayG,
        ...dataArrayH,
        ...dataArrayI,
        ...dataArrayJ,
        ...dataArrayL
    ];

    const handleCheckbox = (e) => {
        setProgramfinder()
        const checked = e.target.checked
        const Name = e.target.value
        console.log(Name)
        console.log(checked, "index")
        if (checked) {
            setProgramfinder([...Programfinder, { value: Name }])
        }
        else {
            setProgramfinder(Programfinder?.filter((e) => e !== Name))
        }
    }
    // console.log(dataToSend, "Programfinder=========>") 



    console.log(combinedArray, "combinedArray")

    // integrate
    const Token = useSelector((state) => state.auth.auth.idToken);
    const [Programfinder, setProgramfinder] = useState([])
    const [dataToSend, setdataToSend] = useState()
    // const [error, setError] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleProgram = () => {
        const formdata = new FormData()
        // formdata?.append("user_id", userDetail.id)
        Programfinder?.map((e, i) => (formdata.append(`finder[${i}]`, e?.value)))
        // console.log(Programfinder?.map((e, i) => (`finder[${i}]`, e?.value)), "abc")
        // console.log(Programfinder.map((e, i) => e?.value), "Programfinderahmed")
        var config = {
            method: "post",
            data: formdata,
            url: `${Baseurl.baseurl}get/programe/finder/records`,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response, "response12122")
                setdataToSend(response?.data?.data)
                navigate('/FillterData/:id',{
                    state:{
                        data:response?.data?.data,
                    },
                });
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
                handleShow(true)
            })
            .catch((error) => {
                console.log(error,"abcdsas")
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



    

    return (
        <>
            <div class="container">
                <div class="row">
                    <ul class="nav nav-tabs rounded-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">loan types</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">custom search</a>
                        </li>
                    </ul>
                    <div class="col-lg-12 pt-4 ">
                        <h5 className="text-danger">
                            To quickly find a niche, do a CTRL F, then type in the niche you’re looking for. For example: To find which lender does log cabins, do a CTRL F, then type "log" and hit return.</h5>
                    </div>
                    <h2 className='text-muted'>A</h2>
                    <hr />
                    <div class="row">
                        {dataArray.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label text-dark" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>B</h2>
                    <hr />
                    <div class="row">
                        {dataArrayB.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>C</h2>
                    <hr />
                    <div class="row">
                        {dataArrayC.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>D</h2>
                    <hr />
                    <div class="row">
                        {dataArrayD.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>E</h2>
                    <hr />
                    <div class="row">
                        {dataArrayE.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>F</h2>
                    <hr />
                    <div class="row">
                        {dataArrayF.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>G</h2>
                    <hr />
                    <div class="row">
                        {dataArrayG.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>H</h2>
                    <hr />
                    <div class="row">
                        {dataArrayH.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>I</h2>
                    <hr />
                    <div class="row">
                        {dataArrayI.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>J</h2>
                    <hr />
                    <div class="row">
                        {dataArrayJ.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label text-dark" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h2 className='text-muted'>L</h2>
                    <hr />
                    <div class="row">
                        {dataArrayL.map((data, index) => {
                            return (

                                <div class="col-md-4 col-sm-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={data?.name} onChange={handleCheckbox} id={index} />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div class="row align-items-start">

                        <div class="col-lg-4 mb-4 pt-5">
                            {/* <Link to={{ pathname: '/lender/' + dataToSend.id, state: dataToSend }}>
        Go to Details
      </Link> */}
                            {/* <button className='btn btn-primary rounded-0' onClick={}>Submit </button> */}
                            <Button variant="primary" className='rounded-0' onClick={handleProgram}>
                                submit
                            </Button>
                            {/* <Button variant="primary" className='rounded-0' onClick={handleShow}>
                                submit
                            </Button> */}
                        </div>
                    </div>

                    <Modal
                        size="lg"
                        show={show}
                        onHide={handleClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">name</th>
                                                <th scope="col">non_qm</th>
                                                <th scope="col">phone</th>
                                                <th scope="col">product_offered</th>
                                                <th scope="col">tbd_underwriting</th>
                                                <th scope="col">types_of_rate</th>
                                                <th scope="col">updated_at</th>
                                                <th scope="col">url</th>
                                                <th scope="col">zipcode</th>
                                                <th scope="col">phone</th>
                                                <th scope="col">approved_states</th>
                                                <th scope="col">city</th>
                                                <th scope="col">conventional_program</th>
                                                <th scope="col">cpl</th>
                                                <th scope="col">created_at</th>
                                                <th scope="col">early_pay_penalty</th>
                                                <th scope="col">fha</th>
                                                <th scope="col">file</th>
                                                <th scope="col">filename</th>
                                                <th scope="col">image_path</th>
                                                <th scope="col">loss_payee</th>
                                                <th scope="col">manual_underwriting</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { Array?.isArray(dataToSend) && dataToSend?.map((data ,index)=>{
                                                return(
                                                    <tr key={index}>
                                                <td>
                                                    <Link to={'/Lender_Profile/:id'}>
                                                    {data?.name}
                                                    </Link>
                                                </td>
                                                <td>{data?.non_qm}</td>
                                                <td>{data?.phone}</td>
                                                <td>{data?.product_offered}</td>
                                                <td>{data?.tbd_underwriting}</td>
                                                <td>{data?.types_of_rate}</td>
                                                <td>{data?.updated_at}</td>
                                                <td>{data?.url}</td>
                                                <td>{data?.zipcode}</td>
                                                <td>{data?.phone}</td>
                                                <td>{data?.approved_states}</td>
                                                <td>{data?.city}</td>
                                                <td>{data?.conventional_program}</td>
                                                <td>{data?.cpl}</td>
                                                <td>{data?.created_at}</td>
                                                <td>{data?.early_pay_penalty}</td>
                                                <td>{data?.fha}</td>
                                                <td>{data?.file}</td>
                                                <td>{data?.filename}</td>
                                                <td>{data?.image_path}</td>
                                                <td>{data?.loss_payee}</td>
                                                <td>{data?.manual_underwriting}</td>
                                            </tr>
                                                )
                                            })}
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </Container>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>

        </>
    )
}

export default Programfinder