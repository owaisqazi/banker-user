import React, { useState, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import '../LoanOfficer/Document.css';

function Signature() {
    const [trimmedDataURL, setTrimmedDataURL] = useState(null);
    const sigPad = useRef(null);

    const clear = () => {
        sigPad.current.clear();
    };

    const trim = () => {
        if (sigPad.current) {
            const dataURL = sigPad.current.getTrimmedCanvas().toDataURL('image/png');
            setTrimmedDataURL(dataURL);
            console.log(trimmedDataURL, 'dataURL')
        }
    };

    return (
        <div className='row'>
            <div className='col-lg-8'>
                <div className='sigContainer shadow'>
                    <SignaturePad
                        canvasProps={{ className: 'sigPad' }}
                        ref={sigPad}
                    />
                </div>
            </div>
            <div className='col-lg-4 mb-3'>
                <div class="d-grid gap-2 col-12 mx-auto pt-2">
                    <button class="btn btn-primary rounded-0" type="button" onClick={clear}> Clear</button>
                    <button class="btn btn-primary rounded-0" type="button" onClick={trim}>Save</button>
                </div>
            </div>
            {/* <div className='col-lg-12 my-5'>
      {trimmedDataURL ? (
        <img className='sigImage' src={trimmedDataURL} alt="Signature" />
      ) : null}
      </div> */}
        </div>
    );
}

export default Signature;
