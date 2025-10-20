import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Baseurl from '../../Baseurl';
import { useEffect } from 'react';

const Documents = () => {
    const borrower_id = localStorage.getItem("borreower_id");
    let Token = localStorage.getItem("usertoken");
    console.log(borrower_id, 'borrower_id===>')

    const [personInfo, setPersonInfo] = useState([])
    const [Income, setIncome] = useState([])
    const [realstate, setrealstate] = useState([])
    const [loaninfo, setloaninfo] = useState([])
    const [demographic, setdemographic] = useState([])
    const [orginatorinfo, setorginatorinfo] = useState([])
    const [assets, setAssets] = useState([])
    const [declaration, setDeclaration] = useState([])
    const [acknowledgement, setAcknowledgement] = useState([])
    const [military, setMilitary] = useState([])



    const handleget = () => {
        const formdata = new FormData();
        formdata.append("borrower_id", borrower_id);
        var config = {
            method: "post",
            url: `${Baseurl.baseurl}get/all/agreements`,
            data: formdata,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
        };
        axios(config)
            .then(function (response) {
                console.log(response, 'responseDocu')
                setPersonInfo(response?.data?.data?.personal_info)
                setIncome(response?.data?.data?.income)
                setrealstate(response?.data?.data?.real_estate)
                setloaninfo(response?.data?.data?.loan_property)
                setdemographic(response?.data?.data?.demographic)
                setorginatorinfo(response?.data?.data?.originator_info)
                setAssets(response?.data?.data?.asset)
                setDeclaration(response?.data?.data?.declaration)
                setAcknowledgement(response?.data?.data?.acknowledgement)
                setMilitary(response?.data?.data?.military)
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
        handleget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <>
                        <div className="col-md-12 new-mr1">
                            <div className='col-lg-12'
                                style=
                                {{
                                    // margin: "50px auto 10px",
                                    backgroundColor: "#fff",
                                    // padding: "50px",
                                    webkitBorderRadius: "3px",
                                    mozBorderRadius: "3px",
                                    borderRadius: "3px",
                                    webkitBoxShadow: " 0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
                                    mozBoxShadow: "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
                                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0, 0, 0, 0.24)",
                                    borderTop: "solid 10px #1362fc"
                                }}>
                                <div className='col-lg-12'>
                                    <div className="row px-5 py-3">
                                        <h1 className='pt-4'>Personal Information</h1>
                                        <h3 className='pt-3'>Please fill your full, legal name</h3>
                                        {/* <div > */}
                                        <h4 className="col-lg-3">First name: <span style={{ color: "red" }}> "{personInfo?.first_name} " </span></h4>
                                        <h4 className="col-lg-3">Middle Name: <span style={{ color: "red" }}> "{personInfo?.middle_name} " </span></h4>
                                        <h4 className="col-lg-3">Last Name: <span style={{ color: "red" }}> " {personInfo?.last_name}" </span></h4>
                                        <h4 className="col-lg-3">Suffix: <span style={{ color: "red" }}> " {personInfo?.suffix} " </span></h4>
                                        <h4 >alternate names <span style={{ color: "red" }}>{personInfo?.alternate_names}</span></h4>
                                        <h4 className="col-lg-3">First name: <span style={{ color: "red" }}> "{personInfo?.alternate_first_name} " </span></h4>
                                        <h4 className="col-lg-3">Middle Name: <span style={{ color: "red" }}> "{personInfo?.alternate_middle_name} " </span></h4>
                                        <h4 className="col-lg-3">Last Name: <span style={{ color: "red" }}> " {personInfo?.alternate_last_name} " </span></h4>
                                        <h4 className="col-lg-3">Suffix: <span style={{ color: "red" }}> "{personInfo?.alternate_suffix} " </span></h4>
                                        <h4 >have any dependent <span style={{ color: "red" }}>{personInfo?.have_any_dependent} </span></h4>
                                        <h3 className='pt-3'>Social Security Number</h3>
                                        <h4>Enter all names here sperated by commas: <span style={{ color: "red" }}> "{personInfo?.email} "</span></h4>
                                        <h3 className='pt-3'>Date of Birth</h3>
                                        <h4>Date of Birth <span style={{ color: "red" }}> "{personInfo?.dob} "</span></h4>
                                        <h4>Citizenship <span style={{ color: "red" }}> " {personInfo?.citizenship}"</span></h4>
                                        <h3 className='pt-3'>Type of Credit</h3>
                                        <h4>Type of Credit <span style={{ color: "red" }}> " "</span></h4>
                                        <h3 className='pt-3'>List Name(s) of Other Borrower(s) Applying for this Loan</h3>
                                        <div className="col-lg-12">
                                            <h4 >First name: <span style={{ color: "red" }}> "{personInfo?.borrower_list_loan_first_name} " </span></h4>
                                            <h4 >Middle Name: <span style={{ color: "red" }}> "{personInfo?.borrower_list_loan_last_name
                                            }" </span></h4>
                                            <h4>Last Name: <span style={{ color: "red" }}> "{personInfo?.borrower_list_loan_middle_name} " </span></h4>
                                            <h4>Suffix: <span style={{ color: "red" }}> "{personInfo?.borrower_list_loan_suffix} " </span></h4>
                                        </div>
                                        <h3 className='pt-3'>Number</h3>
                                        <h4>Number <span style={{ color: "red" }}> "{personInfo?.dependents_number} " </span></h4>
                                        <h3 className='pt-3'>Age</h3>
                                        <h4>Age <span style={{ color: "red" }}> "{personInfo?.dependent_ages} " </span></h4>
                                        <h3 className='pt-3'>Marital Status</h3>
                                        <h4>Marital Status <span style={{ color: "red" }}> "{personInfo?.marital_status} " </span></h4>
                                        <h3 className='pt-3'>Current Address</h3>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{personInfo?.street
                                            } " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> "{personInfo?.unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> "{personInfo?.city}" </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> "{personInfo?.state} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> "{personInfo?.zip
                                            } " </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> "{personInfo?.country} " </span></h4>
                                        </div>
                                        {/* <!-- <h3 className='pt-3'>How Long at Current Address?</h3> --> */}

                                        <h4>How Long at Current Address? <span style={{ color: "red" }}> "{personInfo?.years_at_current_address
                                        } " </span></h4>
                                        <h4>former months at current address <span style={{ color: "red" }}> "{personInfo?.former_months_at_current_address} " </span></h4>
                                        <h4>months at current address <span style={{ color: "red" }}> "{personInfo?.months_at_current_address} " </span></h4>
                                        <h4>no list former address <span style={{ color: "red" }}> {personInfo?.no_list_former_address} </span></h4>
                                        <h4>no mailing address <span style={{ color: "red" }}> {personInfo?.no_mailing_address} </span></h4>
                                        <h4>former whats monthly rent <span style={{ color: "red" }}> "{personInfo?.former_whats_monthly_rent} " </span></h4>
                                        <h4>former housing <span style={{ color: "red" }}> "{personInfo?.former_housing} " </span></h4>
                                        <h4>Housing <span style={{ color: "red" }}> "{personInfo?.housing} " </span></h4>
                                        <h3 className='pt-3'>If at Current Address for LESS than 2 years, list Former Address</h3>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{personInfo?.former_street} " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> "{personInfo?.former_unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> "{personInfo?.former_city} " </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> "{personInfo?.former_state} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> "{personInfo?.former_zip} " </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> "{personInfo?.former_country} " </span></h4>
                                        </div>

                                        <h3 className='pt-3'>Contact Information</h3>
                                        <div className="col-lg-12">
                                            <h4 >Home Phone: <span style={{ color: "red" }}> "{personInfo?.home_phone
                                            } " </span></h4>
                                            <h4 >Cell Phone : <span style={{ color: "red" }}> "{personInfo?.cell_phone} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Work Phone: <span style={{ color: "red" }}> "{personInfo?.work_phone} " </span></h4>
                                            <h4 >Email: <span style={{ color: "red" }}> "{personInfo?.email} " </span></h4>
                                        </div>


                                        <h3 className='pt-3'>Mailing Address – if different from Current Address</h3>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{personInfo?.mailing_address_street
                                            } " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> "{personInfo?.mailing_address_unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> "{personInfo?.mailing_address_city
                                            } " </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> "{personInfo?.mailing_address_state} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> "{personInfo?.mailing_address_zip} " </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> "{personInfo?.mailing_address_country
                                            } " </span></h4>
                                        </div>




                                        {/* <!-- income  --> */}
                                        <h1 className='pt-4'>Income</h1>
                                        <h3 className='pt-3'>Base Employment Income</h3>
                                        <div className="col-lg-12">
                                            <h4 >Employer or Business Name: <span style={{ color: "red" }}> "{Income?.employer_name} " </span></h4>
                                            <h4 >Phone: <span style={{ color: "red" }}> " {Income?.phone}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{Income?.street} " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> "{Income?.unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> " {Income?.city}" </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> " {Income?.state}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> " {Income?.zip}" </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> "{Income?.country} " </span></h4>
                                        </div>
                                        <h4>Position or Title <span style={{ color: "red" }}> "{Income?.position} " </span></h4>
                                        <h4>Start Date <span style={{ color: "red" }}> " {Income?.start_date}" </span></h4>
                                        {/* <!-- <h3 className='pt-3'>how long in this line of work?</h3> --> */}
                                        <h4>how long in this line of work? <span style={{ color: "red" }}> "{Income?.how_long_in_line} " </span></h4>
                                        <h3 className='pt-3'>Check if this statement applies</h3>
                                        <h4> I am employed by a family member, property seller, real estate agent, or other party to the transaction. <span style={{ color: "red" }}> {Income?.employed_family_member}</span></h4>
                                        <h4>Check if you are the Business Owner of Self-Employed<span style={{ color: "red" }}> {Income?.business_owner}</span></h4>
                                        <h4>I have an ownership share of less than 25% <span style={{ color: "red" }}> {Income?.have_ownership_less_25}</span></h4>
                                        <h4> I have an ownership share of 25% or more <span style={{ color: "red" }}> {Income?.have_ownership_more_25}</span>
                                        </h4>
                                        <h4>monthly income (or loss)<span style={{ color: "red" }}> "{Income?.monthly_income} "</span></h4>
                                        <h3 className='pt-3'>Gross Monthly Income</h3>
                                        <h4 >name: <span style={{ color: "red" }}> "{Income?.name} " </span></h4>
                                        <div className="col-lg-12">
                                            <h4 >Base: <span style={{ color: "red" }}> " {Income?.base}" </span></h4>
                                            <h4 >overtime: <span style={{ color: "red" }}> "{Income?.overtime} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >bonus: <span style={{ color: "red" }}> "{Income?.bonus} " </span></h4>
                                            <h4 >commission: <span style={{ color: "red" }}> " " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Military: <span style={{ color: "red" }}> "{Income?.commission}  " </span></h4>
                                            <h4 >other: <span style={{ color: "red" }}> "{Income?.other}  " </span></h4>
                                        </div>
                                        <h4 >TOTAL: <span style={{ color: "red" }}> " {Income?.total}" </span></h4>


                                        <h4> Check if you were the Business Owner or Self-Employed<span style={{ color: "red" }}>{0}</span></h4>
                                        <h3 className='pt-3'>Provide al Least 2 years of current and previous employment and income</h3>
                                        <div className="col-lg-12">
                                            <h4 >Employer or Business Name: <span style={{ color: "red" }}> " {Income?.business_owner}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{Income?.previous_employer_name} " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> "{Income?.previous_unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> "{Income?.previous_city} " </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> "{Income?.previous_state} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> "{Income?.previous_zip}  " </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> " {Income?.previous_country}" </span></h4>
                                        </div>
                                        <h4>Position or Title <span style={{ color: "red" }}> "  {Income?.previous_position}" </span></h4>
                                        <h4>Start Date <span style={{ color: "red" }}> "{Income?.previous_start_date} " </span></h4>
                                        <h4>Check if you were the Business <span style={{ color: "red" }}> {Income?.previous_business_owner} </span></h4>
                                        <h3 className='pt-3'>Previous Gross Monthly</h3>
                                        <h4>Income <span style={{ color: "red" }}> "{Income?.previous_monthly_income} " </span></h4>
                                        <h3 className='pt-3'>Include income from other sources below. Under Income Source, choose from the sources listed here:&nbsp; { }</h3>
                                        <div className='col-lg-12'>
                                            <h4 >Alimony
                                                Automobile Allowance
                                                Boarder Income
                                                Capital Gains</h4>
                                            <h4 >Child Support
                                                Disability
                                                Foster Care
                                                Housing or Parsonage</h4>
                                            <h4 >Interest and Dividends
                                                Mortgage Credit Certificate
                                                Mortgage Differential
                                                Payments</h4>
                                        </div>

                                        <div className='col-lg-12'>
                                            <h4 >Notes Receivable
                                                Public Assistance
                                                Retirement
                                                (e.g., Pension, IRA)</h4>
                                            <h4 >Royalty Payments
                                                Separate Maintenance
                                                Social Security
                                                Tr u s t</h4>
                                            <h4 >Unemployment
                                                Benefits
                                                VA Compensation
                                                Other</h4>
                                        </div>
                                        <h3 className='pt-3'>NOTE: Reveal alimony, child support, separate maintenance, or other income ONLY IF you want it considered in determining your qualification</h3>
                                        <div className="col-lg-12">
                                            <h4 >Income Source – use list above: <span style={{ color: "red" }}> "{Income?.income_source} " </span></h4>
                                            <h4 >Monthly Income: <span style={{ color: "red" }}> " {Income?.other_source_monthly_income} " </span></h4>
                                        </div>
                                        <h4 >Provide TOTAL Amount Here: <span style={{ color: "red" }}> "{Income?.other_source_total} " </span></h4>
                                        {/* <!-- <h3 className='pt-3'>Borrower Name</h3> --> */}
                                        <h4>Borrower Name <span style={{ color: "red" }}> "{Income?.borrower_name} " </span></h4>


                                        {/* <!-- asset  --> */}

                                        <h1 className='pt-4'>Assets</h1>
                                        <h4>Total Assets
                                            $22.0</h4>
                                        <h3 className='pt-3'>2a. Assets- Bank Accounts, Retirement, and Other Accounts You Have</h3>
                                        <p>Include all accounts below. Under Account Type, choose from the types listed here</p>
                                        <div className='col-lg-12'>
                                            <p> 1 Checking</p>&nbsp; &nbsp;
                                            <p> 2 Certificate of Deposit</p>&nbsp; &nbsp;
                                            <p> 3 Stocks Option</p>
                                        </div>
                                        <div className='col-lg-12'>
                                            <p>4 Savings</p>&nbsp;&nbsp;
                                            <p>5 mutual found</p>&nbsp;&nbsp;
                                            <p>6 Bonds</p>
                                        </div>
                                        <div className='col-lg-12'>
                                            <p>7 Money Market</p>&nbsp;&nbsp;
                                            <p>8 Stocks</p>&nbsp;&nbsp;
                                            <p>9 Retirement (e.g., 401k, IRA)</p>
                                        </div>
                                        <div className='col-lg-12'>
                                            <p>10 Bridge Loan Proceeds</p>&nbsp;&nbsp;
                                            <p>11 Trust Account Cash Value of Life Insurance</p>&nbsp;&nbsp;
                                        </div>
                                        <p>12 Individual Development Account</p>

                                        <div className="col-lg-12">
                                            <h4 >Account Source – use list above: <span style={{ color: "red" }}> "{assets?.account_type} " </span></h4>
                                            <h4 >Financial Institution : <span style={{ color: "red" }}> "{assets?.financial_institution}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Account Number: <span style={{ color: "red" }}> "{assets?.account_number} " </span></h4>
                                            <h4 >Cash or Market Value: <span style={{ color: "red" }}> "{assets?.market_value} " </span></h4>
                                            <h4 >Provide TOTA L  Amount Here : <span style={{ color: "red" }}> "{assets?.other_total_amount} " </span></h4>&nbsp;&nbsp;
                                        </div>
                                        <h3 className='pt-3'>2b. Other Assets Credits you have</h3>
                                        <div className='col-lg-12'>
                                            <div>


                                                <p>1 Proceeds from Real Estate Property to be sold on or before closing</p>


                                                <p>2 Proceeds from Sale of Non-Real Estate Asset</p>


                                                <p>3 Secured Borrowed Funds</p>


                                                <p>4 Unsecured Borrowed Funds</p>


                                                <p>5 Other</p>
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>Credits</p>
                                                <p>1 Earnest Money</p>
                                                <p>2 Lot Equity</p>
                                                <p>3 Employer Assistance</p>
                                                <p>4 Relocation Funds</p>
                                                <p>5 Rent Credit</p>
                                                <p>6 Sweat Equity</p>
                                                <p>7 Trade Equity</p>

                                            </div>
                                        </div>
                                        <div className="col-lg-12">

                                            <h4 >Cash or Market Value : <span style={{ color: "red" }}> "{assets?.other_market_value} " </span></h4>
                                        </div>
                                        <h4 >Provide TOTAL Amount Here : <span style={{ color: "red" }}> "{assets?.total_amount} " </span></h4>
                                        <h4 >Account Type –  use list above : <span style={{ color: "red" }}> "{assets?.account_type} " </span></h4>
                                        <h3 className='pt-3'>2c. Loibilities- Credits Cards,Other Debts, and Leases that you Owe</h3>
                                        <div className='col-lg-12'>
                                            <h4 >Loibilities : <span style={{ color: "red" }}> "{assets?.other_asset_credit_not_apply} " </span></h4>

                                            <p> 1 Revolving (e.g., credit cards)</p>&nbsp; &nbsp;
                                            <p> 2 Open 30-Day (balance paid monthly)
                                            </p>&nbsp; &nbsp;
                                            <p> 3 Other</p>
                                        </div>
                                        <div className='col-lg-12'>
                                            <p> 4 Installment (e.g., car, student, personal loans)</p>&nbsp; &nbsp;
                                            <p> 5 Lease (not real estate)</p>
                                        </div>

                                        <div className="col-lg-12">

                                            <h4 >Company Name: <span style={{ color: "red" }}> "{assets?.company_name} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Account Number : <span style={{ color: "red" }}> "{assets?.liabilities_account_number} " </span></h4>
                                        </div>
                                        <h4>To be paid off at or before closing<span style={{ color: "red" }}>{assets?.to_be_paid_of} </span></h4>
                                        <h3 className='pt-3'>2c. Loibilities- and Expenses</h3>
                                        <p>Include all other liabilities and expenses below. Choose from the types listed here:  <span style={{ color: "red" }}> "{assets?.other_liabilities_not_apply}" </span></p>
                                        <div className="col-lg-12">
                                            <h4 >other_liabilities_market_value : <span style={{ color: "red" }}> "{assets?.other_liabilities_market_value} " </span></h4>
                                            <h4 >other_liabilities  : <span style={{ color: "red" }}> "{assets?.other_liabilities} " </span></h4>
                                        </div>
                                        <h1 className='pt-4'>Real State</h1>
                                        <h3 className='pt-3'>3a. Property You Own</h3>
                                        <h4 >Street: <span style={{ color: "red" }}> "{realstate?.street} " </span></h4>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{realstate?.street} " </span></h4>
                                            <h4 >Unit: <span style={{ color: "red" }}> " {realstate?.unit}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> " {realstate?.city}" </span></h4>
                                            <h4 >State: <span style={{ color: "red" }}> " {realstate?.state}" </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Zip: <span style={{ color: "red" }}> "{realstate?.zip} " </span></h4>
                                            <h4 >Country: <span style={{ color: "red" }}> "{realstate?.country} " </span></h4>
                                        </div>

                                        <div className="col-lg-12">
                                            <h4 >Property_Value : <span style={{ color: "red" }}> "{realstate?.Property_Value} " </span></h4>
                                            <h4 >Intended_Occupancy_Investment : <span style={{ color: "red" }}> "{realstate?.Intended_Occupancy_Investment} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Monthly_Insurance : <span style={{ color: "red" }}> " {realstate?.Monthly_Insurance} " </span></h4>
                                            <h4 >Monthly_Rental_Income : <span style={{ color: "red" }}> " {realstate?.Monthly_Rental_Income}  " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >For_LENDER_to_calculate : <span style={{ color: "red" }}> " {realstate?.For_LENDER_to_calculate}   " </span></h4>
                                        </div>

                                        <h3 className='pt-3'>Mortgage Loan on this property</h3>
                                        <div className="col-lg-12">
                                            <h4 >Creditor_Name : <span style={{ color: "red" }}> "{realstate?.Creditor_Name}  " </span></h4>
                                            <h4 >Account_Number : <span style={{ color: "red" }}> "{realstate?.Account_Number} " </span></h4>
                                            <h4 >Monthly_Mortgage_Payment : <span style={{ color: "red" }}> " {realstate?.Monthly_Mortgage_Payment}" </span></h4>
                                        </div>

                                        <div className="col-lg-12">
                                            <h4 >Unpaid_Balance : <span style={{ color: "red" }}> " {realstate?.first_unpaid_blnc} " </span></h4>
                                            <h4 >To_be_paid_off_at_or_before_closing : <span style={{ color: "red" }}> "{realstate?.first_to_be_paid} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Type_FHA_VA_Conventional_USDA_RD_Other : <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                            <h4 >Credit_Limit_if_applicable : <span style={{ color: "red" }}> "{realstate?.first_credit_limit}  " </span></h4>
                                        </div>
                                        <h4 >IF Applicable Complete Information For Additional Property <span style={{ color: "red" }}> {0} </span></h4>
                                        <h3 className='pt-3'>Other Borrower Name</h3>
                                        <h4 >Name : <span style={{ color: "red" }}> "{realstate?.additional_second_creditor_name} " </span></h4>

                                        <h1 className='pt-4'>4a. Loan and Property Information</h1>
                                        <h3 className='pt-3'>Loan Amount</h3>
                                        <h4>
                                            Loan Amount :
                                            <span style={{ color: "red" }}>" {loaninfo?.loan_amount}" </span>
                                        </h4>
                                        <h3 className='pt-3'>Loan Purpose</h3>
                                        <h4>
                                            Purchase :

                                            <span style={{ color: "red" }}>{loaninfo?.loan_purpose === 'purchase' ? 1 : 0}</span>

                                        </h4>
                                        <h4>
                                            Refinance :<span style={{ color: "red" }}>{loaninfo?.loan_purpose === 'refiance' ? 1 : 0} </span>
                                        </h4>
                                        <h4>
                                            Other (specify):

                                            <span style={{ color: "red" }}>{loaninfo?.specify_other}  </span>
                                        </h4>
                                        <h4>
                                            Loan Amount
                                            <span style={{ color: "red" }}>"{loaninfo?.loan_amount} " </span>
                                        </h4>
                                        <h3 className='pt-3'>Property Address</h3>
                                        <div className="col-lg-12">
                                            <h4 >Street: <span style={{ color: "red" }}> "{loaninfo?.street}" </span></h4>&nbsp;&nbsp;
                                            <h4 >Unit# : <span style={{ color: "red" }}> "{loaninfo?.unit} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >City: <span style={{ color: "red" }}> "{loaninfo?.city} " </span></h4>&nbsp;&nbsp;
                                            <h4 >State: <span style={{ color: "red" }}> " {loaninfo?.state}" </span></h4>&nbsp;&nbsp;
                                            <h4 >Zip code: <span style={{ color: "red" }}> "{loaninfo?.zip} " </span></h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4 >Country: <span style={{ color: "red" }}> " {loaninfo?.country}" </span></h4>&nbsp;&nbsp;
                                            <h4 >Number of Units  : <span style={{ color: "red" }}> "{loaninfo?.no_of_units} " </span></h4>&nbsp;&nbsp;
                                            <h4 >Property Value $ : <span style={{ color: "red" }}> "{loaninfo?.first_cash_market_val} " </span></h4>
                                        </div>
                                        <h3 className='pt-3'>Occupancy</h3>

                                        <h4>
                                            Primary Residence
                                            <span style={{ color: "red" }}>{0} </span>
                                        </h4>
                                        <h4>
                                            Second Home
                                            <span style={{ color: "red" }}>{0} </span>
                                        </h4>
                                        <h4>
                                            Investment Property
                                            <span style={{ color: "red" }}>{0} </span>
                                        </h4>
                                        <h3 className='pt-3'>FHA Secondary Residence</h3>
                                        <h4>
                                            Investment Property
                                            <span style={{ color: "red" }}>{0} </span>
                                        </h4>
                                        <h3 className='pt-3'>1. Mixed-Use Property. If you will occupy the property, will you set aside space within the property to operate your own business? (e.g., daycare facility, medical office, beauty/barber shop)</h3>
                                        <div className="col-lg-12">
                                            <h4><span style={{ color: "red" }}>" {loaninfo?.mixed_use_property} " </span></h4>&nbsp;&nbsp;

                                        </div>
                                        <h3 className='pt-3'>2. Manufactured Home. Is the property a manufactured home? (e.g., a factory built dwelling built on a permanent chassis)</h3>
                                        <div className="col-lg-12">
                                            <h4><span style={{ color: "red" }}>" {loaninfo?.manufactured_home} " </span></h4>&nbsp;&nbsp;

                                        </div>
                                        <h4>
                                            Creditor Name :
                                            <span style={{ color: "red" }}>"{loaninfo?.first_create_name} " </span>
                                        </h4>
                                        <h3 className='pt-3'>Lien Type</h3>
                                        <div className="col-lg-12">
                                            <h4>
                                                First Lien
                                                <span style={{ color: "red" }}>{loaninfo?.first_lien} </span>
                                            </h4>&nbsp;&nbsp;
                                            <h4>
                                                Subordinate Lien
                                                <span style={{ color: "red" }}>{loaninfo?.second_lien} </span>
                                            </h4>
                                        </div>
                                        <div className="col-lg-12">
                                            <h4>
                                                First Lien
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>&nbsp;&nbsp;
                                            <h4>
                                                Subordinate Lien
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                        </div>
                                        <h4>
                                            Monthly_Payment :
                                            <span style={{ color: "red" }}>"{loaninfo?.first_monthly_payment} " </span>
                                        </h4>&nbsp;&nbsp;
                                        <div className="col-lg-12">
                                            <h4>
                                                Loan_Amount_Amount_to_be_Drawn
                                                <span style={{ color: "red" }}>"{loaninfo?.loan_amount} " </span>
                                            </h4>&nbsp;&nbsp;
                                            <h4>
                                                Credit_Limi_if_applicable
                                                <span style={{ color: "red" }}>" {loaninfo?.first_credit_limit}" </span>
                                            </h4>
                                        </div>
                                        <h3 className='pt-3'>Complete if the property is a 2-4 Unit Primary Residence or an Investment Property</h3>
                                        <p>Expected Monthly Rental IncomeFor LENDER to calculate: Expected Net Monthly Rental Income</p>
                                        <h3 className='pt-3'>Amount</h3>
                                        <h4>
                                            $ :
                                            <span style={{ color: "red" }}>"{loaninfo?.expected_monthly_rental_income} "</span>
                                        </h4>
                                        <h3 className='pt-3'>Include all gifts and grants below. Under Source, choose from the sources listed here:</h3>
                                        <div className='col-lg-12'>
                                            <p>Community Nonprofit
                                                Employer
                                                Federal Agency
                                                Local Agency</p>&nbsp;&nbsp;
                                            <p>Federal Agency
                                                Religious Nonprofit
                                                State Agency</p>&nbsp;&nbsp;
                                            <p>Unmarried Partner
                                                Lender
                                                Other</p>
                                        </div>
                                        <h4>
                                            $ :
                                            <span style={{ color: "red" }}>" "</span>
                                        </h4>
                                        <h3 className='pt-3'>Deposited/Not Deposited</h3>
                                        <div className='col-lg-12'>
                                            <h4>
                                                first_deposited
                                                <span style={{ color: "red" }}>{loaninfo?.first_deposited}</span>
                                            </h4>
                                            <h4>
                                                second_deposited
                                                <span style={{ color: "red" }}>{loaninfo?.second_deposited}</span>
                                            </h4>
                                        </div>
                                        <div className='col-lg-12'>
                                            <h4>
                                                Not Deposited
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                Not Deposited
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                        </div>
                                        <div className='col-lg-12'>
                                            <h4>
                                                Source_use_list_above :
                                                <span style={{ color: "red" }}>"{loaninfo?.first_source} "</span>
                                                <span style={{ color: "red" }}>"{loaninfo?.second_source} "</span>
                                            </h4>&nbsp;&nbsp;
                                            <h4>
                                                Cash_or_Market_Value :
                                                <span style={{ color: "red" }}>"{loaninfo?.first_cash_market_val} "</span>
                                                <span style={{ color: "red" }}>"{loaninfo?.second_cash_market_val} "</span>
                                            </h4>
                                        </div>
                                        <h3 className='pt-3'>Borrower Name</h3>
                                        <h4>
                                            Name :
                                            <span style={{ color: "red" }}>" {loaninfo?.borrower_id}"</span>
                                        </h4>


                                        <h1 className='pt-4'>Declaration</h1>
                                        <h3 className='pt-3'>Will you occupy the property as your primary residence?</h3>
                                        <div className='col-lg-12'>
                                            <h4><span style={{ color: "red" }}>" "</span> </h4>&nbsp;&nbsp;
                                            <h4><span style={{ color: "red" }}>" "</span>
                                            </h4>
                                        </div>
                                        <p>If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property?

                                        </p>
                                        <div className='col-lg-12'>
                                            <h4><span style={{ color: "red" }}>" "</span> </h4>&nbsp;&nbsp;
                                            <h4><span style={{ color: "red" }}>" "</span>
                                            </h4>
                                        </div>
                                        <p>Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or obtaining any money from another party, such as the seller or realtor, that you have not disclosed on this loan application?</p>
                                        <div className='col-lg-12'>
                                            <h4><span style={{ color: "red" }}>" "</span> </h4>&nbsp;&nbsp;
                                            <h4><span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>Uniform Residential Loan Application Freddie Mac Form 65 • Fannie Mae Form 1003 Effective 1/2021</p>
                                            <h1 className='pt-4'>Real State</h1>
                                            <h3 className='pt-3'>3a. Property You Own</h3>
                                            <h4 >Street: <span style={{ color: "red" }}> " " </span></h4>
                                            <div className="col-lg-12">
                                                <h4 >Street: <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Unit: <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >City: <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >State: <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >Zip: <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Country: <span style={{ color: "red" }}> " " </span></h4>
                                            </div>

                                            <div className="col-lg-12">
                                                <h4 >Property_Value : <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Intended_Occupancy_Investment : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >Monthly_Insurance : <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Monthly_Rental_Income : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >For_LENDER_to_calculate : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>

                                            <h3 className='pt-3'>Mortgage Loan on this property</h3>
                                            <div className="col-lg-12">
                                                <h4 >Creditor_Name : <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Account_Number : <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >Monthly_Mortgage_Payment : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>

                                            <div className="col-lg-12">
                                                <h4 >Unpaid_Balance : <span style={{ color: "red" }}> " " </span></h4>
                                                <h4 >To_be_paid_off_at_or_before_closing : <span style={{ color: "red" }}> "{assets?.to_be_paid_of} " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >Type_FHA_VA_Conventional_USDA_RD_Other : <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >Credit_Limit_if_applicable : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <h4 >IF Applicable Complete Information For Additional Property <span style={{ color: "red" }}> {0} </span></h4>
                                            <h3 className='pt-3'>Other Borrower Name</h3>
                                            <h4 >Name : <span style={{ color: "red" }}> " " </span></h4>

                                            <h1 className='pt-4'>4a. Loan and Property Information</h1>
                                            <h3 className='pt-3'>Loan Amount</h3>
                                            <h4>
                                                Loan Amount :
                                                <span style={{ color: "red" }}>" " </span>
                                            </h4>
                                            <h3 className='pt-3'>Loan Purpose</h3>
                                            <h4>
                                                Purchase :
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h4>
                                                Refinance :<span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h4>
                                                Other (specify):

                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h4>
                                                Loan Amount
                                                <span style={{ color: "red" }}>" " </span>
                                            </h4>
                                            <h3 className='pt-3'>Property Address</h3>
                                            <div className="col-lg-12">
                                                <h4 >Street: <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >Unit# : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >City: <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >State: <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >Zip code: <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4 >Country: <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >Number of Units  : <span style={{ color: "red" }}> " " </span></h4>&nbsp;&nbsp;
                                                <h4 >Property Value $ : <span style={{ color: "red" }}> " " </span></h4>
                                            </div>
                                            <h3 className='pt-3'>Occupancy</h3>

                                            <h4>
                                                Primary Residence
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h4>
                                                Second Home
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h4>
                                                Investment Property
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h3 className='pt-3'>FHA Secondary Residence</h3>
                                            <h4>
                                                Investment Property
                                                <span style={{ color: "red" }}>{0} </span>
                                            </h4>
                                            <h3 className='pt-3'>1. Mixed-Use Property. If you will occupy the property, will you set aside space within the property to operate your own business? (e.g., daycare facility, medical office, beauty/barber shop)</h3>
                                            <div className="col-lg-12">
                                                <h4><span style={{ color: "red" }}>" Yes " </span></h4>&nbsp;&nbsp;
                                                <h4><span style={{ color: "red" }}>" No " </span></h4>
                                            </div>
                                            <h3 className='pt-3'>2. Manufactured Home. Is the property a manufactured home? (e.g., a factory built dwelling built on a permanent chassis)</h3>
                                            <div className="col-lg-12">
                                                <h4><span style={{ color: "red" }}>" Yes " </span></h4>&nbsp;&nbsp;
                                                <h4><span style={{ color: "red" }}>" No " </span></h4>
                                            </div>
                                            <h4>
                                                Creditor Name :
                                                <span style={{ color: "red" }}>" " </span>
                                            </h4>
                                            <h3 className='pt-3'>Lien Type</h3>
                                            <div className="col-lg-12">
                                                <h4>
                                                    First Lien
                                                    <span style={{ color: "red" }}>{0} </span>
                                                </h4>&nbsp;&nbsp;
                                                <h4>
                                                    Subordinate Lien
                                                    <span style={{ color: "red" }}>{0} </span>
                                                </h4>
                                            </div>
                                            <div className="col-lg-12">
                                                <h4>
                                                    First Lien
                                                    <span style={{ color: "red" }}>{0} </span>
                                                </h4>&nbsp;&nbsp;
                                                <h4>
                                                    Subordinate Lien
                                                    <span style={{ color: "red" }}>{0} </span>
                                                </h4>
                                            </div>
                                            <h4>
                                                Monthly_Payment :
                                                <span style={{ color: "red" }}>" " </span>
                                            </h4>&nbsp;&nbsp;
                                            <div className="col-lg-12">
                                                <h4>
                                                    Loan_Amount_Amount_to_be_Drawn
                                                    <span style={{ color: "red" }}>" " </span>
                                                </h4>&nbsp;&nbsp;
                                                <h4>
                                                    Credit_Limi_if_applicable
                                                    <span style={{ color: "red" }}>" " </span>
                                                </h4>
                                            </div>
                                            <h3 className='pt-3'>Complete if the property is a 2-4 Unit Primary Residence or an Investment Property</h3>
                                            <p>Expected Monthly Rental IncomeFor LENDER to calculate: Expected Net Monthly Rental Income</p>
                                            <h3 className='pt-3'>Amount</h3>
                                            <h4>
                                                $ :
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <h3 className='pt-3'>Include all gifts and grants below. Under Source, choose from the sources listed here:</h3>
                                            <div className='col-lg-12'>
                                                <p>Community Nonprofit
                                                    Employer
                                                    Federal Agency
                                                    Local Agency</p>&nbsp;&nbsp;
                                                <p>Federal Agency
                                                    Religious Nonprofit
                                                    State Agency</p>&nbsp;&nbsp;
                                                <p>Unmarried Partner
                                                    Lender
                                                    Other</p>
                                            </div>
                                            <h4>
                                                $ :
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <h3 className='pt-3'>Deposited/Not Deposited</h3>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Deposited
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>
                                                    Deposited
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Not Deposited
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>
                                                    Not Deposited
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Source_use_list_above :
                                                    <span style={{ color: "red" }}>" "</span>
                                                </h4>&nbsp;&nbsp;
                                                <h4>
                                                    Cash_or_Market_Value :
                                                    <span style={{ color: "red" }}>" "</span>
                                                </h4>
                                            </div>
                                            <h3 className='pt-3'>Borrower Name</h3>
                                            <h4>
                                                Name :
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>


                                            <h1 className='pt-4'>Declaration</h1>
                                            <p className='pt-3'>Will you occupy the property as your primary residence?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.primary_residence}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <p className='pt-3'>If YES, have you had an ownership interest in another property in the last three years</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.primary_residence}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <p className='pt-3'>If YES, have you had an ownership interest in another property in the last three years? If YES, complete (1) and (2) below:</p>
                                            <p className='pt-3'>1: What type of property did you own: primary residence (PR), FHA secondary residence (SR), second home (SH), or investment property (IP)?</p>
                                            <div className='col-lg-12'>
                                                <h4>property tile<span style={{ color: "red" }}>"{declaration?.property_tile}"</span> </h4>&nbsp;&nbsp;
                                            </div>

                                            <p>If this is a Purchase Transaction: Do you have a family relationship or business affiliation with the seller of the property?

                                            </p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.Purchase_Transaction}"</span> </h4>&nbsp;&nbsp;
                                                <h4>Amount<span style={{ color: "red" }}>"{declaration?.amount}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <p>Are you borrowing any money for this real estate transaction (e.g., money for your closing costs or down payment) or obtaining any money from another party, such as the seller or realtor, that you have not disclosed on this loan application?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.borrowing} "</span>
                                                </h4>
                                            </div>
                                            <p>If  What is the amount of this money?</p>
                                            <p>Have you or will you be applying for a mortgage loan on another property (not the property securing this loan) on or before closing this transaction that is not disclosed on this loan application?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.mortgage_loan} "</span>
                                                </h4>
                                            </div>
                                            <p>Will this property be subject to a lien that could take priority over the first mortgage lien, such as a clean energy lien paid through your property taxes (e.g., the Property Assessed Clean Energy Program)?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.first_mortgage_lien} "</span>
                                                </h4>
                                            </div>
                                            <p>Are you a co-signer or guarantor on any debt or loan that is not disclosed on this application?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.guarantor}"</span>
                                                </h4>
                                            </div>
                                            <p>Are there any outstanding judgments against you?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.judgements_against_you}"</span>
                                                </h4>
                                            </div>
                                            <p>Are you currently delinquent or in default on a Federal Debt?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.federal_debt} "</span>
                                                </h4>
                                            </div>
                                            <p>Are you a party to a lawsuit in which you potentially have any personal financial liability?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.financial_liability} "</span>
                                                </h4>
                                            </div>
                                            <p>Have you conveyed title to any property in lieu of foreclosure in the past 7 years?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.conveyed_title} "</span>
                                                </h4>
                                            </div>
                                            <p>Within the past 7 years, have you completed a pre-foreclosure sale or short sale, whereby the property was sold to a third party and the Lender agreed to accept less than the outstanding mortgage balance due?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.short_sale}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <p>Have you had property foreclosed upon in the last 7 years?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.foreclosed_upon} "</span>
                                                </h4>
                                            </div>
                                            <p>Have you had bankruptcy in the last 7 years?</p>
                                            <div className='col-lg-12'>
                                                <h4><span style={{ color: "red" }}>"{declaration?.bankruptcy} "</span>
                                                </h4>
                                            </div>

                                            <p>Have you declared bankruptcy within the past 7 years? If  Identify the type of the bankruptcy</p>
                                            <div className='col-lg-12'>
                                                <span style={{ color: "red" }}>"{declaration?.type_of_bankruptcy} "</span>

                                            </div>

                                            <h1 className='pt-4'>Acknowledgments and Agreements</h1>
                                            <h3 className='pt-3'>Defnitions :</h3>
                                            <p>Lender includes the Lender’s agents, service providers, and any of their successors and assigns.
                                                Other Loan Participants includes (i) any actual or potential owners of a loan resulting from this application (the “Loan”), (ii) acquirers of any beneficial or other interest in the Loan, (iii) any mortgage insurer, (iv) any guarantor, (v) any servicer of the Loan, and (vi) any of these parties' service providers, successors or assigns.</p>
                                            <h3 className='pt-3'>I agree to, acknowledge, and represent the following:</h3>
                                            <p>(1) The Complete Information for this Application</p>
                                            <p>If the information I submitted changes or I have new information If the information I submitted changes or I have new information application, including providing any updated/supplemented real estate sales contract.</p>
                                            <p>For purchase transactions: The terms and conditions of any real estate sales contract signed by me in connection with this application are true, accurate, and complete to the best of my knowledge and belief. I have not entered into any other agreement, written or oral, in connection with this real estate transaction.</p>
                                            <p>The Lender and Other Loan Participants may rely on the information contained in the application before and after closing of the Loan.</p>
                                            <p>Any intentional or negligent misrepresentation of information may</p>
                                            <p>(a) civil liability on me, including monetary damages, if a person suffers any loss because the person relied on any misrepresentation that I have made on this application, and/or</p>
                                            <p>(b) criminal penalties on me including, but not limited to, fine or imprisonment or both under the provisions of Federal law (18 U.S.C. §§ 1001 et seq.).</p>
                                            <h3 className='pt-3'>(2) The Property’s Security</h3>
                                            <p>The Loan I have applied for in this application will be secured by a mortgage or deed of trust which provides the Lender a security interest in the property described in this application.</p>
                                            <h3 className='pt-3'>(3)The Property’s Appraisal, Value, and Condition</h3>
                                            <p>Any appraisal or value of the property obtained by the Lender is for use by the Lender and Other Loan Participants.
                                                The Lender and Other Loan Participants have not made any representation or warranty, express or implied, to me about the property, its condition, or its value.</p>
                                            <h3 className='pt-3'>(4)Electronic Records and Signatures</h3>
                                            <p>The Lender and Other Loan Participants may keep any paper record and/or electronic record of this application, whether or not the Loan is approved.</p>
                                            <p>If this application is created as (or converted into) an “electronic application”, I consent to the use of “electronic records” and “electronic signatures” as the terms are defined in and governed by applicable Federal and/or state electronic transactions laws.</p>
                                            <p>I intend to sign and have signed this application either using my:
                                                (a) electronic signature; or</p>
                                            <p>(b) verify any data contained in my consumer credit report, my loan application and other information supporting my loan application;</p>
                                            <p>(c) inform credit and investment decisions by the Lender and Other Loan Participants;</p>
                                            <p>(d) perform audit, quality control, and legal compliance analysis</p>
                                            <p>(e) perform analysis and modeling for risk assessments; and reviews;</p>
                                            <p>(f) monitor the account for this loan for potential delinquencies and determine any assistance that may be available to me; and</p>
                                            <p>(g) other actions permissible under applicable law</p>
                                            <h3 className='pt-3'>Borrower Signature</h3>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Borrower Signature :
                                                    <span style={{ color: "red" }}>"{acknowledgement?.borrower_signature_image_path}"</span>
                                                </h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>borrower signature date<span style={{ color: "red" }}>"{acknowledgement?.borrower_signature_date}"</span>
                                                </h4>
                                            </div>
                                            <h3 className='pt-3'>Broker Signature</h3>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Broker Signature :
                                                    <span style={{ color: "red" }}>"{acknowledgement?.broker_signature_image_path}"</span>
                                                </h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>broker signature date<span style={{ color: "red" }}>"{acknowledgement?.broker_signature_date} "</span>
                                                </h4>
                                            </div>

                                            <h3 className='pt-3'>Borrower Name</h3>
                                            <h4>Name<span style={{ color: "red" }}>"{acknowledgement?.borrower_name} "</span>
                                            </h4>
                                            <h1 className='pt-4'>Military Service</h1>
                                            <h3 className='pt-3'>Did you (or your deceased spouse) ever serve, or are you currently serving, in the United States Armed Forces?</h3>
                                            <div className='col-lg-12'>
                                                <p>Currently serving on active duty with projected expiration date of service/tour</p>
                                                <h4><span style={{ color: "red" }}>"{military?.active_duty}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>ever serve</p>
                                                <h4><span style={{ color: "red" }}>"{military?.ever_serve}"</span></h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>Currently retired, discharged, or separated from service</p>
                                                <h4><span style={{ color: "red" }}>"{military?.retired_from_service}"</span></h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>Only period of service was as a non-activated member of the Reserve or National Guard</p>
                                                <h4><span style={{ color: "red" }}>"{military?.non_activated}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>Surviving spouse</p>
                                                <h4><span style={{ color: "red" }}>"{military?.surviving_spouse}"</span> </h4>&nbsp;&nbsp;
                                            </div>
                                            <div className='col-lg-12'>
                                                <p>expiray date</p>
                                                <h4><span style={{ color: "red" }}>"{military?.expiray_date}"</span> </h4>&nbsp;&nbsp;
                                            </div>

                                            <h1 className='pt-4'>Demographic Information of Borrower</h1>
                                            <p>The purpose of collecting this information is to help ensure that all applicants are treated fairly and that the housing needs of communities and neighborhoods are being fulfilled. For residential mortgage lending, Federal law requires that we ask applicants for their demographic information (ethnicity, sex, and race) in order to monitor our compliance with equal credit opportunity, fair housing, and home mortgage disclosure laws. You are not required to provide this information, but are encouraged to do so. You may select one or more designations for "Ethnicity" and one or more designations for "Race." The law <span style={{ color: "#000", fontSize: "15px", fontWeight: "700" }}>provides that we may not discriminate</span>on the basis of this information, or on whether you choose to provide it. However, if you choose not to provide the information and you have made this application in person, Federal regulations require us to note your ethnicity, sex, and race on the basis of visual observation or surname. The law also provides that we may not discriminate on the basis of age or marital status information you provide in this application. If you do not wish to provide some or all of this information, please check below.</p>
                                            <h3 className='pt-3'>Ethnicity: Check one or more</h3>
                                            <h4>
                                                Hispanic or Latino
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Mexican
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>
                                                    Puerto Rican
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>
                                                    Cuban
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <h4>
                                                Other Hispanic or Latino – Print origin:
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                8.1.1.1
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so o</p>
                                            <h4>
                                                Not Hispanic or Latino
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                I do not wish to provide this information
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h3 className='pt-3'>Sex</h3>
                                            <h4>
                                                Male
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                Female
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                I do not wish to provide this information
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <p>For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so on.</p>
                                            <h3 className='pt-3'>Race</h3>
                                            <h4>
                                                American Indian or Alaska Native – Print name of enrolled or principal tribe
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>
                                                8.3.1
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <h4>
                                                Asian
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Asian Indian
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>Chinese
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Filipino
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>Japanese
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Korean
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                                <h4>Vietnamese
                                                    <span style={{ color: "red" }}>{0}</span>
                                                </h4>
                                            </div>
                                            <h4>Other Asian
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>8.3.2.1
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so on.</p>
                                            <h4>Black Or African American
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>Native Hawaiian or Other Pacific Islander
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>Native Hawaiian<span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>Guamanian Or Chamorro<span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>Samoan<span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>Other Pacific Islander – Print race:<span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>8.3.3.1<span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Fijian, Tongan, and so on.</p>
                                            <h4>White
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>I do not wish to provide this information<span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h3 className='pt-3'>To Be Completed by Financial Institution (for application taken in person):</h3>
                                            <div className='col-lg-12'>
                                                <p>Was the ethnicity of the Borrower collected on the basis of visual observation or surname?</p>
                                                <h4><span style={{ color: "red" }}>" "</span>
                                                </h4>&nbsp;&nbsp;
                                                <h4><span style={{ color: "red" }}>" "</span>
                                                </h4>
                                            </div>

                                            <h1 className='pt-4'>Demographic Information of Borrower</h1>
                                            <p>The purpose of collecting this information is to help ensure that all applicants are treated fairly and that the housing needs of communities and neighborhoods are being fulfilled. For residential mortgage lending, Federal law requires that we ask applicants for their demographic information (ethnicity, sex, and race) in order to monitor our compliance with equal credit opportunity, fair housing, and home mortgage disclosure laws. You are not required to provide this information, but are encouraged to do so. You may select one or more designations for "Ethnicity" and one or more designations for "Race." The law <span style={{ color: "#000", fontSize: "15px", fontWeight: "700" }}>provides that we may not discriminate</span>on the basis of this information, or on whether you choose to provide it. However, if you choose not to provide the information and you have made this application in person, Federal regulations require us to note your ethnicity, sex, and race on the basis of visual observation or surname. The law also provides that we may not discriminate on the basis of age or marital status information you provide in this application. If you do not wish to provide some or all of this information, please check below.</p>
                                            <h3 className='pt-3'>Ethnicity: Check one or more</h3>
                                            <h4>
                                                Hispanic or Latino
                                                <span style={{ color: "red" }}>{demographic?.ethnicity ? 1 : 0}</span>
                                            </h4>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Mexican
                                                    <span style={{ color: "red" }}>{demographic?.ethnicity}</span>
                                                </h4>
                                                <h4>
                                                    Puerto Rican
                                                    <span style={{ color: "red" }}>{demographic?.ethnicity}</span>
                                                </h4>
                                                <h4>
                                                    Cuban
                                                    <span style={{ color: "red" }}>{demographic?.ethnicity}</span>
                                                </h4>
                                            </div>
                                            <h4>
                                                Other Hispanic or Latino – Print origin:
                                                <span style={{ color: "red" }}>{demographic?.ethnicity}</span>
                                            </h4>
                                            <h4>
                                                8.1.1.1
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so o</p>
                                            <h4>
                                                Not Hispanic or Latino
                                                <span style={{ color: "red" }}>{demographic?.ethnicity ? 1 : 0}</span>
                                            </h4>
                                            <h4>
                                                I do not wish to provide this information
                                                <span style={{ color: "red" }}>{demographic?.ethnicity ? 1 : 0}</span>
                                            </h4>
                                            <h3 className='pt-3'>Sex</h3>
                                            <h4>
                                                Male
                                                <span style={{ color: "red" }}>{demographic?.gender === 1 ? 1 : 0}</span>
                                            </h4>
                                            <h4>
                                                Female
                                                <span style={{ color: "red" }}>{demographic?.gender === 2 ? 1 : 0}</span>
                                            </h4>
                                            <h4>
                                                I do not wish to provide this information
                                                <span style={{ color: "red" }}>{demographic?.gender === 3 ? 1 : 0}</span>
                                            </h4>
                                            <p>For example: Argentinean, Colombian, Dominican, Nicaraguan, Salvadoran, Spaniard, and so on.</p>
                                            <h3 className='pt-3'>Race</h3>
                                            <h4>
                                                American Indian or Alaska Native – Print name of enrolled or principal tribe
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>
                                                8.3.1
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>
                                                Asian
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Asian Indian
                                                    <span style={{ color: "red" }}>{demographic?.race}</span>
                                                </h4>
                                                <h4>Chinese
                                                    <span style={{ color: "red" }}>{demographic?.race}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Filipino
                                                    <span style={{ color: "red" }}>{demographic?.rac}</span>
                                                </h4>
                                                <h4>Japanese
                                                    <span style={{ color: "red" }}>{demographic?.race}</span>
                                                </h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Korean
                                                    <span style={{ color: "red" }}>{demographic?.race}</span>
                                                </h4>
                                                <h4>Vietnamese
                                                    <span style={{ color: "red" }}>{demographic?.race}</span>
                                                </h4>
                                            </div>
                                            <h4>Other Asian
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>8.3.2.1
                                                <span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Hmong, Laotian, Thai, Pakistani, Cambodian, and so on.</p>
                                            <h4>Black Or African American
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>Native Hawaiian or Other Pacific Islander
                                                <span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>Native Hawaiian<span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>Guamanian Or Chamorro<span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>Samoan<span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>Other Pacific Islander – Print race:<span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h4>8.3.3.1<span style={{ color: "red" }}>" "</span>
                                            </h4>
                                            <p>For example: Fijian, Tongan, and so on.</p>
                                            <h4>White
                                                <span style={{ color: "red" }}>{0}</span>
                                            </h4>
                                            <h4>I do not wish to provide this information<span style={{ color: "red" }}>{demographic?.race}</span>
                                            </h4>
                                            <h3 className='pt-3'>To Be Completed by Financial Institution (for application taken in person):</h3>
                                            <div className='col-lg-12'>
                                                <p>Was the ethnicity of the Borrower collected on the basis of visual observation or surname?</p>
                                                <h4><span style={{ color: "red" }}>"{demographic?.ethivity_on_observation} "</span>
                                                </h4>&nbsp;&nbsp;


                                            </div>

                                            <div className='col-lg-12'>
                                                <p>Was the sex of the Borrower collected on the basis of visual observation or surname?</p>
                                                <h4><span style={{ color: "red" }}>"{demographic?.gender_on_observation} "</span>
                                                </h4>&nbsp;&nbsp;

                                            </div>
                                            <div className='col-lg-12'>
                                                <p>Was the race of the Borrower collected on the basis of visual observation or surname?</p>
                                                <h4><span style={{ color: "red" }}>"{demographic?.race_on_observation} "</span>
                                                </h4>&nbsp;&nbsp;

                                            </div>
                                            <h3 className='pt-3'>The Demographic Information was provided through:</h3>
                                            <div className='col-lg-12'>
                                                <h4>
                                                    Face-to-Face Interview (includes Electronic Media w/ Video Component)
                                                    <span style={{ color: "red" }}>{demographic?.information}</span>
                                                </h4>&nbsp;&nbsp;
                                                <h4>Telephone Interview <span style={{ color: "red" }}>{demographic?.information}</span>
                                                </h4>
                                            </div>
                                            <h4>Fax or Mail <span style={{ color: "red" }}>{demographic?.information}</span>
                                            </h4>
                                            <h4>Email or Internet <span style={{ color: "red" }}>{demographic?.information}</span>
                                            </h4>
                                            <h3 className='pt-3'>Borrower Name:</h3>
                                            <h4>Name: <span style={{ color: "red" }}>"{demographic?.first_name} "</span>
                                            </h4>
                                            <p>Uniform Residential Loan Application Freddie Mac Form 65 • Fannie Mae Form 1003 Effective 1/2021</p>


                                            <h1 className='pt-4'>Loan Originator Information</h1>
                                            <h4>Loan Originator Organization Name: <span style={{ color: "red" }}>"{orginatorinfo?.originator_organization_name} "</span>
                                            </h4>
                                            <h3 className='pt-3'>Address</h3>
                                            <h4>Address: <span style={{ color: "red" }}>"{orginatorinfo?.address} "</span></h4>
                                            <div className='col-lg-12'>
                                                <h4>Loan Originator Organization NMLSR ID# <span style={{ color: "red" }}>"{orginatorinfo?.organisation_nmlsr_id}  "</span></h4>&nbsp;&nbsp;
                                                <h4>  State License ID#  <span style={{ color: "red" }}>"{orginatorinfo?.originator_license_id} "</span></h4>
                                            </div>
                                            <h4>Loan Originator Name <span style={{ color: "red" }}>"{orginatorinfo?.originator_name}  "</span></h4>
                                            <div className='col-lg-12'>
                                                <h4>Loan Originator NMLSR ID# <span style={{ color: "red" }}>"{orginatorinfo?.originator_nmlsr_id}  "</span></h4>&nbsp;&nbsp;
                                                <h4>State License ID# <span style={{ color: "red" }}>" "</span></h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>Email <span style={{ color: "red" }}>"{orginatorinfo?.email}  "</span></h4>
                                                <h4>Phone <span style={{ color: "red" }}>"{orginatorinfo?.phone}  "</span></h4>
                                            </div>
                                            <div className='col-lg-12'>
                                                <h4>Signature <span style={{ color: "red" }}>"{orginatorinfo?.signature}  "</span></h4>
                                                <h4>start date <span style={{ color: "red" }}>" {orginatorinfo?.date} "</span></h4>


                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
            </>


        </>
    )
}

export default Documents
