/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import { RiImageEditFill } from 'react-icons/ri';
import { BiMessageMinus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Baseurl from '../../../../Baseurl';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';




const MyPage = () => {
  const token = useSelector((state) => state.auth.auth.idToken);
  const [error, setError] = useState()
  const [datas, SetDatas] = useState()

  const [zillow, setzillow] = useState(false);
  const [google, setgoogle] = useState(false);
  const [link_in_signature, setlink_in_signature] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxes(prevState => ({
  //     ...prevState,
  //     [name]: checked ===true? 1 : 0
  //   }));
  // };
  // useEffect(() => {
  //   const storedCheckboxes = localStorage.getItem('checkboxes');
  //   if (storedCheckboxes) {
  //     setCheckboxes(JSON.parse(storedCheckboxes));
  //   }
  // }, []);

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setCheckboxes(prevState => ({
  //     ...prevState,
  //     [name]: checked
  //   }));
  // };




  const [link, SetLink] = useState('')
  const [domain, SetDomain] = useState('')
  const [clients_review, SetClients_review] = useState('')
  const [display_review, SetDisplay_review] = useState()
  const [my_video, SetMy_video] = useState('')
  const [web_page_design, SetWeb_page_design] = useState('')
  const [web_page_content, SetWeb_page_content] = useState('')
  const [header_footer, SetHeader_footer] = useState('')
  const [bio, SetBio] = useState('')
  const [custom_scripts, SetCustom_scripts] = useState('')
  const [custom_meta_name, SetCustom_meta_name] = useState('')
  const [custom_meta_content, SetCustom_meta_content] = useState('')
  const [Id, SetId] = useState(null)
  const [show, setShow] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const handleCloseScript = () => setShowScript(false);
  const handleShowScript = () => setShowScript(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleypageStore = () => {
    const formdata = new FormData()
    formdata.append('link', link)
    formdata.append('domain', domain)
    formdata.append('link_in_signature', link_in_signature ? 1 : 0)
    formdata.append('clients_review', clients_review)
    formdata.append('display_review', display_review)
    formdata.append('google', google ? 1 : 0)
    formdata.append('zillow', zillow ? 1 : 0)
    formdata.append('my_video', my_video)
    formdata.append('web_page_design', web_page_design)
    formdata.append('web_page_content', web_page_content)
    formdata.append('header_footer', header_footer)
    formdata.append('bio', bio)
    formdata.append('custom_scripts', custom_scripts)
    formdata.append('custom_meta_name', custom_meta_name)
    formdata.append('custom_meta_content', custom_meta_content)
    if (Id != null) {
      formdata.append('id', Id ? Id : null)
    }
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}store/profile/my/page`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    axios(config)
      .then(function (response) {
        SetId(response?.data?.data?.id)
        setError('')
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

  let userDetail = localStorage.getItem('userDetail');
  userDetail = JSON.parse(userDetail);
  const Token = useSelector((state) => state.auth.auth.idToken)
  const handleget = () => {
    const formdata = new FormData()
    formdata.append("user_id", userDetail.id)
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}get/profile/my/page`,
      data: formdata,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(datas, "domain2")
        SetDatas(response?.data?.data)
        SetId(response?.data?.data?.id)
        SetLink(response?.data?.data?.link)
        SetClients_review(response?.data?.data?.clients_review)
        SetBio(response?.data?.data?.bio)
        SetDomain(response?.data?.data?.domain)
        console.log(response?.data?.data?.id, "domain")
        setgoogle(response?.data?.data?.google)
        setzillow(response?.data?.data?.zillow)
        setlink_in_signature(response?.data?.data?.link_in_signature)
        SetCustom_scripts(response?.data?.data?.SetCustom_scripts)
        SetCustom_meta_content(response?.data?.data?.custom_meta_content)
        SetCustom_meta_name(response?.data?.data?.custom_meta_name)
        display_review(response?.data?.data?.display_review)
        SetHeader_footer(response?.data?.data?.header_footer)
        SetMy_video(response?.data?.data?.my_video)
        SetWeb_page_content(response?.data?.data?.web_page_content)
        SetWeb_page_design(response?.data?.data?.web_page_design)
        setError('')
        // Swal.fire({
        //   showCloseButton: true,
        //   toast: true,
        //   icon: "success",
        //   title: response?.data?.message,
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
      .catch((error => {
        setError(error?.response?.data?.data?.errors)
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
      }))

  }

  const handleCheckbox1 = (event) => {
    const { checked } = event.target;
    if (checked) {
      setgoogle(true);
    }
    else {
      setgoogle(false);

      setlink_in_signature(false)
    }
    console.log(checked, "checked")
  };
  const handleCheckbox2 = (event) => {
    const { checked } = event.target;
    if (checked) {
      setzillow(true);
    }
    else {
      setzillow(false);
    }
    console.log(checked, "checked")
  };
  const handleCheckbox3 = (event) => {
    const { checked } = event.target;
    if (checked) {
      setlink_in_signature(true)
    }
    else {
      setlink_in_signature(false)
    }
    console.log(checked, "checked")
  };

  useEffect(() => { handleget() }, [])



  const handleypage = (SetState) => (e) => {
    SetState(e.target.value);
  }

  const handleDomain = () => {
    SetDomain(`https://${domain}.com`)
  }
  const handleLink = () => {
    SetLink(`https://${link}.com`)
  }
  // console.log(domain, "domain")
  return (
    <>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4">
          <span className='text-bold text-upercase'>My Page</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-12 mb-4">
          <span className='text-muted text-lowercase'>This is a landing page for Loan officer or Loan officer assistant (who has license) or Real Estate Agent. Clients who visit the landing page can run rate quote, create alert, fill out application, etc. and those alerts or applications will be automatically assigned to Loan officer/Loan officer assistant/Loan processor following the selected values in transaction defaults tab.</span>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize ">Link <span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8">
          <div class="input-group">
            <span class="input-group-text text-lowercase p-2 rounded-0" type="button" style={{ fontSize: "10px" }} id="basic-addon3" onClick={handleLink}>https://www.loanfactory.com/</span>
            <input type="text" value={link} defaultValue={datas?.bio} class="form-control rounded-0" onChange={handleypage(SetLink)} id="basic-url" aria-describedby="Calfornia" />
          </div>
          <span className='text-muted text-lowercase' >Set URL to the domain will be removed & not displayed in the Our team page.</span>
          {error?.link
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.link
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">Domain<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8">
          <div class="input-group mb-3">
            <input type="text" class="form-control p-2 rounded-0" value={domain} onChange={handleypage(SetDomain)} defaultValue={datas?.domain} placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button class="btn btn-outline-light p-2 rounded-0" type="button" id="button-addon2 " onClick={handleDomain}>Add a custom domain</button>
          </div>
          {error?.domain
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.domain
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
        </div>
        <div class="col-lg-8">
          <div class="form-check">
            {/* <input class="form-check-input ms-2" type="checkbox" checked={checkboxes?.link_in_signature==1}
              onChange={handleCheckboxChange}  id="flexCheckDefault" /> */}
            <input class="form-check-input ms-2" type="checkbox"
              onChange={handleCheckbox1} id="flexCheckDefault" checked={link_in_signature == 1} />
            <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
              Show this page's link in Signature
            </label>
          </div>
          {error?.link_in_signature
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.link_in_signature
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">Client's reviews<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <span className='text-muted text-capitalize' style={{ fontSize: "10px" }}>you can display your zillow, google, or yelp reviews on your page</span>
        </div>
        <div class="col-lg-8">
          <textarea class="form-control rounded-0" onChange={handleypage(SetClients_review)} defaultValue={datas?.clients_review} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
          {error?.clients_review
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.clients_review
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">display reviews
          </label>
        </div>
        <div class="col-lg-8">
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Parsonal Reviews">
              <div class="col-lg-12">
                <textarea class="form-control rounded-0" onChange={handleypage(SetDisplay_review)} defaultValue={datas?.display_review} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "90px" }}></textarea>
                <span className='text-muted text-capitalize'>the reviews that wes claimed on your loans (your are loan officer) will be displayed on your home page</span>
                {error?.display_review
                  && (
                    <span className='error-container text-danger fw-normal fs-6 d-grid'>
                      {error?.display_review
                      }
                    </span>

                  )}
              </div>
              <div class="row align-items-start mt-3">
                <div class="col-lg-12">
                  <div class="form-check">
                    <input class="form-check-input ms-2" type="checkbox" checked={google == 1}
                      onChange={handleCheckbox2} id="flexCheckDefault" />
                    <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
                      Google
                    </label>
                  </div>
                  {error?.google
                    && (
                      <span className='error-container text-danger fw-normal fs-6 d-grid'>
                        {error?.google
                        }
                      </span>

                    )}
                </div>
              </div>
              <div class="row align-items-start mt-3">
                <div class="col-lg-8">
                  <div class="form-check">
                    <input class="form-check-input ms-2" type="checkbox" checked={zillow == 1}
                      onChange={handleCheckbox2} id="flexCheckDefault" />
                    <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
                      Zillow
                    </label>
                  </div>
                  {error?.zillow
                    && (
                      <span className='error-container text-danger fw-normal fs-6 d-grid'>
                        {error?.zillow
                        }
                      </span>

                    )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Company Reviews">
              <div class="col-lg-12">
                <textarea class="form-control rounded-0" onChange={handleypage(SetDisplay_review)} value={datas?.display_review} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "90px" }}></textarea>
                <span className='text-muted text-capitalize'>the reviews that wes claimed on your loans (your are loan officer) will be displayed on your home page</span>
                {error?.display_review
                  && (
                    <span className='error-container text-danger fw-normal fs-6 d-grid'>
                      {error?.display_review
                      }
                    </span>

                  )}
              </div>
              <div class="row align-items-start mt-3">
                <div class="col-lg-12">
                  <div class="form-check">
                    <input class="form-check-input ms-2" type="checkbox"
                      onChange={handleCheckbox3} id="flexCheckDefault" />
                    <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
                      Google
                    </label>
                  </div>
                  {error?.google
                    && (
                      <span className='error-container text-danger fw-normal fs-6 d-grid'>
                        {error?.google
                        }
                      </span>

                    )}
                </div>
              </div>
              <div class="row align-items-start mt-3">
                <div class="col-lg-8">
                  <div class="form-check">
                    <input class="form-check-input ms-2" type="checkbox" name='zillow1'
                      onChange={handleCheckbox3} id="flexCheckDefault" />
                    <label class="form-check-label text-lowercase  text-muted ms-2" for="flexCheckDefault">
                      Zillow
                    </label>
                  </div>
                  {error?.zillow
                    && (
                      <span className='error-container text-danger fw-normal fs-6 d-grid'>
                        {error?.zillow
                        }
                      </span>

                    )}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4 d-grid">
          <label for="inputPassword" className="col-form-label text-capitalize">my video<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-muted text-lowercase'>this video will be display on your home page</span>
        </div>
        <div class="col-lg-8">
          <div class="input-group">
            <input type="text" class="form-control rounded-0"  onChange={handleypage(SetMy_video)} defaultValue={datas?.my_video} placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button class="btn btn-outline-light p-2 rounded-0" type="button" id="button-addon2">Pic a design</button>
          </div>
          <span className='text-muted text-lowercase'>Eg:https://www.youtube.com/watch?v=VquyDc1lpkl</span>
          {error?.my_video
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.my_video
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start mt-3">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">web page design
          </label>
        </div>
        <div class="col-lg-8">
          <div class="input-group mb-3">
            <input type="text" class="form-control  rounded-0" onChange={handleypage(SetWeb_page_design)} defaultValue={datas?.web_page_design} placeholder="Express.agent_1" aria-label="Recipient's username" aria-describedby="button-addon2" />
            <button class="btn btn-outline-light p-2 rounded-0" type="button" id="button-addon2">Pic a design</button>
          </div>
          {error?.web_page_design
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.web_page_design
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">web page's content
          </label>
        </div>
        <div class="col-lg-8">
          <div class="input-group mb-3">
            <input type="text" class="form-control  rounded-0" name='web_page_content' onChange={handleypage(SetWeb_page_content)} defaultValue={datas?.web_page_content} placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
            {/* <button class="btn btn-outline-light p-2 rounded-0" type="button" id="button-addon2"><RiImageEditFill /> Edit</button> */}
          </div>
          {error?.web_page_content
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.web_page_content
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">Header and footer
          </label>
        </div>
        <div class="col-lg-8">
          <div class="input-group mb-3">
            <input type="text" class="form-control  rounded-0" name='header_footer' onChange={handleypage(SetHeader_footer)} defaultValue={datas?.header_footer
            } placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
            {/* <button class="btn btn-outline-light p-2 rounded-0" type="button" id="button-addon2"><RiImageEditFill /> Edit</button> */}
          </div>
          {error?.header_footer
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.header_footer
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize">bio<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span></label>
        </div>
        <div class="col-lg-8">
          <div class="form-floating">
            <textarea class="form-control rounded-0" name='bio' onChange={handleypage(SetBio)} defaultValue={datas?.bio} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
          </div>
          <span className='text-muted text-capitalize'>It is manadatory to write a bio to promote yourself as a Loan officer.The bio will be displayed on your  Lo website.</span>
          {error?.bio
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.bio
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start mt-4">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize ">custom scripts<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-capitalize text-muted' style={{ fontSize: "10px" }} >these scripts will be inserted at the end of the body of all web pages useful for inserting scripts like google remarketing <Link to="#" className='text-primary'>adwords</Link></span>
        </div>
        <div class="col-lg-8">
          <div class="form-check border-bottom">
            <button class="btn btn-outline-light shadow p-2 rounded-0 mb-2" type="button" id="button-addon2" onClick={handleShowScript}><BiMessageMinus />Add</button>
            {/* <input type="text" class="form-control  rounded-0"  onChange={handleypage(SetHeader_footer)} defaultValue={datas?.} placeholder="Custom scripts" aria-label="Recipient's username" aria-describedby="button-addon2" /> */}
          </div>
          {error?.custom_scripts
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.custom_scripts
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start mt-4">
        <div class="col-lg-4">
          <label for="inputPassword" className="col-form-label text-capitalize ">custom meta data<span className='text-muted' style={{ fontSize: "10px" }}>(optional)</span>
          </label>
          <span className='text-capitalize text-muted' style={{ fontSize: "10px" }}>these meta tegs will be inserted at the into thw (head) of all web pages</span>
        </div>
        <div class="col-lg-8">
          <div class="form-check border-bottom">
            <button class="btn btn-outline-light shadow p-2 rounded-0 mb-2" type="button" id="button-addon2" onClick={handleShow}><BiMessageMinus />Add</button>
          </div>
          {error?.custom_meta_content
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.custom_meta_content
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4 mx-auto">
          <label for="inputPassword" className="col-form-label text-capitalize ">Custom name
          </label>
        </div>
        <div class="col-lg-8 mt-3">
          <div class="form-check">
            <input type="text" class="form-control  rounded-0" onChange={handleypage(SetCustom_meta_name)} defaultValue={datas?.custom_meta_name} placeholder="Custom name" aria-label="Recipient's username" aria-describedby="button-addon2" />
          </div>
          {error?.custom_meta_name
            && (
              <span className='error-container text-danger fw-normal fs-6 d-grid'>
                {error?.custom_meta_name
                }
              </span>

            )}
        </div>
      </div>
      <div class="row align-items-start">
        <div class="col-lg-4 mb-4 pt-4 mx-auto">
          <button className='btn btn-primary rounded-0' onClick={handleypageStore}>Submit </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>custom meta content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={handleypage(SetCustom_scripts)}
                defaultValue={datas?.custom_scripts
                }
                placeholder="Enter custom meta content"
                autoFocus
                className='rounded-0'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showScript} onHide={handleCloseScript}>
        <Modal.Header closeButton>
          <Modal.Title>custom meta name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                onChange={handleypage(SetCustom_meta_content)}
                defaultValue={datas?.custom_meta_content} placeholder="Enter custom meta name"
                autoFocus
                className='rounded-0'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseScript}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>

  )
}

export default MyPage