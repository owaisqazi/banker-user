/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Baseurl from "../../../../Baseurl";
//** Import Image */
import PageTitle from "../../../layouts/PageTitle";
import ProfileSIdeBar from "./ProfileSIdeBar";
// import 'react-quill/dist/quill.snow.css';

const AppProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState("");
  const [fielderr, setFielderr] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [passerr, setPasserr] = useState(false);
  const [current_password, setCurrent_password] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [getuser, setGetser] = useState(false);
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  console.log(Details, "Details");

  const handleCheckboxChange = (e) => {
    setShowNewPassword(e.target.checked);
  };

  const token = useSelector((state) => state.auth.auth.idToken);

  const Profile = new FormData();
  Profile.append("first_name", fname ? fname : getuser?.first_name);
  Profile.append("last_name", lname ? lname : getuser?.last_name);
  Profile.append("email", email ? email : getuser?.email);
  Profile.append("file", file);
  Profile.append("current_password", current_password);
  Profile.append("new_password", newpassword);
  const Update = () => {
    if (current_password !== "") {
      setPasserr(false);
      var config = {
        method: "post",
        url: `${Baseurl.baseurl}update/user/profile`,
        data: Profile,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then(function (response) {
          if (response?.data?.status === true) {
            Show();
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
          } else {
          }
        })
        .catch(function (error) {
          setFielderr(error?.response?.data?.errors);
          console.log(error?.response?.data?.errors);
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
        });
    } else {
      setPasserr(true);
      Swal.fire({
        showCloseButton: true,

        toast: true,
        icon: "error",
        title: "Password Requried",
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
    }
  };
  const Show = () => {
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/user/profile`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "profile");
        setGetser(response.data.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data?.errors);
      });
  };
  useEffect(() => {
    Show();
  }, []);
  let isLogin = localStorage.getItem("userDetail");
  isLogin = JSON.parse(isLogin);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="My" />
      <ProfileSIdeBar />
      <div className="row">
        {/* <div className="col-lg-12">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div>
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={`https://bankerbroker.dev-mn.xyz/${getuser?.image_path}/${getuser?.image}`}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h4 className="text-primary mb-0">{getuser?.first_name}</h4>
                    <p className="text-capitalize">{Details?.type}</p>
                  </div>
                  <div className="profile-email px-2 pt-2">
                    <h4 className="text-muted mb-0">{getuser?.email}</h4>
                    <p>Email</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="row">
        <div className="col-xl-12">
          <div className="card ">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <div className="tab-content">
                    <div
                      id="profile-settings"
                      className={`tab-pane fade  active show`}
                    >
                      <div className="pt-3">
                        <div className="settings-form">
                          <h3 className="text-primary mb-3">Profile </h3>
                          {isLogin?.role_id === 4 ? (
                            <div className="row">
                              <div className="form-group mb-3 col-md-3">
                                <label className="form-label">
                                  Unqiue UserId
                                </label>
                                <input
                                  type="text"
                                  value={getuser?.username}
                                  placeholder=" Unqiue UserId"
                                  className="form-control"
                                  disabled
                                  readonly
                                  autoFocus
                                />
                              </div>
                            </div>
                          ) : null}

                          <div className="row">
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Frist Name</label>
                              <input
                                onChange={(e) => setFname(e.target.value)}
                                type="text"
                                defaultValue={getuser?.first_name}
                                placeholder="First Name"
                                className="form-control"
                              />
                              {fielderr
                                ? fielderr.first_name?.map((e) => (
                                    <span className="text-danger">{e}</span>
                                  ))
                                : null}
                            </div>

                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Last Name</label>
                              <input
                                onChange={(e) => setLname(e.target.value)}
                                type="text"
                                defaultValue={getuser?.last_name}
                                placeholder="Last Name"
                                className="form-control"
                              />
                              {fielderr
                                ? fielderr.last_name?.map((e) => (
                                    <span className="text-danger">{e}</span>
                                  ))
                                : null}
                            </div>
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Email</label>
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={getuser?.email}
                                type="email"
                                placeholder="1234 Main St"
                                className="form-control"
                              />
                              {fielderr
                                ? fielderr.email?.map((e) => (
                                    <span className="text-danger">{e}</span>
                                  ))
                                : null}
                            </div>
                            <div className="form-group col-md-6 mb-3">
                              <label className="form-label">
                                Profile Picture
                              </label>
                              <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                className="form-control border-0 pt-1"
                              />
                              {fielderr
                                ? fielderr.file?.map((e) => (
                                    <span className="text-danger">{e}</span>
                                  ))
                                : null}
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-3 col-md-6">
                              <label className="form-label">Password</label>
                              <input
                                onChange={(e) =>
                                  setCurrent_password(e.target.value)
                                }
                                type="password"
                                className={`form-control ${
                                  passerr ? "border border-2 border-danger" : ""
                                }`}
                              />
                              {fielderr
                                ? fielderr.current_password?.map((e) => (
                                    <span className="text-danger">{e}</span>
                                  ))
                                : null}
                            </div>
                            {showNewPassword ? (
                              <div className="form-group mb-3 col-md-6">
                                <label className="form-label">
                                  New Password
                                </label>
                                <input
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  type="password"
                                  className={`form-control `}
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group mb-3">
                            <div className="form-check custom-checkbox">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="gridCheck"
                                onChange={handleCheckboxChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gridCheck"
                              >
                                Wanna Change Password?{" "}
                              </label>
                            </div>
                          </div>
                          <div className="offset-md-4 col-md-4">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              onClick={Update}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default AppProfile;
