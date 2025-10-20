import React, { useContext, useState } from "react";
/// React router dom
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";

const NavHader = () => {
  const [toggle, setToggle] = useState(false);
  const { openMenuToggle } = useContext(ThemeContext);
  const BankerLogo = require("../../../images/Bankerlogo.png");

  return (
    <div className="nav-header">
      <Link to="/CompanyPortal" className="brand-logo">
        <img className="" alt="modern admin logo" src={BankerLogo} width={47} />
        <span>
          {" "}
          <h4 className="pt-2">Banker Broker</h4>
        </span>
      </Link>

      <div
        className="nav-control"
        onClick={() => {
          setToggle(!toggle);
          openMenuToggle();
        }}
      >
        {/* Use This For Toggle Arrow */}
        {/* <div className={`hamburger ${toggle ? "is-active" : ""}`}> */}

        <div className={`hamburger`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
};

export default NavHader;
