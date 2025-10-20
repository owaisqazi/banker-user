import React from 'react'
import './filtering.css'

const Purchase = () => {
    return (
        <>
        <div className='col-lg-12 col-md-12 col sm-12'>

            <div className='pb-3 text-dark'>
                <label for="exampleFormControlInput1 text-dark" class="form-label">Property Valuew</label>
                <div class="input-group mb-3">
                    <span class="input-group-text text-dark" id="basic-addon1">$</span>
                    <input type="text" class="form-control text-dark" placeholder="500.000" aria-label="500.000" aria-describedby="basic-addon1" />
                </div>
                <label for="basic-url" class="form-label text-dark">Lpan-to:80%</label>
            </div>
            <div className='pb-3'>
                <label for="exampleFormControlInput1 text-dark" class="form-label">Loan Amount</label>
                <div class="input-group mb-3">
                    <span class="input-group-text text-dark">$</span>
                    <input type="text" class="form-control text-dark" aria-label="Amount (to the nearest dollar)" />
                    <span class="input-group-text text-dark">LTV</span>
                </div>
                <label for="basic-url" class="form-label text-dark">(Conforming)</label>
            </div>
            <div class="col-md-12">
                <label for="inputZip" class="form-label text-dark">Zip Code</label>
                <input type="text" class="form-control text-dark" id="inputZip" placeholder='531151' />
                <label for="inputZip" class="form-label text-dark">Waukesh. WI</label>
            </div>
            <div class="col-md-12 pt-3">
                <label for="inputZip" class="form-label text-dark">FICO Credit Score</label>
                <select class="form-select p-3 text-dark" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <details class="pt-3 pb-3" id='text21'>
                <div class="col-md-12  pt-4">
                    <label for="inputZip" class="form-label text-dark">Loan Officer Compensation</label>
                    <select class="form-select p-3" aria-label="Default select example text-dark">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div className='pb-3 pt-4'>
                    <label for="exampleFormControlInput1" class="form-label text-dark">Borrower-Paid Compensation</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text text-dark" id="basic-addon1">96</span>
                        <input type="text" class="form-control text-dark" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <label for="basic-url" class="form-label text-dark">Amount:54.000.00</label>
                </div>
                <div class="col-md-12">
                    <label for="inputZip" class="form-label text-dark">Poerperty tpye</label>
                    <select class="form-select p-3 text-dark" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label for="inputZip text-dark" class="form-label">1 Unitis</label>
                </div>
                <div class="col-md-12 pt-2">
                    <label for="inputZip text-dark" class="form-label">Occupancy type</label>
                    <select class="form-select p-3 text-dark" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="col-md-12 pt-4">
                    <label for="inputZip" class="form-label text-dark">Loan tpye</label>
                    <select class="form-select p-3 text-dark" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="col-md-12 pt-4">
                    <label for="inputZip" class="form-label text-dark">Search Rates Form (Optionals)</label>
                    <select class="form-select p-3 text-dark" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="form-check pt-3 text-dark">
                    <input class="form-check-input text-dark" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label text-dark" for="flexCheckDefault">
                        Are You Aware Of Any Second Lian On the Porperty?
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input text-dark" type="checkbox" value="" id="flexCheckChecked" checked />
                    <label class="form-check-label text-dark" for="flexCheckChecked">
                        Impound/ Escrow  Account
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input text-dark" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label text-dark" for="flexCheckDefault">
                        Waive Lender Fee
                    </label>
                </div>
            </details>


            <div class=" col-lg-12 form-check text-center text-primary p-0 text-dark">
                <button type="button" class="btn btn-primary w-25 usa-2 ">GET QUOTE</button>
            </div>
        </div>
        </>
    )
}

export default Purchase