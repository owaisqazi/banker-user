
import React from 'react';
import Header from '../Layout/Header';
import Table1 from './Table1';
import ProfileInfo from './mortage_type/Profile/ProfileInfo';


const DocumentUpload = () => {
  

  return (
    <>
      <>
      <Header />
      <hr />
      <div className="container-fluid ps-4">
        <div className="row">
          {/* <SidebarDash /> */}
          <div className="col-md-10 new-mr1">
           <Table1 />
          </div>
        <ProfileInfo/>
        </div>
      </div>
    </>
    </>
  );
};

export default DocumentUpload;
