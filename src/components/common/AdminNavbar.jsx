import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({setPage}) => {
  const [name,setName] = useState(localStorage.getItem("name"))
  const navigate = useNavigate()
  const firstName = localStorage.getItem("name");

  useEffect(() => {
    setName(localStorage.getItem(name))
  },[name])
  const handleClick = (page) => {
    setPage(page);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  }

  const mainDiv = {
    height: "50px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid silver",
    boxShadow:"0 4px 5px silver"
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
          <li className="liDiv" onClick={() => handleClick("task")}>
            Tasks
          </li>
          <li className="liDiv" onClick={() => handleClick("team")}>
            Teams
          </li>
          <li className="liDiv" onClick={() => handleClick("profile")}>
            Profile
          </li>
        </ul>
      </div>
      <ul style={ul2Div}>
      <h4>Admin</h4>
        <h3
          style={{ marginRight: "20px", width: "250px", textAlign: "center" }}
        >
          Hi {firstName}❤️
        </h3>
        <li className="liDiv" onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  )
}

export default AdminNavbar
