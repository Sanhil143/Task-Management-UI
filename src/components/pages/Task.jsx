import axios from "axios";
import "./task.css"
import React, { useEffect, useState } from "react";
import { formatDate } from "../functions/dateFormater";

const Task = () => {
  const [task, setTask] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false)
  const [initialFetch, setInitialFetch] = useState(true)
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  const fetchTasks = async () => {
    try {
      let url = `http://localhost:5000/task/assignee/${userId}`;
      if (showPending) {
        url = `http://localhost:5000/task/pending/${userId}`;
      }
      if(showCompleted){
        url = `http://localhost:5000/task/completed/${userId}`; 
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if(initialFetch){
      fetchTasks()
      setInitialFetch(false)
    }else{
      fetchTasks()
    }
  }, [showPending,showCompleted]);

  const togglePendingTask = () => {
    setShowPending(!showPending);
    setShowCompleted(false)
  };
  const toggleCompletedTask = () => {
    setShowCompleted(!showCompleted);
    setShowPending(false)
  }

  //variable css
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
  };

  return (
    <div>
      <div style={mainDiv}>
        <div style={taskContainer}>
          <div style={buttonContainer}>
            <button className="buttonHov" onClick={togglePendingTask}>Pending Task</button>
          </div>
          <div style={buttonContainer}>
            <button className="buttonHov" onClick={toggleCompletedTask}>Completed Task</button>
          </div>
        </div>
      </div>
      <div>
        <table style={tableDiv}>
          <thead style={tableHead}>
            <tr>
              <th style={tableht}>Task_Id</th>
              <th style={tableht}>Title</th>
              <th style={tableht}>Status</th>
              <th style={tableht}>Assign_Date</th>
              <th style={tableht}>Due_Date</th>
            </tr>
          </thead>
          <tbody>
            {task.map((tasks) => (
              <tr key={tasks.taskId}>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {tasks.taskId}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {tasks.description}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {tasks.status}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(tasks.createdAt)}
                </td>
                <td
                  style={{
                    ...tableht,
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  {formatDate(tasks.due_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
