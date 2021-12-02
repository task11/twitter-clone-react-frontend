import { query, collection, getDocs, where, orderBy } from "@firebase/firestore";
import { authService, dbService } from "myBase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
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


  return (
    <button onClick={onLogOutClick}>Log Out</button>
  )
};

export default Profile;