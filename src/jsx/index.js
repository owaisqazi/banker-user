import React, { useContext } from "react";

/// React router dom
import { Routes, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import DashboardDark from "./components/Dashboard/DashboardDark";
import GuestDetail from "./components/Dashboard/GuestDetail";
import Concierge from "./components/Dashboard/Concierge";
import Room from "./components/Dashboard/Room";
import Reviews from "./components/Dashboard/Reviews";
import Task from "./components/Dashboard/Task";

/////Demo pages
import Demo1 from "./components/Dashboard/Demo/Demo1";
import Demo2 from "./components/Dashboard/Demo/Demo2";
import Demo3 from "./components/Dashboard/Demo/Demo3";
import Demo4 from "./components/Dashboard/Demo/Demo4";
import Demo5 from "./components/Dashboard/Demo/Demo5";
//import Demo6 from './components/Dashboard/Demo/Demo6';

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";
import Lightgallery from "./components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
import Todo from "./pages/Todo";
import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
import WizardForm from "./components/Forms/ReduxWizard/Index";

/// Widget
import Widget from "./pages/Widget";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import BorrowerTable from "./components/table/FilteringTable/BorrowerTable";
import Prospects from "./components/loans/Prospects";
import Lender from "./components/loans/Lender";
import Lender_Corresponding from "./components/loans/Lender_Corresponding";
import HotLead from "./components/loans/HotLead";
import Quots from "./components/loans/Quots";
import Loans from "./components/loans/Loans"
import { Createnewcom } from "./components/AppsMenu/AppProfile/Createnewcom";
import LenderProfile from "./components/loans/LenderProfile/LenderProfile";
import Programfinder from "./components/loans/Programfinder";
import AddLender from "./components/loans/LenderProfile/AddLender";
import LoanOfficer from "./components/loans/LoanOfficer/LoanOffisidebar";

import Compensation from "./components/loans/Compensation";
import LenderContact from "./components/loans/LenderProfile/LenderContact";
import Adddocument from "./components/loans/Adddocument";
import FillterData from "./components/loans/FilterData";
import LeadsForms from "./components/Leads/Leadsfoms";
import DocumentUpload from "./components/loans/LoanOfficer/DocumentUpload";
import MainDocument from "./components/loans/LoanOfficer/MainDocument";
import Addleads from "./components/Leads/Addleads";
import DashHome from "./components/charts/rechart/Dashbordtabs/DashHome";
import RealsteTable1 from "./components/loans/LoanOfficer/RealsteTable1";
import Income from "./components/loans/LoanOfficer/Income";
import SelectApplication from "./components/table/FilteringTable/SelectApplication";
// import Purchase from "./components/loans/Purchase";
import PurchaseApplication from "./components/table/FilteringTable/Purchase";
import Index from "./components/Library/Index";
import RolesTable from "./components/table/FilteringTable/RolesTable";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    // Loan
    { url: "Createnewcom", component: Createnewcom },
    { url: "Lender/Compensation", component: Compensation },
    { url: "Prospects", component: Prospects },
    { url: "CompanyFactory", component: Prospects },
    { url: "Branches&Teams", component: Prospects },
    { url: "assebbelylines", component: Prospects },
    { url: "RefferanlRealtor", component: Prospects },
    { url: "ClosingAgents", component: Prospects },
    { url: "Vendors", component: Prospects },
    { url: "Otp-Out-List", component: Prospects },
    { url: "UserGroups", component: Prospects },
    { url: "EscalationDesk", component: Prospects },
    { url: "IncidentsTracking", component: Prospects },
    { url: "KnowlendgeBase", component: Prospects },
    { url: "Sharing", component: Prospects },
    { url: "Reviews", component: Prospects },
    { url: "GooGle-Zillow,Yelp", component: Prospects },
    { url: "REVIEWS", component: Prospects },
    { url: "MailingList", component: Prospects },
    { url: "Jobs", component: Prospects },
    { url: "LeaveRequests", component: Prospects },
    { url: "Commessions", component: Prospects },
    { url: "CommessionsRequests", component: Prospects },
    { url: "Marketingmateials", component: Prospects },
    { url: "Learningcenter$Fress", component: Prospects },
    { url: "release", component: Prospects },
    { url: "MarketingCompaigns", component: Prospects },
    { url: "Loans", component: Prospects },
    { url: "Contacts", component: Prospects},
    { url: "Realstate", component: Prospects},
    { url: "buyer", component: Prospects},
    { url: "sell", component: Prospects},
    { url: "Landlord", component: Prospects},
    { url: "lender", component: Lender },
    { url: "program_finder", component: Programfinder },
    { url: "Addlender", component: AddLender },
    { url: "mortgages", component:Loans},
    { url: "Leads", component:LeadsForms},
    { url: "AddLeads/:id", component:Addleads},
    { url: "AddLeads", component:Addleads},
    { url: "Lender_Corresponding", component: Lender_Corresponding },
    { url: "Lender_Contact/:id", component: LenderContact },
    { url: "FillterData/:id", component: FillterData },
    { url: "Adddocument/:id", component: Adddocument },
    { url: "hot_leads", component: HotLead },
    { url: "Quots", component: Quots },
    {url:`/lender_profile/:id`,component:LenderProfile},
    {url:'/LoanOfficer/:id',component:LoanOfficer},
    {url:'/Documents/:id',component:MainDocument},
    {url:'/Income',component:Income},
    {url:'/DocumentUpload/:id',component:DocumentUpload},
    {url:'/Docume',component:RealsteTable1},
    {url:'/SelectApplication/:id',component:SelectApplication},
    {url:'/purchaseApplication',component:PurchaseApplication},
    {url:'/Library',component:Index},
    {url:'/Permission-Documents',component:RolesTable},
    
    /// Dashboard
    { url: "BorrowerTable", component: FilteringTable },
    { url: "CompanyPortal", component: FilteringTable },
    { url: "Borrower_table", component: BorrowerTable },
    { url: "dashboard-dark", component: DashboardDark },
    // { url: "guest-list", component: Home },
    { url: "guest-detail", component: GuestDetail },
    { url: "concierge", component: Concierge },
    { url: "room-list", component: Room },
    { url: "reviews", component: Reviews },
    { url: "task", component: Task },

    ///themes
    { url: "theme1", component: Demo1 },
    { url: "theme2", component: Demo2 },
    { url: "theme3", component: Demo3 },
    { url: "theme4", component: Demo4 },
    { url: "theme5", component: Demo5 },
    // { url: "theme6", component: Demo6 },

    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },
    { url: "post-details", component: PostDetails },

    /// Chart
    { url: "chart-sparkline", component: SparklineChart },
    { url: "chart-chartjs", component: ChartJs },
    { url: "chart-chartist", component: Chartist },
    { url: "chart-apexchart", component: ApexChart },
    { url: "Origination-Chart", component: RechartJs },
    { url: "Origination", component: DashHome },

    /// Bootstrap
    { url: "ui-alert", component: UiAlert },
    { url: "ui-badge", component: UiBadge },
    { url: "ui-button", component: UiButton },
    { url: "ui-modal", component: UiModal },
    { url: "ui-button-group", component: UiButtonGroup },
    { url: "ui-accordion", component: UiAccordion },
    { url: "ui-list-group", component: UiListGroup },
    { url: "ui-media-object", component: UiMediaObject },
    { url: "ui-card", component: UiCards },
    { url: "ui-carousel", component: UiCarousel },
    { url: "ui-dropdown", component: UiDropDown },
    { url: "ui-popover", component: UiPopOver },
    { url: "ui-progressbar", component: UiProgressBar },
    { url: "ui-tab", component: UiTab },
    { url: "ui-pagination", component: UiPagination },
    { url: "ui-typography", component: UiTypography },
    { url: "ui-grid", component: UiGrid },

    /// Plugin
    { url: "uc-select2", component: Select2 },
    { url: "uc-nestable", component: Nestable },
    { url: "uc-noui-slider", component: MainNouiSlider },
    { url: "uc-sweetalert", component: MainSweetAlert },
    { url: "uc-toastr", component: Toastr },
    { url: "map-jqvmap", component: JqvMap },
    { url: "uc-lightgallery", component: Lightgallery },

    ///Redux
    { url: "todo", component: Todo },
    { url: "redux-form", component: ReduxForm },
    { url: "redux-wizard", component: WizardForm },

    /// Widget
    { url: "widget-basic", component: Widget },

    /// Shop
    { url: "ecom-product-grid", component: ProductGrid },
    { url: "ecom-product-list", component: ProductList },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-product-order", component: ProductOrder },
    { url: "ecom-checkout", component: Checkout },
    { url: "ecom-invoice", component: Invoice },
    { url: "ecom-product-detail", component: ProductDetail },
    { url: "ecom-customers", component: Customers },

    /// Form
    { url: "form-element", component: Element },
    { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },
    { url: "form-validation-jquery", component: jQueryValidation },

    /// table
    // { url: "table-filtering", component: FilteringTable },
    { url: "table-sorting", component: SortingTable },
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];
  let path = window.location.pathname;
  path = path.split("/CompanyPortal");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "vh-100"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div className={`${!pagePath ? "container-fluid" : ""}`}>
            <Routes>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  element={<data.component />}
                />
              ))}
            </Routes>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
    </>
  );
};

export default Markup;
