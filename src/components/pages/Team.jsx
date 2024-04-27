import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../functions/dateFormater";
import TeamDetails from "./TeamDetails";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const fetchTeams = async () => {
    try {
      let url = `http://localhost:5000/team/getAllTeamByUser/${userId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        setTeam(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleRowClick = (selectedTeam) => {
    setSelectedTeam(selectedTeam);
  };

  const handleCancelButton = () => {
    setSelectedTeam(null);
  };

  const tableDiv = {
    margin: "1rem auto",
    borderRadius: "2rem",
    border: "1rem hidden #443c68",
    borderCollapse: "collapse",
    boxShadow: "0 0 0 1px black",
    overflow: "hidden",
    maxWidth: "60rem",
  };
  const tableHead = {
    fontSize: "1rem",
    backgroundColor: "teal",
  };
  const tableht = {
    border: "1px solid teal",
    minWidth: "15rem",
    padding: "0.3rem",
    lineHeight: "1.5",
    cursor: "pointer",
  };

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center" }}>My Teams</h2>
      </div>
      <div style={{ marginTop: "44.5px" }}>
        <table style={tableDiv}>
          <thead style={tableHead}>
            <tr>
              <th style={tableht}>Team_Id</th>
              <th style={tableht}>Name</th>
              <th style={tableht}>Status</th>
              <th style={tableht}>Enrolled_date</th>
              <th style={tableht}>Created_date</th>
            </tr>
          </thead>
          <tbody>
            {team.map((teams) => (
              <tr key={teams.teamId} onClick={() => handleRowClick(teams)}>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {teams.teamId}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {teams.name}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  Active
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(teams.enrolled)}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(teams.teamCreated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TeamDetails team={selectedTeam} cancel={handleCancelButton} />
    </div>
  );
};

export default Team;
