import { collection } from "@firebase/firestore";
import { authService, dbService } from "myBase";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = (userObj) => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyTweets = async () => {
    const tweets = await collection(dbService, "tweets")
  };

  useEffect(() => {
    getMyTweets();
  }, [])


  return (
    <button onClick={onLogOutClick}>Log Out</button>
  )
};

export default Home;