import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formdata
      );
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("name", response.data.firstName);
        if(response.data.userType === 'admin'){
          navigate('/adminDashboard')
        }
        else{
          navigate('/dashboard')
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };
  
  //variable css
  const mainDiv = {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid orange",
    boxSizing: "border-box",
  };
  const formStyle = {
    width: "400px",
    height: "400px",
    textAlign: "center",
    border: "1px solid black",
    boxShadow: "1px 1px grey",
  };
  const fieldBar = {
    marginTop: "20px",
  };
  const loginContainer = {
    position: "relative",
    top: "90px",
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
    <div style={mainDiv}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={loginContainer}>
          <div style={fieldBar}>
            <label style={formLabel} htmlFor="email">
              email
            </label>
            <input
              style={formInput}
              id="email"
              name="email"
              type="text"
              placeholder="email"
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
              id="password"
              name="password"
              type="password"
              placeholder="password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>
          <button style={buttonInput} type="submit">
            login
          </button>
          <p>create your new Journey with us&nbsp;
          <Link to="/signup">Signup</Link> 
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
