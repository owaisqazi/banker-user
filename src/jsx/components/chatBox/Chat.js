/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Baseurl from "../../../Baseurl";
import Pusher from "pusher-js";
/// Images

const Chat = ({ PerfectScrollbar, toggleChatBox, toggleTab }) => {
  const [loader, setLoader] = useState(false);
  const [getuser, setGetUser] = useState([]);
  const [userid, setUserId] = useState("");
  const [searchuser, setSearchUser] = useState("");
  const [getsearchuser, setGetSearchUser] = useState("");
  const [setUserImg] = useState("");

  const [message, setMessage] = useState("");

  const [lastestmsg, setLastestMsg] = useState("");
  const [label, setLabel] = useState("");
  const [, setBagde] = useState(false);
  const [sending, setSending] = useState(false);
  const [, setFielderror] = useState(false);
  const [, setCurrentUserChat] = useState("");
  const [openMsg, setOpenMsg] = useState(false);
  const token = useSelector((state) => state.auth.auth.idToken);

  const Get_Users = () => {
    setLoader(true);
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/specific/company/users`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setGetUser(response?.data?.data);
        // setGetSearchUser(response?.data?.data);
        if (response?.data?.status === true) {
          setLoader(false);

          window.scrollTo({
            top: 100000 * 100000,
            behavior: "smooth",
          });
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);

        Swal.fire({
          showCloseButton: true,

          toast: true,
          icon: "error",
          title: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Connection Error",
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
  };
  useEffect(() => {
    Get_Users();
  }, []);
  const Search_user = () => {
    const Search = new FormData();
    Search.append("search", searchuser);
    // setLoader(true);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}search/user/message/list`,
      data: Search,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config).then(function (response) {
      console.log(response?.data, "setSearchUser");
      setGetSearchUser(response?.data);
    });
  };
  const Send_Message = () => {
    const Send = new FormData();
    Send.append("to_user", userid);
    Send.append("message", message);
    setSending(true);

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}send`,
      data: Send,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response?.data?.status === true) {
          setLoader(false);
          setSending(false);
          setFielderror(false);
          setMessage("");

          window.scrollTo({
            top: 1111110 * 100000,
            behavior: "smooth",
          });
        } else {
          setSending(false);
          setLoader(false);
          setMessage("");
          setFielderror(true);
        }
      })
      .catch(function (error) {
        setSending(false);
        setMessage("");
        setLoader(false);
        setFielderror(true);
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
  };
  const Latest_Message = useCallback((userId) => {
    const LatestMessage = new FormData();
    LatestMessage.append("user_id", userId);
    setCurrentUserChat(userId);
    setLoader(true);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}load-latest-messages`,
      data: LatestMessage,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data?.data, "latestmsg");
        setLastestMsg(response?.data?.data);
        if (response?.data?.status === true) {
          setLoader(false);

          Swal.fire({
            showCloseButton: true,

            toast: true,
            icon: "success",
            title: "Load All Messages",
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

          window.scrollTo({
            top: 100000 * 100000,
            // behavior: "smooth",
          });
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        Swal.fire({
          showCloseButton: true,

          toast: true,
          icon: "error",
          title: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Connection Error",
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
  }, []);
  const Read_Message = useCallback((touserId) => {
    const Read = new FormData();
    Read.append("to_user", localStorage.getItem("nodeIds"));
    Read.append("from_user", touserId);
    setLoader(true);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}set/message/read`,
      data: Read,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        Get_Users();
        if (response?.data?.status === true) {
          setLoader(false);
          Get_Users();

          window.scrollTo({
            top: 100000 * 100000,
            behavior: "smooth",
          });
        } else {
          Get_Users();
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        Get_Users();
        Swal.fire({
          showCloseButton: true,

          toast: true,
          icon: "error",
          title: error?.response?.data?.message
            ? error?.response?.data?.message
            : "Connection Error",
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
  }, []);
  useEffect(() => {
    Get_Users();
  }, [Read_Message]);
  useEffect(() => {
    if (localStorage?.getItem("nodeIds")) {
    }
    const pusher = new Pusher("03bb5c20f602a2704597", {
      cluster: "ap2",
      //   encrypted: true,
    });
    const channel = pusher.subscribe(`chat`);
    channel.bind("send", (data) => {
      console.log(data, "message sent");

      if (
        (Number(userid) === Number(data.data.from_user) &&
          Number(localStorage?.getItem("nodeIds")) ===
            Number(data.data.to_user)) ||
        (Number(userid) === Number(data.data.to_user) &&
          Number(localStorage?.getItem("nodeIds")) ===
            Number(data.data.from_user))
      ) {
        const audio = new Audio("/done.mp3");
        audio.play();
        setLastestMsg((perv) => [...perv, data.data]);
      }

      console.log(data);
    });
    console.log(channel, "channel");
    return () => {
      pusher.unsubscribe(`chat`);
    };
  }, [userid]);
  function convertTo12Hour(time) {
    let hours = parseInt(time.split(":")[0]);
    let minutes = time?.split(":")[1];
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }
  console.log(toggleTab, "toggleTab");
  // useEffect(() => {
  //   Get_Users();
  // }, []);
  return (
    <>
      {loader ? <div className="loader"></div> : null}

      <div
        className={`tab-pane fade  ${
          toggleTab === "chat" ? "active show" : ""
        }`}
        id="chat"
        role="tabpanel"
      >
        <div
          className={`card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box ${
            openMsg ? "d-none" : ""
          }`}
        >
          <div className="card-header bg-white text-center">
            <div>
              <h6 className="mb-1">Chat List</h6>
            </div>
            <br />
          </div>
          <div className="px-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="iconLeft4"
              placeholder="Search user"
              onChange={(e) => {
                setSearchUser(e.target.value);
                Search_user();
              }}
            />
          </div>
          <hr />
          <PerfectScrollbar
            className={`card-body contacts_body p-0 dz-scroll  ${
              toggleChatBox ? "ps ps--active-y" : ""
            }`}
            style={{ height: 430 }}
            id="DZ_W_Contacts_Body"
          >
            <ul className="contacts">
              {searchuser !== "" ? (
                getsearchuser?.length !== 0 ? (
                  getsearchuser?.map((e) => {
                    return (
                      <>
                        <li
                          className="active dz-chat-user"
                          onClick={() => {
                            setOpenMsg(true);
                            Latest_Message(e?.user_id);
                            Read_Message(e?.user_id);
                            setLabel(e?.label);
                            setUserId(e?.user_id);
                            setUserImg(e?.user?.image);
                            setBagde(false);
                            setLastestMsg([]);
                          }}
                        >
                          <div className="d-flex bd-highlight">
                            <div className="img_cont">
                              <img
                                src={
                                  e?.user?.image
                                    ? "https://bankerbrokerapi.dev-mn.xyz/uploads/user_profile/" +
                                      e?.user?.image
                                    : "https://bootdey.com/img/Content/avatar/avatar5.png"
                                }
                                className="rounded-circle user_img"
                                alt=""
                              />
                              <span className="online_icon"></span>
                            </div>
                            <div className="user_info">
                              <span> {e?.label}</span>
                              <p className="text-capitalize">
                                {" "}
                                {e?.user?.type}
                              </p>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })
                ) : (
                  <p className="text-center"> No User Found</p>
                )
              ) : getuser ? (
                getuser?.map((e) => {
                  return (
                    <>
                      <li
                        className="active dz-chat-user"
                        onClick={() => {
                          setOpenMsg(true);
                          Latest_Message(e?.user_id);
                          Read_Message(e?.user_id);
                          setLabel(e?.label);
                          setUserId(e?.user_id);
                          setUserImg(e?.user?.image);
                          setBagde(false);
                          setLastestMsg([]);
                        }}
                      >
                        <div className="d-flex bd-highlight">
                          <div className="img_cont">
                            <img
                              src={
                                e?.user?.image
                                  ? "https://bankerbrokerapi.dev-mn.xyz/uploads/user_profile/" +
                                    e?.user?.image
                                  : "https://bootdey.com/img/Content/avatar/avatar5.png"
                              }
                              className="rounded-circle user_img"
                              alt=""
                            />
                            <span className="online_icon"></span>
                          </div>
                          <div className="user_info">
                            <span> {e?.label}</span>
                            <p className="text-capitalize"> {e?.user?.type}</p>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })
              ) : null}
            </ul>
          </PerfectScrollbar>
        </div>
        <div
          className={`card chat dz-chat-history-box ${openMsg ? "" : "d-none"}`}
        >
          <div className="card-header chat-list-header text-center">
            <Link
              to={"#"}
              className="dz-chat-history-back"
              onClick={() => setOpenMsg(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24" />
                  <rect
                    fill="#000000"
                    opacity="0.3"
                    transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                    x="14"
                    y="7"
                    width="2"
                    height="10"
                    rx="1"
                  />
                  <path
                    d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                  />
                </g>
              </svg>
            </Link>
            <h6 className="mb-1">{label}</h6>
            <p className="mb-0 text-success">Online</p>
          </div>
          <PerfectScrollbar
            className={`card-body msg_card_body dz-scroll ${
              openMsg ? "ps ps--active-y" : ""
            } `}
            id="DZ_W_Contacts_Body3"
            style={{ height: window.screen.height - 60 }}
          >
            {lastestmsg
              ? lastestmsg.map((e) => {
                  let convertedTime = convertTo12Hour(e?.exact_time);
                  console.log(convertedTime, "timing");
                  return (
                    <>
                      {Number(e?.from_user) ===
                      Number(localStorage.getItem("nodeIds")) ? (
                        <div className="d-flex justify-content-start mb-4">
                          <div className="img_cont_msg">
                            <img
                              src={
                                "https://bankerbrokerapi.dev-mn.xyz/uploads/user_profile/" +
                                e?.sender?.image
                              }
                              className="rounded-circle user_img_msg"
                              alt={label}
                            />
                          </div>
                          <div className="msg_cotainer">
                            {e?.content}
                            <span className="msg_time"> {convertedTime}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-end mb-4">
                          <div className="msg_cotainer_send">
                            {e?.content}
                            <span className="msg_time_send">
                              {convertedTime}
                            </span>
                          </div>
                          <div className="img_cont_msg">
                            <img
                              src={
                                "https://bankerbrokerapi.dev-mn.xyz/uploads/user_profile/" +
                                e?.sender?.image
                              }
                              className="rounded-circle user_img_msg"
                              alt={label}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })
              : null}
            <div className="d-flex type_msg">
              <div
                className="input-group"
                style={{
                  position: "fixed",
                  bottom: 0,
                  width: "-webkit-fill-available",
                }}
              >
                <textarea
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="input-group-append">
                  {sending === true ? (
                    <button className="btn btn-primary" disabled>
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      disabled={message === "" ? true : false}
                      className="btn btn-primary"
                      onClick={() => {
                        Send_Message();
                        const audio = new Audio("/done.mp3");
                        audio.play();
                      }}
                    >
                      <i className="fa fa-location-arrow"></i>
                    </button>
                  )}
                  &nbsp;
                </div>
              </div>
            </div>
            {/* <div className="card-footer type_msg">
              <div
                className="input-group"
                style={{
                  position: "fixed",
                  bottom: 0,
                  width: "-webkit-fill-available",
                }}
              >
                <textarea
                  className="form-control"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <div className="input-group-append">
                  {sending === true ? (
                    <button className="btn btn-primary" disabled>
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      disabled={message === "" ? true : false}
                      className="btn btn-primary"
                      onClick={() => {
                        Send_Message();
                        const audio = new Audio("/done.mp3");
                        audio.play();
                      }}
                    >
                      <i className="fa fa-location-arrow"></i>
                    </button>
                  )}
                </div>
              </div>
            </div> */}
          </PerfectScrollbar>
        </div>
      </div>
    </>
  );
};

export default Chat;
