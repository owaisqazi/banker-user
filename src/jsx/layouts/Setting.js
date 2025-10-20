import React from "react";
// import  { useState, useContext } from "react";
// import { Nav, Tab } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import { ThemeContext } from "../../context/ThemeContext";

const Setting = () => {
  // const [settingToggle, setSettingToggle] = useState(false);
  // const {
  //   body,
  //   sideBarOption,
  //   layoutOption,
  //   backgroundOption,
  //   sidebarposition,
  //   headerPositions,
  //   containerPosition,
  //   fontFamily,
  //   changePrimaryColor,
  //   changeNavigationHader,
  //   sideBarStyle,
  //   changeSideBarStyle,
  //   changeSideBarPostion,
  //   sidebarpositions,
  //   changeHeaderPostion,
  //   headerposition,
  //   changeSideBarLayout,
  //   sidebarLayout,
  //   colors,
  //   chnageHaderColor,
  //   chnageSidebarColor,
  //   changeBackground,
  //   background,
  //   changeContainerPosition,
  //   containerPosition_,
  // } = useContext(ThemeContext);
  return (
    <>
      {/* <div className={`sidebar-right ${settingToggle ? "show" : ""}`}>
        <div
          className="bg-overlay"
          onClick={() => setSettingToggle(!settingToggle)}
        ></div>
          <Link
            to="#"
            className="sidebar-right-trigger wave-effect wave-effect-x"
            onClick={() => setSettingToggle(!settingToggle)}
          >
            <span>
              <i className="fa fa-cog fa-spin" />
            </span>
          </Link>
          <Link
            to="#"
            className="sidebar-close-trigger"
            onClick={() => setSettingToggle(!settingToggle)}
          >
            <span>
              <i className="la-times las"></i>
            </span>
          </Link>
        <div className="sidebar-right-inner">
          <div className="tab-content tab-content-default tabcontent-border">
            <div
              className="tab-pane fade active show"
              id="home8"
              role="tabpanel"
            >
              <div className="admin-settings">
                <h4>Pick your style</h4>
                <Tab.Container defaultActiveKey="Theme">
                  <div className="card-action card-tabs mt-3 mt-sm-0">
                    <Nav as="ul" className="nav nav-tabs" role="tablist">
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link
                          as="a"
                          className="nav-link c-pointer"
                          data-toggle="tab"
                          eventKey="Theme"
                          role="tab"
                        >
                          {" "}
                          Theme{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link
                          as="a"
                          className="nav-link c-pointer"
                          data-toggle="tab"
                          eventKey="Header"
                          role="tab"
                        >
                          {" "}
                          Header{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li" className="nav-item">
                        <Nav.Link
                          as="a"
                          className="nav-link c-pointer"
                          data-toggle="tab"
                          eventKey="Content"
                          role="tab"
                        >
                          Content
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Tab.Content className="">
                    <Tab.Pane className="tab-pane fade " eventKey="Theme">
                      <div className="admin-settings">
                        <div className="row">
                          <div className="col-sm-12">
                            <p>Background</p>{" "}
                            <Select
                              defaultValue={background}
                              onChange={(e) => changeBackground(e)}
                              options={backgroundOption}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                          <div className="col-sm-6">
                            <p>Primary Color</p>
                            <div>
                              {colors.map((color, i) => (
                                <span key={i}>
                                  <input
                                    type="radio"
                                    name="primary_color"
                                    defaultValue={color}
                                    className="filled-in chk-col-primary"
                                    id={`primary_${color}`}
                                    onClick={() => changePrimaryColor(color)}
                                  />
                                  <label htmlFor={`primary_${color}`} />
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <p>Navigation Header</p>
                            <div>
                              {colors.map((color, i) => (
                                <span key={i}>
                                  <input
                                    type="radio"
                                    name="navigation_header"
                                    defaultValue={color}
                                    className="filled-in chk-col-primary"
                                    id={`nav_header_${color}`}
                                    onClick={() => changeNavigationHader(color)}
                                  />
                                  <label htmlFor={`nav_header_${color}`} />
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <p>Header</p>
                            <div>
                              {colors.map((color, i) => (
                                <span key={i}>
                                  <input
                                    type="radio"
                                    name="header_bg"
                                    defaultValue={color}
                                    className="filled-in chk-col-primary"
                                    id={`header_${color}`}
                                    onClick={() => chnageHaderColor(color)}
                                  />
                                  <label htmlFor={`header_${color}`} />
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <p>Sidebar</p>
                            <div>
                              {colors.map((color, i) => (
                                <span key={i}>
                                  <input
                                    type="radio"
                                    name="navigation_header"
                                    defaultValue={color}
                                    className="filled-in chk-col-primary"
                                    id={`sidebar_${color}`}
                                    onClick={() => chnageSidebarColor(color)}
                                  />
                                  <label htmlFor={`sidebar_${color}`} />
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane className="tab-pane fade" eventKey="Header">
                      <div className="admin-settings">
                        <div className="row">
                          <div className="col-sm-6">
                            <p>Layout</p>{" "}
                            <Select
                              defaultValue={sidebarLayout}
                              onChange={(e) => changeSideBarLayout(e)}
                              options={layoutOption}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                          <div className="col-sm-6">
                            <p>Header position</p>{" "}
                            <Select
                              defaultValue={headerposition}
                              onChange={(e) => changeHeaderPostion(e)}
                              options={headerPositions}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                          <div className="col-sm-6">
                            <p>Sidebar</p>{" "}
                            <Select
                              defaultValue={sideBarStyle}
                              onChange={(e) => changeSideBarStyle(e)}
                              options={sideBarOption}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                          <div className="col-sm-6">
                            <p>Sidebar position</p>{" "}
                            <Select
                              defaultValue={sidebarposition}
                              onChange={(e) => changeSideBarPostion(e)}
                              options={sidebarpositions}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane className="tab-pane fade" eventKey="Content">
                      <div className="admin-settings">
                        <div className="row">
                          <div className="col-sm-6">
                            <p>Container</p>{" "}
                            <Select
                              defaultValue={containerPosition_}
                              onChange={(e) => changeContainerPosition(e)}
                              options={containerPosition}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                          <div className="col-sm-6">
                            <p>Body Font</p>{" "}
                            <Select
                              defaultValue={fontFamily[1]}
                              onChange={(e) =>
                                body.setAttribute("data-typography", e.value)
                              }
                              options={fontFamily}
                              style={{
                                lineHeight: "40px",
                                color: "#7e7e7e",
                                paddingLeft: " 15px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* {settingToggle === false ?<button type="button" class="btn btn-primary togglebtn2 rounded-0" onClick={() => {
            setSetting(false)
            setSettingToggle(true)
          }}>show</button>:<button type="button" class="btn btn-secondary togglebtn2 rounded-0" onClick={() => {
             setSetting(true)
             setSettingToggle(false)
           }}>close</button>
        }
          <aside className="asidebar10" style={setting === true ? { display: "none" } : { display: "block" }}>
            <div className="dndnode input sidebar-right-inner">
              <h6 style={{ paddingTop: 5 }}> Super Admin</h6>
            </div> */}
    </>
  );
};

export default Setting;
