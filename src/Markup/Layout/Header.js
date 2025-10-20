/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import Logo from "../../Images/Bankerlogo.png";
import Logout from "./Logout";
import user from "../../Images/icons/user.png";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { BsFillChatFill } from "react-icons/bs";

import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
const Header = () => {
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  let userdata = localStorage.getItem("userDetail");
  let token = localStorage.getItem("usertoken");
  let image_path = localStorage.getItem("image_path");
  let image = localStorage.getItem("image");
  console.log(`${user}`, "image_path12");
  // userdata = JSON.parse(userdata);
  // const GetCompanies = () => {
  //   setLoader(true);
  //   let token = localStorage.getItem("usertoken");
  //   var config = {
  //     method: "get",
  //     url: `${Baseurl.baseurl}get/all/companies`,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response?.data, "Getting Compaines");
  //       setGetCompany(response?.data?.data);
  //       if (response?.data?.status === true) {
  //         setLoader(false);
  //         Swal.fire({
  //           toast: true,
  //           icon: "success",
  //           title: response?.data?.message,
  //           animation: true,
  //           position: "top-right",
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener("mouseenter", Swal.stopTimer);
  //             toast.addEventListener("mouseleave", Swal.resumeTimer);
  //           },
  //         });
  //         window.scrollTo({
  //           top: 0,
  //           behavior: "smooth",
  //         });
  //       } else {
  //         setLoader(false);
  //       }
  //     })
  //     .catch(function (error) {
  //       setLoader(false);
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //       Swal.fire({
  //         toast: true,
  //         icon: "error",
  //         title: error?.response?.data?.message,
  //         animation: true,
  //         position: "top-right",
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener("mouseenter", Swal.stopTimer);
  //           toast.addEventListener("mouseleave", Swal.resumeTimer);
  //         },
  //       });
  //     });
  // };

  // useEffect(() => {
  //   if (Details?.role_id === 2) GetCompanies();
  // }, []);
  return (
    <>
      <div className="container-fluid bg-white side_header fixed_nav">
        <div className="d-flex py-2 justify-content-between align-items-center px-4">
          <div>
            <Link to={"/selectType"}>
              <img
                width="100%"
                height="60"
                className="header_logo"
                src={Logo}
                alt=""
              />
            </Link>
          </div>

          {token ? (
            <div>
              <div style={{ display: "flex" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <Link to={"#"}>
                      <p className="mt-3 mx-2">
                        <BsFillChatFill size={24} />
                      </p>
                    </Link>
                    <Link to={"#"}>
                      <p className="mt-3 mx-2">
                        <IoNotifications size={24} />
                      </p>
                    </Link>
                    <Link to={"/CutomerPortal/Dashboard"}>
                      <p className="mt-3 mx-2">
                        <IoHomeSharp size={24} />
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="dropdown d-flex align-items-center">
                  <img
                    className="dropbtn me-2 rounded-circle"
                    src={image === "default.jpeg" ? user : `https://bankerbrokerapi.dev-mn.xyz/${image_path}/${image}`}
                    alt="Description of the image"
                  />
                  <span
                    className="d-none d-sm-block"
                    style={{ textTransform: "capitalize" }}
                  >
                    {userdata?.first_name
                      ? userdata?.first_name
                      : userdata?.type}{" "}
                    &nbsp;
                    {/* <i className="fa fa-angle-down"></i> */}
                    <p className="fw-bold">MIAN</p>
                  </span>
                  <div className="dropdown-content">
                    <ul className="py-1 px-0 m-0">
                      <Link to="/profile" className="p-0">
                        <li className="py-2 ms-2">
                          <CgProfile className="fs-5 ms-1" />
                          <span className="ms-2">Profile</span>
                        </li>
                      </Link>
                      {/* <Link to="/Borrower/Documents" className="p-0">
                      <li className="py-2 ms-2">
                        <FaFileInvoice className="fs-5 ms-1" />
                        <span className="ms-2">Documents</span>
                      </li>
                    </Link> */}
                      <Link to="/CutomerPortal/Dashboard" className="p-0">
                        <li className="py-2 ms-2 d-flex">
                          <MdDashboard className="fs-5 ms-1" />
                          <span className="ms-2">Dashboard</span>
                        </li>
                      </Link>
                      <Link to="/applications" className="p-0">
                        <li className="py-2 ms-2">
                          <BiEdit className="fs-5 ms-1" />
                          <span className="ms-2">Application</span>
                        </li>
                      </Link>
                      <li className="py-2 ms-2">
                        <Logout classes="ps-0 pt-0" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
