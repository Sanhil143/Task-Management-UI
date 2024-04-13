import React from "react";
import "./navbar.css";
const Navbar = () => {
  const mainDiv = {
    height: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid silver",
  };
  const h1Div = {
    marginLeft: "10px",
  };
  const navbarDiv = {
    display: "flex",
    height: "100%",
    alignItems: "center",
  };
  const ulDiv = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    marginLeft: "30px",
  };
  const ul2Div = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    marginRight: "50px",
  };
  return (
    <div style={mainDiv}>
      <div style={navbarDiv}>
        <div style={h1Div}>
          <h3>Task Manager App</h3>
        </div>
        <ul style={ulDiv}>
          <li className="liDiv">Tasks</li>
          <li className="liDiv">Teams</li>
          <li className="liDiv">Profile</li>
        </ul>
      </div>
      <ul style={ul2Div}>
        <li className="liDiv">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
