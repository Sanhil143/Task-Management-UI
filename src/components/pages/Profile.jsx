import axios from "axios";
import { formatDate } from "../functions/dateFormater";
import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const url = `http://localhost:5000/user/profile/${userId}`;

  const fetchUser = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  let handleUpdateUserInfo;

  useEffect(() => {
    fetchUser();
  }, [handleUpdateUserInfo]);

  const handleEditClick = () => {
    setIsNameModalOpen(true);
  };
  const handleCloseModel = () => {
    setIsNameModalOpen(false);
  };
  const handleFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setNewLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  handleUpdateUserInfo = async () => {
    try {
      let data = {}
      if(newFirstName !== ""){
        data.firstName = newFirstName
      }
      if(newLastName !== ""){
        data.lastName = newLastName
      }
      if(newEmail !== ""){
        data.email = newEmail
      }
      if(Object.keys(data).length >= 1){
        const response = await axios.patch(url,data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data) {
          console.log(response.data.data.firstName);
          localStorage.setItem('name',response.data.data.firstName)
          setIsNameModalOpen(false);
          fetchUser()
          setNewFirstName("");
          setNewLastName("");
        }
      }
    } catch (error) {
      setIsNameModalOpen(false);
      console.error(error.message);
    }
  };

  const topDiv = {
    width: "100%",
    height: "200px",
    backgroundColor: "teal",
    border: "1px solid black",
  };

  return (
    <div>
      <div style={topDiv}></div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              width: "100px",
            }}
          >
            <img
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50px",
              }}
              src="download.png"
              alt="profile"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70px",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
                width: "450px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div
              style={{
                marginLeft: "15px",
                width: "50px",
                position: "absolute",
                right: "160px",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              <AiTwotoneEdit style={{ fontSize: "24px" }} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20px",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "20px",
                width: "450px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {user.email}
              </p>
            </div>
            <div
              style={{
                marginLeft: "15px",
                width: "50px",
                position: "absolute",
                right: "160px",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              <AiTwotoneEdit style={{ fontSize: "24px" }} />
            </div>
          </div>
        </div>
        <div>
          <p>Joined at {formatDate(user.createdAt)}</p>
        </div>
      </div>
      {isNameModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 200,
            left: 620,
            width: "300px",
            height: "300px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            boxShadow: "0 3px 10px teal",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              boxShadow: "0 3px 10px teal",
            }}
          >
            <input
              style={{ padding: "5px" }}
              type="text"
              value={newFirstName}
              onChange={handleFirstNameChange}
              placeholder="type new first name"
            />
            <input
              style={{ display: "block", padding: "5px", marginTop: "5px" }}
              type="text"
              value={newLastName}
              onChange={handleLastNameChange}
              placeholder="type new last name"
            />
            <button
              style={{
                display: "block",
                margin: "0 auto",
                textAlign: "center",
                marginTop: "5px",
              }}
              onClick={handleUpdateUserInfo}
            >
              OK
            </button>
            <button
              style={{
                display: "block",
                margin: "0 auto",
                textAlign: "center",
                marginTop: "5px",
              }}
              onClick={handleCloseModel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
