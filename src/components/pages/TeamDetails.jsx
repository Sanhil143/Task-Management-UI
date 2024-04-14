import React, { useEffect, useState } from "react";
import axios from "axios";
import "./teamDetail.css";

const TeamDetails = ({ team, cancel }) => {
  const [teamMember, setTeamMember] = useState([]);

  useEffect(() => {
    if (team) {
      fetchTeamMembers();
    }
  }, [team]);

  if (!team) {
    return null;
  }

  const fetchTeamMembers = async () => {
    try {
      let url = `http://localhost:5000/teammembership/${team.teamId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data);
      if (response.data) {
        setTeamMember(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tableDiv = {
    margin: "1rem auto",
    borderRadius: "0.5rem",
    border: "1rem hidden #443c68",
    borderCollapse: "collapse",
    boxShadow: "0 0 0 1px black",
    overflow: "hidden",
    maxWidth: "60rem",
  };
  const tableHead = {
    fontSize: "0.9rem",
    backgroundColor: "teal",
  };
  const tableht = {
    border: "1px solid teal",
    minWidth: "9rem",
    padding: "0.2rem",
    lineHeight: "2",
    cursor: "pointer",
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: "500px",
        width: "500px",
        textAlign: "center",
      }}
    >
      <h2>{team.name}</h2>
      <div
        style={{
          height: "400px",
        }}
      >
        <table style={tableDiv}>
          <thead style={tableHead}>
            <tr>
              <th style={tableht}>Id</th>
              <th style={tableht}>Name</th>
              <th style={tableht}>Email</th>
            </tr>
          </thead>
          <tbody>
            {teamMember.map((teamMem) => (
              <tr key={teamMem.userId}>
                <td style={{ padding: "5px", lineHeight: "25px" }}>
                  {teamMem.userId}
                </td>
                <td>
                  {teamMem.firstName} {teamMem.lastName}
                </td>
                <td>{teamMem.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btnStyle" onClick={cancel}>
        Close
      </button>
    </div>
  );
};

export default TeamDetails;
