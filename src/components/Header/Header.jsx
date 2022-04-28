import React from "react";
import headerLogo from "../../picture/header.png";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <img src={headerLogo} alt='ups'></img>
    </div>
  );
}

export default Header;
