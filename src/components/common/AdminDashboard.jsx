import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";

import Profile from "../pages/Profile";
import TaskAssign from "../admin/TaskAssign";
import TeamAssign from "../admin/TeamAssign";

const AdminDashboard = () => {
  const [page, setPage] = useState("task");

  const renderPage = () => {
    switch (page) {
      case "task":
        return <TaskAssign/>;
      case "team":
        return <TeamAssign />;
      case "profile":
        return <Profile />;
      default:
        return <TaskAssign />;
    }
  };

  return (
    <div>
      <AdminNavbar setPage={setPage} />
      {renderPage()}
    </div>
  );
};

export default AdminDashboard;
