 import React from "react";

const Footer = () => {
  
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href="https://hnhtechsolutions.com/" target="_blank" rel="noreferrer">
            Banker Broker
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
      
    </div>
    
  );
};

export default Footer;
