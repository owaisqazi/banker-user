/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import "./AppProfile.css"
import { useSelector } from 'react-redux';
import axios from 'axios';
import Baseurl from '../../../../Baseurl';
import TagsInput from 'react-tagsinput';
import Select from 'react-select';
// import { append } from '@syncfusion/ej2-base';
import Swal from 'sweetalert2';

const ConpanyWebsite = () => {
  const token = useSelector((state) => state.auth.auth.idToken);
  const [error, SetError] = useState("")
  const [datas, SetDatas] = useState("")

  const [default_page, SetDefault_page] = useState([])
  const [Id, SetId] = useState()



  const options = [
    { value: 'america', label: 'america' },
    { value: 'USA', label: 'USA' },
    { value: 'USD', label: 'USD' },
    { value: 'Austria', label: 'Austria' }
  ]
  // let text = options.join('');
  // console.log(text,"text")

  const HandleConWeb = () => {
    const formdata = new FormData();
    default_page?.map((e, i) => (formdata.append(`default_page[${i}]`, e?.value)))
    // formdata.append("user_id", datas.user_id)
    // formdata.append("id", datas.id ? datas.id : null)
    // console.log(default_page?.map((e, i) => JSON.stringify(e.value)))
    // language?.map((e, i) => (formdata.append(`language[${i}]`, e)))
    language?.map((e, i) => (formdata.append(`language[${i}]`, e)))
    if (Id != null) {
      formdata.append('id', Id ? Id : null)
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/company/website`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    axios(config)
      .then(function (response) {
        // SetId(response.data.data?.id)
        SetError('')
        Swal.fire({
          showCloseButton: true,
          toast: true,
          icon: "success",
          title:response?.data?.message,
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
        SetError('')  
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
  // const defaultLag = datas?.language;
  // const default_pages = datas?.language;

  // const handlelanguage = (language) => {
  //   SetLanguage(language);
  //   console.log(language,"=======")
  // };


 

  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const Handleget = () => {
    const formdata = new FormData()
    formdata.append("user_id", userDetail.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/company/website`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    }
    axios(config)
      .then(function (response) {
        console.log(response)
        SetError('')
        SetDatas(response.data.data)
        SetId(response.data.data?.id)
        // SetLanguage([...response?.data?.data?.language?.split(",")])
        SetLanguage([...response?.data?.data?.language?.split(",")])
        // SetDefault_page([...response?.data?.data?.default_page?.split(",")])
        const countries = response?.data?.data?.default_page.split(",");
        const state = [];

        for (const country of countries) {
          const countryObject = {
            value: country,
            label: country,
          };
          state.push(countryObject);
        }
        console.log(state, "state")
        SetDefault_page(state)
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title:response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      })
      .catch((error) => {
        console.log(error)
        SetError('')
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "error",
        //   title: error?.response?.data?.message,
        //   animation: true,
        //   position: "top-right",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener("mouseenter", Swal.stopTimer);
        //     toast.addEventListener("mouseleave", Swal.resumeTimer);
        //   },
        // });
      })
  }
  // console.log(datas.language, "language1231")

  useEffect(() => { Handleget() }, [])
  
  // const [tags, setTags] = useState([]);
  const [language, SetLanguage] = useState([])

  const handlelanguage = (language) => {
    SetLanguage(language);
  };
  return (
    <>
      <div class="container-fluid">
        <div class="row align-items-start">
          <div class="col-lg-12 mb-4">
            <span className='text-bold text-upercase'>Conpany Website</span>
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4">
            <label for="inputPassword" className="col-form-label text-capitalize">Conpany Website</label>
          </div>
          <div class="col-lg-8 mb-4 pt-4">

            <Select
              isMulti
              name="colors"
              options={options}
              onChange={SetDefault_page}
              value={default_page}
              defaultValue={default_page}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            {error?.default_page
              && error?.default_page?.length >= 1 ? (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.default_page
                }
              </span>

            ) : null}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4">
            <label for="inputPassword" className=" col-form-label text-capitalize">Languages</label>
          </div>
          <div class="col-lg-8 mb-4 pt-4">
            <div className=" col-sm-5 input-group">
              {/* <TagsInput  className='form-control rounded-0 tagsInput2' /> */}
              {/* <TagsInput value={language} onChange={handlelanguage}  className='form-control rounded-0 rounded-0 tagsInput2' /> */}
              <TagsInput value={language} onChange={handlelanguage} className='form-control rounded-0 tagsInput2' />
            </div>
            {error?.language && error?.language?.length >= 0 ? (
              <span className='error-container text-danger fw-normal fs-6'>
                {error?.language[0]}
              </span>

            ) : null}
          </div>
        </div>
        <div class="row align-items-start">
          <div class="col-lg-4 mb-4 pt-4 mx-auto">
            <button className='btn btn-primary rounded-0' onClick={HandleConWeb}>Submit </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConpanyWebsite