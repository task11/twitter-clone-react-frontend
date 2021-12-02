import { updateProfile } from "@firebase/auth";
import { query, collection, getDocs, where, orderBy } from "@firebase/firestore";
import { authService, dbService } from "myBase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";

const Profile = ({ userObj }) => {
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
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="change name" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;