import React, { useState } from 'react'
import TagsInput from 'react-tagsinput'
import Button from './LoanOfficer/GlobalComponent/Button';

const Compensation = () => {
  const [tags, setTags] = useState([]);
  const handleitput = (tags) => {
    setTags(tags);
  };
  return (
    <>
      <div className='row '>
        <div className='col-md-7'>
          <h3>AD MORTAGE (HAS RATES IN PRICING ENGINE)</h3>
        </div>
        <div className='col-md-5 text-end'>
          <p>Lenders/AD Mortage (HAS RATES IN PRICING ENGINE)</p>
        </div>


      </div>
      <br />
      <h6>Broker Compensation </h6>
      <br />
      <div className='row' style={{

        borderBottom: "1px solid lightgray"

      }}>
        <div className='col-md-4'>
          <p>licensed State</p>
        </div>
        <div className='col-md-2'>
          <p>LPC%(e.g 1.25 for 1.25)</p>
        </div>
        <div className='col-md-2'>
          <p>Default BPC on new transection%</p>
        </div>
        <div className='col-md-2'>
          <p>minimum LPC ammount</p>
        </div>
        <div className='col-md-2'>
          <p>maximium LPC ammount</p>
        </div>
      </div>
      <div className='row pt-5'>
        <div className='col-md-4'>
          <TagsInput onChange={handleitput} value={tags} className='form-control rounded-0 tagsInput2' />

        </div>
        <div className='col-md-2'>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text rounded-0  h-100 ">%</div>
            </div>
            <input type="text" className="form-control rounded-0 pb-0" id="inlineFormInputGroupUsername" placeholder="2.5" />
          </div>
        </div>
        <div className='col-md-2'>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text rounded-0 h-100">%</div>
            </div>
            <input type="text" className="form-control rounded-0" id="inlineFormInputGroupUsername" placeholder="2.1" />
          </div>
        </div>
        <div className='col-md-2'>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text rounded-0  h-100">$</div>
            </div>
            <input type="text" className="form-control rounded-0" id="inlineFormInputGroupUsername" placeholder="2.6" />
          </div>
        </div>
        <div className='col-md-2 mb-4'>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text rounded-0  h-100">$</div>
            </div>
            <input type="text" className="form-control rounded-0" id="inlineFormInputGroupUsername" placeholder="20,000" />
          </div>
        </div>
      </div>
                    <div className='col-md-12  mb-4'>
                        <div className='text-start'>
                       <Button   btntext={"Submit"} />
                        </div>
                    </div>
    </>
  )
}

export default Compensation