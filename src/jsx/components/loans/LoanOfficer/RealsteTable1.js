/* eslint-disable no-unused-vars */
import { html2pdf } from 'html2pdf.js';
import React from 'react'
import Documents from './Documents';
import { Button } from 'react-bootstrap';

const RealsteTable1 = () => {
  function generatePDF() {
      const element = document.getElementById('invoice');
      html2pdf()
          .from(element)
          .save();

  }

  return (
    <>
   {/* <button class="waves-effect waves-light" onclick={generatePDF()}>Generate Invoice</button> */}
    <div id='main'>
<Documents/>
    </div>
    </>
  )
}

export default RealsteTable1