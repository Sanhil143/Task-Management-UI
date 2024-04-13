import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        formdata
      );
      if (response.data.data) {
        console.log(response.data.data);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("userType", response.data.data.role);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const mainDiv = {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid orange",
    boxSizing: "border-box",
  };
  const formDiv = {
    width: "400px",
    height: "500px",
    textAlign: "center",
    border: "1px solid black",
    boxShadow: "1px 1px grey",
  };
  const signupContainer = {
    position: "relative",
    top: "90px",
  };
  const fieldBar = {
    marginTop: "20px",
  };
  const formLabel = {
    display: "inline-block",
    width: "60px",
    marginRight: "25px",
    textAlign: "left",
  };
  const formInput = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "15px",
  };
  const buttonInput = {
    marginTop: "20px",
    padding: "8px 60px",
    borderRadius: "15px",
    cursor: "pointer",
  };
  return (
    <div style={mainDiv} onSubmit={handleClick}>
      <form style={formDiv}>
        <div style={signupContainer}>
          <div style={fieldBar}>
            <label style={formLabel} htmlFor="fname">
              firstname
            </label>
            <input
              style={formInput}
              type="text"
              id="fname"
              name="firstName"
              value={formdata.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={fieldBar}>
            <label style={formLabel} htmlFor="lname">
              lastname
            </label>
            <input
              style={formInput}
              type="text"
              id="lname"
              name="lastName"
              value={formdata.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={fieldBar}>
            <label style={formLabel} htmlFor="email">
              email
            </label>
            <input
              style={formInput}
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={fieldBar}>
            <label style={formLabel} htmlFor="password">
              password
            </label>
            <input
              style={formInput}
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>
          <button style={buttonInput} type="submit">
            signup
          </button>
          <p>
            already have a acount?&nbsp;
            <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
