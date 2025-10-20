import React, { useState } from 'react'
import html2pdf from 'html2pdf.js';
import Documents from './Documents';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import ProfileInfo from './mortage_type/Profile/ProfileInfo';
import SidebarDash from './mortage_type/heloc/Tanent/SidebarDash';

const MainDocument = () => {
    const [Loader, setLoader] = useState(false)
    const convertToPdf = async () => {
        setLoader(true)
        const element = document.getElementById('my-component');
        const options = {
            margin: 10, // You can adjust margins as needed
            filename: 'my-component',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' },
        };

        await html2pdf()
            .from(element).set(options)
            .save('my-component')
        setLoader(false)
    };
    console.log(Loader, "loader")
    return (
        <>

            <Header />
            <hr />
            <div className="container-fluid ps-4">
                <div className="row">
                    <SidebarDash />
                    <div className="col-md-8 new-mr1">
                        <div className='d-flex justify-content-end pe-auto col-lg-12'>
                            <Link to={`/Borrower/Documents`}>
                                <button type="button" class="btn btn-primary rounded-0 m-2 text-end" style={{ float: 'right;' }}>Documents Details</button>
                            </Link>
                            {Loader ? <div className="loader"></div> : null}
                            <button type="button" class="btn btn-primary rounded-0 m-2 text-end" style={{ float: 'right;' }} onClick={convertToPdf}>Download to PDF</button>

                        </div>
                        <div className='col-lg-12' id="my-component">
                        <Documents />
                    </div>
                    </div>
                    <ProfileInfo />
                </div>
            </div>
        </>
    )
}

export default MainDocument
