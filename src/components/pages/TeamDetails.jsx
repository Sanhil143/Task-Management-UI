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
      if (response.data) {
        setTeamMember(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tableDiv = {
    width:"600px",
    margin: "1rem auto",
    borderRadius: "0.5rem",
    border:'1px hidden blue',
    borderCollapse: "collapse",
    boxShadow: "0 4px 5px teal",
    overflow: "hidden",

  };
  const tableHead = {
    fontSize: "0.9rem",
    backgroundColor: "teal",
  };
  const tableht = {
    border: "1px solid teal",
    width:"200px",
    padding: "0.2rem",
    lineHeight: "2",
    cursor: "pointer",
    textAlign:"left",
    paddingLeft: "25px", 
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
        boxShadow: "0 3px 10px teal",
        height: "500px",
        width: "600px",
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
                <td style={{ textAlign: "left",paddingLeft: "25px", lineHeight: "25px" ,width:"200px"}}>
                  {teamMem.userId}
                </td>
                <td style={{ padding: "5px", lineHeight: "25px" ,width:"200px",textAlign: "left" }}>
                  {teamMem.firstName} {teamMem.lastName}
                </td>
                <td style={{ padding: "5px", lineHeight: "25px" ,width:"200px",textAlign: "left"}}>{teamMem.email}</td>
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
