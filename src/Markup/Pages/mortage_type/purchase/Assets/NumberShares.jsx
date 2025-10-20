import React from 'react'

export const NumberShares = ({setFinalInstitute, value,fieldsError}) => {

  const {numberOfShares} = value

  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col">
                <div className="mt-3">
                  <h5 className="textdark">Number of shares</h5>
                  <input
                    type="number"
                    className="form-control"
                    value={numberOfShares}
                    placeholder="Required"
                    onChange={(e) => setFinalInstitute((perv)=>({...perv,numberOfShares:(e.target.value)}))}
                  />
                </div>
                </div>
                {fieldsError?.no_of_shares
                        ? fieldsError?.no_of_shares.map((e) => (
                            <p className="text-danger col-lg-12">{e}</p>
                          ))
                        : null}
            </div>
        </div>
    </>
  )
}

export default NumberShares;