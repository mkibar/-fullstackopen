import React from "react";

const Footer = () => {
  return (
    <footer
      id="sticky-footer"
      className="flex-shrink-0 py-3 bg-primary text-white-50"
      style={{ position: "absolute", bottom: "0", width:"100%",height:"50px" }}
    >
      <div className="container text-center">
        <small>Designed by mkibar</small>
      </div>
    </footer>
  );
};

export default Footer;
