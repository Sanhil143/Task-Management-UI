import React, { useState } from "react";
import Navbar from "./Navbar";
import Task from "../pages/Task";
import Profile from "../pages/Profile";
import Team from "../pages/Team";

const Dashboard = () => {
  const [page, setPage] = useState("task");

  const renderPage = () => {
    switch (page) {
      case "task":
        return <Task />;
      case "team":
        return <Team />;
      case "profile":
        return <Profile />;
      default:
        return <Task />;
    }
  };

  return <div>
  <Navbar setPage={setPage}/>
  {renderPage()}</div>;
};

export default Dashboard;
