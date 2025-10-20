/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import "./dnd.css";
import Swal from "sweetalert2";
import axios from "axios";
import Baseurl from "../../../../Baseurl";
import { FaPen, FaTimesCircle } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import ReactDropzone from "react-dropzone";
import { useSelector } from "react-redux";
const TeamsCreation = ({activeTab}) => {
  const [settingToggle, setSettingToggle] = useState(false)
  const [setting, setSetting] = useState(false)

  const Gandipicture = require("../../../../images/noimg.png");
  const [loader, setLoader] = useState(false);
  const [getposition, setGetPosition] = useState("");
  const [selectedNode, setSelectedNode] = useState("");
  const [, setNameNode] = useState("");
  const [nodeIds, setNodeIds] = useState("");
  const [resNode, setResNode] = useState([]);
  const [, setNodeRoleIds] = useState("");
  const [, setStartingNodes] = useState([]);
  const [userid, setUserid] = useState("");
  const [getcompany] = useState([]);
  const [usertype] = useState("");
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const ModelArray = resNode.find((x) => x.user_id === nodeIds);
  let Details = localStorage.getItem("userDetail");
  Details = JSON.parse(Details);
  const onDragStart = (event, nodeType) => {
    setSelectedNode(nodeType);
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "Super Admin" },
      position: { x: 250, y: 0 },
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(
    getcompany && Array.isArray(getcompany) && getcompany.length > 0
      ? getcompany
      : initialNodes
  );

  const initialEdges = [{ id: "e2-3 ", source: "1", target: "4" }];

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  let id = 0;
  const getId = () => `dndnode_${id++}`;

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      setGetPosition(position);

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const [nodeName, setNodeName] = useState("");
  const token = useSelector((state) => state.auth.auth.idToken);

  const onConnect2 = () => {
    setLoader(true);
    const connect = new FormData();
    connect.append("position_x", getposition?.x);
    connect.append("position_y", getposition?.y);
    connect.append("label", selectedNode);
    var config = {
      method: "post",
      url: `${Baseurl.baseurl}user/role/creation`,
      data: connect,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setLoader(true);

        console.log(response);
        if (response.data.status === true) {
          setLoader(false);
          GetCompanies();
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
          setLoader(false);
          Swal.fire({
            showCloseButton: true,

            toast: true,
            icon: "error",
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
        }
      })
      .catch(function (error) {
        setLoader(false);
        Swal.fire({
          showCloseButton: true,

          toast: true,
          icon: "error",
          title: error,
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
  const GetCompanies = () => {
    setLoader(true);
    var config = {
      method: "get",
      url: `${Baseurl.baseurl}get/all/user/roles`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (Array.isArray(response?.data?.data)) {
          let ArrayresNode = response.data.data.map((e) => e);
          setResNode(ArrayresNode);
        } else {
          let ArrayresNode = Array.from(response?.data?.data);
          setResNode(ArrayresNode);
        }
        setNameNode(response?.data?.data.map((e) => e?.user?.type));

        if (response?.data?.status === true) {
          const nodes = response?.data?.data.map((e, i) => {
            let newPosition = { x: e.position_x, y: e.position_y };
            if (e.user.type === "company") {
              newPosition = { x: (i - 10) * 150, y: 100 };
            }
            if (e.user.type === "company admin") {
              newPosition = { x: (i - 10) * 150, y: 400 };
            }
            if (e.user.type === "company broker") {
              newPosition = { x: (i - 10) * 150, y: 700 };
            }
            if (e.user.type === "company teams") {
              newPosition = { x: (i - 10) * 150, y: 1000 };
            }
            if (
              e.user.type === "company agent" ||
              e.user.type === "company mlo"
            ) {
              newPosition = { x: (i - 10) * 150, y: 1300 };
            }
            return {
              id: e?.user_id?.toString(),

              data: {
                label: (
                  <>
                    <div
                      className=" p-3 "
                      style={{
                        borderRadius: "20px",
                        border:
                          e.user.type === "company"
                            ? `2px solid orange`
                            : e.user.type === "company admin"
                            ? `2px solid yellow`
                            : e.user.type === "company broker"
                            ? `2px solid green`
                            : e.user.type === "company teams"
                            ? `2px solid blue`
                            : e.user.type === "company agent"
                            ? `2px solid indigo`
                            : e.user.type === "company mlo"
                            ? `2px solid violet`
                            : "",
                      }}
                    >
                      <div>
                        {Number(e.user_id) ===
                        Number(localStorage.getItem("nodeIds")) ? (
                          <>
                            <p>
                            {e.user?.status === "active" &&
                              e.user?.last_login_at != null &&
                              Number(localStorage.getItem("nodeIds")) ===
                                Number(e.user_id) ? (
                                <span class="rounded p-1 me-2 text-center w3-green text-white">
                                  &nbsp;You&nbsp;
                                </span>
                              ) : e?.user?.status === "active" ? (
                                <span class="rounded p-1 me-2 text-center w3-red text-white">
                                  &nbsp;{e?.user?.status}&nbsp;
                                </span>
                              ) : (
                                <span class="rounded p-1 me-2 text-center w3-gray text-white">
                                  &nbsp;{e?.user?.status}&nbsp;
                                </span>
                              )}
                              <FaPen
                                title={`Edit ${e.user.type}`}
                                onClick={() => {
                                  handleShow();
                                  setNodeIds(e?.user_id);
                                  setNodeRoleIds(e?.role_id);
                                  setUserid(e?.role_id);
                                }}
                                style={{ fontSize: 10 }}
                                className=" text-success float-right"
                              />
                            </p>
                          </>
                        ) : Number(localStorage.getItem("nodeIds")) ===
                          Number(e.user.owner_id) ? (
                          <FaPen
                            onClick={() => {
                              handleShow();
                              setNodeIds(e?.user_id);
                              setNodeRoleIds(e?.role_id);
                              setUserid(e?.role_id);
                            }}
                            style={{ fontSize: 10 }}
                            className=" text-success float-right"
                          />
                        ) : null}
                      </div>
                      <span className=" text-capitalize">{e?.user?.type}</span>
                      <img
                        src={
                          e?.user?.image
                            ? "https://bankerbrokerapi.dev-mn.xyz/uploads/user_profile/" +
                              e?.user?.image
                            : Gandipicture
                        }
                        alt="No Img"
                        style={{ borderRadius: "50%" }}
                        className="w-100 my-2"
                      />
                      <br />
                      <span
                        className="text-primary fw-bolder text-capitalize"
                        style={{ fontSize: 10 }}
                      >
                        {e?.label}
                      </span>
                    </div>
                  </>
                ),
              },
              position: newPosition,
            };
          });
          const customeedges = response?.data?.data.map((e) => ({
            id: `${e?.owner_id}-${e?.user_id}`,
            source: e?.owner_id?.toString(),
            target: e?.user_id?.toString(),
          }));
          console.log(customeedges, "<====Coustomedges");
          setNodes((n) => [n[0]].concat(nodes));
          setEdges([
            {
              id: "firstEdge",
              source: "1",
              target: response?.data?.data[0]?.user_id,
            },
            ...customeedges,
          ]);
          setStartingNodes([...nodes]);
          // const response.data
          setLoader(false);
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
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
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
  useEffect(() => {
    GetCompanies();
  }, [activeTab]);

  const [profilUrl, setProfileUrl] = useState(null);
  const [profileimage, setProfile_image] = useState("");

  const onUpdate = () => {
    setLoader(true);
    const Update = new FormData();
    Update.append("id", nodeIds);
    Update.append("role_id", Details?.role_id);
    Update.append("label", nodeName ? nodeName : ModelArray?.label);
    Update.append("profile_image", profileimage ? profileimage : "");

    var config = {
      method: "post",
      url: `${Baseurl.baseurl}update/user/role/data`,
      data: Update,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setLoader(true);

        if (response.data.status === true) {
          setLoader(false);
          GetCompanies();
          handleClose();
          window.location.reload();
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
          setLoader(false);
          Swal.fire({
            showCloseButton: true,

            toast: true,
            icon: "error",
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
        }
      })
      .catch(function (error) {
        setLoader(false);
        Swal.fire({
          showCloseButton: true,

          toast: true,
          icon: "error",
          title: error,
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(profileimage, "imageFiles==<");

  const handleProfiel = (acceptedFiles) => {
    setProfile_image(acceptedFiles[0]);
    // Convert the dropped file to a data URL
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleRemove = () => {
    setProfile_image("");
  };

  return (
    <>
      {loader ? <div className="loader"></div> : null}

      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={(e) => {
                onConnect(e);
                onConnect2();
              }}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Controls />
              <div className="row">
                <div className="col-md-5">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header id="example-modal-sizes-title-lg">
                      <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        <div className="row">
                          {userid > 2 ? (
                            <>
                              <div className="col-md-6 my-2">
                                <label className="text-capitalize">
                                  {usertype} Name:
                                </label>
                                <input
                                  className="form-control"
                                  onChange={(e) => setNodeName(e.target.value)}
                                />
                              </div>
                              <div className="col-md-6 my-2">
                                <label className="text-capitalize">
                                  {usertype} Logo:
                                </label>
                                <ReactDropzone onDrop={handleProfiel}>
                                  {({ getRootProps, getInputProps }) => (
                                    <section>
                                      <div {...getRootProps()}>
                                        <input
                                          {...getInputProps()}
                                          multiple={false}
                                        />
                                        <p className="form-control">
                                          Drag 'n' drop , or click to select
                                          files
                                        </p>
                                      </div>
                                    </section>
                                  )}
                                </ReactDropzone>
                                {profileimage.length !== 0 ? (
                                  <>
                                    <FaTimesCircle
                                      className="text-danger float-right my-2"
                                      onClick={() => handleRemove()}
                                      style={{
                                        position: "relative",
                                        top: 16,
                                        cursor: "pointer",
                                      }}
                                    />

                                    <img
                                      key={profilUrl}
                                      src={profilUrl}
                                      className="w-100"
                                      alt="Uploaded Image"
                                    />
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          onUpdate();
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </ReactFlow>
          </div>
          {settingToggle === false ?<button type="button" class="btn btn-primary togglebtn2 rounded-0" onClick={() => {
            setSetting(!setting)
            setSettingToggle(!settingToggle)
          }}>show</button>:<button type="button" class="btn btn-secondary togglebtn2 rounded-0" onClick={() => {
             setSetting(!setting)
             setSettingToggle(!settingToggle)
           }}>close</button>
        }
         
          <aside style={setting === true ? { display: "block" } : { display: "none" }}>
            <div className="dndnode input">
              <h6 style={{ paddingTop: 5 }}> Super Admin</h6>
            </div>
            <div
              className={
                Details?.role_id === 1
                  ? "dndnode cursor-grab company"
                  : "dndnode company"
              }
              onDragStart={
                Details?.role_id === 1
                  ? (event) => onDragStart(event, "Company")
                  : ""
              }
              draggable
            >
              <h6 style={{ paddingTop: 5 }}>Company</h6>
            </div>
            <div
              className={
                Details?.role_id === 2
                  ? "dndnode cursor-grab admin"
                  : "dndnode admin"
              }
              onDragStart={
                Details?.role_id === 2
                  ? (event) => onDragStart(event, "Company Admin")
                  : ""
              }
              draggable
            >
              <h6 style={{ paddingTop: 5 }}>Company Admin</h6>
            </div>
            <div
              className={
                Details?.role_id === 3
                  ? "dndnode cursor-grab broker"
                  : "dndnode broker"
              }
              onDragStart={
                Details?.role_id === 3
                  ? (event) => onDragStart(event, "Company Broker")
                  : ""
              }
              draggable
            >
              <h6 style={{ paddingTop: 5 }}>Company Broker</h6>
            </div>
            <div
              className={
                Details?.role_id === 4
                  ? "dndnode cursor-grab teams"
                  : "dndnode teams"
              }
              onDragStart={
                Details?.role_id === 4
                  ? (event) => onDragStart(event, " Company Teams")
                  : ""
              }
              draggable
            >
              <h6 style={{ paddingTop: 5 }}>Company Teams</h6>
            </div>
            <div
              className={
                Details?.role_id === 5
                  ? "dndnode cursor-grab agent"
                  : "dndnode agent"
              }
              onDragStart={
                Details?.role_id === 5
                  ? (event) => onDragStart(event, " Company Agent")
                  : ""
              }
              draggable
            >
              <h6 style={{ paddingTop: 5 }}>Company Agent</h6>
            </div>
            <div
              className={
                Details?.role_id === 5
                  ? "dndnode cursor-grab mlo"
                  : "dndnode mlo"
              }
              onDragStart={
                Details?.role_id === 5
                  ? (event) => onDragStart(event, " Company Mlo")
                  : ""
              }
            >
              <h6 style={{ paddingTop: 5 }}>Company Mlo</h6>
            </div>
          </aside>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default TeamsCreation;
