import { updateProfile } from "@firebase/auth";
import { query, collection, getDocs, where, orderBy } from "@firebase/firestore";
import { authService, dbService } from "myBase";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Profile = ({ refreshAuth, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyTweets = async () => {
    const q = query(collection(dbService, "tweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    })

  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
      refreshAuth();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  )
};

export default Profile;