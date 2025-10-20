// sidebar button not woeking
/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect} from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
// import { FaCreditCard } from "react-icons/fa";

/// Image
//import profile from "../../../images/profile/pic1.jpg"; 
//import plus from "../../../images/plus.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() { }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const Applicationid = localStorage.getItem("borrower_id")
  console.log(Applicationid,"purchase")
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    

    //sidebar icon Heart blast
    // var handleheartBlast = document.querySelector(".heart");
    // function heartBlast() {
    //   return handleheartBlast.classList.toggle("heart-blast");
    // }
    // handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/CompanyPortal");
  path = path[path.length - 1];
  /// Active menu

  let isLogin = localStorage.getItem("userDetail");
  isLogin = JSON.parse(isLogin);
  return (
    <div
      className={`deznav ${iconHover} ${sidebarposition.value === "fixed" &&
          sidebarLayout.value === "horizontal" &&
          headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
        }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${path === "CompanyPortal" ? "mm-active" : "dashboard"}`}>
            <Link
              className={`${path === "CompanyPortal" ? "mm-active" : "dashboard"}`}
              to="/CompanyPortal"
            >
              {" "}
              <i className="flaticon-025-dashboard"></i>
              <span className="nav-text ">Dashboard</span>
            </Link>
          </li>
          <li
            className={`${path === "lender" || path === "Lender_Corresponding"
                ? "mm-active"
                : ""
              }`}
          >
            <Link
              className={`${path === "lender" || path === "Lender_Corresponding"
                  ? "mm-active"
                  : "dashboard"
                }`}
              to="/lender"bbbbbbhy
            >
              {" "}
              <i class="fa fa-hand-holding-usd"></i>
              <span className="nav-text ">Lender</span>
            </Link>
          </li>
          <li className={`${path === "Library" ? "mm-active" : "dashboard"}`}>
            <Link
              className={`${path === "Library" ? "mm-active" : "dashboard"}`}
              to="/Library"
            >
              {" "}
              <i class="fa fa-file-export"></i>
              <span className="nav-text ">Library</span>
            </Link>
          </li>
          {/* <li className={path === "/DocumentUpload" ? "mm-active" : ""}>
            <Link
              to="/DocumentUpload"
              className={`${path === "/DocumentUpload" ? "mm-active" : "dashboard"
                }`}
            >
              <i class="fa  fa-solid fa-file-invoice"></i>
              <span className="nav-text ">Documents</span>
            </Link>
          </li> */}
          <li className={path === "Contacts" ? "mm-active" : "dashboard"}>
            <Link to="/Contacts" className={`has-arrow ai-icon`}>
              <i class={`fa fa-credit-card`}></i>
              <span className="nav-text ">Leads</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Contacts" ? "mm-active" : "dashboard"
                    }`}
                  to="/Contacts"
                >
                  {" "}
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "leads" ? "mm-active" : "dashboard"
                    }`}
                  to="/leads"
                >
                  {" "}
                  Leads
                </Link>
              </li>

              <li>
                <Link
                  className={`${path === "hot_leads" ? "mm-active" : "dashboard"
                    }`}
                  to="/hot_leads"
                >
                  {" "}
                  Hot Leads
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Prospects" ? "mm-active" : "dashboard"
                    }`}
                  to="/Prospects"
                >
                  {" "}
                  Prospects
                </Link>
              </li>
            
            </ul>
          </li>
          <li className={path === "Contacts" ? "mm-active" : "dashboard"}>
            <Link to="/Contacts" className={`has-arrow ai-icon`}>
            {/* <i class={`fa fa-laptop`}></i> */}
            <i class="fa fa-share"></i>
            <span className="nav-text ">Transaction</span>
            </Link>
            <ul>
            <li className={path === "Realstate" ? "mm-active" : "dashboard"}>
            <Link to="/Realstate" className={`has-arrow ai-icon`}>
            <span className="nav-text ">Realstate</span>
            </Link>
            <ul>
            <li>
                <Link
                  className={`${path === `/purchaseApplication` ? "mm-active" : "dashboard"
                    }`}
                  to={`/purchaseApplication`}
                >
                  {" "}
                  purchase
                </Link>
              </li>
            <li>
                <Link
                  className={`${path === "sell" ? "mm-active" : "dashboard"}`}
                  to="/sell"
                >
                  {" "}
                  Sell
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "buyer" ? "mm-active" : "dashboard"
                    }`}
                  to="/buyer"
                >
                  {" "}
                  Buyer
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Landlord" ? "mm-active" : "dashboard"
                    }`}
                  to="/Landlord"
                >
                  {" "}
                  Landlord
                </Link>
              </li>
            </ul>
          </li>

            {isLogin?.role_id === 4 ? (
            <li className={path === "Borrower_table" ? "mm-active" : "dashboard"}>
              <Link
                className={`${path === "Borrower_table" ? "mm-active" : ""
                  }`}
                to="/Borrower_table"
              >
                {" "}
                <span className="nav-text ">Borrower </span>
              </Link>
            </li>
          ) : null}
            <li>
                <Link
                  className={`${path === "mortgages" ? "mm-active" : "dashboard"}`}
                  to="/mortgages"
                >
                  {" "}
                  Mortgage
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${path === "purchase" ? "mm-active" : "dashboard"
                    }`}
                  to="/purchase"
                >
                  {" "}
                  purchase
                </Link>
              </li> */}
            </ul>
          </li>
          <li className={path === "Quots" ? "mm-active" : "dashboard"}>
            <Link to="/Quots" className={`has-arrow ai-icon`}>
              <i class={`fa fa-cog fa-spin`}></i>

              <span className="nav-text ">Pricing Enging</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Quots" ? "mm-active" : "dashboard"
                    }`}
                  to="Quots"
                >
                  {" "}
                  Quots
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Loans" ? "mm-active" : "dashboard"
                    }`}
                  to="Loans"
                >
                  {" "}
                  Loans
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Leads" ? "mm-active" : "dashboard"
                    }`}
                  to="Leads"
                >
                  {" "}
                  Leads
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "HotLeads" ? "mm-active" : "dashboard"
                    }`}
                  to="HotLeads"
                >
                  {" "}
                  Hot Leads
                </Link>
              </li>
            </ul>
          </li>
          <li className={path === "CompanyFactory" ? "mm-active" : "dashboard"}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-user"></i>

              <span className="nav-text ">Users</span>
            </Link>
            <ul>
            <li className={path === "Origination" ? "mm-active" : ""}>
            <Link
              to="/Origination"
              className={`${path === "Origination" ? "mm-active" : "dashboard"
                }`}
            >
              <span className="nav-text ">Charts Origination</span>
            </Link>
          </li>
              <li>
                <Link
                  className={`${path === "CompanyFactory" ? "mm-active" : "dashboard"
                    }`}
                  to="/CompanyFactory"
                >
                  {" "}
                  Company Factory
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Branches&Teams" ? "mm-active" : "dashboard"
                    }`}
                  to="/Branches&Teams"
                >
                  {" "}
                  Branches & Teams
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "assebbelylines" ? "mm-active" : "dashboard"
                    }`}
                  to="/assebbelylines"
                >
                  {" "}
                  assebbely lines
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "RefferanlRealtor" ? "mm-active" : "dashboard"
                    }`}
                  to="/RefferanlRealtor"
                >
                  {" "}
                  Refferanl Realtor
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "ClosingAgents" ? "mm-active" : "dashboard"
                    }`}
                  to="/ClosingAgents"
                >
                  {" "}
                  Closing Agents
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Vendors" ? "mm-active" : "dashboard"
                    }`}
                  to="/Vendors"
                >
                  {" "}
                  Vendors
                </Link>
              </li>
            </ul>
          </li>
          <li className={path === "Otp-Out-List" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-lightbulb"></i>

              <span className="nav-text ">Admin</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Otp-Out-List" ? "mm-active" : "dashboard"
                    }`}
                  to="/Otp-Out-List"
                >
                  {" "}
                  Otp-Out-List
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "UserGroups" ? "mm-active" : "dashboard"
                    }`}
                  to="/UserGroups"
                >
                  {" "}
                  User Groups
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Leads
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Hot Leads
                </Link>
              </li> */}
            </ul>
          </li>
          <li className={path === "EscalationDesk" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-book-reader"></i>

              <span className="nav-text ">Service Desk</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "EscalationDesk" ? "mm-active" : "dashboard"
                    }`}
                  to="/EscalationDesk"
                >
                  {" "}
                  Escalation Desk
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "IncidentsTracking" ? "mm-active" : "dashboard"
                    }`}
                  to="/IncidentsTracking"
                >
                  {" "}
                  Incidents Tracking
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Leads
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Hot Leads
                </Link>
              </li> */}
            </ul>
          </li>
          <li className={path === "KnowlendgeBase" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-share-alt"></i>

              <span className="nav-text ">Sharing</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "KnowlendgeBase" ? "mm-active" : "dashboard"
                    }`}
                  to="/KnowlendgeBase"
                >
                  {" "}
                  Knowlendg eBase
                </Link>
              </li>

            </ul>
          </li>
          <li className={path === "Reviews" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-handshake"></i>

              <span className="nav-text ">Customer Relationship</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Reviews" ? "mm-active" : "dashboard"
                    }`}
                  to="/Reviews"
                >
                  {" "}
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "GooGle-Zillow,Yelp" ? "mm-active" : "dashboard"
                    }`}
                  to="/GooGle-Zillow,Yelp"
                >
                  {" "}
                  GooGle-Zillow,Yelp
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "REVIEWS" ? "mm-active" : "dashboard"
                    }`}
                  to="/REVIEWS"
                >
                  {" "}
                  REVIEWS
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "MailingList" ? "mm-active" : "dashboard"
                    }`}
                  to="/MailingList"
                >
                  {" "}
                  MailingList
                </Link>
              </li>
            </ul>
          </li>
          <li className={path === "Jobs" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-puzzle-piece"></i>

              <span className="nav-text ">Recruiting</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Jobs" ? "mm-active" : "dashboard"
                    }`}
                  to="/Jobs"
                >
                  {" "}
                  Jobs
                </Link>
              </li>
              {/* <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Loans
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Leads
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    path === "Prospects" ? "mm-active" : "dashboard"
                  }`}
                  to="Prospects"
                >
                  {" "}
                  Hot Leads
                </Link>
              </li> */}
            </ul>
          </li>
          <li className={path === "LeaveRequests" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-calendar"></i>
              <span className="nav-text fntsz-usa-1">Leave Management</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "LeaveRequests" ? "mm-active" : "dashboard"
                    }`}
                  to="/LeaveRequests"
                >
                  {" "}
                  Leave Requests
                </Link>
              </li>
            </ul>
          </li>
          <li className={path === "Commessions" ? "mm-active" : ""}>
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-medal"></i>
              <span className="nav-text ">Commessions</span>
              </Link>
              <ul>
              <li>
                <Link
                  className={`${path === "Commessions" ? "mm-active" : "dashboard"
                    }`}
                  to="/Commessions"
                >
                  {" "}
                  Commessions
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "CommessionsRequests" ? "mm-active" : "dashboard"
                    }`}
                  to="/CommessionsRequests"
                >
                  {" "}
                  Commessions Requests
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={`mb-2 ${path === "Marketingmateials" ? "mm-active" : ""
              }`}
          >
            <Link to="" className={`has-arrow ai-icon`}>
              <i class="fa fa-bullseye"></i>

              <span className="nav-text ">Marketing</span>
            </Link>
            <ul>
              <li>
                <Link
                  className={`${path === "Marketingmateials" ? "mm-active" : "dashboard"
                    }`}
                  to="/Marketingmateials"
                >
                  {" "}
                  Marketing mateials
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "Learningcenter$Fress" ? "mm-active" : "dashboard"
                    }`}
                  to="/Learningcenter$Fress"
                >
                  {" "}
                  Learning center $ Fress
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "release" ? "mm-active" : "dashboard"
                    }`}
                  to="release"
                >
                  {" "}
                  release
                </Link>
              </li>
              <li>
                <Link
                  className={`${path === "MarketingCompaigns" ? "mm-active" : "dashboard"
                    }`}
                  to="MarketingCompaigns"
                >
                  {" "}
                  Marketing Compaigns
                </Link>
              </li>
            </ul>
          </li>
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
