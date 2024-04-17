import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../functions/dateFormater";
import "../pages/task.css";

const TaskAssign = () => {
  const [tasks, setTasks] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [initialFetch, setInitialFetch] = useState(true);

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const fetchTask = async () => {
    try {
      let url = `http://localhost:5000/task/getAllTasksByAdmin/${userId}`;
      if (showPending) {
        url = `http://localhost:5000/task/getPendingTaskByAdmin/pending/${userId}`;
      }
      if (showCompleted) {
        url = `http://localhost:5000/task/getCompletedTaskByAdmin/completed/${userId}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (initialFetch) {
      fetchTask();
      setInitialFetch(false);
    } else {
      fetchTask();
    }
  }, [showPending, showCompleted]);

  const togglePendingTask = () => {
    setShowPending(!showPending);
    setShowCompleted(false);
  };
  const toggleCompletedTask = () => {
    setShowCompleted(!showCompleted);
    setShowPending(false);
  };

  const mainDiv = {
    display: "flex",
    justifyContent: "center",
    height: "80px",
    width: "100%",
    overflow: "hidden",
  };
  const taskContainer = {
    display: "flex",
    width: "100%",
    height: "60px",
    justifyContent: "center",
    marginTop: "10px",
  };
  const buttonContainer = {
    width: "200px",
    textAlign: "center",
  };

  const tableDiv = {
    margin: "1rem auto",
    borderRadius: "2rem",
    border: "1rem hidden #443c68",
    borderCollapse: "collapse",
    boxShadow: "0 0 0 1px black",
    overflow: "hidden",
    maxWidth: "40rem",
  };
  const tableHead = {
    fontSize: "1rem",
    backgroundColor: "teal",
  };
  const tableht = {
    border: "1px solid teal",
    minWidth: "13rem",
    padding: "0.3rem",
    lineHeight: "1.5",
    cursor: "pointer",
  };
  return (
    <div>
      <div style={mainDiv}>
        <div style={taskContainer}>
          <div style={buttonContainer}>
            <button className="buttonHov" onClick={togglePendingTask}>
              Pending Task
            </button>
          </div>
          <div style={buttonContainer}>
            <button className="buttonHov" onClick={toggleCompletedTask}>
              Completed Task
            </button>
          </div>
        </div>
      </div>
      <div>
        <table style={tableDiv}>
          <thead style={tableHead}>
            <tr>
              <th style={tableht}>TaskId</th>
              <th style={tableht}>description</th>
              <th style={tableht}>asignee</th>
              <th style={tableht}>status</th>
              <th style={tableht}>created_date</th>
              <th style={tableht}>due_date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {task.taskId}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {task.description}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {task.firstName} {task.lastName}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {task.status}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(task.createdAt)}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(task.dueDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskAssign;
